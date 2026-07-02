import { resolveSharedS9Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import {
  firstSentence,
  joinEssenceParagraphs,
  mapNodeFullCopies,
  padStringList,
  pickOrFallback,
  pickStringAt,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_BRAND_NAME,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_BRAND_SUBTITLE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_CODE_FALLBACK,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_CODE_LABEL,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_COPY_FALLBACK,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_ICON,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_TITLE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSIONS,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSION_TITLE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_KICKER,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_CENTER,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_LEFT,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_RIGHT,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ONE_LINE_RETURN_FALLBACK,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_PAGE_INDEX,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_EMPHASIS,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_ICON,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_LINES,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_TITLE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_SUBTITLE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_EMPHASIS,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_FALLBACK,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_LINE,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TRUTHS,
  MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TRUTHS_TITLE,
} from "@/lib/mobile-report-v2/s9-return-to-source-reveal-page-static";
import {
  getMobileS9ReturnToSourceRevealHeroBackgroundFallbackUrl,
  getMobileS9ReturnToSourceRevealHeroBackgroundUrl,
} from "@/lib/mobile-report-v2/get-mobile-s9-return-to-source-reveal-hero-background";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS9Truth = {
  key: string;
  tone: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS9Expression = {
  key: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS9ReturnToSourceRevealPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  heroBackgroundUrl: string;
  heroBackgroundFallbackUrl: string;
  codeLabel: string;
  code: string;
  title: string;
  oneLineReturn: string;
  essenceIcon: string;
  essenceTitle: string;
  essenceCopy: string;
  truthsTitle: string;
  truths: MobileS9Truth[];
  expressionTitle: string;
  expressions: MobileS9Expression[];
  reminderIcon: string;
  reminderTitle: string;
  reminderLines: string[];
  reminderEmphasis: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

export function resolveMobileS9ReturnToSourceRevealContent(
  payload: FullReportV2Payload,
): MobileS9ReturnToSourceRevealPageContent {
  const s9 = resolveSharedS9Section(payload);
  const code = s9.code || MOBILE_S9_RETURN_TO_SOURCE_REVEAL_CODE_FALLBACK;
  const title = s9.title || MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_FALLBACK;

  const returnShowsUp = padStringList(
    [...s9.returnShowsUp, pickStringAt(s9.essenceParagraphs, 1, ""), ...s9.reflectionPrompts],
    s9.gifts,
    5,
  );
  const mapCopies = mapNodeFullCopies(s9.mapNodes);
  const expressionCopies = padStringList(
    [...mapCopies, ...s9.returnShowsUp.slice(3)],
    MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSIONS.map((item) => item.copyFallback),
    MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSIONS.length,
  );

  const truths: MobileS9Truth[] = MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TRUTHS.map((item, index) => ({
    key: item.key,
    tone: item.tone,
    title: item.title,
    icon: item.icon,
    copy: pickOrFallback(returnShowsUp[index] ?? "", item.copyFallback),
  }));

  const expressions: MobileS9Expression[] = MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSIONS.map(
    (item, index) => ({
      key: item.key,
      title: item.title,
      icon: item.icon,
      copy: pickOrFallback(expressionCopies[index] ?? "", item.copyFallback),
    }),
  );

  const reminderSource = s9.finalRemembrance || s9.wisewaveGuidance;
  const reminderLines = reminderSource
    ? reminderSource
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [...MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_LINES];

  return {
    brandName: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_BRAND_NAME,
    brandSubtitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_BRAND_SUBTITLE,
    pageIndex: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_PAGE_INDEX,
    kicker: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_KICKER,
    titleLine: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_LINE,
    titleEmphasis: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TITLE_EMPHASIS,
    subtitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_SUBTITLE,
    heroBackgroundUrl: getMobileS9ReturnToSourceRevealHeroBackgroundUrl(),
    heroBackgroundFallbackUrl: getMobileS9ReturnToSourceRevealHeroBackgroundFallbackUrl(),
    codeLabel: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_CODE_LABEL,
    code,
    title,
    oneLineReturn: pickOrFallback(
      firstSentence(pickStringAt(s9.essenceParagraphs, 1, s9.returnShowsUp[0] ?? s9.essenceParagraphs[0] ?? "")),
      MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ONE_LINE_RETURN_FALLBACK,
    ),
    essenceIcon: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_ICON,
    essenceTitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_TITLE,
    essenceCopy: pickOrFallback(
      joinEssenceParagraphs(s9.essenceParagraphs),
      MOBILE_S9_RETURN_TO_SOURCE_REVEAL_ESSENCE_COPY_FALLBACK,
    ),
    truthsTitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_TRUTHS_TITLE,
    truths,
    expressionTitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_EXPRESSION_TITLE,
    expressions,
    reminderIcon: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_ICON,
    reminderTitle: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_TITLE,
    reminderLines,
    reminderEmphasis: pickOrFallback(s9.keyInsight, MOBILE_S9_RETURN_TO_SOURCE_REVEAL_REMINDER_EMPHASIS),
    mantraLeft: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_LEFT,
    mantraCenter: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_CENTER,
    mantraRight: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S9_RETURN_TO_SOURCE_REVEAL_FOOTER_LOTUS_LOGO_SRC,
  };
}
