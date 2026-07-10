/** English copy for `/blueprint` — foundation layers S1→S3→S2→S0 (Addendum v1.0). */

export const BLUEPRINT_META = {
  title: "The Soul Blueprint",
  description:
    "Learn Soul Origin, Soul Vibration, Soul Mirror, and Void Gate — the four foundation layers of your 1320 Soul Blueprint.",
};

export const BLUEPRINT_HERO = {
  eyebrow: "THE SOUL BLUEPRINT",
  title: "Four Foundation Layers. One Living Mirror.",
  body: "Your Soul Blueprint begins with four foundation layers in the order S1 → S3 → S2 → S0. These layers do not define your fate — they offer a symbolic structure for self-recognition, reflection, and integration.",
};

export const BLUEPRINT_OVERVIEW = {
  title: "Your Four-Part Foundation",
  intro:
    "The 1320 system reads your birth structure through four independent layers in locked order: S1 → S3 → S2 → S0. Together they describe origin, expression, relationship mirrors, and how you meet the unknown.",
  layers: [
    { code: "S1", label: "Origin", text: "Soul Origin — the source pattern beneath adaptation." },
    { code: "S3", label: "Expression", text: "Soul Vibration — how your energy moves through lived experience." },
    { code: "S2", label: "Mirror", text: "Soul Mirror — what relationships and patterns reflect back to you." },
    { code: "S0", label: "Return", text: "Void Gate — uncertainty, transition, surrender, and clarity." },
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
      text: "Expression in motion — how energy becomes form in life.",
    },
    {
      digit: "2",
      name: "Duality",
      text: "The mirror — what relationships reveal about you.",
    },
    {
      digit: "0",
      name: "Emptiness",
      text: "The return — meeting uncertainty and the unknown.",
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
    headline: "S1 · Soul Origin",
    revealsTitle: "What S1 reveals",
    reveals: [
      "Your soul archetype and original frequency",
      "Core gifts and natural strengths",
      "Shadow patterns that repeat until integrated",
      "The life direction your soul is oriented toward",
    ],
    body: "S1 is the core of your blueprint. It describes the frequency you carried in before personality, role, or survival strategy — your origin pattern, not your résumé.",
    cta: "DISCOVER YOUR SOUL ORIGIN",
  },
  {
    segmentId: "s3",
    headline: "S3 · Soul Vibration",
    revealsTitle: "What S3 reveals",
    reveals: [
      "How your energy expresses day to day",
      "Your energetic rhythm and intensity",
      "Where growth asks for refinement, not force",
      "How others feel your presence in the world",
    ],
    body: "S3 is not a score or a rank. It describes how your natural frequency moves, expresses, and matures through lived experience — not spiritual hierarchy.",
    cta: "GENERATE MY SOUL VIBRATION",
  },
  {
    segmentId: "s2",
    headline: "S2 · Soul Mirror",
    revealsTitle: "What S2 reveals",
    reveals: [
      "Relationship patterns that repeat",
      "What relationships mirror back to you",
      "Emotional reflections asking for awareness",
      "Lessons connection is designed to surface",
    ],
    body: "S2 is about what relationships mirror — not who your destined partner is. It shows patterns relationships activate so you can choose from clarity.",
    cta: "DISCOVER MY SOUL MIRROR",
  },
  {
    segmentId: "s0",
    headline: "S0 · Void Gate",
    revealsTitle: "What S0 reveals",
    reveals: [
      "The core illusion you are learning to see",
      "How false identity blocks your return to clarity",
      "The path through uncertainty and transition",
      "Practices that return worth and presence inward",
    ],
    body: "S0 is the deepest gate. It is not a problem to fix — it is where you meet uncertainty, surrender, and the unknown with awareness.",
    cta: "DISCOVER MY VOID GATE",
  },
];

export const FOUR_TOGETHER = {
  title: "How the Four Layers Work Together",
  questions: [
    { code: "S1", q: "Who am I at origin?" },
    { code: "S3", q: "How does my energy express in life?" },
    { code: "S2", q: "What do my relationships mirror?" },
    { code: "S0", q: "How do I meet uncertainty and transition?" },
  ],
};

export const EXAMPLE_BLUEPRINT = {
  title: "Example Blueprint",
  code: "S1-18 / S3-03 / S2-27 / S0-07",
  s3Raw: "110",
  note: "Sample birth date 1980-05-22. S3 code S3-03 is the mapped tier; 110 is the S3 raw digit sum — for structure preview only.",
};

export const WHY_MATTERS = {
  title: "Why the Blueprint Matters",
  body: "Most people live inside patterns they cannot name. The Soul Blueprint gives language to what you already feel — so reflection becomes intentional, not accidental. These codes are not rankings, predictions, or fixed identity labels. They are symbolic mirrors for reflection.",
};

export const VS_IDENTITY = {
  title: "Blueprint vs Identity",
  body: "Your blueprint is not your identity. It is a symbolic mirror — a map for inquiry, not a box you must stay inside. You remain the chooser. The system returns agency to you.",
};

export const HOW_TO_READ = {
  title: "How to Read Your Result",
  steps: [
    "Receive your four foundation codes from your birth date (S1 → S3 → S2 → S0).",
    "Read each layer as a facet of one mirror — not four separate verdicts.",
    "Notice what feels true, what feels resistant, and what surprises you.",
    "Choose one small integration action from awareness — not from pressure.",
  ],
};

export const BLUEPRINT_PATH = {
  title: "The Soul Blueprint Path",
  steps: [
    { number: "01", title: "KNOW YOURSELF", text: "Understand your soul's original design and gifts." },
    { number: "02", title: "SEE YOUR PATTERNS", text: "Recognize expression, mirrors, and transitions with clarity." },
    { number: "03", title: "ALIGN & CREATE", text: "Live from integration rather than unconscious repetition." },
    { number: "04", title: "INTEGRATE & REMEMBER", text: "Return to presence — your blueprint is a mirror, not a sentence." },
  ],
};

export const BLUEPRINT_FAQ = [
  {
    q: "Is the Soul Blueprint fortune-telling?",
    a: "No. It is a reflective intelligence system. It offers symbolic reflection, not prediction or fixed fate.",
  },
  {
    q: "Do I need to believe in spirituality to use it?",
    a: "No. You need curiosity and willingness to reflect. The language is symbolic and grounded.",
  },
  {
    q: "Why S1 → S3 → S2 → S0 order?",
    a: "This is the locked foundation order in the 1320 system. A single label flattens the soul; four layers honor origin, expression, relationship mirror, and return as distinct facets.",
  },
  {
    q: "Is S3 a ranking or level?",
    a: "No. S3 describes how energy expresses through lived experience — not whether you are higher or lower than anyone else.",
  },
  {
    q: "Does S2 tell me who I will marry?",
    a: "No. S2 reflects relationship themes and mirrors — not destined partners or who you will attract.",
  },
  {
    q: "Is S0 negative?",
    a: "No. S0 is an awakening gate — how you meet uncertainty, transition, and the unknown.",
  },
  {
    q: "Can my code change?",
    a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
  },
  {
    q: "What should I do after reading the blueprint?",
    a: "Generate your code, read your free result, and choose one small action from awareness. Deeper layers live in the Full Report (S0–S9) and Personal Integration Session.",
  },
];

export const BLUEPRINT_DISCLAIMER =
  "1320 is a reflective intelligence platform for self-awareness and integration only. It is not medical, psychological, legal, or financial advice. You remain responsible for your choices.";
