/** Blueprint page copy — Refinement Spec v1.0 (Wisewave). */

import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const BLUEPRINT_META = {
  title: "The Soul Blueprint",
  description:
    "Your Soul Blueprint begins with four foundation mirrors: origin, expression, relationship, and return — in the order 1 → 3 → 2 → 0.",
};

export const BLUEPRINT_HERO = {
  eyebrow: "The Soul Blueprint",
  title: "Four Foundation Layers.\nOne Living Mirror.",
  body: "Your Soul Blueprint begins with four foundation mirrors: origin, expression, relationship, and return.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "What is a Soul Blueprint?",
  secondaryHref: "/what-is-a-soul-blueprint",
  tertiaryCta: "View Sample Report",
  tertiaryHref: SAMPLE_REPORT_HREF,
};

export const BLUEPRINT_OVERVIEW = {
  title: "Your Four-Part Foundation",
  intro: "1320 begins with four mirrors that reveal how your blueprint moves through life.",
  layers: [
    { code: "1", label: "Soul Origin", text: "Who you are beneath adaptation." },
    { code: "3", label: "Soul Vibration", text: "How your essence naturally expresses." },
    { code: "2", label: "Soul Mirror", text: "What relationships reflect back to you." },
    { code: "0", label: "Void Gate", text: "How you meet the unknown and return to self." },
  ],
};

export const MEANING_1320 = {
  title: "The Meaning of 1320",
  body: [
    "1320 is not a random number.",
    "It is a symbolic sequence that begins with origin, moves through expression and relationship, and returns through the unknown.",
  ],
  blocks: [
    { digit: "1", name: "Soul Origin", mystic: "Origin", text: "The source pattern beneath adaptation." },
    { digit: "3", name: "Soul Vibration", mystic: "Expression", text: "How your essence moves into expression." },
    { digit: "2", name: "Soul Mirror", mystic: "Relationship", text: "What relationships reflect back to you." },
    { digit: "0", name: "Void Gate", mystic: "Return", text: "How you meet uncertainty and return to self." },
  ],
};

export type BlueprintSegmentBlock = {
  segmentId: "s1" | "s3" | "s2" | "s0";
  headline: string;
  essence: string;
  tagline: string;
  revealsTitle: string;
  reveals: string[];
  body: string;
  cta: string;
};

export const SEGMENT_BLOCKS: BlueprintSegmentBlock[] = [
  {
    segmentId: "s1",
    headline: "S1 · Soul Origin",
    essence: "Origin Frequency",
    tagline: "Who You Are",
    revealsTitle: "What it reveals",
    reveals: ["Your natural essence.", "Your core gift.", "The direction your soul remembers."],
    body: "Your S1 reveals the source pattern beneath adaptation — the original frequency you carry before survival, pressure, or performance.",
    cta: "Discover Your Soul Origin",
  },
  {
    segmentId: "s3",
    headline: "S3 · Soul Vibration",
    essence: "Vibration Tier",
    tagline: "How You Express",
    revealsTitle: "What it reveals",
    reveals: ["Your natural rhythm.", "Your expression style.", "How your frequency moves through the world."],
    body: "Your S3 reveals how your essence moves into expression — how your energy, creativity, and presence become visible in life.",
    cta: "Generate My Soul Vibration",
  },
  {
    segmentId: "s2",
    headline: "S2 · Soul Mirror",
    essence: "Relationship Mirror",
    tagline: "What Relationships Reflect",
    revealsTitle: "What it reveals",
    reveals: ["Recurring relational lessons.", "Projection patterns.", "The mirror life keeps offering."],
    body: "Your S2 reveals what relationships mirror back to you — the patterns, lessons, and reflections that help you see yourself more clearly.",
    cta: "Discover My Soul Mirror",
  },
  {
    segmentId: "s0",
    headline: "S0 · Void Gate",
    essence: "Return Portal",
    tagline: "How You Return",
    revealsTitle: "What it reveals",
    reveals: ["Your relationship with uncertainty.", "Your surrender edge.", "The doorway back to inner truth."],
    body: "Your S0 reveals how you meet uncertainty, transition, emptiness, and the unknown — and how you return to yourself.",
    cta: "Discover My Void Gate",
  },
];

export const FOUR_TOGETHER = {
  title: "How the Four Layers Work Together",
  questions: [
    { code: "S1", q: "Who am I beneath adaptation?" },
    { code: "S3", q: "How does my essence express in life?" },
    { code: "S2", q: "What do my relationships mirror?" },
    { code: "S0", q: "How do I meet uncertainty and return?" },
  ],
  closing: "Together, they form the foundation of your Soul Blueprint.",
};

export const EXAMPLE_BLUEPRINT = {
  title: "Example Blueprint",
  intro: "A sample result may look like:",
  codes: [
    "S1-18 · Soul Origin",
    "S3-03 · Soul Vibration",
    "S2-27 · Soul Mirror",
    "S0-07 · Void Gate",
  ],
  note: "These four codes form your foundation. The Full Report expands this foundation into S4–S9.",
  cta: "View Sample Report",
  href: SAMPLE_REPORT_HREF,
  fullReportHref: "/full-report",
  fullReportLabel: "Explore the Full Soul Blueprint Report",
  freeBlueprintHref: "/free-soul-blueprint",
  freeBlueprintLabel: "Generate your Free Soul Blueprint",
  lifePathHref: "/what-is-my-life-path-number",
  lifePathLabel: "Calculate your Life Path Number",
};

export const VS_IDENTITY = {
  title: "Blueprint vs Identity",
  body: [
    "Your blueprint is not your identity.",
    "It is a symbolic mirror — a way to reflect, recognize, and integrate.",
    "You remain the chooser. You remain the authority of your life.",
  ],
};

export const BLUEPRINT_FINAL_CTA = {
  title: "Ready to See Your Blueprint?",
  body: "Enter your birth date to generate your personal four-part code.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "View Sample Report",
  secondaryHref: SAMPLE_REPORT_HREF,
};

export const BLUEPRINT_FAQ_PREVIEW = {
  title: "FAQ",
  items: [
    {
      q: "Is the Soul Blueprint fixed or changeable?",
      a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
    },
    {
      q: "Do I need to believe in spirituality to use it?",
      a: "No. You need curiosity and willingness to reflect. The language is symbolic and grounded.",
    },
    {
      q: "Why is the order 1 → 3 → 2 → 0?",
      a: "This is the locked foundation order in the 1320 system — origin, expression, relationship mirror, and return as distinct facets of one living mirror.",
    },
    {
      q: "What should I do after receiving my blueprint?",
      a: "Read each code as a mirror, not a verdict. Notice what feels true. Let insight become reflection — then generate deeper layers via the Full Report when ready.",
    },
  ],
  cta: "View Full FAQ",
  href: "/faq",
};

export const BLUEPRINT_DISCLAIMER =
  "1320 is a reflective intelligence platform for self-awareness and integration only. It is not medical, psychological, legal, or financial advice. You remain responsible for your choices.";
