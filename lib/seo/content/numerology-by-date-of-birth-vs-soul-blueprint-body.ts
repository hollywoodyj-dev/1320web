/** Page 04 · body sections — Spec v1.0 */

export type Page04ComparisonRow = {
  question: string;
  numerology: string;
  soulBlueprint: string;
};

export const PAGE04_COMPARISON_TABLE: Page04ComparisonRow[] = [
  {
    question: "Starting input",
    numerology: "Full birth date or part of it",
    soulBlueprint: "Full birth date",
  },
  {
    question: "Category",
    numerology: "Numerology",
    soulBlueprint: "Proprietary 1320 symbolic framework",
  },
  {
    question: "Possible outputs",
    numerology: "Life Path, Birthday Number and other chart numbers",
    soulBlueprint: "Four Foundation Mirrors and complete S0–S9 map",
  },
  {
    question: "Main structure",
    numerology: "Numbers interpreted separately or as a chart",
    soulBlueprint: "Multiple symbolic layers interpreted in relationship",
  },
  {
    question: "Birth time required",
    numerology: "Usually no",
    soulBlueprint: "No",
  },
  {
    question: "Birth location required",
    numerology: "Usually no",
    soulBlueprint: "No",
  },
  {
    question: "Primary use",
    numerology: "Numerological interpretation",
    soulBlueprint: "Reflection and integration",
  },
  {
    question: "Predictive?",
    numerology: "Depends on practitioner; should not be treated as reliable prediction",
    soulBlueprint: "No prediction",
  },
  {
    question: "Scientific or clinical?",
    numerology: "No",
    soulBlueprint: "No",
  },
  {
    question: "Fixed identity?",
    numerology: "Should not be used as one",
    soulBlueprint: "Explicitly not a fixed identity",
  },
  {
    question: "User authority",
    numerology: "Interpretation varies",
    soulBlueprint: "User remains the authority",
  },
];

export const PAGE04_AT_A_GLANCE = {
  id: "at-a-glance",
  title: "Birth Date Numerology and Soul Blueprint at a Glance",
  paragraphs: [
    "Both systems begin with the same visible input: a person’s date of birth.",
    "The difference lies in how that date is processed, what kind of structure is produced, and how the result is intended to be used.",
  ],
  closing: [
    "The key distinction is not that one system is valid and the other is invalid.",
    "They are different symbolic frameworks that organise birth-date information in different ways.",
  ],
};

export const PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY = {
  id: "what-is-birth-date-numerology",
  title: "What Does “Numerology by Date of Birth” Mean?",
  paragraphs: [
    "Numerology by date of birth is an umbrella term.",
    "It does not refer to one universally standard calculation or one single result.",
    "Depending on the numerology tradition, a birth date may be used to calculate or interpret:",
  ],
  bullets: [
    "a Life Path Number",
    "a Birthday Number",
    "an Attitude or Approach Number",
    "period cycles",
    "personal years",
    "challenge numbers",
    "other chart positions",
  ],
  governance: [
    "The names, methods and meanings can vary between numerology schools and practitioners.",
    "For that reason, “numerology by date of birth” should be understood as a family of symbolic practices rather than one regulated assessment system.",
  ],
  highlight: [
    "A birth date can produce several numerology numbers.",
    "It does not produce one universally agreed description of the person.",
  ],
};

export const PAGE04_LIFE_PATH = {
  id: "life-path-number",
  title: "What Is a Life Path Number?",
  paragraphs: [
    "The Life Path Number is one of the most widely recognised birth-date numbers in modern numerology.",
    "It uses the complete birth date and reduces the month, day and year into one primary result.",
    "Most systems produce a number from 1 to 9 and may preserve 11, 22 or 33 as Master Numbers.",
  ],
  exploresIntro: "What it commonly explores:",
  explores: [
    "life direction",
    "broad strengths",
    "recurring lessons",
    "challenges",
    "growth themes",
    "ways of approaching experience",
  ],
  boundary: [
    "A Life Path Number is one numerological lens.",
    "It is not a verified measurement of personality, destiny or future outcome.",
  ],
  linkLabel: "Calculate My Life Path Number",
  linkHref: "/what-is-my-life-path-number",
};

export const PAGE04_BIRTHDAY_NUMBER = {
  id: "birthday-number",
  title: "What Is a Birthday Number?",
  paragraphs: [
    "A Birthday Number generally uses the day of the month on which a person was born.",
    "Someone born on the 5th may be interpreted through the number 5.",
    "Someone born on the 14th may be read as 14, 14/5 or 5, depending on the numerology method.",
    "Unlike the Life Path Number, it does not use the entire birth date.",
  ],
  exploresIntro: "What it commonly explores:",
  explores: [
    "natural abilities",
    "a visible style of expression",
    "specific tendencies",
    "a quality the person may bring into life",
  ],
  boundary: [
    "The Birthday Number is not the same as the Life Path Number.",
    "It is also not the same as a 1320 Soul Blueprint.",
  ],
};

export const PAGE04_MORE_NUMBERS = {
  id: "more-than-two-numbers",
  title: "Does Birth-Date Numerology Include More Than Two Numbers?",
  paragraphs: [
    "Yes.",
    "Some numerology systems build a larger chart from the date of birth, the birth name or both.",
    "Depending on the tradition, the chart may include cycles, personal years, challenge periods or other derived numbers.",
    "This means it would be inaccurate to describe all numerology as only one number.",
  ],
  distinction: [
    "A full numerology chart can contain several numbers.",
    "A 1320 Soul Blueprint is still not a numerology chart.",
    "The systems use different calculation rules, terminology, architecture and product purpose.",
  ],
  honest: [
    "Numerology can include several numerical positions.",
    "1320 uses a separate S0–S9 symbolic architecture.",
  ],
};

export const PAGE04_CAN_HELP = {
  id: "what-it-can-help",
  title: "What Can Numerology by Date of Birth Help You Reflect On?",
  intro: "People commonly use birth-date numerology to reflect on:",
  bullets: [
    "broad life themes",
    "strengths and challenges",
    "patterns of expression",
    "approaches to relationships",
    "personal cycles",
    "growth lessons",
    "questions of meaning or direction",
  ],
  governance: [
    "These are interpretations within a symbolic tradition.",
    "They should be compared with lived experience rather than accepted as unquestionable facts.",
  ],
  highlight: [
    "Symbolic meaning can open a question.",
    "It should not close the person inside an answer.",
  ],
};

export const PAGE04_CANNOT = {
  id: "what-it-cannot",
  title: "What Can’t Numerology Determine From Your Birth Date?",
  intro: "A birth date cannot reliably determine:",
  items: [
    "your complete personality",
    "your future",
    "your mental or physical health",
    "whether a relationship is safe",
    "whether a relationship will succeed",
    "your moral character",
    "your intelligence",
    "your spiritual rank",
    "which career you must choose",
    "what decision you should make",
    "your value as a person",
  ],
  supporting: [
    "Human lives are also shaped by family, culture, body, relationships, environment, opportunity, adversity and choice.",
    "No symbolic calculation should erase those realities.",
  ],
  safety:
    "Do not remain in a harmful or unsafe situation because a symbolic reading calls it a lesson, mirror or destiny.",
};

export const PAGE04_SOUL_BLUEPRINT = {
  id: "what-is-soul-blueprint",
  title: "What Does a 1320 Soul Blueprint Explore?",
  paragraphs: [
    "A 1320 Soul Blueprint is a proprietary symbolic reflection framework generated from a full birth date.",
    "It does not produce a Life Path Number or a conventional numerology chart.",
    "The Free Soul Blueprint opens four Foundation Mirrors in a fixed sequence:",
  ],
  sequence: "S1 → S3 → S2 → S0",
  foundations: [
    {
      code: "S1",
      title: "Soul Origin",
      body: "The original pattern beneath adaptation—the qualities or inner orientation that may feel most essential.",
    },
    {
      code: "S3",
      title: "Soul Vibration",
      body: "How the inner pattern may seek expression through energy, communication, creativity, movement or presence.",
    },
    {
      code: "S2",
      title: "Soul Mirror",
      body: "What relationships and recurring experiences may reflect back to the person.",
    },
    {
      code: "S0",
      title: "Void Gate",
      body: "How the person may meet uncertainty, transition, stillness and return.",
    },
  ],
  integratedTitle: "Integrated foundation questions:",
  integrated: [
    "Who am I beneath adaptation?",
    "How does that pattern seek expression?",
    "What may life and relationships reflect?",
    "How do I return when certainty falls away?",
  ],
  fullIntro: "The Full Soul Blueprint extends through S0–S9:",
  fullLayers: [
    "S4 · Core Shadow Pattern",
    "S5 · Soul Mission",
    "S6 · Value & Receiving",
    "S7 · Soul Sovereignty",
    "S8 · Soul Contribution",
    "S9 · Return to Source",
  ],
};

export const PAGE04_ARCHITECTURE = {
  id: "same-input-different-architecture",
  title: "How Do the Two Systems Use the Same Birth Date Differently?",
  numerologyFlow: [
    "Birth Date",
    "Numerology Calculation Rules",
    "Life Path / Birthday Number / Other Chart Numbers",
    "Numerological Interpretation",
  ],
  blueprintFlow: [
    "Birth Date",
    "1320 Blueprint Calculation",
    "S1 → S3 → S2 → S0",
    "Complete S0–S9 Framework",
    "Recognition, Reflection and Integration",
  ],
  paragraphs: [
    "The same input does not make two systems equivalent.",
    "A birth date can enter astrology, numerology, age calculation, genealogy or a proprietary symbolic system.",
    "What matters is the method, output and claim being made.",
  ],
  distinction: ["Birth date is the input.", "The framework determines the meaning."],
};

export const PAGE04_IS_NUMEROLOGY = {
  id: "is-soul-blueprint-numerology",
  title: "Is a 1320 Soul Blueprint a Type of Numerology?",
  paragraphs: [
    "1320 should not be described as conventional numerology.",
    "It begins with the birth year, month and day, but it uses its own calculation framework, symbolic modules and S0–S9 architecture.",
    "It does not present a Life Path Number, Birthday Number or standard numerology chart as the user’s Soul Blueprint.",
  ],
  boundary: [
    "The most accurate public description is:",
    "1320 begins with your birth date but uses its own symbolic Soul Blueprint framework.",
  ],
};

export const PAGE04_WHICH = {
  id: "which-to-explore",
  title: "Numerology by Date of Birth or Soul Blueprint: Which Is Right for You?",
  numerologyIntro: "Numerology may suit you when:",
  numerologyItems: [
    "You want to calculate familiar numerology numbers.",
    "You want a concise numerical interpretation.",
    "You are interested in Life Path or Birthday Number traditions.",
    "You want to explore a recognised numerology framework.",
  ],
  blueprintIntro: "Soul Blueprint may suit you when:",
  blueprintItems: [
    "You want a multilayer symbolic map.",
    "You want to distinguish origin, expression, relationships and protective patterns.",
    "You want to move from recognition into reflection and integration.",
    "You prefer a framework that explicitly rejects prediction and fixed identity.",
  ],
  closing: [
    "You do not need to declare permanent loyalty to either framework.",
    "You may explore a symbolic system, notice what it opens, question what does not fit and remain the authority of your own life.",
  ],
};

export const PAGE04_RESPONSIBLE = {
  id: "responsible-use",
  title: "How Should You Use a Birth-Date Reading?",
  steps: [
    {
      title: "1. Understand the system",
      body: "Know what was calculated and which tradition it comes from.",
    },
    {
      title: "2. Read symbolically",
      body: "Treat the result as an interpretive lens, not an established fact.",
    },
    {
      title: "3. Compare with reality",
      body: "Notice what connects with lived experience and what does not.",
    },
    {
      title: "4. Preserve choice",
      body: "Do not let a number or Blueprint decide who you must become.",
    },
  ],
  closing: [
    "A useful symbolic system should increase reflection.",
    "It should not reduce freedom.",
  ],
};

export const PAGE04_EXPLORE_MORE = {
  id: "explore-more",
  title: "Explore More Than One Birth-Date Number",
  paragraphs: [
    "Your Life Path or Birthday Number may offer one meaningful lens.",
    "A Free Soul Blueprint opens four Foundation Mirrors in the order:",
  ],
  sequence: "S1 → S3 → S2 → S0",
  supporting:
    "Explore origin, expression, relationship mirrors and return through a separate symbolic framework.",
  boundary: "Free to explore. No prediction. No fixed identity.",
  secondaryLabel: "Calculate My Life Path Number",
  secondaryHref: "/what-is-my-life-path-number",
};
