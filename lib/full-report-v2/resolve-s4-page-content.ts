import {
  asPatternIntensityLevels,
  resolveS4IntensityScores,
  S4_LIFE_INFLUENCE_TITLE,
  S4_PATTERN_INTENSITY_NOTE,
  S4_PATTERN_INTENSITY_TITLE,
} from "@/lib/full-report-v2/module-focus-display";
import { S4_CYCLE_FIELD_KEYS, S4_PAGE_HERO } from "@/lib/full-report-v2/s4-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S4CycleStep = {
  step: number;
  icon: string;
  title: string;
  copy: string;
  fullCopy: string;
};

export type S4IntensityMetric = {
  key: string;
  label: string;
  percent: number;
  level: number;
};

export type S4PageContent = {
  hero: typeof S4_PAGE_HERO;
  code: string;
  title: string;
  essenceParagraphs: string[];
  showsUp: string[];
  cycleSteps: S4CycleStep[];
  rootBelief: string;
  hiddenGiftIntro: string;
  hiddenGifts: string[];
  reflectionPrompts: string[];
  lifeInfluenceTitle: string;
  lifeInfluence: string;
  patternIntensityTitle: string;
  patternIntensityNote: string;
  intensityMetrics: S4IntensityMetric[];
  keyInsight: string;
  finalRemembrance: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function slotString(slot: Record<string, unknown>, key: string): string {
  return asString(slot[key]);
}

function splitSentences(text: string, max = 3): string[] {
  if (!text) return [];
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.slice(0, max);
}

function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text.trim();
}

function stripQuotes(text: string): string {
  return text.replace(/^["“]|["”]$/g, "").trim();
}

function stripIntegrationBegin(text: string): string {
  return text.replace(/^The integration begins (?:through|when):\s*/i, "").trim();
}

function cycleTitleFromLabel(label: string, fallback: string): string {
  const cleaned = label.trim();
  if (!cleaned) return fallback;
  return cleaned.toUpperCase();
}

function shortCycleCopy(body: string): string {
  let sentence = firstSentence(body)
    .replace(/^(This pattern may|This pattern often|The trigger often appears when the person|The defense may be to|The defense may be|The hidden need is to|In relationships,|In work and life,|In work,? life,?)\s*/i, "")
    .replace(/^(this may appear as|this may show up as|this may|it may appear as|it may)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (sentence) {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  if (sentence.length <= 84) return sentence;
  const clipped = sentence.slice(0, 82);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped).trim()}…`;
}

function buildCycleSteps(slot: Record<string, unknown>): S4CycleStep[] {
  const labels = (slot.s4_section_labels as Record<string, string> | undefined) ?? {};
  const fieldMap: Record<string, string> = {
    core_loop: slotString(slot, "core_loop"),
    emotional_trigger: slotString(slot, "emotional_trigger"),
    defense_pattern: slotString(slot, "defense_pattern"),
    hidden_need: slotString(slot, "hidden_need"),
    relationship_pattern: slotString(slot, "relationship_pattern"),
    work_life_pattern: slotString(slot, "work_life_pattern"),
  };

  return S4_CYCLE_FIELD_KEYS.map((key, index) => {
    const body = fieldMap[key];
    const label = labels[key] ?? key.replace(/_/g, " ");
    return {
      step: index + 1,
      icon: "",
      title: cycleTitleFromLabel(label, key.replace(/_/g, " ").toUpperCase()),
      copy: body ? shortCycleCopy(body) : "",
      fullCopy: body ? body.trim() : "",
    };
  });
}

function buildHiddenGifts(slot: Record<string, unknown>): string[] {
  const integration = stripIntegrationBegin(slotString(slot, "integration_key"));
  const practice = slotString(slot, "healing_path");
  const guidance = slotString(slot, "wisewave_guidance");

  const gifts = [
    integration ? `When integrated, ${integration}` : "",
    practice ? `Practice: ${practice}` : "",
    guidance ? firstSentence(guidance) : "",
  ].filter(Boolean);

  if (gifts.length >= 3) return gifts.slice(0, 5);

  const sections = asStringArray(slot.shows_up);
  return [...gifts, ...sections.slice(0, 5 - gifts.length)].slice(0, 5);
}

function buildReflectionPrompts(slot: Record<string, unknown>): string[] {
  const reflection = slotString(slot, "reflection");
  const trigger = slotString(slot, "emotional_trigger");
  const hiddenNeed = slotString(slot, "hidden_need");
  const practice = slotString(slot, "healing_path");

  const prompts = [
    reflection,
    trigger ? `When does this pattern activate for you? ${firstSentence(trigger)}` : "",
    hiddenNeed ? `What need might sit beneath this loop? ${firstSentence(hiddenNeed)}` : "",
    practice ? `What small step could interrupt the cycle this week?` : "",
  ].filter(Boolean);

  return prompts.slice(0, 4);
}

export function resolveS4PageContent(payload: FullReportV2Payload): S4PageContent {
  const slot = payload.modules.s4;
  const archetype = slotString(slot, "archetype") || slotString(slot, "title");
  const essenceSource =
    slotString(slot, "life_influence") ||
    slotString(slot, "essence") ||
    slotString(slot, "core_loop");
  const essenceParagraphs = splitSentences(essenceSource, 3);
  const showsUp = asStringArray(slot.shows_up);
  const cycleSteps = buildCycleSteps(slot);
  const rootBelief = stripQuotes(slotString(slot, "root_belief") || slotString(slot, "hidden_need"));
  const guidance = slotString(slot, "wisewave_guidance");
  const integrationKey = stripIntegrationBegin(slotString(slot, "integration_key"));

  const intensityLevels = asPatternIntensityLevels(slot.pattern_intensity);
  const intensityMetrics = resolveS4IntensityScores(intensityLevels);

  return {
    hero: S4_PAGE_HERO,
    code: slotString(slot, "code") || (payload.calculation.s4_code ?? ""),
    title: archetype,
    essenceParagraphs,
    showsUp,
    cycleSteps,
    rootBelief,
    hiddenGiftIntro:
      guidance ||
      "When this pattern is seen with compassion and integrated consciously, it can become:",
    hiddenGifts: buildHiddenGifts(slot),
    reflectionPrompts: buildReflectionPrompts(slot),
    lifeInfluenceTitle: S4_LIFE_INFLUENCE_TITLE,
    lifeInfluence:
      slotString(slot, "life_influence") ||
      "This pattern may influence how you respond in relationships, daily choices, emotional repetition, and energy — not as fate, but as a familiar loop awaiting awareness.",
    patternIntensityTitle: S4_PATTERN_INTENSITY_TITLE,
    patternIntensityNote: S4_PATTERN_INTENSITY_NOTE,
    intensityMetrics,
    keyInsight:
      guidance ||
      "Your pattern is not your identity. It is a protective loop that can be observed, understood, and gently released.",
    finalRemembrance:
      integrationKey ||
      "You are worthy before the pattern repeats. Awareness is the first integration.",
  };
}
