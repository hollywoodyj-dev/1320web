import { getIntegrationIntakeBySessionId, markIntegrationIntakeReviewed, setSessionIntakeStatus } from "@/lib/db/integration-intakes";
import {
  getIntegrationNotesBySessionId,
  upsertIntegrationNotes,
  type IntegrationNotesInput,
} from "@/lib/db/integration-session-notes";
import {
  getIntegrationSummaryBySessionId,
  markIntegrationSummarySent,
  publishIntegrationSummary,
  setSessionSummaryStatus,
  upsertIntegrationSummaryDraft,
} from "@/lib/db/integration-summaries";
import {
  getPlatformSessionById,
  listPersonalIntegrationSessions,
  touchFacilitatorSessionAccess,
  updatePlatformSessionFacilitator,
} from "@/lib/db/platform-sessions";
import { buildBlueprintContext } from "@/lib/personal-integration/ops/blueprint-context";
import type { SummaryStatus } from "@/lib/personal-integration/ops/constants";
import {
  emptySummaryContent,
  type SummaryContent,
} from "@/lib/personal-integration/ops/summary-template";
import { formatSessionHeading } from "@/lib/personal-integration/format-session-heading";
import type { PlatformSessionStatus } from "@/lib/platform-domain";
import { sendIntegrationSummaryEmail } from "@/lib/email/send-integration-summary";
import { getUserById } from "@/lib/db/users";

export type FacilitatorListBucket =
  | "upcoming"
  | "needs_intake_review"
  | "ready_for_session"
  | "completed"
  | "needs_summary"
  | "follow_up_due"
  | "cancelled";

function metaString(meta: Record<string, unknown> | null | undefined, key: string): string | null {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function classifySessionBucket(row: {
  status: string;
  intake_status?: string;
  summary_status?: string;
  follow_up_access_token?: string | null;
  followUpEmailSentAt?: string | null;
}): FacilitatorListBucket {
  if (row.status === "cancelled") return "cancelled";
  if (row.status === "completed") {
    const summary = row.summary_status ?? "none";
    if (summary === "none" || summary === "draft" || summary === "ready_for_review") return "needs_summary";
    if (row.follow_up_access_token && !row.followUpEmailSentAt) return "follow_up_due";
    return "completed";
  }
  const intake = row.intake_status ?? "not_started";
  if (intake === "submitted") return "needs_intake_review";
  if (intake === "reviewed" || intake === "draft" || intake === "not_started") {
    if (intake === "reviewed") return "ready_for_session";
    if (row.status === "active") return "ready_for_session";
    return "upcoming";
  }
  return "upcoming";
}

export async function listFacilitatorWorkspaceSessions() {
  const rows = await listPersonalIntegrationSessions(80);
  return rows.map((row) => {
    const meta = (row.meta ?? {}) as Record<string, unknown>;
    const followUpEmailSentAt = metaString(meta, "followUpEmailSentAt");
    const item = {
      id: row.id,
      preferredName:
        typeof meta.clientName === "string" ? meta.clientName : row.user_first_name ?? "Guest",
      scheduledAt:
        row.scheduled_at?.toISOString?.() ??
        metaString(meta, "scheduledAt") ??
        row.created_at.toISOString(),
      timezone: row.timezone ?? metaString(meta, "timezone"),
      sessionType:
        formatSessionHeading(row),
      intakeStatus: row.intake_status ?? "not_started",
      reportConnected: Boolean(row.report_id),
      sessionStatus: row.status,
      summaryStatus: row.summary_status ?? "none",
      assignedFacilitatorId: row.assigned_facilitator_id ?? null,
      bucket: "upcoming" as FacilitatorListBucket,
    };
    item.bucket = classifySessionBucket({
      status: row.status,
      intake_status: row.intake_status,
      summary_status: row.summary_status,
      follow_up_access_token: row.follow_up_access_token,
      followUpEmailSentAt,
    });
    return item;
  });
}

export async function getFacilitatorWorkspaceSession(sessionId: string) {
  const session = await getPlatformSessionById(sessionId);
  if (!session || session.kind !== "personal_integration") return null;

  await touchFacilitatorSessionAccess(sessionId);

  const [context, intake, notes, summary] = await Promise.all([
    buildBlueprintContext(session),
    getIntegrationIntakeBySessionId(sessionId),
    getIntegrationNotesBySessionId(sessionId),
    getIntegrationSummaryBySessionId(sessionId),
  ]);

  return {
    session: {
      id: session.id,
      status: session.status,
      intakeStatus: session.intake_status ?? "not_started",
      summaryStatus: session.summary_status ?? "none",
      growthEdge: session.growth_edge,
      reportId: session.report_id,
      assignedFacilitatorId: session.assigned_facilitator_id ?? null,
      facilitatorId: session.facilitator_id ?? null,
      prepUrl: session.prep_access_token
        ? `/integration/prep/${session.id}?token=${session.prep_access_token}`
        : null,
      intakeUrl: session.prep_access_token
        ? `/integration/intake/${session.id}?token=${session.prep_access_token}`
        : `/integration/intake/${session.id}`,
      joinSessionUrl: metaString(session.meta, "joinUrl") ?? metaString(session.meta, "meetingUrl"),
    },
    context,
    intake: intake
      ? {
          status: intake.status,
          responses: intake.responses_json,
          wellbeingFlags: intake.wellbeing_flags,
          submittedAt: intake.submitted_at?.toISOString() ?? null,
          reviewedAt: intake.reviewed_at?.toISOString() ?? null,
        }
      : null,
    notes,
    summary: summary
      ? {
          status: summary.status,
          content: summary.client_facing_content,
          publishedAt: summary.published_at?.toISOString() ?? null,
          sentAt: summary.sent_at?.toISOString() ?? null,
        }
      : null,
  };
}

export async function reviewIntakeForSession(sessionId: string) {
  const reviewed = await markIntegrationIntakeReviewed(sessionId);
  if (!reviewed) return null;
  await setSessionIntakeStatus(sessionId, "reviewed");
  return reviewed;
}

export async function saveFacilitatorNotes(sessionId: string, input: IntegrationNotesInput) {
  return upsertIntegrationNotes(sessionId, input);
}

export async function saveFacilitatorSummary(input: {
  sessionId: string;
  content: SummaryContent;
  status?: "draft" | "ready_for_review";
}) {
  const row = await upsertIntegrationSummaryDraft(input);
  await setSessionSummaryStatus(input.sessionId, input.status ?? "draft");
  return row;
}

export async function publishFacilitatorSummary(sessionId: string) {
  const row = await publishIntegrationSummary(sessionId);
  if (!row) return null;
  await setSessionSummaryStatus(sessionId, "published");
  return row;
}

export async function sendFacilitatorSummary(sessionId: string) {
  const session = await getPlatformSessionById(sessionId);
  if (!session) return null;
  const summary = await getIntegrationSummaryBySessionId(sessionId);
  if (!summary || (summary.status !== "published" && summary.status !== "sent")) return null;

  const user = await getUserById(session.user_id);
  if (!user?.email) return { sent: false, reason: "no_email" as const };

  const content = summary.client_facing_content;
  const { sent } = await sendIntegrationSummaryEmail({
    email: user.email,
    clientName: content.client_name || "Guest",
    accountUrl: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.1320soulcode.com"}/account/integration-sessions/${sessionId}`,
  });

  if (sent) {
    await markIntegrationSummarySent(sessionId);
    await setSessionSummaryStatus(sessionId, "sent");
  }
  return { sent };
}

export function buildSummaryAutofill(input: {
  preferredName: string;
  sessionDate: string;
  sessionType: string;
  reportId: string;
  notes: Awaited<ReturnType<typeof getIntegrationNotesBySessionId>>;
  growthEdge: string | null;
}): SummaryContent {
  const base = emptySummaryContent();
  const notes = input.notes;
  return {
    ...base,
    client_name: input.preferredName,
    session_date: input.sessionDate,
    session_type: input.sessionType,
    report_id: input.reportId,
    session_focus: notes?.primary_focus || input.growthEdge || "",
    core_recognition: notes?.core_recognition || "",
    inner_tension: notes?.inner_tension || "",
    existing_resource: notes?.existing_resource || "",
    growth_edge: notes?.growth_edge || input.growthEdge || "",
    conscious_choice: notes?.conscious_choice || "",
    seven_day_practice: notes?.practice || "",
    reflection_question: notes?.reflection_question || "",
    layers_explored:
      notes?.layers_explored ||
      [notes?.foundation_layers_explored, notes?.advanced_layers_explored].filter(Boolean).join(" · "),
  };
}

export async function updateWorkspaceSessionStatus(input: {
  sessionId: string;
  status: PlatformSessionStatus;
}) {
  return updatePlatformSessionFacilitator({
    sessionId: input.sessionId,
    status: input.status,
  });
}

export type { SummaryStatus };
