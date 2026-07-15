import { getSiteUrl, resolveReportPrintBaseUrl } from "@/lib/platform-config";
import type { ReportType } from "@/lib/report-system/report-surface";
import { buildSamplePrintSearchParams } from "@/lib/report-system/resolve-print-report";

export function buildSampleReportPrintUrl(
  reportType: ReportType = "full",
  baseUrl: string = getSiteUrl(),
): string {
  const params = buildSamplePrintSearchParams(reportType);
  return `${baseUrl.replace(/\/$/, "")}/sample-report/print?${params}`;
}

export function buildEntitledReportPrintUrl(
  reportId: string,
  baseUrl: string = getSiteUrl(),
): string {
  return `${baseUrl.replace(/\/$/, "")}/report/${encodeURIComponent(reportId)}/print`;
}

export function buildEntitledReportPrintPath(reportId: string): string {
  return `/report/${encodeURIComponent(reportId)}/print`;
}

export function buildEntitledReportPrintUrlFromRequest(
  reportId: string,
  request: Request,
): string {
  return buildEntitledReportPrintUrl(reportId, resolveReportPrintBaseUrl(request));
}

export function buildSampleReportPrintUrlFromRequest(
  reportType: ReportType,
  request: Request,
): string {
  return buildSampleReportPrintUrl(reportType, resolveReportPrintBaseUrl(request));
}

export function buildReportSystemPreviewPrintUrl(
  reportType: ReportType = "full",
  baseUrl: string = getSiteUrl(),
): string {
  const params = buildSamplePrintSearchParams(reportType);
  return `${baseUrl.replace(/\/$/, "")}/report-system-preview/print?${params}`;
}
