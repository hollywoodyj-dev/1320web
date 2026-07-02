import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import { appendUniqueSentences } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS0PageContent } from "@/lib/full-report-v2/resolve-s0-page-content";
import {
  MOBILE_S0_REVEAL_BRAND_NAME,
  MOBILE_S0_REVEAL_BRAND_SUBTITLE,
  MOBILE_S0_REVEAL_FALLBACK_ICON,
  MOBILE_S0_REVEAL_GIFT_ITEMS,
  MOBILE_S0_REVEAL_GIFTS_TITLE,
  MOBILE_S0_REVEAL_KICKER,
  MOBILE_S0_REVEAL_MEANING_FALLBACK,
  MOBILE_S0_REVEAL_MEANING_ICON,
  MOBILE_S0_REVEAL_MEANING_TITLE,
  MOBILE_S0_REVEAL_MODULE_LABEL,
  MOBILE_S0_REVEAL_MODULE_MEANING,
  MOBILE_S0_REVEAL_PAGE_INDEX,
  MOBILE_S0_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S0_REVEAL_REFLECTION_ICON,
  MOBILE_S0_REVEAL_REFLECTION_TITLE,
  MOBILE_S0_REVEAL_SUBTITLE_LINES,
  MOBILE_S0_REVEAL_TIP_FALLBACK,
  MOBILE_S0_REVEAL_TIP_ICON,
  MOBILE_S0_REVEAL_TIP_TITLE,
  MOBILE_S0_REVEAL_TITLE_EMPHASIS,
  MOBILE_S0_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s0-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS0RevealGift = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS0RevealPageContent = {
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
  gifts: MobileS0RevealGift[];
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

function buildRevealMeaning(
  slot: Record<string, unknown>,
  s0Page: ReturnType<typeof resolveS0PageContent>,
): string {
  const essence = asString(slot.essence);
  const coreIllusion = asString(slot.core_illusion);
  const voidChallenge = asString(slot.void_challenge) || asString(slot.illusion_mechanism);
  const guidance = asString(slot.wisewave_guidance);
  const pathOfReturn = asString(slot.path_of_return);

  const parts: string[] = [];

  if (essence) {
    parts.push(essence);
  } else if (s0Page.essenceBody) {
    parts.push(s0Page.essenceBody);
  } else if (coreIllusion) {
    parts.push(coreIllusion);
  } else if (s0Page.title) {
    parts.push(`Your S0 pattern centers on ${s0Page.title.replace(/\.$/, "")}.`);
  }

  if (voidChallenge && !parts.includes(voidChallenge)) {
    parts.push(voidChallenge);
  }

  if (pathOfReturn && parts.length < 2) {
    parts.push(pathOfReturn);
  }

  if (s0Page.essenceSecondary && !parts.some((part) => part.includes(s0Page.essenceSecondary.slice(0, 24)))) {
    parts.push(s0Page.essenceSecondary);
  }

  if (s0Page.keyInsight && !parts.includes(s0Page.keyInsight)) {
    parts.push(s0Page.keyInsight);
  }

  if (s0Page.keyInsightBold && !parts.includes(s0Page.keyInsightBold)) {
    parts.push(s0Page.keyInsightBold);
  }

  if (guidance && !parts.includes(guidance)) {
    parts.push(guidance);
  }

  return parts.join(" ") || MOBILE_S0_REVEAL_MEANING_FALLBACK;
}

function buildGifts(slot: Record<string, unknown>, strengths: string[]): MobileS0RevealGift[] {
  const gifts = asStringArray(slot.core_gifts);
  const traits = asStringArray(slot.soul_traits);
  const voidPower = asString(slot.void_power);
  const pathOfReturn = asString(slot.path_of_return);
  const guidance = asString(slot.wisewave_guidance);
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );

  const copySources = [
    voidPower || gifts[0] || traits[0] || strengths[0],
    pathOfReturn || gifts[1] || traits[1] || strengths[1],
    guidance || gifts[2] || traits[2] || strengths[2],
    integration || gifts[3] || traits[3] || strengths[3],
  ];

  return MOBILE_S0_REVEAL_GIFT_ITEMS.map((gift, index) => ({
    icon: gift.icon,
    title: gift.title,
    copy: copySources[index] ?? gift.copyFallback,
  }));
}

function buildIntegrationTip(slot: Record<string, unknown>): string {
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );
  const healing = asString(slot.healing_path);
  const guidance = asString(slot.wisewave_guidance);

  if (integration && integration.length > 24) return integration;

  if (healing && healing.length > 24) return healing;

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

  return MOBILE_S0_REVEAL_TIP_FALLBACK;
}

export function resolveMobileS0RevealContent(payload: FullReportV2Payload): MobileS0RevealPageContent {
  const s0Page = resolveS0PageContent(payload);
  const slot = payload.modules.s0;

  const reflection =
    asString(slot.reflection) ||
    s0Page.reflectionPrompts[0] ||
    MOBILE_S0_REVEAL_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S0_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S0_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S0_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S0_REVEAL_KICKER,
    titleLine: MOBILE_S0_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S0_REVEAL_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S0_REVEAL_SUBTITLE_LINES],
    code: s0Page.code,
    title: s0Page.title,
    fallbackIcon: MOBILE_S0_REVEAL_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s0", payload.calculation),
    revealBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    moduleLabel: MOBILE_S0_REVEAL_MODULE_LABEL,
    moduleMeaning: MOBILE_S0_REVEAL_MODULE_MEANING,
    meaningTitle: MOBILE_S0_REVEAL_MEANING_TITLE,
    meaningIcon: MOBILE_S0_REVEAL_MEANING_ICON,
    revealMeaning: appendUniqueSentences(buildRevealMeaning(slot, s0Page), [s0Page.essenceSecondary]),
    giftsTitle: MOBILE_S0_REVEAL_GIFTS_TITLE,
    gifts: buildGifts(slot, s0Page.strengths),
    reflectionTitle: MOBILE_S0_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S0_REVEAL_REFLECTION_ICON,
    reflectionPrompt: reflection,
    tipTitle: MOBILE_S0_REVEAL_TIP_TITLE,
    tipIcon: MOBILE_S0_REVEAL_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
