import { resolveSharedS7Section } from "@/lib/canonical-report/shared-expansion-resolvers";
import {
  firstSentence,
  joinEssenceParagraphs,
  padStringList,
  pickOrFallback,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS7PrimaryIconAsset } from "@/lib/full-report-v2/s7-icon-registry";
import {
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_BRAND_NAME,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_BRAND_SUBTITLE,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_CODE_FALLBACK,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_FALLBACK_ICON,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_GRID_TITLE,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_INTRO_COPY,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_INTRO_FALLBACK_ICON,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_ITEMS,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_AFTER,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_BEFORE,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_EMPHASIS,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_ICON,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_TITLE,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KICKER,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_CENTER,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_LEFT,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_RIGHT,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_PAGE_INDEX,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_SUBTITLE,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_EMPHASIS,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_FALLBACK,
  MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_LINE,
} from "@/lib/mobile-report-v2/s7-sovereignty-alignment-map-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS7AlignmentMapItem = {
  key: string;
  title: string;
  icon: string;
  state: string;
  copy: string;
};

export type MobileS7SovereigntyAlignmentMapPageContent = {
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
  introFallbackIcon: string;
  imageUrl?: string;
  introCopy: string;
  gridTitle: string;
  alignmentItems: MobileS7AlignmentMapItem[];
  keyInsightIcon: string;
  keyInsightTitle: string;
  keyInsightBefore: string;
  keyInsightEmphasis: string;
  keyInsightAfter: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

export function resolveMobileS7SovereigntyAlignmentMapContent(
  payload: FullReportV2Payload,
): MobileS7SovereigntyAlignmentMapPageContent {
  const s7 = resolveSharedS7Section(payload);
  const code = s7.code || MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_CODE_FALLBACK;
  const title = s7.title || MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_FALLBACK;

  const s7Icon = resolveS7PrimaryIconAsset(code, title);
  const imageUrl = s7.primary_icon_url || s7Icon.primary_icon_url || undefined;

  const mapCopies = padStringList(
    [...s7.sovereigntyShowsUp.slice(1), ...s7.reflectionPrompts, ...s7.gifts],
    MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_ITEMS.map((item) => item.copyFallback),
    MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_ITEMS.length,
  );

  const alignmentItems: MobileS7AlignmentMapItem[] = MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_ITEMS.map(
    (item, index) => ({
      key: item.key,
      title: item.title,
      icon: item.icon,
      state: pickOrFallback(s7.focusRows[index]?.label ?? "", item.stateFallback),
      copy: pickOrFallback(mapCopies[index] ?? "", item.copyFallback),
    }),
  );

  const keyInsightRaw = s7.keyInsight || s7.wisewaveGuidance;

  return {
    brandName: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_BRAND_NAME,
    brandSubtitle: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_BRAND_SUBTITLE,
    pageIndex: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_PAGE_INDEX,
    kicker: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KICKER,
    titleLine: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_LINE,
    titleEmphasis: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE_EMPHASIS,
    subtitle: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_SUBTITLE,
    code,
    title,
    fallbackIcon: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_FALLBACK_ICON,
    introFallbackIcon: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_INTRO_FALLBACK_ICON,
    imageUrl,
    introCopy: pickOrFallback(
      s7.lifeInfluence || firstSentence(joinEssenceParagraphs(s7.essenceParagraphs)),
      MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_INTRO_COPY,
    ),
    gridTitle: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_GRID_TITLE,
    alignmentItems,
    keyInsightIcon: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_ICON,
    keyInsightTitle: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_TITLE,
    keyInsightBefore: keyInsightRaw
      ? keyInsightRaw
      : MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_BEFORE,
    keyInsightEmphasis: keyInsightRaw ? "" : MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_EMPHASIS,
    keyInsightAfter: keyInsightRaw ? "" : MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_KEY_INSIGHT_AFTER,
    mantraLeft: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_LEFT,
    mantraCenter: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_CENTER,
    mantraRight: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S7_SOVEREIGNTY_ALIGNMENT_MAP_FOOTER_LOTUS_LOGO_SRC,
  };
}
