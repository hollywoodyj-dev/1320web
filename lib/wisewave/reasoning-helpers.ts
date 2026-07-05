import type { WisewaveIntent } from "@/lib/wisewave/types";

const CERTAINTY_PATTERNS = [
  /\bwill happen\b/i,
  /\byou will\b/i,
  /\bdestined\b/i,
  /\bfated\b/i,
  /\bguaranteed\b/i,
  /\bcan't avoid\b/i,
];

const AGENCY_MARKERS = [
  /\byou may notice\b/i,
  /\bone possible\b/i,
  /\bcould this be\b/i,
  /\byou might consider\b/i,
  /\bwhat feels true for you\b/i,
  /\byour choice\b/i,
  /\byou remain\b/i,
];

export function detectWisewaveIntent(message: string): WisewaveIntent {
  const text = message.toLowerCase();
  if (/\b(anxious|worried|scared|overwhelm|grief|hurt)\b/.test(text)) return "emotional_processing";
  if (/\b(should i|what do i do|tell me|decide|choose)\b/.test(text)) return "clarity";
  if (/\b(reassure|okay|normal|alone)\b/.test(text)) return "reassurance";
  if (/\b(practice|integrate|apply|daily|step)\b/.test(text)) return "integration";
  if (/\b(why|what does|mean|pattern|mirror)\b/.test(text)) return "understanding";
  if (/\b(reflect|notice|aware|feel)\b/.test(text)) return "reflection";
  return "curiosity";
}

export function inferBlueprintCodes(message: string, codes: { s1: string; s3: string; s2: string; s0: string }): string[] {
  const text = message.toLowerCase();
  const referenced: string[] = [];
  if (/\b(origin|gift|s1|frequency|core)\b/.test(text)) referenced.push(codes.s1);
  if (/\b(express|vibration|s3|energy|tier)\b/.test(text)) referenced.push(codes.s3);
  if (/\b(mirror|relationship|s2|attract|partner)\b/.test(text)) referenced.push(codes.s2);
  if (/\b(void|awaken|s0|illusion|clarity)\b/.test(text)) referenced.push(codes.s0);
  if (referenced.length === 0) referenced.push(codes.s1, codes.s2);
  return [...new Set(referenced)];
}

export function validateRelationshipQa(response: string, intent: WisewaveIntent): { passed: boolean; flags: string[] } {
  const flags: string[] = [];

  for (const pattern of CERTAINTY_PATTERNS) {
    if (pattern.test(response)) flags.push("prediction_or_certainty_language");
  }

  if ((intent === "clarity" || intent === "reassurance") && !AGENCY_MARKERS.some((p) => p.test(response))) {
    flags.push("missing_agency_return");
  }

  if (/\btherapy|diagnose|prescribe|medical\b/i.test(response)) {
    flags.push("clinical_boundary_risk");
  }

  return { passed: flags.length === 0, flags };
}

export function reviseForRelationshipQa(response: string, flags: string[]): string {
  let revised = response;
  if (flags.includes("prediction_or_certainty_language")) {
    revised = revised.replace(/\byou will\b/gi, "you may notice");
    revised = revised.replace(/\bwill happen\b/gi, "may unfold");
    revised = revised.replace(/\bdestined\b/gi, "a recurring pattern in your blueprint");
    revised = revised.replace(/\bfated\b/gi, "a symbolic theme");
    revised = revised.replace(/\bguaranteed\b/gi, "possible");
  }
  if (flags.includes("missing_agency_return")) {
    revised = `${revised.trim()} What feels most true for you when you sit with this — and what choice is yours to make next?`;
  }
  if (flags.includes("clinical_boundary_risk")) {
    revised = `${revised.trim()} This is symbolic reflection, not clinical advice. You remain responsible for your choices.`;
  }
  return revised.trim();
}
