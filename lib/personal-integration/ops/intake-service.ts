import { calculate1320Code } from "@/lib/calculate1320Code";
import {
  getIntegrationIntakeBySessionId,
  setSessionIntakeStatus,
  submitIntegrationIntake,
  upsertIntegrationIntakeDraft,
} from "@/lib/db/integration-intakes";
import { soulReportBirthDateIso } from "@/lib/db/normalize-soul-report-row";
import {
  getPlatformSessionById,
  getPlatformSessionByPrepToken,
} from "@/lib/db/platform-sessions";
import { getSoulReportById } from "@/lib/db/reports";
import { getUserById } from "@/lib/db/users";
import { getCurrentUser } from "@/lib/auth/session";
import { INTAKE_CONSENT_VERSION } from "@/lib/personal-integration/ops/constants";
import {
  INTAKE_SECTIONS,
  validateEasyAccessIntake,
  type IntakeResponses,
} from "@/lib/personal-integration/ops/intake-schema";
import { formatSessionHeading } from "@/lib/personal-integration/format-session-heading";

export type IntakeAccess = {
  sessionId: string;
  via: "owner" | "prep_token";
};

export async function authorizeIntakeAccess(
  sessionId: string,
  token?: string | null,
): Promise<IntakeAccess | null> {
  const session = await getPlatformSessionById(sessionId);
  if (!session || session.kind !== "personal_integration") return null;

  if (token) {
    const gated = await getPlatformSessionByPrepToken(sessionId, token);
    if (gated) return { sessionId, via: "prep_token" };
  }

  const user = await getCurrentUser();
  if (user && user.id === session.user_id) {
    return { sessionId, via: "owner" };
  }
  return null;
}

export async function buildIntakePrefill(sessionId: string) {
  const session = await getPlatformSessionById(sessionId);
  if (!session) return null;
  const report = await getSoulReportById(session.report_id);
  if (!report) return null;
  const user = await getUserById(session.user_id);
  const code = calculate1320Code(report.birth_year, report.birth_month, report.birth_day);
  const variantLabel = formatSessionHeading(session);

  const preferredName =
    (typeof session.meta?.clientName === "string" && session.meta.clientName) ||
    user?.first_name ||
    "Guest";

  const scheduled =
    session.scheduled_at?.toISOString?.() ??
    (typeof session.meta?.scheduledAt === "string" ? session.meta.scheduledAt : null);

  return {
    preferredName,
    email: user?.email ?? "",
    birthDate: soulReportBirthDateIso(report),
    reportId: report.id,
    reportHref: `/my-report/${report.id}`,
    /** Facilitator-side context only — not shown in Easy Access client questions. */
    foundationCodes: `${report.s1_code} → ${report.s3_code} → ${report.s2_code} → ${report.s0_code}`,
    advancedCodes: `${code.s4Code} · ${code.s5Code} · ${code.s6Code} · ${code.s7Code} · ${code.s8Code} · ${code.s9Code}`,
    sessionType: variantLabel,
    sessionDate: scheduled ?? "To be confirmed",
    timezone: session.timezone ?? (typeof session.meta?.timezone === "string" ? session.meta.timezone : ""),
    intakeStatus: session.intake_status ?? "not_started",
    prepUrl: session.prep_access_token
      ? `/integration/prep/${session.id}?token=${session.prep_access_token}`
      : null,
    sections: INTAKE_SECTIONS,
    formVersion: "pre-session-intake-v1.1-easy-access",
  };
}

export async function loadIntakeFormState(sessionId: string) {
  const prefill = await buildIntakePrefill(sessionId);
  if (!prefill) return null;
  const intake = await getIntegrationIntakeBySessionId(sessionId);
  const responses = {
    preferred_name: prefill.preferredName,
    email: prefill.email,
    birth_date: prefill.birthDate,
    report_id: prefill.reportId,
    report_link: prefill.reportHref,
    session_type: prefill.sessionType,
    session_date: prefill.sessionDate,
    timezone: prefill.timezone,
    ...((intake?.responses_json ?? {}) as IntakeResponses),
  };

  return {
    prefill,
    responses,
    status: intake?.status ?? prefill.intakeStatus ?? "not_started",
    submittedAt: intake?.submitted_at?.toISOString() ?? null,
  };
}

function extractWellbeingFlags(responses: IntakeResponses): Record<string, unknown> {
  return {
    scope_acknowledgement: responses.scope_acknowledgement === true,
    form_version: "pre-session-intake-v1.1-easy-access",
    // Historical v1.0 keys preserved if still present on older drafts
    in_crisis: responses.in_crisis ?? null,
    professional_care: responses.professional_care ?? null,
  };
}

export async function saveIntakeDraft(sessionId: string, responses: IntakeResponses) {
  const session = await getPlatformSessionById(sessionId);
  if (!session) return null;
  if (
    (session.intake_status === "submitted" || session.intake_status === "reviewed") &&
    (await getIntegrationIntakeBySessionId(sessionId))?.status !== "draft"
  ) {
    return { error: "already_submitted" as const };
  }

  const row = await upsertIntegrationIntakeDraft({
    sessionId,
    responses: responses as Record<string, unknown>,
    wellbeingFlags: extractWellbeingFlags(responses),
  });
  await setSessionIntakeStatus(sessionId, "draft");
  return { intake: row };
}

export async function submitIntakeForm(sessionId: string, responses: IntakeResponses) {
  const validation = validateEasyAccessIntake(responses);
  if (validation === "missing_required") {
    return { error: "missing_required" as const };
  }
  if (validation === "consent_required") {
    return { error: "consent_required" as const };
  }

  const row = await submitIntegrationIntake({
    sessionId,
    responses: {
      ...(responses as Record<string, unknown>),
      form_version: "pre-session-intake-v1.1-easy-access",
    },
    wellbeingFlags: extractWellbeingFlags(responses),
    consentVersion: INTAKE_CONSENT_VERSION,
  });
  await setSessionIntakeStatus(sessionId, "submitted");

  // Easy Access Intake does not collect Growth Edge — facilitator prepares that privately.
  return { intake: row };
}
