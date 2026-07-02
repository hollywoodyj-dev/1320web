import { resolveSharedS6Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import {
  getMobileIntegratedBlueprintBackgroundFallbackUrl,
  getMobileIntegratedBlueprintBackgroundUrl,
} from "@/lib/mobile-report-v2/get-mobile-integrated-blueprint-background";
import { pickOrFallback, pickStringAt } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS6PrimaryIconAsset } from "@/lib/full-report-v2/s6-icon-registry";
import {
  MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_NAME,
  MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_SUBTITLE,
  MOBILE_S6_RECEIVING_PATTERN_MAP_CENTER_FALLBACK_ICON,
  MOBILE_S6_RECEIVING_PATTERN_MAP_CODE_FALLBACK,
  MOBILE_S6_RECEIVING_PATTERN_MAP_FALLBACK_ICON,
  MOBILE_S6_RECEIVING_PATTERN_MAP_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S6_RECEIVING_PATTERN_MAP_INSIGHT_CARDS,
  MOBILE_S6_RECEIVING_PATTERN_MAP_KICKER,
  MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_CENTER,
  MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_LEFT,
  MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_RIGHT,
  MOBILE_S6_RECEIVING_PATTERN_MAP_MAP_TITLE,
  MOBILE_S6_RECEIVING_PATTERN_MAP_NODES,
  MOBILE_S6_RECEIVING_PATTERN_MAP_PAGE_INDEX,
  MOBILE_S6_RECEIVING_PATTERN_MAP_SUBTITLE,
  MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_EMPHASIS,
  MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_FALLBACK,
  MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_LINE,
} from "@/lib/mobile-report-v2/s6-receiving-pattern-map-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS6MapNode = {
  key: string;
  positionClass: string;
  title: string;
  icon: string;
  copy: string;
};

export type MobileS6InsightCard = {
  key: string;
  title: string;
  icon: string;
  copy: string;
  variant: "violet" | "gold" | "pink" | "green";
};

export type MobileS6ReceivingPatternMapPageContent = {
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
  mapBackgroundUrl: string;
  mapBackgroundFallbackUrl: string;
  mapTitle: string;
  centerFallbackIcon: string;
  mapNodes: MobileS6MapNode[];
  insightCards: MobileS6InsightCard[];
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

const S6_MAP_NODE_DESKTOP_SOURCES: Record<string, (s6: ReturnType<typeof resolveSharedS6Section>) => string> = {
  top: (s6) => s6.mapNodes.top.fullCopy,
  left: (s6) => s6.mapNodes.left.fullCopy,
  right: (s6) => s6.mapNodes.right.fullCopy,
  "bottom-left": (s6) => s6.mapNodes.bottom.fullCopy,
  "bottom-right": (s6) => pickStringAt(s6.receivingShowsUp, 3, s6.gifts[0] ?? s6.finalRemembrance),
};

const S6_INSIGHT_DESKTOP_SOURCES: Record<string, (s6: ReturnType<typeof resolveSharedS6Section>) => string> = {
  receiving_key: (s6) => pickStringAt(s6.reflectionPrompts, 0, s6.keyInsight),
  abundance_truth: (s6) => pickStringAt(s6.reflectionPrompts, 1, s6.lifeInfluence),
  soul_worth_reminder: (s6) => s6.finalRemembrance || s6.wisewaveGuidance,
  practice_today: (s6) => pickStringAt(s6.reflectionPrompts, 2, s6.integrationGuidance),
};

export function resolveMobileS6ReceivingPatternMapContent(
  payload: FullReportV2Payload,
): MobileS6ReceivingPatternMapPageContent {
  const s6 = resolveSharedS6Section(payload);
  const code = s6.code || MOBILE_S6_RECEIVING_PATTERN_MAP_CODE_FALLBACK;
  const title = s6.title || MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_FALLBACK;

  const s6Icon = resolveS6PrimaryIconAsset(code, title);
  const imageUrl = s6.primary_icon_url || s6Icon.primary_icon_url || undefined;

  const mapNodes: MobileS6MapNode[] = MOBILE_S6_RECEIVING_PATTERN_MAP_NODES.map((node) => ({
    key: node.key,
    positionClass: node.positionClass,
    title: node.title,
    icon: node.icon,
    copy: pickOrFallback(S6_MAP_NODE_DESKTOP_SOURCES[node.key]?.(s6) ?? "", node.copyFallback),
  }));

  const insightCards: MobileS6InsightCard[] = MOBILE_S6_RECEIVING_PATTERN_MAP_INSIGHT_CARDS.map((card) => ({
    key: card.key,
    title: card.title,
    icon: card.icon,
    variant: card.variant,
    copy: pickOrFallback(S6_INSIGHT_DESKTOP_SOURCES[card.key]?.(s6) ?? "", card.copyFallback),
  }));

  return {
    brandName: MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_NAME,
    brandSubtitle: MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_SUBTITLE,
    pageIndex: MOBILE_S6_RECEIVING_PATTERN_MAP_PAGE_INDEX,
    kicker: MOBILE_S6_RECEIVING_PATTERN_MAP_KICKER,
    titleLine: MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_LINE,
    titleEmphasis: MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_EMPHASIS,
    subtitle: MOBILE_S6_RECEIVING_PATTERN_MAP_SUBTITLE,
    code,
    title,
    fallbackIcon: MOBILE_S6_RECEIVING_PATTERN_MAP_FALLBACK_ICON,
    imageUrl,
    mapBackgroundUrl: getMobileIntegratedBlueprintBackgroundUrl(),
    mapBackgroundFallbackUrl: getMobileIntegratedBlueprintBackgroundFallbackUrl(),
    mapTitle: MOBILE_S6_RECEIVING_PATTERN_MAP_MAP_TITLE,
    centerFallbackIcon: MOBILE_S6_RECEIVING_PATTERN_MAP_CENTER_FALLBACK_ICON,
    mapNodes,
    insightCards,
    mantraLeft: MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_LEFT,
    mantraCenter: MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_CENTER,
    mantraRight: MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S6_RECEIVING_PATTERN_MAP_FOOTER_LOTUS_LOGO_SRC,
  };
}
