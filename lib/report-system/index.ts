export { buildCanonicalReport, buildCanonicalSampleReport } from "@/lib/canonical-report";
export {
  buildFullReportPages,
  buildReportPages,
  buildSampleReportPages,
} from "@/lib/report-system/buildReportPages";
export {
  LOCKED_PREVIEW_COPY,
  SAMPLE_REPORT_ACCESS,
  resolvePageAccess,
} from "@/lib/report-system/report-access";
export {
  FULL_REPORT_PAGE_COUNT,
  FULL_REPORT_PAGE_MAP,
} from "@/lib/report-system/report-page-map";
export {
  COMMERCIAL_BLOCK_LABELS,
  REPORT_SEGMENT_NAMES,
  type BuiltReportPage,
  type ReportAccessLevel,
  type ReportPageDef,
  type ReportPageType,
  type ReportRendererProps,
  type ReportSegmentCode,
  type ReportSegmentView,
  type ReportSurface,
  type ReportType,
} from "@/lib/report-system/report-surface";
export {
  isLikelyTemplateLeak,
  listCommercialInsightCards,
  normalizeReportSegment,
  sanitizeReportText,
} from "@/lib/report-system/normalizeReportContent";
export { buildCanonicalReportFromPreview } from "@/lib/report-system/buildCanonicalReportFromPreview";
