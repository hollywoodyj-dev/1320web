import type { Metadata } from "next";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { buildReportViewModel } from "@/lib/report/build-report-view-model";
import { get1320Content } from "@/lib/get1320Content";
import { SAMPLE_REPORT_META } from "@/lib/report/report-static-content";

export const metadata: Metadata = {
  title: SAMPLE_REPORT_META.title,
  description: SAMPLE_REPORT_META.description,
};

/** Canonical sample: 1980-05-22 → S1-18 / S3-110 / S2-27 / S0-07 */
export default function SampleReportPage() {
  const content = get1320Content(
    {
      s1: 18,
      s3: 110,
      s2: 27,
      s0: 7,
      locale: "en",
    },
    { birthDate: "1980-05-22" },
  );

  const viewModel = buildReportViewModel(content, {
    mode: "full",
    variant: "sample",
  });

  return (
    <div className="report-page">
      <ReportDashboard viewModel={viewModel} analyticsEvent="sample_report_view" />
    </div>
  );
}
