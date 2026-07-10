/** English copy for `/your-code` — Living Blueprint entry (Addendum v1.0). */

import { FORM_CONSENT } from "@/lib/form-consent";

export const YOUR_CODE_META = {
  title: "Your Code | Begin Your Soul Blueprint",
  description:
    "Enter your birth year, month, and day to generate your first-layer Soul Blueprint — a symbolic mirror for awareness, not prediction.",
};

export const YOUR_CODE_HERO = {
  eyebrow: "BEGIN YOUR SOUL BLUEPRINT",
  title: "Start With Your Birth Date",
  body: "1320 uses your birth year, month, and day to generate your first-layer Soul Blueprint — a symbolic mirror of your origin, expression, relational patterns, and return path.",
  birthNote: "Birth time and birth location are not required for the current 1320 calculation engine.",
  anchorLabel: "ENTER MY BIRTH DATE",
};

export const BIRTH_FORM = {
  title: "Generate Your Code",
  labels: { year: "Year", month: "Month", day: "Day" },
  submit: "GENERATE MY CODE",
  privacy: `Your birth date is used only to calculate your blueprint. We do not sell your data. ${FORM_CONSENT.calculator}`,
};

export const WHAT_YOU_RECEIVE = {
  title: "What You Will Receive",
  items: [
    {
      code: "S1",
      title: "Soul Origin",
      text: "Your original essence and inner source pattern — gifts, shadows, and soul direction.",
    },
    {
      code: "S3",
      title: "Soul Vibration",
      text: "How your natural frequency moves, expresses, and becomes visible in life.",
    },
    {
      code: "S2",
      title: "Soul Mirror",
      text: "What relationships mirror back to you — recurring emotional and relational lessons.",
    },
    {
      code: "S0",
      title: "Void Gate",
      text: "How you meet uncertainty, transition, surrender, and the unknown.",
    },
  ],
};

export const WHY_BIRTH_DATE = {
  title: "Why Your Birth Date",
  body: "1320 reads the structural pattern of your birth date — year, month, and day — not to predict fate, but to mirror patterns you can integrate with conscious choice. Birth time and birth location are not used in the current calculation engine.",
};

export const YOUR_CODE_DISCLAIMER =
  "1320 is a reflective intelligence platform for self-awareness. It is not fortune-telling, medical advice, or a substitute for professional support.";

export const YOUR_CODE_FAQ = [
  {
    q: "Do I need an exact time of birth?",
    a: "No. The current 1320 calculation engine uses birth year, month, and day only. Birth time and birth location are not required.",
  },
  {
    q: "Is my data stored?",
    a: "Your code is calculated in your session. Account sign-in is optional until you purchase or create a profile.",
  },
  {
    q: "How long does it take?",
    a: "Calculation is instant. You will pass through a brief activation screen before your result.",
  },
  {
    q: "Is this a horoscope or astrology tool?",
    a: "No. 1320 is a standalone reflective intelligence system — not astrology, tarot, or Human Design.",
  },
  {
    q: "What if I enter the wrong date?",
    a: "Return here and generate again with the correct date. Your code updates with the new input.",
  },
  {
    q: "What happens after my free result?",
    a: "You may explore the sample report, unlock the Full Report (S0–S9), or book a Personal Integration Session for live application.",
  },
];

export const FINAL_CTA = {
  title: "Your Blueprint Is Waiting",
  body: "Enter your birth date to open your first-layer Soul Blueprint mirror.",
  button: "GENERATE MY CODE",
};

export const VALIDATION = {
  empty: "Please enter your full birth date to generate your code.",
  system: "Something went wrong. Please try again in a moment.",
};
