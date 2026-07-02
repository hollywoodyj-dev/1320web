import { resolveSharedS5Section } from "@/lib/canonical-report/shared-foundation-resolvers";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  mapNodeFullCopies,
  mapNodeShortCopies,
  padStringList,
  pickOrFallback,
  uniqueStrings,
  appendUniqueSentences,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS5PrimaryIconAsset } from "@/lib/full-report-v2/s5-icon-registry";
import {
  MOBILE_S5_MISSION_PATHWAY_ICON_BRAND_NAME,
  MOBILE_S5_MISSION_PATHWAY_ICON_BRAND_SUBTITLE,
  MOBILE_S5_MISSION_PATHWAY_ICON_CODE_FALLBACK,
  MOBILE_S5_MISSION_PATHWAY_ICON_FALLBACK_ICON,
  MOBILE_S5_MISSION_PATHWAY_ICON_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S5_MISSION_PATHWAY_ICON_KICKER,
  MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_CENTER,
  MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_LEFT,
  MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_RIGHT,
  MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_DESCRIPTION_FALLBACK,
  MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_LABEL,
  MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_TITLE_FALLBACK,
  MOBILE_S5_MISSION_PATHWAY_ICON_PAGE_INDEX,
  MOBILE_S5_MISSION_PATHWAY_ICON_PATHWAY_STEPS,
  MOBILE_S5_MISSION_PATHWAY_ICON_PATHWAY_TITLE,
  MOBILE_S5_MISSION_PATHWAY_ICON_QUOTE,
  MOBILE_S5_MISSION_PATHWAY_ICON_SUBTITLE,
  MOBILE_S5_MISSION_PATHWAY_ICON_SUPPORT_CARDS,
  MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_EMPHASIS,
  MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_FALLBACK,
  MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_LINE,
} from "@/lib/mobile-report-v2/s5-mission-pathway-icon-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS5PathwayStep = {
  stepNumber: string;
  icon: string;
  title: string;
  copy: string;
  isExpress: boolean;
};

export type MobileS5SupportCard = {
  key: string;
  title: string;
  icon: string;
  copy: string;
  variant: "gold" | "violet";
};

export type MobileS5MissionPathwayIconPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
  iconBackgroundUrl: string;
  missionIconLabel: string;
  missionIconTitle: string;
  missionIconDescription: string;
  pathwayTitle: string;
  pathwaySteps: MobileS5PathwayStep[];
  supportCards: MobileS5SupportCard[];
  quote: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

export function resolveMobileS5MissionPathwayIconContent(
  payload: FullReportV2Payload,
): MobileS5MissionPathwayIconPageContent {
  const s5 = resolveSharedS5Section(payload);
  const slot = payload.modules.s5;
  const code = s5.code || MOBILE_S5_MISSION_PATHWAY_ICON_CODE_FALLBACK;
  const title = s5.title || MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_FALLBACK;

  const s5Icon = resolveS5PrimaryIconAsset(code, title);
  const imageUrl =
    asString(slot.mission_icon_url) ||
    s5.primary_icon_url ||
    s5Icon.primary_icon_url ||
    undefined;

  const pathwayCopies = uniqueStrings(
    mapNodeShortCopies(s5.mapNodes),
    mapNodeFullCopies(s5.mapNodes),
    [s5.integrationGuidance],
    s5.reflectionPrompts,
    [s5.wisewaveGuidance],
  );

  const pathwaySteps: MobileS5PathwayStep[] = MOBILE_S5_MISSION_PATHWAY_ICON_PATHWAY_STEPS.map(
    (step, index) => ({
      stepNumber: step.stepNumber,
      icon: step.icon,
      title: step.titleFallback,
      copy: pickOrFallback(pathwayCopies[index] ?? "", step.copyFallback),
      isExpress: index === 2,
    }),
  );

  const supportCards: MobileS5SupportCard[] = MOBILE_S5_MISSION_PATHWAY_ICON_SUPPORT_CARDS.map(
    (card, index) => {
      const copyPool = uniqueStrings(
        s5.gifts,
        [s5.lifeInfluence, s5.integrationGuidance, s5.wisewaveGuidance],
        s5.reflectionPrompts,
        mapNodeFullCopies(s5.mapNodes),
      );

      return {
        key: card.key,
        title: card.title,
        icon: card.icon,
        variant: card.variant,
        copy: pickOrFallback(copyPool[index] ?? "", card.copyFallback),
      };
    },
  );

  return {
    brandName: MOBILE_S5_MISSION_PATHWAY_ICON_BRAND_NAME,
    brandSubtitle: MOBILE_S5_MISSION_PATHWAY_ICON_BRAND_SUBTITLE,
    pageIndex: MOBILE_S5_MISSION_PATHWAY_ICON_PAGE_INDEX,
    kicker: MOBILE_S5_MISSION_PATHWAY_ICON_KICKER,
    titleLine: MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_LINE,
    titleEmphasis: MOBILE_S5_MISSION_PATHWAY_ICON_TITLE_EMPHASIS,
    subtitle: MOBILE_S5_MISSION_PATHWAY_ICON_SUBTITLE,
    code,
    title,
    fallbackIcon: MOBILE_S5_MISSION_PATHWAY_ICON_FALLBACK_ICON,
    imageUrl,
    iconBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    missionIconLabel: MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_LABEL,
    missionIconTitle: pickOrFallback(title, MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_TITLE_FALLBACK),
    missionIconDescription: pickOrFallback(
      s5.missionShowsUp[0] ?? s5.essenceParagraphs[0] ?? "",
      MOBILE_S5_MISSION_PATHWAY_ICON_MISSION_ICON_DESCRIPTION_FALLBACK,
    ),
    pathwayTitle: MOBILE_S5_MISSION_PATHWAY_ICON_PATHWAY_TITLE,
    pathwaySteps,
    supportCards,
    quote: pickOrFallback(
      appendUniqueSentences(s5.keyInsight || s5.finalRemembrance, [s5.wisewaveGuidance]),
      MOBILE_S5_MISSION_PATHWAY_ICON_QUOTE,
    ),
    mantraLeft: MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_LEFT,
    mantraCenter: MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_CENTER,
    mantraRight: MOBILE_S5_MISSION_PATHWAY_ICON_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S5_MISSION_PATHWAY_ICON_FOOTER_LOTUS_LOGO_SRC,
  };
}