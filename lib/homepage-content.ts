/** Homepage copy — 2/15 English source of truth (layout/images unchanged). */

import { SEGMENTS } from "@/lib/segments";

export const HOMEPAGE_META = {
  title: "1320 Soul Code | Discover Your Soul Origin Code",
  description:
    "Discover your 1320 Soul Code through a four-part soul blueprint: Origin Frequency, Vibration Tier, Mirror Path, and Void Gate. A self-awareness system for remembering your gifts, patterns, and path of conscious evolution.",
};

export const HOMEPAGE_NAV = [
  { href: "/", label: "HOME" },
  { href: "/about-1320", label: "ABOUT 1320" },
  { href: "/your-code", label: "YOUR CODE" },
  { href: "/blueprint", label: "BLUEPRINT" },
  { href: "/faq", label: "RESOURCES" },
  { href: "/about-1320", label: "ABOUT US" },
] as const;

export const HOMEPAGE_HERO = {
  eyebrow: "CODE YOUR ORIGIN",
  titleLines: ["REMEMBER", "YOUR SOUL"] as const,
  subheadline:
    "1320 Soul Origin Code System reveals your soul's original frequency, your gifts, your relational mirrors, and the awakening path within your life.",
  primaryCta: "GENERATE MY CODE",
  secondaryCta: "EXPLORE THE BLUEPRINT",
  secondaryHref: "/blueprint",
  trustNote: "Your data is private and secure.",
  groundedNote:
    "1320 is a frequency-based self-awareness framework built around S1, S3, S2, and S0 — not astrology, tarot, religion, or deterministic fortune-telling.",
  miniLabels: [
    { digit: "ORIGIN", label: "Who You Are" },
    { digit: "TRINITY", label: "How You Express" },
    { digit: "DUALITY", label: "Who You Attract" },
    { digit: "EMPTINESS", label: "How You Awaken" },
  ],
};

export const HOMEPAGE_CALCULATOR = {
  eyebrow: "START YOUR JOURNEY",
  titleLines: ["Discover Your", "1320 Soul Code"] as const,
  body: "Enter your birth date to unlock your four-part soul blueprint.",
  formLabel: "ENTER YOUR BIRTH DATE",
  cta: "GENERATE MY CODE",
  trustNote: "Your data is private and secure.",
};

export const HOMEPAGE_BLUEPRINT_INTRO = {
  eyebrow: "YOUR 1320 BLUEPRINT",
  title: "The Four Dimensions of Your Soul",
  body: "Your 1320 Soul Code is formed through four core dimensions: your original frequency, your energetic expression, your relational mirror, and your awakening path.",
  mobileShort: "Four dimensions. One soul blueprint.",
};

const pillarMeta = Object.fromEntries(SEGMENTS.map((s) => [s.code, s]));

export const HOMEPAGE_PILLARS = [
  {
    code: "S1",
    title: "ORIGIN FREQUENCY",
    headline: "Who You Are",
    text: "Your soul archetype, core gifts, inner strength, and life direction.",
    tone: "gold",
    learnMoreHref: pillarMeta.S1.learnMoreHref,
  },
  {
    code: "S3",
    title: "VIBRATION TIER",
    headline: "How You Express",
    text: "Your energy expression, strength, spiritual maturity, and frequency layer.",
    tone: "violet",
    learnMoreHref: pillarMeta.S3.learnMoreHref,
  },
  {
    code: "S2",
    title: "MIRROR PATH",
    headline: "Who You Attract",
    text: "Your relationship patterns, attraction dynamics, emotional mirrors, and soul lessons.",
    tone: "blue",
    learnMoreHref: pillarMeta.S2.learnMoreHref,
  },
  {
    code: "S0",
    title: "VOID GATE",
    headline: "How You Awaken",
    text: "Your inner challenges, illusion patterns, awakening door, and path back to clarity.",
    tone: "teal",
    learnMoreHref: pillarMeta.S0.learnMoreHref,
  },
] as const;

export const HOMEPAGE_PILLAR_NOTE =
  "S1 represents the core Origin Frequency, S3 represents energetic expression, S2 represents relational mirror patterns, and S0 represents the awakening path or Void Gate.";

export const HOMEPAGE_HOW = {
  eyebrow: "HOW 1320 WORKS",
  title: "A Path of Awareness and Integration",
  body: "1320 is designed to help you move from self-recognition into conscious choice. It does not define your fate. It gives language to the patterns, gifts, and mirrors already moving through your life.",
  steps: [
    {
      number: "01",
      title: "KNOW YOURSELF",
      text: "Recognize your original design, gifts, and inner structure.",
      tone: "gold",
      image: "/how-1320-works/step-01.png",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "02",
      title: "SEE YOUR PATTERNS",
      text: "Observe the patterns, mirrors, and reactions that shape your life.",
      tone: "violet",
      image: "/how-1320-works/step-03.png",
      sizeClass: "step-icon-larger",
      frameClass: "",
      imageClass: "",
    },
    {
      number: "03",
      title: "ALIGN & CREATE",
      text: "Choose actions that reflect your deeper truth and direction.",
      tone: "blue",
      image: "/how-1320-works/step-02.png",
      sizeClass: "step-icon-smaller",
      frameClass: "",
      imageClass: "step-image-blue-tight",
    },
    {
      number: "04",
      title: "INTEGRATE & REMEMBER",
      text: "Return to the awareness that was already within you.",
      tone: "teal",
      image: "/how-1320-works/step-04.png",
      sizeClass: "",
      frameClass: "",
      imageClass: "",
    },
  ],
};

export const HOMEPAGE_MID_CTA = {
  headline: ["Your code is not a sentence.", "It is a mirror."],
  body: "Your 1320 Soul Code does not tell you who you must become. It helps you see what has always been moving beneath the surface: your gifts, your patterns, your relational field, and your path of return.",
  primaryCta: "GENERATE MY CODE",
  secondaryCta: "VIEW SAMPLE REPORT",
  secondaryHref: "/sample-report",
};

export const HOMEPAGE_STATS = {
  items: [
    { value: "1320", label: "SOUL CODES" },
    { value: "50+", label: "RELATIONSHIP PATHS" },
    { value: "20", label: "VOID GATES" },
    { value: "∞", label: "POSSIBILITIES" },
  ],
  supporting: "A symbolic system for self-awareness, relationship reflection, and conscious evolution.",
};

export const HOMEPAGE_FULL_REPORT_PREVIEW = {
  eyebrow: "GO DEEPER",
  title: "Unlock Your Full 1320 Soul Origin Report",
  body: "The free result gives you a first glimpse of your four-part code. The full report expands your blueprint into deeper interpretation, reflection prompts, relationship insight, and integration guidance.",
  includes: [
    "Full S1 Origin Frequency Interpretation",
    "S3 Vibration Tier Reading",
    "S2 Mirror Path Relationship Analysis",
    "S0 Void Gate Awakening Pattern",
    "Integrated Soul Blueprint Summary",
    "Reflection Prompts",
    "Integration Guidance",
  ],
  primaryCta: "JOIN THE FULL REPORT WAITLIST",
  primaryHref: "/full-report",
  secondaryCta: "BOOK A 1320 READING",
  secondaryHref: "/booking",
};

export const HOMEPAGE_ABOUT_PREVIEW = {
  eyebrow: "ABOUT THE SYSTEM",
  title: "A Soul Intelligence System for a New Era of Awakening",
  body: [
    "1320 Soul Origin Code System is a frequency-based self-awareness framework created to help you understand your soul structure through four symbolic dimensions.",
    "It is not a prediction system. It is not a fixed destiny map. It is not here to tell you who you are allowed to become.",
    "It is here to help you remember what is already within you — and choose from that place with more clarity.",
  ],
  cta: "ABOUT 1320",
  href: "/about-1320",
};

export const HOMEPAGE_FINAL_CTA = {
  lines: ["Begin with your birth date.", "Discover your 1320 Soul Code.", "Let the mirror open."],
  cta: "GENERATE MY CODE",
  trustNote: "Your data is private and secure.",
  mantra: "YOU ARE NOT HERE BY ACCIDENT. YOU CAME TO REMEMBER.",
};

export const HOMEPAGE_FOOTER_BRAND =
  "1320 Soul Origin Code System is a soul intelligence system for self-awareness, relationship reflection, and conscious evolution.";
