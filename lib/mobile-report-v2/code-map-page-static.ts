/** Mobile Page 04 — Your Code Map / S0–S9 Overview static content */

export const MOBILE_CODE_MAP_BRAND_NAME = "1320 Soul Origin Code System";

export const MOBILE_CODE_MAP_PAGE_INDEX = "04";

export const MOBILE_CODE_MAP_KICKER = "Your Code Map";

export const MOBILE_CODE_MAP_TITLE_LINES = ["S0–S9", "Overview"] as const;

export const MOBILE_CODE_MAP_SUBTITLE =
  "Ten dimensions that reveal your complete soul pattern, path, and purpose.";

export const MOBILE_CODE_MAP_INTRO_LABEL = "Your Complete 1320 Code Map";

export const MOBILE_CODE_MAP_INTRO_LEAD =
  "Your report unfolds through";

export const MOBILE_CODE_MAP_INTRO_EMPHASIS = "ten symbolic dimensions";

export const MOBILE_CODE_MAP_INTRO_TAIL =
  "Each one reflects a different layer of your blueprint — from essence and mirrors to mission, sovereignty, contribution, and return.";

export const MOBILE_CODE_MAP_LIST_LABEL = "S0–S9 System Overview";

export type MobileCodeMapLayerKey =
  | "s0"
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9";

export type MobileCodeMapDimensionStatic = {
  layer: MobileCodeMapLayerKey;
  label: string;
  icon: string;
  name: string;
  subtitle: string;
  copy: string;
};

export const MOBILE_CODE_MAP_DIMENSIONS: MobileCodeMapDimensionStatic[] = [
  {
    layer: "s0",
    label: "S0",
    icon: "⌂",
    name: "Void Gate",
    subtitle: "The Illusion You Transcend",
    copy:
      "The core illusion, limiting belief, or false identity your soul is learning to see through.",
  },
  {
    layer: "s1",
    label: "S1",
    icon: "♙",
    name: "Soul Origin",
    subtitle: "Who You Are at Your Core",
    copy:
      "Your essence, original frequency, natural gifts, and the core archetype your soul chose.",
  },
  {
    layer: "s2",
    label: "S2",
    icon: "☯",
    name: "Soul Mirror",
    subtitle: "What Life Reflects Back to You",
    copy:
      "The life mirrors, relationship activations, and lessons that help you see yourself clearly.",
  },
  {
    layer: "s3",
    label: "S3",
    icon: "✦",
    name: "Soul Vibration",
    subtitle: "How Your Frequency Moves",
    copy:
      "Your energetic expression, creative rhythm, talent blueprint, and the way your soul radiates.",
  },
  {
    layer: "s4",
    label: "S4",
    icon: "≋",
    name: "Core Shadow Pattern",
    subtitle: "The Pattern You Are Here to Heal",
    copy:
      "The repeating inner loop, protection pattern, or shadow cycle that shapes your growth edge.",
  },
  {
    layer: "s5",
    label: "S5",
    icon: "✶",
    name: "Soul Mission",
    subtitle: "Why You Are Here",
    copy:
      "Your mission direction, life theme, calling, and the path your soul came here to walk.",
  },
  {
    layer: "s6",
    label: "S6",
    icon: "◇",
    name: "Value & Receiving",
    subtitle: "How You Receive and Value Yourself",
    copy:
      "Your receiving pattern, sense of worth, value frequency, and capacity to allow support.",
  },
  {
    layer: "s7",
    label: "S7",
    icon: "♛",
    name: "Soul Sovereignty",
    subtitle: "Your Inner Authority",
    copy:
      "Your boundaries, self-trust, freedom, choice, and capacity to stand in your truth.",
  },
  {
    layer: "s8",
    label: "S8",
    icon: "✺",
    name: "Soul Contribution",
    subtitle: "Your Gift to the World",
    copy:
      "Your contribution, service field, leadership style, and the value only you can bring.",
  },
  {
    layer: "s9",
    label: "S9",
    icon: "◎",
    name: "Return to Source",
    subtitle: "Your Path of Remembrance",
    copy:
      "Your integration, wisdom, spiritual return, and the remembrance your soul is here to embody.",
  },
];

export const MOBILE_CODE_MAP_SYSTEM_ICON = "✺";

export const MOBILE_CODE_MAP_SYSTEM_TITLE = "How This Map Works";

export const MOBILE_CODE_MAP_SYSTEM_COPY =
  "These ten dimensions work together as a complete system. You are more than any one code — together, they reveal your full soul pattern.";

export const MOBILE_CODE_MAP_REMINDERS = [
  {
    icon: "☽",
    copy: "S1, S3, S2, and S0 form your core signature.",
  },
  {
    icon: "✶",
    copy: "S4–S9 reveal your deeper growth, mission, and integration path.",
  },
] as const;
