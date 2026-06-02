/** English copy for `/blueprint` — structure per 8/15 handoff. */

export const BLUEPRINT_META = {
  title: "The 1320 Blueprint",
  description:
    "Learn Origin Frequency, Vibration Tier, Mirror Path, and Void Gate — the four dimensions of your 1320 Soul Origin Code.",
};

export const BLUEPRINT_HERO = {
  eyebrow: "THE 1320 BLUEPRINT",
  title: "Four Dimensions. One Soul Code.",
  body: "Your birth date opens a four-part soul blueprint — not a label, but a mirror for awareness, reflection, and conscious integration.",
};

export const BLUEPRINT_OVERVIEW = {
  title: "Your Four-Part Blueprint",
  intro: "The 1320 system reads your birth structure through four independent layers. Together they describe who you are, how you express, what you mirror in relationship, and how you return to clarity.",
  layers: [
    { code: "S1", label: "Core", text: "Origin Frequency — your soul archetype and life axis." },
    { code: "S3", label: "Expression", text: "Vibration Tier — how your energy moves in the world." },
    { code: "S2", label: "Mirror", text: "Mirror Path — relationship patterns that activate growth." },
    { code: "S0", label: "Return", text: "Void Gate — the illusion you are here to see through." },
  ],
};

export const MEANING_1320 = {
  title: "The Meaning of 1320",
  blocks: [
    {
      digit: "1",
      name: "Origin",
      text: "The source pattern — who you are beneath adaptation.",
    },
    {
      digit: "3",
      name: "Trinity",
      text: "Expression in motion — how energy becomes form.",
    },
    {
      digit: "2",
      name: "Duality",
      text: "The mirror — what relationships reveal about you.",
    },
    {
      digit: "0",
      name: "Emptiness",
      text: "The return — awakening through the void of false identity.",
    },
  ],
};

export type BlueprintSegmentBlock = {
  segmentId: "s1" | "s3" | "s2" | "s0";
  headline: string;
  revealsTitle: string;
  reveals: string[];
  body: string;
  cta: string;
};

export const SEGMENT_BLOCKS: BlueprintSegmentBlock[] = [
  {
    segmentId: "s1",
    headline: "Who You Are",
    revealsTitle: "What S1 reveals",
    reveals: [
      "Your soul archetype and original frequency",
      "Core gifts and natural strengths",
      "Shadow patterns that repeat until integrated",
      "The life direction your soul is oriented toward",
    ],
    body: "S1 is the core of your code. It describes the frequency you carried in before personality, role, or survival strategy — your origin pattern, not your résumé.",
    cta: "DISCOVER YOUR ORIGIN FREQUENCY",
  },
  {
    segmentId: "s3",
    headline: "How You Express",
    revealsTitle: "What S3 reveals",
    reveals: [
      "How your energy expresses day to day",
      "Your energetic rhythm and intensity",
      "Where growth asks for refinement, not force",
      "How others feel your presence in the world",
    ],
    body: "S3 is not a score or a rank. It describes the tier through which your vibration moves — expression, not superiority.",
    cta: "GENERATE MY VIBRATION TIER",
  },
  {
    segmentId: "s2",
    headline: "Who You Attract",
    revealsTitle: "What S2 reveals",
    reveals: [
      "Relationship patterns that repeat",
      "What you magnetize and what magnetizes you",
      "Emotional mirrors asking for awareness",
      "Lessons relationships are designed to surface",
    ],
    body: "S2 is about relational mirrors — not who your destined partner is. It shows the patterns relationships activate so you can choose from clarity.",
    cta: "DISCOVER MY MIRROR PATH",
  },
  {
    segmentId: "s0",
    headline: "How You Awaken",
    revealsTitle: "What S0 reveals",
    reveals: [
      "The core illusion you are learning to see",
      "How false identity blocks your return to clarity",
      "The awakening path unique to your code",
      "Practices that return worth and presence inward",
    ],
    body: "S0 is the deepest gate. It is not a problem to fix — it is the entry point where illusion dissolves and awareness becomes choice.",
    cta: "DISCOVER MY VOID GATE",
  },
];

export const FOUR_TOGETHER = {
  title: "How the Four Codes Work Together",
  questions: [
    { code: "S1", q: "Who am I at origin?" },
    { code: "S3", q: "How does my energy express?" },
    { code: "S2", q: "What do my relationships mirror?" },
    { code: "S0", q: "What illusion am I here to awaken through?" },
  ],
};

export const EXAMPLE_BLUEPRINT = {
  title: "Example Blueprint",
  code: "S1-18 / S3-110 / S2-27 / S0-07",
  note: "Sample birth date 1980-05-22 — fictional preview for structure and tone only.",
};

export const WHY_MATTERS = {
  title: "Why the Blueprint Matters",
  body: "Most people live inside patterns they cannot name. The blueprint gives language to what you already feel — so reflection becomes intentional, not accidental. It supports integration, not dependency on external authority.",
};

export const VS_IDENTITY = {
  title: "Blueprint vs Identity",
  body: "Your code is not your identity. It is a symbolic mirror — a map for inquiry, not a box you must stay inside. You remain the chooser. The system returns agency to you.",
};

export const HOW_TO_READ = {
  title: "How to Read Your Result",
  steps: [
    "Receive your four codes from your birth date.",
    "Read each segment as a layer — S1 core, S3 expression, S2 mirror, S0 return.",
    "Notice what feels true, what feels resistant, and what surprises you.",
    "Choose one small integration action from awareness — not from pressure.",
  ],
};

export const BLUEPRINT_PATH = {
  title: "The 1320 Blueprint Path",
  steps: [
    { number: "01", title: "KNOW YOURSELF", text: "Understand your soul's original design and gifts." },
    { number: "02", title: "SEE YOUR PATTERNS", text: "Recognize expression, mirrors, and illusions with clarity." },
    { number: "03", title: "ALIGN & CREATE", text: "Live from integration rather than unconscious repetition." },
    { number: "04", title: "INTEGRATE & REMEMBER", text: "Return to presence — your code is a mirror, not a sentence." },
  ],
};

export const BLUEPRINT_FAQ = [
  {
    q: "Is the 1320 Blueprint fortune-telling?",
    a: "No. It is a frequency-based self-awareness system. It offers reflection, not prediction or fixed fate.",
  },
  {
    q: "Do I need to believe in spirituality to use it?",
    a: "No. You need curiosity and willingness to reflect. The language is symbolic and grounded.",
  },
  {
    q: "Why four segments instead of one number?",
    a: "A single label flattens the soul. S1–S0 honor origin, expression, relationship mirror, and awakening as distinct layers.",
  },
  {
    q: "Is S3 a ranking or level?",
    a: "No. S3 describes how energy expresses — not whether you are higher or lower than anyone else.",
  },
  {
    q: "Does S2 tell me who I will marry?",
    a: "No. S2 describes relational mirrors and patterns — not destined partners.",
  },
  {
    q: "Is S0 negative?",
    a: "No. S0 is an awakening gate — the place where illusion becomes visible so you can choose clarity.",
  },
  {
    q: "Can my code change?",
    a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
  },
  {
    q: "What should I do after reading the blueprint?",
    a: "Generate your code, read your free result, and choose one small action from awareness. Deeper layers live in the full report and reading spaces.",
  },
];

export const BLUEPRINT_DISCLAIMER =
  "1320 is for self-awareness and reflection only. It is not medical, psychological, legal, or financial advice. You remain responsible for your choices.";
