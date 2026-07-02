/**
 * Fixed UI chrome for Page 09 — S4 Core Shadow Pattern.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S4_PAGE_HERO = {
  pageNumber: "09",
  moduleLabel: "S4",
  moduleName: "Core Shadow Pattern",
  subtitle: "Your Deepest Unconscious Pattern · Where You Repeat Without Realizing",
  description:
    "S4 reveals the core shadow pattern you may unconsciously repeat — the hidden script that shapes your choices, reactions, and life experiences. Awareness is the beginning of freedom.",
} as const;

export const S4_CYCLE_NOTE = "Awareness breaks the cycle. Choice creates freedom.";

/** Cycle node icons (center ring) — layout positions 1–6 clockwise from top.
 * Order matches S4_CYCLE_FIELD_KEYS:
 * core_loop · emotional_trigger · defense_pattern · hidden_need · relationship_pattern · work_life_pattern */
export const S4_CYCLE_ICONS = ["↻", "✦", "❖", "♡", "∞", "◆"] as const;

export const S4_CYCLE_FIELD_KEYS = [
  "core_loop",
  "emotional_trigger",
  "defense_pattern",
  "hidden_need",
  "relationship_pattern",
  "work_life_pattern",
] as const;

export const S4_CLOSING_LINE =
  "You are here to remember. · You are here to heal. · You are here to become.";
