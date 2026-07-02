import {
  MOBILE_COVER_BIRTH_LABEL,
  MOBILE_COVER_BRAND_NAME,
  MOBILE_COVER_MAIN_TITLE_LINES,
  MOBILE_COVER_PREPARED_LABEL,
  MOBILE_COVER_SUB_TITLE,
  MOBILE_COVER_TAGLINE,
  MOBILE_COVER_VERSION_DEFAULT,
} from "@/lib/mobile-report-v2/cover-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileCoverPageContent = {
  brandName: string;
  mainTitleLines: string[];
  subTitle: string;
  tagline: string;
  preparedLabel: string;
  name: string;
  birthLabel: string;
  birthDateDisplay: string;
  versionLabel: string;
};

export function resolveMobileCoverContent(payload: FullReportV2Payload): MobileCoverPageContent {
  return {
    brandName: MOBILE_COVER_BRAND_NAME,
    mainTitleLines: [...MOBILE_COVER_MAIN_TITLE_LINES],
    subTitle: MOBILE_COVER_SUB_TITLE,
    tagline: MOBILE_COVER_TAGLINE,
    preparedLabel: MOBILE_COVER_PREPARED_LABEL,
    name: payload.client.name,
    birthLabel: MOBILE_COVER_BIRTH_LABEL,
    birthDateDisplay: payload.client.birth_date_display,
    versionLabel: MOBILE_COVER_VERSION_DEFAULT,
  };
}
