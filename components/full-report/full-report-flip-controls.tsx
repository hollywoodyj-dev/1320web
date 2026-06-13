"use client";

type FullReportFlipControlsProps = {
  pageIndex: number;
  pageCount: number;
  title: string;
  onPrev: () => void;
  onNext: () => void;
};

export function FullReportFlipControls({
  pageIndex,
  pageCount,
  title,
  onPrev,
  onNext,
}: FullReportFlipControlsProps) {
  const atStart = pageIndex <= 0;
  const atEnd = pageIndex >= pageCount - 1;

  return (
    <div className="fr-flip-controls" aria-label="Report page navigation">
      <button type="button" className="fr-flip-btn" onClick={onPrev} disabled={atStart} aria-label="Previous page">
        ← Prev
      </button>
      <div className="fr-flip-meta">
        <span className="fr-flip-count">
          Page {pageIndex + 1} / {pageCount}
        </span>
        <span className="fr-flip-title">{title}</span>
      </div>
      <button type="button" className="fr-flip-btn fr-flip-btn--next" onClick={onNext} disabled={atEnd} aria-label="Next page">
        Next →
      </button>
    </div>
  );
}
