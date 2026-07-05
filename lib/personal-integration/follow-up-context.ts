import { getSiteUrl } from "@/lib/platform-config";
import { getPlatformSessionByFollowUpToken } from "@/lib/db/platform-sessions";
import { getSoulReportById } from "@/lib/db/reports";
import { createReflection, listReflectionsForSession } from "@/lib/db/reflections";
import { SESSION_VARIANT_LABELS } from "@/lib/personal-integration/session-variants";

export async function getPersonalIntegrationFollowUpContext(sessionId: string, followUpToken: string) {
  const session = await getPlatformSessionByFollowUpToken(sessionId, followUpToken);
  if (!session || session.kind !== "personal_integration" || session.status !== "completed") {
    return null;
  }

  const report = await getSoulReportById(session.report_id);
  if (!report) return null;

  const clientName =
    typeof session.meta?.clientName === "string" ? session.meta.clientName : "Guest";

  const variantLabel =
    session.session_variant && session.session_variant in SESSION_VARIANT_LABELS
      ? SESSION_VARIANT_LABELS[session.session_variant as keyof typeof SESSION_VARIANT_LABELS]
      : "Personal Integration Session";

  const reflections = await listReflectionsForSession(session.id);

  return {
    session,
    clientName,
    variantLabel,
    growthEdge: session.growth_edge,
    summary: session.summary,
    reflections,
    codes: {
      s1: report.s1_code,
      s3: report.s3_code,
      s2: report.s2_code,
      s0: report.s0_code,
    },
  };
}

export async function savePersonalIntegrationFollowUp(input: {
  sessionId: string;
  followUpToken: string;
  reflection: string;
}) {
  const session = await getPlatformSessionByFollowUpToken(input.sessionId, input.followUpToken);
  if (!session || session.kind !== "personal_integration" || session.status !== "completed") {
    return null;
  }

  const body = input.reflection.trim();
  if (!body) return null;

  await createReflection({
    userId: session.user_id,
    reportId: session.report_id,
    kind: "session_note",
    body,
    sourcePlatformSessionId: session.id,
    authorship: "user",
  });

  return session;
}

export function buildFollowUpUrl(sessionId: string, followUpToken: string): string {
  return `${getSiteUrl()}/integration/follow-up/${sessionId}?token=${followUpToken}`;
}
