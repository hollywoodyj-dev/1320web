import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS1PageContent } from "@/lib/full-report-v2/resolve-s1-page-content";
import { uniqueStrings, appendUniqueSentences } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";import {
  MOBILE_S1_ESSENCE_BRAND_NAME,
  MOBILE_S1_ESSENCE_BRAND_SUBTITLE,
  MOBILE_S1_ESSENCE_ESSENCE_FALLBACK,
  MOBILE_S1_ESSENCE_ESSENCE_ICON,
  MOBILE_S1_ESSENCE_FALLBACK_ICON,
  MOBILE_S1_ESSENCE_GIFT_ITEMS,
  MOBILE_S1_ESSENCE_KICKER,
  MOBILE_S1_ESSENCE_PAGE_INDEX,
  MOBILE_S1_ESSENCE_REFLECTION_FALLBACK,
  MOBILE_S1_ESSENCE_REFLECTION_ICON,
  MOBILE_S1_ESSENCE_REFLECTION_TITLE,
  MOBILE_S1_ESSENCE_SECTION_ESSENCE,
  MOBILE_S1_ESSENCE_SECTION_GIFTS,
  MOBILE_S1_ESSENCE_SHORT_DESC_FALLBACK,
  MOBILE_S1_ESSENCE_SUBTITLE_LINES,
  MOBILE_S1_ESSENCE_SUMMARY_SUBTITLE,
  MOBILE_S1_ESSENCE_TIP_FALLBACK,
  MOBILE_S1_ESSENCE_TIP_ICON,
  MOBILE_S1_ESSENCE_TIP_TITLE,
  MOBILE_S1_ESSENCE_TITLE_EMPHASIS,
  MOBILE_S1_ESSENCE_TITLE_LINE,
  MOBILE_S1_ESSENCE_TITLE_TAIL,
} from "@/lib/mobile-report-v2/s1-essence-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS1EssenceGift = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS1EssencePageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  titleTail: string;
  subtitleLines: string[];
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  summarySubtitle: string;
  shortDescription: string;
  essenceTitle: string;
  essenceIcon: string;
  essenceParagraph: string;
  giftsTitle: string;
  gifts: MobileS1EssenceGift[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  tipTitle: string;
  tipIcon: string;
  integrationTip: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
}

function stripIntegrationPrefix(text: string): string {
  return text
    .replace(/^The integration begins when the user expresses this origin frequency without turning it into proof, pressure, or fixed identity\.\s*/i, "")
    .replace(/^The integration begins through:\s*/i, "")
    .trim();
}

function buildShortDescription(
  slot: Record<string, unknown>,
  title: string,
  essenceBody: string,
  keyInsight: string,
): string {
  const essence = asString(slot.essence);
  const lesson = asString(slot.core_lesson);
  const guidance = asString(slot.wisewave_guidance);
  const parts: string[] = [];

  if (essence) parts.push(essence);
  else if (essenceBody) parts.push(essenceBody);
  else if (title) parts.push(`You carry the archetype of ${title}.`);

  if (lesson) parts.push(lesson);
  if (guidance && !parts.includes(guidance)) parts.push(guidance);
  else if (keyInsight && !parts.includes(keyInsight)) parts.push(keyInsight);

  return parts.join(" ") || MOBILE_S1_ESSENCE_SHORT_DESC_FALLBACK;
}

function buildEssenceParagraph(
  slot: Record<string, unknown>,
  essenceHighlight: string,
  essenceBody: string,
  influenceIntro: string,
): string {
  const traits = asStringArray(slot.soul_traits);
  const essence = asString(slot.essence);
  const parts: string[] = [];

  if (essenceHighlight) {
    parts.push(`At your core, you carry the essence of ${essenceHighlight}.`);
  } else if (essence) {
    parts.push(essence);
  }

  if (traits.length > 0) {
    parts.push(traits.join(" "));
  } else if (essenceBody && !parts.includes(essenceBody)) {
    parts.push(essenceBody);
  }

  if (influenceIntro && !parts.includes(influenceIntro)) {
    parts.push(influenceIntro);
  }

  return parts.join(" ") || MOBILE_S1_ESSENCE_ESSENCE_FALLBACK;
}

function buildGifts(
  s1Page: ReturnType<typeof resolveS1PageContent>,
  slot: Record<string, unknown>,
): MobileS1EssenceGift[] {
  const expressionCopies = s1Page.expressionNodes.map((node) => node.copy);
  const copySources = uniqueStrings(
    expressionCopies.slice(3),
    expressionCopies,
    s1Page.shadowPatterns,
    asStringArray(slot.core_gifts),
    asStringArray(slot.soul_traits),
    asStringArray(slot.mission_direction),
  );

  return MOBILE_S1_ESSENCE_GIFT_ITEMS.map((gift, index) => ({
    icon: gift.icon,
    title: gift.title,
    copy: copySources[index] ?? gift.copyFallback,
  }));
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

  return MOBILE_S1_ESSENCE_TIP_FALLBACK;
}

export function resolveMobileS1EssenceContent(payload: FullReportV2Payload): MobileS1EssencePageContent {
  const s1Page = resolveS1PageContent(payload);
  const slot = payload.modules.s1;

  const reflection =
    asString(slot.reflection) ||
    s1Page.reflectionPrompts[0] ||
    MOBILE_S1_ESSENCE_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S1_ESSENCE_BRAND_NAME,
    brandSubtitle: MOBILE_S1_ESSENCE_BRAND_SUBTITLE,
    pageIndex: MOBILE_S1_ESSENCE_PAGE_INDEX,
    kicker: MOBILE_S1_ESSENCE_KICKER,
    titleLine: MOBILE_S1_ESSENCE_TITLE_LINE,
    titleEmphasis: MOBILE_S1_ESSENCE_TITLE_EMPHASIS,
    titleTail: MOBILE_S1_ESSENCE_TITLE_TAIL,
    subtitleLines: [...MOBILE_S1_ESSENCE_SUBTITLE_LINES],
    code: s1Page.code,
    title: s1Page.title,
    fallbackIcon: MOBILE_S1_ESSENCE_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s1", payload.calculation),
    summarySubtitle: MOBILE_S1_ESSENCE_SUMMARY_SUBTITLE,
    shortDescription: appendUniqueSentences(
      buildShortDescription(
        slot,
        s1Page.title,
        s1Page.essenceBody,
        s1Page.keyInsight,
      ),
      s1Page.shadowPatterns,
    ),
    essenceTitle: MOBILE_S1_ESSENCE_SECTION_ESSENCE,
    essenceIcon: MOBILE_S1_ESSENCE_ESSENCE_ICON,
    essenceParagraph: appendUniqueSentences(
      buildEssenceParagraph(
        slot,
        s1Page.essenceHighlight,
        s1Page.essenceBody,
        s1Page.influenceIntro,
      ),
      uniqueStrings(s1Page.expressionNodes.map((node) => node.copy), s1Page.shadowPatterns),
    ),
    giftsTitle: MOBILE_S1_ESSENCE_SECTION_GIFTS,
    gifts: buildGifts(s1Page, slot),
    reflectionTitle: MOBILE_S1_ESSENCE_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S1_ESSENCE_REFLECTION_ICON,
    reflectionPrompt: reflection,
    tipTitle: MOBILE_S1_ESSENCE_TIP_TITLE,
    tipIcon: MOBILE_S1_ESSENCE_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
