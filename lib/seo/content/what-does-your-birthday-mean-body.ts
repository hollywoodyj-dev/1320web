/** Page 06 · body sections — Spec v1.0 */

export type Page06MeaningLayer = {
  layer: string;
  describes: string;
  doesNotEstablish: string;
};

export const PAGE06_MEANING_LAYERS: Page06MeaningLayer[] = [
  {
    layer: "Factual",
    describes: "The date, age and place in time",
    doesNotEstablish: "Personality or destiny",
  },
  {
    layer: "Cultural",
    describes: "Traditions, celebrations and shared meanings",
    doesNotEstablish: "Universal truth",
  },
  {
    layer: "Personal",
    describes: "Memories, relationships and lived associations",
    doesNotEstablish: "A fixed identity",
  },
  {
    layer: "Symbolic",
    describes: "Interpretations from numerology or other traditions",
    doesNotEstablish: "Scientific diagnosis",
  },
];

export const PAGE06_AT_A_GLANCE = {
  id: "at-a-glance",
  title: "Your Birthday Can Carry More Than One Kind of Meaning",
  paragraphs: [
    "When people ask what a birthday means, they may be asking several different questions at once.",
    "They may want to know what happened on that date, what their family remembers about their birth, what a symbolic tradition associates with the date, or whether the date reveals something essential about who they are.",
    "These are not the same kind of meaning.",
  ],
  closing: [
    "Confusion begins when symbolic interpretation is presented as objective fact.",
    "Clarity begins when the source and limits of each meaning are made visible.",
  ],
};

export const PAGE06_FACTUAL = {
  id: "factual-meaning",
  title: "What Does a Birthday Mean Factually?",
  paragraphs: [
    "At its most direct level, a birthday records when a person was born.",
    "It can be used to determine age and locate a person within a particular historical, social and generational context.",
    "The period into which someone is born may influence the conditions they encounter, such as family circumstances, language and culture, education, technology, economic conditions, social expectations and historical events.",
  ],
  boundary: "These influences come from lived context, not from the date acting as a hidden personality code.",
  highlight: [
    "A birth date can locate your beginning in time.",
    "It cannot describe everything that happened after that beginning.",
  ],
};

export const PAGE06_CULTURAL = {
  id: "cultural-meaning",
  title: "Why Do Birthdays Feel Important?",
  paragraphs: [
    "Birthdays often carry meaning because communities and families give meaning to them.",
    "They may mark belonging, continuity, survival, gratitude, adulthood, responsibility, remembrance, renewal and the passage of time.",
    "Different cultures and families may celebrate birthdays differently. Some make the day highly visible. Some treat it quietly. Some connect it with religious or ancestral traditions. Some do not emphasise birthdays at all.",
  ],
  boundary: [
    "Cultural meaning is real because people live and share it.",
    "It is not universal simply because one culture treats it as important.",
  ],
};

export const PAGE06_PERSONAL = {
  id: "personal-meaning",
  title: "What Does Your Birthday Mean to You Personally?",
  paragraphs: [
    "A birthday may hold emotional meaning that cannot be found in a calculation.",
    "It may remind you of how your family received you, who remembers the day, who no longer shares it with you, how you feel about ageing, whether you feel seen, what has changed since the previous year, what you hoped life would become, and what you are ready to begin again.",
  ],
  reflectionPrompt: "When your birthday approaches, what becomes more noticeable?",
  reflectionHints: ["Joy?", "Pressure?", "Gratitude?", "Loneliness?", "Reflection?", "A desire to begin again?"],
  governance: [
    "No response is more spiritually developed than another.",
    "The meaning belongs to your lived experience.",
  ],
};

export const PAGE06_SYMBOLIC = {
  id: "symbolic-meaning",
  title: "How Do Symbolic Systems Interpret a Birthday?",
  paragraphs: [
    "Many traditions use birth information as the beginning of a symbolic interpretation.",
    "Numerology may calculate numbers such as a Birthday Number or Life Path Number.",
    "Other traditions may connect a date with seasonal, astronomical, cultural or archetypal systems.",
    "These approaches do not all use the same rules, language or assumptions.",
  ],
  distinction: [
    "A symbolic system creates meaning through its own method.",
    "The date alone does not contain one universally agreed interpretation.",
  ],
  links: [
    {
      label: "Birthday Number vs Life Path Number vs Soul Blueprint",
      href: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    },
    {
      label: "Numerology by Date of Birth vs Soul Blueprint",
      href: "/numerology-by-date-of-birth-vs-soul-blueprint",
    },
  ],
  boundary: [
    "Symbolic interpretation may support reflection.",
    "It should not be represented as scientific proof of personality, destiny or future events.",
  ],
};

export const PAGE06_VS_BIRTHDAY_NUMBER = {
  id: "vs-birthday-number",
  title: "Is Your Birthday Meaning the Same as Your Birthday Number?",
  paragraphs: [
    "No.",
    "Birthday meaning is a broad question.",
    "A Birthday Number is one specific numerology interpretation based mainly on the day of the month on which a person was born.",
    "For example, someone born on the 14th may encounter the notation 14/5 in a numerology system.",
    "That number is one symbolic lens. It is not the complete meaning of the person’s birthday.",
  ],
  linkLabel: "Learn how Birthday Number, Life Path Number and Soul Blueprint differ.",
  linkHref: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
};

export const PAGE06_PERSONALITY = {
  id: "birthday-personality",
  title: "Does Your Birthday Determine Your Personality?",
  directAnswer:
    "No birth date can scientifically determine or completely describe a person’s personality.",
  paragraphs: [
    "Personality develops through many interacting influences, including biology, temperament, attachment and early relationships, family systems, culture, education, social environment, opportunity and adversity, repeated choices and life experience.",
  ],
  distinction: [
    "A person may recognise themselves in a birthday-based interpretation.",
    "Recognition does not prove that the date caused or fully explains the trait.",
  ],
  searchIntent: [
    "Phrases such as “birthday personality” or “personality by date of birth” may be useful for finding symbolic traditions.",
    "They should not be understood as clinical or scientific personality assessment.",
  ],
  highlight: "Resonance can be meaningful without becoming proof.",
};

export const PAGE06_WHY_RESONATE = {
  id: "why-interpretations-resonate",
  title: "Why Can a Birthday Interpretation Feel So Personal?",
  paragraphs: [
    "A symbolic interpretation may feel accurate for several reasons.",
    "It may use themes that genuinely match part of your experience. It may give language to something you already sense. You may naturally notice the parts that resonate more strongly. The interpretation may also be broad enough to fit many people in different ways.",
  ],
  questions: [
    "What part feels true?",
    "What evidence do I see in my life?",
    "What does not fit?",
    "Does this interpretation expand my awareness—or reduce me to a label?",
  ],
  reframing: 'Instead of asking only: “Is this true?” You may also ask:',
  boundary: [
    "The goal is not to force belief or disbelief.",
    "The goal is to preserve discernment.",
  ],
};

export const PAGE06_CANNOT = {
  id: "what-cannot-determine",
  title: "What Can’t Your Birthday Tell You?",
  items: [
    "your complete personality",
    "your future",
    "your intelligence",
    "your emotional maturity",
    "your moral character",
    "your worthiness",
    "your mental or physical health",
    "whether a relationship is safe",
    "whether another person is your destined partner",
    "whether a career will succeed",
    "whether you should stay or leave",
    "your spiritual rank",
    "your life expectancy",
    "the decisions you must make",
  ],
  supporting:
    "No interpretation should be used to override evidence, safety, consent, professional guidance or your own direct experience.",
  safety:
    "Do not remain in a harmful or unsafe situation because a symbolic reading describes it as destiny, karma, a soul lesson or a relationship mirror.",
};

export const PAGE06_THIRTEEN_TWENTY = {
  id: "1320-perspective",
  title: "How Does 1320 Use Your Birth Date?",
  paragraphs: [
    "1320 begins with your complete birth date and applies its own proprietary symbolic calculation framework.",
    "It does not treat the date as a scientific personality diagnosis or a fixed identity.",
  ],
  foundationIntro: "The Free Soul Blueprint opens four Foundation Mirrors:",
  foundations: [
    { code: "S1", title: "Soul Origin" },
    { code: "S3", title: "Soul Vibration" },
    { code: "S2", title: "Soul Mirror" },
    { code: "S0", title: "Void Gate" },
  ],
  sequence: "S1 → S3 → S2 → S0",
  fullMap:
    "The Full Soul Blueprint extends through S0–S9, including themes such as shadow, mission, value, sovereignty, contribution and return.",
  brandBoundary: "Your Blueprint is a mirror—not a fixed identity.",
  distinction: [
    "1320 does not claim that your birth date contains the complete truth about you.",
    "It uses birth information as the entry point into a structured symbolic reflection.",
  ],
};

export const PAGE06_MEANINGFUL_WITHOUT_IDENTITY = {
  id: "meaningful-without-identity",
  title: "Can Your Birthday Be Meaningful Without Becoming Your Identity?",
  paragraphs: [
    "Yes.",
    "Meaning does not require certainty.",
    "A birthday can become a moment of remembrance, a yearly pause, a reflection on change, a symbol of beginning, a way to notice recurring themes, or an invitation to choose again.",
  ],
  highlight: [
    "The healthiest symbolic system does not tell you who you must be.",
    "It helps you notice what is present while leaving room for change.",
  ],
};

export const PAGE06_RESPONSIBLE = {
  id: "responsible-reflection",
  title: "How Can You Use Birthday Meaning as a Reflection?",
  principles: [
    {
      number: "1",
      title: "Know the lens.",
      text: "Ask which system or tradition produced the interpretation.",
    },
    {
      number: "2",
      title: "Separate observation from conclusion.",
      text: "“This pattern feels familiar” is different from “This is what I am.”",
    },
    {
      number: "3",
      title: "Look for lived evidence.",
      text: "Notice what is actually happening in your behaviour, relationships and choices.",
    },
    {
      number: "4",
      title: "Keep what helps.",
      text: "You do not have to accept every part of an interpretation.",
    },
    {
      number: "5",
      title: "Preserve your authority.",
      text: "No reading should replace judgment, safety, consent or professional support.",
    },
  ],
  prompt: "What meaning have I inherited about my birthday—and what meaning am I choosing to create now?",
};

export const PAGE06_EXPLORE_MIRROR = {
  id: "explore-mirror",
  title: "Explore Your Birth Date as a Mirror",
  paragraphs: [
    "Your birthday does not define your complete identity.",
    "It can, however, become a starting point for noticing patterns, questions and possibilities.",
    "A Free Soul Blueprint opens four Foundation Mirrors in the order:",
  ],
  sequence: "S1 → S3 → S2 → S0",
  boundary: "Free to explore. No prediction. No fixed identity.",
};
