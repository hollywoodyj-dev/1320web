import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import {
  S0_EXPRESSION_ICONS,
  S0_ESSENCE_INTRO,
  S0_KEY_INSIGHT_BOLD,
  S0_KEY_INSIGHT_INTRO,
  type S0ExpressionCategory,
} from "@/lib/full-report-v2/s0-page-static";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type S0PageContent = {
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

function categoryIcon(category: S0ExpressionCategory, indexInCategory: number): ReportGlyphName {
  const icons = S0_EXPRESSION_ICONS[category];
  return icons[Math.min(indexInCategory, icons.length - 1)];
}

function buildExpressionNodes(
  illusion: string,
  power: string,
  returnPath: string,
  challenge: string,
  guidance: string,
): Array<{ icon: ReportGlyphName; copy: string }> {
  const nodes: Array<{ icon: ReportGlyphName; copy: string }> = [];
  const seen = new Set<string>();
  const categoryCounts: Record<S0ExpressionCategory, number> = {
    illusion: 0,
    power: 0,
    return: 0,
    challenge: 0,
    guidance: 0,
  };

  const addNode = (category: S0ExpressionCategory, copy: string) => {
    const key = copy.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    const index = categoryCounts[category];
    categoryCounts[category] += 1;
    nodes.push({ icon: categoryIcon(category, index), copy: key });
  };

  if (illusion) addNode("illusion", illusion);
  if (power) addNode("power", power);
  if (returnPath) addNode("return", returnPath);
  if (challenge) addNode("challenge", challenge);

  if (nodes.length < 6 && guidance) {
    splitSentences(guidance, 6 - nodes.length).forEach((copy) => addNode("guidance", copy));
  }

  return nodes.slice(0, 6);
}

function buildEssenceSecondary(coreIllusion: string, voidChallenge: string): string {
  if (coreIllusion && voidChallenge) {
    return `The core illusion here may show as ${coreIllusion.replace(/\.$/, "")}, often accompanied by ${voidChallenge.replace(/\.$/, "")}.`;
  }
  if (coreIllusion) {
    return `The core illusion here may show as ${coreIllusion.replace(/\.$/, "")}.`;
  }
  return "";
}

export function resolveS0PageContent(payload: FullReportV2Payload): S0PageContent {
  const slot = payload.modules.s0;
  const calc = payload.calculation.s0;

  const code = asString(slot.code) || calc.code;
  const title = asString(slot.title) || calc.title;
  const essence = asString(slot.essence);
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);
  const shadows = asStringArray(slot.shadow_pattern);
  const guidance = asString(slot.wisewave_guidance);
  const coreIllusion = asString(slot.core_illusion) || essence;
  const voidChallenge = asString(slot.void_challenge) || asString(slot.illusion_mechanism);
  const voidPower = asString(slot.void_power);
  const pathOfReturn = asString(slot.path_of_return);
  const reflection = asString(slot.reflection);

  const essenceSecondary = buildEssenceSecondary(coreIllusion, voidChallenge);

  const remembranceLines = splitSentences(guidance || pathOfReturn, 5);
  const reflectionPrompts = reflection ? [reflection] : [];

  return {
    code,
    title,
    essence,
    essenceBody: S0_ESSENCE_INTRO,
    essenceSecondary,
    strengths,
    shadowPatterns: shadows,
    remembranceLines,
    reflectionPrompts,
    expressionNodes: buildExpressionNodes(
      coreIllusion,
      voidPower,
      pathOfReturn,
      voidChallenge,
      guidance,
    ),
    keyInsight: S0_KEY_INSIGHT_INTRO,
    keyInsightBold: S0_KEY_INSIGHT_BOLD,
    influenceIntro:
      "Your Void Gate shapes how you meet emptiness, uncertainty, silence, and identity dissolution. It helps you see through illusion and return to the deeper self beneath performance.",
  };
}
