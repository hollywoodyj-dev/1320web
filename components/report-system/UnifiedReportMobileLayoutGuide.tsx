"use client";

type UnifiedReportMobileLayoutGuideProps = {
  showCloseHint: boolean;
  onDismiss: () => void;
};

/** First-open overlay explaining mobile swipe navigation. */
export function UnifiedReportMobileLayoutGuide({
  showCloseHint,
  onDismiss,
}: UnifiedReportMobileLayoutGuideProps) {
  return (
    <div
      className="unified-report-mobile-layout-guide"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile report navigation guide"
    >
      <div className="unified-report-mobile-layout-guide__backdrop" aria-hidden="true" />

      <div className="unified-report-mobile-layout-guide__zone unified-report-mobile-layout-guide__zone--prev">
        <span>Swipe right — previous page</span>
      </div>

      <div className="unified-report-mobile-layout-guide__zone unified-report-mobile-layout-guide__zone--next">
        <span>Swipe left — next page</span>
      </div>

      {showCloseHint ? (
        <div className="unified-report-mobile-layout-guide__zone unified-report-mobile-layout-guide__zone--close">
          <span>Close (×) — back to Account</span>
        </div>
      ) : null}

      <div className="unified-report-mobile-layout-guide__center">
        <p className="unified-report-mobile-layout-guide__title">How to read your report</p>
        <ul className="unified-report-mobile-layout-guide__list">
          <li>Swipe left to go to the next page</li>
          <li>Swipe right to go to the previous page</li>
          <li>On longer pages, scroll up and down to read the full content</li>
          {showCloseHint ? <li>Tap × top-right to return to your Account</li> : null}
        </ul>
        <button type="button" className="unified-report-mobile-layout-guide__dismiss" onClick={onDismiss}>
          Got it
        </button>
      </div>
    </div>
  );
}

export const UNIFIED_MOBILE_LAYOUT_GUIDE_KEY = "1320-unified-report-mobile-layout-guide-dismissed";

export function readMobileLayoutGuideDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(UNIFIED_MOBILE_LAYOUT_GUIDE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeMobileLayoutGuideDismissed(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(UNIFIED_MOBILE_LAYOUT_GUIDE_KEY, "1");
  } catch {
    // Ignore storage failures in private mode.
  }
}
