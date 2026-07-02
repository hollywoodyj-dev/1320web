import { resolveSharedClosingSection } from "@/lib/canonical-report/shared-tail-resolvers";
import {
  MOBILE_CLR_BRAND_NAME,
  MOBILE_CLR_BRAND_SUBTITLE,
  MOBILE_CLR_FOOTER_LOTUS_LOGO_SRC,
  MOBILE_CLR_HERO_ICON,
  MOBILE_CLR_KICKER,
  MOBILE_CLR_MANTRA_CENTER,
  MOBILE_CLR_MANTRA_LEFT,
  MOBILE_CLR_MANTRA_RIGHT,
  MOBILE_CLR_PAGE_INDEX,
  MOBILE_CLR_QUOTE_AFTER,
  MOBILE_CLR_QUOTE_BEFORE,
  MOBILE_CLR_QUOTE_EMPHASIS,
  MOBILE_CLR_REMINDERS,
  MOBILE_CLR_REMINDERS_TITLE,
  MOBILE_CLR_THANK_TITLE,
  MOBILE_CLR_TITLE_EMPHASIS,
  MOBILE_CLR_TITLE_LINE,
} from "@/lib/mobile-report-v2/closing-reflection-page-static";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

export type MobileClrReminder = {
  key: string;
  icon: string;
  title: string;
  copy: string;
};

export type MobileClosingReflectionQuote = {
  before: string;
  emphasis: string;
  after: string;
  isStructured: boolean;
};

export type MobileClosingReflectionPageContent = {
  brandName: string;
  brandSubtitle: string;
  pageIndex: string;
  heroIcon: string;
  kicker: string;
  titleLine: string;
  titleEmphasis: string;
  subtitle: string;
  shownTitle: string;
  closingParagraphs: string[];
  closingEmphasis: string;
  beforeForwardTitle: string;
  beforeForwardCopy: string;
  remindersTitle: string;
  reminders: MobileClrReminder[];
  sealTitle: string;
  sealNodes: Array<{ title: string; copy: string }>;
  quote: MobileClosingReflectionQuote;
  thankTitle: string;
  thankCopy: string;
  nextStepTitle: string;
  nextStep: string;
  footerLines: string[];
  mantraLeft: string;
  mantraCenter: string;
  mantraRight: string;
  footerLotusLogoUrl: string;
};

function resolveQuote(prompt: string): MobileClosingReflectionQuote {
  if (!prompt) {
    return {
      before: MOBILE_CLR_QUOTE_BEFORE,
      emphasis: MOBILE_CLR_QUOTE_EMPHASIS,
      after: MOBILE_CLR_QUOTE_AFTER,
      isStructured: true,
    };
  }

  const emphasis = MOBILE_CLR_QUOTE_EMPHASIS;
  const index = prompt.toLowerCase().indexOf(emphasis);
  if (index >= 0) {
    return {
      before: prompt.slice(0, index),
      emphasis: prompt.slice(index, index + emphasis.length),
      after: prompt.slice(index + emphasis.length),
      isStructured: true,
    };
  }

  return {
    before: prompt,
    emphasis: "",
    after: "",
    isStructured: false,
  };
}

export function resolveMobileClosingReflectionContent(
  payload: FullReportV2Payload,
): MobileClosingReflectionPageContent {
  const closing = resolveSharedClosingSection(payload);

  const reminders: MobileClrReminder[] = MOBILE_CLR_REMINDERS.map((item, index) => ({
    key: item.key,
    icon: item.icon,
    title: item.title,
    copy: closing.rememberItems[index]?.trim() || item.copy,
  }));

  const closingParagraphs = [
    ...closing.shownCopy,
    closing.gentleIntegrationCopy,
    closing.livingBlueprintCopy,
    closing.closingInsightLead,
    ...closing.statementLines,
  ].filter(Boolean);

  return {
    brandName: MOBILE_CLR_BRAND_NAME,
    brandSubtitle: MOBILE_CLR_BRAND_SUBTITLE,
    pageIndex: MOBILE_CLR_PAGE_INDEX,
    heroIcon: MOBILE_CLR_HERO_ICON,
    kicker: MOBILE_CLR_KICKER,
    titleLine: MOBILE_CLR_TITLE_LINE,
    titleEmphasis: MOBILE_CLR_TITLE_EMPHASIS,
    subtitle: closing.hero.subtitle,
    shownTitle: closing.shownTitle,
    closingParagraphs,
    closingEmphasis: closing.closingInsight,
    beforeForwardTitle: closing.beforeForwardTitle,
    beforeForwardCopy: closing.beforeForwardCopy,
    remindersTitle: closing.rememberTitle || MOBILE_CLR_REMINDERS_TITLE,
    reminders,
    sealTitle: closing.sealTitle,
    sealNodes: closing.sealNodes.map((node) => ({ title: node.title, copy: node.copy })),
    quote: resolveQuote(closing.finalReflectionPrompt),
    thankTitle: MOBILE_CLR_THANK_TITLE,
    thankCopy: closing.blessingLines.join(" "),
    nextStepTitle: closing.nextStepTitle,
    nextStep: closing.nextStep,
    footerLines: [...closing.footerMantra],
    mantraLeft: MOBILE_CLR_MANTRA_LEFT,
    mantraCenter: MOBILE_CLR_MANTRA_CENTER,
    mantraRight: MOBILE_CLR_MANTRA_RIGHT,
    footerLotusLogoUrl: MOBILE_CLR_FOOTER_LOTUS_LOGO_SRC,
  };
}
