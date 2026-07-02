import { resolveSharedJournalSection } from "@/lib/canonical-report/shared-tail-resolvers";
import { uniqueStrings } from "@/lib/mobile-report-v2/mobile-expansion-parity-helpers";
import {
  MOBILE_RFJ_BRAND_NAME,
  MOBILE_RFJ_BRAND_SUBTITLE,
  MOBILE_RFJ_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_RFJ_HERO_ICON,
  MOBILE_RFJ_JOURNAL_INPUT_PLACEHOLDER,
  MOBILE_RFJ_JOURNAL_TITLE,
  MOBILE_RFJ_KICKER,
  MOBILE_RFJ_MANTRA_CENTER,
  MOBILE_RFJ_MANTRA_LEFT,
  MOBILE_RFJ_MANTRA_RIGHT,
  MOBILE_RFJ_PAGE_INDEX,
  MOBILE_RFJ_SUBTITLE,
  MOBILE_RFJ_TITLE_EMPHASIS,
  MOBILE_RFJ_TITLE_LINE,
  MOBILE_RFJ_USE_ITEMS,
  MOBILE_RFJ_USE_TITLE,
} from "@/lib/mobile-report-v2/reflection-journal-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileRfjUseItem = {
  icon: string;
  copy: string;
};

export type MobileRfjPromptCard = {
  codeLabel: string;
  displayTitle: string;
  prompt: string;
};

export type MobileReflectionJournalQuote = {
  before: string;
  emphasis: string;
  after: string;
  isStructured: boolean;
};

export type MobileReflectionJournalPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  heroIcon: string;
  titleLine: string;
  titleEmphasis: string;
  kicker: string;
  subtitle: string;
  whyReflectionTitle: string;
  whyReflectionCopy: string;
  guidelinesTitle: string;
  guidelines: string[];
  useTitle: string;
  useItems: MobileRfjUseItem[];
  journalTitle: string;
  journalInputPlaceholder: string;
  promptCards: MobileRfjPromptCard[];
  checkinTitle: string;
  checkinQuestions: string[];
  soulInsightTitle: string;
  soulInsightPrompt: string;
  doodleTitle: string;
  rememberCopy: string;
  promptsPanelTitle: string;
  footerLines: string[];
  quote: MobileReflectionJournalQuote;
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function resolveQuote(quote: string): MobileReflectionJournalQuote {
  const emphasis = "return to yourself";
  const index = quote.toLowerCase().indexOf(emphasis);
  if (index >= 0) {
    return {
      before: quote.slice(0, index),
      emphasis: quote.slice(index, index + emphasis.length),
      after: quote.slice(index + emphasis.length),
      isStructured: true,
    };
  }

  return {
    before: quote,
    emphasis: "",
    after: "",
    isStructured: false,
  };
}

export function resolveMobileReflectionJournalContent(
  payload: FullReportV2Payload,
): MobileReflectionJournalPageContent {
  const journal = resolveSharedJournalSection(payload);

  return {
    brandName: MOBILE_RFJ_BRAND_NAME,
    brandSubtitle: MOBILE_RFJ_BRAND_SUBTITLE,
    pageIndex: MOBILE_RFJ_PAGE_INDEX,
    heroIcon: MOBILE_RFJ_HERO_ICON,
    titleLine: MOBILE_RFJ_TITLE_LINE,
    titleEmphasis: MOBILE_RFJ_TITLE_EMPHASIS,
    kicker: MOBILE_RFJ_KICKER,
    subtitle: journal.hero.subtitle || MOBILE_RFJ_SUBTITLE,
    whyReflectionTitle: journal.whyReflectionTitle,
    whyReflectionCopy: journal.whyReflectionCopy,
    guidelinesTitle: journal.guidelinesTitle,
    guidelines: journal.guidelines,
    useTitle: MOBILE_RFJ_USE_TITLE,
    useItems: uniqueStrings(
      journal.guidelines.slice(0, 2),
      [journal.doodleTitle],
      MOBILE_RFJ_USE_ITEMS.map((item) => item.copy),
    ).map((copy, index) => ({
      icon: MOBILE_RFJ_USE_ITEMS[Math.min(index, MOBILE_RFJ_USE_ITEMS.length - 1)]?.icon ?? "✎",
      copy,
    })),
    journalTitle: MOBILE_RFJ_JOURNAL_TITLE,
    journalInputPlaceholder: MOBILE_RFJ_JOURNAL_INPUT_PLACEHOLDER,
    promptCards: journal.promptCards.map((card) => ({
      codeLabel: card.codeLabel,
      displayTitle: card.displayTitle,
      prompt: card.prompt,
    })),
    checkinTitle: journal.checkinTitle,
    checkinQuestions: journal.checkinQuestions,
    soulInsightTitle: journal.soulInsightTitle,
    soulInsightPrompt: journal.soulInsightPrompt,
    doodleTitle: journal.doodleTitle,
    rememberCopy: journal.rememberCopy,
    promptsPanelTitle: journal.promptsPanelTitle,
    footerLines: [...journal.footerMantra],
    quote: resolveQuote(journal.quote),
    mantraLeft: MOBILE_RFJ_MANTRA_LEFT,
    mantraCenter: MOBILE_RFJ_MANTRA_CENTER,
    mantraRight: MOBILE_RFJ_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_RFJ_FOOTER_LOTUS_LOGO_SRC,
  };
}
