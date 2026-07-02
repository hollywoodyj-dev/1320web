import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import type { IntegrationFocusItem } from "@/lib/full-report-v2/module-focus-display";

/**
 * Fixed UI chrome for Page 06 — labels, safe-language framing, qualitative focus pills.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S2_PAGE_HERO = {
  moduleLabel: "S2",
  moduleName: "Soul Mirror",
  subtitle: "Your Reflection · Your Lessons · How You Grow Through Life",
  description:
    "S2 reveals your soul’s mirror — the lessons, challenges, relationships, and repeating experiences that invite you into deeper self-awareness.",
} as const;

/** Required safe-language boundary — not relationship destiny or verdict. */
export const S2_SAFE_LANGUAGE_NOTE =
  "S2 does not describe a fixed fate or a destined relationship. It reveals the kinds of mirrors that may awaken your self-awareness.";

/** Shadow panel intro — describes repeating loops, not relationship verdicts. */
export const S2_SHADOW_INTRO = "This mirror pattern may repeat through:";

export const S2_KEY_INSIGHT_INTRO =
  "Your mirrors are not here to judge you, punish you, or define you. They are here to awaken awareness. Every experience can become an invitation to return to yourself.";

export const S2_KEY_INSIGHT_BOLD = "You are the mirror and the light.";

/** Qualitative integration focus — no numeric percentages. */
export const S2_INTEGRATION_FOCUS: ReadonlyArray<IntegrationFocusItem> = [
  { label: "Self-Awareness & Growth", focus: "Strong Focus" },
  { label: "Relationships & Mirrors", focus: "Active Focus" },
  { label: "Challenges & Lessons", focus: "Emerging Focus" },
  { label: "Healing & Integration", focus: "Supportive Focus" },
];

/**
 * Icons for the Highest Expression wheel, keyed by CONTENT CATEGORY (not position).
 *   - awareness → relationship dynamic / how the mirror appears
 *   - growth    → lesson / aligned learning edge
 *   - healing   → healing path / integration practice
 *   - pattern   → karmic loop / repeating cycle
 *   - guidance  → wisewave guidance (when needed to fill the wheel)
 */
export type S2ExpressionCategory = "awareness" | "growth" | "healing" | "pattern" | "guidance";

export const S2_EXPRESSION_ICONS: Record<S2ExpressionCategory, ReportGlyphName[]> = {
  awareness: ["mirror", "eye"],
  growth: ["sprout", "cycle"],
  healing: ["heart", "tuningFork"],
  pattern: ["infinity", "path"],
  guidance: ["wholeness", "compassStar"],
};

export const S2_CLOSING_LINE =
  "You are here to reflect. · You are here to learn. · You are here to transform.";
