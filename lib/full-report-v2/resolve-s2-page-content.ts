import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import {
  S2_EXPRESSION_ICONS,
  S2_KEY_INSIGHT_BOLD,
  S2_KEY_INSIGHT_INTRO,
  S2_SAFE_LANGUAGE_NOTE,
  type S2ExpressionCategory,
} from "@/lib/full-report-v2/s2-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S2PageContent = {
  code: string;
  title: string;
  essence: string;
  essenceBody: string;
  essenceSecondary: string;
  strengths: string[];
  shadowPatterns: string[];
  remembranceLines: string[];
  reflectionPrompts: string[];
  expressionNodes: Array<{ icon: ReportGlyphName; copy: string }>;
  keyInsight: string;
  keyInsightBold: string;
  influenceIntro: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? sanitizeCustomerFacingCopy(value.trim()) : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? sanitizeCustomerFacingCopy(item.trim()) : ""))
    .filter(Boolean);
}

function splitSentences(text: string, max = 5): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, max);
}

function splitKarmicLoop(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed
    .split(/\s*(?:→|->)\s*/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
}

function categoryIcon(category: S2ExpressionCategory, indexInCategory: number): ReportGlyphName {
  const icons = S2_EXPRESSION_ICONS[category];
  return icons[Math.min(indexInCategory, icons.length - 1)];
}

function buildExpressionNodes(
  awareness: string,
  lesson: string,
  healing: string,
  loop: string,
  guidance: string,
): Array<{ icon: ReportGlyphName; copy: string }> {
  const nodes: Array<{ icon: ReportGlyphName; copy: string }> = [];
  const seen = new Set<string>();
  const categoryCounts: Record<S2ExpressionCategory, number> = {
    awareness: 0,
    growth: 0,
    healing: 0,
    pattern: 0,
    guidance: 0,
  };

  const addNode = (category: S2ExpressionCategory, copy: string) => {
    const key = copy.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    const index = categoryCounts[category];
    categoryCounts[category] += 1;
    nodes.push({ icon: categoryIcon(category, index), copy: key });
  };

  if (awareness) addNode("awareness", awareness);
  if (lesson) addNode("growth", lesson);
  if (healing) addNode("healing", healing);

  splitKarmicLoop(loop).forEach((step) => addNode("pattern", step));

  if (nodes.length < 6 && guidance) {
    splitSentences(guidance, 6 - nodes.length).forEach((copy) => addNode("guidance", copy));
  }

  return nodes.slice(0, 6);
}

export function resolveS2PageContent(payload: FullReportV2Payload): S2PageContent {
  const slot = payload.modules.s2;
  const calc = payload.calculation.s2;

  const code = asString(slot.code) || calc.code;
  const title = asString(slot.title) || calc.title;
  const essence = asString(slot.essence);
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);
  const shadows = asStringArray(slot.shadow_pattern);
  const guidance = asString(slot.wisewave_guidance);
  const lesson = asString(slot.lesson) || asString(slot.core_lesson);
  const healing = asString(slot.healing_path);
  const relationshipDynamic = asString(slot.relationship_dynamic);
  const repeatingLoop = asString(slot.repeating_loop);
  const reflection = asString(slot.reflection);

  const essenceBody =
    traits.length > 0
      ? traits.join(" ")
      : relationshipDynamic ||
        essence ||
        "Your Soul Mirror reflects relational patterns that may invite deeper self-awareness.";

  const remembranceLines = splitSentences(guidance || healing || lesson, 5);

  const reflectionPrompts = reflection ? [reflection] : [];

  return {
    code,
    title,
    essence,
    essenceBody,
    essenceSecondary: S2_SAFE_LANGUAGE_NOTE,
    strengths,
    shadowPatterns: shadows,
    remembranceLines,
    reflectionPrompts,
    expressionNodes: buildExpressionNodes(
      relationshipDynamic,
      lesson,
      healing,
      repeatingLoop,
      guidance,
    ),
    keyInsight: S2_KEY_INSIGHT_INTRO,
    keyInsightBold: S2_KEY_INSIGHT_BOLD,
    influenceIntro:
      "Your Soul Mirror influences how you learn through experience, relationships, triggers, reflection, and growth. It helps you recognize repeating patterns and return to conscious choice.",
  };
}
