import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Global FAQ — 10/15 handoff. */

export const FAQ_META = {
  title: "FAQ",
  description:
    "Frequently asked questions about the 1320 Soul Origin Code — calculation, free result, full report waitlist, readings, and privacy.",
};

export const FAQ_HERO = {
  eyebrow: "RESOURCES",
  title: "Frequently Asked Questions",
  body: "Answers about how 1320 works, what your codes mean, and how to use your result with awareness and agency.",
};

export type FaqSection = {
  id: string;
  title: string;
  items: { q: string; a: string }[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is the 1320 Soul Origin Code?",
        a: "A four-part symbolic blueprint derived from your birth date — S1 Origin Frequency, S3 Vibration Tier, S2 Mirror Path, and S0 Void Gate — designed for self-awareness and integration.",
      },
      {
        q: "Is 1320 fortune-telling?",
        a: "No. 1320 is a mirror for reflection — not prediction, fate, or guaranteed outcomes.",
      },
      {
        q: "Do I need spiritual beliefs to use it?",
        a: "No. Curiosity and willingness to reflect are enough. The language is symbolic and grounded.",
      },
      {
        q: "Can my code change?",
        a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
      },
    ],
  },
  {
    id: "calculation",
    title: "Calculation (S1–S0)",
    items: [
      {
        q: "How is my code calculated?",
        a: "Year maps to S1, the full date to S3, month to S2, and day to S0. Enter your birth date on the calculator page to generate your personal code.",
      },
      {
        q: "What is S1 Origin Frequency?",
        a: "Your core archetype — gifts, shadows, and soul direction beneath adaptation.",
      },
      {
        q: "What is S3 Vibration Tier?",
        a: "How your energy expresses in the world — not a score or ranking against others.",
      },
      {
        q: "What is S2 Mirror Path?",
        a: "Relationship patterns and mirrors that activate growth — not a prediction of who you will marry.",
      },
      {
        q: "What is S0 Void Gate?",
        a: "A core illusion ready to be seen with compassion — an awakening gate, not a negative label.",
      },
    ],
  },
  {
    id: "reports",
    title: "Free Result & Full Report",
    items: [
      {
        q: "What do I get for free?",
        a: "Your four codes, short essences, integrated summary, one reflection question, and locked previews of deeper fields.",
      },
      {
        q: "Can I buy the Full Report now?",
        a: "Not in Phase 1. Join the full report waitlist — there is no checkout on this site yet.",
      },
      {
        q: "What is in the Full Report?",
        a: "Expanded S1–S0 fields, integration practices, reflection journal prompts, and advanced S4–S6 modules.",
      },
      {
        q: "Is S6 financial advice?",
        a: "No. S6 Money Frequency is symbolic self-awareness only — not investment, tax, or financial planning advice.",
      },
      {
        q: "Where can I preview the full report layout?",
        a: "Visit the sample report page — it uses fictional code S1-18 / S3-110 / S2-27 / S0-07 for structure preview only.",
      },
    ],
  },
  {
    id: "reading",
    title: "Reading & Booking",
    items: [
      {
        q: "What is a 1320 Reading?",
        a: "A live session to explore your four codes with integration focus — not fortune-telling or telling you your fate.",
      },
      {
        q: "Is payment required to request a booking?",
        a: "No. Phase 1 is a booking request only. We follow up by email to coordinate.",
      },
      {
        q: "Should I generate my code before booking?",
        a: "Yes. Your personal S1–S0 structure makes the session grounded and specific.",
      },
      {
        q: "How is a reading different from the waitlist?",
        a: "The waitlist is for the written Full Report product. A reading is a live 1:1 integration session.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    items: [
      {
        q: "What data do you collect?",
        a: "Birth date for code calculation, and information you voluntarily submit on forms (email, name, booking details). See our Privacy Policy for details.",
      },
      {
        q: "Do you sell my data?",
        a: "No. We do not sell your personal data.",
      },
      {
        q: "How do I unsubscribe from emails?",
        a: `Use the unsubscribe option in our emails when available, or contact us at ${LEGAL_PLACEHOLDERS.contactEmail}.`,
      },
      {
        q: "Where is the full privacy policy?",
        a: "Read the Privacy Policy page for collection, use, retention, and your rights.",
      },
    ],
  },
];

export const FAQ_DISCLAIMER =
  "1320 is for self-awareness and reflection only. It is not medical, psychological, legal, or financial advice.";
