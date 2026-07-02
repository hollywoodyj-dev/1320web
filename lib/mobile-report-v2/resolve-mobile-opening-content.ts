import {
  MOBILE_OPENING_BOTTOM_COPY,
  MOBILE_OPENING_BOTTOM_ICON,
  MOBILE_OPENING_BOTTOM_TITLE,
  MOBILE_OPENING_BRAND_NAME,
  MOBILE_OPENING_KICKER,
  MOBILE_OPENING_NOTE_COPY,
  MOBILE_OPENING_NOTE_EMPHASIS,
  MOBILE_OPENING_NOTE_LABEL,
  MOBILE_OPENING_PAGE_INDEX,
  MOBILE_OPENING_QUOTE_LINES,
  MOBILE_OPENING_SUBTITLE,
  MOBILE_OPENING_TITLE_LINES,
} from "@/lib/mobile-report-v2/opening-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileOpeningPageContent = {
  brandName: string;
  pageIndex: string;
  kicker: string;
  titleLines: string[];
  subtitle: string;
  noteLabel: string;
  noteParagraphs: string[];
  noteEmphasis: string;
  quoteLines: string[];
  bottomTitle: string;
  bottomCopy: string;
  bottomIcon: string;
};

export function resolveMobileOpeningContent(
  _payload: FullReportV2Payload,
): MobileOpeningPageContent {
  return {
    brandName: MOBILE_OPENING_BRAND_NAME,
    pageIndex: MOBILE_OPENING_PAGE_INDEX,
    kicker: MOBILE_OPENING_KICKER,
    titleLines: [...MOBILE_OPENING_TITLE_LINES],
    subtitle: MOBILE_OPENING_SUBTITLE,
    noteLabel: MOBILE_OPENING_NOTE_LABEL,
    noteParagraphs: [...MOBILE_OPENING_NOTE_COPY],
    noteEmphasis: MOBILE_OPENING_NOTE_EMPHASIS,
    quoteLines: [...MOBILE_OPENING_QUOTE_LINES],
    bottomTitle: MOBILE_OPENING_BOTTOM_TITLE,
    bottomCopy: MOBILE_OPENING_BOTTOM_COPY,
    bottomIcon: MOBILE_OPENING_BOTTOM_ICON,
  };
}
