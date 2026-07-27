import { calculate1320Code } from "@/lib/calculate1320Code";
import { buildCanonicalReport } from "@/lib/canonical-report";
import { getPublicSegmentTitle } from "@/lib/blueprint-experience-api/segment-titles";
import { soulReportBirthDateDisplay, soulReportBirthDateIso } from "@/lib/db/normalize-soul-report-row";
import { getIntegrationIntakeBySessionId } from "@/lib/db/integration-intakes";
import type { PlatformSessionRow } from "@/lib/db/types";
import { getSoulReportById } from "@/lib/db/reports";
import { getUserById } from "@/lib/db/users";
import {
  ADVANCED_ORDER,
  FOUNDATION_ORDER,
  MAX_ADVANCED_SUGGESTIONS,
} from "@/lib/personal-integration/ops/constants";
import { formatSessionHeading } from "@/lib/personal-integration/format-session-heading";
import { toSoulBlueprintRef } from "@/lib/platform-domain";

export type FacilitatorLayerCard = {
  key: string;
  code: string;
  displayName: string;
  coreEssence: string;
  balancedExpression: string;
  protectiveDistortion: string;
  integrationInvitation: string;
  suggestedQuestions: string[];
};

export type BlueprintContextBundle = {
  clientOverview: {
    preferredName: string;
    email: string | null;
    birthDate: string | null;
    sessionType: string;
    scheduledAt: string | null;
    timezone: string | null;
    reportId: string;
    intakeStatus: string;
    sessionStatus: string;
    summaryStatus: string;
  };
  sessionFocus: string;
  currentSituation: string;
  clientIntention: string;
  foundation: FacilitatorLayerCard[];
  advanced: FacilitatorLayerCard[];
  possibleLayersToExplore: Array<{ code: string; label: string; note: string }>;
  safetyWatchpoints: string[];
  governanceNote: string;
};

function str(responses: Record<string, unknown>, key: string): string {
  const value = responses[key];
  return typeof value === "string" ? value.trim() : "";
}

function layerCard(code: string, displayName: string, essenceSeed: string): FacilitatorLayerCard {
  return {
    key: code.slice(0, 2).toLowerCase(),
    code,
    displayName,
    coreEssence: essenceSeed || `Public essence for ${code}.`,
    balancedExpression: "When lived with awareness, this layer supports clearer choice and presence.",
    protectiveDistortion: "Under pressure, this layer may tighten into over-control, avoidance, or self-judgment.",
    integrationInvitation: "Notice where this mirror is active in daily life — without forcing a conclusion.",
    suggestedQuestions: [
      `Where do you sense ${displayName} in your current situation?`,
      "What changes when you treat this as a mirror rather than a verdict?",
    ],
  };
}

/** Tentative advanced suggestions — never diagnostic. Max two. */
function suggestAdvancedLayers(
  advanced: FacilitatorLayerCard[],
  intention: string,
  situation: string,
): Array<{ code: string; label: string; note: string }> {
  const haystack = `${intention} ${situation}`.toLowerCase();
  const scored = advanced.map((layer) => {
    let score = 0;
    if (/relationship|mirror|other|partner|family/.test(haystack) && layer.code.startsWith("S2")) score += 2;
    if (/control|choice|agency|sovereign|boundary/.test(haystack) && layer.code.startsWith("S7")) score += 3;
    if (/money|receive|value|worth/.test(haystack) && layer.code.startsWith("S6")) score += 3;
    if (/mission|purpose|work|express/.test(haystack) && layer.code.startsWith("S5")) score += 3;
    if (/shadow|pattern|protect|defense/.test(haystack) && layer.code.startsWith("S4")) score += 3;
    if (/contribute|give|service/.test(haystack) && layer.code.startsWith("S8")) score += 2;
    if (/return|source|meaning|close/.test(haystack) && layer.code.startsWith("S9")) score += 2;
    return { layer, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const picked = scored.filter((row) => row.score > 0).slice(0, MAX_ADVANCED_SUGGESTIONS);
  const fallback = scored.slice(0, MAX_ADVANCED_SUGGESTIONS);
  const final = (picked.length ? picked : fallback).slice(0, MAX_ADVANCED_SUGGESTIONS);
  return final.map(({ layer }) => ({
    code: layer.code,
    label: layer.displayName,
    note: `Possible relevance: ${layer.code} · ${layer.displayName}. Tentative only — facilitator review required.`,
  }));
}

export async function buildBlueprintContext(
  session: PlatformSessionRow,
): Promise<BlueprintContextBundle | null> {
  const report = await getSoulReportById(session.report_id);
  if (!report) return null;
  const user = await getUserById(session.user_id);
  const intake = await getIntegrationIntakeBySessionId(session.id);
  const responses = (intake?.responses_json ?? {}) as Record<string, unknown>;
  const wellbeing = (intake?.wellbeing_flags ?? {}) as Record<string, unknown>;

  const preferredName =
    str(responses, "preferred_name") ||
    (typeof session.meta?.clientName === "string" ? session.meta.clientName : "") ||
    user?.first_name ||
    "Guest";

  const canonical = buildCanonicalReport({
    name: preferredName,
    birth_date: soulReportBirthDateIso(report),
    birth_date_display: soulReportBirthDateDisplay(report),
  });
  const blueprintRef = toSoulBlueprintRef(report, canonical);
  const code = calculate1320Code(report.birth_year, report.birth_month, report.birth_day);

  const foundationCodes = {
    s1: blueprintRef.codes.s1,
    s3: blueprintRef.codes.s3,
    s2: blueprintRef.codes.s2,
    s0: blueprintRef.codes.s0,
  };
  const advancedCodes = {
    s4: code.s4Code,
    s5: code.s5Code,
    s6: code.s6Code,
    s7: code.s7Code,
    s8: code.s8Code,
    s9: code.s9Code,
  };

  const foundation = FOUNDATION_ORDER.map((key) => {
    const segmentCode = foundationCodes[key];
    const displayName = getPublicSegmentTitle(key, segmentCode, "en");
    return layerCard(segmentCode, displayName, `Foundation mirror for ${displayName}.`);
  });

  const advanced = ADVANCED_ORDER.map((key) => {
    const segmentCode = advancedCodes[key];
    const displayName = segmentCode;
    return layerCard(segmentCode, displayName, `Advanced reference for ${segmentCode}.`);
  });

  const sessionFocus =
    str(responses, "growth_edge") || session.growth_edge || str(responses, "session_intention") || "Not yet named";
  const currentSituation =
    str(responses, "current_experience") || str(responses, "what_brings_you") || "Awaiting intake.";
  const clientIntention = str(responses, "session_intention") || sessionFocus;

  const safetyWatchpoints: string[] = [];
  if (wellbeing.in_crisis === "yes" || responses.in_crisis === "yes") {
    safetyWatchpoints.push("Client indicated possible crisis need — pause integration and refer to appropriate support.");
  }
  if (wellbeing.in_crisis === "unsure" || responses.in_crisis === "unsure") {
    safetyWatchpoints.push("Client marked wellbeing as unsure — confirm scope and safety before deepening.");
  }
  if (responses.scope_acknowledgement !== true && responses.scope_acknowledgement !== "true") {
    safetyWatchpoints.push("Scope acknowledgement missing or incomplete on intake.");
  }
  safetyWatchpoints.push("Blueprint is symbolic only — no diagnosis, prediction, or fixed-identity language.");

  const variantLabel = formatSessionHeading(session);

  return {
    clientOverview: {
      preferredName,
      email: user?.email ?? null,
      birthDate: soulReportBirthDateIso(report),
      sessionType: variantLabel,
      scheduledAt: session.scheduled_at?.toISOString?.() ?? (typeof session.meta?.scheduledAt === "string" ? session.meta.scheduledAt : null),
      timezone: session.timezone ?? (typeof session.meta?.timezone === "string" ? session.meta.timezone : null),
      reportId: report.id,
      intakeStatus: session.intake_status ?? "not_started",
      sessionStatus: session.status,
      summaryStatus: session.summary_status ?? "none",
    },
    sessionFocus,
    currentSituation,
    clientIntention,
    foundation,
    advanced,
    possibleLayersToExplore: suggestAdvancedLayers(advanced, clientIntention, currentSituation),
    safetyWatchpoints,
    governanceNote:
      "Possible layers to explore are tentative system aids only. Facilitator judgment required. Never send automatic interpretation to the client.",
  };
}
