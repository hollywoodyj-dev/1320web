import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import {
  S1_EXPRESSION_ICONS,
  type S1ExpressionCategory,
} from "@/lib/full-report-v2/s1-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S1PageContent = {
  code: string;
  title: string;
  essence: string;
  essenceHighlight: string;
  essenceBody: string;
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

function splitSentences(text: string, max = 4): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, max);
}

function buildEssenceHighlight(traitLines: string[]): string {
  if (traitLines.length === 0) return "";
  if (traitLines.length === 1) return traitLines[0];
  const head = traitLines.slice(0, -1).join(", ");
  return `${head}, and ${traitLines[traitLines.length - 1]}`;
}

function categoryIcon(category: S1ExpressionCategory, indexInCategory: number): ReportGlyphName {
  const icons = S1_EXPRESSION_ICONS[category];
  return icons[Math.min(indexInCategory, icons.length - 1)];
}

function buildExpressionNodes(
  gifts: string[],
  directions: string[],
  coreLesson: string,
): Array<{ icon: ReportGlyphName; copy: string }> {
  const nodes: Array<{ icon: ReportGlyphName; copy: string }> = [];

  gifts.forEach((copy, index) => {
    nodes.push({ icon: categoryIcon("gift", index), copy });
  });
  directions.forEach((copy, index) => {
    nodes.push({ icon: categoryIcon("direction", index), copy });
  });
  if (coreLesson) {
    nodes.push({ icon: categoryIcon("lesson", 0), copy: coreLesson });
  }

  return nodes.slice(0, 6);
}

function buildKeyInsightBold(guidance: string, title: string): string {
  const sentences = splitSentences(guidance, 3);
  const last = sentences[sentences.length - 1];
  if (last) return last.replace(/\.$/, "");
  return `You are a soul of ${title}.`;
}

export function resolveS1PageContent(payload: FullReportV2Payload): S1PageContent {
  const slot = payload.modules.s1;
  const calc = payload.calculation.s1;

  const code = asString(slot.code) || calc.code;
  const title = asString(slot.title) || calc.title;
  const essence = asString(slot.essence);
  const traits = asStringArray(slot.soul_traits);
  const gifts = asStringArray(slot.core_gifts);
  const shadows = asStringArray(slot.shadow_pattern);
  const coreLesson = asString(slot.core_lesson);
  const guidance = asString(slot.wisewave_guidance);
  const directions = asStringArray(slot.mission_direction);
  const reflection = asString(slot.reflection);

  const essenceHighlight = buildEssenceHighlight(traits.slice(0, 3));
  const essenceBody =
    essence ||
    (traits.length > 0
      ? traits.join(" ")
      : "Your Soul Origin reflects the foundational archetype you carry into this lifetime.");

  const remembranceSource = guidance || coreLesson;
  const remembranceLines = splitSentences(remembranceSource, 4);

  const reflectionPrompts = reflection ? [reflection] : [];

  const guidanceSentences = splitSentences(guidance, 2);
  const keyInsight = guidanceSentences.slice(0, 2).join(" ");

  return {
    code,
    title,
    essence,
    essenceHighlight,
    essenceBody,
    strengths: gifts,
    shadowPatterns: shadows,
    remembranceLines,
    reflectionPrompts,
    expressionNodes: buildExpressionNodes(gifts, directions, coreLesson),
    keyInsight,
    keyInsightBold: buildKeyInsightBold(guidance, title),
    influenceIntro:
      "Your Soul Origin sets the foundation for your entire soul journey. It influences how you think, feel, create, relate, and grow.",
  };
}
