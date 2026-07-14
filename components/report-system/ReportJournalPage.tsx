import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";

type ReportJournalPageProps = {
  data: CanonicalFullReport;
};

export function ReportJournalPage({ data }: ReportJournalPageProps) {
  const journal = data.payload.reflection_journal;

  return (
    <>
      <ReportHero
        eyebrow="Reflection Journal"
        title="Journal Prompts"
        description={journal?.prompt ?? "Use these prompts to deepen awareness before action."}
      />
      <ReportSegmentGrid>
        {journal?.placeholder ? (
          <ReportInsightCard
            kicker="Journal"
            title="Write Here"
            body={journal.placeholder}
            icon="✎"
          />
        ) : null}
        {journal?.quote ? (
          <ReportInsightCard
            kicker="Remembrance"
            title="Integration Quote"
            body={journal.quote}
            icon="✦"
          />
        ) : null}
      </ReportSegmentGrid>
    </>
  );
}
