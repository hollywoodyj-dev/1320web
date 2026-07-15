import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import {
  getReportSegmentCardImageUrl,
  getReportSegmentCode,
  REPORT_SEGMENT_FALLBACK_ICONS,
  toReportSegmentIconKey,
} from "@/lib/report-system/report-segment-card-image";
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
  const { calculation } = data.payload;
  const view = normalizeReportSegment(data, segment);
  const segmentKey = toReportSegmentIconKey(segment);
  const segmentImageUrl = getReportSegmentCardImageUrl(segment, calculation);
  const segmentCode = getReportSegmentCode(segment, calculation);
  const cards = listCommercialInsightCards(view).filter((card) =>
    Boolean(sanitizeReportText(card.body, view.contentLayer)),
  );

  return (
    <>
      <ReportHero
        eyebrow={`${view.code} · ${view.segmentName}`}
        title={view.displayName}
        description={view.subtitle}
        titleIcon={{
          segmentKey,
          imageUrl: segmentImageUrl,
          fallbackIcon: REPORT_SEGMENT_FALLBACK_ICONS[segmentKey],
          code: segmentCode,
          title: view.displayName,
        }}
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
