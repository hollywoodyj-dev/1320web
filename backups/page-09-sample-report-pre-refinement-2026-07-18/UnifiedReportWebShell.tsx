"use client";

import Link from "next/link";
import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { ReportType } from "@/lib/report-system/report-surface";

type UnifiedReportWebShellProps = {
  reportType: ReportType;
  data: CanonicalFullReport;
  closeHref?: string;
  banner?: string;
};

export function UnifiedReportWebShell({
  reportType,
  data,
  closeHref,
  banner,
}: UnifiedReportWebShellProps) {
  return (
    <div className="unified-report-web-shell">
      {banner ? (
        <div className="unified-report-web-banner" role="note">
          {banner}
        </div>
      ) : null}

      {closeHref ? (
        <Link href={closeHref} className="unified-report-web-close" aria-label="Close report">
          ×
        </Link>
      ) : null}

      <ReportRenderer reportType={reportType} surface="web" data={data} />
    </div>
  );
}
