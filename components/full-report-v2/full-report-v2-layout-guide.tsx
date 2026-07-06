"use client";

type FullReportV2LayoutGuideProps = {
  closeLabel: string;
  onDismiss: () => void;
};

/** First-open overlay explaining report navigation zones. */
export function FullReportV2LayoutGuide({ closeLabel, onDismiss }: FullReportV2LayoutGuideProps) {
  return (
    <div className="fr-v2-layout-guide" role="dialog" aria-modal="true" aria-label="Report navigation guide">
      <div className="fr-v2-layout-guide__backdrop" aria-hidden="true" />

      <div className="fr-v2-layout-guide__zone fr-v2-layout-guide__zone--menu">
        <span>Page menu — hover the top edge</span>
      </div>

      <div className="fr-v2-layout-guide__zone fr-v2-layout-guide__zone--close">
        <span>{closeLabel}</span>
      </div>

      <div className="fr-v2-layout-guide__zone fr-v2-layout-guide__zone--prev">
        <span>← Previous page</span>
      </div>

      <div className="fr-v2-layout-guide__zone fr-v2-layout-guide__zone--next">
        <span>Next page →</span>
      </div>

      <div className="fr-v2-layout-guide__center">
        <p className="fr-v2-layout-guide__title">How to read your report</p>
        <ul className="fr-v2-layout-guide__list">
          <li>Click the left side for the previous page</li>
          <li>Click the right side for the next page</li>
          <li>Hover the top edge to jump between sections</li>
        </ul>
        <button type="button" className="fr-v2-layout-guide__dismiss" onClick={onDismiss}>
          Got it
        </button>
      </div>
    </div>
  );
}
