import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";

type ReportPracticePageProps = {
  data: CanonicalFullReport;
};

export function ReportPracticePage({ data }: ReportPracticePageProps) {
  const days = data.payload.integration_practice?.days ?? [];

  return (
    <>
      <ReportHero
        eyebrow="Full Report Practice"
        title="7-Day Integration Practice"
        description="These daily themes guide you to integrate all Soul Blueprint layers through reflection and action."
      />
      <ReportSegmentGrid>
        {days.map((day) => (
          <ReportInsightCard
            key={day.day}
            kicker={`Day ${day.day}`}
            title={day.theme}
            body={day.practice}
          />
        ))}
      </ReportSegmentGrid>
    </>
  );
}
