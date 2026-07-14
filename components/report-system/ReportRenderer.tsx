"use client";

import { useMemo, useState } from "react";
import { LockedPreviewBlock } from "@/components/report-system/LockedPreviewBlock";
import { ReportDisclaimerPage } from "@/components/report-system/ReportDisclaimerPage";
import { ReportHero } from "@/components/report-system/ReportHero";
import { ReportIntegrationPage } from "@/components/report-system/ReportIntegrationPage";
import { ReportJournalPage } from "@/components/report-system/ReportJournalPage";
import { ReportNavigation } from "@/components/report-system/ReportNavigation";
import { ReportPage } from "@/components/report-system/ReportPage";
import { ReportPracticePage } from "@/components/report-system/ReportPracticePage";
import { ReportRoot } from "@/components/report-system/ReportRoot";
import { ReportSegmentGrid } from "@/components/report-system/ReportSegmentGrid";
import { ReportSegmentPage } from "@/components/report-system/ReportSegmentPage";
import { ReportInsightCard } from "@/components/report-system/ReportInsightCard";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { LOCKED_PREVIEW_COPY } from "@/lib/report-system/report-access";
import { buildReportPages } from "@/lib/report-system/buildReportPages";
import type { BuiltReportPage, ReportRendererProps } from "@/lib/report-system/report-surface";

function renderCoverPage(data: CanonicalFullReport) {
  const { client, calculation } = data.payload;

  return (
    <>
      <ReportHero
        eyebrow="1320 Soulcode"
        title="Your Soul Blueprint"
        description={`Prepared for ${client.name} · ${client.birth_date_display}`}
      />
      <ReportSegmentGrid>
        <ReportInsightCard
          kicker="Signature"
          title="Four-Part Foundation"
          body={calculation.combination_signature}
          icon="✦"
        />
      </ReportSegmentGrid>
    </>
  );
}

function renderOverviewPage(data: CanonicalFullReport) {
  const { calculation } = data.payload;
  const layers = [
    { code: "S1", title: calculation.s1.title, label: calculation.s1.code },
    { code: "S3", title: calculation.s3.title, label: calculation.s3.code },
    { code: "S2", title: calculation.s2.title, label: calculation.s2.code },
    { code: "S0", title: calculation.s0.title, label: calculation.s0.code },
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
            key={layer.code}
            kicker={layer.code}
            title={layer.title}
            body={layer.label}
          />
        ))}
      </ReportSegmentGrid>
    </>
  );
}

function renderPageBody(page: BuiltReportPage, data: CanonicalFullReport) {
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
      return renderCoverPage(data);
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

export function ReportRenderer({ reportType, surface, data }: ReportRendererProps) {
  const pages = useMemo(() => buildReportPages(reportType), [reportType]);
  const [mobileIndex, setMobileIndex] = useState(0);

  const activeMobilePage = pages[mobileIndex] ?? pages[0];

  if (surface === "mobile") {
    return (
      <ReportRoot reportType={reportType} surface={surface}>
        <ReportPage
          pageId={activeMobilePage.pageId}
          pageNumber={activeMobilePage.pageNumber}
          totalPages={activeMobilePage.totalPages}
        >
          {renderPageBody(activeMobilePage, data)}
        </ReportPage>
        <ReportNavigation
          pageNumber={activeMobilePage.pageNumber}
          totalPages={activeMobilePage.totalPages}
          onPrevious={() => setMobileIndex((index) => Math.max(0, index - 1))}
          onNext={() => setMobileIndex((index) => Math.min(pages.length - 1, index + 1))}
          disablePrevious={mobileIndex <= 0}
          disableNext={mobileIndex >= pages.length - 1}
        />
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
          {renderPageBody(page, data)}
        </ReportPage>
      ))}
    </ReportRoot>
  );
}
