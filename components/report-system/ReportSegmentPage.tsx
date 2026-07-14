import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import {
  listCommercialInsightCards,
  normalizeReportSegment,
  sanitizeReportText,
} from "@/lib/report-system/normalizeReportContent";
import type { ReportSegmentCode } from "@/lib/report-system/report-surface";

type ReportSegmentPageProps = {
  segment: ReportSegmentCode;
  data: CanonicalFullReport;
};

export function ReportSegmentPage({ segment, data }: ReportSegmentPageProps) {
  const view = normalizeReportSegment(data, segment);
  const cards = listCommercialInsightCards(view).filter((card) =>
    Boolean(sanitizeReportText(card.body, view.contentLayer)),
  );

  return (
    <>
      <ReportHero
        eyebrow={`${view.code} · ${view.segmentName}`}
        title={view.displayName}
        description={view.subtitle}
      />

      <ReportSegmentGrid>
        {cards.map((card) => (
          <ReportInsightCard
            key={card.key}
            kicker={card.kicker}
            title={card.title}
            body={sanitizeReportText(card.body, view.contentLayer)}
          />
        ))}
      </ReportSegmentGrid>
    </>
  );
}
