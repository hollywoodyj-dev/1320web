import { resolveSharedDisclaimerSection } from "@/lib/canonical-report/shared-tail-resolvers";
import {
  MOBILE_DISCLAIMER_BOUNDARY_ITEMS,
  MOBILE_DISCLAIMER_BOTTOM_COPY,
  MOBILE_DISCLAIMER_BOTTOM_ICON,
  MOBILE_DISCLAIMER_BOTTOM_TITLE,
  MOBILE_DISCLAIMER_BRAND_NAME,
  MOBILE_DISCLAIMER_KICKER,
  MOBILE_DISCLAIMER_PAGE_INDEX,
  MOBILE_DISCLAIMER_QUOTE_LINES,
  MOBILE_DISCLAIMER_SNAPSHOT_EMPHASIS,
  MOBILE_DISCLAIMER_SNAPSHOT_LABEL,
  MOBILE_DISCLAIMER_SNAPSHOT_LEAD,
  MOBILE_DISCLAIMER_SNAPSHOT_TAIL,
  MOBILE_DISCLAIMER_SUBTITLE,
  MOBILE_DISCLAIMER_TITLE_LINES,
} from "@/lib/mobile-report-v2/disclaimer-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileDisclaimerBoundaryItem = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileDisclaimerUsageItem = {
  label: string;
  copy: string;
};

export type MobileDisclaimerAgencyItem = {
  icon: string;
  title: string;
  copy: string;
};

export type MobileDisclaimerPageContent = {
  brandName: string;
  pageIndex: string;
  kicker: string;
  titleLines: string[];
  subtitle: string;
  snapshotLabel: string;
  snapshotLead: string;
  snapshotEmphasis: string;
  snapshotTail: string;
  boundaryItems: MobileDisclaimerBoundaryItem[];
  useTitle: string;
  usageItems: MobileDisclaimerUsageItem[];
  agencyItems: MobileDisclaimerAgencyItem[];
  quoteLines: string[];
  bottomTitle: string;
  bottomCopy: string;
  bottomIcon: string;
};

export function resolveMobileDisclaimerContent(
  payload: FullReportV2Payload,
): MobileDisclaimerPageContent {
  const disclaimer = resolveSharedDisclaimerSection(payload);

  return {
    brandName: MOBILE_DISCLAIMER_BRAND_NAME,
    pageIndex: MOBILE_DISCLAIMER_PAGE_INDEX,
    kicker: MOBILE_DISCLAIMER_KICKER,
    titleLines: [...MOBILE_DISCLAIMER_TITLE_LINES],
    subtitle: MOBILE_DISCLAIMER_SUBTITLE,
    snapshotLabel: MOBILE_DISCLAIMER_SNAPSHOT_LABEL,
    snapshotLead: disclaimer.interpretationLead || MOBILE_DISCLAIMER_SNAPSHOT_LEAD,
    snapshotEmphasis: disclaimer.interpretationEmphasis || MOBILE_DISCLAIMER_SNAPSHOT_EMPHASIS,
    snapshotTail: disclaimer.interpretationLeadTail || MOBILE_DISCLAIMER_SNAPSHOT_TAIL,
    boundaryItems: MOBILE_DISCLAIMER_BOUNDARY_ITEMS.map((item, index) => ({
      icon: item.icon,
      title: item.title,
      copy: disclaimer.interpretationItems[index]?.trim() || item.copy,
    })),
    useTitle: disclaimer.useTitle,
    usageItems: disclaimer.sealNodes.map((node) => ({
      label: node.label,
      copy: node.copy,
    })),
    agencyItems: disclaimer.bottomSections.map((section) => ({
      icon: section.icon,
      title: section.title,
      copy: section.copy,
    })),
    quoteLines: disclaimer.mirrorLines.length ? disclaimer.mirrorLines : [...MOBILE_DISCLAIMER_QUOTE_LINES],
    bottomTitle: MOBILE_DISCLAIMER_BOTTOM_TITLE,
    bottomCopy: disclaimer.professionalIntro || MOBILE_DISCLAIMER_BOTTOM_COPY,
    bottomIcon: MOBILE_DISCLAIMER_BOTTOM_ICON,
  };
}
