import type { Metadata } from "next";
import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import { buildCanonicalSampleReport } from "@/lib/canonical-report";
import type { ReportType } from "@/lib/report-system/report-surface";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Report System Print Preview",
  description: "PDF HTML surface for unified report renderer.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function pickParam(value: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function parseReportType(value: string): ReportType {
  return value === "full" ? "full" : "sample";
}

export default async function ReportSystemPrintPreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const reportType = parseReportType(pickParam(params.type, "full"));
  const data = buildCanonicalSampleReport();

  return <ReportRenderer reportType={reportType} surface="pdf" data={data} />;
}
