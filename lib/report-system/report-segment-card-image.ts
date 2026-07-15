import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import type { SignatureCodeCardKey } from "@/lib/full-report-v2/signature-static";
import type { FullReportV2Calculation } from "@/lib/full-report-v2/types";
import type { ReportSegmentCode } from "@/lib/report-system/report-surface";

export type ReportSegmentIconKey = Lowercase<ReportSegmentCode>;

const FOUNDATION_SEGMENT_KEYS: Record<"S1" | "S3" | "S2" | "S0", SignatureCodeCardKey> = {
  S1: "s1",
  S3: "s3",
  S2: "s2",
  S0: "s0",
};

export const REPORT_SEGMENT_FALLBACK_ICONS: Record<ReportSegmentIconKey, string> = {
  s1: "♧",
  s3: "✦",
  s2: "◌",
  s0: "⌂",
  s4: "◐",
  s5: "☉",
  s6: "◈",
  s7: "◎",
  s8: "✧",
  s9: "○",
};

export function toReportSegmentIconKey(segment: ReportSegmentCode): ReportSegmentIconKey {
  return segment.toLowerCase() as ReportSegmentIconKey;
}

export function getReportSegmentCode(
  segment: ReportSegmentCode,
  calculation: FullReportV2Calculation,
): string {
  switch (segment) {
    case "S1":
      return calculation.s1.code;
    case "S3":
      return calculation.s3.code;
    case "S2":
      return calculation.s2.code;
    case "S0":
      return calculation.s0.code;
    case "S4":
      return calculation.s4_code ?? "S4-00";
    case "S5":
      return calculation.s5_code ?? "S5-00";
    case "S6":
      return calculation.s6_code ?? "S6-00";
    case "S7":
      return calculation.s7_code ?? "S7-00";
    case "S8":
      return calculation.s8_code ?? "S8-00";
    case "S9":
      return calculation.s9_code ?? "S9-00";
  }
}

/** Archetype card art for any report segment (S0–S9). */
export function getReportSegmentCardImageUrl(
  segment: ReportSegmentCode,
  calculation: FullReportV2Calculation,
): string | undefined {
  if (segment === "S1" || segment === "S3" || segment === "S2" || segment === "S0") {
    return getSignatureCardImageUrl(FOUNDATION_SEGMENT_KEYS[segment], calculation);
  }

  return getAdvancedModuleCardImageUrlFromCode(getReportSegmentCode(segment, calculation));
}
