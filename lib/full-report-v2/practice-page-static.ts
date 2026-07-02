/**
 * Fixed UI chrome for Page 15 — 7-Day Integration Practice.
 * Day framework is fixed; per-day copy is resolved from module slots.
 */

export const PRACTICE_PAGE_HERO = {
  pageNumber: "15",
  title: "7-Day Integration Practice",
  subtitle: "7 Days · 9 Codes · 1 You · A Practical Path to Remembrance",
  description:
    "This 7-day practice supports you in embodying, integrating, and living your full 1320 Soul Code. Take one day at a time. Be gentle. Be consistent. Trust the transformation.",
} as const;

export const PRACTICE_PURPOSE_TITLE = "The Purpose of This Practice";

export const PRACTICE_PURPOSE_COPY =
  "To help you anchor your soul codes into daily life through awareness, action, reflection, and embodiment.";

export const PRACTICE_OPENING_REMINDER =
  "You may repeat this 7-day cycle as often as you wish. Each time, you go deeper.";

export const PRACTICE_REPEAT_NOTE = PRACTICE_OPENING_REMINDER;

export const PRACTICE_INTEGRATION_QUOTE =
  "Integration is not about becoming someone new. It is about remembering who you truly are.";

export const PRACTICE_DAILY_REMINDERS = [
  "Take your time — integration is a journey, not a race.",
  "Be gentle with yourself as patterns surface.",
  "Celebrate small wins and subtle shifts.",
  "Trust the process even when change feels slow.",
  "Return to breath and body when the mind races.",
  "Your codes are allies, not tests to pass.",
] as const;

export const PRACTICE_INTEGRATION_GUIDELINES = [
  "Take your time.",
  "Be gentle with yourself.",
  "Celebrate small wins.",
  "Trust the process.",
  "Stay curious, not judgmental.",
  "Let integration be lived, not performed.",
] as const;

export const PRACTICE_JOURNAL_INTRO = "At the end of each day, journal:";

export const PRACTICE_JOURNAL_PROMPTS = [
  "What did I notice about myself today?",
  "What felt aligned? What felt off?",
  "What am I ready to integrate tomorrow?",
] as const;

export const PRACTICE_SUPPORTS_YOU_TITLE = "How This Practice Supports You";

export const PRACTICE_SUPPORTS_YOU_DEFAULT =
  "This rhythm aligns your mind, heart, and body so your soul codes become lived presence — not just insight you read once.";

export const PRACTICE_INTEGRATION_TIP_TITLE = "Integration Tip";

export const PRACTICE_INTEGRATION_TIP_DEFAULT =
  "Keep it simple. Keep it sacred. One honest moment of awareness can shift more than a week of striving.";

export const PRACTICE_KEY_INSIGHT_TITLE = "Key Insight";

export const PRACTICE_KEY_INSIGHT_DEFAULT =
  "Your soul codes are not just information. They are invitations to remember, integrate, and embody your light.";

export const PRACTICE_FINAL_REMEMBRANCE =
  "You are here to remember, integrate, and embody your light.";

export const PRACTICE_CLOSING_LINE =
  "You are here to remember. · You are here to integrate. · You are here to embody your light.";

/** Fixed 7-day framework — module mapping per product spec. */
export const PRACTICE_DAY_FRAMEWORK = [
  {
    day: 1,
    codeLabel: "S1",
    themeTitle: "Soul Origin",
    moduleKeys: ["s1"] as const,
    fallbackIcon: "✺",
  },
  {
    day: 2,
    codeLabel: "S2",
    themeTitle: "Soul Lessons",
    moduleKeys: ["s2"] as const,
    fallbackIcon: "◇",
  },
  {
    day: 3,
    codeLabel: "S3",
    themeTitle: "Soul Gifts",
    moduleKeys: ["s3"] as const,
    fallbackIcon: "◆",
  },
  {
    day: 4,
    codeLabel: "S4",
    themeTitle: "Soul Patterns",
    moduleKeys: ["s4"] as const,
    fallbackIcon: "∞",
  },
  {
    day: 5,
    codeLabel: "S5",
    themeTitle: "Soul Mission",
    moduleKeys: ["s5"] as const,
    fallbackIcon: "✶",
  },
  {
    day: 6,
    codeLabel: "S6 + S7",
    themeTitle: "Value & Sovereignty",
    moduleKeys: ["s6", "s7"] as const,
    fallbackIcon: "♛",
  },
  {
    day: 7,
    codeLabel: "S8 + S9",
    themeTitle: "Contribution & Return",
    moduleKeys: ["s8", "s9"] as const,
    fallbackIcon: "✦",
  },
] as const;
