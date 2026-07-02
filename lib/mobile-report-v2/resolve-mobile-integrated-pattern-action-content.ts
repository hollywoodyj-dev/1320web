import {
  MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_FALLBACK,
  MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_TITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_NAME,
  MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_SUBTITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ICONS,
  MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ORDER,
  MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_FALLBACKS,
  MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLES,
  MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_SUMMARY_FALLBACK,
  MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_TITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_KICKER,
  MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_FALLBACKS,
  MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_TITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_MODULE_LABELS,
  MOBILE_INTEGRATED_PATTERN_ACTION_PAGE_INDEX,
  MOBILE_INTEGRATED_PATTERN_ACTION_SUBTITLE,
  MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_EMPHASIS,
  MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_LINE,
} from "@/lib/mobile-report-v2/integrated-pattern-action-page-static";
import { getMobileIntegratedBlueprintBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-integrated-blueprint-background";
import type { MobileIntegratedCodeKey } from "@/lib/mobile-report-v2/integrated-blueprint-overview-page-static";
import type { SoulCodeLogo } from "@/lib/full-report-v2/soul-code-logos";
import type { FullReportV2IntegratedAction, FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileIntegratedPatternFlowNode = {
  key: MobileIntegratedCodeKey;
  codeLabel: string;
  moduleLabel: string;
};

export type MobileIntegratedPatternLifeItem = {
  key: MobileIntegratedCodeKey;
  icon: SoulCodeLogo;
  codeLabel: string;
  copy: string;
};

export type MobileIntegratedPatternDailyItem = {
  key: MobileIntegratedCodeKey;
  icon: SoulCodeLogo;
  title: string;
  copy: string;
};

export type MobileIntegratedPatternActionContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  flowTitle: string;
  flowBackgroundUrl: string;
  flowSummary: string;
  flowNodes: MobileIntegratedPatternFlowNode[];
  lifeTitle: string;
  lifeItems: MobileIntegratedPatternLifeItem[];
  dailyTitle: string;
  dailyItems: MobileIntegratedPatternDailyItem[];
  affirmationTitle: string;
  affirmation: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function pickOrFallback(value: string, fallback: string): string {
  return value || fallback;
}

function getLifeExpression(action: FullReportV2IntegratedAction, key: MobileIntegratedCodeKey): string {
  switch (key) {
    case "s1":
      return asString(action.s1_life_expression);
    case "s3":
      return asString(action.s3_life_expression);
    case "s2":
      return asString(action.s2_life_expression);
    case "s0":
      return asString(action.s0_life_expression);
  }
}

function getDailyAction(action: FullReportV2IntegratedAction, key: MobileIntegratedCodeKey): string {
  switch (key) {
    case "s1":
      return asString(action.s1_daily_action);
    case "s3":
      return asString(action.s3_daily_action);
    case "s2":
      return asString(action.s2_daily_action);
    case "s0":
      return asString(action.s0_daily_action);
  }
}

export function resolveMobileIntegratedPatternActionContent(
  payload: FullReportV2Payload,
): MobileIntegratedPatternActionContent {
  const action = payload.integrated_action ?? {};

  const flowNodes: MobileIntegratedPatternFlowNode[] = MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ORDER.map(
    (key) => ({
      key,
      codeLabel: key.toUpperCase(),
      moduleLabel: MOBILE_INTEGRATED_PATTERN_ACTION_MODULE_LABELS[key],
    }),
  );

  const lifeItems: MobileIntegratedPatternLifeItem[] = MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ORDER.map(
    (key) => ({
      key,
      icon: MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ICONS[key],
      codeLabel: key.toUpperCase(),
      copy: pickOrFallback(
        getLifeExpression(action, key),
        MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_FALLBACKS[key],
      ),
    }),
  );

  const dailyItems: MobileIntegratedPatternDailyItem[] = MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ORDER.map(
    (key) => ({
      key,
      icon: MOBILE_INTEGRATED_PATTERN_ACTION_CODE_ICONS[key],
      title: MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLES[key],
      copy: pickOrFallback(
        getDailyAction(action, key),
        MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_FALLBACKS[key],
      ),
    }),
  );

  return {
    brandName: MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_NAME,
    brandSubtitle: MOBILE_INTEGRATED_PATTERN_ACTION_BRAND_SUBTITLE,
    pageIndex: MOBILE_INTEGRATED_PATTERN_ACTION_PAGE_INDEX,
    kicker: MOBILE_INTEGRATED_PATTERN_ACTION_KICKER,
    titleLine: MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_LINE,
    titleEmphasis: MOBILE_INTEGRATED_PATTERN_ACTION_TITLE_EMPHASIS,
    subtitle: MOBILE_INTEGRATED_PATTERN_ACTION_SUBTITLE,
    flowTitle: MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_TITLE,
    flowBackgroundUrl: getMobileIntegratedBlueprintBackgroundUrl(),
    flowSummary: pickOrFallback(
      asString(action.flow_summary),
      MOBILE_INTEGRATED_PATTERN_ACTION_FLOW_SUMMARY_FALLBACK,
    ),
    flowNodes,
    lifeTitle: MOBILE_INTEGRATED_PATTERN_ACTION_LIFE_TITLE,
    lifeItems,
    dailyTitle: MOBILE_INTEGRATED_PATTERN_ACTION_DAILY_TITLE,
    dailyItems,
    affirmationTitle: MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_TITLE,
    affirmation: pickOrFallback(
      asString(action.affirmation),
      MOBILE_INTEGRATED_PATTERN_ACTION_AFFIRMATION_FALLBACK,
    ),
  };
}
