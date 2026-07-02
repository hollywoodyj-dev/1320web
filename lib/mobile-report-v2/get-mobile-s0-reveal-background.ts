import { getMobileTransformerRevealBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-s1-reveal-background";

/** Mobile S0 reveal card — uses shared transformer background art. */
export function getMobileS0RevealBackgroundUrl(): string {
  return getMobileTransformerRevealBackgroundUrl();
}
