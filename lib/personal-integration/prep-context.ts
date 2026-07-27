import { buildCanonicalReport } from "@/lib/canonical-report";
import { soulReportBirthDateDisplay, soulReportBirthDateIso } from "@/lib/db/normalize-soul-report-row";
import { getPlatformSessionByPrepToken, updatePlatformSessionGrowthEdge } from "@/lib/db/platform-sessions";
import { getSoulReportById } from "@/lib/db/reports";
import { createReflection, listReflectionsForSession } from "@/lib/db/reflections";
import { toSoulBlueprintRef } from "@/lib/platform-domain";
import { formatSessionHeading } from "@/lib/personal-integration/format-session-heading";

export async function getPersonalIntegrationPrepContext(sessionId: string, prepToken: string) {
  const session = await getPlatformSessionByPrepToken(sessionId, prepToken);
  if (!session || session.kind !== "personal_integration") {
    return null;
  }

  const report = await getSoulReportById(session.report_id);
  if (!report) return null;

  const clientName =
    typeof session.meta?.clientName === "string" ? session.meta.clientName : "Guest";

  const canonical = buildCanonicalReport({
    name: clientName,
    birth_date: soulReportBirthDateIso(report),
    birth_date_display: soulReportBirthDateDisplay(report),
  });

  const blueprintRef = toSoulBlueprintRef(report, canonical);
  const reflections = await listReflectionsForSession(session.id);
  const variantLabel = formatSessionHeading(session);

  return {
    session,
    blueprintRef,
    codes: blueprintRef.codes,
    reflections,
    variantLabel,
    growthEdge: session.growth_edge,
  };
}

export async function savePersonalIntegrationPrep(input: {
  sessionId: string;
  prepToken: string;
  growthEdge?: string;
  prepNotes?: string;
}) {
  const session = await getPlatformSessionByPrepToken(input.sessionId, input.prepToken);
  if (!session || session.kind !== "personal_integration") {
    return null;
  }

  const growthEdge = input.growthEdge?.trim();
  const prepNotes = input.prepNotes?.trim();
  if (!growthEdge && !prepNotes) {
    return null;
  }

  let updated = session;
  if (growthEdge) {
    const next = await updatePlatformSessionGrowthEdge({
      sessionId: session.id,
      growthEdge,
      authorship: "user",
    });
    if (next) updated = next;
  }

  if (prepNotes) {
    await createReflection({
      userId: session.user_id,
      reportId: session.report_id,
      kind: "practice",
      body: prepNotes,
      sourcePlatformSessionId: session.id,
      authorship: "user",
    });
  }

  return updated;
}
