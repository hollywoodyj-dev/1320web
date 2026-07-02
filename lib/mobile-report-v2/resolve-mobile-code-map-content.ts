import { getModuleCardImageUrl } from "@/lib/full-report-v2/module-card-images";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import type { SignatureCodeCardKey } from "@/lib/full-report-v2/signature-static";
import {
  MOBILE_CODE_MAP_BRAND_NAME,
  MOBILE_CODE_MAP_DIMENSIONS,
  MOBILE_CODE_MAP_INTRO_EMPHASIS,
  MOBILE_CODE_MAP_INTRO_LABEL,
  MOBILE_CODE_MAP_INTRO_LEAD,
  MOBILE_CODE_MAP_INTRO_TAIL,
  MOBILE_CODE_MAP_KICKER,
  MOBILE_CODE_MAP_LIST_LABEL,
  MOBILE_CODE_MAP_PAGE_INDEX,
  MOBILE_CODE_MAP_REMINDERS,
  MOBILE_CODE_MAP_SUBTITLE,
  MOBILE_CODE_MAP_SYSTEM_COPY,
  MOBILE_CODE_MAP_SYSTEM_ICON,
  MOBILE_CODE_MAP_SYSTEM_TITLE,
  MOBILE_CODE_MAP_TITLE_LINES,
  type MobileCodeMapLayerKey,
} from "@/lib/mobile-report-v2/code-map-page-static";
import type { FullReportV2Calculation, FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileCodeMapDimension = {
  layer: MobileCodeMapLayerKey;
  label: string;
  code: string;
  name: string;
  subtitle: string;
  copy: string;
  fallbackIcon: string;
  imageUrl?: string;
};

export type MobileCodeMapPageContent = {
  brandName: string;
  pageIndex: string;
  kicker: string;
  titleLines: string[];
  subtitle: string;
  introLabel: string;
  introLead: string;
  introEmphasis: string;
  introTail: string;
  listLabel: string;
  dimensions: MobileCodeMapDimension[];
  systemIcon: string;
  systemTitle: string;
  systemCopy: string;
  reminders: { icon: string; copy: string }[];
};

function getCodeMapDisplayCode(
  layer: MobileCodeMapLayerKey,
  calculation: FullReportV2Calculation,
): string {
  switch (layer) {
    case "s0":
      return calculation.s0.code;
    case "s1":
      return calculation.s1.code;
    case "s2":
      return calculation.s2.code;
    case "s3":
      return calculation.s3.code;
    case "s4":
      return calculation.s4_code ?? "S4";
    case "s5":
      return calculation.s5_code ?? "S5";
    case "s6":
      return calculation.s6_code ?? "S6";
    case "s7":
      return calculation.s7_code ?? "S7";
    case "s8":
      return calculation.s8_code ?? "S8";
    case "s9":
      return calculation.s9_code ?? "S9";
  }
}

function getCodeMapCardImageUrl(
  layer: MobileCodeMapLayerKey,
  calculation: FullReportV2Calculation,
): string | undefined {
  if (layer === "s0" || layer === "s1" || layer === "s2" || layer === "s3") {
    return getSignatureCardImageUrl(layer as SignatureCodeCardKey, calculation);
  }

  return getModuleCardImageUrl(layer, calculation);
}

export function resolveMobileCodeMapContent(payload: FullReportV2Payload): MobileCodeMapPageContent {
  const { calculation } = payload;

  const dimensions: MobileCodeMapDimension[] = MOBILE_CODE_MAP_DIMENSIONS.map((dimension) => ({
    layer: dimension.layer,
    label: dimension.label,
    code: getCodeMapDisplayCode(dimension.layer, calculation),
    name: dimension.name,
    subtitle: dimension.subtitle,
    copy: dimension.copy,
    fallbackIcon: dimension.icon,
    imageUrl: getCodeMapCardImageUrl(dimension.layer, calculation),
  }));

  return {
    brandName: MOBILE_CODE_MAP_BRAND_NAME,
    pageIndex: MOBILE_CODE_MAP_PAGE_INDEX,
    kicker: MOBILE_CODE_MAP_KICKER,
    titleLines: [...MOBILE_CODE_MAP_TITLE_LINES],
    subtitle: MOBILE_CODE_MAP_SUBTITLE,
    introLabel: MOBILE_CODE_MAP_INTRO_LABEL,
    introLead: MOBILE_CODE_MAP_INTRO_LEAD,
    introEmphasis: MOBILE_CODE_MAP_INTRO_EMPHASIS,
    introTail: MOBILE_CODE_MAP_INTRO_TAIL,
    listLabel: MOBILE_CODE_MAP_LIST_LABEL,
    dimensions,
    systemIcon: MOBILE_CODE_MAP_SYSTEM_ICON,
    systemTitle: MOBILE_CODE_MAP_SYSTEM_TITLE,
    systemCopy: MOBILE_CODE_MAP_SYSTEM_COPY,
    reminders: [...MOBILE_CODE_MAP_REMINDERS],
  };
}
