/** Page 02 · Life Path Number vs Soul Blueprint — body sections (Spec v1.0) */

export type ComparisonRow = {
  question: string;
  lifePath: string;
  soulBlueprint: string;
};

export const PAGE02_COMPARISON_TABLE: ComparisonRow[] = [
  {
    question: "Starting information",
    lifePath: "Full birth date",
    soulBlueprint: "Full birth date",
  },
  {
    question: "System",
    lifePath: "Numerology",
    soulBlueprint: "Proprietary 1320 symbolic framework",
  },
  {
    question: "Primary output",
    lifePath: "One number, usually 1–9 or a Master Number",
    soulBlueprint: "Four Foundation Mirrors and a complete S0–S9 map",
  },
  {
    question: "Main purpose",
    lifePath: "Broad numerological life theme",
    soulBlueprint: "Reflection across origin, expression, relationships, patterns and integration",
  },
  {
    question: "Birth time required",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Birth location required",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Fixed identity?",
    lifePath: "Should not be treated as one",
    soulBlueprint: "Explicitly not a fixed identity",
  },
  {
    question: "Predictive?",
    lifePath: "Interpretations vary by practitioner",
    soulBlueprint: "No prediction",
  },
  {
    question: "Scientific or clinical assessment?",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "User’s role",
    lifePath: "Interpret the meaning",
    soulBlueprint: "Remain the authority and interpreter",
  },
];

export const PAGE02_AT_A_GLANCE = {
  id: "at-a-glance",
  title: "Life Path Number and Soul Blueprint at a Glance",
  paragraphs: [
    "A Life Path Number and a 1320 Soul Blueprint share one visible starting point: your date of birth.",
    "After that, they take different paths.",
    "A Life Path Number reduces the birth date into one central numerological number.",
    "A Soul Blueprint processes the birth date through the proprietary 1320 framework to create a multilayer symbolic map.",
  ],
  closing: [
    "The main difference is not that one is “right” and the other is “wrong.”",
    "They organise the same starting information through different symbolic systems.",
  ],
};

export const PAGE02_WHAT_IS_LIFE_PATH = {
  id: "what-is-life-path",
  title: "What Is a Life Path Number?",
  paragraphs: [
    "A Life Path Number is one of the best-known concepts in modern numerology.",
    "It is calculated from a person’s full birth date and reduced to a primary number. Most Western numerology systems use the numbers 1 through 9 and may preserve 11, 22 and 33 as Master Numbers.",
    "Practitioners commonly interpret the result as a broad lens on life direction, recurring lessons, strengths, challenges or potential.",
    "The language varies between numerology traditions, books and practitioners. A Life Path Number should therefore be understood as a symbolic numerological interpretation—not a scientific measurement of personality or destiny.",
    "A common Western calculation method reduces the month, day and year separately, preserves recognised Master Numbers, and then combines the three results. Numerology sources commonly recognise 1–9 and 11, 22 and 33 as possible Life Path results, although practices and interpretations can vary.",
  ],
  highlight: "A Life Path Number compresses a full birth date into one primary symbolic number.",
};

export const PAGE02_CALCULATION = {
  id: "how-calculated",
  title: "How Is a Life Path Number Commonly Calculated?",
  paragraphs: [
    "One common Western numerology method follows four steps:",
    "1. Reduce the birth month.",
    "2. Reduce the birth day.",
    "3. Reduce the birth year.",
    "4. Add those results and reduce the total.",
    "Numbers are normally reduced to a single digit. In systems that recognise Master Numbers, 11, 22 and 33 may be preserved rather than reduced further.",
    "Different websites and practitioners sometimes use different reduction methods, especially when deciding when a Master Number should be retained. This is one reason two calculators can occasionally return different presentations of the same birth date.",
  ],
  exampleTitle: "Worked example",
  exampleDate: "Birth date: 15 June 1990",
  exampleSteps: [
    "Month: June = 6",
    "Day: 15 → 1 + 5 = 6",
    "Year: 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1",
    "Total: 6 + 6 + 1 = 13 → 1 + 3 = 4",
    "Life Path Number: 4",
  ],
  boundary: [
    "A dedicated Life Path calculation guide will explain the process and number meanings in greater detail.",
    "This comparison page focuses on what the resulting number represents—and how it differs from a Soul Blueprint.",
  ],
};

export const PAGE02_CAN_SHOW = {
  id: "what-it-can-show",
  title: "What Can a Life Path Number Help You Explore?",
  paragraphs: [
    "People often use a Life Path Number as a concise symbolic lens.",
    "Depending on the numerology tradition, it may be used to reflect on:",
  ],
  bullets: [
    "natural tendencies",
    "recurring lessons",
    "broad strengths and challenges",
    "approaches to work or relationships",
    "personal growth themes",
    "a general sense of direction",
  ],
  governance: [
    "These meanings are interpretations within numerology.",
    "They should not be treated as established facts about a person.",
    "A useful reading creates reflection without removing complexity, context or choice.",
  ],
  highlight: ["A number may offer a theme.", "It cannot contain the whole person."],
};

export const PAGE02_CANNOT = {
  id: "what-it-cannot",
  title: "What Can’t a Life Path Number Tell You?",
  intro: "A Life Path Number cannot reliably determine:",
  items: [
    "your complete personality",
    "your mental or physical health",
    "your future",
    "whether a relationship will succeed",
    "which career you must choose",
    "your moral worth",
    "your spiritual level",
    "whether you are safe in a particular situation",
    "what decision you should make",
  ],
  closing: [
    "Even within numerology, one number is normally only one part of a wider chart.",
    "Outside numerology, lived experience is shaped by family, culture, relationships, opportunity, adversity, body, environment and choice.",
    "No symbolic number should erase those realities.",
    "Some established numerology sources also describe the Life Path as only one of several core numbers in a full numerology chart.",
  ],
};

export const PAGE02_SOUL_BLUEPRINT = {
  id: "what-is-soul-blueprint",
  title: "What Is a 1320 Soul Blueprint?",
  paragraphs: [
    "A 1320 Soul Blueprint is a proprietary symbolic reflection framework generated from a person’s birth year, month and day.",
    "It does not produce a single Life Path Number.",
    "The Free Soul Blueprint begins with four Foundation Mirrors in a fixed sequence:",
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
      body: "How the inner pattern may seek expression through energy, creativity, communication, movement or presence.",
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
  integratedTitle: "Together, the four Foundation Mirrors ask:",
  integrated: [
    "Who am I beneath adaptation?",
    "How does that pattern seek expression?",
    "What may life and relationships reflect?",
    "How do I return when certainty falls away?",
  ],
  fullIntro: "The Full Soul Blueprint extends into:",
  fullLayers: [
    "S4 · Core Shadow Pattern",
    "S5 · Soul Mission",
    "S6 · Value & Receiving",
    "S7 · Soul Sovereignty",
    "S8 · Soul Contribution",
    "S9 · Return to Source",
  ],
  closing:
    "The locked 1320 architecture treats Life Path as the primary search bridge while retaining Soul Code as brand language and Soul Blueprint as product language.",
};

export const PAGE02_ONE_VS_MULTI = {
  id: "one-vs-multilayer",
  title: "One Number and a Multilayer Map",
  paragraphs: [
    "The clearest difference is structural.",
    "A Life Path Number distils the birth date into one central numerological theme.",
    "A Soul Blueprint keeps several symbolic layers in relationship with one another.",
    "This does not automatically make the Soul Blueprint more accurate.",
    "It makes it a different kind of reflective object.",
  ],
  lifePathFlow: ["Birth Date", "Reduction", "One Primary Number", "Broad Numerological Theme"],
  blueprintFlow: [
    "Birth Date",
    "1320 Calculation",
    "S1 → S3 → S2 → S0",
    "Complete S0–S9 Blueprint",
    "Reflection and Integration",
  ],
  distinction: [
    "Life Path asks: What broad path or lesson might this number represent?",
    "Soul Blueprint asks: How might several symbolic patterns live together—and how am I relating to them now?",
  ],
};

export const PAGE02_REPLACE = {
  id: "does-it-replace",
  title: "Does a Soul Blueprint Replace Your Life Path Number?",
  paragraphs: [
    "No.",
    "A Soul Blueprint is not presented as a correction to numerology.",
    "It is also not another name for a Life Path Number.",
    "A person may find value in one framework, both frameworks or neither.",
    "The most important question is not which system claims the most authority.",
    "It is whether the system helps you reflect honestly without replacing your judgement.",
  ],
  boundary: [
    "Symbolic systems should remain tools.",
    "They should not become authorities over the person using them.",
  ],
};

export const PAGE02_WHICH = {
  id: "which-to-explore",
  title: "Life Path Number or Soul Blueprint: Which Should You Explore?",
  lifePathIntro: "A Life Path Number may suit you when you want:",
  lifePathItems: [
    "a concise introduction to numerology",
    "one central number to explore",
    "a familiar symbolic language",
    "a broad life-theme reflection",
  ],
  blueprintIntro: "A Soul Blueprint may suit you when you want:",
  blueprintItems: [
    "a multilayer reflective map",
    "more than one symbolic dimension",
    "a distinction between origin, expression, relationships and protective patterns",
    "a path from recognition into integration",
    "a framework that explicitly preserves user authority",
  ],
  closing: [
    "You do not need to choose a permanent system.",
    "You can explore a symbolic lens, notice what it opens, and remain free to question what does not fit.",
  ],
};

export const PAGE02_SHARED = {
  id: "shared-life-path",
  title: "Can Two People Share a Life Path Number and Still Be Very Different?",
  paragraphs: [
    "Yes.",
    "Many people share the same Life Path Number.",
    "They may still differ greatly in family history, culture, relationships, temperament, opportunity, adversity, choices and current life context.",
    "Even within numerology, one Life Path Number is interpreted alongside other numbers and lived circumstances.",
    "A Soul Blueprint addresses this differently by generating several symbolic layers rather than relying on one primary number.",
    "It still does not claim to capture the whole person.",
  ],
  highlight: "Shared symbols do not create identical lives.",
};

export const PAGE02_RESPONSIBLE = {
  id: "responsible-use",
  title: "How to Use a Symbolic Birth-Date System Responsibly",
  steps: [
    { title: "Notice", body: "What creates recognition?" },
    { title: "Compare", body: "Does the interpretation connect with your actual life?" },
    { title: "Question", body: "What feels inaccurate, exaggerated or overly fixed?" },
    { title: "Choose", body: "Is there anything useful to reflect on or integrate?" },
  ],
  paragraphs: [
    "Do not force yourself to agree with an interpretation.",
    "Do not use a number or Blueprint to excuse harmful behaviour.",
    "Do not remain in an unsafe situation because a system calls it a lesson.",
    "Do not use symbolic language to diagnose yourself or another person.",
    "The person remains larger than the map.",
  ],
  boundary: ["A mirror may help you see.", "It should not tell you what you are allowed to become."],
};

export const PAGE02_GO_BEYOND = {
  id: "go-beyond",
  title: "Go Beyond One Number",
};
