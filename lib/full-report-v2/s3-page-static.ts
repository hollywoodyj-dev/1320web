import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import type { IntegrationFocusItem } from "@/lib/full-report-v2/module-focus-display";

/**
 * Fixed UI chrome for Page 05 — labels and qualitative integration focus pills.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S3_PAGE_HERO = {
  moduleLabel: "S3",
  moduleName: "Soul Vibration",
  subtitle: "Your Frequency · Your Energy · How You Move Through Life",
  description:
    "S3 reveals your natural energetic vibration and how your frequency moves, expresses, adapts, and influences the world around you.",
} as const;

/** Qualitative integration focus — no numeric percentages. */
export const S3_INTEGRATION_FOCUS: ReadonlyArray<IntegrationFocusItem> = [
  { label: "Energy & Vibration", focus: "Strong Focus" },
  { label: "Movement & Change", focus: "Active Focus" },
  { label: "Adaptability & Flow", focus: "Supportive Focus" },
  { label: "Inspiration & Creativity", focus: "Emerging Focus" },
];

/**
 * Icons for the Highest Expression wheel, keyed by CONTENT CATEGORY (not position).
 *   - energy      → expression_style / how vibration moves in life
 *   - aligned     → strengths / aligned expression
 *   - integration → integration_key / integration_advice
 *   - guidance    → wisewave_guidance (when needed to fill the wheel)
 */
export type S3ExpressionCategory = "energy" | "aligned" | "integration" | "guidance";

export const S3_EXPRESSION_ICONS: Record<S3ExpressionCategory, ReportGlyphName[]> = {
  energy: ["infinity", "path"],
  aligned: ["compassStar", "sprout", "flame", "wholeness"],
  integration: ["cycle", "tuningFork"],
  guidance: ["pattern", "heart"],
};

export const S3_CLOSING_LINE =
  "You are here to explore. · You are here to experience. · You are here to expand.";
