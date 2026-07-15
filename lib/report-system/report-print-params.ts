import type { ReportType } from "@/lib/report-system/report-surface";

export function parseReportTypeParam(value: string | undefined): ReportType {
  return value === "sample" ? "sample" : "full";
}

export function buildSamplePrintSearchParams(reportType: ReportType): string {
  return reportType === "sample" ? "type=sample" : "type=full";
}

export function buildEntitledReportPrintPath(reportId: string): string {
  return `/report/${encodeURIComponent(reportId)}/print`;
}
