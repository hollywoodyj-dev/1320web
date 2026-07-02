import {
  DISCLAIMER_BOTTOM_SECTIONS,
  DISCLAIMER_INTERPRETATION_EMPHASIS,
  DISCLAIMER_INTERPRETATION_ITEMS,
  DISCLAIMER_INTERPRETATION_LEAD,
  DISCLAIMER_INTERPRETATION_LEAD_TAIL,
  DISCLAIMER_INTERPRETATION_SECOND,
  DISCLAIMER_INTERPRETATION_TITLE,
  DISCLAIMER_MIRROR_LINES,
  DISCLAIMER_PAGE_HERO,
  DISCLAIMER_PROFESSIONAL_CLOSING,
  DISCLAIMER_PROFESSIONAL_INTRO,
  DISCLAIMER_PROFESSIONAL_ITEMS,
  DISCLAIMER_PROFESSIONAL_TITLE,
  DISCLAIMER_RIGHTS_COPY,
  DISCLAIMER_SEAL_LABELS,
  DISCLAIMER_USE_TITLE,
} from "@/lib/full-report-v2/disclaimer-page-static";
import {
  DISCLAIMER_SEAL_LOGO_ALTS,
  DISCLAIMER_SEAL_LOGO_URLS,
} from "@/lib/full-report-v2/disclaimer-seal-logos";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type DisclaimerSealNode = {
  position: "top" | "right" | "bottom" | "left";
  label: string;
  copy: string;
  iconUrl: string;
  iconAlt: string;
};

export type DisclaimerBottomSection = {
  icon: string;
  title: string;
  copy: string;
};

export type DisclaimerPageContent = {
  hero: typeof DISCLAIMER_PAGE_HERO;
  interpretationTitle: string;
  interpretationLead: string;
  interpretationEmphasis: string;
  interpretationLeadTail: string;
  interpretationSecond: string;
  interpretationItems: string[];
  useTitle: string;
  sealNodes: DisclaimerSealNode[];
  mirrorLines: string[];
  rightsCopy: string;
  professionalTitle: string;
  professionalIntro: string;
  professionalItems: string[];
  professionalClosing: string;
  bottomSections: DisclaimerBottomSection[];
};

export function resolveDisclaimerPageContent(
  payload: FullReportV2Payload,
): DisclaimerPageContent {
  const reportId = payload.report.report_id?.trim();
  const generatedDate = payload.report.generated_date?.trim();

  let rightsCopy = DISCLAIMER_RIGHTS_COPY;
  if (reportId || generatedDate) {
    const metaParts = [
      reportId ? `Report ID: ${reportId}` : "",
      generatedDate ? `Generated: ${generatedDate}` : "",
    ].filter(Boolean);
    rightsCopy = `${DISCLAIMER_RIGHTS_COPY} ${metaParts.join(" · ")}`;
  }

  return {
    hero: DISCLAIMER_PAGE_HERO,
    interpretationTitle: DISCLAIMER_INTERPRETATION_TITLE,
    interpretationLead: DISCLAIMER_INTERPRETATION_LEAD,
    interpretationEmphasis: DISCLAIMER_INTERPRETATION_EMPHASIS,
    interpretationLeadTail: DISCLAIMER_INTERPRETATION_LEAD_TAIL,
    interpretationSecond: DISCLAIMER_INTERPRETATION_SECOND,
    interpretationItems: [...DISCLAIMER_INTERPRETATION_ITEMS],
    useTitle: DISCLAIMER_USE_TITLE,
    sealNodes: DISCLAIMER_SEAL_LABELS.map((node) => ({
      ...node,
      iconUrl: DISCLAIMER_SEAL_LOGO_URLS[node.position],
      iconAlt: DISCLAIMER_SEAL_LOGO_ALTS[node.position],
    })),
    mirrorLines: [...DISCLAIMER_MIRROR_LINES],
    rightsCopy,
    professionalTitle: DISCLAIMER_PROFESSIONAL_TITLE,
    professionalIntro: DISCLAIMER_PROFESSIONAL_INTRO,
    professionalItems: [...DISCLAIMER_PROFESSIONAL_ITEMS],
    professionalClosing: DISCLAIMER_PROFESSIONAL_CLOSING,
    bottomSections: DISCLAIMER_BOTTOM_SECTIONS.map((section) => ({ ...section })),
  };
}
