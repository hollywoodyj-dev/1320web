import enOverlaysData from "@/data/1320/en-field-overlays.json";
import freeResultCopyData from "@/data/1320/free-result-copy.json";
import integratedSummaryData from "@/data/1320/integrated-summary-templates.json";
import reflectionQuestionsData from "@/data/1320/reflection-questions.json";
import s0Data from "@/data/1320/s0-void-gate.json";
import s1Data from "@/data/1320/s1-origin-frequency.json";
import s2Data from "@/data/1320/s2-mirror-path.json";
import s3Data from "@/data/1320/s3-vibration-tier.json";
import s4Data from "@/data/1320/s4-shadow-patterns.json";
import s5Data from "@/data/1320/s5-soul-mission.json";
import s6Data from "@/data/1320/s6-money-frequency.json";
import {
  adaptPremiumSegment,
  adaptS0,
  adaptS1,
  adaptS2,
  adaptS3,
  mergeEnOverlay,
} from "@/lib/adapt1320V1";
import { pickLocalized } from "@/lib/getLocalized";
import type {
  FreeResultCopy,
  Get1320ContentInput,
  Get1320ContentResult,
  Locale,
  LocalizedText,
  S3TierRecord,
  V1Record,
} from "@/lib/types/1320-content";

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
  bySegment?: Partial<Record<"s1" | "s2" | "s3" | "s0", Record<string, LocalizedText>>>;
};

type IntegratedSummaryFile = {
  default: LocalizedText;
  templates?: Array<{ conditions: Record<string, number>; summary: LocalizedText }>;
};

type EnOverlaysFile = {
  s1?: Record<string, V1Record>;
  s2?: Record<string, V1Record>;
  s3?: Record<string, V1Record>;
  s0?: Record<string, V1Record>;
};

const freeResultCopy = freeResultCopyData as FreeResultCopy & { _meta?: unknown };
const reflectionQuestions = reflectionQuestionsData as ReflectionQuestionsFile & { _meta?: unknown };
const integratedSummary = integratedSummaryData as IntegratedSummaryFile & { _meta?: unknown };
const enOverlays = enOverlaysData as EnOverlaysFile & { _meta?: unknown };

export function formatCodeDisplay(s1: number, s3Raw: number, s2: number, s0: number) {
  const codeString = `S1-${s1} / S3-${s3Raw} / S2-${s2} / S0-${String(s0).padStart(2, "0")}`;
  const compactCode = `${s1}-${s3Raw}-${s2}-${String(s0).padStart(2, "0")}`;
  return { s1, s3Raw, s2, s0, codeString, compactCode };
}

function lookupRecord(data: Record<string, unknown>, key: string): V1Record | null {
  const value = data[key];
  if (!value || typeof value !== "object" || key === "_meta") return null;
  return value as V1Record;
}

export function getS3TierRecord(s3Raw: number): { record: V1Record | null; tierMatched: boolean } {
  const typed = s3Data as unknown as {
    default?: V1Record;
    tiers?: S3TierRecord[];
  };

  const tiers = typed.tiers;
  if (Array.isArray(tiers) && tiers.length > 0) {
    const matched = tiers.find((tier) => {
      const range = tier.range ?? (tier.min != null && tier.max != null ? [tier.min, tier.max] : null);
      if (!range || range.length !== 2) return false;
      const [min, max] = range;
      return s3Raw >= min && s3Raw <= max;
    });
    if (matched) return { record: matched, tierMatched: true };
  }

  return { record: typed.default ?? null, tierMatched: false };
}

function resolveIntegratedSummary(input: Get1320ContentInput): LocalizedText {
  const templates = integratedSummary.templates ?? [];
  let best: { score: number; summary: LocalizedText } | null = null;

  for (const template of templates) {
    const entries = Object.entries(template.conditions);
    const matches = entries.every(([key, value]) => {
      if (key === "s1") return input.s1 === value;
      if (key === "s3") return input.s3 === value;
      if (key === "s2") return input.s2 === value;
      if (key === "s0") return input.s0 === value;
      return false;
    });
    if (matches && entries.length > 0 && (!best || entries.length > best.score)) {
      best = { score: entries.length, summary: template.summary };
    }
  }

  return best?.summary ?? integratedSummary.default;
}

function resolveReflectionQuestion(input: Get1320ContentInput): LocalizedText {
  const compact = `${input.s1}-${input.s3}-${input.s2}-${String(input.s0).padStart(2, "0")}`;
  const byCode = reflectionQuestions.byCode?.[compact];
  if (byCode) return byCode;

  const s1Q = reflectionQuestions.bySegment?.s1?.[String(input.s1)];
  if (s1Q) return s1Q;

  return reflectionQuestions.default;
}

export function get1320Content(input: Get1320ContentInput | LegacyCodeInput): Get1320ContentResult {
  const normalized: Get1320ContentInput =
    "s3Raw" in input
      ? { s1: input.s1, s3: input.s3Raw, s2: input.s2, s0: input.s0, locale: input.locale }
      : input;

  const locale: Locale = normalized.locale ?? "en";
  const codes = formatCodeDisplay(normalized.s1, normalized.s3, normalized.s2, normalized.s0);

  const s1Record = mergeEnOverlay(
    lookupRecord(s1Data as Record<string, unknown>, String(normalized.s1)),
    enOverlays.s1?.[String(normalized.s1)],
  );
  const s2Record =
    lookupRecord(s2Data as Record<string, unknown>, String(normalized.s2)) ??
    lookupRecord(s2Data as Record<string, unknown>, "default");
  const s0Record = lookupRecord(s0Data as Record<string, unknown>, String(normalized.s0));
  const s2Merged = mergeEnOverlay(s2Record, enOverlays.s2?.[String(normalized.s2)]);
  const s0Merged = mergeEnOverlay(s0Record, enOverlays.s0?.[String(normalized.s0)]);
  const { record: s3Record, tierMatched } = getS3TierRecord(normalized.s3);
  const s3Merged = mergeEnOverlay(s3Record, enOverlays.s3?.[String(normalized.s3)]);

  const s4Key = `S1-${String(normalized.s1).padStart(2, "0")}`;
  const s6Key = String(normalized.s1);

  const s1Content = adaptS1(s1Record, normalized.s1);
  const s2Content = adaptS2(s2Merged, normalized.s2);
  const s0Content = adaptS0(s0Merged, normalized.s0);
  const s3Content = adaptS3(s3Merged, normalized.s3, tierMatched);

  return {
    locale,
    codes,
    s1Content,
    s3Content,
    s2Content,
    s0Content,
    s4Content: adaptPremiumSegment(
      lookupRecord(s4Data as Record<string, unknown>, s4Key),
      s4Key,
      normalized.s1,
      "Shadow Patterns",
      "阴影模式",
    ),
    s5Content: adaptPremiumSegment(
      lookupRecord(s5Data as Record<string, unknown>, s4Key),
      s4Key,
      normalized.s1,
      "Soul Mission",
      "灵魂使命",
    ),
    s6Content: adaptPremiumSegment(
      lookupRecord(s6Data as Record<string, unknown>, s6Key),
      `S6-${s6Key}`,
      normalized.s1,
      "Money Frequency",
      "金钱频率",
    ),
    integratedFreeSummary: resolveIntegratedSummary(normalized),
    reflectionQuestion: resolveReflectionQuestion(normalized),
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
  const s1Key = String(code.s1);
  const s2Key = String(code.s2);
  const s0Key = String(code.s0);
  const s4Key = `S1-${String(code.s1).padStart(2, "0")}`;
  const s6Key = String(code.s1);

  return {
    s1: lookupRecord(s1Data as Record<string, unknown>, s1Key),
    s3: getS3TierRecord(code.s3Raw).record,
    s2:
      lookupRecord(s2Data as Record<string, unknown>, s2Key) ??
      lookupRecord(s2Data as Record<string, unknown>, "default"),
    s0: lookupRecord(s0Data as Record<string, unknown>, s0Key),
    s4: lookupRecord(s4Data as Record<string, unknown>, s4Key),
    s5: lookupRecord(s5Data as Record<string, unknown>, s4Key),
    s6: lookupRecord(s6Data as Record<string, unknown>, s6Key),
  };
}
