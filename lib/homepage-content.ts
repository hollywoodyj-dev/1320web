/** Homepage copy — recognition-first, conversion-oriented (Wisewave Phase 1 addendum). */

import { SEGMENTS } from "@/lib/segments";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const HOMEPAGE_META = {
  title: "1320 Soul Code | Discover the Pattern You Keep Repeating",
  description:
    "Discover your 1320 Soul Code and see the patterns, gifts, and relational mirrors shaping your life. Private, reflective, and not fortune-telling.",
};

export const HOMEPAGE_HERO = {
  titleLines: ["Discover Your", "Soul Code"] as const,
  subheadline:
    "For the pattern you have always sensed but never had language for — your gifts, your mirrors, and the choices beneath them.",
  trustMicroLine: "Not your fate. Your mirror.",
  primaryCta: "See My Pattern",
  primaryHref: "#entry-panel",
  ctaSupportLine: "Your Soul Code begins with your birth date.",
  miniLabels: [
    { digit: "ORIGIN", label: "Who You Are" },
    { digit: "TRINITY", label: "How You Express" },
    { digit: "DUALITY", label: "Relationship Mirror" },
    { digit: "EMPTINESS", label: "How You Awaken" },
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

export const HOMEPAGE_CALCULATOR = {
  eyebrow: "START YOUR JOURNEY",
  titleLines: ["Discover Your", "1320 Soul Code"] as const,
  body: "Enter your birth date to see your four-part mirror — free, private, and reflective.",
  formLabel: "Enter your birth date",
  cta: "GENERATE MY CODE",
  trustNote: "Your data is private and secure.",
};

export const HOMEPAGE_BLUEPRINT_INTRO = {
  eyebrow: "YOUR 1320 BLUEPRINT",
  title: "Four mirrors. One soul story.",
  body: "Your free Soul Code names the pattern. Each dimension reveals a different facet of the same life you have been living — not four separate labels, but one integrated mirror.",
  mobileShort: "Four dimensions. One soul blueprint.",
};

const pillarMeta = Object.fromEntries(SEGMENTS.map((s) => [s.code, s]));

export const HOMEPAGE_PILLARS = [
  {
    code: "S1",
    title: "ORIGIN FREQUENCY",
    plainLanguage: "Who you are at your core — before roles, expectations, or adaptation.",
    headline: "Who You Are",
    text: "Understand why you naturally approach life the way you do — your innate gifts, inner structure, and sense of direction.",
    tone: "gold",
    learnMoreHref: pillarMeta.S1.learnMoreHref,
  },
  {
    code: "S3",
    title: "VIBRATION TIER",
    plainLanguage: "How your energy naturally expresses and matures over time.",
    headline: "How You Express",
    text: "See how your expression rhythm and strengths shape how you show up — and how others experience your presence.",
    tone: "violet",
    learnMoreHref: pillarMeta.S3.learnMoreHref,
  },
  {
    code: "S2",
    title: "MIRROR PATH",
    plainLanguage: "The relational pattern that keeps appearing in your connections and what repeats.",
    headline: "Relationship Mirror",
    text: "Notice why certain dynamics return — and what your relationships have been mirroring back to you all along.",
    tone: "blue",
    learnMoreHref: pillarMeta.S2.learnMoreHref,
  },
  {
    code: "S0",
    title: "VOID GATE",
    plainLanguage:
      "The inner pattern that often appears during uncertainty, transition, and change.",
    headline: "How You Awaken",
    text: "Recognize the illusion that dims your clarity — and the path back to grounded choice when life feels unclear.",
    tone: "teal",
    learnMoreHref: pillarMeta.S0.learnMoreHref,
  },
] as const;

export const HOMEPAGE_PILLAR_NOTE =
  "Each symbolic term above is paired with everyday language — so you can feel the mirror before learning the system.";

export const HOMEPAGE_NOT_THIS = {
  eyebrow: "WHAT 1320 IS NOT",
  title: "A mirror — not a label",
  body: "1320 is symbolic self-awareness. It is designed to reduce hesitation, not increase it.",
  items: [
    "Not personality typing",
    "Not astrology",
    "Not Human Design",
    "Not fortune telling",
    "Not a fixed destiny or life sentence",
  ],
  closing:
    "You remain the author of your choices. The report reflects patterns — it does not predict outcomes or replace professional advice.",
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
  headline: ["Your code shows what.", "The Full Report explores why."],
  body: "Your free result names the pattern. The Full Soul Origin Report is the bridge between recognition and understanding — shadow, mission, integration, and return.",
  primaryCta: "GENERATE MY CODE",
  secondaryCta: "VIEW SAMPLE REPORT",
  secondaryHref: SAMPLE_REPORT_HREF,
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

export const HOMEPAGE_SECONDARY_LINKS = [
  { href: "/blueprint", label: "Explore the Blueprint" },
  { href: SAMPLE_REPORT_HREF, label: "View Sample Report" },
] as const;

export const HOMEPAGE_FULL_REPORT_PREVIEW = {
  eyebrow: "GO DEEPER",
  title: "When you are ready for the full mirror",
  transition:
    "My code explains what. Now I want to understand why — how this pattern moves through identity, relationships, shadow, and purpose.",
  body: "The Full Soul Origin Report (~32 pages) is not more labels. It is a structured space for reflection, practice, and integration you can return to as you grow.",
  includes: [
    {
      title: "Reflection questions tied to your codes",
      detail: "Journal prompts for S1–S9 so insight becomes daily choice.",
    },
    {
      title: "Personalized 7-day integration practices",
      detail: "One focused practice per day across your full S0–S9 blueprint.",
    },
    {
      title: "Relationship pattern maps",
      detail: "See why certain dynamics repeat — and where conscious choice enters.",
    },
    {
      title: "Shadow loop and growth-edge exercises",
      detail: "Gentle awareness of your core pattern without diagnosis or prediction.",
    },
    {
      title: "Soul mission and value-receiving lenses",
      detail: "Direction and receiving patterns — self-awareness only, not financial advice.",
    },
  ],
  waitlistCta: "EXPLORE FULL REPORT",
  waitlistHref: "/full-report",
  sampleCta: "SEE FREE SAMPLE FIRST",
  sampleHref: SAMPLE_REPORT_HREF,
  readingCta: "PERSONAL INTEGRATION SESSION",
  readingHref: "/booking",
};

export const HOMEPAGE_ABOUT_PREVIEW = {
  eyebrow: "ABOUT THE SYSTEM",
  title: "Language for what you already sense",
  body: [
    "1320 Soul Origin Code System is a frequency-based self-awareness framework — four symbolic dimensions that help you see your soul structure with more clarity.",
    "It is not a prediction system. It is not a fixed destiny map. It is not here to tell you who you are allowed to become.",
    "It is here to help you remember what is already within you — and choose from that place with more honesty.",
  ],
  cta: "ABOUT 1320",
  href: "/about-1320",
};

export const HOMEPAGE_FINAL_CTA = {
  lines: [
    "You came here for a reason.",
    "Begin with your birth date.",
    "Let the mirror open.",
  ],
  cta: "GENERATE MY CODE",
  trustNote: "Your data is private and secure.",
  mantra: "YOU ARE NOT HERE BY ACCIDENT. YOU CAME TO REMEMBER.",
};

export const HOMEPAGE_FOOTER_BRAND =
  "1320 Soul Origin Code System is a soul intelligence system for self-awareness, relationship reflection, and conscious evolution.";
