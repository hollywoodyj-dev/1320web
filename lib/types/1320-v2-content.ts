import type { SoulCodeResult } from "@/lib/calculate1320Code";
import type { Locale, SegmentContent } from "@/lib/types/1320-content";

export type V2ModuleId = "S0" | "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7" | "S8" | "S9";

export type V2BlockSpec = {
  key: string;
  title: string;
  titleZh?: string;
};

export type Get1320V2ContentResult = {
  locale: Locale;
  codes: SoulCodeResult;
  s0Content: SegmentContent;
  s1Content: SegmentContent;
  s2Content: SegmentContent;
  s3Content: SegmentContent;
  s4Content: SegmentContent;
  s5Content: SegmentContent;
  s6Content: SegmentContent;
  s7Content: SegmentContent;
  s8Content: SegmentContent;
  s9Content: SegmentContent;
  /** Module codes that had no database row (should not occur for valid dates). */
  missingCodes: string[];
};
