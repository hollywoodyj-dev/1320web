import { getMobileS3RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s3-reveal-background";
import {
  appendUniqueSentences,
  uniqueStrings,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS3PageContent } from "@/lib/full-report-v2/resolve-s3-page-content";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import {
  MOBILE_S3_EXPRESSION_BRAND_NAME,
  MOBILE_S3_EXPRESSION_BRAND_SUBTITLE,
  MOBILE_S3_EXPRESSION_FALLBACK_ICON,
  MOBILE_S3_EXPRESSION_FREQUENCY_FALLBACK,
  MOBILE_S3_EXPRESSION_FREQUENCY_ICON,
  MOBILE_S3_EXPRESSION_FREQUENCY_TITLE,
  MOBILE_S3_EXPRESSION_GRID_TITLE,
  MOBILE_S3_EXPRESSION_ITEMS,
  MOBILE_S3_EXPRESSION_KICKER,
  MOBILE_S3_EXPRESSION_MODULE_LABEL,
  MOBILE_S3_EXPRESSION_MODULE_MEANING,
  MOBILE_S3_EXPRESSION_PAGE_INDEX,
  MOBILE_S3_EXPRESSION_REFLECTION_FALLBACK,
  MOBILE_S3_EXPRESSION_REFLECTION_ICON,
  MOBILE_S3_EXPRESSION_REFLECTION_TITLE,
  MOBILE_S3_EXPRESSION_SUBTITLE_LINES,
  MOBILE_S3_EXPRESSION_TIP_FALLBACK,
  MOBILE_S3_EXPRESSION_TIP_ICON,
  MOBILE_S3_EXPRESSION_TIP_TITLE,
  MOBILE_S3_EXPRESSION_TITLE_EMPHASIS,
  MOBILE_S3_EXPRESSION_TITLE_LINE,
} from "@/lib/mobile-report-v2/s3-expression-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS3ExpressionItem = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS3ExpressionPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitleLines: string[];
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  summaryBackgroundUrl?: string;
  moduleLabel: string;
  moduleMeaning: string;
  frequencyTitle: string;
  frequencyIcon: string;
  vibrationFrequencyCopy: string;
  expressionTitle: string;
  expressionItems: MobileS3ExpressionItem[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  tipTitle: string;
  tipIcon: string;
  integrationTip: string;
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

function stripIntegrationPrefix(text: string): string {
  return text
    .replace(/^The integration begins when the user expresses this origin frequency without turning it into proof, pressure, or fixed identity\.\s*/i, "")
    .replace(/^The integration begins through:\s*/i, "")
    .trim();
}

function buildVibrationFrequencyCopy(
  slot: Record<string, unknown>,
  essenceBody: string,
  keyInsight: string,
  title: string,
): string {
  const essence = asString(slot.essence);
  const energy = asString(slot.energy_expression);
  const traits = asStringArray(slot.soul_traits);
  const guidance = asString(slot.wisewave_guidance);

  const parts: string[] = [];

  if (essence) {
    parts.push(essence);
  } else if (essenceBody) {
    parts.push(essenceBody);
  } else if (title) {
    parts.push(`You vibrate at the frequency of ${title}.`);
  }

  if (energy && !parts.includes(energy)) {
    parts.push(energy);
  }

  if (traits.length > 0 && parts.length < 2) {
    parts.push(traits.join(" "));
  }

  if (guidance && !parts.includes(guidance)) {
    parts.push(guidance);
  } else if (keyInsight && !parts.includes(keyInsight)) {
    parts.push(keyInsight);
  }

  return parts.join(" ") || MOBILE_S3_EXPRESSION_FREQUENCY_FALLBACK;
}

function buildExpressionItems(
  s3Page: ReturnType<typeof resolveS3PageContent>,
  slot: Record<string, unknown>,
): MobileS3ExpressionItem[] {
  const copySources = uniqueStrings(
    s3Page.shadowPatterns,
    s3Page.expressionNodes.map((node) => node.copy),
    asStringArray(slot.soul_traits),
    asStringArray(slot.core_gifts),
    asStringArray(slot.mission_direction),
    asString(slot.integration_advice) || asString(slot.integration_key),
    s3Page.influenceIntro,
  );

  return MOBILE_S3_EXPRESSION_ITEMS.map((item, index) => ({
    icon: item.icon,
    title: item.title,
    copy: copySources[index] ?? item.copyFallback,
  }));
}

function buildExpressionReflection(slot: Record<string, unknown>, fallbackPrompts: string[]): string {
  const reflection = asString(slot.reflection);
  if (reflection) return reflection;
  if (fallbackPrompts[0]) return fallbackPrompts[0];
  return MOBILE_S3_EXPRESSION_REFLECTION_FALLBACK;
}

function buildIntegrationTip(slot: Record<string, unknown>): string {
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );
  const guidance = asString(slot.wisewave_guidance);

  if (integration && integration.length > 24) return integration;

  if (guidance) {
    const sentences = guidance
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (sentences.length >= 2) {
      return `${sentences[sentences.length - 2]} ${sentences[sentences.length - 1]}`;
    }
    return guidance;
  }

  return MOBILE_S3_EXPRESSION_TIP_FALLBACK;
}

export function resolveMobileS3ExpressionContent(payload: FullReportV2Payload): MobileS3ExpressionPageContent {
  const s3Page = resolveS3PageContent(payload);
  const slot = payload.modules.s3;

  return {
    brandName: MOBILE_S3_EXPRESSION_BRAND_NAME,
    brandSubtitle: MOBILE_S3_EXPRESSION_BRAND_SUBTITLE,
    pageIndex: MOBILE_S3_EXPRESSION_PAGE_INDEX,
    kicker: MOBILE_S3_EXPRESSION_KICKER,
    titleLine: MOBILE_S3_EXPRESSION_TITLE_LINE,
    titleEmphasis: MOBILE_S3_EXPRESSION_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S3_EXPRESSION_SUBTITLE_LINES],
    code: s3Page.code,
    title: s3Page.title,
    fallbackIcon: MOBILE_S3_EXPRESSION_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s3", payload.calculation),
    summaryBackgroundUrl: getMobileS3RevealBackgroundUrl(s3Page.code),
    moduleLabel: MOBILE_S3_EXPRESSION_MODULE_LABEL,
    moduleMeaning: MOBILE_S3_EXPRESSION_MODULE_MEANING,
    frequencyTitle: MOBILE_S3_EXPRESSION_FREQUENCY_TITLE,
    frequencyIcon: MOBILE_S3_EXPRESSION_FREQUENCY_ICON,
    vibrationFrequencyCopy: appendUniqueSentences(
      buildVibrationFrequencyCopy(
        slot,
        s3Page.essenceBody,
        s3Page.keyInsight,
        s3Page.title,
      ),
      uniqueStrings(
        s3Page.shadowPatterns.slice(MOBILE_S3_EXPRESSION_ITEMS.length),
        s3Page.expressionNodes.map((node) => node.copy).slice(MOBILE_S3_EXPRESSION_ITEMS.length),
      ),
    ),
    expressionTitle: MOBILE_S3_EXPRESSION_GRID_TITLE,
    expressionItems: buildExpressionItems(s3Page, slot),
    reflectionTitle: MOBILE_S3_EXPRESSION_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S3_EXPRESSION_REFLECTION_ICON,
    reflectionPrompt: buildExpressionReflection(slot, s3Page.reflectionPrompts),
    tipTitle: MOBILE_S3_EXPRESSION_TIP_TITLE,
    tipIcon: MOBILE_S3_EXPRESSION_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
