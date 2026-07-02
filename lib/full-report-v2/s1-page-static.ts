import type { ReportGlyphName } from "@/components/full-report-v2/report-glyph";
import type { IntegrationFocusItem } from "@/lib/full-report-v2/module-focus-display";

/**
 * Fixed UI chrome for Page 04 — labels and qualitative integration focus pills.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S1_PAGE_HERO = {
  moduleLabel: "S1",
  moduleName: "Soul Origin",
  subtitle: "Your Core Essence · Your Soul's Original Blueprint",
  description:
    "S1 reveals the energetic essence you brought in — your original soul frequency, your inner nature, and the gift you came here to express.",
} as const;

/** Qualitative integration focus — no numeric percentages. */
export const S1_INTEGRATION_FOCUS: ReadonlyArray<IntegrationFocusItem> = [
  { label: "Identity & Self-Expression", focus: "Strong Focus" },
  { label: "Life Direction & Purpose", focus: "Active Focus" },
  { label: "Relationships & Connections", focus: "Supportive Focus" },
  { label: "Challenges & Growth Path", focus: "Emerging Focus" },
];

/**
 * Icons for the Highest Expression wheel, keyed by CONTENT CATEGORY (not position).
 * Each S1 code fills the same category slots with its own copy, so a category-based
 * icon stays meaningful across every S1-XX code:
 *   - gift      → core_gifts / strengths  (capacities you carry)
 *   - direction → mission_direction       (paths your gift expresses through)
 *   - lesson    → core_lesson             (what your soul is learning)
 */
export type S1ExpressionCategory = "gift" | "direction" | "lesson";

export const S1_EXPRESSION_ICONS: Record<S1ExpressionCategory, ReportGlyphName[]> = {
  gift: ["flame", "wholeness", "sprout"],
  direction: ["path", "compassStar"],
  lesson: ["cycle"],
};

export const S1_CLOSING_LINE =
  "You are not here to stay the same. · You are here to evolve, elevate, and illuminate. · Your transformation is your gift to the world.";
