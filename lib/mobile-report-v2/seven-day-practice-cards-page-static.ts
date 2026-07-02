/** Mobile Page 29 — 7-Day Practice Cards static UI chrome */

import { CLOSING_INTEGRATION_SEAL_BG_URL } from "@/lib/full-report-v2/closing-integration-seal-logos";

export const MOBILE_7DPC_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_7DPC_BRAND_SUBTITLE = "Full Soul Origin Report";

export const MOBILE_7DPC_PAGE_INDEX = "29";

export const MOBILE_7DPC_KICKER = "7-Day Integration Practice";

export const MOBILE_7DPC_TITLE_LINE = "7-Day Practice";

export const MOBILE_7DPC_TITLE_EMPHASIS = "Cards";

export const MOBILE_7DPC_SUBTITLE =
  "Seven daily cards to help you embody your full S0–S9 blueprint.";

export const MOBILE_7DPC_INTRO_ICON = "✷";

export const MOBILE_7DPC_INTRO_TITLE = "Practice Journey";

export const MOBILE_7DPC_INTRO_LEAD = "Each card gives you one focused daily practice. Together, the seven cards integrate";

export const MOBILE_7DPC_INTRO_EMPHASIS = "S1, S3, S2, S0, and S4–S9";

export const MOBILE_7DPC_INTRO_TAIL = "into one living path.";

export const MOBILE_7DPC_CARDS = [
  {
    key: "day-1",
    day: 1,
    tone: "gold",
    icon: "♧",
    title: "Return to Essence",
    codes: [{ tone: "gold", label: "S1" }],
    copyFallback:
      "Reconnect with your true self and original essence. Let today be about remembering who you are beneath roles and expectations.",
  },
  {
    key: "day-2",
    day: 2,
    tone: "blue",
    icon: "◉",
    title: "Mirror & Expression",
    codes: [
      { tone: "blue", label: "S2" },
      { tone: "green", label: "S3" },
    ],
    copyFallback:
      "Notice what life reflects back to you, then express your natural vibration with more honesty, creativity, and clarity.",
  },
  {
    key: "day-3",
    day: 3,
    tone: "violet",
    icon: "∴",
    title: "Trust the Unknown",
    codes: [{ tone: "violet", label: "S0" }],
    copyFallback:
      "Step into the void with trust. Let uncertainty become a place of grounding, listening, and inner surrender.",
  },
  {
    key: "day-4",
    day: 4,
    tone: "pink",
    icon: "✦",
    title: "Transform the Shadow",
    codes: [{ tone: "pink", label: "S4" }],
    copyFallback:
      "Bring gentle awareness to your core shadow pattern. Notice the loop, soften the protection, and choose a new response.",
  },
  {
    key: "day-5",
    day: 5,
    tone: "purple",
    icon: "✺",
    title: "Mission & Receiving",
    codes: [
      { tone: "purple", label: "S5" },
      { tone: "pink", label: "S6" },
    ],
    copyFallback:
      "Align with your mission and open to receive support, value, resources, love, and appreciation without shrinking.",
  },
  {
    key: "day-6",
    day: 6,
    tone: "cyan",
    icon: "♛",
    title: "Sovereignty & Contribution",
    codes: [
      { tone: "purple", label: "S7" },
      { tone: "cyan", label: "S8" },
    ],
    copyFallback:
      "Stand in your truth, honor your boundaries, and allow your gifts to become a meaningful contribution to life.",
  },
  {
    key: "day-7",
    day: 7,
    tone: "lavender",
    icon: "✧",
    title: "Return to Source",
    codes: [{ tone: "lavender", label: "S9" }],
    copyFallback:
      "Rest in peace, integrate all, and remember what is essential. Let your blueprint return to wholeness.",
  },
] as const;

export const MOBILE_7DPC_CONSISTENCY_TITLE = "Consistency Creates Transformation";

export const MOBILE_7DPC_CONSISTENCY_COPY =
  "One day at a time, your blueprint becomes less of a concept and more of a lived presence.";

export const MOBILE_7DPC_MANTRA_LEFT = "Practice.";

export const MOBILE_7DPC_MANTRA_CENTER = "✦";

export const MOBILE_7DPC_MANTRA_RIGHT = "Embody.";

export const MOBILE_7DPC_FOOTER_LOTUS_LOGO_SRC = CLOSING_INTEGRATION_SEAL_BG_URL;
