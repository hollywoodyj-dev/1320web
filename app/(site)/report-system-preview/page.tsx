import type { Metadata } from "next";
import { ReportRenderer } from "@/components/report-system/ReportRenderer";
import { buildCanonicalSampleReport } from "@/lib/canonical-report";
import type { ReportSurface, ReportType } from "@/lib/report-system/report-surface";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Report System Preview",
  description: "Unified report renderer preview — web, mobile, and PDF surfaces.",
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

function parseSurface(value: string): ReportSurface {
  if (value === "mobile" || value === "pdf") return value;
  return "web";
}

export default async function ReportSystemPreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const reportType = parseReportType(pickParam(params.type, "sample"));
  const surface = parseSurface(pickParam(params.surface, "web"));
  const data = buildCanonicalSampleReport();

  return (
    <div className="page-shell-inner page-shell--report-system-preview">
      <ReportRenderer reportType={reportType} surface={surface} data={data} />
    </div>
  );
}
