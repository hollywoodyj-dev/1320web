/** Page 05 · body sections — Spec v1.0 */

export type Page05ComparisonRow = {
  question: string;
  birthdayNumber: string;
  lifePath: string;
  soulBlueprint: string;
};

export const PAGE05_COMPARISON_TABLE: Page05ComparisonRow[] = [
  {
    question: "Starting input",
    birthdayNumber: "Mainly the birth day",
    lifePath: "Full birth date",
    soulBlueprint: "Full birth date",
  },
  {
    question: "Category",
    birthdayNumber: "Numerology",
    lifePath: "Numerology",
    soulBlueprint: "Proprietary 1320 symbolic framework",
  },
  {
    question: "Typical output",
    birthdayNumber: "One day-based number or compound/reduced form",
    lifePath: "One primary number, sometimes with Master Number notation",
    soulBlueprint: "Four Foundation Mirrors and complete S0–S9 map",
  },
  {
    question: "Example",
    birthdayNumber: "14 → 14/5",
    lifePath: "14 June 1990 → 3",
    soulBlueprint: "Personal S1 → S3 → S2 → S0",
  },
  {
    question: "Main focus",
    birthdayNumber: "A specific quality, ability or style of expression",
    lifePath: "Broad direction, lessons and life themes",
    soulBlueprint: "Origin, expression, mirrors, protective patterns and integration",
  },
  {
    question: "Birth time needed",
    birthdayNumber: "No",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Birth location needed",
    birthdayNumber: "No",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Scientific assessment",
    birthdayNumber: "No",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Reliable prediction",
    birthdayNumber: "No",
    lifePath: "No",
    soulBlueprint: "No",
  },
  {
    question: "Fixed identity",
    birthdayNumber: "No",
    lifePath: "No",
    soulBlueprint: "Explicitly rejected",
  },
  {
    question: "User authority",
    birthdayNumber: "Interpretation should remain optional",
    lifePath: "Interpretation should remain optional",
    soulBlueprint: "User remains the authority",
  },
];

export const PAGE05_AT_A_GLANCE = {
  id: "at-a-glance",
  title: "Birthday Number, Life Path Number and Soul Blueprint at a Glance",
  paragraphs: [
    "All three begin with birth information, but they do not use it in the same way.",
    "The difference lies in the input selected, the calculation method, the structure produced and the purpose of the interpretation.",
  ],
  closing: [
    "The Birthday Number is not a smaller Life Path Number.",
    "The Life Path Number is not a compressed Soul Blueprint.",
    "Each belongs to a particular method and should be understood within that method.",
  ],
};

export const PAGE05_WHAT_IS_BIRTHDAY = {
  id: "what-is-birthday-number",
  title: "What Is a Birthday Number in Numerology?",
  paragraphs: [
    "A Birthday Number is generally based on the calendar day on which a person was born.",
    "Someone born on the 5th begins with the number 5.",
    "Someone born on the 14th may be written as 14, 14/5 or simply 5, depending on the numerology tradition.",
    "Someone born on the 29th may be interpreted as 29/11 in systems that preserve 11 as a Master Number.",
  ],
  terminology: [
    "Some traditions use the term Birth Number instead of Birthday Number.",
    "Other traditions use the same words differently.",
    "This page uses Birthday Number consistently and displays both the original calendar day and its reduced form where relevant.",
  ],
  highlight: [
    "Your Birthday Number starts with one part of your birth date:",
    "the day of the month.",
  ],
};

export const PAGE05_HOW_CALCULATE = {
  id: "how-to-calculate-birthday-number",
  title: "How Do You Calculate a Birthday Number?",
  steps: [
    "1. Begin with the day of the month.",
    "2. Keep the original day visible.",
    "3. If the day contains two digits, add them together.",
    "4. Continue reducing until you reach one digit, unless the method preserves 11 or 22.",
    "5. Display both forms when useful.",
  ],
  examples: [
    { label: "Born on the 5th", detail: "Birthday Number 5" },
    { label: "Born on the 14th", detail: "1 + 4 = 5 · Birthday Number 14/5" },
    { label: "Born on the 22nd", detail: "Birthday Number 22 — some systems preserve 22 as a Master Number." },
    { label: "Born on the 29th", detail: "2 + 9 = 11 · Birthday Number 29/11 in systems that preserve 11." },
    { label: "Born on the 31st", detail: "3 + 1 = 4 · Birthday Number 31/4" },
  ],
  strip: ["5 → 5", "14 → 14/5", "22 → 22", "29 → 29/11", "31 → 31/4"],
  boundary:
    "Numerology traditions do not all display or interpret compound numbers in exactly the same way. On this page, the original birth day remains visible alongside its reduced form, with 11 and 22 preserved where applicable.",
};

export const PAGE05_MEANINGS = {
  id: "birthday-number-meanings",
  title: "What Is a Birthday Number Said to Represent?",
  paragraphs: [
    "In many modern numerology traditions, the Birthday Number is used as a symbolic lens for a particular ability, quality or style of expression.",
    "It may be interpreted in relation to:",
  ],
  bullets: [
    "natural talents",
    "visible strengths",
    "ways of approaching tasks",
    "communication or creative tendencies",
    "a quality that becomes more noticeable over time",
  ],
  governance: [
    "These meanings belong to numerology traditions.",
    "They are not scientifically established traits and should not be used to define a person’s complete personality.",
  ],
  table: [
    { number: "1", themes: "Initiative, independence, beginning" },
    { number: "2", themes: "Cooperation, sensitivity, relationship" },
    { number: "3", themes: "Expression, communication, creativity" },
    { number: "4", themes: "Structure, reliability, practical building" },
    { number: "5", themes: "Change, movement, adaptability" },
    { number: "6", themes: "Responsibility, care, harmony" },
    { number: "7", themes: "Inquiry, reflection, analysis" },
    { number: "8", themes: "Organisation, authority, material stewardship" },
    { number: "9", themes: "Compassion, completion, wider perspective" },
    { number: "11", themes: "Intuition, inspiration, heightened sensitivity" },
    { number: "22", themes: "Vision translated into practical structure" },
  ],
  boundary: [
    "This table is a concise orientation, not a complete reading.",
    "Compound days such as 14, 16, 19, 23 or 29 may receive additional interpretations in different traditions.",
  ],
};

export const PAGE05_LIFE_PATH = {
  id: "how-life-path-differs",
  title: "How Is a Life Path Number Different?",
  paragraphs: [
    "A Life Path Number uses the complete birth date rather than only the calendar day.",
    "The declared method used by the 1320 Life Path Calculator reduces the month, day and year separately, preserves supported Master Numbers, combines the three results and then reduces the total.",
  ],
  exploresIntro: "What it commonly explores:",
  explores: [
    "broad direction",
    "recurring life themes",
    "strengths and challenges",
    "growth lessons",
    "ways of moving through experience",
  ],
  boundary: [
    "A Life Path Number is broader in input than a Birthday Number, but it is still one numerological lens.",
    "It should not be treated as a complete account of a human life.",
  ],
  linkLabel: "Calculate My Life Path Number",
  linkHref: "/what-is-my-life-path-number",
};

export const PAGE05_TWO_RESULTS = {
  id: "one-birthday-two-results",
  title: "Can Your Birthday Number and Life Path Number Be Different?",
  exampleDate: "14 June 1990",
  birthdaySteps: ["Birth day: 14", "1 + 4 = 5", "Birthday Number: 14/5"],
  lifePathSteps: [
    "Month: June = 6",
    "Day: 14 → 5",
    "Year: 1990 → 1 + 9 + 9 + 0 = 19 → 10 → 1",
    "Combined: 6 + 5 + 1 = 12 → 3",
    "Life Path Number: 3",
  ],
  interpretation: [
    "The Birthday Number 14/5 and Life Path Number 3 do not contradict one another.",
    "They come from different calculations and are intended to highlight different symbolic themes.",
  ],
  required: [
    "Different result does not mean one calculation is wrong.",
    "Same result does not mean the two concepts are identical.",
  ],
};

export const PAGE05_CAN_MATCH = {
  id: "can-numbers-match",
  title: "Can Your Birthday Number Match Your Life Path Number?",
  paragraphs: [
    "Yes.",
    "A person may have the same reduced Birthday Number and Life Path Number.",
    "For example, someone may have Birthday Number 5 and Life Path Number 5.",
    "Within numerology, some practitioners may interpret this as a repeated emphasis on similar symbolic themes.",
  ],
  boundary: [
    "A repeated number does not make the person more powerful, evolved or destined for a particular outcome.",
    "It is simply a repeated pattern within that numerology method.",
  ],
};

export const PAGE05_WHICH_IMPORTANT = {
  id: "which-more-important",
  title: "Is the Birthday Number or Life Path Number More Important?",
  paragraphs: [
    "There is no objective test proving that one numerology number is more important or more accurate.",
    "Within many numerology traditions, the Life Path Number is treated as a broad central number because it uses the full birth date.",
    "The Birthday Number is often treated as a more specific lens based on the birth day.",
    "Their importance depends on the numerology framework being used.",
  ],
  highlight: [
    "Broader input does not automatically mean complete truth.",
    "Narrower input does not automatically mean less value.",
  ],
};

export const PAGE05_SOUL_BLUEPRINT = {
  id: "how-soul-blueprint-differs",
  title: "How Is a Soul Blueprint Different From Both Numbers?",
  paragraphs: [
    "A 1320 Soul Blueprint also begins with a person’s birth year, month and day.",
    "It does not present the Birthday Number or Life Path Number as the person’s Soul Blueprint.",
    "The date enters a separate proprietary calculation framework that produces multiple symbolic modules.",
  ],
  sequence: "S1 → S3 → S2 → S0",
  foundations: [
    {
      code: "S1",
      title: "Soul Origin",
      body: "What may feel original beneath adaptation.",
    },
    {
      code: "S3",
      title: "Soul Vibration",
      body: "How the inner pattern may seek expression.",
    },
    {
      code: "S2",
      title: "Soul Mirror",
      body: "What relationships and recurring experiences may reflect.",
    },
    {
      code: "S0",
      title: "Void Gate",
      body: "How the person may meet uncertainty, transition and return.",
    },
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
  distinction: [
    "The difference is not: one number versus the complete truth.",
    "The difference is: separate symbolic systems with different calculations, structures and purposes.",
  ],
};

export const PAGE05_THREE_LENSES = {
  id: "three-lenses",
  title: "How Do the Three Systems Use Birth Information?",
  birthdayFlow: ["Birth day", "Compound / reduced day number", "A specific numerology lens"],
  lifePathFlow: ["Month + day + year", "Life Path calculation", "One broad numerology number"],
  blueprintFlow: [
    "Birth year + month + day",
    "1320 proprietary calculation",
    "S1 → S3 → S2 → S0",
    "Complete S0–S9 framework",
  ],
  core: [
    "The same birth information can enter different symbolic methods.",
    "The method determines the output.",
  ],
};

export const PAGE05_CANNOT = {
  id: "what-cannot-determine",
  title: "What Can’t a Birthday Number, Life Path or Soul Blueprint Determine?",
  intro: "None of these systems can reliably determine:",
  items: [
    "your complete personality",
    "your future",
    "your intelligence",
    "your moral character",
    "your mental or physical health",
    "whether a relationship is safe",
    "whether a relationship will succeed",
    "which career you must choose",
    "your spiritual rank",
    "your worth",
    "what decision you should make",
  ],
  supporting: [
    "A human life is also shaped by body, family, culture, relationships, environment, opportunity, adversity, history and choice.",
    "No birth-date system should erase those realities.",
  ],
  safety:
    "Do not use a symbolic interpretation to justify harm, remain in an unsafe situation or surrender your responsibility for real-life decisions.",
};

export const PAGE05_WHERE_BEGIN = {
  id: "where-to-begin",
  title: "Birthday Number, Life Path or Soul Blueprint: Where Should You Begin?",
  birthdayIntro: "Birthday Number may suit you when:",
  birthdayItems: [
    "You want a simple day-based numerology lens.",
    "You are curious about one symbolic quality or expression theme.",
    "You want to understand the meaning attached to your calendar day.",
  ],
  lifePathIntro: "Life Path may suit you when:",
  lifePathItems: [
    "You want a familiar numerology calculation using your full birth date.",
    "You want one broad number associated with direction and recurring lessons.",
    "You want a transparent calculator and calculation trace.",
  ],
  blueprintIntro: "Soul Blueprint may suit you when:",
  blueprintItems: [
    "You want a multilayer symbolic map rather than one number.",
    "You want to distinguish origin, expression, relationship mirrors and protective patterns.",
    "You want a framework oriented toward reflection and integration.",
    "You prefer an explicit mirror-not-identity boundary.",
  ],
  closing: [
    "You may explore one lens, several lenses or none.",
    "A symbolic system should support reflection without taking authority away from your lived experience.",
  ],
};

export const PAGE05_EXPLORE_BEYOND = {
  id: "explore-beyond",
  title: "Explore the Pattern Beyond One Number",
  paragraphs: [
    "Your Birthday Number may offer a day-based lens.",
    "Your Life Path Number may offer a broader numerology lens.",
    "A Free Soul Blueprint opens four Foundation Mirrors in the order:",
  ],
  sequence: "S1 → S3 → S2 → S0",
  supporting: "Explore how origin, expression, relationship mirrors and return may move together.",
  boundary: "Free to explore. No prediction. No fixed identity.",
  secondaryLabel: "Calculate My Life Path Number",
  secondaryHref: "/what-is-my-life-path-number",
};
