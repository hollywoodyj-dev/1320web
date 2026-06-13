import type { Metadata } from "next";
import { FullReportViewer } from "@/components/full-report/full-report-viewer";
import { get1320Content } from "@/lib/get1320Content";
import { SAMPLE_REPORT_META } from "@/lib/report/report-static-content";
import { calculate1320Code } from "@/lib/calculate1320Code";

export const metadata: Metadata = {
  title: SAMPLE_REPORT_META.title,
  description: SAMPLE_REPORT_META.description,
};

/** Canonical sample: 1988-07-14 → S1-26 / S3-03 / S2-21 / S0-18 (fictional preview date). */
export default function SampleReportPage() {
  const sample = calculate1320Code(1988, 7, 14);

  const content = get1320Content(
    {
      s1: sample.s1,
      s3: sample.s3Raw,
      s2: sample.s2,
      s0: sample.s0,
      locale: "en",
    },
    { birthDate: SAMPLE_REPORT_META.birthDate, reportTier: "full" },
  );

  return (
    <div className="full-report-page">
      <FullReportViewer
        content={content}
        options={{
          birthDate: SAMPLE_REPORT_META.birthDate,
          preparedFor: "Sample Reader",
          fictionBanner: SAMPLE_REPORT_META.fictionBanner,
        }}
        analyticsEvent="sample_report_view"
      />
    </div>
  );
}
