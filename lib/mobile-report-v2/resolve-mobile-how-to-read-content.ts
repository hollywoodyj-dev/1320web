import {
  MOBILE_HOW_TO_READ_BRAND_NAME,
  MOBILE_HOW_TO_READ_CLOSING_COPY,
  MOBILE_HOW_TO_READ_CLOSING_ICON,
  MOBILE_HOW_TO_READ_CLOSING_TITLE,
  MOBILE_HOW_TO_READ_KICKER,
  MOBILE_HOW_TO_READ_PAGE_INDEX,
  MOBILE_HOW_TO_READ_REMINDER_ITEMS,
  MOBILE_HOW_TO_READ_REMINDERS_TITLE,
  MOBILE_HOW_TO_READ_STRUCTURE_ITEMS,
  MOBILE_HOW_TO_READ_STRUCTURE_TITLE,
  MOBILE_HOW_TO_READ_SUBTITLE,
  MOBILE_HOW_TO_READ_TITLE_LINES,
  MOBILE_HOW_TO_READ_USE_ITEMS,
  MOBILE_HOW_TO_READ_USE_TITLE,
} from "@/lib/mobile-report-v2/how-to-read-page-static";
import { getMobileHowToReadBackgroundUrl } from "@/lib/mobile-report-v2/get-mobile-how-to-read-background";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileHowToReadPageContent = {
  brandName: string;
  pageIndex: string;
  heroBackgroundUrl: string;
  kicker: string;
  titleLines: string[];
  subtitle: string;
  structureTitle: string;
  structureItems: Array<{
    icon: string;
    nameLines: string[];
    subtitle: string;
    copy: string;
  }>;
  remindersTitle: string;
  reminderItems: Array<{ icon: string; title: string; copy: string }>;
  useTitle: string;
  useItems: Array<{ icon: string; titleLines: string[]; copy: string }>;
  closingIcon: string;
  closingTitle: string;
  closingCopy: string;
};

export function resolveMobileHowToReadContent(
  _payload: FullReportV2Payload,
): MobileHowToReadPageContent {
  return {
    brandName: MOBILE_HOW_TO_READ_BRAND_NAME,
    pageIndex: MOBILE_HOW_TO_READ_PAGE_INDEX,
    heroBackgroundUrl: getMobileHowToReadBackgroundUrl(),
    kicker: MOBILE_HOW_TO_READ_KICKER,
    titleLines: [...MOBILE_HOW_TO_READ_TITLE_LINES],
    subtitle: MOBILE_HOW_TO_READ_SUBTITLE,
    structureTitle: MOBILE_HOW_TO_READ_STRUCTURE_TITLE,
    structureItems: MOBILE_HOW_TO_READ_STRUCTURE_ITEMS.map((item) => ({
      icon: item.icon,
      nameLines: [...item.nameLines],
      subtitle: item.subtitle,
      copy: item.copy,
    })),
    remindersTitle: MOBILE_HOW_TO_READ_REMINDERS_TITLE,
    reminderItems: [...MOBILE_HOW_TO_READ_REMINDER_ITEMS],
    useTitle: MOBILE_HOW_TO_READ_USE_TITLE,
    useItems: MOBILE_HOW_TO_READ_USE_ITEMS.map((item) => ({
      icon: item.icon,
      titleLines: [...item.titleLines],
      copy: item.copy,
    })),
    closingIcon: MOBILE_HOW_TO_READ_CLOSING_ICON,
    closingTitle: MOBILE_HOW_TO_READ_CLOSING_TITLE,
    closingCopy: MOBILE_HOW_TO_READ_CLOSING_COPY,
  };
}
