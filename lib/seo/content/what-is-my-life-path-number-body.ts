/** Page 03 · educational body sections — Spec v1.0 §§9, 12, 13 */

export const PAGE03_METHOD_NOTE = {
  heading: "This calculator uses a Pythagorean-style Life Path method.",
  body: "It reduces the month, day and year separately, preserving 11, 22 and 33 where they appear, then combines and reduces the final total. Different numerology sources use different reduction conventions, especially around Master Numbers.",
};

export const PAGE03_HOW_CALCULATED = {
  id: "how-calculated",
  title: "How Is a Life Path Number Calculated?",
  exampleDate: "Birth date: 15 June 1990",
  steps: [
    "Month: June = 6",
    "Day: 15 → 1 + 5 = 6",
    "Year: 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1",
    "Combined total: 6 + 6 + 1 = 13",
    "Final reduction: 1 + 3 = 4",
    "Life Path Number: 4",
  ],
  paragraphs: [
    "This method keeps the month, day and year visible as separate parts of the calculation.",
    "That transparency matters because some numerology methods preserve Master Numbers during intermediate stages, while other calculators add every birth-date digit in one line.",
  ],
  boundary:
    "A different calculator may display a different compound calculation if it uses another reduction convention. The result should always show which method was used.",
};

export const PAGE03_WHAT_IS = {
  id: "what-is-life-path",
  title: "What Is a Life Path Number?",
  paragraphs: [
    "A Life Path Number is one of the most widely recognised concepts in Western numerology.",
    "It is derived from a person’s complete birth date and interpreted as a broad symbolic theme related to direction, tendencies, lessons, strengths or challenges.",
    "It is one part of numerology—not a complete description of a human being.",
    "Leading numerology sites generally describe the Life Path as a birth-date-derived core number, while also including other chart numbers and cycles in broader readings.",
  ],
};

export const PAGE03_MASTER_NUMBERS = {
  id: "master-numbers",
  title: "What Are Master Numbers?",
  paragraphs: [
    "Many modern numerology traditions preserve 11, 22 and 33 rather than reducing them immediately to 2, 4 and 6.",
    "They are commonly called Master Numbers.",
    "This does not mean that people with these numbers are more evolved, important or powerful.",
    "The term describes a numerological convention, not a human hierarchy.",
    "The treatment of 11, 22 and 33 as Master Numbers is common in contemporary numerology, although some calculators preserve only 11 and 22 or apply different reduction rules.",
  ],
};

export const PAGE03_DIFFERENT_RESULTS = {
  id: "different-results",
  title: "Why Do Some Calculators Give Different Results?",
  intro: "Calculators can differ because numerology does not have one regulated universal calculation standard.",
  bullets: [
    "add every birth-date digit in one line",
    "reduce month, day and year separately",
    "preserve Master Numbers during intermediate steps",
    "preserve Master Numbers only at the final step",
    "show compound numbers such as 13/4 or 29/11",
    "reduce every result immediately to 1–9",
  ],
  closing: "A trustworthy calculator should disclose its method rather than hide the arithmetic.",
};

export const PAGE03_DEFINE_PERSONALITY = {
  id: "define-personality",
  title: "Can Your Life Path Number Define Your Personality?",
  paragraphs: [
    "No single number can contain a complete person.",
    "A person’s lived experience is also shaped by family, culture, relationships, body, environment, opportunity, adversity and choice.",
    "A Life Path Number may be used as a symbolic prompt.",
    "It should not become a diagnosis, permanent identity or excuse for harmful behaviour.",
  ],
};

export const PAGE03_PREDICT_FUTURE = {
  id: "predict-future",
  title: "Does Your Life Path Number Predict Your Future?",
  paragraphs: [
    "No Life Path calculation can reliably predict specific future events.",
    "Some numerology traditions use predictive language, but 1320 should not repeat or amplify those claims.",
    "This page presents Life Path Numerology as a symbolic tradition for reflection—not verified forecasting.",
  ],
};

export const PAGE03_MEANINGS_INTRO = {
  id: "life-path-meanings",
  title: "Life Path Number Meanings",
  paragraphs: [
    "The brief meanings below are commonly associated with each Life Path Number in numerology.",
    "They are symbolic prompts for reflection—not fixed identities, diagnoses or predictions.",
  ],
};

export const PAGE03_BRIDGE = {
  id: "after-one-number",
  title: "What Comes After One Life Path Number?",
  paragraphs: [
    "Your Life Path Number gives you one numerological theme.",
    "A 1320 Soul Blueprint begins from the same basic input—a full birth date—but follows a different symbolic system.",
    "The Free Soul Blueprint opens four Foundation Mirrors:",
  ],
  foundations: [
    "S1 · Soul Origin",
    "S3 · Soul Vibration",
    "S2 · Soul Mirror",
    "S0 · Void Gate",
  ],
  distinction: [
    "Your Life Path result is not part of the 1320 calculation.",
    "The two systems should remain visibly separate.",
  ],
  conversion: [
    "One number may offer a broad theme.",
    "Four Foundation Mirrors may help you explore how origin, expression, relationships and return move together.",
  ],
  boundary: "Free to explore. No prediction. No fixed identity.",
};
