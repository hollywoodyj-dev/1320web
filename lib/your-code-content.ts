/** English copy for `/your-code` — structure per 3/15 handoff. */

import { FORM_CONSENT } from "@/lib/form-consent";

export const YOUR_CODE_META = {
  title: "Discover Your 1320 Soul Code",
  description:
    "Enter your birth date to generate your four-part 1320 Soul Origin Code — a mirror for awareness, not prediction.",
};

export const YOUR_CODE_HERO = {
  eyebrow: "BEGIN YOUR 1320 JOURNEY",
  title: "Discover Your Soul Origin Code",
  body: "Your birth date opens a four-part blueprint — Origin Frequency, Vibration Tier, Mirror Path, and Void Gate.",
  anchorLabel: "ENTER MY BIRTH DATE",
};

export const BIRTH_FORM = {
  title: "Generate Your Code",
  labels: { year: "Year", month: "Month", day: "Day" },
  submit: "GENERATE MY CODE",
  privacy: `Your birth date is used only to calculate your code. We do not sell your data. ${FORM_CONSENT.calculator}`,
};

export const WHAT_YOU_RECEIVE = {
  title: "What You Will Receive",
  items: [
    {
      code: "S1",
      title: "Origin Frequency",
      text: "Who you are at origin — soul archetype, gifts, and life axis.",
    },
    {
      code: "S3",
      title: "Vibration Tier",
      text: "How your energy expresses — rhythm, intensity, and growth edge.",
    },
    {
      code: "S2",
      title: "Mirror Path",
      text: "Who you attract — relationship mirrors and patterns for awareness.",
    },
    {
      code: "S0",
      title: "Void Gate",
      text: "How you awaken — core illusion, return path, and integration practice.",
    },
  ],
};

export const WHY_BIRTH_DATE = {
  title: "Why Your Birth Date",
  body: "1320 reads the structural pattern of your birth date — not to predict fate, but to mirror patterns you can integrate with conscious choice. Year, month, and day each map to a distinct layer of your code.",
};

export const YOUR_CODE_DISCLAIMER =
  "1320 is a self-awareness system. It is not fortune-telling, medical advice, or a substitute for professional support.";

export const YOUR_CODE_FAQ = [
  {
    q: "Do I need an exact time of birth?",
    a: "Phase 1 uses your birth date only (year, month, day). Time of birth may be explored in future phases.",
  },
  {
    q: "Is my data stored?",
    a: "Your code is calculated in your session. We do not require an account in Phase 1.",
  },
  {
    q: "How long does it take?",
    a: "Calculation is instant. You will pass through a brief activation screen before your result.",
  },
  {
    q: "Is this a horoscope or astrology tool?",
    a: "No. 1320 is a standalone frequency-based mirror system — not astrology, tarot, or human design.",
  },
  {
    q: "What if I enter the wrong date?",
    a: "Return here and generate again with the correct date. Your code updates with the new input.",
  },
  {
    q: "What happens after my free result?",
    a: "You may explore the sample report, join the full report waitlist, or book a reading for deeper integration.",
  },
];

export const FINAL_CTA = {
  title: "Your Code Is Waiting",
  body: "Enter your birth date to open your first-layer soul mirror.",
  button: "GENERATE MY CODE",
};

export const VALIDATION = {
  empty: "Please enter your full birth date to generate your code.",
  system: "Something went wrong. Please try again in a moment.",
};
