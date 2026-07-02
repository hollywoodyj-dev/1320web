/**
 * Fixed UI chrome for Page 12 — S7 Soul Sovereignty.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

import type { QualitativeMapPillTone } from "@/lib/full-report-v2/advanced-module-display-static";

export const S7_PAGE_HERO = {
  pageNumber: "12",
  moduleLabel: "S7",
  moduleName: "Soul Sovereignty",
  subtitle:
    "Your Inner Authority Frequency · Your Capacity to Choose, Stand, and Live from Self-Trust",
  description:
    "S7 reveals how your soul develops inner authority, sovereignty, and unshakable self-trust. It illuminates your capacity to set boundaries, choose from truth, and live in freedom through aligned choice rather than fear, control, or external approval.",
} as const;

export const S7_SOVEREIGNTY_MAP_NOTE =
  "Sovereignty is not control. Sovereignty is aligned inner authority.";

export const S7_MAP_NODE_TITLES = {
  top: "Inner Authority",
  right: "Boundary",
  bottom: "Freedom",
  left: "Self-Trust",
} as const;

export const S7_MAP_NODE_ICONS = ["✶", "∞", "✦", "♡"] as const;

export const S7_MAP_NODE_FALLBACK_COPY = {
  top: "You listen to the deeper inner yes and allow it to lead your life.",
  right: "You keep love and limits together with grace and clarity.",
  bottom: "You choose from truth instead of fear, obligation, or external pressure.",
  left: "You trust your own knowing, your timing, and the wisdom within you.",
} as const;

export const S7_LIFE_INFLUENCE_TITLE = "How S7 Influences Your Life";

export const S7_SOVEREIGNTY_INTEGRATION_TITLE = "Sovereignty Integration";

export const S7_SOVEREIGNTY_ALIGNMENT_MAP_TITLE = "Sovereignty Alignment Map";

/** Qualitative dimensions — not sovereignty power scores. */
export const S7_FOCUS_DIMENSIONS = [
  "Self-Trust",
  "Boundaries",
  "Choice & Direction",
  "Freedom & Integrity",
] as const;

export const S7_FOCUS_QUALIFIERS = [
  "Strengthening",
  "Reclaiming",
  "Opening",
  "Integrating",
] as const;

/** Pill accent order matches target UI (blue → violet → green → gold). */
export const S7_FOCUS_PILL_TONES: QualitativeMapPillTone[] = [
  "blue",
  "violet",
  "green",
  "gold",
];

export const S7_FALLBACK_SYMBOL = "♛";

export const S7_CLOSING_LINE =
  "You are here to remember. · You are here to heal. · You are here to become.";
