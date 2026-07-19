"use client";

import Link from "next/link";
import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import {
  SampleReportFinalCta,
  SampleReportIntro,
  SampleReportReadingGuide,
} from "@/components/report-system/SampleReportChrome";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import { SAMPLE_REPORT_MANTRA } from "@/lib/sample-report-content";
import type { ReportType } from "@/lib/report-system/report-surface";
import "@/styles/sample-report-density-v1.css";

type UnifiedReportWebShellProps = {
  reportType: ReportType;
  data: CanonicalFullReport;
  closeHref?: string;
  banner?: string;
};

export function UnifiedReportWebShell({
  reportType,
  data,
  closeHref,
  banner,
}: UnifiedReportWebShellProps) {
  const isSample = reportType === "sample";

  return (
    <div
      className={[
        "unified-report-web-shell",
        isSample ? "unified-report-web-shell--sample sample-report-viewer" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-report-type={isSample ? "sample" : undefined}
      data-surface={isSample ? "web" : undefined}
    >
      {isSample ? <SampleReportIntro /> : null}

      {/* Sample viewer uses intro + sticky nav; skip sticky banner to reduce preview repetition. */}
      {!isSample && banner ? (
        <div className="unified-report-web-banner" role="note">
          {banner}
        </div>
      ) : null}

      {isSample ? <SampleReportReadingGuide /> : null}

      {closeHref ? (
        <Link href={closeHref} className="unified-report-web-close" aria-label="Close report">
          ×
        </Link>
      ) : null}

      <ReportRenderer reportType={reportType} surface="web" data={data} />

      {isSample ? <SampleReportFinalCta /> : null}
      {isSample ? (
        <p className="sample-report-mantra footer-mantra" role="note">
          {SAMPLE_REPORT_MANTRA}
        </p>
      ) : null}
    </div>
  );
}
