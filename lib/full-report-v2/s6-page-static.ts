/**
 * Fixed UI chrome for Page 11 — S6 Value & Receiving.
 * See: docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md
 */

export const S6_PAGE_HERO = {
  pageNumber: "11",
  moduleLabel: "S6",
  moduleName: "Value & Receiving",
  subtitle: "Your Worth Frequency · Your Capacity to Receive, Hold, and Exchange Value",
  description:
    "S6 reveals how your soul relates to worth, receiving, value exchange, support, boundaries, and the inner permission to receive without guilt or overgiving.",
} as const;

export const S6_RECEIVING_MAP_NOTE =
  "Receiving is not taking. Receiving is allowing life to meet you.";

export const S6_MAP_NODE_TITLES = {
  top: "Self-Worth",
  right: "Value Exchange",
  bottom: "Material & Energy Flow",
  left: "Emotional Receiving",
} as const;

export const S6_MAP_NODE_ICONS = ["◇", "⇄", "⌂", "♡"] as const;

export const S6_MAP_NODE_FALLBACK_COPY = {
  top: "Your inner sense of worthiness is the foundation of receiving.",
  right: "The balance of giving and receiving in relationships, money, and opportunities.",
  bottom: "Your relationship with money, resources, support, and the flow of abundance.",
  left: "Your capacity to receive love, care, and emotional nourishment.",
} as const;

export const S6_LIFE_INFLUENCE_TITLE = "How S6 Influences Your Life";

export const S6_RECEIVING_INTEGRATION_TITLE = "Receiving Integration";

export const S6_RECEIVING_PATTERN_MAP_TITLE = "Receiving Pattern Map";

/** Qualitative dimensions — not wealth or worth scores. */
export const S6_FOCUS_DIMENSIONS = [
  "Self-Worth",
  "Emotional Receiving",
  "Value Exchange",
  "Material & Energy Flow",
] as const;

export const S6_FOCUS_QUALIFIERS = [
  "Strengthening",
  "Opening",
  "Rebalancing",
  "Reclaiming",
] as const;

export const S6_FALLBACK_SYMBOL = "◇";

export const S6_CLOSING_LINE =
  "You are here to remember. · You are here to heal. · You are here to become.";
