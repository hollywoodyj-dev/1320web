import { ReportBrandBlock } from "@/components/report-system/ReportBrandBlock";

type ReportHeaderProps = {
  pageNumber?: number;
  totalPages?: number;
};

export function ReportHeader({ pageNumber, totalPages }: ReportHeaderProps) {
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
