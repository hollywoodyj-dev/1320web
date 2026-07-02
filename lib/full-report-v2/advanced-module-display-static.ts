/**
 * Qualitative visual maps for Pages 10–14 (no percentage bars).
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

import type { IntegrationFocusLabel } from "@/lib/full-report-v2/module-focus-display";

export type QualitativeMapItem = {
  label: string;
  qualifier: string;
};

export const S5_MISSION_ACTIVATION_MAP_TITLE = "Mission Activation Map";

export const S5_MISSION_ACTIVATION_LABELS = [
  "Clear",
  "Activating",
  "Developing",
  "Embodying",
] as const;

export const S6_RECEIVING_PATTERN_MAP_TITLE = "Receiving Pattern Map";

export const S6_RECEIVING_PATTERN_LABELS = [
  "Open",
  "Strengthening",
  "Rebalancing",
  "Reclaiming",
] as const;

export const S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE = "Sovereignty Alignment Map";

export const S7_SOVEREIGNTY_ALIGNMENT_LABELS = [
  "Strong Boundary",
  "Reclaiming Choice",
  "Self-Trust Building",
  "Inner Authority Awakening",
] as const;

export const S8_CONTRIBUTION_PATHWAY_TITLE = "Contribution Pathway";

export const S9_RETURN_PATHWAY_TITLE = "Return Pathway";

export const S9_INTEGRATION_REMEMBRANCE_TITLE = "Integration Remembrance";

/** Build four qualitative map rows from labels (pages 10–12). */
export function buildQualitativeMapRows(
  labels: readonly string[],
  dimensionLabels: readonly string[],
): QualitativeMapItem[] {
  return dimensionLabels.map((label, index) => ({
    label,
    qualifier: labels[index % labels.length],
  }));
}

/** S5–S7 use focus-pill styling; labels are module-specific, not Integration Focus. */
export type ModuleQualifierLabel = IntegrationFocusLabel | string;

/** Row accent for qualitative map pills (pages 10–11). */
export const QUALITATIVE_MAP_PILL_TONES = ["gold", "blue", "green", "violet", "orange"] as const;

export type QualitativeMapPillTone = (typeof QUALITATIVE_MAP_PILL_TONES)[number];
