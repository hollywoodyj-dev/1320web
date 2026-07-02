/**
 * Fixed UI chrome for Page 13 — S8 Soul Contribution.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";

export const S8_PAGE_HERO = {
  pageNumber: "13",
  moduleLabel: "S8",
  moduleName: "Soul Contribution",
  subtitle: "Your Purposeful Impact Frequency · Your Unique Gift to the World",
  description:
    "S8 reveals the nature of your soul's contribution, the impact you are here to make, and how your unique gifts serve the greater whole. It reflects the legacy your soul came to create.",
} as const;

export const S8_CONTRIBUTION_MAP_NOTE =
  "Your soul is not here to fit in. Your soul is here to make a difference.";

export const S8_MAP_NODE_TITLES = {
  top: "Soul Purpose",
  right: "Gift Expression",
  bottom: "Collective Impact",
  left: "Service to Others",
} as const;

export const S8_MAP_NODE_ICONS = ["✶", "↗", "◎", "♡"] as const;

export const S8_MAP_NODE_FALLBACK_COPY = {
  top: "Your soul's core intention and the impact you are here to create.",
  right: "The natural gifts, talents, and abilities through which you make your contribution.",
  bottom: "The ripple effect of your work and how your light helps shift the world forward.",
  left: "The people, causes, and communities you are here to uplift and support.",
} as const;

export const S8_LIFE_INFLUENCE_TITLE = "How S8 Influences Your Life";

export const S8_CONTRIBUTION_INTEGRATION_TITLE = "Contribution Integration";

export const S8_CONTRIBUTION_ALIGNMENT_MAP_TITLE = "Contribution Alignment Map";

/** Qualitative dimensions — not contribution or impact scores. */
export const S8_FOCUS_DIMENSIONS = [
  "Heart Alignment",
  "Purpose Alignment",
  "Gift Expression",
  "Collective Impact",
] as const;

export const S8_FOCUS_QUALIFIERS = [
  "Opening",
  "Strengthening",
  "Integrating",
  "Expanding",
] as const;

/** Pill accent order matches target UI (green → blue → violet → orange). */
export const S8_FOCUS_PILL_TONES: QualitativeMapPillTone[] = [
  "green",
  "blue",
  "violet",
  "orange",
];

export const S8_FALLBACK_SYMBOL = "✺";

export const S8_CLOSING_LINE =
  "You are here to remember. · You are here to serve. · You are here to make an impact.";
