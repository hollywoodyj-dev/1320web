/** Mobile Page 21 — S6 Receiving Pattern Map static UI chrome */

import { CLOSING_INTEGRATION_SEAL_BG_URL } from "@/lib/full-report-v2/closing-integration-seal-logos";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_BRAND_SUBTITLE = "Full Soul Origin Report";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_PAGE_INDEX = "21";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_KICKER = "S6 Value & Receiving";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_LINE = "Receiving Pattern";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_EMPHASIS = "Map";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_SUBTITLE =
  "Your natural receiving flow and how abundance is meant to move through your life.";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_MAP_TITLE = "Your Receiving Pattern Map";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_CENTER_FALLBACK_ICON = "♡";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_CODE_FALLBACK = "S6-22";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_TITLE_FALLBACK = "The Heart Receiver";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_FALLBACK_ICON = "♡";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_NODES = [
  {
    key: "top",
    positionClass: "mr-v2-s6rpm-map-node--top",
    title: "Energy Flow",
    icon: "♡",
    copyFallback: "Opens through emotional safety, trust, and inner permission.",
    slotKey: "energy_flow",
  },
  {
    key: "left",
    positionClass: "mr-v2-s6rpm-map-node--left",
    title: "Giving Style",
    icon: "♧",
    copyFallback: "Generous, heart-centered, intuitive, and naturally supportive.",
    slotKey: "giving_style",
  },
  {
    key: "right",
    positionClass: "mr-v2-s6rpm-map-node--right",
    title: "Receiving Gate",
    icon: "☆",
    copyFallback: "Praise, appreciation, genuine recognition, and safe support.",
    slotKey: "receiving_gate",
  },
  {
    key: "bottom-left",
    positionClass: "mr-v2-s6rpm-map-node--bottom-left",
    title: "Block Pattern",
    icon: "☾",
    copyFallback: "Overgiving, self-doubt, minimizing needs, or proving worth.",
    slotKey: "block_pattern",
  },
  {
    key: "bottom-right",
    positionClass: "mr-v2-s6rpm-map-node--bottom-right",
    title: "Abundance Path",
    icon: "♢",
    copyFallback: "Allowing support, receiving without guilt, and honoring your value.",
    slotKey: "abundance_path",
  },
] as const;

export const MOBILE_S6_RECEIVING_PATTERN_MAP_INSIGHT_CARDS = [
  {
    key: "receiving_key",
    title: "Receiving Key",
    icon: "⚿",
    variant: "violet" as const,
    copyFallback:
      "You thrive when you allow yourself to receive love, support, resources, and opportunities with an open heart.",
  },
  {
    key: "abundance_truth",
    title: "Abundance Truth",
    icon: "☉",
    variant: "gold" as const,
    copyFallback:
      "You are inherently worthy. Abundance is your natural state, not something you need to chase or prove.",
  },
  {
    key: "soul_worth_reminder",
    title: "Soul Worth Reminder",
    icon: "◇",
    variant: "pink" as const,
    copyFallback:
      "Your value is not based on doing more, giving more, or becoming more useful. Your worth is already present.",
  },
  {
    key: "practice_today",
    title: "Practice Today",
    icon: "☘",
    variant: "green" as const,
    copyFallback: "Notice one way you can receive today. Say yes. Let it in. No guilt.",
  },
] as const;

export const MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_LEFT = "I receive with love.";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_CENTER = "✦";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_MANTRA_RIGHT = "I am worthy.";

export const MOBILE_S6_RECEIVING_PATTERN_MAP_FOOTER_LOTUS_LOGO_SRC = CLOSING_INTEGRATION_SEAL_BG_URL;
