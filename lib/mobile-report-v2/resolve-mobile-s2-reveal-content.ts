import { getMobileS2RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s2-reveal-background";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS2PageContent } from "@/lib/full-report-v2/resolve-s2-page-content";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import {
  MOBILE_S2_REVEAL_BRAND_NAME,
  MOBILE_S2_REVEAL_BRAND_SUBTITLE,
  MOBILE_S2_REVEAL_FALLBACK_ICON,
  MOBILE_S2_REVEAL_GIFT_ITEMS,
  MOBILE_S2_REVEAL_GIFTS_TITLE,
  MOBILE_S2_REVEAL_KICKER,
  MOBILE_S2_REVEAL_MEANING_FALLBACK,
  MOBILE_S2_REVEAL_MEANING_ICON,
  MOBILE_S2_REVEAL_MEANING_TITLE,
  MOBILE_S2_REVEAL_MODULE_LABEL,
  MOBILE_S2_REVEAL_MODULE_MEANING,
  MOBILE_S2_REVEAL_PAGE_INDEX,
  MOBILE_S2_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S2_REVEAL_REFLECTION_ICON,
  MOBILE_S2_REVEAL_REFLECTION_TITLE,
  MOBILE_S2_REVEAL_SUBTITLE_LINES,
  MOBILE_S2_REVEAL_TIP_FALLBACK,
  MOBILE_S2_REVEAL_TIP_ICON,
  MOBILE_S2_REVEAL_TIP_TITLE,
  MOBILE_S2_REVEAL_TITLE_EMPHASIS,
  MOBILE_S2_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s2-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS2RevealGift = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS2RevealPageContent = {
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
  revealBackgroundUrl: string;
  moduleLabel: string;
  moduleMeaning: string;
  meaningTitle: string;
  meaningIcon: string;
  revealMeaning: string;
  giftsTitle: string;
  gifts: MobileS2RevealGift[];
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

function buildRevealMeaning(
  slot: Record<string, unknown>,
  s2Page: ReturnType<typeof resolveS2PageContent>,
): string {
  const essence = asString(slot.essence);
  const lesson = asString(slot.core_lesson);
  const guidance = asString(slot.wisewave_guidance);
  const traits = asStringArray(slot.soul_traits);

  const parts: string[] = [];

  if (essence) {
    parts.push(essence);
  } else if (s2Page.essenceBody) {
    parts.push(s2Page.essenceBody);
  } else if (s2Page.title) {
    parts.push(`You carry the mirror archetype of ${s2Page.title}.`);
  }

  if (lesson) {
    parts.push(lesson);
  }

  if (s2Page.essenceSecondary && !parts.includes(s2Page.essenceSecondary)) {
    parts.push(s2Page.essenceSecondary);
  }

  if (traits.length > 0 && parts.length < 2) {
    parts.push(traits.join(" "));
  }

  if (s2Page.keyInsight && !parts.includes(s2Page.keyInsight)) {
    parts.push(s2Page.keyInsight);
  }

  if (guidance && !parts.includes(guidance)) {
    parts.push(guidance);
  }

  if (s2Page.influenceIntro && !parts.includes(s2Page.influenceIntro)) {
    parts.push(s2Page.influenceIntro);
  }

  return parts.join(" ") || MOBILE_S2_REVEAL_MEANING_FALLBACK;
}

function buildGifts(
  s2Page: ReturnType<typeof resolveS2PageContent>,
  slot: Record<string, unknown>,
): MobileS2RevealGift[] {
  const gifts = asStringArray(slot.core_gifts);
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.strengths);
  const copySources = [
    ...(gifts.length > 0 ? gifts : []),
    ...traits,
    ...strengths,
    ...s2Page.expressionNodes.map((node) => node.copy),
    ...s2Page.shadowPatterns,
  ].filter(Boolean);

  return MOBILE_S2_REVEAL_GIFT_ITEMS.map((gift, index) => ({
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

  return MOBILE_S2_REVEAL_TIP_FALLBACK;
}

export function resolveMobileS2RevealContent(payload: FullReportV2Payload): MobileS2RevealPageContent {
  const s2Page = resolveS2PageContent(payload);
  const slot = payload.modules.s2;

  const reflection =
    asString(slot.reflection) ||
    s2Page.reflectionPrompts[0] ||
    MOBILE_S2_REVEAL_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S2_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S2_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S2_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S2_REVEAL_KICKER,
    titleLine: MOBILE_S2_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S2_REVEAL_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S2_REVEAL_SUBTITLE_LINES],
    code: s2Page.code,
    title: s2Page.title,
    fallbackIcon: MOBILE_S2_REVEAL_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s2", payload.calculation),
    revealBackgroundUrl: getMobileS2RevealBackgroundUrl(),
    moduleLabel: MOBILE_S2_REVEAL_MODULE_LABEL,
    moduleMeaning: MOBILE_S2_REVEAL_MODULE_MEANING,
    meaningTitle: MOBILE_S2_REVEAL_MEANING_TITLE,
    meaningIcon: MOBILE_S2_REVEAL_MEANING_ICON,
    revealMeaning: buildRevealMeaning(slot, s2Page),
    giftsTitle: MOBILE_S2_REVEAL_GIFTS_TITLE,
    gifts: buildGifts(s2Page, slot),
    reflectionTitle: MOBILE_S2_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S2_REVEAL_REFLECTION_ICON,
    reflectionPrompt: reflection,
    tipTitle: MOBILE_S2_REVEAL_TIP_TITLE,
    tipIcon: MOBILE_S2_REVEAL_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
