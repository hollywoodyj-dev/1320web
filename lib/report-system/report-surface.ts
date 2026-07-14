/** Unified report renderer — surface and type definitions. */

import type { CanonicalFullReport } from "@/lib/canonical-report/types";

export type ReportType = "sample" | "full";

export type ReportSurface = "web" | "mobile" | "pdf";

export type ReportSegmentCode = "S0" | "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7" | "S8" | "S9";

export type ReportPageType =
  | "cover"
  | "overview"
  | "segment"
  | "integration"
  | "practice"
  | "journal"
  | "closing"
  | "disclaimer";

export type ReportAccessLevel = "open" | "locked-preview";

export type ReportPageDef = {
  pageId: string;
  pageType: ReportPageType;
  title: string;
  segment?: ReportSegmentCode;
  segments?: ReportSegmentCode[];
};

export type ReportRendererProps = {
  reportType: ReportType;
  surface: ReportSurface;
  data: CanonicalFullReport;
};

export type BuiltReportPage = ReportPageDef & {
  access: ReportAccessLevel;
  pageNumber: number;
  totalPages: number;
};

export type ReportSegmentView = {
  code: ReportSegmentCode;
  segmentName: string;
  displayName: string;
  subtitle: string;
  commercialBlocks: Record<string, string>;
  contentLayer: "commercial" | "symbolic";
};

export const COMMERCIAL_BLOCK_LABELS = {
  opening_essence: "Opening Essence",
  how_this_may_show_up: "How This May Show Up",
  core_gift: "Core Gift",
  growth_edge: "Growth Edge",
  integration_key: "Integration Key",
  one_week_practice: "One-Week Practice",
  wisewave_reflection: "Wisewave Reflection",
} as const;

export const REPORT_SEGMENT_NAMES: Record<ReportSegmentCode, string> = {
  S1: "Soul Origin",
  S3: "Soul Vibration",
  S2: "Soul Mirror",
  S0: "Void Gate",
  S4: "Core Shadow Pattern",
  S5: "Soul Mission",
  S6: "Value & Receiving",
  S7: "Soul Sovereignty",
  S8: "Soul Contribution",
  S9: "Return to Source",
};
