import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

export const MOBILE_S9_RETURN_TO_SOURCE_REVEAL_HERO_BACKGROUND_FILENAME =
  "celestial-lotus-background-final-v2.png";

/** Packaged fallback under full-report-v2 (same filename). */
export const MOBILE_S9_RETURN_TO_SOURCE_REVEAL_HERO_BACKGROUND_FALLBACK =
  "/full-report-v2/celestial-lotus-background-final-v2.png";

/** Celestial lotus hero art behind S9 Return to Source Reveal lotus card. */
export function getMobileS9ReturnToSourceRevealHeroBackgroundUrl(): string {
  return fullReportBackgroundSrc(
    MOBILE_S9_RETURN_TO_SOURCE_REVEAL_HERO_BACKGROUND_FILENAME,
    "mobile",
  );
}

export function getMobileS9ReturnToSourceRevealHeroBackgroundFallbackUrl(): string {
  return MOBILE_S9_RETURN_TO_SOURCE_REVEAL_HERO_BACKGROUND_FALLBACK;
}
