"use client";

import { BrandSeal } from "@/components/full-report-v2/brand-seal";
import { ReportBrandBlock } from "@/components/report-system/ReportBrandBlock";
import { useReportSurface } from "@/components/report-system/report-surface-context";

type ReportHeaderProps = {
  pageNumber?: number;
  totalPages?: number;
};

export function ReportHeader({ pageNumber, totalPages }: ReportHeaderProps) {
  const surface = useReportSurface();

  if (surface === "mobile") {
    return (
      <header className="report-header report-header--mobile">
        <div className="report-mobile-header-leading">
          <BrandSeal size={34} className="report-mobile-header-seal" aria-hidden="true" />
          <div className="report-mobile-header-brand">
            <p className="report-mobile-header-title">1320 Soul Code System</p>
            <p className="report-mobile-header-subtitle">Sacred · Symbolic · Self-Awareness</p>
          </div>
        </div>

        {pageNumber && totalPages ? (
          <div className="report-mobile-header-meta" aria-label={`Page ${pageNumber} of ${totalPages}`}>
            <strong>
              {pageNumber}/{totalPages}
            </strong>
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header className="report-header">
      <ReportBrandBlock variant="header" />

      {pageNumber && totalPages ? (
        <div className="page-meta">
          <span>Full Report</span>
          <strong>
            {pageNumber} / {totalPages}
          </strong>
        </div>
      ) : null}
    </header>
  );
}
