import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

export const MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_HERO_BACKGROUND_FILENAME =
  "soul-blueprint-cover-background-no-logos-no-border-v1.png";

/** Packaged fallback under full-report-v2 (same filename). */
export const MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_HERO_BACKGROUND_FALLBACK =
  "/full-report-v2/soul-blueprint-cover-background-no-logos-no-border-v1.png";

/** Soul blueprint cover art behind the S9 Return Pathway hero. */
export function getMobileS9ReturnPathwayRemembranceHeroBackgroundUrl(): string {
  return fullReportBackgroundSrc(
    MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_HERO_BACKGROUND_FILENAME,
    "mobile",
  );
}

export function getMobileS9ReturnPathwayRemembranceHeroBackgroundFallbackUrl(): string {
  return MOBILE_S9_RETURN_PATHWAY_REMEMBRANCE_HERO_BACKGROUND_FALLBACK;
}
