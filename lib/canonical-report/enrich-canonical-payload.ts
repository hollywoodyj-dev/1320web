import { resolveClosingPageContent } from "@/lib/full-report-v2/resolve-closing-page-content";
import { resolveDisclaimerPageContent } from "@/lib/full-report-v2/resolve-disclaimer-page-content";
import { resolveJournalPageContent } from "@/lib/full-report-v2/resolve-journal-page-content";
import { resolvePracticePageContent } from "@/lib/full-report-v2/resolve-practice-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";
import { formatDisclaimerInterpretationLead } from "@/lib/report/customer-facing-copy";

/**
 * Populate canonical payload fields from shared resolvers when the raw builder
 * left them empty. Ensures one resolved source for desktop and mobile renderers.
 */
export function enrichCanonicalPayload(payload: FullReportV2Payload): FullReportV2Payload {
  const practice = resolvePracticePageContent(payload);
  const journal = resolveJournalPageContent(payload);
  const closing = resolveClosingPageContent(payload);
  const disclaimer = resolveDisclaimerPageContent(payload);

  return {
    ...payload,
    integration_practice: {
      days: practice.days.map((day) => ({
        day: day.dayNumber,
        theme: day.themeTitle,
        practice: day.practice,
        reflection: day.reflection,
      })),
    },
    reflection_journal: {
      prompt: journal.soulInsightPrompt,
      placeholder: journal.promptCards.map((card) => card.prompt).join("\n\n"),
      quote: journal.quote,
    },
    closing_reflection: {
      subtitle: closing.hero.subtitle,
      message: [...closing.shownCopy, closing.closingInsight].filter(Boolean).join("\n\n"),
      quote: closing.finalReflectionPrompt,
      thank_you_message: closing.blessingLines.join(" "),
      reminder_1_title: closing.rememberTitle,
      reminder_1_copy: closing.rememberItems[0] ?? "",
      reminder_2_title: closing.sealNodes[0]?.title ?? "",
      reminder_2_copy: closing.rememberItems[1] ?? "",
      reminder_3_title: closing.sealNodes[1]?.title ?? "",
      reminder_3_copy: closing.rememberItems[2] ?? "",
      reminder_4_title: closing.sealNodes[2]?.title ?? "",
      reminder_4_copy: closing.rememberItems[3] ?? "",
      reminder_5_title: closing.sealNodes[3]?.title ?? "",
      reminder_5_copy: closing.rememberItems[4] ?? "",
    },
    final_disclaimer: {
      hero_note: formatDisclaimerInterpretationLead(
        disclaimer.interpretationLead,
        disclaimer.interpretationEmphasis,
        disclaimer.interpretationLeadTail,
      ),
      remember_copy: [disclaimer.interpretationSecond, disclaimer.interpretationEmphasis]
        .filter(Boolean)
        .join(" "),
      thank_you_line: disclaimer.professionalClosing,
    },
  };
}
