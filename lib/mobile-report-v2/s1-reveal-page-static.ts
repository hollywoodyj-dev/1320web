/** Mobile Page 06 — S1 Code Reveal static UI chrome */

import { S1_CLOSING_LINE } from "@/lib/full-report-v2/s1-page-static";

export const MOBILE_S1_REVEAL_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_S1_REVEAL_BRAND_SUBTITLE = "Full Soul Origin Report";

export const MOBILE_S1_REVEAL_PAGE_INDEX = "06";

export const MOBILE_S1_REVEAL_KICKER = "S1 Code Reveal";

export const MOBILE_S1_REVEAL_TITLE_LINE = "Your First Code";

export const MOBILE_S1_REVEAL_TITLE_EMPHASIS = "Revealed";

export const MOBILE_S1_REVEAL_SUBTITLE_LINES = [
  "We begin with your Soul Origin.",
  "The foundation of your entire blueprint.",
] as const;

export const MOBILE_S1_REVEAL_MODULE_LABEL = "Soul Origin";

export const MOBILE_S1_REVEAL_MODULE_MEANING = "Who You Are at Your Core";

export const MOBILE_S1_REVEAL_FALLBACK_ICON = "♧";

export const MOBILE_S1_REVEAL_MEANING_TITLE = "What This Means";

export const MOBILE_S1_REVEAL_MEANING_ICON = "✦";

export const MOBILE_S1_REVEAL_THEMES_TITLE_PREFIX = "Key Themes for";

export const MOBILE_S1_REVEAL_THEME_ITEMS = [
  {
    icon: "♨",
    title: "Transformation",
    copyFallback: "You are here to evolve, break, and rebuild.",
  },
  {
    icon: "✶",
    title: "Rebirth",
    copyFallback: "You rise from change stronger and wiser.",
  },
  {
    icon: "△",
    title: "Courage",
    copyFallback: "You step into the unknown and lead.",
  },
  {
    icon: "∞",
    title: "Impact",
    copyFallback: "Your transformation inspires and heals others.",
  },
] as const;

export const MOBILE_S1_REVEAL_REFLECTION_TITLE = "Reflection Prompt";

export const MOBILE_S1_REVEAL_REFLECTION_ICON = "✺";

export const MOBILE_S1_REVEAL_QUOTE_FALLBACK =
  "You are not here to stay the same. You are here to become the change.";

export const MOBILE_S1_REVEAL_MEANING_FALLBACK =
  "This code reflects a core layer of your soul blueprint — a symbolic mirror for awareness, not a fixed identity label.";

export const MOBILE_S1_REVEAL_REFLECTION_FALLBACK =
  "Where in your life are you being called to transform something that no longer fits? What would be possible on the other side?";

/** First sentence from desktop S1 closing line as alternate quote source. */
export const MOBILE_S1_REVEAL_QUOTE_FROM_CLOSING = S1_CLOSING_LINE.split("·")[0]?.trim() ?? "";
