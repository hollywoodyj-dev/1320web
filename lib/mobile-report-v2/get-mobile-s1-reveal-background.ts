import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

/** Shared earth/sunrise reveal art (S1-18, S3-03, S-module icon/reveal cards). */
export const MOBILE_TRANSFORMER_REVEAL_BACKGROUND_FILENAME = "s1-18-transformer-background.png";

/** Mobile S1 reveal card backgrounds keyed by calculation code (e.g. S1-18). */
const MOBILE_S1_REVEAL_BACKGROUNDS: Record<string, string> = {
  "S1-18": MOBILE_TRANSFORMER_REVEAL_BACKGROUND_FILENAME,
};

export function getMobileS1RevealBackgroundUrl(code: string): string | undefined {
  const filename = MOBILE_S1_REVEAL_BACKGROUNDS[code.trim().toUpperCase()];
  if (!filename) return undefined;
  return fullReportBackgroundSrc(filename, "mobile");
}

/** Shared transformer reveal art URL (earth/sunrise) for mobile code-reveal cards. */
export function getMobileTransformerRevealBackgroundUrl(): string {
  return fullReportBackgroundSrc(MOBILE_TRANSFORMER_REVEAL_BACKGROUND_FILENAME, "mobile");
}
