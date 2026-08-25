import type { Metadata } from "next";
import { UnifiedReportWebShell } from "@/components/report-system/UnifiedReportWebShell";
import { SampleReportViewTracker } from "@/components/funnel/sample-report-view-tracker";
import { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
import { SAMPLE_REPORT_META } from "@/lib/sample-report-content";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: SAMPLE_REPORT_META.title,
  description: SAMPLE_REPORT_META.description,
  alternates: { canonical: "/full-report-v2" },
  robots: { index: true, follow: true },
};

/** Sample report is static product content (Mira Solen preview). No request cookies/searchParams. */
export const dynamic = "force-static";

export default function FullReportV2Page() {
  const report = buildCanonicalReportFromPreview(null, {
    name: "Mira Solen",
    birth_date_display: "May 22, 1980",
  });

  return (
    <>
      <SampleReportViewTracker />
      <UnifiedReportWebShell reportType="sample" data={report} />
    </>
  );
}
