import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

export const MOBILE_INTEGRATED_BLUEPRINT_BACKGROUND_FILENAME =
  "integrated-soul-blueprint-background.png";

/** Desktop fallback — same integrated blueprint art used on full report page 08. */
export const MOBILE_INTEGRATED_BLUEPRINT_BACKGROUND_FALLBACK = "/fr-v2-integrated-blueprint-bg-v3.webp";

/** Mobile Integrated Soul Blueprint map — centered cosmic temple art. */
export function getMobileIntegratedBlueprintBackgroundUrl(): string {
  return fullReportBackgroundSrc(MOBILE_INTEGRATED_BLUEPRINT_BACKGROUND_FILENAME, "mobile");
}

export function getMobileIntegratedBlueprintBackgroundFallbackUrl(): string {
  return MOBILE_INTEGRATED_BLUEPRINT_BACKGROUND_FALLBACK;
}
