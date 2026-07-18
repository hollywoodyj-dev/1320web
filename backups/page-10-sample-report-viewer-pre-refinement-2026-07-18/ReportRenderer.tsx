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
import { toReportSegmentIconKey } from "@/lib/report-system/report-segment-card-image";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { LOCKED_PREVIEW_COPY } from "@/lib/report-system/report-access";
import { buildReportPages } from "@/lib/report-system/buildReportPages";
import type {
  BuiltReportPage,
  ReportRendererProps,
  ReportSegmentCode,
  ReportSurface,
  ReportType,
} from "@/lib/report-system/report-surface";
import { SAMPLE_COVER, SAMPLE_FOUNDATION } from "@/lib/sample-report-content";

function renderCoverPage(
  data: CanonicalFullReport,
  surface: ReportSurface,
  reportType: ReportType,
) {
  const { client, calculation } = data.payload;

  if (reportType === "sample") {
    return (
      <>
        <div className="sample-preview-badge">Preview Mode</div>
        <ReportHero
          eyebrow={SAMPLE_COVER.eyebrow}
          title={SAMPLE_COVER.title}
          description={SAMPLE_COVER.description}
        />
        <p className="sample-cover-boundary">{SAMPLE_COVER.boundary}</p>
        <ReportCoverSignatureCard
          calculation={calculation}
          codeLayout={surface === "mobile" ? "paired-rows" : "inline"}
        />
      </>
    );
  }

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

function renderOverviewPage(data: CanonicalFullReport, reportType: ReportType) {
  const { calculation } = data.payload;

  if (reportType === "sample") {
    return (
      <>
        <ReportHero
          eyebrow={SAMPLE_FOUNDATION.eyebrow}
          title={SAMPLE_FOUNDATION.title}
          description={SAMPLE_FOUNDATION.description}
        />
        <ReportSegmentGrid>
          {SAMPLE_FOUNDATION.layers.map((layer) => {
            const key = layer.code.toLowerCase() as SignatureCodeCardKey;
            return (
              <ReportInsightCard
                key={layer.code}
                kicker={layer.code}
                title={layer.title}
                body={layer.text}
                segmentKey={toReportSegmentIconKey(layer.code as ReportSegmentCode)}
                segmentCode={calculation[key].code}
                icon={SIGNATURE_CODE_CARD_META[key].icon}
                iconImageSrc={getSignatureCardImageUrl(key, calculation)}
              />
            );
          })}
        </ReportSegmentGrid>
      </>
    );
  }

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

function renderPageBody(
  page: BuiltReportPage,
  data: CanonicalFullReport,
  surface: ReportSurface,
  reportType: ReportType,
) {
  if (page.access === "locked-preview") {
    const copy = LOCKED_PREVIEW_COPY[page.pageId as keyof typeof LOCKED_PREVIEW_COPY];
    return (
      <LockedPreviewBlock
        title={copy?.title || page.title}
        description={copy?.description || "Available in the Full Report."}
        badge={reportType === "sample" ? "Locked" : "Full Report"}
      />
    );
  }

  switch (page.pageType) {
    case "cover":
      return renderCoverPage(data, surface, reportType);
    case "overview":
      return renderOverviewPage(data, reportType);
    case "segment":
      return page.segment ? (
        <ReportSegmentPage
          segment={page.segment}
          data={data}
          previewMode={reportType === "sample"}
        />
      ) : null;
    case "integration":
      return page.segments ? (
        <ReportIntegrationPage
          segments={page.segments}
          data={data}
          previewMode={reportType === "sample"}
        />
      ) : null;
    case "practice":
      return <ReportPracticePage data={data} />;
    case "journal":
      return <ReportJournalPage data={data} />;
    case "closing":
      return <ReportDisclaimerPage data={data} variant="closing" />;
    case "disclaimer":
      return (
        <ReportDisclaimerPage
          data={data}
          variant="disclaimer"
          previewMode={reportType === "sample"}
        />
      );
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
                  {renderPageBody(page, data, surface, reportType)}
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
          {renderPageBody(page, data, surface, reportType)}
        </ReportPage>
      ))}
    </ReportRoot>
  );
}
