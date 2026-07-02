import { resolveSharedPracticeSection } from "@/lib/canonical-report/shared-tail-resolvers";
import { uniqueStrings } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_7DPC_BRAND_NAME,
  MOBILE_7DPC_BRAND_SUBTITLE,
  MOBILE_7DPC_CARDS,
  MOBILE_7DPC_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_7DPC_INTRO_EMPHASIS,
  MOBILE_7DPC_INTRO_TAIL,
  MOBILE_7DPC_KICKER,
  MOBILE_7DPC_MANTRA_CENTER,
  MOBILE_7DPC_MANTRA_LEFT,
  MOBILE_7DPC_MANTRA_RIGHT,
  MOBILE_7DPC_PAGE_INDEX,
  MOBILE_7DPC_SUBTITLE,
  MOBILE_7DPC_TITLE_EMPHASIS,
  MOBILE_7DPC_TITLE_LINE,
} from "@/lib/mobile-report-v2/seven-day-practice-cards-page-static";
import {
  labelToModuleLayer,
  resolveMobileSModuleCardIcon,
  type MobileSModuleCardIconContent,
} from "@/lib/mobile-report-v2/resolve-mobile-s-module-card-icon";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type Mobile7DpcCardCode = {
  tone: string;
  label: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
};

export type Mobile7DpcCard = {
  key: string;
  day: number;
  tone: string;
  title: string;
  codes: Mobile7DpcCardCode[];
  moduleIcons: MobileSModuleCardIconContent[];
  copy: string;
  focus: string;
  reflection: string;
};

export type Mobile7DayPracticeCardsPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  introIcon: string;
  introTitle: string;
  introLead: string;
  introEmphasis: string;
  introTail: string;
  cards: Mobile7DpcCard[];
  consistencyTitle: string;
  consistencyCopy: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function pickOrFallback(value: string, fallback: string): string {
  return value.trim() || fallback;
}

export function resolveMobile7DayPracticeCardsContent(
  payload: FullReportV2Payload,
): Mobile7DayPracticeCardsPageContent {
  const practice = resolveSharedPracticeSection(payload);

  const cards: Mobile7DpcCard[] = MOBILE_7DPC_CARDS.map((cardShell, index) => {
    const desktopDay = practice.days[index];
    const moduleIcons = cardShell.codes.map((code) =>
      resolveMobileSModuleCardIcon(labelToModuleLayer(code.label), payload),
    );

    return {
      key: cardShell.key,
      day: cardShell.day,
      tone: cardShell.tone,
      title: pickOrFallback(desktopDay?.themeTitle ?? "", cardShell.title),
      codes: moduleIcons.map((icon, codeIndex) => ({
        tone: cardShell.codes[codeIndex].tone,
        label: cardShell.codes[codeIndex].label,
        code: icon.code,
        title: icon.title,
        fallbackIcon: icon.fallbackIcon,
        imageUrl: icon.imageUrl,
      })),
      moduleIcons,
      copy: pickOrFallback(desktopDay?.practice ?? "", cardShell.copyFallback),
      focus: desktopDay?.focus?.trim() ?? "",
      reflection: desktopDay?.reflection?.trim() ?? "",
    };
  });

  return {
    brandName: MOBILE_7DPC_BRAND_NAME,
    brandSubtitle: MOBILE_7DPC_BRAND_SUBTITLE,
    pageIndex: MOBILE_7DPC_PAGE_INDEX,
    kicker: MOBILE_7DPC_KICKER,
    titleLine: MOBILE_7DPC_TITLE_LINE,
    titleEmphasis: MOBILE_7DPC_TITLE_EMPHASIS,
    subtitle: practice.hero.subtitle || MOBILE_7DPC_SUBTITLE,
    introIcon: "✷",
    introTitle: practice.purposeTitle,
    introLead: practice.purpose,
    introEmphasis: MOBILE_7DPC_INTRO_EMPHASIS,
    introTail: MOBILE_7DPC_INTRO_TAIL,
    cards,
    consistencyTitle: practice.supportsYouTitle,
    consistencyCopy: uniqueStrings(
      [practice.integrationQuote, practice.supportsYou],
      practice.reminders,
      [practice.journalIntro, ...practice.journalPrompts],
      [practice.keyInsight, practice.finalRemembrance],
    ).join(" "),
    mantraLeft: MOBILE_7DPC_MANTRA_LEFT,
    mantraCenter: MOBILE_7DPC_MANTRA_CENTER,
    mantraRight: MOBILE_7DPC_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_7DPC_FOOTER_LOTUS_LOGO_SRC,
  };
}
