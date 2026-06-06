import type { Get1320ContentResult } from "@/lib/types/1320-content";
import type { IntegratedSoulBlueprint, ReportDebugInfo } from "@/lib/types/integrated-soul-blueprint";
import { segmentCodeKey } from "@/lib/segment-code";

export function buildReportDebugInfo(
  content: Get1320ContentResult,
  blueprint: IntegratedSoulBlueprint | null,
  birthDate?: string,
): ReportDebugInfo {
  const s1Key = segmentCodeKey("S1", content.codes.s1);

  return {
    birthDate,
    combinationSignature: content.combinationSignature,
    s1: {
      calculated: content.codes.s1Code,
      resolvedKey: content.codes.s1Code,
      title: content.s1Content.title.en,
    },
    s3: {
      raw: content.codes.s3Raw,
      resolvedCode: content.codes.s3Code,
      resolvedKey: content.codes.s3Code,
      title: content.codes.s3Title,
    },
    s2: {
      calculated: content.codes.s2Code,
      resolvedKey: content.codes.s2Code,
      title: content.s2Content.title.en,
    },
    s0: {
      calculated: content.codes.s0Code,
      resolvedKey: content.codes.s0Code,
      title: content.s0Content.title.en,
    },
    integratedSoulBlueprint: {
      templateVersion: blueprint?.generationMeta.templateVersion ?? "integrated-blueprint-v1",
      contentVersion: blueprint?.generationMeta.contentVersion ?? "canonical-v1",
      generationVersion: blueprint?.generationMeta.generationVersion ?? "synthesis-v1",
      usedFallback: blueprint?.generationMeta.usedFallback ?? true,
      missingFields: blueprint?.generationMeta.missingFields ?? ["integratedSoulBlueprint"],
      source: "S1+S3+S2+S0",
    },
    s4Content: {
      source: "derived_from_s1",
      module: "Shadow Pattern",
      resolvedKey: content.s4Content?.id ?? s1Key,
      title: content.s4Content?.title.en ?? null,
    },
  };
}
