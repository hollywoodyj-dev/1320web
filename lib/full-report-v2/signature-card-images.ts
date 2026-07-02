import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";
import type { SignatureCodeCardKey } from "@/lib/full-report-v2/signature-static";
import type { FullReportV2Calculation } from "@/lib/full-report-v2/types";

/** Archetype card art URL for each blueprint layer on Page 03. */
export function getSignatureCardImageUrl(
  key: SignatureCodeCardKey,
  calculation: FullReportV2Calculation,
): string | undefined {
  switch (key) {
    case "s1":
      return getSegmentCardImageUrl("s1", calculation.s1.raw);
    case "s3":
      return getSegmentCardImageUrl("s3", calculation.s3.raw);
    case "s2":
      return getSegmentCardImageUrl("s2", calculation.s2.raw);
    case "s0": {
      const match = /^S0-(\d{1,2})$/i.exec(calculation.s0.code);
      if (!match) return undefined;
      return getSegmentCardImageUrl("s0", Number.parseInt(match[1], 10));
    }
    default:
      return undefined;
  }
}
