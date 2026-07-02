/**
 * Fixed UI chrome for Page 10 — S5 Soul Mission.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S5_PAGE_HERO = {
  pageNumber: "10",
  moduleLabel: "S5",
  moduleName: "Soul Mission",
  subtitle: "Your Mission Frequency · The Work Your Soul Came to Express",
  description:
    "S5 reveals the mission pattern your soul is here to embody — not as pressure, but as a living direction for meaning, service, expression, and contribution.",
} as const;

export const S5_MISSION_MAP_NOTE = "Mission is not pressure. Mission is alignment in motion.";

export const S5_MAP_NODE_TITLES = {
  top: "Spiritual Purpose",
  right: "Core Expression",
  bottom: "Earthly Impact",
  left: "Soul Gift",
} as const;

export const S5_MAP_NODE_ICONS = ["✦", "☉", "⊕", "❖"] as const;

export const S5_LIFE_INFLUENCE_TITLE = "How S5 Influences Your Life";

export const S5_MISSION_INTEGRATION_TITLE = "Mission Integration";

export const S5_ACTIVATION_MAP_TITLE = "Mission Activation Map";

/** Qualitative dimensions — not completion percentages. */
export const S5_ACTIVATION_DIMENSIONS = [
  "Clarity",
  "Courage",
  "Service",
  "Expression",
] as const;

export const S5_ACTIVATION_QUALIFIERS = [
  "Activating",
  "Strengthening",
  "Embodying",
  "Developing",
] as const;

export const S5_CLOSING_LINE =
  "You are here to remember. · You are here to heal. · You are here to become.";

export const S5_SECTION_KEYS = [
  "mission_essence",
  "what_your_soul_is_learning_to_express",
  "how_your_patterns_become_mission",
  "natural_mission_fields",
  "shadow_distortion_of_this_mission",
  "mature_expression",
  "wisewave_reflection",
] as const;
