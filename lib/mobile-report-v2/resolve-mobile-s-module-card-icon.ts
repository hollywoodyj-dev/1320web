import { getModuleCardImageUrl } from "@/lib/full-report-v2/module-card-images";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import type { SignatureCodeCardKey } from "@/lib/full-report-v2/signature-static";
import {
  MOBILE_CODE_MAP_DIMENSIONS,
  type MobileCodeMapLayerKey,
} from "@/lib/mobile-report-v2/code-map-page-static";
import type { FullReportV2Calculation, FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileSModuleCardIconContent = {
  layer: MobileCodeMapLayerKey;
  code: string;
  title: string;
  fallbackIcon: string;
  imageUrl?: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getLayerDisplayCode(
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

function getLayerCardImageUrl(
  layer: MobileCodeMapLayerKey,
  calculation: FullReportV2Calculation,
): string | undefined {
  if (layer === "s0" || layer === "s1" || layer === "s2" || layer === "s3") {
    return getSignatureCardImageUrl(layer as SignatureCodeCardKey, calculation);
  }

  return getModuleCardImageUrl(layer, calculation);
}

export function resolveMobileSModuleCardIcon(
  layer: MobileCodeMapLayerKey,
  payload: FullReportV2Payload,
): MobileSModuleCardIconContent {
  const dimension = MOBILE_CODE_MAP_DIMENSIONS.find((item) => item.layer === layer);
  const slot = payload.modules[layer];
  const code = asString(slot.code) || getLayerDisplayCode(layer, payload.calculation);
  const title =
    asString(slot.title) || asString(slot.archetype) || dimension?.name || layer.toUpperCase();
  const imageUrl =
    asString(slot.primary_icon_url) || getLayerCardImageUrl(layer, payload.calculation) || undefined;

  return {
    layer,
    code,
    title,
    fallbackIcon: dimension?.icon ?? "✦",
    imageUrl,
  };
}

export function labelToModuleLayer(label: string): MobileCodeMapLayerKey {
  return label.toLowerCase() as MobileCodeMapLayerKey;
}
