import type { Locale } from "@/lib/types/1320-content";

/**
 * Generated synthesis layer — **Integrated Soul Blueprint** (product term).
 * Not Shadow Patterns (`s4Content` / `s4-shadow-patterns.json`).
 */
export type IntegratedSoulBlueprintMeta = {
  contentVersion: string;
  templateVersion: string;
  generationVersion: string;
  usedFallback: boolean;
  missingFields: string[];
  generatedAt: string;
};

export type IntegratedSoulBlueprint = {
  combinationSignature: string;
  coreEssenceSummary: string;
  energyExpressionSummary: string;
  relationshipMirrorSummary: string;
  awakeningPathSummary: string;
  /** Full multi-paragraph synthesis (free + full report). */
  integratedSummary: string;
  mainInnerConflict: string;
  integrationTheme: string;
  embodimentPractice: string;
  reflectionQuestions: string[];
  safetyDisclaimer: string;
  generationMeta: IntegratedSoulBlueprintMeta;
};

export type SynthesisLayerInput = {
  birthDate?: string;
  locale: Locale;
  s1: {
    code: string;
    number: number;
    englishTitle: string;
    chineseTitle: string;
    soulTraits: string[];
    strengths: string[];
    shadows: string[];
    coreLesson: string;
    soulDirection: string[];
    guidance: string;
  };
  s3: {
    code: string;
    rawValue: number;
    englishTitle: string;
    chineseTitle: string;
    energyExpression: string;
    strengths: string;
    challenges: string;
    guidance: string;
  };
  s2: {
    code: string;
    number: number;
    englishTitle: string;
    chineseTitle: string;
    relationshipDynamic: string;
    karmicLoop: string;
    lesson: string;
    healingPath: string;
    guidance: string;
  };
  s0: {
    code: string;
    number: number;
    englishTitle: string;
    chineseTitle: string;
    coreIllusion: string;
    voidChallenge: string;
    voidPower: string;
    pathOfReturn: string;
    guidance: string;
  };
};

export type ReportDebugInfo = {
  birthDate?: string;
  combinationSignature: string;
  s1: { calculated: string; resolvedKey: string; title: string };
  s3: { raw: number; resolvedCode: string; resolvedKey: string; title: string };
  s2: { calculated: string; resolvedKey: string; title: string };
  s0: { calculated: string; resolvedKey: string; title: string };
  integratedSoulBlueprint: {
    templateVersion: string;
    contentVersion: string;
    generationVersion: string;
    usedFallback: boolean;
    missingFields: string[];
    source: "S1+S3+S2+S0";
  };
  s4Content?: {
    source: "derived_from_s1";
    module: "Shadow Pattern";
    resolvedKey: string | null;
    title: string | null;
  };
};
