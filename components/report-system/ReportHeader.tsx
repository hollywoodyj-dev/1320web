type ReportHeaderProps = {
  pageNumber?: number;
  totalPages?: number;
};

export function ReportHeader({ pageNumber, totalPages }: ReportHeaderProps) {
  return (
    <header className="report-header">
      <div className="brand-block">
        <div className="brand-seal" aria-hidden="true">
          ✦
        </div>
        <div>
          <div className="brand-name">1320 Soulcode</div>
          <div className="brand-subtitle">Soul Blueprint Report</div>
        </div>
      </div>

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
