import { getMobileS3RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s3-reveal-background";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS3PageContent } from "@/lib/full-report-v2/resolve-s3-page-content";
import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";
import {
  MOBILE_S3_REVEAL_BRAND_NAME,
  MOBILE_S3_REVEAL_BRAND_SUBTITLE,
  MOBILE_S3_REVEAL_FALLBACK_ICON,
  MOBILE_S3_REVEAL_KICKER,
  MOBILE_S3_REVEAL_MEANING_FALLBACK,
  MOBILE_S3_REVEAL_MEANING_ICON,
  MOBILE_S3_REVEAL_MEANING_TITLE,
  MOBILE_S3_REVEAL_MIRROR_ITEMS,
  MOBILE_S3_REVEAL_MIRRORS_TITLE,
  MOBILE_S3_REVEAL_MODULE_LABEL,
  MOBILE_S3_REVEAL_MODULE_MEANING,
  MOBILE_S3_REVEAL_PAGE_INDEX,
  MOBILE_S3_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S3_REVEAL_REFLECTION_ICON,
  MOBILE_S3_REVEAL_REFLECTION_TITLE,
  MOBILE_S3_REVEAL_SUBTITLE_LINES,
  MOBILE_S3_REVEAL_TIP_FALLBACK,
  MOBILE_S3_REVEAL_TIP_ICON,
  MOBILE_S3_REVEAL_TIP_TITLE,
  MOBILE_S3_REVEAL_TITLE_EMPHASIS,
  MOBILE_S3_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s3-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS3RevealMirror = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS3RevealPageContent = {
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
  revealBackgroundUrl?: string;
  moduleLabel: string;
  moduleMeaning: string;
  meaningTitle: string;
  meaningIcon: string;
  revealMeaning: string;
  mirrorsTitle: string;
  mirrors: MobileS3RevealMirror[];
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
  title: string,
  essenceBody: string,
  keyInsight: string,
  influenceIntro: string,
): string {
  const essence = asString(slot.essence);
  const energy = asString(slot.energy_expression);
  const guidance = asString(slot.wisewave_guidance);
  const traits = asStringArray(slot.soul_traits);

  const parts: string[] = [];

  if (essence) {
    parts.push(essence);
  } else if (essenceBody) {
    parts.push(essenceBody);
  } else if (title) {
    parts.push(`You carry the vibration of ${title}.`);
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

  if (influenceIntro && !parts.includes(influenceIntro)) {
    parts.push(influenceIntro);
  }

  return parts.join(" ") || MOBILE_S3_REVEAL_MEANING_FALLBACK;
}

function buildMirrors(
  s3Page: ReturnType<typeof resolveS3PageContent>,
  slot: Record<string, unknown>,
): MobileS3RevealMirror[] {
  const traits = asStringArray(slot.soul_traits);
  const strengths = asStringArray(slot.core_gifts);
  const shadows = [...s3Page.shadowPatterns, ...asStringArray(slot.shadow_pattern)];
  const directions = asStringArray(slot.mission_direction);

  const copySources = [
    traits[0] || strengths[0],
    directions[0] || strengths[1] || traits[1],
    shadows[0] || traits[2],
    s3Page.expressionNodes[3]?.copy || strengths[2] || strengths[0] || traits[3],
    ...s3Page.expressionNodes.map((node) => node.copy),
    ...shadows.slice(1),
    s3Page.influenceIntro,
  ].filter(Boolean);

  return MOBILE_S3_REVEAL_MIRROR_ITEMS.map((mirror, index) => ({
    icon: mirror.icon,
    title: mirror.title,
    copy: copySources[index] ?? mirror.copyFallback,
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

  return MOBILE_S3_REVEAL_TIP_FALLBACK;
}

export function resolveMobileS3RevealContent(payload: FullReportV2Payload): MobileS3RevealPageContent {
  const s3Page = resolveS3PageContent(payload);
  const slot = payload.modules.s3;

  const reflection =
    asString(slot.reflection) ||
    s3Page.reflectionPrompts[0] ||
    MOBILE_S3_REVEAL_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S3_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S3_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S3_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S3_REVEAL_KICKER,
    titleLine: MOBILE_S3_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S3_REVEAL_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S3_REVEAL_SUBTITLE_LINES],
    code: s3Page.code,
    title: s3Page.title,
    fallbackIcon: MOBILE_S3_REVEAL_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s3", payload.calculation),
    revealBackgroundUrl: getMobileS3RevealBackgroundUrl(s3Page.code),
    moduleLabel: MOBILE_S3_REVEAL_MODULE_LABEL,
    moduleMeaning: MOBILE_S3_REVEAL_MODULE_MEANING,
    meaningTitle: MOBILE_S3_REVEAL_MEANING_TITLE,
    meaningIcon: MOBILE_S3_REVEAL_MEANING_ICON,
    revealMeaning: buildRevealMeaning(
      slot,
      s3Page.title,
      s3Page.essenceBody,
      s3Page.keyInsight,
      s3Page.influenceIntro,
    ),
    mirrorsTitle: MOBILE_S3_REVEAL_MIRRORS_TITLE,
    mirrors: buildMirrors(s3Page, slot),
    reflectionTitle: MOBILE_S3_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S3_REVEAL_REFLECTION_ICON,
    reflectionPrompt: reflection,
    tipTitle: MOBILE_S3_REVEAL_TIP_TITLE,
    tipIcon: MOBILE_S3_REVEAL_TIP_ICON,
    integrationTip: buildIntegrationTip(slot),
  };
}
