import { resolveSharedS6Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  firstSentence,
  joinEssenceParagraphs,
  padStringList,
  pickOrFallback,
  pickStringAt,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS6PrimaryIconAsset } from "@/lib/full-report-v2/s6-icon-registry";
import {
  MOBILE_S6_VALUE_RECEIVING_REVEAL_BRAND_NAME,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_BRAND_SUBTITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_CODE_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_CODE_LABEL,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_CORE_VALUES_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_CORE_VALUES_TITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_ICON,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_LOGO_SRC,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_TITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_FALLBACK_ICON,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_KICKER,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_LOTUS_COPY,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_LOTUS_FALLBACK_ICON,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_CENTER,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_LEFT,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_RIGHT,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_ONE_LINE_VALUE_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_PAGE_INDEX,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_ICON,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_TITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_TODAY_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_QUOTE_BEFORE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_QUOTE_EMPHASIS,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_RECEIVING_STYLES_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_RECEIVING_TITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_ICON,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_TITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_SUBTITLE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_EMPHASIS,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_FALLBACK,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_LINE,
  MOBILE_S6_VALUE_RECEIVING_REVEAL_VALUE_ESSENCE_FALLBACK,
} from "@/lib/mobile-report-v2/s6-value-receiving-reveal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS6CoreValueItem = {
  title: string;
  copy: string;
  icon: string;
};

export type MobileS6ValueReceivingRevealPageContent = {
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
  oneLineValue: string;
  lotusCopy: string;
  lotusFallbackIcon: string;
  essenceTitle: string;
  essenceIcon: string;
  essenceLogoUrl: string;
  valueEssence: string;
  coreValuesTitle: string;
  coreValues: MobileS6CoreValueItem[];
  receivingTitle: string;
  receivingStyles: string[];
  reflectionTitle: string;
  reflectionIcon: string;
  reflectionPrompt: string;
  practiceTitle: string;
  practiceIcon: string;
  practiceToday: string;
  quoteBefore: string;
  quoteEmphasis: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function buildCoreValues(gifts: string[], showsUp: string[]): MobileS6CoreValueItem[] {
  const sources = [...gifts, ...showsUp];
  return MOBILE_S6_VALUE_RECEIVING_REVEAL_CORE_VALUES_FALLBACK.map((fallback, index) => ({
    title: fallback.title,
    copy: pickOrFallback(sources[index] ?? "", fallback.copy),
    icon: fallback.icon,
  }));
}

export function resolveMobileS6ValueReceivingRevealContent(
  payload: FullReportV2Payload,
): MobileS6ValueReceivingRevealPageContent {
  const s6 = resolveSharedS6Section(payload);
  const code = s6.code || MOBILE_S6_VALUE_RECEIVING_REVEAL_CODE_FALLBACK;
  const title = s6.title || MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_FALLBACK;

  const s6Icon = resolveS6PrimaryIconAsset(code, title);
  const imageUrl = s6.primary_icon_url || s6Icon.primary_icon_url || undefined;

  const valueEssence = pickOrFallback(
    joinEssenceParagraphs(s6.essenceParagraphs),
    MOBILE_S6_VALUE_RECEIVING_REVEAL_VALUE_ESSENCE_FALLBACK,
  );

  const receivingStyles = padStringList(
    [...s6.receivingShowsUp, ...s6.gifts],
    MOBILE_S6_VALUE_RECEIVING_REVEAL_RECEIVING_STYLES_FALLBACK,
    4,
  );

  return {
    brandName: MOBILE_S6_VALUE_RECEIVING_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S6_VALUE_RECEIVING_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S6_VALUE_RECEIVING_REVEAL_KICKER,
    titleLine: MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S6_VALUE_RECEIVING_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_SUBTITLE,
    codeLabel: MOBILE_S6_VALUE_RECEIVING_REVEAL_CODE_LABEL,
    code,
    title,
    fallbackIcon: MOBILE_S6_VALUE_RECEIVING_REVEAL_FALLBACK_ICON,
    imageUrl,
    revealBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    oneLineValue: pickOrFallback(
      firstSentence(pickStringAt(s6.essenceParagraphs, 1, s6.receivingShowsUp[0] ?? s6.essenceParagraphs[0] ?? "")),
      MOBILE_S6_VALUE_RECEIVING_REVEAL_ONE_LINE_VALUE_FALLBACK,
    ),
    lotusCopy: pickOrFallback(s6.keyInsight, MOBILE_S6_VALUE_RECEIVING_REVEAL_LOTUS_COPY),
    lotusFallbackIcon: MOBILE_S6_VALUE_RECEIVING_REVEAL_LOTUS_FALLBACK_ICON,
    essenceTitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_TITLE,
    essenceIcon: MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_ICON,
    essenceLogoUrl: MOBILE_S6_VALUE_RECEIVING_REVEAL_ESSENCE_LOGO_SRC,
    valueEssence,
    coreValuesTitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_CORE_VALUES_TITLE,
    coreValues: buildCoreValues(s6.gifts, s6.receivingShowsUp),
    receivingTitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_RECEIVING_TITLE,
    receivingStyles,
    reflectionTitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_TITLE,
    reflectionIcon: MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_ICON,
    reflectionPrompt: pickOrFallback(
      pickStringAt(s6.reflectionPrompts, 0, ""),
      MOBILE_S6_VALUE_RECEIVING_REVEAL_REFLECTION_FALLBACK,
    ),
    practiceTitle: MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_TITLE,
    practiceIcon: MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_ICON,
    practiceToday: pickOrFallback(s6.integrationGuidance, MOBILE_S6_VALUE_RECEIVING_REVEAL_PRACTICE_TODAY_FALLBACK),
    quoteBefore: MOBILE_S6_VALUE_RECEIVING_REVEAL_QUOTE_BEFORE,
    quoteEmphasis: MOBILE_S6_VALUE_RECEIVING_REVEAL_QUOTE_EMPHASIS,
    mantraLeft: MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S6_VALUE_RECEIVING_REVEAL_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S6_VALUE_RECEIVING_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  };
}
