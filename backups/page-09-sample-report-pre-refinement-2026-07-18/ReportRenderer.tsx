"use client";

import { useMemo, useRef } from "react";
import { useMobilePageSwipe } from "@/components/mobile-report-v2/use-mobile-page-swipe";
import { LockedPreviewBlock } from "@/components/report-system/LockedPreviewBlock";
import { ReportDisclaimerPage } from "@/components/report-system/ReportDisclaimerPage";
import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportIntegrationPage } from "@/components/report-system/ReportIntegrationPage";
import { ReportJournalPage } from "@/components/report-system/ReportJournalPage";
import { ReportPage } from "@/components/report-system/ReportPage";
import { ReportPracticePage } from "@/components/report-system/ReportPracticePage";
import { ReportRoot } from "@/components/report-system/ReportRoot";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import { ReportSegmentPage } from "@/components/report-system/ReportSegmentPage";
import { ReportCoverSignatureCard } from "@/components/report-system/ReportCoverSignatureCard";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import { useUnifiedReportMobileTrack } from "@/components/report-system/use-unified-report-mobile-nav";
import { getSignatureCardImageUrl } from "@/lib/full-report-v2/signature-card-images";
import {
  SIGNATURE_CODE_CARD_META,
  type SignatureCodeCardKey,
} from "@/lib/full-report-v2/signature-static";
import {
  toReportSegmentIconKey,
} from "@/lib/report-system/report-segment-card-image";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { LOCKED_PREVIEW_COPY } from "@/lib/report-system/report-access";
import { buildReportPages } from "@/lib/report-system/buildReportPages";
import type { BuiltReportPage, ReportRendererProps, ReportSegmentCode, ReportSurface } from "@/lib/report-system/report-surface";

function renderCoverPage(data: CanonicalFullReport, surface: ReportSurface) {
  const { client, calculation } = data.payload;

  return (
    <>
      <ReportHero
        eyebrow={surface === "mobile" ? undefined : "1320 Soul Code System"}
        title="Your Soul Blueprint"
        description={`Prepared for ${client.name} · ${client.birth_date_display}`}
      />
      <ReportCoverSignatureCard
        calculation={calculation}
        codeLayout={surface === "mobile" ? "paired-rows" : "inline"}
      />
    </>
  );
}

function renderOverviewPage(data: CanonicalFullReport) {
  const { calculation } = data.payload;
  const layers: Array<{
    segment: ReportSegmentCode;
    key: SignatureCodeCardKey;
    title: string;
    label: string;
  }> = [
    { segment: "S1", key: "s1", title: calculation.s1.title, label: calculation.s1.code },
    { segment: "S3", key: "s3", title: calculation.s3.title, label: calculation.s3.code },
    { segment: "S2", key: "s2", title: calculation.s2.title, label: calculation.s2.code },
    { segment: "S0", key: "s0", title: calculation.s0.title, label: calculation.s0.code },
  ];

  return (
    <>
      <ReportHero
        eyebrow="Blueprint Overview"
        title="Four Foundation Layers"
        description="Foundation order is S1 → S3 → S2 → S0. Each layer reveals a different facet of your inner pattern."
      />
      <ReportSegmentGrid>
        {layers.map((layer) => (
          <ReportInsightCard
            key={layer.segment}
            kicker={layer.segment}
            title={layer.title}
            body={layer.label}
            segmentKey={toReportSegmentIconKey(layer.segment)}
            segmentCode={layer.label}
            icon={SIGNATURE_CODE_CARD_META[layer.key].icon}
            iconImageSrc={getSignatureCardImageUrl(layer.key, calculation)}
          />
        ))}
      </ReportSegmentGrid>
    </>
  );
}

function renderPageBody(page: BuiltReportPage, data: CanonicalFullReport, surface: ReportSurface) {
  if (page.access === "locked-preview") {
    const copy = LOCKED_PREVIEW_COPY[page.pageId as keyof typeof LOCKED_PREVIEW_COPY];
    return (
      <LockedPreviewBlock
        title={copy?.title || page.title}
        description={copy?.description || "Unlock the Full Report to continue this section."}
      />
    );
  }

  switch (page.pageType) {
    case "cover":
      return renderCoverPage(data, surface);
    case "overview":
      return renderOverviewPage(data);
    case "segment":
      return page.segment ? <ReportSegmentPage segment={page.segment} data={data} /> : null;
    case "integration":
      return page.segments ? (
        <ReportIntegrationPage segments={page.segments} data={data} />
      ) : null;
    case "practice":
      return <ReportPracticePage data={data} />;
    case "journal":
      return <ReportJournalPage data={data} />;
    case "closing":
      return <ReportDisclaimerPage data={data} variant="closing" />;
    case "disclaimer":
      return <ReportDisclaimerPage data={data} variant="disclaimer" />;
    default:
      return null;
  }
}

function isMobilePageScrollable(page: BuiltReportPage): boolean {
  return page.pageType !== "cover";
}

export function ReportRenderer({ reportType, surface, data }: ReportRendererProps) {
  const pages = useMemo(() => buildReportPages(reportType), [reportType]);
  const trackRef = useRef<HTMLDivElement>(null);

  useMobilePageSwipe(trackRef, pages.length);
  useUnifiedReportMobileTrack(trackRef, reportType, pages.length);

  if (surface === "mobile") {
    return (
      <ReportRoot reportType={reportType} surface={surface}>
        <div
          ref={trackRef}
          className="mr-v2-page-track"
          aria-label="Report pages"
          role="region"
        >
          {pages.map((page) => (
            <div key={page.pageId} id={page.pageId} className="mr-v2-page-panel">
              <div
                className={[
                  "mr-v2-page-panel-inner",
                  isMobilePageScrollable(page) ? "mr-v2-page-panel-inner--scroll" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <ReportPage
                  pageId={page.pageId}
                  pageNumber={page.pageNumber}
                  totalPages={page.totalPages}
                >
                  {renderPageBody(page, data, surface)}
                </ReportPage>
              </div>
            </div>
          ))}
        </div>
      </ReportRoot>
    );
  }

  return (
    <ReportRoot reportType={reportType} surface={surface}>
      {pages.map((page) => (
        <ReportPage
          key={page.pageId}
          pageId={page.pageId}
          pageNumber={page.pageNumber}
          totalPages={page.totalPages}
        >
          {renderPageBody(page, data, surface)}
        </ReportPage>
      ))}
    </ReportRoot>
  );
}
