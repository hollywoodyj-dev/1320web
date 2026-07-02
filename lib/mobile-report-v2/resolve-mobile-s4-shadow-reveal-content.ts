import { resolveSharedS4Section } from "@/lib/canonical-report/shared-foundation-resolvers";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  firstSentence,
  padStringList,
  pickOrFallback,
  uniqueStrings,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS4PrimaryIconAsset } from "@/lib/full-report-v2/s4-icon-registry";
import {
  MOBILE_S4_SHADOW_REVEAL_BRAND_NAME,
  MOBILE_S4_SHADOW_REVEAL_BRAND_SUBTITLE,
  MOBILE_S4_SHADOW_REVEAL_CODE_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_CODE_LABEL,
  MOBILE_S4_SHADOW_REVEAL_CODE_SUMMARY_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_CORE_SHADOW_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_FALLBACK_ICON,
  MOBILE_S4_SHADOW_REVEAL_GIFT_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_INFO_CARDS,
  MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_ICON,
  MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_TITLE,
  MOBILE_S4_SHADOW_REVEAL_KICKER,
  MOBILE_S4_SHADOW_REVEAL_MANTRA_CENTER,
  MOBILE_S4_SHADOW_REVEAL_MANTRA_LEFT,
  MOBILE_S4_SHADOW_REVEAL_MANTRA_RIGHT,
  MOBILE_S4_SHADOW_REVEAL_ORIGIN_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_PAGE_INDEX,
  MOBILE_S4_SHADOW_REVEAL_PRACTICE_COPY_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_PRACTICE_ICON_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_PRACTICE_NAME_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_PRACTICE_TITLE,
  MOBILE_S4_SHADOW_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S4_SHADOW_REVEAL_INTEGRATION_PRACTICE_LOGO_SRC,
  MOBILE_S4_SHADOW_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_REFLECTION_ICON,
  MOBILE_S4_SHADOW_REVEAL_REFLECTION_TITLE,
  MOBILE_S4_SHADOW_REVEAL_SUBTITLE,
  MOBILE_S4_SHADOW_REVEAL_TITLE_EMPHASIS,
  MOBILE_S4_SHADOW_REVEAL_TITLE_FALLBACK,
  MOBILE_S4_SHADOW_REVEAL_TITLE_LINE,
} from "@/lib/mobile-report-v2/s4-shadow-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS4ShadowRevealInfoCard = {
  number: string;
  title: string;
  icon: string;
  copy: string;
  variant: "default" | "shadow";
};

export type MobileS4ShadowRevealPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  codeLabel: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  revealBackgroundUrl: string;
  infoCards: MobileS4ShadowRevealInfoCard[];
  integrationKeysTitle: string;
  integrationKeysIcon: string;
  integrationKeys: string[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  practiceTitle: string;
  practiceLogoUrl: string;
  practiceIconFallback: string;
  practiceName: string;
  practiceCopy: string;
  footerLotusLogoUrl: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
}


function stripQuotes(text: string): string {
  return text.replace(/^["“]|["”]$/g, "").trim();
}

function stripIntegrationBegin(text: string): string {
  return text.replace(/^The integration begins (?:through|when):\s*/i, "").trim();
}


function buildCoreShadowPattern(slot: Record<string, unknown>): string {
  const explicit = asString(slot.core_shadow_pattern);
  if (explicit) return explicit;

  const showsUp = asStringArray(slot.shows_up);
  if (showsUp.length > 0) {
    return showsUp
      .map((item) => firstSentence(item).replace(/\.$/, ""))
      .join(" · ");
  }

  const parts = [
    asString(slot.emotional_trigger),
    asString(slot.defense_pattern),
    asString(slot.hidden_need),
  ].filter(Boolean);

  if (parts.length > 0) {
    return parts.map((part) => firstSentence(part).replace(/\.$/, "")).join(" · ");
  }

  return MOBILE_S4_SHADOW_REVEAL_CORE_SHADOW_FALLBACK;
}

function buildIntegrationKeys(slot: Record<string, unknown>): string[] {
  const explicitKeys = [
    asString(slot.integration_key_1),
    asString(slot.integration_key_2),
    asString(slot.integration_key_3),
    asString(slot.integration_key_4),
  ].filter(Boolean);

  if (explicitKeys.length >= 4) return explicitKeys.slice(0, 4);

  const integration = stripIntegrationBegin(asString(slot.integration_key));
  if (integration) {
    const split = integration
      .split(/[.;]\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (split.length >= 2) {
      return [...split, ...MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_FALLBACK].slice(0, 4);
    }
  }

  return [...MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_FALLBACK];
}

export function resolveMobileS4ShadowRevealContent(
  payload: FullReportV2Payload,
): MobileS4ShadowRevealPageContent {
  const s4 = resolveSharedS4Section(payload);
  const slot = payload.modules.s4;
  const code = s4.code || MOBILE_S4_SHADOW_REVEAL_CODE_FALLBACK;
  const title = s4.title || MOBILE_S4_SHADOW_REVEAL_TITLE_FALLBACK;

  const s4Icon = resolveS4PrimaryIconAsset(code, title);
  const imageUrl = asString(slot.primary_icon_url) || s4Icon.primary_icon_url || undefined;

  const cycleCopyPool = uniqueStrings(
    s4.cycleSteps.flatMap((step) => [step.fullCopy, step.copy]),
    s4.showsUp,
  );

  const infoCopies = [
    pickOrFallback(s4.lifeInfluence, MOBILE_S4_SHADOW_REVEAL_CODE_SUMMARY_FALLBACK),
    pickOrFallback(
      cycleCopyPool.slice(0, 3).join(" "),
      buildCoreShadowPattern(slot),
    ),
    pickOrFallback(cycleCopyPool[1] ?? "", MOBILE_S4_SHADOW_REVEAL_ORIGIN_FALLBACK),
    pickOrFallback(s4.hiddenGifts[0] ?? s4.finalRemembrance, MOBILE_S4_SHADOW_REVEAL_GIFT_FALLBACK),
  ];

  const infoCards: MobileS4ShadowRevealInfoCard[] = MOBILE_S4_SHADOW_REVEAL_INFO_CARDS.map(
    (card, index) => ({
      number: card.number,
      title: card.title,
      icon: card.icon,
      copy: infoCopies[index] ?? "",
      variant: card.variant,
    }),
  );

  const reflectionPrompt = pickOrFallback(
    s4.reflectionPrompts[0] ?? stripQuotes(asString(slot.reflection_prompt) || asString(slot.reflection)),
    MOBILE_S4_SHADOW_REVEAL_REFLECTION_FALLBACK,
  );

  const integrationKeys = padStringList(
    uniqueStrings(s4.hiddenGifts, s4.reflectionPrompts.slice(1), cycleCopyPool),
    MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_FALLBACK,
    Math.max(4, cycleCopyPool.length),
  );

  return {
    brandName: MOBILE_S4_SHADOW_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S4_SHADOW_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S4_SHADOW_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S4_SHADOW_REVEAL_KICKER,
    titleLine: MOBILE_S4_SHADOW_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S4_SHADOW_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S4_SHADOW_REVEAL_SUBTITLE,
    codeLabel: MOBILE_S4_SHADOW_REVEAL_CODE_LABEL,
    code,
    title,
    fallbackIcon: MOBILE_S4_SHADOW_REVEAL_FALLBACK_ICON,
    imageUrl,
    revealBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    infoCards,
    integrationKeysTitle: MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_TITLE,
    integrationKeysIcon: MOBILE_S4_SHADOW_REVEAL_INTEGRATION_KEYS_ICON,
    integrationKeys,
    reflectionTitle: MOBILE_S4_SHADOW_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S4_SHADOW_REVEAL_REFLECTION_ICON,
    reflectionPrompt,
    practiceTitle: MOBILE_S4_SHADOW_REVEAL_PRACTICE_TITLE,
    practiceLogoUrl: MOBILE_S4_SHADOW_REVEAL_INTEGRATION_PRACTICE_LOGO_SRC,
    practiceIconFallback: MOBILE_S4_SHADOW_REVEAL_PRACTICE_ICON_FALLBACK,
    practiceName: pickOrFallback(asString(slot.practice_name), MOBILE_S4_SHADOW_REVEAL_PRACTICE_NAME_FALLBACK),
    practiceCopy: pickOrFallback(
      s4.reflectionPrompts[3] ?? s4.keyInsight,
      MOBILE_S4_SHADOW_REVEAL_PRACTICE_COPY_FALLBACK,
    ),
    footerLotusLogoUrl: MOBILE_S4_SHADOW_REVEAL_FOOTER_LOTUS_LOGO_SRC,
    mantraLeft: MOBILE_S4_SHADOW_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S4_SHADOW_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S4_SHADOW_REVEAL_MANTRA_RIGHT,
  };
}
