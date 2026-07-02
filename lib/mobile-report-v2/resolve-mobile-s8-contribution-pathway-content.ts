import { resolveSharedS8Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import { resolveS8PrimaryIconAsset } from "@/lib/full-report-v2/s8-icon-registry";
import { getMobileS8ContributionPathwayHeroBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s8-contribution-pathway-hero-background";
import {
  joinEssenceParagraphs,
  mapNodeFullCopies,
  padStringList,
  pickOrFallback,
  pickStringAt,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_S8_CONTRIBUTION_PATHWAY_BRAND_NAME,
  MOBILE_S8_CONTRIBUTION_PATHWAY_BRAND_SUBTITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_ESSENCE_COPY_FALLBACK,
  MOBILE_S8_CONTRIBUTION_PATHWAY_ESSENCE_TITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S8_CONTRIBUTION_PATHWAY_KEYS,
  MOBILE_S8_CONTRIBUTION_PATHWAY_KEYS_TITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_KICKER,
  MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_CENTER,
  MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_LEFT,
  MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_RIGHT,
  MOBILE_S8_CONTRIBUTION_PATHWAY_PAGE_INDEX,
  MOBILE_S8_CONTRIBUTION_PATHWAY_PATHWAY_STEPS,
  MOBILE_S8_CONTRIBUTION_PATHWAY_PATHWAY_TITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_BODY,
  MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_EMPHASIS,
  MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_ICON,
  MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_LEAD,
  MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_TITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_SUBTITLE,
  MOBILE_S8_CONTRIBUTION_PATHWAY_TITLE_EMPHASIS,
  MOBILE_S8_CONTRIBUTION_PATHWAY_TITLE_LINE,
} from "@/lib/mobile-report-v2/s8-contribution-pathway-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS8PathwayStep = {
  key: string;
  tone: string;
  stepLabel: string;
  stepTitle: string;
  icon: string;
  stepMain: string;
  stepCopy: string;
};

export type MobileS8PathwayKey = {
  key: string;
  tone: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS8ContributionPathwayPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  heroBackgroundUrl: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  essenceTitle: string;
  essenceCopy: string;
  pathwayTitle: string;
  pathwaySteps: MobileS8PathwayStep[];
  keysTitle: string;
  keys: MobileS8PathwayKey[];
  reminderIcon: string;
  reminderTitle: string;
  reminderLead: string;
  reminderEmphasis: string;
  reminderBody: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

export function resolveMobileS8ContributionPathwayContent(
  payload: FullReportV2Payload,
): MobileS8ContributionPathwayPageContent {
  const s8 = resolveSharedS8Section(payload);
  const code = s8.code || "S8-14";
  const title = s8.title || "The Wisdom Bearer";

  const s8Icon = resolveS8PrimaryIconAsset(code, title);
  const imageUrl = s8.primary_icon_url || s8Icon.primary_icon_url || undefined;

  const pathwayCopies = mapNodeFullCopies(s8.mapNodes);

  const pathwaySteps: MobileS8PathwayStep[] = MOBILE_S8_CONTRIBUTION_PATHWAY_PATHWAY_STEPS.map(
    (step, index) => ({
      key: step.key,
      tone: step.tone,
      stepLabel: step.stepLabel,
      stepTitle: step.stepTitle,
      icon: step.icon,
      stepMain: step.titleFallback,
      stepCopy: pickOrFallback(pathwayCopies[index] ?? "", step.copyFallback),
    }),
  );

  const keyCopies = padStringList(
    [
      ...s8.reflectionPrompts,
      ...s8.gifts,
      ...s8.contributionShowsUp,
      pickStringAt(s8.essenceParagraphs, 1, ""),
    ],
    MOBILE_S8_CONTRIBUTION_PATHWAY_KEYS.map((item) => item.copyFallback),
    3,
  );

  const keys: MobileS8PathwayKey[] = MOBILE_S8_CONTRIBUTION_PATHWAY_KEYS.map((item, index) => ({
    key: item.key,
    tone: item.tone,
    title: item.title,
    icon: item.icon,
    copy: pickOrFallback(keyCopies[index] ?? "", item.copyFallback),
  }));

  return {
    brandName: MOBILE_S8_CONTRIBUTION_PATHWAY_BRAND_NAME,
    brandSubtitle: MOBILE_S8_CONTRIBUTION_PATHWAY_BRAND_SUBTITLE,
    pageIndex: MOBILE_S8_CONTRIBUTION_PATHWAY_PAGE_INDEX,
    kicker: MOBILE_S8_CONTRIBUTION_PATHWAY_KICKER,
    titleLine: MOBILE_S8_CONTRIBUTION_PATHWAY_TITLE_LINE,
    titleEmphasis: MOBILE_S8_CONTRIBUTION_PATHWAY_TITLE_EMPHASIS,
    subtitle: MOBILE_S8_CONTRIBUTION_PATHWAY_SUBTITLE,
    heroBackgroundUrl: getMobileS8ContributionPathwayHeroBackgroundUrl(),
    code,
    title,
    fallbackIcon: "✺",
    imageUrl,
    essenceTitle: MOBILE_S8_CONTRIBUTION_PATHWAY_ESSENCE_TITLE,
    essenceCopy: pickOrFallback(
      joinEssenceParagraphs(s8.essenceParagraphs),
      MOBILE_S8_CONTRIBUTION_PATHWAY_ESSENCE_COPY_FALLBACK,
    ),
    pathwayTitle: MOBILE_S8_CONTRIBUTION_PATHWAY_PATHWAY_TITLE,
    pathwaySteps,
    keysTitle: MOBILE_S8_CONTRIBUTION_PATHWAY_KEYS_TITLE,
    keys,
    reminderIcon: MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_ICON,
    reminderTitle: MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_TITLE,
    reminderLead: pickOrFallback(s8.keyInsight, MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_LEAD),
    reminderEmphasis: pickOrFallback(s8.integrationGuidance, MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_EMPHASIS),
    reminderBody: pickOrFallback(s8.finalRemembrance, MOBILE_S8_CONTRIBUTION_PATHWAY_REMINDER_BODY),
    mantraLeft: MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_LEFT,
    mantraCenter: MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_CENTER,
    mantraRight: MOBILE_S8_CONTRIBUTION_PATHWAY_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S8_CONTRIBUTION_PATHWAY_FOOTER_LOTUS_LOGO_SRC,
  };
}
