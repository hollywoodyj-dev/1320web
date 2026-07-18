import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
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
import {
  listSamplePreviewInsightCards,
  sampleSegmentUnlockLabel,
  truncateSamplePreviewText,
} from "@/lib/sample-report-content";
import Link from "next/link";

type ReportSegmentPageProps = {
  segment: ReportSegmentCode;
  data: CanonicalFullReport;
  previewMode?: boolean;
};

export function ReportSegmentPage({
  segment,
  data,
  previewMode = false,
}: ReportSegmentPageProps) {
  const { calculation } = data.payload;
  const view = normalizeReportSegment(data, segment);
  const segmentKey = toReportSegmentIconKey(segment);
  const segmentImageUrl = getReportSegmentCardImageUrl(segment, calculation);
  const segmentCode = getReportSegmentCode(segment, calculation);
  const cards = previewMode
    ? listSamplePreviewInsightCards(view)
    : listCommercialInsightCards(view).filter((card) =>
        Boolean(sanitizeReportText(card.body, view.contentLayer)),
      );

  const description = previewMode
    ? truncateSamplePreviewText(view.subtitle, 48)
    : view.subtitle;

  const unlockLabel =
    previewMode && (segment === "S1" || segment === "S3" || segment === "S2" || segment === "S0")
      ? sampleSegmentUnlockLabel(segment)
      : null;

  return (
    <>
      <ReportHero
        eyebrow={`${view.code} · ${view.segmentName}`}
        title={view.displayName}
        description={description}
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
            body={
              previewMode ? card.body : sanitizeReportText(card.body, view.contentLayer)
            }
          />
        ))}
      </ReportSegmentGrid>

      {unlockLabel ? (
        <div className="sample-segment-unlock">
          <Link href="/full-report" className="blueprint-secondary-link sample-segment-unlock-link">
            {unlockLabel}
          </Link>
        </div>
      ) : null}
    </>
  );
}
