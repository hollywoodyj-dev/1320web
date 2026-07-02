import { fullReportBackgroundSrc } from "@/lib/full-report/backgrounds";

const MOBILE_HOW_TO_READ_BACKGROUND = "how-to-read-background.png";

export function getMobileHowToReadBackgroundUrl(): string {
  return fullReportBackgroundSrc(MOBILE_HOW_TO_READ_BACKGROUND, "mobile");
}
