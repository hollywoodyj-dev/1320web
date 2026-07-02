import { resolveSharedDisclaimerSection } from "@/lib/canonical-report/shared-tail-resolvers";
import {
  MOBILE_FD_BRAND_NAME,
  MOBILE_FD_BRAND_SUBTITLE,
  MOBILE_FD_CLOSING_WORDS,
  MOBILE_FD_DISCLAIMER_ITEMS,
  MOBILE_FD_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_FD_KICKER,
  MOBILE_FD_MANTRA_CENTER,
  MOBILE_FD_MANTRA_LEFT,
  MOBILE_FD_MANTRA_RIGHT,
  MOBILE_FD_PAGE_INDEX,
  MOBILE_FD_REMEMBER_ICON,
  MOBILE_FD_REMEMBER_TITLE,
  MOBILE_FD_SECTION_TITLE,
  MOBILE_FD_SUBTITLE,
  MOBILE_FD_TITLE,
} from "@/lib/mobile-report-v2/final-disclaimer-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import { formatDisclaimerInterpretationLead } from "@/lib/report/customer-facing-copy";

export type MobileFdDisclaimerItem = {
  key: string;
  icon: string;
  title: string;
  copy: string;
};

export type MobileFdUsageItem = {
  key: string;
  label: string;
  copy: string;
};

export type MobileFdAgencySection = {
  key: string;
  icon: string;
  title: string;
  copy: string;
};

export type MobileFinalDisclaimerRemember = {
  before: string;
  emphasis: string;
  after: string;
  isStructured: boolean;
};

export type MobileFinalDisclaimerHeroNote = {
  lead: string;
  emphasis: string;
  tail: string;
};

export type MobileFinalDisclaimerPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  kicker: string;
  title: string;
  subtitle: string;
  heroNote: MobileFinalDisclaimerHeroNote;
  sectionTitle: string;
  disclaimerItems: MobileFdDisclaimerItem[];
  useTitle: string;
  usageItems: MobileFdUsageItem[];
  agencySections: MobileFdAgencySection[];
  professionalTitle: string;
  professionalIntro: string;
  professionalItems: string[];
  rememberTitle: string;
  rememberIcon: string;
  remember: MobileFinalDisclaimerRemember;
  thankYouLine: string;
  rightsCopy: string;
  closingWords: string;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function resolveRememberCopy(rememberCopy: string, emphasis: string): MobileFinalDisclaimerRemember {
  if (!rememberCopy) {
    return { before: rememberCopy, emphasis: "", after: "", isStructured: false };
  }

  const index = rememberCopy.toLowerCase().indexOf(emphasis.toLowerCase());
  if (index >= 0) {
    return {
      before: rememberCopy.slice(0, index),
      emphasis: rememberCopy.slice(index, index + emphasis.length),
      after: rememberCopy.slice(index + emphasis.length),
      isStructured: true,
    };
  }

  return {
    before: rememberCopy,
    emphasis: "",
    after: "",
    isStructured: false,
  };
}

export function resolveMobileFinalDisclaimerContent(
  payload: FullReportV2Payload,
): MobileFinalDisclaimerPageContent {
  const disclaimer = resolveSharedDisclaimerSection(payload);

  const rememberCopy = [
    disclaimer.interpretationSecond,
    disclaimer.interpretationEmphasis,
    ...disclaimer.bottomSections.map((section) => `${section.title}. ${section.copy}`),
  ]
    .filter(Boolean)
    .join(" ");

  return {
    brandName: MOBILE_FD_BRAND_NAME,
    brandSubtitle: MOBILE_FD_BRAND_SUBTITLE,
    pageIndex: MOBILE_FD_PAGE_INDEX,
    kicker: MOBILE_FD_KICKER,
    title: MOBILE_FD_TITLE,
    subtitle: MOBILE_FD_SUBTITLE,
    heroNote: {
      lead: disclaimer.interpretationLead,
      emphasis: disclaimer.interpretationEmphasis,
      tail: disclaimer.interpretationLeadTail,
    },
    sectionTitle: disclaimer.interpretationTitle || MOBILE_FD_SECTION_TITLE,
    disclaimerItems: MOBILE_FD_DISCLAIMER_ITEMS.map((item, index) => ({
      key: item.key,
      icon: item.icon,
      title: item.title,
      copy: disclaimer.interpretationItems[index]?.trim() || item.copy,
    })),
    useTitle: disclaimer.useTitle,
    usageItems: disclaimer.sealNodes.map((node) => ({
      key: node.position,
      label: node.label,
      copy: node.copy,
    })),
    agencySections: disclaimer.bottomSections.map((section, index) => ({
      key: `agency-${index}`,
      icon: section.icon,
      title: section.title,
      copy: section.copy,
    })),
    professionalTitle: disclaimer.professionalTitle,
    professionalIntro: disclaimer.professionalIntro,
    professionalItems: disclaimer.professionalItems,
    rememberTitle: MOBILE_FD_REMEMBER_TITLE,
    rememberIcon: MOBILE_FD_REMEMBER_ICON,
    remember: resolveRememberCopy(rememberCopy, disclaimer.interpretationEmphasis),
    thankYouLine: disclaimer.professionalClosing,
    rightsCopy: disclaimer.rightsCopy,
    closingWords: MOBILE_FD_CLOSING_WORDS,
    mantraLeft: MOBILE_FD_MANTRA_LEFT,
    mantraCenter: MOBILE_FD_MANTRA_CENTER,
    mantraRight: MOBILE_FD_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_FD_FOOTER_LOTUS_LOGO_SRC,
  };
}

/** Flat hero note string for parity checks and metadata. */
export function formatMobileFinalDisclaimerHeroNote(note: MobileFinalDisclaimerHeroNote): string {
  return formatDisclaimerInterpretationLead(note.lead, note.emphasis, note.tail);
}
