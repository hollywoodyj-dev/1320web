import type { SegmentId } from "@/lib/segments";

export type ReportSectionId =
  | "overview"
  | "s1"
  | "s3"
  | "s2"
  | "s0"
  | "integration"
  | "reflection";

export type ReportNavItem = {
  id: ReportSectionId;
  label: string;
  short?: string;
};

export const REPORT_NAV: ReportNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "s1", label: "S1 Origin Frequency", short: "S1" },
  { id: "s3", label: "S3 Vibration Tier", short: "S3" },
  { id: "s2", label: "S2 Mirror Path", short: "S2" },
  { id: "s0", label: "S0 Void Gate", short: "S0" },
  { id: "integration", label: "Integration" },
  { id: "reflection", label: "Reflection Journal" },
];

export function segmentNavId(segmentId: SegmentId): ReportSectionId {
  return segmentId;
}
