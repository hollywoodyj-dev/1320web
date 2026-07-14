import type { Metadata } from "next";
import { UnifiedReportPrintDocument } from "@/components/report-system/UnifiedReportPrintDocument";
import {
  parseReportTypeParam,
  resolveSamplePrintReport,
} from "@/lib/report-system/resolve-print-report";
import "@/styles/report-system/index.css";

export const metadata: Metadata = {
  title: "Sample Report · PDF",
  description: "Sample Soul Blueprint report PDF HTML surface.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function pickParam(value: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

export default async function SampleReportPrintPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const reportType = parseReportTypeParam(pickParam(params.type, "full"));
  const data = await resolveSamplePrintReport(params);

  return <UnifiedReportPrintDocument reportType={reportType} data={data} />;
}
