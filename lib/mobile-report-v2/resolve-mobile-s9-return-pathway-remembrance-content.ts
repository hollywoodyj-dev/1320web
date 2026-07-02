import { resolveSharedS9Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import {
  joinEssenceParagraphs,
  mapNodeFullCopies,
  padStringList,
  pickOrFallback,
  pickStringAt,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_BRAND_NAME,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_BRAND_SUBTITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_COPY_FALLBACK,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_ICON,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_TITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KEYS,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KEYS_TITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KICKER,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_CENTER,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_LEFT,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_RIGHT,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PAGE_INDEX,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PATHWAY_STEPS,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PATHWAY_TITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_EMPHASIS,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_ICON,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_LINES,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_TAIL,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_TITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_SUBTITLE,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_TITLE_EMPHASIS,
  MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_TITLE_LINE,
} from "@/lib/mobile-report-v2/s9-return-pathway-remembrance-page-static";
import { getMobileS9ReturnPathwayRemembranceHeroBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s9-return-pathway-remembrance-hero-background";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS9ReturnPathwayStep = {
  key: string;
  tone: string;
  stepLabel: string;
  stepTitle: string;
  icon: string;
  stepMain: string;
  stepCopy: string;
};

export type MobileS9RemembranceKey = {
  key: string;
  tone: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS9ReturnPathwayRemembrancePageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  heroBackgroundUrl: string;
  essenceIcon: string;
  essenceTitle: string;
  essenceCopy: string;
  pathwayTitle: string;
  pathwaySteps: MobileS9ReturnPathwayStep[];
  keysTitle: string;
  keys: MobileS9RemembranceKey[];
  reminderIcon: string;
  reminderTitle: string;
  reminderLines: string[];
  reminderTail: string;
  reminderEmphasis: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

export function resolveMobileS9ReturnPathwayRemembranceContent(
  payload: FullReportV2Payload,
): MobileS9ReturnPathwayRemembrancePageContent {
  const s9 = resolveSharedS9Section(payload);

  const pathwayCopies = [
    ...mapNodeFullCopies(s9.mapNodes),
    s9.integrationGuidance,
    s9.finalRemembrance,
  ].filter(Boolean);

  const pathwaySteps: MobileS9ReturnPathwayStep[] =
    MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PATHWAY_STEPS.map((step, index) => ({
      key: step.key,
      tone: step.tone,
      stepLabel: step.stepLabel,
      stepTitle: step.stepTitle,
      icon: step.icon,
      stepMain: step.titleFallback,
      stepCopy: pickOrFallback(pathwayCopies[index] ?? "", step.copyFallback),
    }));

  const keyCopies = padStringList(
    [
      ...s9.reflectionPrompts,
      ...s9.gifts,
      ...s9.returnShowsUp,
      s9.lifeInfluence,
      pickStringAt(s9.essenceParagraphs, 1, ""),
    ],
    MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KEYS.map((item) => item.copyFallback),
    4,
  );

  const keys: MobileS9RemembranceKey[] = MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KEYS.map(
    (item, index) => ({
      key: item.key,
      tone: item.tone,
      title: item.title,
      icon: item.icon,
      copy: pickOrFallback(keyCopies[index] ?? "", item.copyFallback),
    }),
  );

  const reminderSource = s9.wisewaveGuidance || s9.finalRemembrance;
  const reminderLines = reminderSource
    ? reminderSource
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => line && !/^You are already\b/i.test(line))
    : [...MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_LINES];

  return {
    brandName: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_BRAND_NAME,
    brandSubtitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_BRAND_SUBTITLE,
    pageIndex: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PAGE_INDEX,
    kicker: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KICKER,
    titleLine: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_TITLE_LINE,
    titleEmphasis: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_TITLE_EMPHASIS,
    subtitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_SUBTITLE,
    heroBackgroundUrl: getMobileS9ReturnPathwayRemembranceHeroBackgroundUrl(),
    essenceIcon: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_ICON,
    essenceTitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_TITLE,
    essenceCopy: pickOrFallback(
      joinEssenceParagraphs(s9.essenceParagraphs),
      MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_ESSENCE_COPY_FALLBACK,
    ),
    pathwayTitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_PATHWAY_TITLE,
    pathwaySteps,
    keysTitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_KEYS_TITLE,
    keys,
    reminderIcon: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_ICON,
    reminderTitle: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_TITLE,
    reminderLines,
    reminderTail: pickOrFallback(s9.finalRemembrance, MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_TAIL),
    reminderEmphasis: pickOrFallback(s9.keyInsight, MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_REMINDER_EMPHASIS),
    mantraLeft: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_LEFT,
    mantraCenter: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_CENTER,
    mantraRight: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_FOOTER_LOTUS_LOGO_SRC,
  };
}
