import { resolveSharedS4Section } from "@/lib/canonical-report/shared-foundation-resolvers";
import { getMobileIntegratedBlueprintBackgroundFallbackUrl, getMobileIntegratedBlueprintBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-integrated-blueprint-background";
import { getMobileS0RevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s0-reveal-background";
import {
  padStringList,
  pickOrFallback,
  uniqueStrings,
} from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import { resolveS4PrimaryIconAsset } from "@/lib/full-report-v2/s4-icon-registry";
import {
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_BRAND_NAME,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_BRAND_SUBTITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_CODE_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_CODE_LABEL,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_FALLBACK_ICON,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_EDGES_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_EDGE_LABELS,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_ICON,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_SUBTITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_TITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_EXPRESSIONS_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_ICON,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_TITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_KICKER,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_COST_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_PATTERN_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_REACTION_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_TITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_TRIGGER_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_CENTER,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_LEFT,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_RIGHT,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PAGE_INDEX,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_LOGO_SRC,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_TITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_TODAY_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_LOGO_SRC,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_TITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SHADOW_LOOP_POINTS_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SHADOW_LOOP_SUMMARY_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SUBTITLE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_EMPHASIS,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_LINE,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_FALLBACK,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_ICON,
  MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_TITLE,
} from "@/lib/mobile-report-v2/s4-shadow-loop-growth-edge-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileS4LoopNode = {
  key: string;
  stepLabel: string;
  label: string;
};

export type MobileS4GrowthEdgeItem = {
  number: string;
  label: string;
  copy: string;
};

export type MobileS4ShadowLoopGrowthEdgePageContent = {
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
  summaryBackgroundUrl: string;
  loopBackgroundUrl: string;
  loopBackgroundFallbackUrl: string;
  loopTitle: string;
  loopNodes: MobileS4LoopNode[];
  shadowLoopSummary: string;
  shadowLoopPoints: string[];
  growthTitle: string;
  growthSubtitle: string;
  growthIcon: string;
  growthEdges: MobileS4GrowthEdgeItem[];
  triggersTitle: string;
  triggersIcon: string;
  triggers: string[];
  healthyTitle: string;
  healthyIcon: string;
  healthyExpressions: string[];
  reframeTitle: string;
  reframeLogoUrl: string;
  empoweringReframe: string;
  practiceTitle: string;
  practiceLogoUrl: string;
  practiceToday: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}


function buildList(
  slot: Record<string, unknown>,
  prefix: string,
  fallbacks: readonly string[],
): string[] {
  const explicit = [
    asString(slot[`${prefix}_1`]),
    asString(slot[`${prefix}_2`]),
    asString(slot[`${prefix}_3`]),
    asString(slot[`${prefix}_4`]),
  ].filter(Boolean);

  if (explicit.length >= 4) return explicit.slice(0, 4);

  return [...explicit, ...fallbacks.slice(explicit.length)].slice(0, 4);
}

export function resolveMobileS4ShadowLoopGrowthEdgeContent(
  payload: FullReportV2Payload,
): MobileS4ShadowLoopGrowthEdgePageContent {
  const s4 = resolveSharedS4Section(payload);
  const slot = payload.modules.s4;
  const code = s4.code || MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_CODE_FALLBACK;
  const title = s4.title || MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_FALLBACK;

  const s4Icon = resolveS4PrimaryIconAsset(code, title);
  const imageUrl = asString(slot.primary_icon_url) || s4Icon.primary_icon_url || undefined;

  const loopLabels = s4.cycleSteps.slice(0, 4).map((step) => step.fullCopy || step.copy);
  const loopNodes: MobileS4LoopNode[] = [
    { key: "trigger", stepLabel: "Trigger", label: pickOrFallback(loopLabels[1] ?? "", MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_TRIGGER_FALLBACK) },
    { key: "reaction", stepLabel: "Reaction", label: pickOrFallback(loopLabels[2] ?? "", MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_REACTION_FALLBACK) },
    { key: "pattern", stepLabel: "Pattern", label: pickOrFallback(loopLabels[0] ?? "", MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_PATTERN_FALLBACK) },
    { key: "cost", stepLabel: "Cost", label: pickOrFallback(loopLabels[3] ?? "", MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_COST_FALLBACK) },
  ];

  const cycleCopyPool = uniqueStrings(
    s4.cycleSteps.flatMap((step) => [step.fullCopy, step.copy]),
    s4.showsUp,
  );

  const growthEdges: MobileS4GrowthEdgeItem[] = MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_EDGE_LABELS.map(
    (label, index) => ({
      number: String(index + 1),
      label,
      copy: pickOrFallback(
        cycleCopyPool[index + 4] ?? s4.showsUp[index] ?? "",
        MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_EDGES_FALLBACK[index],
      ),
    }),
  );

  const shadowLoopPoints =
    cycleCopyPool.length > 0
      ? cycleCopyPool.map((value) => pickOrFallback(value, ""))
      : [...MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SHADOW_LOOP_POINTS_FALLBACK];

  return {
    brandName: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_BRAND_NAME,
    brandSubtitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_BRAND_SUBTITLE,
    pageIndex: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PAGE_INDEX,
    kicker: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_KICKER,
    titleLine: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_LINE,
    titleEmphasis: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TITLE_EMPHASIS,
    subtitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SUBTITLE,
    codeLabel: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_CODE_LABEL,
    code,
    title,
    fallbackIcon: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_FALLBACK_ICON,
    imageUrl,
    summaryBackgroundUrl: getMobileS0RevealBackgroundUrl(),
    loopBackgroundUrl: getMobileIntegratedBlueprintBackgroundUrl(),
    loopBackgroundFallbackUrl: getMobileIntegratedBlueprintBackgroundFallbackUrl(),
    loopTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_LOOP_TITLE,
    loopNodes,
    shadowLoopSummary: pickOrFallback(
      `${s4.patternIntensityTitle}. ${s4.patternIntensityNote}. ${s4.cycleSteps[0]?.fullCopy ?? ""}`.trim(),
      MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_SHADOW_LOOP_SUMMARY_FALLBACK,
    ),
    shadowLoopPoints,
    growthTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_TITLE,
    growthSubtitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_SUBTITLE,
    growthIcon: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_GROWTH_ICON,
    growthEdges,
    triggersTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_TITLE,
    triggersIcon: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_ICON,
    triggers: padStringList(
      uniqueStrings(s4.showsUp, s4.cycleSteps.map((step) => step.copy)),
      MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_TRIGGERS_FALLBACK,
      Math.max(4, s4.showsUp.length),
    ),
    healthyTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_TITLE,
    healthyIcon: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_ICON,
    healthyExpressions: padStringList(
      s4.hiddenGifts,
      MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_HEALTHY_EXPRESSIONS_FALLBACK,
      4,
    ),
    reframeTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_TITLE,
    reframeLogoUrl: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_LOGO_SRC,
    empoweringReframe: pickOrFallback(s4.keyInsight, MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_REFRAME_FALLBACK),
    practiceTitle: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_TITLE,
    practiceLogoUrl: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_LOGO_SRC,
    practiceToday: pickOrFallback(
      s4.reflectionPrompts[3] ?? s4.finalRemembrance,
      MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_PRACTICE_TODAY_FALLBACK,
    ),
    mantraLeft: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_LEFT,
    mantraCenter: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_CENTER,
    mantraRight: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_S4_SHADOW_LOOP_GROWTH_EDGE_FOOTER_LOTUS_LOGO_SRC,
  };
}