import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";
import { MOBILE_TRANSFORMER_REVEAL_BACKGROUND_FILENAME } from "@/lib/mobile-report-v2/get-mobile-s1-reveal-background";

/** Mobile S3 reveal card backgrounds keyed by calculation code (e.g. S3-03). */
const MOBILE_S3_REVEAL_BACKGROUNDS: Record<string, string> = {
  "S3-03": MOBILE_TRANSFORMER_REVEAL_BACKGROUND_FILENAME,
};

export function getMobileS3RevealBackgroundUrl(code: string): string | undefined {
  const filename = MOBILE_S3_REVEAL_BACKGROUNDS[code.trim().toUpperCase()];
  if (!filename) return undefined;
  return fullReportBackgroundSrc(filename, "mobile");
}
