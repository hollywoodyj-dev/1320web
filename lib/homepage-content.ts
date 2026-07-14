/** Homepage copy — Living Blueprint Architecture positioning (Addendum v1.0). */

import { SEGMENTS } from "@/lib/segments";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const HOMEPAGE_META = {
  title: "1320 Soul Code | Meet Your Soul Blueprint",
  description:
    "1320 is a reflective intelligence platform built around the Soul Blueprint. Generate your symbolic birth-date blueprint and explore your origin, expression, relationships, and integration path.",
};

export const HOMEPAGE_HERO = {
  titleLines: ["Meet Your", "Soul Blueprint"] as const,
  subheadline:
    "Understand your original pattern, expression, relationship themes, and integration path — a mirror for self-recognition, not prediction.",
  journeyLine: "Your report is the beginning. Your Living Blueprint is the journey.",
  trustMicroLine: "Not your fate. Not your label. Your mirror.",
  primaryCta: "Generate My Code",
  primaryHref: "#entry-panel",
  ctaSupportLine: "1320 uses your birth year, month, and day — birth time and location are not required.",
  miniLabels: [
    { digit: "S1", label: "Soul Origin" },
    { digit: "S3", label: "Soul Vibration" },
    { digit: "S2", label: "Soul Mirror" },
    { digit: "S0", label: "Void Gate" },
  ],
};

export const HOMEPAGE_CURIOSITY = {
  eyebrow: "BEFORE THE SYSTEM",
  title: "Does this sound familiar?",
  questions: [
    "What patterns have quietly shaped your life for years?",
    "Why do certain relationships keep repeating?",
    "What part of yourself have you been overlooking?",
  ],
  closing:
    "1320 begins with recognition — then offers structure. Not to define you, but to help you see what was already moving through your life.",
};

export const HOMEPAGE_WHAT_IS = {
  eyebrow: "WHAT IS 1320?",
  title: "A reflective intelligence system",
  body: [
    "1320 is a reflective intelligence system built around your Soul Blueprint.",
    "Your birth date becomes a symbolic mirror for self-recognition and integration — not astrology, tarot, diagnosis, or prediction.",
    "Begin a deeper relationship with who you are and how you live your blueprint.",
  ],
};

export const HOMEPAGE_CALCULATOR = {
  eyebrow: "START YOUR JOURNEY",
  titleLines: ["Begin Your", "Soul Blueprint"] as const,
  body: "Enter your birth year, month, and day to see your four-part foundation — free, private, and reflective.",
  formLabel: "Enter your birth date",
  cta: "GENERATE MY CODE",
  trustNote: "Birth time and birth location are not required.",
};

export const HOMEPAGE_BLUEPRINT_INTRO = {
  eyebrow: "YOUR SOUL BLUEPRINT",
  title: "Four foundation layers. One living mirror.",
  body: "Your Soul Blueprint begins with four foundation layers in the order S1 → S3 → S2 → S0. Each layer reveals a different facet of how your inner pattern may be reflected in life — not four separate labels, but one integrated mirror.",
  mobileShort: "S1 → S3 → S2 → S0 — your foundation blueprint.",
};

const pillarMeta = Object.fromEntries(SEGMENTS.map((s) => [s.code, s]));

export const HOMEPAGE_PILLARS = [
  {
    code: "S1",
    title: "SOUL ORIGIN",
    plainLanguage: "Your original essence and inner source pattern.",
    headline: "S1 · Soul Origin",
    text: "Who you are beneath adaptation — gifts, shadows, and soul direction as a symbolic mirror.",
    tone: "gold",
    learnMoreHref: pillarMeta.S1.learnMoreHref,
  },
  {
    code: "S3",
    title: "SOUL VIBRATION",
    plainLanguage: "How your natural frequency moves, expresses, and becomes visible in life.",
    headline: "S3 · Soul Vibration",
    text: "How your energy expresses through lived experience — not a score, rank, or spiritual hierarchy.",
    tone: "violet",
    learnMoreHref: pillarMeta.S3.learnMoreHref,
  },
  {
    code: "S2",
    title: "SOUL MIRROR",
    plainLanguage: "What relationships mirror back to you — recurring emotional and relational lessons.",
    headline: "S2 · Soul Mirror",
    text: "What relationships reflect — patterns in connection, not predictions of who you will attract.",
    tone: "blue",
    learnMoreHref: pillarMeta.S2.learnMoreHref,
  },
  {
    code: "S0",
    title: "VOID GATE",
    plainLanguage: "How you meet uncertainty, transition, surrender, and the unknown.",
    headline: "S0 · Void Gate",
    text: "How you meet uncertainty and return to clarity — an awakening gate, not a fixed flaw.",
    tone: "teal",
    learnMoreHref: pillarMeta.S0.learnMoreHref,
  },
] as const;

export const HOMEPAGE_PILLAR_NOTE =
  "Foundation order is S1 → S3 → S2 → S0. Framework language supports the experience — it is not the product.";

export const HOMEPAGE_NOT_THIS = {
  eyebrow: "WHAT 1320 IS NOT",
  title: "A mirror — not a label",
  body: "1320 offers symbolic reflection and self-awareness support. It is designed to return agency to you — not increase dependency on external authority.",
  items: [
    "Not fortune-telling or fixed prediction",
    "Not personality typing or diagnosis",
    "Not astrology, tarot, or Human Design",
    "Not spiritual ranking or hierarchy",
    "Not a fixed destiny or life sentence",
  ],
  closing:
    "You remain the final authority of your life. 1320 offers reflection, not instruction. Your blueprint is a mirror, not a fixed identity.",
};

export const HOMEPAGE_HOW = {
  eyebrow: "HOW 1320 WORKS",
  title: "From recognition to integration",
  body: "1320 is designed to help you move from self-recognition into conscious choice. It does not define your fate. It gives language to the patterns, gifts, and mirrors already moving through your life.",
  steps: [
    {
      number: "01",
      title: "RECOGNIZE",
      text: "Name what you have always sensed — your design, gifts, and inner structure.",
      tone: "gold",
      image: "/how-1320-works/step-01.webp",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "02",
      title: "SEE THE PATTERN",
      text: "Observe the mirrors and reactions that shape your relationships and choices.",
      tone: "violet",
      image: "/how-1320-works/step-03.webp",
      sizeClass: "step-icon-larger",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "03",
      title: "CHOOSE DIFFERENTLY",
      text: "Align daily actions with what feels true — not what the pattern expects.",
      tone: "blue",
      image: "/how-1320-works/step-02.webp",
      sizeClass: "step-icon-smaller",
      frameClass: "",
      imageClass: "step-image-blue-tight",
    },
    {
      number: "04",
      title: "INTEGRATE",
      text: "Return to the awareness that was already within you — with practice and reflection.",
      tone: "teal",
      image: "/how-1320-works/step-04.webp",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
  ],
};

export const HOMEPAGE_MID_CTA = {
  headline: ["Your free layer opens the mirror.", "The Full Report continues the journey."],
  body: "The report begins the relationship. The Full Soul Origin Report expands into the complete S0–S9 Soul Blueprint — shadow, mission, value, sovereignty, contribution, and return path.",
  primaryCta: "GENERATE MY CODE",
  secondaryCta: "VIEW SAMPLE REPORT",
  secondaryHref: SAMPLE_REPORT_HREF,
};

export const HOMEPAGE_STATS = {
  items: [
    { value: "1320", label: "SOUL CODES" },
    { value: "S0–S9", label: "BLUEPRINT LAYERS" },
    { value: "4", label: "FOUNDATION CODES" },
    { value: "∞", label: "INTEGRATION PATHS" },
  ],
  supporting: "A reflective intelligence platform for symbolic self-awareness, relationship reflection, and conscious integration.",
};

export const HOMEPAGE_SECONDARY_LINKS = [
  { href: "/blueprint", label: "Explore the Blueprint" },
  { href: SAMPLE_REPORT_HREF, label: "View Sample Report" },
  { href: "/full-report", label: "Explore Full Report" },
] as const;

export const HOMEPAGE_FULL_REPORT_PREVIEW = {
  eyebrow: "GO DEEPER",
  title: "Explore the complete S0–S9 Soul Blueprint",
  transition:
    "The free layer names your foundation. The Full Report expands into advanced integration layers you can return to as your relationship with your blueprint deepens.",
  body: "The Full Soul Origin Report is a structured space for reflection, practice, and integration — not more labels, but applied understanding across your complete blueprint.",
  advancedLayers: [
    { code: "S4", title: "Core Shadow Pattern", detail: "Repeating patterns ready for compassionate awareness." },
    { code: "S5", title: "Soul Mission", detail: "Directional themes for contribution — symbolic orientation, not a fixed career command." },
    { code: "S6", title: "Value & Receiving", detail: "How you relate to worth, support, resources, and receiving." },
    { code: "S7", title: "Soul Sovereignty", detail: "Boundaries, choice, and self-authority as integration themes." },
    { code: "S8", title: "Soul Contribution", detail: "How your blueprint may express through contribution — not a measure of public success." },
    { code: "S9", title: "Return to Source", detail: "Return-path reflection — not a claim of spiritual superiority or final attainment." },
  ],
  includes: [
    {
      title: "Complete S0–S9 Soul Blueprint",
      detail: "Foundation layers plus S4–S9 advanced integration modules.",
    },
    {
      title: "Personalized 7-day integration practices",
      detail: "One focused practice per day across your full blueprint.",
    },
    {
      title: "Reflection journal and closing integration",
      detail: "Journal prompts and practices that support awareness before action.",
    },
    {
      title: "One-time purchase with account return access",
      detail: "After purchase, sign in to return to your report anytime.",
    },
  ],
  primaryCta: "EXPLORE FULL REPORT",
  primaryHref: "/full-report",
  checkoutCta: "UNLOCK FULL REPORT",
  checkoutHref: "/checkout",
  sampleCta: "VIEW SAMPLE REPORT",
  sampleHref: SAMPLE_REPORT_HREF,
  readingCta: "PERSONAL INTEGRATION SESSION",
  readingHref: "/booking",
};

export const HOMEPAGE_ABOUT_PREVIEW = {
  eyebrow: "ABOUT THE SYSTEM",
  title: "Reflection over prediction",
  body: [
    "1320 is a reflective intelligence platform built around the Soul Blueprint — four symbolic dimensions for clearer self-recognition.",
    "Not prediction or fixed destiny. A mirror to help you choose from a place of honesty.",
  ],
  cta: "ABOUT 1320",
  href: "/about-1320",
};

export const HOMEPAGE_FINAL_CTA = {
  lines: [
    "Ready to continue your blueprint?",
    "Begin with your birth date.",
    "Let the mirror open.",
  ],
  cta: "GENERATE MY CODE",
  trustNote: "Birth time and birth location are not required.",
  mantra: "YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.",
};

export const HOMEPAGE_FOOTER_BRAND =
  "1320 is a reflective intelligence platform built around the Soul Blueprint. It offers symbolic reflection for self-awareness and integration. It does not provide prediction, diagnosis, therapy, legal, financial, medical, or crisis advice.";

export const HOMEPAGE_ORIGIN = {
  eyebrow: "WHERE 1320 BEGAN",
  title: "Born from a Number. Built into a System.",
  body: [
    "1320 began with a number received in a quiet inner moment — and grew into a symbolic blueprint through human intuition and AI-supported design.",
    "Today it helps people build a deeper relationship with their own Soul Blueprint.",
  ],
  cta: "READ THE ORIGIN STORY",
  href: "/about-1320#origin-story",
};

export const FOOTER_ORIGIN = {
  founderLine:
    "Created by Nobu Isaki / 信伊咲 through a long co-creative process of symbolic inquiry, reflective design, and AI-supported system architecture.",
  microcopy:
    "1320 was human-originated and AI-supported — shaped through symbolic inquiry, reflective design, and governed implementation.",
  originHref: "/about-1320#origin-story",
  originLabel: "Origin Story",
};
