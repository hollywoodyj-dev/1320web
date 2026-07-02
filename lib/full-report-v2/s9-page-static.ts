/**
 * Fixed UI chrome for Page 14 — S9 Return to Source.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";

export const S9_PAGE_HERO = {
  pageNumber: "14",
  moduleLabel: "S9",
  moduleName: "Return to Source",
  subtitle: "Your Soul's Homecoming Frequency · Your Return Path to the One",
  description:
    "S9 reveals how your soul returns to Source, integrates all experiences, and completes its evolutionary journey. It reflects your relationship with the Divine, and how you embody unity in form.",
} as const;

export const S9_RETURN_MAP_NOTE =
  "You are not just returning to Source. You are the remembrance for others.";

export const S9_MAP_NODE_TITLES = {
  top: "Remembrance",
  right: "Integration",
  bottom: "Embodiment",
  left: "Reconnection",
} as const;

export const S9_MAP_NODE_ICONS = ["✶", "∞", "☉", "♡"] as const;

export const S9_MAP_NODE_FALLBACK_COPY = {
  top: "You remember your divine origin and the truth that you were never separate from Source.",
  right: "You integrate all experiences into wholeness and allow life to become one coherent story.",
  bottom: "You embody unity in form — living as presence, light, and aligned expression in the world.",
  left: "You reconnect with Source through stillness, devotion, and the quiet return of attention inward.",
} as const;

export const S9_LIFE_INFLUENCE_TITLE = "How S9 Influences Your Life";

export const S9_RETURN_INTEGRATION_TITLE = "Return Integration";

export const S9_RETURN_ALIGNMENT_MAP_TITLE = "Return Alignment Map";

/** Qualitative dimensions — not return progress scores. */
export const S9_FOCUS_DIMENSIONS = [
  "Source Connection",
  "Soul Recollection",
  "Life Integration",
  "Divine Embodiment",
] as const;

export const S9_FOCUS_QUALIFIERS = [
  "Opening",
  "Strengthening",
  "Integrating",
  "Expanding",
] as const;

/** Pill accent order matches target UI (green → blue → violet → orange). */
export const S9_FOCUS_PILL_TONES: QualitativeMapPillTone[] = [
  "green",
  "blue",
  "violet",
  "orange",
];

export const S9_FALLBACK_SYMBOL = "✺";

export const S9_CLOSING_LINE =
  "You are here to remember. · You are here to return. · You are here to be the light.";
