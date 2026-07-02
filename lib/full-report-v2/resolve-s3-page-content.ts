import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import {
  S3_EXPRESSION_ICONS,
  type S3ExpressionCategory,
} from "@/lib/full-report-v2/s3-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S3PageContent = {
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

function splitSentences(text: string, max = 4): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, max);
}

function categoryIcon(category: S3ExpressionCategory, indexInCategory: number): ReportGlyphName {
  const icons = S3_EXPRESSION_ICONS[category];
  return icons[Math.min(indexInCategory, icons.length - 1)];
}

function buildExpressionNodes(
  energy: string,
  aligned: string[],
  integration: string,
  guidance: string,
  essence: string,
): Array<{ icon: ReportGlyphName; copy: string }> {
  const nodes: Array<{ icon: ReportGlyphName; copy: string }> = [];
  const seen = new Set<string>();
  const categoryCounts: Record<S3ExpressionCategory, number> = {
    energy: 0,
    aligned: 0,
    integration: 0,
    guidance: 0,
  };

  const addNode = (category: S3ExpressionCategory, copy: string) => {
    const key = copy.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    const index = categoryCounts[category];
    categoryCounts[category] += 1;
    nodes.push({ icon: categoryIcon(category, index), copy: key });
  };

  if (energy) addNode("energy", energy);
  else if (essence) addNode("energy", essence);

  aligned.forEach((copy) => addNode("aligned", copy));

  if (integration) addNode("integration", integration);

  if (nodes.length < 6 && guidance) {
    splitSentences(guidance, 6 - nodes.length).forEach((copy) => addNode("guidance", copy));
  }

  return nodes.slice(0, 6);
}

function buildKeyInsightBold(guidance: string, integration: string, title: string): string {
  const sentences = splitSentences(guidance || integration, 3);
  const last = sentences[sentences.length - 1];
  if (last) return last.replace(/\.$/, "");
  return `You carry the vibration of ${title}.`;
}

export function resolveS3PageContent(payload: FullReportV2Payload): S3PageContent {
  const slot = payload.modules.s3;
  const calc = payload.calculation.s3;

  const code = asString(slot.code) || calc.code;
  const title = asString(slot.title) || calc.title;
  const essence = asString(slot.essence);
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);
  const shadows = asStringArray(slot.shadow_pattern);
  const guidance = asString(slot.wisewave_guidance);
  const integration =
    asString(slot.integration_advice) || asString(slot.integration_key);
  const energy = asString(slot.energy_expression);
  const reflection = asString(slot.reflection);

  const essenceBody =
    traits.length > 0
      ? traits.join(" ")
      : essence ||
        "Your Soul Vibration reflects how your energy expresses, adapts, and moves through life.";

  const essenceSecondary = energy && energy !== essenceBody ? energy : "";

  const remembranceSource = guidance || integration;
  const remembranceLines = splitSentences(remembranceSource, 5);

  const reflectionPrompts = reflection ? [reflection] : [];

  const guidanceSentences = splitSentences(guidance, 2);
  const keyInsight = guidanceSentences.slice(0, 2).join(" ");

  return {
    code,
    title,
    essence,
    essenceBody,
    essenceSecondary,
    strengths,
    shadowPatterns: shadows,
    remembranceLines,
    reflectionPrompts,
    expressionNodes: buildExpressionNodes(
      energy,
      strengths,
      integration,
      guidance,
      essenceBody,
    ),
    keyInsight,
    keyInsightBold: buildKeyInsightBold(guidance, integration, title),
    influenceIntro:
      "Your Soul Vibration shapes how you experience the world, connect with others, and express your energy. It influences your adaptability, your choices, and your ability to flow with life.",
  };
}
