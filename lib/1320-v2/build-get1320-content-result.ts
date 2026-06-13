import freeResultCopyData from "@/data/1320/free-result-copy.json";
import reflectionQuestionsData from "@/data/1320/reflection-questions.json";
import { adaptV2Segment } from "@/lib/1320-v2/adapt-v2-segment";
import { lookupV2Entry } from "@/lib/1320-v2/v2-index";
import { buildSynthesisLayerInput, validateSynthesisLayerInput } from "@/lib/build-synthesis-input";
import { buildCombinationSignature } from "@/lib/combination-signature";
import {
  calculate1320Code,
  calculateFromAwareness,
  type SoulCodeResult,
} from "@/lib/calculate1320Code";
import { deriveIntegratedFreeSummary } from "@/lib/derive-integrated-free-summary";
import { generateIntegratedSoulBlueprint } from "@/lib/generate-integrated-blueprint";
import { resolveAllSegmentReflections } from "@/lib/resolve-segment-reflection";
import { soulCodeToCodeDisplay } from "@/lib/soul-code-to-code-display";
import type {
  FreeResultCopy,
  Get1320ContentInput,
  Get1320ContentOptions,
  Get1320ContentResult,
  LocalizedText,
  ReportProductTier,
  SegmentContent,
} from "@/lib/types/1320-content";
import type { V2ModuleId } from "@/lib/types/1320-v2-content";

const freeResultCopy = freeResultCopyData as FreeResultCopy & { _meta?: unknown };
const reflectionQuestions = reflectionQuestionsData as { default: LocalizedText } & { _meta?: unknown };

const SYNTHESIS_ERROR_MESSAGE =
  "Your Integrated Soul Blueprint could not be generated because one or more code layers are incomplete. Please contact support.";

function parseBirthDate(birthDate: string): { year: number; month: number; day: number } | null {
  const match = birthDate.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return null;
  return {
    year: Number.parseInt(match[1], 10),
    month: Number.parseInt(match[2], 10),
    day: Number.parseInt(match[3], 10),
  };
}

function resolveSoulCodes(input: Get1320ContentInput, birthDate?: string): SoulCodeResult {
  if (birthDate) {
    const parts = parseBirthDate(birthDate);
    if (parts) return calculate1320Code(parts.year, parts.month, parts.day);
  }
  return calculateFromAwareness(input.s1, input.s3, input.s2, input.s0);
}

function adaptV2Module(
  module: V2ModuleId,
  code: string,
  s3Raw?: number,
): SegmentContent {
  const entry = lookupV2Entry(module, code);
  return adaptV2Segment(module, code, entry, s3Raw);
}

function reflectionFromSegment(segment: SegmentContent, fallback: LocalizedText): LocalizedText {
  if (segment.reflectionQuestion?.en?.trim() || segment.reflectionQuestion?.zh?.trim()) {
    return segment.reflectionQuestion;
  }
  return fallback;
}

function applyReportTier(
  result: Get1320ContentResult,
  tier: ReportProductTier,
): Get1320ContentResult {
  if (tier === "free") {
    result.s5Content = null;
    result.s6Content = null;
    result.s7Content = null;
    result.s8Content = null;
    result.s9Content = null;
    return result;
  }
  if (tier === "full") {
    result.s8Content = null;
    result.s9Content = null;
    return result;
  }
  return result;
}

export function buildGet1320ContentResultV2(
  input: Get1320ContentInput,
  options?: Get1320ContentOptions,
): Get1320ContentResult {
  const locale = input.locale ?? "en";
  const reportTier = options?.reportTier ?? "full";
  const soul = resolveSoulCodes(input, options?.birthDate);
  const codes = soulCodeToCodeDisplay(soul);

  let s1Content = adaptV2Module("S1", soul.s1Code);
  let s3Content = adaptV2Module("S3", soul.s3Code, soul.s3Raw);
  let s2Content = adaptV2Module("S2", soul.s2Code);
  let s0Content = adaptV2Module("S0", soul.s0Code);

  s3Content = {
    ...s3Content,
    segmentCode: soul.s3Code,
    s3Code: soul.s3Code,
    s3Raw: soul.s3Raw,
  };

  const s4Content = adaptV2Module("S4", soul.s4Code);
  const s5Content = adaptV2Module("S5", soul.s5Code);
  const s6Content = adaptV2Module("S6", soul.s6Code);
  const s7Content = adaptV2Module("S7", soul.s7Code);
  const s8Content = adaptV2Module("S8", soul.s8Code);
  const s9Content = adaptV2Module("S9", soul.s9Code);

  const combinationSignature = buildCombinationSignature({
    s1Code: codes.s1Code,
    s3Code: codes.s3Code,
    s2Code: codes.s2Code,
    s0Code: codes.s0Code,
  });

  const partialResult: Get1320ContentResult = {
    locale,
    codes,
    combinationSignature,
    s1Content,
    s3Content,
    s2Content,
    s0Content,
    s4Content,
    s5Content,
    s6Content,
    s7Content,
    s8Content,
    s9Content,
    integratedSoulBlueprint: null,
    integratedFreeSummary: { en: "", zh: "" },
    reflectionQuestion: reflectionQuestions.default,
    segmentReflections: {
      s1: reflectionQuestions.default,
      s3: reflectionQuestions.default,
      s2: reflectionQuestions.default,
      s0: reflectionQuestions.default,
    },
    contentPipeline: "v2",
    reportTier,
    freeResultCopy: {
      pageTitle: freeResultCopy.pageTitle,
      pageSubtitle: freeResultCopy.pageSubtitle,
      boundaryNote: freeResultCopy.boundaryNote,
      integratedTitle: freeResultCopy.integratedTitle,
      integratedLead: freeResultCopy.integratedLead,
      reflectionTitle: freeResultCopy.reflectionTitle,
      missingEntryFallback: freeResultCopy.missingEntryFallback,
      lockedTeaserLabel: freeResultCopy.lockedTeaserLabel,
    },
  };

  const synthesisInput = buildSynthesisLayerInput(partialResult, {}, {
    birthDate: options?.birthDate,
    locale,
  });
  const missingFields = validateSynthesisLayerInput(synthesisInput);

  if (missingFields.length > 0) {
    const message = `${SYNTHESIS_ERROR_MESSAGE} (missing: ${missingFields.join(", ")})`;
    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    }
    return applyReportTier({ ...partialResult, synthesisError: message }, reportTier);
  }

  const integratedSoulBlueprint = generateIntegratedSoulBlueprint(synthesisInput, missingFields);
  const segmentReflections = resolveAllSegmentReflections(
    synthesisInput,
    {
      s1Code: codes.s1Code,
      s3Code: codes.s3Code,
      s2Code: codes.s2Code,
      s0Code: codes.s0Code,
    },
    locale,
  );

  s1Content = {
    ...s1Content,
    reflectionQuestion: reflectionFromSegment(s1Content, segmentReflections.s1),
  };
  s2Content = {
    ...s2Content,
    reflectionQuestion: reflectionFromSegment(s2Content, segmentReflections.s2),
  };
  s0Content = {
    ...s0Content,
    reflectionQuestion: reflectionFromSegment(s0Content, segmentReflections.s0),
  };
  s3Content = {
    ...s3Content,
    reflectionQuestion: reflectionFromSegment(s3Content, segmentReflections.s3),
  };

  const integratedFreeSummary = deriveIntegratedFreeSummary(integratedSoulBlueprint);

  return applyReportTier(
    {
      locale,
      codes,
      combinationSignature,
      s1Content,
      s3Content,
      s2Content,
      s0Content,
      s4Content,
      s5Content,
      s6Content,
      s7Content,
      s8Content,
      s9Content,
      integratedSoulBlueprint,
      integratedFreeSummary,
      reflectionQuestion: s1Content.reflectionQuestion ?? segmentReflections.s1,
      segmentReflections: {
        s1: s1Content.reflectionQuestion ?? segmentReflections.s1,
        s3: s3Content.reflectionQuestion ?? segmentReflections.s3,
        s2: s2Content.reflectionQuestion ?? segmentReflections.s2,
        s0: s0Content.reflectionQuestion ?? segmentReflections.s0,
      },
      contentPipeline: "v2",
      reportTier,
      freeResultCopy: partialResult.freeResultCopy,
    },
    reportTier,
  );
}
