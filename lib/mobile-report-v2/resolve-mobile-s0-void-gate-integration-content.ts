import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import { appendUniqueSentences } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import { resolveS0PageContent } from "@/lib/full-report-v2/resolve-s0-page-content";
import {
  MOBILE_S0_VOID_INTEGRATION_BRAND_NAME,
  MOBILE_S0_VOID_INTEGRATION_BRAND_SUBTITLE,
  MOBILE_S0_VOID_INTEGRATION_FALLBACK_ICON,
  MOBILE_S0_VOID_INTEGRATION_KEY_ITEMS,
  MOBILE_S0_VOID_INTEGRATION_KEYS_TITLE,
  MOBILE_S0_VOID_INTEGRATION_KICKER,
  MOBILE_S0_VOID_INTEGRATION_MEANING_FALLBACK,
  MOBILE_S0_VOID_INTEGRATION_MEANING_ICON,
  MOBILE_S0_VOID_INTEGRATION_MEANING_TITLE,
  MOBILE_S0_VOID_INTEGRATION_MODULE_LABEL,
  MOBILE_S0_VOID_INTEGRATION_PAGE_INDEX,
  MOBILE_S0_VOID_INTEGRATION_PRACTICE_FALLBACK,
  MOBILE_S0_VOID_INTEGRATION_PRACTICE_ICON,
  MOBILE_S0_VOID_INTEGRATION_PRACTICE_TITLE,
  MOBILE_S0_VOID_INTEGRATION_REFLECTION_FALLBACK,
  MOBILE_S0_VOID_INTEGRATION_REFLECTION_ICON,
  MOBILE_S0_VOID_INTEGRATION_REFLECTION_TITLE,
  MOBILE_S0_VOID_INTEGRATION_SHORT_LINE_FALLBACK,
  MOBILE_S0_VOID_INTEGRATION_SUBTITLE_LINES,
  MOBILE_S0_VOID_INTEGRATION_TITLE_EMPHASIS,
  MOBILE_S0_VOID_INTEGRATION_TITLE_LINE,
} from "@/lib/mobile-report-v2/s0-void-gate-integration-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS0VoidIntegrationKey = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileS0VoidIntegrationPageContent = {
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
  summaryBackgroundUrl: string;
  moduleLabel: string;
  shortVoidGateLine: string;
  meaningTitle: string;
  meaningIcon: string;
  voidGateMeaning: string;
  keysTitle: string;
  integrationKeys: MobileS0VoidIntegrationKey[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  practiceTitle: string;
  practiceIcon: string;
  integrationPractice: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stripIntegrationPrefix(text: string): string {
  return text
    .replace(/^The integration begins when the user expresses this origin frequency without turning it into proof, pressure, or fixed identity\.\s*/i, "")
    .replace(/^The integration begins through:\s*/i, "")
    .trim();
}

function buildShortVoidGateLine(slot: Record<string, unknown>, essenceSecondary: string): string {
  const coreIllusion = asString(slot.core_illusion);
  const essence = asString(slot.essence);
  if (essenceSecondary) return essenceSecondary;
  if (coreIllusion) return coreIllusion;
  if (essence) return essence;
  return MOBILE_S0_VOID_INTEGRATION_SHORT_LINE_FALLBACK;
}

function buildVoidGateMeaning(
  slot: Record<string, unknown>,
  s0Page: ReturnType<typeof resolveS0PageContent>,
): string {
  const essence = asString(slot.essence);
  const coreIllusion = asString(slot.core_illusion);
  const voidChallenge = asString(slot.void_challenge) || asString(slot.illusion_mechanism);
  const voidPower = asString(slot.void_power);

  const parts: string[] = [];

  if (s0Page.essenceBody) parts.push(s0Page.essenceBody);
  else if (essence) parts.push(essence);
  else if (coreIllusion) parts.push(coreIllusion);

  if (voidChallenge && !parts.includes(voidChallenge)) parts.push(voidChallenge);
  if (voidPower && parts.length < 2) parts.push(voidPower);
  if (s0Page.essenceSecondary && !parts.some((part) => part.includes(s0Page.essenceSecondary.slice(0, 24)))) {
    parts.push(s0Page.essenceSecondary);
  }
  if (s0Page.keyInsight && !parts.includes(s0Page.keyInsight)) parts.push(s0Page.keyInsight);
  if (s0Page.keyInsightBold && !parts.includes(s0Page.keyInsightBold)) parts.push(s0Page.keyInsightBold);

  return parts.join(" ") || MOBILE_S0_VOID_INTEGRATION_MEANING_FALLBACK;
}

function buildIntegrationKeys(
  s0Page: ReturnType<typeof resolveS0PageContent>,
  slot: Record<string, unknown>,
): MobileS0VoidIntegrationKey[] {
  const coreIllusion = asString(slot.core_illusion);
  const voidChallenge = asString(slot.void_challenge) || asString(slot.illusion_mechanism);
  const pathOfReturn = asString(slot.path_of_return);
  const voidPower = asString(slot.void_power);
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );
  const healing = asString(slot.healing_path);

  const copySources = [
    coreIllusion || voidChallenge || s0Page.essenceBody,
    pathOfReturn || voidPower || s0Page.keyInsight,
    integration || healing || s0Page.keyInsightBold,
  ].filter(Boolean);

  return MOBILE_S0_VOID_INTEGRATION_KEY_ITEMS.map((key, index) => ({
    icon: key.icon,
    title: key.title,
    copy: copySources[index] ?? key.copyFallback,
  }));
}

function buildIntegrationPractice(
  payload: FullReportV2Payload,
  slot: Record<string, unknown>,
): string {
  const healing = asString(slot.healing_path);
  const integration = stripIntegrationPrefix(
    asString(slot.integration_advice) || asString(slot.integration_key),
  );
  const guidance = asString(slot.wisewave_guidance);
  const embodiment = asString(payload.integrated_blueprint.embodiment_practice);

  if (healing && healing.length > 40) return healing;

  if (integration && integration.length > 40) return integration;

  if (embodiment && embodiment.length > 40) return embodiment;

  const practiceDay = payload.integration_practice.days.find((day) => day.day === 0 || day.day === 1);
  if (practiceDay?.practice) return practiceDay.practice;

  if (guidance) {
    const sentences = guidance
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (sentences.length >= 3) {
      return sentences.slice(-3).join(" ");
    }
    return guidance;
  }

  return MOBILE_S0_VOID_INTEGRATION_PRACTICE_FALLBACK;
}

export function resolveMobileS0VoidGateIntegrationContent(
  payload: FullReportV2Payload,
): MobileS0VoidIntegrationPageContent {
  const s0Page = resolveS0PageContent(payload);
  const slot = payload.modules.s0;

  const reflection =
    asString(slot.reflection) ||
    s0Page.reflectionPrompts[0] ||
    MOBILE_S0_VOID_INTEGRATION_REFLECTION_FALLBACK;

  return {
    brandName: MOBILE_S0_VOID_INTEGRATION_BRAND_NAME,
    brandSubtitle: MOBILE_S0_VOID_INTEGRATION_BRAND_SUBTITLE,
    pageIndex: MOBILE_S0_VOID_INTEGRATION_PAGE_INDEX,
    kicker: MOBILE_S0_VOID_INTEGRATION_KICKER,
    titleLine: MOBILE_S0_VOID_INTEGRATION_TITLE_LINE,
    titleEmphasis: MOBILE_S0_VOID_INTEGRATION_TITLE_EMPHASIS,
    subtitleLines: [...MOBILE_S0_VOID_INTEGRATION_SUBTITLE_LINES],
    code: s0Page.code,
    title: s0Page.title,
    fallbackIcon: MOBILE_S0_VOID_INTEGRATION_FALLBACK_ICON,
    imageUrl: getSignatureCardImageUrl("s0", payload.calculation),
    summaryBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    moduleLabel: MOBILE_S0_VOID_INTEGRATION_MODULE_LABEL,
    shortVoidGateLine: buildShortVoidGateLine(slot, s0Page.essenceSecondary),
    meaningTitle: MOBILE_S0_VOID_INTEGRATION_MEANING_TITLE,
    meaningIcon: MOBILE_S0_VOID_INTEGRATION_MEANING_ICON,
    voidGateMeaning: appendUniqueSentences(buildVoidGateMeaning(slot, s0Page), [s0Page.essenceSecondary]),
    keysTitle: MOBILE_S0_VOID_INTEGRATION_KEYS_TITLE,
    integrationKeys: buildIntegrationKeys(s0Page, slot),
    reflectionTitle: MOBILE_S0_VOID_INTEGRATION_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S0_VOID_INTEGRATION_REFLECTION_ICON,
    reflectionPrompt: reflection,
    practiceTitle: MOBILE_S0_VOID_INTEGRATION_PRACTICE_TITLE,
    practiceIcon: MOBILE_S0_VOID_INTEGRATION_PRACTICE_ICON,
    integrationPractice: buildIntegrationPractice(payload, slot),
  };
}
