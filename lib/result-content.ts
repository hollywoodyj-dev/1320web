/** Free Result (`/result`) — Refinement Spec v1.0 (Wisewave). */

export const RESULT_META = {
  title: "Your 1320 Soul Origin Code",
  description:
    "Your four-part Soul Blueprint has opened — a symbolic mirror for awareness, not prediction or fixed identity.",
};

/** Product display names for free-result foundation cards (S1→S3→S2→S0). */
export const FREE_RESULT_FOUNDATION = [
  {
    segmentId: "s1" as const,
    productTitle: "Soul Origin",
    shortLabel: "Who You Are",
    essence: "Your original essence beneath adaptation.",
  },
  {
    segmentId: "s3" as const,
    productTitle: "Soul Vibration",
    shortLabel: "How You Express",
    essence: "How your natural frequency moves through life.",
  },
  {
    segmentId: "s2" as const,
    productTitle: "Soul Mirror",
    shortLabel: "What Relationships Reflect",
    essence: "The relational patterns life mirrors back.",
  },
  {
    segmentId: "s0" as const,
    productTitle: "Void Gate",
    shortLabel: "How You Return",
    essence: "How you meet uncertainty and return to self.",
  },
];

export const FREE_RESULT_HERO = {
  eyebrow: "Your Code Has Opened",
  title: "Your 1320 Soul Origin Code",
  mirrorLine: "This is a four-part mirror for awareness, not prediction or fixed identity.",
  primaryCta: "Unlock My Full Report",
  secondaryCta: "Save My Code",
  secondaryHref: "#keep-code",
};

export const FREE_RESULT_INTEGRATED = {
  title: "Your Integrated Soul Blueprint",
  body: [
    "When your four codes are read together, they form a living mirror of how your essence, expression, relationships, and return pattern move through life.",
    "This is not a fixed identity. It is a starting point for reflection.",
  ],
};

export const FREE_RESULT_UPGRADE = {
  title: "Go Deeper Into Your Full Soul Blueprint",
  lead: "Your free result reveals your four foundation mirrors.",
  body: "The Full Report expands your blueprint into the complete S0–S9 Soul Blueprint, including shadow patterns, soul mission, value and receiving, sovereignty, contribution, return, and 7-day integration practice.",
  primaryCta: "Unlock My Full Report",
  secondaryCta: "View Sample Report",
};

export const FREE_RESULT_KEEP = {
  title: "Keep Your Code",
  body: "Save or send your four-part code so you can return to it later.",
  copyLabel: "Copy My Code",
  emailLabel: "Send My Code to Email",
};

export const FREE_RESULT_FAQ = [
  {
    q: "Is this my full report?",
    a: "No. This is the free foundation layer. The Full Report expands into the complete S0–S9 Soul Blueprint.",
  },
  {
    q: "Can my code change?",
    a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
  },
  {
    q: "What should I do next?",
    a: "Sit with your reflection question, explore the sample report, or unlock the Full Report for deeper layers.",
  },
  {
    q: "How is 1320 different from a score?",
    a: "1320 describes symbolic patterns for awareness — not whether you are higher or lower than anyone else.",
  },
];

export const FREE_RESULT_NAV = [
  { id: "overview" as const, label: "Overview" },
  { id: "four-part" as const, label: "Four-Part Code" },
  { id: "integrated" as const, label: "Integrated Mirror" },
  { id: "segments" as const, label: "Segment Blueprint" },
  { id: "reflection" as const, label: "Reflection" },
  { id: "go-deeper" as const, label: "Go Deeper" },
];

export const FREE_RESULT_MODULE = {
  unlockCta: "Unlock Full Segment",
  sectionTitle: "Your Segment Blueprint",
  viewSection: "View Section",
};
