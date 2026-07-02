import { resolvePracticePageContent } from "@/lib/full-report-v2/resolve-practice-page-content";
import type { FullReportV2Payload } from "@/lib/full-report-v2/types";

/** Shared practice section — canonical source for desktop page 15 and mobile pages 28–29. */
export function resolveSharedPracticeSection(payload: FullReportV2Payload) {
  return resolvePracticePageContent(payload);
}

export { resolveJournalPageContent as resolveSharedJournalSection } from "@/lib/full-report-v2/resolve-journal-page-content";
export { resolveClosingPageContent as resolveSharedClosingSection } from "@/lib/full-report-v2/resolve-closing-page-content";
export { resolveDisclaimerPageContent as resolveSharedDisclaimerSection } from "@/lib/full-report-v2/resolve-disclaimer-page-content";
