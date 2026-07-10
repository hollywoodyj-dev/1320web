import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Global FAQ — Living Blueprint Architecture (Addendum v1.0). */

export const FAQ_META = {
  title: "FAQ",
  description:
    "Frequently asked questions about 1320 — reflective intelligence, Soul Blueprint, calculation, Full Report, and Personal Integration Sessions.",
};

export const FAQ_HERO = {
  eyebrow: "RESOURCES",
  title: "Frequently Asked Questions",
  body: "Answers about how 1320 works, what your Soul Blueprint means, and how to use your result with awareness and agency.",
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
        q: "What is 1320?",
        a: "1320 is a reflective intelligence platform built around the Soul Blueprint. It uses the structure of your birth date as a symbolic mirror for self-recognition, reflection, and integration.",
      },
      {
        q: "Is 1320 fortune-telling?",
        a: "No. 1320 does not predict your future, tell you what will happen, or make fixed claims about your destiny. It offers symbolic reflection.",
      },
      {
        q: "Is this a personality test?",
        a: "No. 1320 is not a personality test. It is a symbolic blueprint and reflective integration system.",
      },
      {
        q: "Is this therapy?",
        a: "No. 1320 is not therapy, diagnosis, crisis support, or a replacement for professional care.",
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
    title: "Calculation & Birth Date",
    items: [
      {
        q: "Does 1320 use birth time or birth location?",
        a: "No. The current 1320 calculation engine uses birth year, month, and day. Birth time and birth location are not required.",
      },
      {
        q: "How is my code calculated?",
        a: "Year maps to S1, the full date to S3, month to S2, and day to S0. Enter your birth date on the calculator page to generate your personal foundation blueprint.",
      },
      {
        q: "What is S1 Soul Origin?",
        a: "Your core archetype — gifts, shadows, and soul direction beneath adaptation.",
      },
      {
        q: "What is S3 Soul Vibration?",
        a: "How your natural frequency moves, expresses, and becomes visible in life — not a score or ranking against others.",
      },
      {
        q: "What is S2 Soul Mirror?",
        a: "What relationships mirror back to you — recurring emotional and relational lessons, not a prediction of who you will attract.",
      },
      {
        q: "What is S0 Void Gate?",
        a: "How you meet uncertainty, transition, surrender, and the unknown — an awakening gate, not a negative label.",
      },
      {
        q: "Does S2 tell me who I will attract?",
        a: "No. S2 does not predict your partner, marriage, or who you will attract. It reflects relationship themes, emotional mirrors, and recurring lessons in connection.",
      },
    ],
  },
  {
    id: "reports",
    title: "Free Result & Full Report",
    items: [
      {
        q: "What do I get for free?",
        a: "Your four foundation codes (S1 → S3 → S2 → S0), short essences, integrated summary, one reflection question, and locked previews of deeper fields.",
      },
      {
        q: "Can I buy the Full Report now?",
        a: "Yes. The Full Report is available now via secure checkout. After purchase, sign in with your account to return anytime.",
      },
      {
        q: "What does the Full Report include?",
        a: "The complete S0–S9 Soul Blueprint: S4 Core Shadow Pattern, S5 Soul Mission, S6 Value & Receiving, S7 Soul Sovereignty, S8 Soul Contribution, S9 Return to Source, plus integration practices and journal.",
      },
      {
        q: "Does S6 predict money?",
        a: "No. S6 is about Value & Receiving. It reflects how you may relate to worth, support, resources, recognition, and receiving. It is not financial advice or money prediction.",
      },
      {
        q: "Where can I preview the full report layout?",
        a: "Visit the sample report — fictional code S1-18 / S3-03 / S2-27 / S0-07 (S3 raw value: 110) for structure preview only.",
      },
    ],
  },
  {
    id: "reading",
    title: "Personal Integration Session",
    items: [
      {
        q: "What is a Personal Integration Session?",
        a: "A live guided conversation to apply your Soul Blueprint in real life — reflection and integration, not fortune-telling or report explanation.",
      },
      {
        q: "Is payment required to book a session?",
        a: "Yes. You pay securely via Stripe for your session type, then choose your time on the scheduling calendar.",
      },
      {
        q: "Should I generate my code before booking?",
        a: "Yes. Your personal S1–S0 structure makes the session grounded and specific.",
      },
      {
        q: "How is a session different from the Full Report?",
        a: "The Full Report is a written S0–S9 blueprint for private reflection. A Personal Integration Session is live guided application in conversation.",
      },
      {
        q: "Can I return for another session later?",
        a: "Yes. Many clients return when a new chapter, pattern, or relationship mirror needs attention.",
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
  "1320 is a reflective intelligence platform for self-awareness and integration only. It is not medical, psychological, legal, or financial advice.";
