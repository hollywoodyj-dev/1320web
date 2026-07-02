/**
 * Fixed UI chrome for Page 16 — Reflection Journal.
 * Prompt defaults are semi-static; resolver may replace from module slots.
 */

export const JOURNAL_PAGE_HERO = {
  pageNumber: "16",
  title: "Reflection Journal",
  subtitle: "Your Space to Witness · Integrate · Remember · Become",
  description:
    "These pages are for you to reflect, feel, release, and receive. There are no right answers here — only your truth. Write. Breathe. Be honest. The more you reflect, the more you remember.",
} as const;

export const JOURNAL_WHY_REFLECTION_TITLE = "Why Reflection Matters";

export const JOURNAL_WHY_REFLECTION_COPY =
  "Reflection is how your soul moves awareness into embodiment. Through reflection, you transform insight into integration, and knowledge into wisdom.";

export const JOURNAL_GUIDELINES_TITLE = "Journal Guidelines";

export const JOURNAL_GUIDELINES = [
  "Be honest with yourself.",
  "Write freely without judgment.",
  "There is no need to be perfect.",
  "The more real you are, the deeper the transformation.",
  "Use this space often.",
  "Come back whenever you need clarity, comfort, or connection.",
] as const;

export const JOURNAL_TODAY_CHOOSE_TITLE = "Today I Choose To...";

export const JOURNAL_GRATEFUL_TITLE = "I Am Grateful For...";

export const JOURNAL_PROMPTS_PANEL_TITLE = "Reflection Prompts by Soul Code";

export const JOURNAL_CHECKIN_TITLE = "Daily Integration Check-In";

export const JOURNAL_CHECKIN_QUESTIONS = [
  "What went well today?",
  "What challenged me today?",
  "What did I learn about myself?",
  "What is one thing I will carry forward?",
] as const;

export const JOURNAL_SOUL_INSIGHT_TITLE = "Soul Insight Space";

export const JOURNAL_SOUL_INSIGHT_PROMPT =
  "What insight, message, or realization came to me today?";

export const JOURNAL_DOODLE_TITLE = "Draw, Doodle, or Express Freely";

export const JOURNAL_REMEMBER_TITLE = "Remember Who You Are";

export const JOURNAL_REMEMBER_COPY =
  "You are a soul having a human experience. These reflections help you return to your truth, integrate your journey, and embody your light more fully each day.";

export const JOURNAL_QUOTE =
  "The journey is not about becoming someone new. It is about remembering who you truly are.";

export const JOURNAL_REMEMBRANCE_TITLE = "My Soul Remembrance";

export const JOURNAL_REMEMBRANCE_ITEMS = [
  "I am here for a reason.",
  "I trust my path.",
  "I choose love.",
  "I embody my truth.",
  "I am the light. I remember.",
] as const;

export const JOURNAL_FOOTER_MANTRA = [
  "You are here to remember.",
  "You are here to integrate.",
  "You are here to embody your light.",
] as const;

/** Fixed 9-code journal prompt grid — defaults per NOVA spec. */
export const JOURNAL_PROMPT_FRAMEWORK = [
  {
    moduleKey: "s1" as const,
    codeLabel: "S1",
    themeTitle: "Soul Origin",
    fallbackIcon: "✺",
    defaultPrompt:
      "What did I remember about my essence today? How did I honor who I truly am?",
  },
  {
    moduleKey: "s2" as const,
    codeLabel: "S2",
    themeTitle: "Soul Lessons",
    fallbackIcon: "◌",
    defaultPrompt:
      "What lesson is showing up in my life right now? What is it here to teach me?",
  },
  {
    moduleKey: "s3" as const,
    codeLabel: "S3",
    themeTitle: "Soul Gifts",
    fallbackIcon: "◇",
    defaultPrompt:
      "What gifts did I share today? How did I express my light?",
  },
  {
    moduleKey: "s4" as const,
    codeLabel: "S4",
    themeTitle: "Soul Patterns",
    fallbackIcon: "∞",
    defaultPrompt:
      "What pattern did I notice today? How did I choose differently?",
  },
  {
    moduleKey: "s5" as const,
    codeLabel: "S5",
    themeTitle: "Soul Mission",
    fallbackIcon: "✶",
    defaultPrompt:
      "What inspired me today? How did I align with my mission?",
  },
  {
    moduleKey: "s6" as const,
    codeLabel: "S6",
    themeTitle: "Soul Values",
    fallbackIcon: "♛",
    defaultPrompt:
      "What matters most to me right now? How did I live in alignment?",
  },
  {
    moduleKey: "s7" as const,
    codeLabel: "S7",
    themeTitle: "Soul Sovereignty",
    fallbackIcon: "🛡",
    defaultPrompt:
      "Where did I honor my boundaries? How did I choose myself?",
  },
  {
    moduleKey: "s8" as const,
    codeLabel: "S8",
    themeTitle: "Soul Contribution",
    fallbackIcon: "✺",
    defaultPrompt:
      "Who did I serve today? How did my presence make a difference?",
  },
  {
    moduleKey: "s9" as const,
    codeLabel: "S9",
    themeTitle: "Return to Source",
    fallbackIcon: "◎",
    defaultPrompt:
      "How did I reconnect with Source today? What helped me feel peace and unity?",
  },
] as const;
