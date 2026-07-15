import { BrandSeal } from "@/components/full-report-v2/brand-seal";
import { ReportBrandBlock } from "@/components/report-system/ReportBrandBlock";
import type { ReportSurface } from "@/lib/report-system/report-surface";

const MOBILE_BRAND_TITLE = "1320 Soul Code System";
const MOBILE_BRAND_SUBTITLE = "Sacred · Symbolic · Self-Awareness";

type ReportHeaderProps = {
  pageNumber?: number;
  totalPages?: number;
  surface?: ReportSurface;
};

export function ReportHeader({ pageNumber, totalPages, surface }: ReportHeaderProps) {
  if (surface === "mobile") {
    return (
      <header className="report-header report-header--mobile">
        <BrandSeal size={40} className="report-mobile-header-seal" aria-hidden="true" />
        <div className="report-mobile-header-brand">
          <div className="report-mobile-header-title">{MOBILE_BRAND_TITLE}</div>
          <div className="report-mobile-header-subtitle">{MOBILE_BRAND_SUBTITLE}</div>
        </div>
        {pageNumber && totalPages ? (
          <div className="page-meta report-mobile-header-meta">
            <span>Full Report</span>
            <strong>
              {pageNumber} / {totalPages}
            </strong>
          </div>
        ) : (
          <div className="report-mobile-header-meta-spacer" aria-hidden="true" />
        )}
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
