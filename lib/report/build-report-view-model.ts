import type { Get1320ContentResult, Locale, LocalizedText, SegmentContent } from "@/lib/types/1320-content";
import type { ReportDebugInfo } from "@/lib/types/integrated-soul-blueprint";
import { buildReportDebugInfo } from "@/lib/build-report-debug";
import { generateIntegrationPractices } from "@/lib/generate-integration-practices";
import { buildSynthesisLayerInput } from "@/lib/build-synthesis-input";
import { pickLocalized } from "@/lib/getLocalized";
import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";
import { getSegment, type SegmentId } from "@/lib/segments";
import type { IntegratedSummarySection } from "@/components/report/integrated-summary-card";
import {
  coreIllusionMechanismField,
  relationshipTriggerPatternField,
} from "@/lib/report/format-depth-fields";
import {
  REFLECTION_JOURNAL_PROMPTS,
  REPORT_FINAL_CTA,
  SAMPLE_REPORT_META,
} from "@/lib/report/report-static-content";

export type ReportMode = "full" | "free";

export type ReportField = {
  label: string;
  value: string;
  items?: string[];
};

export type ReportOverviewCard = {
  segmentId: SegmentId;
  code: string;
  title: string;
  shortLabel: string;
  essence: string;
  metaNote?: string;
};

export type ReportModuleViewModel = {
  segmentId: SegmentId;
  codeLabel: string;
  archetype: string;
  shortLabel: string;
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
  combinationSignature: string;
  boundaryNote: string;
  fictionBanner?: string;
  synthesisError?: string;
  integratedTitle: string;
  integratedLead: string;
  integratedSummary: string;
  integratedSections?: IntegratedSummarySection[];
  integrationTheme?: string;
  showFullUpsell: boolean;
  overviewCards: ReportOverviewCard[];
  modules: ReportModuleViewModel[];
  reflectionQuestion: string;
  journalPrompts: string[];
  practices: ReturnType<typeof generateIntegrationPractices>;
  finalCta: typeof REPORT_FINAL_CTA;
  debug?: ReportDebugInfo;
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

function listField(
  locale: Locale,
  label: string,
  items: LocalizedText[] | undefined,
): ReportField | null {
  if (!items?.length) return null;
  const values = items.map((item) => pickLocalized(item, locale)).filter(Boolean);
  if (!values.length) return null;
  return { label, value: values.join("\n"), items: values };
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
    listField(locale, "Soul Traits", segment.soulTraits),
    listField(locale, "Core Gifts", segment.coreGifts),
    listField(locale, "Shadow Pattern", segment.shadowPatterns),
    field(locale, "Soul Lesson", segment.lesson),
    listField(locale, "Direction", segment.direction),
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
  s3Raw: number,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.fullEssence ?? segment.freeEssence),
    field(locale, "Raw Value", { en: String(s3Raw), zh: String(s3Raw) }),
    field(locale, "Core Strengths", segment.expressionPattern),
    field(locale, "Growth Edge", segment.growthEdge),
    field(locale, "Integration Guidance", segment.guidance ?? segment.integrationPrompt),
  ].filter((f): f is ReportField => Boolean(f));

  if (mode === "full") return polishReportFields(all, { archetype });
  return all.filter((f) => f.label === "Overview" || f.label === "Raw Value");
}

function buildS2Fields(
  segment: SegmentContent,
  locale: Locale,
  mode: ReportMode,
  archetype: string,
): ReportField[] {
  const all = [
    field(locale, "Overview", segment.fullEssence ?? segment.freeEssence),
    relationshipTriggerPatternField(locale, segment),
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
    coreIllusionMechanismField(locale, segment),
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
  s3Raw: number,
): ReportField[] {
  switch (segmentId) {
    case "s1":
      return buildS1Fields(segment, locale, mode, archetype);
    case "s3":
      return buildS3Fields(segment, locale, mode, archetype, s3Raw);
    case "s2":
      return buildS2Fields(segment, locale, mode, archetype);
    case "s0":
      return buildS0Fields(segment, locale, mode, archetype);
    default:
      return [];
  }
}

function segmentCodeLabel(content: Get1320ContentResult, id: SegmentId): string {
  switch (id) {
    case "s1":
      return content.codes.s1Code;
    case "s3":
      return content.codes.s3Code;
    case "s2":
      return content.codes.s2Code;
    case "s0":
      return content.codes.s0Code;
  }
}

function segmentCardCodeNum(content: Get1320ContentResult, id: SegmentId): number {
  switch (id) {
    case "s1":
      return content.codes.s1;
    case "s3":
      return content.codes.s3Raw;
    case "s2":
      return content.codes.s2;
    case "s0":
      return content.codes.s0;
  }
}

export function buildReportViewModel(
  content: Get1320ContentResult,
  options: {
    mode: ReportMode;
    variant: "sample" | "result";
    birthDateLabel?: string;
    includeDebug?: boolean;
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

  const blueprint = content.integratedSoulBlueprint;
  const integratedSections: IntegratedSummarySection[] | undefined =
    mode === "full" && blueprint
      ? [
          { label: "Core Essence", body: blueprint.coreEssenceSummary },
          { label: "Energy Expression", body: blueprint.energyExpressionSummary },
          { label: "Relationship Mirror", body: blueprint.relationshipMirrorSummary },
          { label: "Awakening Path", body: blueprint.awakeningPathSummary },
          { label: "Main Inner Conflict", body: blueprint.mainInnerConflict },
          { label: "Embodiment Practice", body: blueprint.embodimentPractice },
        ].filter((section) => section.body.trim().length > 0)
      : undefined;

  const integratedSummary =
    mode === "free" && blueprint
      ? [blueprint.coreEssenceSummary, blueprint.relationshipMirrorSummary].filter(Boolean).join("\n\n")
      : mode === "full" && blueprint
        ? blueprint.integratedSummary
        : blueprint?.integratedSummary ?? pickLocalized(content.integratedFreeSummary, locale);

  const synthesisInput = buildSynthesisLayerInput(
    content,
    { s1: null, s3: null, s2: null, s0: null },
    { birthDate: options.birthDateLabel, locale },
  );
  const practicesResolved = generateIntegrationPractices(synthesisInput, locale);

  const overviewCards: ReportOverviewCard[] = segments.map((id) => {
    const meta = getSegment(id);
    const seg = segmentContent[id];
    const code = segmentCodeLabel(content, id);
    return {
      segmentId: id,
      code,
      title: meta.title.en,
      shortLabel: meta.shortLabel.en,
      essence: pickLocalized(seg.freeEssence, locale),
      metaNote:
        id === "s3"
          ? `Raw Value: ${content.codes.s3Raw}`
          : undefined,
    };
  });

  const modules: ReportModuleViewModel[] = segments.map((id) => {
    const seg = segmentContent[id];
    const reflection =
      mode === "free"
        ? ""
        : pickLocalized(content.segmentReflections[id], locale);

    const archetype = pickLocalized(seg.title, locale);
    const codeNum = segmentCardCodeNum(content, id);

    return {
      segmentId: id,
      codeLabel: segmentCodeLabel(content, id),
      archetype,
      shortLabel: pickLocalized(seg.shortLabel, locale),
      cardImageUrl: getSegmentCardImageUrl(id, codeNum),
      fields: buildModuleFields(id, seg, locale, mode, archetype, content.codes.s3Raw),
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

  const journalPrompts =
    blueprint?.reflectionQuestions?.length && mode === "full"
      ? blueprint.reflectionQuestions
      : REFLECTION_JOURNAL_PROMPTS;

  const debug =
    options.includeDebug || process.env.NEXT_PUBLIC_REPORT_DEBUG === "true"
      ? buildReportDebugInfo(content, blueprint, options.birthDateLabel)
      : undefined;

  return {
    locale,
    mode,
    headerTitle,
    headerSubtitle,
    codeString: content.codes.codeString,
    combinationSignature: content.combinationSignature,
    boundaryNote: pickLocalized(content.freeResultCopy.boundaryNote, locale),
    fictionBanner: variant === "sample" ? SAMPLE_REPORT_META.fictionBanner : undefined,
    synthesisError: content.synthesisError,
    integratedTitle: pickLocalized(content.freeResultCopy.integratedTitle, locale),
    integratedLead: pickLocalized(content.freeResultCopy.integratedLead, locale),
    integratedSummary,
    integratedSections,
    integrationTheme: blueprint?.integrationTheme,
    showFullUpsell: variant === "result",
    overviewCards,
    modules,
    reflectionQuestion: pickLocalized(content.reflectionQuestion, locale),
    journalPrompts,
    practices: practicesResolved,
    finalCta: REPORT_FINAL_CTA,
    debug,
  };
}
