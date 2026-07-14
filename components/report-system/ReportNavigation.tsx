type ReportNavigationProps = {
  pageNumber: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
};

export function ReportNavigation({
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}: ReportNavigationProps) {
  const prevLabel = pageNumber > 1 ? pageNumber - 1 : "—";
  const nextLabel = pageNumber < totalPages ? pageNumber + 1 : "—";

  return (
    <nav className="report-nav" aria-label="Report navigation">
      <button
        type="button"
        className="report-nav-button"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        ‹ Prev {prevLabel}
      </button>
      <button
        type="button"
        className="report-nav-button report-nav-button--primary"
        onClick={onNext}
        disabled={disableNext}
      >
        Next {nextLabel} ›
      </button>
    </nav>
  );
}
