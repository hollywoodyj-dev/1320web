import { segmentCodeKey } from "@/lib/segment-code";
import type { Get1320ContentResult, Locale, V1Record } from "@/lib/types/1320-content";
import type { SynthesisLayerInput } from "@/lib/types/integrated-soul-blueprint";
import { pickLocalized } from "@/lib/getLocalized";

function str(record: V1Record | null, key: string): string {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

function strArray(record: V1Record | null, key: string): string[] {
  const value = record?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function buildSynthesisLayerInput(
  content: Get1320ContentResult,
  records: {
    s1?: V1Record | null;
    s3?: V1Record | null;
    s2?: V1Record | null;
    s0?: V1Record | null;
  },
  options?: { birthDate?: string; locale?: Locale },
): SynthesisLayerInput {
  const locale = options?.locale ?? content.locale;
  const s1 = content.s1Content;
  const s3 = content.s3Content;
  const s2 = content.s2Content;
  const s0 = content.s0Content;

  return {
    birthDate: options?.birthDate,
    locale,
    s1: {
      code: content.codes.s1Code,
      number: content.codes.s1,
      englishTitle: s1.title.en,
      chineseTitle: s1.title.zh ?? s1.title.en,
      soulTraits: (s1.soulTraits ?? []).map((t) => pickLocalized(t, locale)).filter(Boolean),
      strengths: (s1.coreGifts ?? []).map((t) => pickLocalized(t, locale)).filter(Boolean),
      shadows: (s1.shadowPatterns ?? []).map((t) => pickLocalized(t, locale)).filter(Boolean),
      coreLesson: pickLocalized(s1.lesson, locale) || str(records.s1 ?? null, "lessonEn"),
      soulDirection: (s1.direction ?? []).map((t) => pickLocalized(t, locale)).filter(Boolean),
      guidance: pickLocalized(s1.guidance, locale) || str(records.s1 ?? null, "guidanceEn"),
    },
    s3: {
      code: content.codes.s3Code,
      rawValue: content.codes.s3Raw,
      englishTitle: s3.title.en,
      chineseTitle: s3.title.zh ?? s3.title.en,
      energyExpression:
        pickLocalized(s3.fullEssence ?? s3.freeEssence, locale) || str(records.s3 ?? null, "soulTraitsEn"),
      strengths: pickLocalized(s3.expressionPattern, locale) || str(records.s3 ?? null, "strengthsEn"),
      challenges: pickLocalized(s3.growthEdge, locale) || str(records.s3 ?? null, "challengesEn"),
      guidance: pickLocalized(s3.guidance, locale) || str(records.s3 ?? null, "guidanceEn"),
    },
    s2: {
      code: content.codes.s2Code,
      number: content.codes.s2,
      englishTitle: s2.title.en,
      chineseTitle: s2.title.zh ?? s2.title.en,
      relationshipDynamic:
        pickLocalized(s2.relationshipPattern ?? s2.freeEssence, locale) ||
        str(records.s2 ?? null, "relationshipDynamicEn"),
      karmicLoop: pickLocalized(s2.karmicLoop, locale) || str(records.s2 ?? null, "karmicLoopEn"),
      lesson: pickLocalized(s2.mirrorLesson, locale) || str(records.s2 ?? null, "lessonEn"),
      healingPath:
        pickLocalized(s2.integrationPrompt, locale) || str(records.s2 ?? null, "healingPathEn"),
      guidance: pickLocalized(s2.guidance, locale) || str(records.s2 ?? null, "guidanceEn"),
    },
    s0: {
      code: content.codes.s0Code,
      number: content.codes.s0,
      englishTitle: s0.title.en,
      chineseTitle: s0.title.zh ?? s0.title.en,
      coreIllusion:
        pickLocalized(s0.coreIllusion ?? s0.freeEssence, locale) || str(records.s0 ?? null, "coreIllusionEn"),
      voidChallenge: pickLocalized(s0.voidChallenge, locale) || str(records.s0 ?? null, "voidChallengeEn"),
      voidPower: pickLocalized(s0.voidPower, locale) || str(records.s0 ?? null, "voidPowerEn"),
      pathOfReturn:
        pickLocalized(s0.awakeningPath ?? s0.practice, locale) ||
        str(records.s0 ?? null, "pathOfReturnEn"),
      guidance: pickLocalized(s0.guidance, locale) || str(records.s0 ?? null, "guidanceEn"),
    },
  };
}

export function validateSynthesisLayerInput(input: SynthesisLayerInput): string[] {
  const missing: string[] = [];

  const require = (path: string, value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      if (value.length === 0) missing.push(path);
      return;
    }
    if (!value?.trim()) missing.push(path);
  };

  require("s1.code", input.s1.code);
  require("s1.englishTitle", input.s1.englishTitle);
  if (input.s1.soulTraits.length === 0) missing.push("s1.soulTraits");
  require("s1.coreLesson", input.s1.coreLesson);

  require("s3.code", input.s3.code);
  require("s3.englishTitle", input.s3.englishTitle);
  require("s3.energyExpression", input.s3.energyExpression);

  require("s2.code", input.s2.code);
  require("s2.englishTitle", input.s2.englishTitle);
  require("s2.relationshipDynamic", input.s2.relationshipDynamic);

  require("s0.code", input.s0.code);
  require("s0.englishTitle", input.s0.englishTitle);
  require("s0.coreIllusion", input.s0.coreIllusion);

  return missing;
}

export function segmentCodesFromContent(content: Get1320ContentResult) {
  return {
    s1Code: content.codes.s1Code,
    s3Code: content.codes.s3Code,
    s2Code: content.codes.s2Code,
    s0Code: content.codes.s0Code,
  };
}

export function numericSegmentCodes(content: Get1320ContentResult) {
  return {
    s1: segmentCodeKey("S1", content.codes.s1),
    s2: segmentCodeKey("S2", content.codes.s2),
    s0: segmentCodeKey("S0", content.codes.s0),
  };
}
