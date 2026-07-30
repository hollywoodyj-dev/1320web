/** Homepage copy — Refinement Spec v1.0 (Wisewave). */

import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const HOMEPAGE_META = {
  title: "1320 Soul Code | Meet Your Soul Blueprint",
  description:
    "1320 is a reflective intelligence platform built around the Soul Blueprint. Generate your symbolic birth-date blueprint — a mirror for self-recognition, not prediction.",
};

export const HOMEPAGE_HERO = {
  eyebrow: "1320 Soulcode",
  titleLines: ["Meet Your", "Soul Blueprint"] as const,
  subheadline:
    "A reflective intelligence platform for remembering who you are beneath adaptation.",
  mirrorLines: ["Not your fate.", "Not your label.", "Your mirror."] as const,
  primaryCta: "Generate My Code",
  primaryHref: "#entry-panel",
  secondaryCta: "View Sample Report",
  secondaryHref: SAMPLE_REPORT_HREF,
};

export const HOMEPAGE_WHAT_IS = {
  eyebrow: "WHAT IS 1320?",
  title: "What is 1320?",
  body: [
    "1320 is a reflective intelligence system built around your Soul Blueprint.",
    "It uses your birth date as a symbolic mirror for self-recognition, relationship reflection, and integration.",
    "It does not predict your future. It helps you meet yourself more clearly.",
  ],
  definitionLink: {
    href: "/what-is-a-soul-blueprint",
    label: "What is a Soul Blueprint?",
  },
};

export const HOMEPAGE_CALCULATOR = {
  title: "Start with your birth date",
  body: "Your birth date opens the symbolic structure of your Soul Blueprint.",
  formLabel: "Enter your birth date",
  cta: "Generate My Code",
};

export const HOMEPAGE_BLUEPRINT_INTRO = {
  eyebrow: "YOUR FOUNDATION",
  title: "Your Four Foundation Mirrors",
  body: "Your Soul Blueprint begins with four mirrors: origin, expression, relationship, and return.",
};

export const HOMEPAGE_PILLARS = [
  {
    code: "S1",
    title: "SOUL ORIGIN",
    headline: "S1 · Soul Origin",
    text: "Who you are beneath adaptation.",
    tone: "gold",
  },
  {
    code: "S3",
    title: "SOUL VIBRATION",
    headline: "S3 · Soul Vibration",
    text: "How your essence naturally expresses.",
    tone: "violet",
  },
  {
    code: "S2",
    title: "SOUL MIRROR",
    headline: "S2 · Soul Mirror",
    text: "What relationships reflect back to you.",
    tone: "blue",
  },
  {
    code: "S0",
    title: "VOID GATE",
    headline: "S0 · Void Gate",
    text: "How you meet the unknown and return to self.",
    tone: "teal",
  },
] as const;

export const HOMEPAGE_NOT_THIS = {
  eyebrow: "BOUNDARY",
  title: "A mirror — not a label.",
  body: [
    "1320 is symbolic reflection, not prediction, diagnosis, therapy, or professional advice.",
    "Your blueprint is not a box. It is a mirror for awareness, choice, and integration.",
  ],
  cta: "Read Full Disclaimer",
  href: "/disclaimer",
};

export const HOMEPAGE_HOW = {
  eyebrow: "THE PATH",
  title: "From Recognition to Integration",
  body: "1320 does not end with a report. It begins with recognition, then supports reflection, integration, and lived expression.",
  steps: [
    {
      number: "01",
      title: "RECOGNIZE",
      text: "Meet your original pattern.",
      tone: "gold",
      image: "/how-1320-works/step-01.webp",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "02",
      title: "REFLECT",
      text: "See what life mirrors back.",
      tone: "violet",
      image: "/how-1320-works/step-03.webp",
      sizeClass: "step-icon-larger",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "03",
      title: "INTEGRATE",
      text: "Turn insight into practice.",
      tone: "blue",
      image: "/how-1320-works/step-02.webp",
      sizeClass: "step-icon-smaller",
      frameClass: "",
      imageClass: "step-image-blue-tight",
    },
    {
      number: "04",
      title: "EMBODY",
      text: "Live your blueprint with more clarity.",
      tone: "teal",
      image: "/how-1320-works/step-04.webp",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
  ],
};

export const HOMEPAGE_FULL_REPORT_PREVIEW = {
  eyebrow: "FULL REPORT",
  title: "Explore the Complete S0–S9 Soul Blueprint",
  body: "The Full Report expands your foundation into shadow, mission, value, sovereignty, contribution, and return. It is designed as a guided mirror for deeper reflection — not a fixed identity reading.",
  moduleGroups: [
    {
      label: "Foundation",
      codes: "S1 · S3 · S2 · S0",
    },
    {
      label: "Integration",
      codes: "S4 · S5 · S6",
    },
    {
      label: "Evolution",
      codes: "S7 · S8 · S9",
    },
  ],
  advancedLayers: [
    { code: "S4", title: "Core Shadow Pattern", detail: "What still asks to be seen." },
    { code: "S5", title: "Soul Mission", detail: "What your life is here to express." },
    { code: "S6", title: "Value & Receiving", detail: "How you relate to worth, support, and receiving." },
    { code: "S7", title: "Soul Sovereignty", detail: "How you return to inner authority." },
    { code: "S8", title: "Soul Contribution", detail: "How your presence contributes." },
    { code: "S9", title: "Return to Source", detail: "How you return to wholeness." },
  ],
  checkoutCta: "Unlock Full Report",
  checkoutHref: "/checkout",
  sampleCta: "View Sample Report",
  sampleHref: SAMPLE_REPORT_HREF,
};

export const HOMEPAGE_REFLECTION = {
  eyebrow: "BOUNDARY",
  title: "Reflection over prediction.",
  body: [
    "1320 is not here to tell you what will happen.",
    "It is here to help you see what is already moving within you — so your next choice can come from clarity, not fear.",
  ],
};

export const HOMEPAGE_FINAL_CTA = {
  headline: "Begin with your Soul Blueprint.",
  body: "Enter your birth date and receive your first mirror.",
  cta: "Generate My Code",
  trustNote: "No prediction. No diagnosis. A symbolic mirror for reflection.",
  mantra: "YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.",
};

export const HOMEPAGE_FOOTER_BRAND =
  "1320 is a reflective intelligence platform built around the Soul Blueprint — a symbolic mirror for self-recognition, reflection, and integration.";

export const HOMEPAGE_ORIGIN = {
  eyebrow: "ORIGIN",
  title: "Born from a Number. Built into a System.",
  body: [
    "1320 began with a number received in a quiet inner moment.",
    "Over time, that number unfolded into a symbolic blueprint — and through a long co-creative process between human intuition and AI-supported system design, it became a structured reflective intelligence platform.",
  ],
  cta: "Read the Origin Story",
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
