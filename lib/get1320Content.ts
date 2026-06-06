import enOverlaysData from "@/data/1320/en-field-overlays.json";
import freeResultCopyData from "@/data/1320/free-result-copy.json";
import reflectionQuestionsData from "@/data/1320/reflection-questions.json";
import s0Data from "@/data/1320/s0-void-gate.json";
import s1Data from "@/data/1320/s1-origin-frequency.json";
import s2Data from "@/data/1320/s2-mirror-path.json";
import s3Data from "@/data/1320/s3-vibration-tier.json";
import s4Data from "@/data/1320/s4-shadow-patterns.json";
import s5SeedDatabase from "@/data/1320/s5-seed-database.json";
import s6Data from "@/data/1320/s6-money-frequency.json";
import { adaptAssembledS5 } from "@/lib/adapt-assembled-s5";
import { assembleS5SoulMission } from "@/lib/assemble-s5-soul-mission";
import {
  adaptPremiumSegment,
  adaptS0,
  adaptS1,
  adaptS2,
  adaptS3,
  adaptS6,
  mergeEnOverlay,
} from "@/lib/adapt1320V1";
import { MissingS5SeedError } from "@/lib/load-s5-seeds";
import { buildSynthesisLayerInput, validateSynthesisLayerInput } from "@/lib/build-synthesis-input";
import { buildCombinationSignature } from "@/lib/combination-signature";
import { deriveIntegratedFreeSummary } from "@/lib/derive-integrated-free-summary";
import { generateIntegratedSoulBlueprint } from "@/lib/generate-integrated-blueprint";
import { pickLocalized } from "@/lib/getLocalized";
import {
  lookupDefault,
  lookupRecord,
  lookupS6Record,
  lookupSegmentRecord,
} from "@/lib/lookup-segment-record";
import { resolveAllSegmentReflections } from "@/lib/resolve-segment-reflection";
import { resolveS3Tier } from "@/lib/s3-tier";
import { formatCodeDisplay } from "@/lib/format-code-display";
import { segmentCodeKey } from "@/lib/segment-code";
import type {
  FreeResultCopy,
  Get1320ContentInput,
  Get1320ContentResult,
  Locale,
  LocalizedText,
  V1Record,
} from "@/lib/types/1320-content";

export { getS3TierRecord, resolveS3Tier } from "@/lib/s3-tier";

type LegacyCodeInput = {
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
  locale?: Locale;
};

type ReflectionQuestionsFile = {
  default: LocalizedText;
  byCode?: Record<string, LocalizedText>;
};

type EnOverlaysFile = {
  s1?: Record<string, V1Record>;
  s2?: Record<string, V1Record>;
  s3?: Record<string, V1Record>;
  s0?: Record<string, V1Record>;
};

const freeResultCopy = freeResultCopyData as FreeResultCopy & { _meta?: unknown };
const reflectionQuestions = reflectionQuestionsData as ReflectionQuestionsFile & { _meta?: unknown };
const enOverlays = enOverlaysData as EnOverlaysFile & { _meta?: unknown };

const SYNTHESIS_ERROR_MESSAGE =
  "Your Integrated Soul Blueprint could not be generated because one or more code layers are incomplete. Please contact support.";

const S5_ASSEMBLY_ERROR_MESSAGE =
  "Your Soul Mission module could not be assembled because one or more approved seeds are missing. Please contact support.";

function resolveS5Content(codes: {
  s1Code: string;
  s2Code: string;
  s3Code: string;
  s0Code: string;
  combinationSignature: string;
}): { content: Get1320ContentResult["s5Content"]; error?: string } {
  try {
    const assembled = assembleS5SoulMission({
      s1Code: codes.s1Code,
      s2Code: codes.s2Code,
      s3Code: codes.s3Code,
      s0Code: codes.s0Code,
      combinationSignature: codes.combinationSignature,
    });
    return { content: adaptAssembledS5(assembled) };
  } catch (error) {
    if (process.env.NODE_ENV === "development" && error instanceof MissingS5SeedError) {
      throw error;
    }
    return { content: null, error: S5_ASSEMBLY_ERROR_MESSAGE };
  }
}

export { formatCodeDisplay } from "@/lib/format-code-display";

function attachReflection(
  content: Get1320ContentResult["s1Content"],
  reflection: LocalizedText,
): Get1320ContentResult["s1Content"] {
  return { ...content, reflectionQuestion: reflection };
}

export function get1320Content(
  input: Get1320ContentInput | LegacyCodeInput,
  options?: { birthDate?: string },
): Get1320ContentResult {
  const normalized: Get1320ContentInput =
    "s3Raw" in input
      ? { s1: input.s1, s3: input.s3Raw, s2: input.s2, s0: input.s0, locale: input.locale }
      : input;

  const locale: Locale = normalized.locale ?? "en";

  const s1Code = segmentCodeKey("S1", normalized.s1);
  const s2Code = segmentCodeKey("S2", normalized.s2);
  const s0Code = segmentCodeKey("S0", normalized.s0);

  const s1Record = mergeEnOverlay(
    lookupSegmentRecord(s1Data as Record<string, unknown>, "S1", normalized.s1),
    enOverlays.s1?.[s1Code] ?? enOverlays.s1?.[String(normalized.s1)],
  );
  const s2Record =
    lookupSegmentRecord(s2Data as Record<string, unknown>, "S2", normalized.s2) ??
    lookupDefault(s2Data as Record<string, unknown>);
  const s0Record = lookupSegmentRecord(s0Data as Record<string, unknown>, "S0", normalized.s0);
  const s2Merged = mergeEnOverlay(
    s2Record,
    enOverlays.s2?.[s2Code] ?? enOverlays.s2?.[String(normalized.s2)],
  );
  const s0Merged = mergeEnOverlay(
    s0Record,
    enOverlays.s0?.[s0Code] ?? enOverlays.s0?.[String(normalized.s0)],
  );

  const s3Resolved = resolveS3Tier(normalized.s3);
  const s3TierKey =
    s3Resolved.s3Code ??
    (s3Resolved.record && typeof s3Resolved.record.code === "string"
      ? s3Resolved.record.code
      : String(normalized.s3));
  const s3Merged = mergeEnOverlay(
    s3Resolved.record,
    enOverlays.s3?.[s3TierKey] ?? enOverlays.s3?.[String(normalized.s3)],
  );

  const codes = formatCodeDisplay(
    normalized.s1,
    normalized.s3,
    normalized.s2,
    normalized.s0,
    s3Resolved.s3Code,
    s3Resolved.s3Title,
  );
  const combinationSignature = buildCombinationSignature({
    s1Code: codes.s1Code,
    s3Code: codes.s3Code,
    s2Code: codes.s2Code,
    s0Code: codes.s0Code,
  });

  let s1Content = adaptS1(s1Record, normalized.s1);
  let s2Content = adaptS2(s2Merged, normalized.s2);
  let s0Content = adaptS0(s0Merged, normalized.s0);
  let s3Content = adaptS3(s3Merged, normalized.s3, s3Resolved.tierMatched);

  s1Content = { ...s1Content, segmentCode: codes.s1Code };
  s2Content = { ...s2Content, segmentCode: codes.s2Code };
  s0Content = { ...s0Content, segmentCode: codes.s0Code };
  s3Content = {
    ...s3Content,
    segmentCode: codes.s3Code,
    s3Code: codes.s3Code,
    s3Raw: normalized.s3,
  };

  const partialResult: Get1320ContentResult = {
    locale,
    codes,
    combinationSignature,
    s1Content,
    s3Content,
    s2Content,
    s0Content,
    s4Content: null,
    s5Content: null,
    s6Content: null,
    integratedSoulBlueprint: null,
    integratedFreeSummary: { en: "", zh: "" },
    reflectionQuestion: reflectionQuestions.default,
    segmentReflections: {
      s1: reflectionQuestions.default,
      s3: reflectionQuestions.default,
      s2: reflectionQuestions.default,
      s0: reflectionQuestions.default,
    },
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

  const synthesisInput = buildSynthesisLayerInput(
    partialResult,
    { s1: s1Record, s3: s3Merged, s2: s2Merged, s0: s0Merged },
    { birthDate: options?.birthDate, locale },
  );
  const missingFields = validateSynthesisLayerInput(synthesisInput);
  const s5Resolved = resolveS5Content({
    s1Code: codes.s1Code,
    s2Code: codes.s2Code,
    s3Code: codes.s3Code,
    s0Code: codes.s0Code,
    combinationSignature,
  });

  if (missingFields.length > 0) {
    const message = `${SYNTHESIS_ERROR_MESSAGE} (missing: ${missingFields.join(", ")})`;
    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    }
    return {
      ...partialResult,
      s4Content: adaptPremiumSegment(
        lookupRecord(s4Data as Record<string, unknown>, s1Code),
        s1Code,
        normalized.s1,
        "Shadow Pattern Module",
        "阴影模式模块",
      ),
      s5Content: s5Resolved.content,
      s5AssemblyError: s5Resolved.error,
      s6Content: adaptS6(
        lookupS6Record(s6Data as Record<string, unknown>, normalized.s1),
        normalized.s1,
      ),
      synthesisError: message,
    };
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

  s1Content = attachReflection(s1Content, segmentReflections.s1);
  s2Content = attachReflection(s2Content, segmentReflections.s2);
  s0Content = attachReflection(s0Content, segmentReflections.s0);
  s3Content = attachReflection(s3Content, segmentReflections.s3);

  const integratedFreeSummary = deriveIntegratedFreeSummary(integratedSoulBlueprint);

  return {
    locale,
    codes,
    combinationSignature,
    s1Content,
    s3Content,
    s2Content,
    s0Content,
    s4Content: adaptPremiumSegment(
      lookupRecord(s4Data as Record<string, unknown>, s1Code),
      s1Code,
      normalized.s1,
      "Shadow Pattern Module",
      "阴影模式模块",
    ),
    s5Content: s5Resolved.content,
    s5AssemblyError: s5Resolved.error,
    s6Content: adaptS6(
      lookupS6Record(s6Data as Record<string, unknown>, normalized.s1),
      normalized.s1,
    ),
    integratedSoulBlueprint,
    integratedFreeSummary,
    reflectionQuestion: segmentReflections.s1,
    segmentReflections,
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
}

/** Resolve a localized string from full content result (convenience for pages). */
export function t(text: LocalizedText, locale: Locale): string {
  return pickLocalized(text, locale);
}

/** @deprecated Use get1320Content({ s1, s3, s2, s0 }) — kept for gradual migration. */
export function get1320ContentRaw(code: LegacyCodeInput) {
  const s1Key = segmentCodeKey("S1", code.s1);
  return {
    s1: lookupSegmentRecord(s1Data as Record<string, unknown>, "S1", code.s1),
    s3: resolveS3Tier(code.s3Raw).record,
    s2:
      lookupSegmentRecord(s2Data as Record<string, unknown>, "S2", code.s2) ??
      lookupDefault(s2Data as Record<string, unknown>),
    s0: lookupSegmentRecord(s0Data as Record<string, unknown>, "S0", code.s0),
    s4: lookupRecord(s4Data as Record<string, unknown>, s1Key),
    s5: (s5SeedDatabase as { S5_PrimaryMissionSeeds_From_S1: Record<string, unknown> })
      .S5_PrimaryMissionSeeds_From_S1[s1Key] ?? null,
    s6: lookupS6Record(s6Data as Record<string, unknown>, code.s1),
  };
}
