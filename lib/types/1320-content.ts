import type { IntegratedSoulBlueprint } from "@/lib/types/integrated-soul-blueprint";
import type { SoulMissionSection } from "@/lib/types/s5-soul-mission";

export type Locale = "en" | "zh";

export type LocalizedText = {
  en: string;
  zh?: string;
};

/** Normalized segment entry for UI (v2 shape, adapted from v1 JSON at read time). */
export type SegmentContent = {
  id: string;
  number: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  shortLabel: LocalizedText;
  freeEssence: LocalizedText;
  lockedPreview: LocalizedText;
  reflectionQuestion?: LocalizedText;
  integrationPrompt?: LocalizedText;
  /** True when no JSON entry matched and fallback copy is used. */
  missing?: boolean;
  /** Canonical segment code, e.g. S1-24 or S3-04. */
  segmentCode?: string;
  /** S3 raw value (month × day). */
  s3Raw?: number;
  /** S3 canonical tier code (not raw value). */
  s3Code?: string;
  /** Full report — optional until paid layer renders them. */
  fullEssence?: LocalizedText;
  soulTraits?: LocalizedText[];
  coreGifts?: LocalizedText[];
  shadowPatterns?: LocalizedText[];
  lesson?: LocalizedText;
  direction?: LocalizedText[];
  guidance?: LocalizedText;
  color?: LocalizedText;
  totem?: LocalizedText;
  coreIllusion?: LocalizedText;
  voidChallenge?: LocalizedText;
  voidPower?: LocalizedText;
  awakeningPath?: LocalizedText;
  practice?: LocalizedText;
  relationshipPattern?: LocalizedText;
  karmicLoop?: LocalizedText;
  mirrorLesson?: LocalizedText;
  expressionPattern?: LocalizedText;
  growthEdge?: LocalizedText;
  /** S5 Soul Mission — deterministic seed assembly (premium). */
  soulMissionSections?: SoulMissionSection[];
  assemblySignature?: string;
  s5SeedVersion?: string;
};

export type Get1320ContentInput = {
  s1: number;
  s3: number;
  s2: number;
  s0: number;
  locale?: Locale;
};

/** Product tier for v2 content gating (see NOVA report_tiers). */
export type ReportProductTier = "free" | "full" | "advanced";

export type Get1320ContentOptions = {
  birthDate?: string;
  /** v2 only — defaults to `full` when flag enabled. */
  reportTier?: ReportProductTier;
};

export type CodeDisplay = {
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
  s1Code: string;
  s3Code: string;
  s3Title: string;
  s2Code: string;
  s0Code: string;
  codeString: string;
  compactCode: string;
  /** v2 extended chain (when v2 pipeline active). */
  s3?: number;
  s4?: number;
  s5?: number;
  s6?: number;
  s7?: number;
  s8?: number;
  s9?: number;
  s4Code?: string;
  s5Code?: string;
  s6Code?: string;
  s7Code?: string;
  s8Code?: string;
  s9Code?: string;
  fullCodeString?: string;
  fullCompactCode?: string;
};

export type FreeResultCopy = {
  pageTitle: LocalizedText;
  pageSubtitle: LocalizedText;
  boundaryNote: LocalizedText;
  integratedTitle: LocalizedText;
  integratedLead: LocalizedText;
  reflectionTitle: LocalizedText;
  missingEntryFallback: LocalizedText;
  lockedTeaserLabel: LocalizedText;
};

export type Get1320ContentResult = {
  locale: Locale;
  codes: CodeDisplay;
  combinationSignature: string;
  s1Content: SegmentContent;
  s3Content: SegmentContent;
  s2Content: SegmentContent;
  s0Content: SegmentContent;
  /** Shadow Patterns premium module — not the Integrated Soul Blueprint synthesis layer. */
  s4Content: SegmentContent | null;
  s5Content: SegmentContent | null;
  s6Content: SegmentContent | null;
  /** v2 Full tier (S7) — null when tier-gated or v1 pipeline. */
  s7Content?: SegmentContent | null;
  /** v2 Advanced tier (S8–S9). */
  s8Content?: SegmentContent | null;
  s9Content?: SegmentContent | null;
  integratedSoulBlueprint: IntegratedSoulBlueprint | null;
  /** Short synthesis paragraph for free result — derived from `integratedSoulBlueprint`. */
  integratedFreeSummary: LocalizedText;
  reflectionQuestion: LocalizedText;
  segmentReflections: Record<"s1" | "s3" | "s2" | "s0", LocalizedText>;
  synthesisError?: string;
  s5AssemblyError?: string;
  /** `v2` when `USE_1320_V2_CONTENT` is enabled. */
  contentPipeline?: "v1" | "v2";
  reportTier?: ReportProductTier;
  freeResultCopy: FreeResultCopy;
};

/** Raw v1 record shape from founder JSON (loose). */
export type V1Record = Record<string, unknown>;

export type S3TierRecord = V1Record & {
  range?: [number, number] | number[];
  min?: number;
  max?: number;
};
