import { BrandSeal } from "@/components/full-report-v2/brand-seal";
import { FULL_REPORT_V2_INNER_PAGE_COUNT } from "@/lib/full-report-v2/types";

type PageHeaderProps = {
  pageIndex: number;
  totalPages?: number;
  centerTitle?: string;
};

export function PageHeader({
  pageIndex,
  totalPages = FULL_REPORT_V2_INNER_PAGE_COUNT,
  centerTitle = "Full 1320 Soul Origin Report",
}: PageHeaderProps) {
  const displayIndex = String(pageIndex).padStart(2, "0");

  return (
    <header className="fr-v2-page-header">
      <div className="fr-v2-brand-block">
        <BrandSeal size={60} className="fr-v2-brand-seal" />
        <div>
          <div className="fr-v2-brand-name">1320 Soul Code System</div>
          <div className="fr-v2-brand-sub">Sacred · Symbolic · Self-Awareness</div>
        </div>
      </div>
      <div className="fr-v2-report-title-top">{centerTitle}</div>
      <div className="fr-v2-page-number">
        <strong>{displayIndex}</strong>
        <span>of {totalPages}</span>
      </div>
    </header>
  );
}
