/** Page 01 · What Is a Soul Blueprint? — body sections (Content & SEO Spec v1.0) */

export type Page01Foundation = {
  code: string;
  title: string;
  body: string;
};

export type Page01Layer = {
  code: string;
  title: string;
  body: string;
};

export const PAGE01_MEANING = {
  id: "meaning",
  title: "What Does “Soul Blueprint” Mean?",
  paragraphs: [
    "Within 1320, a Soul Blueprint is a structured symbolic mirror.",
    "It offers language for exploring how your original pattern may move through expression, relationships, uncertainty, protective habits, purpose, value, sovereignty, contribution, and return.",
    "The word “blueprint” does not mean that your life has already been decided.",
    "It means that certain patterns may provide a foundation for reflection. How you understand them, respond to them, and live them remains dynamic.",
    "Your Blueprint may stay relatively stable as a symbolic foundation. Your relationship with it can continue to change.",
  ],
  highlight: ["Blueprint is the foundation.", "Expression is how that foundation is being lived today."],
};

export const PAGE01_MAP_NOT_LABEL = {
  id: "map-not-label",
  title: "A Soul Blueprint Is a Map—Not a Label",
  paragraphs: [
    "Many systems try to answer the question:",
    "“What type of person am I?”",
    "A Soul Blueprint asks a different question:",
    "“What patterns may be present, and how am I relating to them now?”",
    "This difference matters.",
    "A label can easily become something a person performs, resists, or uses to limit themselves. A reflective map is meant to remain open.",
    "You may recognise parts of your Blueprint immediately. Other parts may become clearer through relationships, choices, challenges, and different stages of life.",
    "The purpose is not to make every sentence feel true.",
    "The purpose is to notice what creates honest recognition and meaningful reflection.",
  ],
  quote: "Your Blueprint is a mirror—not a fixed identity.",
};

export const PAGE01_FOUNDATIONS = {
  id: "foundations",
  title: "Where Does a 1320 Soul Blueprint Begin?",
  intro:
    "The Free Soul Blueprint begins with four Foundation Mirrors in a fixed sequence:",
  sequence: "S1 → S3 → S2 → S0",
  sequenceNote: "This required order must never be changed.",
  items: [
    {
      code: "S1",
      title: "Soul Origin",
      body: "Soul Origin reflects the original pattern beneath adaptation—the qualities, inner orientation, or natural way of being that may feel most essential.",
    },
    {
      code: "S3",
      title: "Soul Vibration",
      body: "Soul Vibration reflects how your inner pattern may seek expression through energy, creativity, presence, movement, communication, or action.",
    },
    {
      code: "S2",
      title: "Soul Mirror",
      body: "Soul Mirror explores what relationships and recurring experiences may reflect back to you. It does not mean that every difficult relationship is your fault or merely a projection.",
    },
    {
      code: "S0",
      title: "Void Gate",
      body: "Void Gate reflects how you may meet uncertainty, transition, stillness, loss of control, and the process of returning to yourself.",
    },
  ] satisfies Page01Foundation[],
  summaryTitle: "Together, these four mirrors form the first foundation of your Soul Blueprint:",
  summary: [
    "Who you are beneath adaptation.",
    "How that pattern seeks expression.",
    "What life and relationships may reflect.",
    "How you return when certainty falls away.",
  ],
};

export const PAGE01_FULL_MAP = {
  id: "full-map",
  title: "What Does the Full Soul Blueprint Explore?",
  paragraphs: [
    "The four Foundation Mirrors are the doorway, not the whole map.",
    "The Full Soul Blueprint expands the foundation through six additional layers.",
  ],
  layers: [
    {
      code: "S4",
      title: "Core Shadow Pattern",
      body: "The protective loop or recurring pattern asking to be recognised and integrated.",
    },
    {
      code: "S5",
      title: "Soul Mission",
      body: "The deeper direction of meaning, contribution, and purposeful expression.",
    },
    {
      code: "S6",
      title: "Value & Receiving",
      body: "How worth, support, exchange, resources, and receiving may move through your life.",
    },
    {
      code: "S7",
      title: "Soul Sovereignty",
      body: "How you relate to choice, boundaries, responsibility, and inner authority.",
    },
    {
      code: "S8",
      title: "Soul Contribution",
      body: "How your presence and expression may contribute beyond personal identity.",
    },
    {
      code: "S9",
      title: "Return to Source",
      body: "How you may return to simplicity, wholeness, humility, and remembrance.",
    },
  ] satisfies Page01Layer[],
  closing: [
    "These layers should not be read as separate personality traits.",
    "The Full Report looks at how the complete S0–S9 Blueprint may form one living pattern.",
  ],
};

export const PAGE01_HOW_CREATED = {
  id: "how-created",
  title: "How Is a 1320 Soul Blueprint Created?",
  paragraphs: [
    "The current 1320 system begins with your birth year, month, and day.",
    "Birth time and birth location are not required.",
    "Your birth date is processed through the proprietary 1320 calculation system to produce your Foundation sequence and the wider S0–S9 Blueprint.",
    "The calculation should not be presented as astrology, conventional numerology, scientific diagnosis, or a universal truth about the person.",
    "It is the entry point to the 1320 symbolic reflection framework.",
  ],
  process: ["Birth Date", "1320 Calculation", "Personal Soul Blueprint", "Reflection", "Integration"],
  boundary: "The calculation creates the symbolic structure. It does not make decisions for you.",
};

export const PAGE01_COMPARISON = {
  id: "comparison",
  title: "Is a Soul Blueprint the Same as Numerology, Astrology, or a Personality Test?",
  lead: "No.",
  paragraphs: [
    "1320 begins with a birth date, but it does not present itself as conventional numerology, astrology, Human Design, or personality testing.",
    "A Life Path Number usually reduces a full birth date to one primary numerological number.",
    "A birth chart uses the date, time, and location of birth within an astrological system.",
    "A personality test generally groups responses into measured traits, scores, or types.",
    "The 1320 Soul Blueprint uses its own symbolic S0–S9 structure and is designed to support reflection over time rather than assign a permanent category.",
  ],
  closing:
    "Different systems may ask different questions. 1320 asks how a symbolic Blueprint can become a living relationship rather than a fixed description.",
};

export const PAGE01_FIXED = {
  id: "fixed-or-changeable",
  title: "Is Your Soul Blueprint Fixed or Changeable?",
  paragraphs: [
    "The symbolic Blueprint is treated as a relatively stable foundation within 1320.",
    "But the way it is understood and expressed is not fixed.",
    "A person may be aware of one part of their Blueprint but disconnected from another.",
    "A gift may be present but not yet expressed.",
    "A protective pattern may become less dominant.",
    "A sense of purpose may move from idea into lived action.",
    "Boundaries may strengthen.",
    "Receiving may become easier.",
    "The Blueprint remains the mirror.",
    "Your expression, awareness, choices, and integration continue to evolve.",
  ],
  highlight: [
    "You are not being measured against a perfect version of your Blueprint.",
    "The question is how you are relating to it now.",
  ],
};

export const PAGE01_HOW_TO_USE = {
  id: "how-to-use",
  title: "How Should You Use Your Soul Blueprint?",
  paragraphs: [
    "A Soul Blueprint is most useful when it becomes a starting point for honest reflection.",
    "Read slowly.",
    "Notice what creates recognition.",
    "Notice what creates resistance.",
    "Ask whether the resistance comes from inaccuracy, unfamiliarity, fear, or an old adaptation.",
    "Compare the language with your actual life rather than accepting it automatically.",
    "Return to the Blueprint at different stages rather than trying to understand everything in one sitting.",
  ],
  steps: [
    { title: "Recognise", body: "Notice what feels familiar." },
    { title: "Reflect", body: "Connect the pattern with lived experience." },
    { title: "Choose", body: "Decide what deserves attention or expression." },
    { title: "Integrate", body: "Bring the insight into a real relationship, boundary, practice, or decision." },
  ],
  boundary:
    "Reflection does not require agreement. You remain free to question, reinterpret, or set aside any part that does not support honest self-understanding.",
};

export const PAGE01_FREE_AND_FULL = {
  id: "free-and-full",
  title: "What Do You Receive in a Free Soul Blueprint?",
  freeTitle: "Free Blueprint",
  freeIntro: "The Free Soul Blueprint opens your four Foundation Mirrors:",
  freeItems: [
    "S1 · Soul Origin",
    "S3 · Soul Vibration",
    "S2 · Soul Mirror",
    "S0 · Void Gate",
  ],
  freeClosing:
    "It includes a short reflection for each foundation, an Integrated Soul Blueprint mirror, and personal reflection questions.",
  fullTitle: "Full Report",
  fullIntro: "The Full Soul Blueprint Report opens the complete S0–S9 map.",
  fullClosing:
    "It adds shadow, mission, value and receiving, sovereignty, contribution, return, the Integrated Pattern, a 7-Day Integration Practice, and a Reflection Journal.",
  conversion: [
    "The Free Blueprint opens the doorway.",
    "The Full Report shows how the whole pattern lives together.",
  ],
};

export const PAGE01_NOT = {
  id: "what-it-is-not",
  title: "What a Soul Blueprint Is Not",
  intro: "A 1320 Soul Blueprint is not:",
  items: [
    "a prediction of your future",
    "a diagnosis or psychological assessment",
    "medical, legal, financial, or professional advice",
    "a measurement of spiritual rank",
    "proof of destiny or past lives",
    "a fixed personality label",
    "a reason to remain in an unsafe situation",
    "a substitute for your own judgement",
  ],
  closing: [
    "1320 offers a symbolic mirror.",
    "You remain the chooser, interpreter, and authority of your life.",
  ],
};
