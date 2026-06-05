import type { Get1320ContentResult, Locale, LocalizedText, SegmentContent } from "@/lib/types/1320-content";
import { pickLocalized } from "@/lib/getLocalized";
import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";
import { formatSegmentCode, getSegment, type SegmentId } from "@/lib/segments";
import {
  INTEGRATION_PRACTICES,
  REFLECTION_JOURNAL_PROMPTS,
  REPORT_FINAL_CTA,
  SAMPLE_REPORT_META,
} from "@/lib/report/report-static-content";

export type ReportMode = "full" | "free";

export type ReportField = {
  label: string;
  value: string;
};

export type ReportOverviewCard = {
  segmentId: SegmentId;
  code: string;
  title: string;
  shortLabel: string;
  essence: string;
};

export type ReportModuleViewModel = {
  segmentId: SegmentId;
  codeLabel: string;
  archetype: string;
  shortLabel: string;
  /** Archetype card art in `public/` (S1/S2/S3/S0 card packs). */
  cardImageUrl?: string;
  fields: ReportField[];
  reflectionQuestion?: string;
  showLocked: boolean;
  lockedTeaser?: string;
};

export type ReportViewModel = {
  locale: Locale;
  mode: ReportMode;
  headerTitle: string;
  headerSubtitle: string;
  codeString: string;
  boundaryNote: string;
  fictionBanner?: string;
  integratedTitle: string;
  integratedLead: string;
  integratedSummary: string;
  overviewCards: ReportOverviewCard[];
  modules: ReportModuleViewModel[];
  reflectionQuestion: string;
  journalPrompts: string[];
  practices: typeof INTEGRATION_PRACTICES;
  finalCta: typeof REPORT_FINAL_CTA;
};

function field(
  locale: Locale,
  label: string,
  text: LocalizedText | undefined,
): ReportField | null {
  const value = text ? pickLocalized(text, locale) : "";
  if (!value.trim()) return null;
  return { label, value };
}

function joinFields(locale: Locale, label: string, items: LocalizedText[] | undefined): ReportField | null {
  if (!items?.length) return null;
  const value = items
    .map((item) => pickLocalized(item, locale))
    .filter(Boolean)
    .join(" ");
  if (!value.trim()) return null;
  return { label, value };
}

const PLACEHOLDER_SNIPPETS = [
  "being prepared for the full report",
  "full report expands your relational mirror",
  "full report expands this dimension",
];

function isPlaceholderCopy(value: string): boolean {
  const lower = value.trim().toLowerCase();
  return PLACEHOLDER_SNIPPETS.some((snippet) => lower.includes(snippet));
}

/** Drop empty, duplicate-overview, title-echo, and generic placeholder lines from full modules. */
function polishReportFields(
  fields: ReportField[],
  options?: { archetype?: string },
): ReportField[] {
  const overview = fields.find((f) => f.label === "Overview")?.value.trim().toLowerCase();
  const archetype = options?.archetype?.trim().toLowerCase();

  return dedupeFields(
    fields.filter((f) => {
      const value = f.value.trim();
      if (!value) return false;
      if (isPlaceholderCopy(value)) return false;
      const lower = value.toLowerCase();
      if (archetype && lower === archetype) return false;
      if (overview && f.label !== "Overview" && lower === overview) return false;
      return true;
    }),
  );
}

function buildS1Fields(
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.fullEssence ?? segment.freeEssence),
    joinFields(locale, "Soul Traits", segment.soulTraits),
    joinFields(locale, "Core Gifts", segment.coreGifts),
    joinFields(locale, "Shadow Pattern", segment.shadowPatterns),
    field(locale, "Soul Lesson", segment.lesson),
    joinFields(locale, "Direction", segment.direction),
    field(locale, "Color Frequency", segment.color),
    field(locale, "Totem", segment.totem),
    field(locale, "Integration Guidance", segment.guidance),
  ].filter((f): f is ReportField => Boolean(f));

  if (mode === "full") return polishReportFields(all, { archetype });
  return all.filter((f) => f.label === "Overview");
}

function buildS3Fields(
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.fullEssence ?? segment.freeEssence),
    field(locale, "Core Strengths", segment.expressionPattern),
    field(locale, "Growth Edge", segment.growthEdge),
    field(locale, "Integration Guidance", segment.guidance ?? segment.integrationPrompt),
  ].filter((f): f is ReportField => Boolean(f));

  if (mode === "full") return polishReportFields(all, { archetype });
  return all.filter((f) => f.label === "Overview");
}

function buildS2Fields(
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.fullEssence ?? segment.freeEssence),
    field(locale, "Karmic Loop", segment.karmicLoop),
    field(locale, "Mirror Lesson", segment.mirrorLesson),
    field(locale, "Healing Path", segment.integrationPrompt),
    field(locale, "Integration Guidance", segment.guidance),
  ].filter((f): f is ReportField => Boolean(f));

  if (mode === "full") return polishReportFields(all, { archetype });
  return all.filter((f) => f.label === "Overview");
}

function buildS0Fields(
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.freeEssence),
    field(locale, "Core Illusion", segment.coreIllusion),
    field(locale, "Void Challenge", segment.voidChallenge),
    field(locale, "Void Power", segment.voidPower),
    field(locale, "Awakening Path", segment.awakeningPath),
    field(locale, "Integration Guidance", segment.guidance),
  ].filter((f): f is ReportField => Boolean(f));

  if (mode === "full") return polishReportFields(all, { archetype });
  return all.filter((f) => f.label === "Overview");
}

function dedupeFields(fields: ReportField[]): ReportField[] {
  const seen = new Set<string>();
  return fields.filter((f) => {
    const key = `${f.label}:${f.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildModuleFields(
  segmentId: SegmentId,
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  switch (segmentId) {
    case "s1":
      return buildS1Fields(segment, locale, mode, archetype);
    case "s3":
      return buildS3Fields(segment, locale, mode, archetype);
    case "s2":
      return buildS2Fields(segment, locale, mode, archetype);
    case "s0":
      return buildS0Fields(segment, locale, mode, archetype);
    default:
      return [];
  }
}

export function buildReportViewModel(
  content: Get1320ContentResult,
  options: {
    mode: ReportMode;
    variant: "sample" | "result";
    birthDateLabel?: string;
  },
): ReportViewModel {
  const { locale } = content;
  const { mode, variant } = options;
  const segments: SegmentId[] = ["s1", "s3", "s2", "s0"];
  const segmentContent = {
    s1: content.s1Content,
    s3: content.s3Content,
    s2: content.s2Content,
    s0: content.s0Content,
  };

  const overviewCards: ReportOverviewCard[] = segments.map((id) => {
    const meta = getSegment(id);
    const seg = segmentContent[id];
    const codeNum =
      id === "s1"
        ? content.codes.s1
        : id === "s3"
          ? content.codes.s3Raw
          : id === "s2"
            ? content.codes.s2
            : content.codes.s0;
    const prefix = meta.code as "S1" | "S3" | "S2" | "S0";
    return {
      segmentId: id,
      code: formatSegmentCode(prefix, codeNum),
      title: meta.title.en,
      shortLabel: meta.shortLabel.en,
      essence: pickLocalized(seg.freeEssence, locale),
    };
  });

  const modules: ReportModuleViewModel[] = segments.map((id) => {
    const meta = getSegment(id);
    const seg = segmentContent[id];
    const codeNum =
      id === "s1"
        ? content.codes.s1
        : id === "s3"
          ? content.codes.s3Raw
          : id === "s2"
            ? content.codes.s2
            : content.codes.s0;
    const prefix = meta.code as "S1" | "S3" | "S2" | "S0";
    const reflection =
      mode === "free"
        ? ""
        : pickLocalized(seg.reflectionQuestion ?? content.reflectionQuestion, locale);

    const archetype = pickLocalized(seg.title, locale);

    return {
      segmentId: id,
      codeLabel: formatSegmentCode(prefix, codeNum),
      archetype,
      shortLabel: pickLocalized(seg.shortLabel, locale),
      cardImageUrl: getSegmentCardImageUrl(id, codeNum),
      fields: buildModuleFields(id, seg, locale, mode, archetype),
      reflectionQuestion: reflection || undefined,
      showLocked: mode === "free",
      lockedTeaser: mode === "free" ? pickLocalized(seg.lockedPreview, locale) : undefined,
    };
  });

  const headerTitle =
    variant === "sample"
      ? SAMPLE_REPORT_META.headerTitle
      : pickLocalized(content.freeResultCopy.pageTitle, locale);

  const headerSubtitle =
    variant === "sample"
      ? SAMPLE_REPORT_META.headerSubtitle
      : pickLocalized(content.freeResultCopy.pageSubtitle, locale);

  return {
    locale,
    mode,
    headerTitle,
    headerSubtitle,
    codeString: content.codes.codeString,
    boundaryNote: pickLocalized(content.freeResultCopy.boundaryNote, locale),
    fictionBanner: variant === "sample" ? SAMPLE_REPORT_META.fictionBanner : undefined,
    integratedTitle: pickLocalized(content.freeResultCopy.integratedTitle, locale),
    integratedLead: pickLocalized(content.freeResultCopy.integratedLead, locale),
    integratedSummary: pickLocalized(content.integratedFreeSummary, locale),
    overviewCards,
    modules,
    reflectionQuestion: pickLocalized(content.reflectionQuestion, locale),
    journalPrompts: REFLECTION_JOURNAL_PROMPTS,
    practices: INTEGRATION_PRACTICES,
    finalCta: REPORT_FINAL_CTA,
  };
}
