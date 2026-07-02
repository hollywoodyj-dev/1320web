/**
 * Canonical Full Report — one product, two presentations (Wisewave 2/4).
 * Desktop and mobile renderers consume the same resolved canonical object.
 */

import type { FullReportV2InputClient, FullReportV2Payload } from "@/lib/full-report-v2/types";

export const CANONICAL_REPORT_SCHEMA_VERSION = "canonical-report-v1" as const;

/** How a field participates in parity and product governance. */
export type CanonicalFieldKind =
  | "required"
  | "optional"
  | "relocatable"
  | "decorative"
  | "deprecated";

/** Wisewave implementation priority bands for parity fixes. */
export type ParityFixPriority = 1 | 2 | 3 | 4;

export type CanonicalSectionId =
  | "cover"
  | "opening"
  | "dimensions"
  | "signature"
  | "s1"
  | "s3"
  | "s2"
  | "s0"
  | "integrated_blueprint"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9"
  | "practice"
  | "journal"
  | "closing"
  | "disclaimer";

export type CanonicalFieldDef = {
  /** Dot path into FullReportV2Payload (e.g. `modules.s1.code`). */
  path: string;
  kind: CanonicalFieldKind;
  description: string;
};

export type CanonicalSectionDef = {
  id: CanonicalSectionId;
  label: string;
  /** Desktop full-report-v2 page ids (see page-registry). */
  desktopPageIds: string[];
  /** Mobile swipe page ids (see mobile-report-v2-viewer). */
  mobilePageIds: string[];
  fixPriority: ParityFixPriority;
  /** Payload fields that must be present for this section to be considered complete. */
  payloadFields: CanonicalFieldDef[];
};

export type CanonicalSectionAudit = {
  id: CanonicalSectionId;
  label: string;
  fixPriority: ParityFixPriority;
  complete: boolean;
  missingRequired: string[];
  missingOptional: string[];
};

export type CanonicalFullReport = {
  schemaVersion: typeof CANONICAL_REPORT_SCHEMA_VERSION;
  /** Single resolved content object — source of truth for both renderers. */
  payload: FullReportV2Payload;
  birthDate: string;
  sections: CanonicalSectionAudit[];
};

export type BuildCanonicalReportInput = FullReportV2InputClient;

export type ParityGap = {
  sectionId: CanonicalSectionId;
  fixPriority: ParityFixPriority;
  field: string;
  desktopValue: string;
  reason: "missing_on_mobile" | "missing_on_desktop" | "missing_in_payload";
};

export type ParityReport = {
  birthDate: string;
  contentParityGaps: ParityGap[];
  experienceParityGaps: ParityGap[];
  /** Summary counts grouped by fix priority. */
  gapsByPriority: Record<ParityFixPriority, number>;
};
