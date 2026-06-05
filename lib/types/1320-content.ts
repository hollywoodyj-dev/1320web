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
  /** S3 raw value (month × day). */
  s3Raw?: number;
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
  awakeningPath?: LocalizedText;
  practice?: LocalizedText;
  relationshipPattern?: LocalizedText;
  mirrorLesson?: LocalizedText;
  expressionPattern?: LocalizedText;
  growthEdge?: LocalizedText;
};

export type Get1320ContentInput = {
  s1: number;
  s3: number;
  s2: number;
  s0: number;
  locale?: Locale;
};

export type CodeDisplay = {
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
  codeString: string;
  compactCode: string;
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
  s1Content: SegmentContent;
  s3Content: SegmentContent;
  s2Content: SegmentContent;
  s0Content: SegmentContent;
  s4Content: SegmentContent | null;
  s5Content: SegmentContent | null;
  s6Content: SegmentContent | null;
  integratedFreeSummary: LocalizedText;
  reflectionQuestion: LocalizedText;
  freeResultCopy: FreeResultCopy;
};

/** Raw v1 record shape from founder JSON (loose). */
export type V1Record = Record<string, unknown>;

export type S3TierRecord = V1Record & {
  range?: [number, number] | number[];
  min?: number;
  max?: number;
};
