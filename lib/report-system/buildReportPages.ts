import { resolvePageAccess } from "@/lib/report-system/report-access";
import { FULL_REPORT_PAGE_MAP } from "@/lib/report-system/report-page-map";
import type { BuiltReportPage, ReportType } from "@/lib/report-system/report-surface";

export function buildReportPages(reportType: ReportType): BuiltReportPage[] {
  const totalPages = FULL_REPORT_PAGE_MAP.length;

  return FULL_REPORT_PAGE_MAP.map((page, index) => ({
    ...page,
    access: resolvePageAccess(reportType, page.pageId),
    pageNumber: index + 1,
    totalPages,
  }));
}

export function buildFullReportPages(): BuiltReportPage[] {
  return buildReportPages("full");
}

export function buildSampleReportPages(): BuiltReportPage[] {
  return buildReportPages("sample");
}
