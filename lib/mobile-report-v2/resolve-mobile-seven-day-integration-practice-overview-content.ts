import { resolveSharedPracticeSection } from "@/lib/canonical-report/shared-tail-resolvers";
import { uniqueStrings } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_7DIP_BRAND_NAME,
  MOBILE_7DIP_BRAND_SUBTITLE,
  MOBILE_7DIP_DAYS,
  MOBILE_7DIP_DAYS_TITLE,
  MOBILE_7DIP_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_7DIP_KICKER,
  MOBILE_7DIP_MANTRA_CENTER,
  MOBILE_7DIP_MANTRA_LEFT,
  MOBILE_7DIP_MANTRA_RIGHT,
  MOBILE_7DIP_OVERVIEW_ICON,
  MOBILE_7DIP_OVERVIEW_TITLE,
  MOBILE_7DIP_PAGE_INDEX,
  MOBILE_7DIP_SEQUENCE_NOTE,
  MOBILE_7DIP_SEQUENCE_PILLS,
  MOBILE_7DIP_SEQUENCE_TITLE,
  MOBILE_7DIP_SUBTITLE,
  MOBILE_7DIP_TITLE_EMPHASIS,
  MOBILE_7DIP_TITLE_LINE,
  MOBILE_7DIP_USE_TITLE,
} from "@/lib/mobile-report-v2/seven-day-integration-practice-overview-page-static";
import {
  labelToModuleLayer,
  resolveMobileSModuleCardIcon,
  type MobileSModuleCardIconContent,
} from "@/lib/mobile-report-v2/resolve-mobile-s-module-card-icon";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type Mobile7DipDayCode = {
  tone: string;
  label: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
};

export type Mobile7DipDay = {
  key: string;
  day: number;
  title: string;
  codes: Mobile7DipDayCode[];
  moduleIcons: MobileSModuleCardIconContent[];
  copy: string;
  focus: string;
  reflection: string;
};

export type Mobile7DipSequencePill = {
  key: string;
  tone: string;
  label: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
};

export type Mobile7DayIntegrationPracticeOverviewPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  overviewIcon: string;
  overviewTitle: string;
  overviewLead: string;
  overviewEmphasis: string;
  overviewTail: string;
  sequenceTitle: string;
  sequencePills: Mobile7DipSequencePill[];
  sequenceNote: string;
  daysTitle: string;
  days: Mobile7DipDay[];
  useTitle: string;
  useRows: string[];
  closingIcon: string;
  closingTitle: string;
  closingLines: string[];
  closingEmphasis: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function pickOrFallback(value: string, fallback: string): string {
  return value.trim() || fallback;
}

export function resolveMobile7DayIntegrationPracticeOverviewContent(
  payload: FullReportV2Payload,
): Mobile7DayIntegrationPracticeOverviewPageContent {
  const practice = resolveSharedPracticeSection(payload);

  const days: Mobile7DipDay[] = MOBILE_7DIP_DAYS.map((dayShell, index) => {
    const desktopDay = practice.days[index];
    const moduleIcons = dayShell.codes.map((code) =>
      resolveMobileSModuleCardIcon(labelToModuleLayer(code.label), payload),
    );

    return {
      key: dayShell.key,
      day: dayShell.day,
      title: pickOrFallback(desktopDay?.themeTitle ?? "", dayShell.title),
      codes: moduleIcons.map((icon, codeIndex) => ({
        tone: dayShell.codes[codeIndex].tone,
        label: dayShell.codes[codeIndex].label,
        code: icon.code,
        title: icon.title,
        fallbackIcon: icon.fallbackIcon,
        imageUrl: icon.imageUrl,
      })),
      moduleIcons,
      copy: pickOrFallback(desktopDay?.practice ?? "", dayShell.copyFallback),
      focus: pickOrFallback(desktopDay?.focus ?? "", dayShell.focus),
      reflection: desktopDay?.reflection?.trim() ?? "",
    };
  });

  return {
    brandName: MOBILE_7DIP_BRAND_NAME,
    brandSubtitle: MOBILE_7DIP_BRAND_SUBTITLE,
    pageIndex: MOBILE_7DIP_PAGE_INDEX,
    kicker: MOBILE_7DIP_KICKER,
    titleLine: MOBILE_7DIP_TITLE_LINE,
    titleEmphasis: MOBILE_7DIP_TITLE_EMPHASIS,
    subtitle: practice.hero.subtitle || MOBILE_7DIP_SUBTITLE,
    overviewIcon: MOBILE_7DIP_OVERVIEW_ICON,
    overviewTitle: practice.purposeTitle || MOBILE_7DIP_OVERVIEW_TITLE,
    overviewLead: practice.purpose,
    overviewEmphasis: practice.openingReminder,
    overviewTail: practice.hero.description,
    sequenceTitle: MOBILE_7DIP_SEQUENCE_TITLE,
    sequencePills: MOBILE_7DIP_SEQUENCE_PILLS.map((pill) => {
      const icon = resolveMobileSModuleCardIcon(pill.key, payload);
      return {
        key: pill.key,
        tone: pill.tone,
        label: pill.label,
        code: icon.code,
        title: icon.title,
        fallbackIcon: icon.fallbackIcon,
        imageUrl: icon.imageUrl,
      };
    }),
    sequenceNote: MOBILE_7DIP_SEQUENCE_NOTE,
    daysTitle: MOBILE_7DIP_DAYS_TITLE,
    days,
    useTitle: MOBILE_7DIP_USE_TITLE,
    useRows: uniqueStrings(
      practice.guidelines,
      practice.reminders,
      [practice.journalIntro, ...practice.journalPrompts],
      [practice.integrationQuote, practice.keyInsight, practice.finalRemembrance],
    ),
    closingIcon: "✦",
    closingTitle: practice.keyInsightTitle,
    closingLines: uniqueStrings(
      [practice.supportsYou, practice.integrationTip],
      practice.reminders,
      [practice.integrationQuote, practice.keyInsight],
    ),
    closingEmphasis: practice.finalRemembrance,
    mantraLeft: MOBILE_7DIP_MANTRA_LEFT,
    mantraCenter: MOBILE_7DIP_MANTRA_CENTER,
    mantraRight: MOBILE_7DIP_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_7DIP_FOOTER_LOTUS_LOGO_SRC,
  };
}
