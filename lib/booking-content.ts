/** Personal Integration Session (`/booking`) — Refinement Spec v1.0 (Wisewave). */

export const BOOKING_META = {
  title: "Personal Integration Session | 1320 Soul Code",
  description:
    "A guided one-on-one conversation to help you understand how your Soul Blueprint is showing up in real life — reflective integration, not therapy or prediction.",
};

export const BOOKING_HERO = {
  eyebrow: "Personal Integration Session",
  titleLine1: "Your Blueprint Does Not Change.",
  titleLine2: "Your Relationship With It Does.",
  body: "A guided one-on-one conversation to help you understand how your Soul Blueprint is showing up in your real life, relationships, decisions, and growth.",
  boundaryLine1: "Reflective integration only.",
  boundaryLine2: "Not therapy, diagnosis, prediction, legal, financial, or medical advice.",
  primaryCta: "Pay & Book Session",
  secondaryCta: "Explore Full Report",
};

export const POSITIONING = {
  title: "How This Fits",
  lines: [
    "The Full Report shows your blueprint.",
    "The Personal Integration Session helps you understand how it is living through your current situation.",
    "Wisewave helps you continue reflecting afterward.",
  ],
};

export const WHAT_IS_READING = {
  title: "What Is a Personal Integration Session?",
  body: [
    "A Personal Integration Session is a guided reflective conversation based on your 1320 Soul Blueprint.",
    "Together, we explore how your blueprint may be showing up in your current season — through identity, relationships, choices, transitions, and growth edges.",
    "It is not here to tell you what to do. It is here to help you see more clearly.",
  ],
};

export const SESSION_EXPERIENCE = {
  title: "Session Experience",
  points: [
    "Safe reflective conversation",
    "Pattern recognition",
    "Real-life integration",
    "Gentle next-step clarity",
  ],
};

export const HOW_BLUEPRINT_SHOWS_UP = {
  title: "How Your Blueprint Shows Up",
  items: [
    {
      category: "Identity",
      code: "S1",
      text: "How your original pattern shapes self-recognition.",
    },
    {
      category: "Relationships",
      code: "S2",
      text: "How relational mirrors reveal recurring lessons.",
    },
    {
      category: "Expression",
      code: "S3",
      text: "How your natural frequency wants to move through life.",
    },
    {
      category: "Transition",
      code: "S0",
      text: "How you meet uncertainty, change, and return.",
    },
  ],
};

export const BOOKING_WHO_FOR = {
  title: "Who This Is For",
  lead: "This session is for you if:",
  items: [
    "You want support understanding your Soul Blueprint.",
    "You are in a life transition or decision point.",
    "You want to explore recurring patterns with more clarity.",
    "You want reflective integration, not advice-giving.",
  ],
};

export const BOOKING_WHO_NOT = {
  title: "Who This Is Not For",
  lead: "This session is not for you if:",
  items: [
    "You want prediction or guaranteed answers.",
    "You want therapy, diagnosis, or crisis support.",
    "You want someone to decide your life for you.",
  ],
};

/** Keep ids stable for Stripe / checkout (`intro` | `deep` | `integration`). */
export const READING_OPTIONS = {
  title: "Session Options",
  options: [
    {
      id: "intro",
      title: "Blueprint Integration Session",
      duration: "45 minutes",
      text: "For first-time integration after receiving your report.",
      cta: "Book This Session",
    },
    {
      id: "deep",
      title: "Deep Blueprint Integration",
      duration: "75 minutes",
      text: "For deeper exploration of patterns, relationships, transitions, or mission.",
      cta: "Book This Session",
    },
    {
      id: "integration",
      title: "Focused Life Integration",
      duration: "60 minutes",
      text: "For one specific life question or current decision point.",
      cta: "Book This Session",
    },
  ],
};

export const BEFORE_SESSION = {
  title: "Before Your Session",
  items: [
    "Complete your booking.",
    "Bring your birth date or report link.",
    "Choose one current life area you want to reflect on.",
    "Come as you are — no perfect preparation is needed.",
  ],
  afterNote: "After booking, you will receive confirmation and session details by email.",
};

export const BOOKING_FORM_SECTION = {
  title: "Book Your Session",
  signedInLead: "Choose your session and continue to booking.",
  anonymousLead:
    "Create or sign in to your account so your session can be connected to your Soul Blueprint.",
  createAccountCta: "Create Account",
  signInCta: "Sign In",
  generateCodeCta: "Generate My Code First",
  payCta: "Pay & Book Session",
};

export const SESSION_REFLECTIONS = {
  title: "Session Reflections",
  lead: "These are the kinds of questions we may explore:",
  questions: [
    "What pattern keeps repeating in my life?",
    "What is my blueprint asking me to see now?",
    "What would integration look like in this season?",
  ],
};

export const BOOKING_FAQ = [
  {
    q: "Is this therapy or coaching?",
    a: "No. This is a reflective integration session based on your 1320 Soul Blueprint. It is not therapy, diagnosis, treatment, coaching certification, or professional advice.",
  },
  {
    q: "Do I need my Full Report first?",
    a: "It is recommended, but not always required. The Full Report gives deeper context for the session.",
  },
  {
    q: "What session should I choose?",
    a: "Choose Blueprint Integration for first-time support, Deep Blueprint Integration for more layered exploration, and Focused Life Integration for one specific current situation.",
  },
  {
    q: "Will you tell me my future?",
    a: "No. 1320 does not predict your future. The session helps you reflect on patterns, choices, and integration.",
  },
  {
    q: "What happens after booking?",
    a: "You will receive booking confirmation and session details by email.",
  },
];

export const AFTER_INTEGRATION = {
  title: "After Your Session",
  body: [
    "Your blueprint remains the same.",
    "Your relationship with it can continue to deepen.",
  ],
  continueLead: "You may continue through:",
  path: ["Full Report", "Personal Integration", "Wisewave Reflection", "Living Blueprint"],
};

export const BOOKING_DISCLAIMER =
  "1320 Personal Integration Sessions are for reflective self-awareness only. They are not medical, psychological, legal, or financial advice. You remain responsible for your choices.";

export const BOOKING_FINAL = {
  title: "Ready to Continue Your Blueprint?",
  body: "Book a Personal Integration Session and explore your blueprint in a focused one-on-one conversation.",
  cta: "Pay & Book Session",
  secondaryCta: "View Sample Report",
};
