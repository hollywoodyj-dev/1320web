/** English copy for `/full-report` — structure per 5/15 handoff. */

export type AdvancedModuleSymbolId = "s5" | "s6" | "shadow";

export const FULL_REPORT_META = {
  title: "Full 1320 Soul Origin Report",
  description:
    "Unlock the Full 1320 Soul Origin Report — deeper S1–S0 layers plus Shadow Pattern, Soul Mission, and Money Frequency modules. One-time purchase with magic-link return access.",
};

export const FULL_REPORT_HERO = {
  eyebrow: "FULL SOUL ORIGIN REPORT",
  title: "Go Deeper Into Your Code",
  body: "Your free code gives you the doorway. The Full Report gives you the map — how your code moves through identity, relationships, shadows, mission, and money patterns.",
  boundary:
    "1320 is a mirror for reflection and integration — not prediction, fate, or professional advice.",
  trust: "One-time purchase. Magic-link return access after checkout.",
};

export const REPORT_PROMISE = {
  title: "A Deeper Map — Not a Sentence",
  body: "This is not more information. It is deeper integration — a symbolic map you can return to as awareness grows, not a verdict on who you must become.",
};

export const FREE_VS_FULL = {
  title: "Free Result vs Full Report",
  free: {
    label: "Free First Layer",
    items: [
      "Four-code overview and integrated summary",
      "Short essence for each S1–S0 segment",
      "One reflection question to sit with",
      "Locked teasers for deeper fields",
      "Share and email your code",
    ],
  },
  full: {
    label: "Full Soul Origin Report",
    items: [
      "Expanded S1 Origin Frequency — gifts, shadow, lesson, direction, color, totem",
      "Expanded S3 Vibration Tier — expression, rhythm, growth edge",
      "Expanded S2 Mirror Path — relationship trigger pattern, mirror lesson, integration",
      "Expanded S0 Void Gate — core illusion mechanism, awakening path, practice",
      "Integrated blueprint summary with deeper synthesis",
      "Reflection journal prompts and integration practices",
      "Shadow Pattern Module (derived from your origin frequency)",
      "S5 Soul Mission module",
      "S6 Money Frequency module (self-awareness only)",
      "Designed for slow reading, integration, and return visits",
    ],
  },
};

export const FULL_INCLUDES = {
  title: "What the Full Report Includes",
  modules: [
    {
      code: "S1",
      title: "Origin Frequency",
      text: "Core archetype, gifts, shadow patterns, soul lesson, direction, color frequency, and totem.",
    },
    {
      code: "S3",
      title: "Vibration Tier",
      text: "How your energy expresses, rhythmic patterns, growth edges, and channeling guidance.",
    },
    {
      code: "S2",
      title: "Mirror Path",
      text: "Relationship mirrors, karmic loops, lessons, and integration prompts.",
    },
    {
      code: "S0",
      title: "Void Gate",
      text: "Core illusion, awakening path, return to clarity, and embodied practice.",
    },
    {
      code: "∫",
      title: "Integrated Blueprint",
      text: "A synthesized reading of how S1–S0 work together as one soul map.",
    },
    {
      code: "◎",
      title: "Reflection & Integration",
      text: "Journal prompts, practices, and gentle next steps — awareness before action.",
    },
  ],
};

export type AdvancedModulePreview = {
  symbol: AdvancedModuleSymbolId;
  code: string;
  title: string;
  text: string;
};

export const ADVANCED_MODULES: {
  title: string;
  items: AdvancedModulePreview[];
  s6Disclaimer: string;
} = {
  title: "Advanced Modules Preview",
  items: [
    {
      symbol: "shadow",
      code: "SHADOW",
      title: "Shadow Pattern Module",
      text: "Deeper shadow frequencies linked to your origin code — patterns that repeat until seen with compassion.",
    },
    {
      symbol: "s5",
      code: "S5",
      title: "Soul Mission",
      text: "Directional themes for contribution and purpose — symbolic orientation, not a fixed career command.",
    },
    {
      symbol: "s6",
      code: "S6",
      title: "Money Frequency",
      text: "How your energy relates to worth, receiving, and resource flow — self-awareness only.",
    },
  ],
  s6Disclaimer:
    "S6 Money Frequency is for self-awareness and reflection only. It is not financial, investment, tax, or legal advice. Consult qualified professionals for money decisions.",
};

export const REPORT_EXPERIENCE = {
  title: "The Report Experience",
  points: [
    {
      title: "SEE",
      text: "Read each segment as a layer — origin, expression, mirror, and return — without rushing to conclusions.",
    },
    {
      title: "UNDERSTAND MIRRORS",
      text: "Notice what repeats in relationships, identity, and worth — the system names patterns so you can choose differently.",
    },
    {
      title: "CHOOSE FROM AWARENESS",
      text: "Integration is one small honest action at a time — not pressure to become someone new overnight.",
    },
  ],
};

export const WHO_FOR = {
  title: "Who This Is For",
  items: [
    "You want a deeper mirror after your free four-code result",
    "You are willing to reflect slowly — not consume and discard",
    "You value integration over prediction or external authority",
    "You are curious about shadow, mission, and money patterns as symbols",
    "You may also book a 1:1 reading for live integration support",
  ],
};

export const WHO_NOT_FOR = {
  title: "Who This Is Not For",
  body: "If you want fortune-telling, guaranteed outcomes, or someone else to decide your fate — this is not that system. 1320 returns agency to you. It does not replace therapy, medicine, law, or financial counsel.",
};

export const FULL_REPORT_FAQ = [
  {
    q: "Can I buy the Full Report now?",
    a: "Use checkout to unlock the Full Report in-browser. After purchase, you receive a magic link to return anytime.",
  },
  {
    q: "What do I get on the free result?",
    a: "Your four codes, short essences, integrated summary, one reflection question, and locked previews of deeper fields.",
  },
  {
    q: "Is S6 financial advice?",
    a: "No. S6 Money Frequency is symbolic self-awareness about worth and resource patterns — not investment, tax, or financial planning advice.",
  },
  {
    q: "How is a reading different from the waitlist?",
    a: "The waitlist is for the written Full Report product. A 1320 Reading is a live session for integration — book separately on the booking page.",
  },
  {
    q: "Will my birth date be stored?",
    a: "Your birth date calculates your code. Checkout, waitlist, and booking forms collect only what you submit — see our privacy policy for details.",
  },
  {
    q: "Can I see a preview before joining?",
    a: "Yes. View the sample report for structure and tone — it uses fictional code S1-18 / S3-110 / S2-27 / S0-07.",
  },
  {
    q: "Is this fortune-telling?",
    a: "No. 1320 is a frequency-based mirror for reflection — not prediction or fixed destiny.",
  },
  {
    q: "What should I do while I wait?",
    a: "Generate your personal code, sit with your free reflection question, and explore the blueprint education page.",
  },
];

export const FULL_REPORT_DISCLAIMER =
  "1320 is for self-awareness and reflection only. It is not medical, psychological, legal, or financial advice. You remain responsible for your choices.";

export const FULL_REPORT_FINAL_CTA = {
  title: "Ready to Go Deeper?",
  body: "Your free code opens the doorway. Join the waitlist for the Full Soul Origin Report — or book a live reading for integration support.",
};
