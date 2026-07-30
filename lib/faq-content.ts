/** Global FAQ — Page 11 Refinement Spec v1.0 (Wisewave). */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const FAQ_META = {
  title: "FAQ | 1320 Soul Code",
  description:
    "Clear answers about how 1320 works, what your Soul Blueprint means, and how to begin with confidence.",
};

export const FAQ_HERO = {
  eyebrow: "Resources",
  title: "Frequently Asked Questions",
  body: "Clear answers about how 1320 works, what your Soul Blueprint means, and how to begin with confidence.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "Explore the Blueprint",
  secondaryHref: "/blueprint",
};

export const FAQ_CATEGORY_CHIPS = [
  { id: "general", label: "General" },
  { id: "calculation", label: "Birth Date" },
  { id: "reports", label: "Free & Full Report" },
  { id: "reading", label: "Integration Session" },
  { id: "privacy", label: "Privacy" },
] as const;

export type FaqSection = {
  id: string;
  title: string;
  items: {
    q: string;
    a: string;
    href?: string;
    linkLabel?: string;
  }[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is 1320?",
        a: "1320 is a reflective intelligence platform built around the Soul Blueprint. Your birth date becomes a symbolic mirror for self-recognition, reflection, and integration — not a prediction of your future. For the canonical definition, read What Is a Soul Blueprint?",
        href: "/what-is-a-soul-blueprint",
        linkLabel: "What Is a Soul Blueprint?",
      },
      {
        q: "Is 1320 fortune-telling?",
        a: "No. 1320 does not predict your future or make fixed claims about destiny. It offers symbolic reflection for awareness.",
      },
      {
        q: "Is this a personality test?",
        a: "No. 1320 is not a personality test. It is a symbolic blueprint for reflection and integration.",
      },
      {
        q: "Is this therapy?",
        a: "No. 1320 is not therapy, diagnosis, crisis support, or a replacement for professional care.",
      },
      {
        q: "Do I need spiritual beliefs to use it?",
        a: "No. Curiosity and a willingness to reflect are enough. The language is symbolic and grounded.",
      },
      {
        q: "Can my code change?",
        a: "Your birth structure remains stable. Your relationship with the mirror can deepen as you integrate.",
      },
    ],
  },
  {
    id: "calculation",
    title: "Calculation & Birth Date",
    items: [
      {
        q: "Does 1320 use birth time or birth location?",
        a: "No. The current 1320 calculation uses birth year, month, and day only. Birth time and birth location are not required.",
      },
      {
        q: "How is my code calculated?",
        a: "Year maps to S1, the full date to S3, month to S2, and day to S0 — in foundation order S1 → S3 → S2 → S0. Enter your birth date to generate your personal foundation blueprint.",
      },
      {
        q: "What is S1 · Soul Origin?",
        a: "Your Soul Origin points to the original pattern beneath adaptation — gifts, shadows, and direction that remain when roles fall away.",
      },
      {
        q: "What is S3 · Soul Vibration?",
        a: "Your Soul Vibration shows how your essence naturally moves and expresses. It is not a score, rank, or measure of spiritual maturity.",
      },
      {
        q: "What is S2 · Soul Mirror?",
        a: "Your Soul Mirror reflects relational themes and emotional lessons that may help you see yourself more clearly — not a prediction of who you will meet.",
      },
      {
        q: "What is S0 · Void Gate?",
        a: "Your Void Gate shows how you meet uncertainty and return to self. It is an awakening gate for reflection — not fate, collapse, or diagnosis.",
      },
      {
        q: "Does S2 predict who I will attract?",
        a: "No. S2 is not a prediction of who you will attract. S2 reflects relational mirror patterns — the kinds of emotional lessons, projections, and relationship themes that may help you see yourself more clearly.",
      },
    ],
  },
  {
    id: "reports",
    title: "Free Result & Full Report",
    items: [
      {
        q: "What do I get for free?",
        a: "Your four foundation codes (S1 → S3 → S2 → S0), short essences, an integrated summary, one reflection prompt, and locked previews of deeper layers.",
      },
      {
        q: "Can I buy the Full Report now?",
        a: "Yes. The Full Report is available through secure checkout. After purchase, sign in with your account to return anytime.",
      },
      {
        q: "What does the Full Report include?",
        a: "The complete S0–S9 Soul Blueprint — including S4–S9, integration practices, and a reflection journal — for private reading and integration.",
      },
      {
        q: "Does S6 predict money?",
        a: "No. S6 does not predict money, wealth, or financial outcomes. S6 is called Value & Receiving. It reflects how you relate to worth, support, receiving, and value circulation.",
      },
      {
        q: "Where can I preview the full report layout?",
        a: "Visit the Sample Report for a guided preview of structure and tone. It uses a sample code for preview only — not your personal full report.",
      },
    ],
  },
  {
    id: "reading",
    title: "Personal Integration Session",
    items: [
      {
        q: "What is a Personal Integration Session?",
        a: "A live guided conversation to apply your Soul Blueprint in real life. A Personal Integration Session is reflective integration only. It is not therapy, diagnosis, prediction, legal, financial, or medical advice.",
      },
      {
        q: "Is payment required to book a session?",
        a: "Yes. You pay securely via Stripe for your session type, then choose your time on the scheduling calendar.",
      },
      {
        q: "Should I generate my code before booking?",
        a: "Yes. Your personal S1–S0 structure helps the session stay grounded and specific.",
      },
      {
        q: "How is a session different from the Full Report?",
        a: "The Full Report is a written S0–S9 blueprint for private reflection. A Personal Integration Session is live guided application in conversation.",
      },
      {
        q: "Can I return for another session later?",
        a: "Yes. Many people return when a new chapter, pattern, or relationship mirror needs attention.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    items: [
      {
        q: "What data do you collect?",
        a: "Your birth data is used to generate your blueprint and handled according to our Privacy Policy. We may also collect information you voluntarily submit on forms, such as email, name, or booking details.",
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
        q: "Where is the full Privacy Policy?",
        a: "Read the Privacy Policy page for collection, use, retention, and your rights.",
      },
    ],
  },
];

export const FAQ_FINAL = {
  title: "Still Have Questions?",
  body: "You can begin with your free code, explore the sample report, or review our legal pages for details about privacy and boundaries.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "Privacy Policy",
  secondaryHref: "/privacy",
  sampleCta: "View Sample Report",
  sampleHref: SAMPLE_REPORT_HREF,
};

export const FAQ_DISCLAIMER =
  "1320 is a reflective intelligence platform for self-awareness and integration only. It is not medical, psychological, legal, or financial advice.";

export const FAQ_FOOTER_MANTRA = "YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.";
