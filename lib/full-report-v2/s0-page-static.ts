import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import type { IntegrationFocusItem } from "@/lib/full-report-v2/module-focus-display";

/**
 * Fixed UI chrome for Page 07 — labels and qualitative integration focus pills.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S0_PAGE_HERO = {
  moduleLabel: "S0",
  moduleName: "Void Gate",
  subtitle: "Your Awakening Gate · Your Sacred Pause · Where You Return to Source",
  description:
    "S0 reveals the illusion your soul is learning to see through — the place where old identity dissolves, awareness deepens, and your true essence can return.",
} as const;

export const S0_ESSENCE_INTRO =
  "Your Void Gate reveals the place where you are invited to pause, soften, and see through the illusion that has shaped your inner world.";

export const S0_SHADOW_INTRO = "When disconnected from your Void Gate, you may:";

export const S0_KEY_INSIGHT_INTRO =
  "Your void is not emptiness. It is the sacred space where illusion softens and truth becomes visible. When you stop proving, you can return to being.";

export const S0_KEY_INSIGHT_BOLD = "You are already worthy before the world responds.";

/** Qualitative integration focus — no numeric percentages. */
export const S0_INTEGRATION_FOCUS: ReadonlyArray<IntegrationFocusItem> = [
  { label: "Worth & Inner Grounding", focus: "Strong Focus" },
  { label: "Stillness & Self-Return", focus: "Active Focus" },
  { label: "Illusion Awareness", focus: "Emerging Focus" },
  { label: "Source Alignment", focus: "Supportive Focus" },
];

/**
 * Icons for the Highest Expression wheel, keyed by CONTENT CATEGORY (not position).
 *   - illusion  → core illusion / what is being seen through
 *   - power     → void power / inner capacity
 *   - return    → path of return / integration practice
 *   - challenge → void challenge / distortion pattern
 *   - guidance  → wisewave guidance (when needed to fill the wheel)
 */
export type S0ExpressionCategory = "illusion" | "power" | "return" | "challenge" | "guidance";

export const S0_EXPRESSION_ICONS: Record<S0ExpressionCategory, ReportGlyphName[]> = {
  illusion: ["eye", "pattern"],
  power: ["flame", "wholeness"],
  return: ["path", "heart"],
  challenge: ["cycle", "unlock"],
  guidance: ["tuningFork", "infinity"],
};

export const S0_CLOSING_LINE =
  "You are here to remember. · You are here to realign. · You are here to return to Source.";
