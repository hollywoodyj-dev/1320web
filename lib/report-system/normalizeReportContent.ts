import { lookupCommercialOverlay } from "@/lib/1320-v2/commercial-report-layer";
import {
  COMMERCIAL_EXTRA_BLOCK_SPECS,
  COMMERCIAL_REPORT_BLOCK_KEYS,
} from "@/lib/types/commercial-report-blocks";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { FullReportV2ModuleSlot } from "@/lib/full-report-v2/types";
import {
  COMMERCIAL_BLOCK_LABELS,
  REPORT_SEGMENT_NAMES,
  type ReportSegmentCode,
  type ReportSegmentView,
} from "@/lib/report-system/report-surface";

const MODULE_SLOT_KEY: Record<ReportSegmentCode, keyof CanonicalFullReport["payload"]["modules"]> =
  {
    S0: "s0",
    S1: "s1",
    S2: "s2",
    S3: "s3",
    S4: "s4",
    S5: "s5",
    S6: "s6",
    S7: "s7",
    S8: "s8",
    S9: "s9",
  };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function moduleFieldFallbacks(slot: FullReportV2ModuleSlot): Record<string, string> {
  const essence = asString(slot.essence) || asString(slot.opening_essence);
  const subtitle = asString(slot.subtitle) || asString(slot.short_label);
  const strengths = Array.isArray(slot.strengths)
    ? slot.strengths.filter((item): item is string => typeof item === "string").join(" ")
    : asString(slot.strengths);
  const shadows = Array.isArray(slot.shadow_patterns)
    ? slot.shadow_patterns.filter((item): item is string => typeof item === "string").join(" ")
    : asString(slot.shadow_patterns);
  const integration = asString(slot.integration_key) || asString(slot.integration_advice);
  const practice = asString(slot.practice) || asString(slot.one_week_practice);
  const reflection = asString(slot.guidance) || asString(slot.wisewave_reflection);

  return {
    opening_essence: essence,
    how_this_may_show_up: strengths || asString(slot.energy_expression),
    core_gift: strengths,
    growth_edge: shadows || asString(slot.growth_edge),
    integration_key: integration,
    one_week_practice: practice,
    wisewave_reflection: reflection,
  };
}

function resolveCommercialBlocksForCode(
  code: string,
  slot: FullReportV2ModuleSlot,
): { blocks: Record<string, string>; contentLayer: "commercial" | "symbolic" } {
  const overlay = lookupCommercialOverlay(code);
  const overlayBlocks = overlay?.commercial_report_blocks ?? {};
  const mergedOverlay = { ...overlayBlocks };

  const fallback = moduleFieldFallbacks(slot);
  const combined: Record<string, string> = {};

  const modulePrefix = code.split("-")[0] ?? "";
  const extraSpecs = COMMERCIAL_EXTRA_BLOCK_SPECS[modulePrefix] ?? [];
  const allKeys = new Set<string>([
    ...COMMERCIAL_REPORT_BLOCK_KEYS,
    ...extraSpecs.map((spec) => spec.key),
    ...Object.keys(mergedOverlay),
    ...Object.keys(fallback),
  ]);

  for (const key of allKeys) {
    const commercial = asString(mergedOverlay[key]);
    const symbolic = asString(fallback[key]);
    const value = commercial || symbolic;
    if (value) combined[key] = value;
  }

  const hasCommercial = Object.keys(mergedOverlay).some((key) => asString(mergedOverlay[key]));
  return {
    blocks: combined,
    contentLayer: hasCommercial ? "commercial" : "symbolic",
  };
}

export function normalizeReportSegment(
  report: CanonicalFullReport,
  segment: ReportSegmentCode,
): ReportSegmentView {
  const slotKey = MODULE_SLOT_KEY[segment];
  const slot = report.payload.modules[slotKey];
  const code = asString(slot.code) || `${segment}-00`;
  const { blocks, contentLayer } = resolveCommercialBlocksForCode(code, slot);

  const displayName =
    asString(slot.title) || asString(slot.display_name) || REPORT_SEGMENT_NAMES[segment];
  const subtitle =
    asString(slot.subtitle) ||
    asString(blocks.opening_essence).slice(0, 140) ||
    REPORT_SEGMENT_NAMES[segment];

  return {
    code: segment,
    segmentName: REPORT_SEGMENT_NAMES[segment],
    displayName,
    subtitle,
    commercialBlocks: blocks,
    contentLayer,
  };
}

export function listCommercialInsightCards(segment: ReportSegmentView): Array<{
  key: string;
  kicker: string;
  title: string;
  body: string;
}> {
  const cards: Array<{ key: string; kicker: string; title: string; body: string }> = [];

  for (const [key, label] of Object.entries(COMMERCIAL_BLOCK_LABELS)) {
    const body = segment.commercialBlocks[key];
    if (!body) continue;
    cards.push({
      key,
      kicker: `${segment.code} · ${segment.segmentName}`,
      title: label,
      body,
    });
  }

  for (const [key, body] of Object.entries(segment.commercialBlocks)) {
    if (key in COMMERCIAL_BLOCK_LABELS) continue;
    if (!body.trim()) continue;
    const label = key
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    cards.push({
      key,
      kicker: `${segment.code} · ${segment.segmentName}`,
      title: label,
      body,
    });
  }

  return cards;
}

/** Guard against accidental source-layer template leaks in commercial mode. */
export function isLikelyTemplateLeak(text: string): boolean {
  const normalized = text.toLowerCase();
  return (
    normalized.includes("{{") ||
    normalized.includes("source-layer") ||
    normalized.includes("template placeholder")
  );
}

export function sanitizeReportText(text: string, contentLayer: "commercial" | "symbolic"): string {
  if (contentLayer === "commercial" && isLikelyTemplateLeak(text)) {
    return "";
  }
  return text.trim();
}
