"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  readMobileLayoutGuideDismissed,
  UnifiedReportMobileLayoutGuide,
  writeMobileLayoutGuideDismissed,
} from "@/components/report-system/UnifiedReportMobileLayoutGuide";
import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { ReportType } from "@/lib/report-system/report-surface";

type UnifiedReportMobileShellProps = {
  reportType: ReportType;
  data: CanonicalFullReport;
  closeHref?: string;
  banner?: string;
};

export function UnifiedReportMobileShell({
  reportType,
  data,
  closeHref,
  banner,
}: UnifiedReportMobileShellProps) {
  const [showLayoutGuide, setShowLayoutGuide] = useState(false);

  const dismissLayoutGuide = useCallback(() => {
    setShowLayoutGuide(false);
    writeMobileLayoutGuideDismissed();
  }, []);

  useEffect(() => {
    setShowLayoutGuide(!readMobileLayoutGuideDismissed());
  }, []);

  useEffect(() => {
    if (!showLayoutGuide) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissLayoutGuide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLayoutGuide, dismissLayoutGuide]);

  return (
    <div className="unified-report-mobile-shell">
      {showLayoutGuide ? (
        <UnifiedReportMobileLayoutGuide
          showCloseHint={Boolean(closeHref)}
          onDismiss={dismissLayoutGuide}
        />
      ) : null}

      {banner ? (
        <div className="unified-report-mobile-banner" role="note">
          {banner}
        </div>
      ) : null}

      {closeHref ? (
        <Link href={closeHref} className="unified-report-mobile-close" aria-label="Close report">
          ×
        </Link>
      ) : null}

      <ReportRenderer reportType={reportType} surface="mobile" data={data} />
    </div>
  );
}
