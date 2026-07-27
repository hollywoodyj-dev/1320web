/** Personal Integration Session (`/booking`) — Launch v1 pricing & product tiers. */

import {
  SESSION_CATALOG,
  SESSION_PRODUCT_ORDER,
} from "@/lib/personal-integration/session-catalog";
import {
  ROLE_BOUNDARY,
  ROLE_MEET_HEADING,
  ROLE_SESSION_SUPPORTING,
  ROLE_TITLE_SHORT,
} from "@/lib/personal-integration/role-titles";

export const BOOKING_META = {
  title: "Personal Integration Session | 1320 Soul Code",
  description: ROLE_SESSION_SUPPORTING,
};

export const BOOKING_HERO = {
  eyebrow: "Personal Integration Session",
  titleLine1: "Your Blueprint Does Not Change.",
  titleLine2: "Your Relationship With It Does.",
  meetHeading: ROLE_MEET_HEADING,
  body: ROLE_SESSION_SUPPORTING,
  boundaryLine1: "Reflective integration only.",
  boundaryLine2: "Not therapy, diagnosis, prediction, legal, financial, or medical advice.",
  roleBoundary: ROLE_BOUNDARY.lines,
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
    `A Personal Integration Session is a guided reflective conversation with a ${ROLE_TITLE_SHORT}, based on your 1320 Soul Blueprint.`,
    "Together, you explore how your blueprint may be showing up in your current season — through identity, relationships, choices, transitions, and growth edges.",
    "It is not here to tell you what to do. It is here to help you see more clearly.",
    ROLE_BOUNDARY.posture,
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

/** Launch v1 Session products — order: 45 → 60 (Most Recommended) → 75. */
export const READING_OPTIONS = {
  title: "Session Options",
  mostRecommendedLabel: "Most Recommended",
  options: SESSION_PRODUCT_ORDER.map((id) => {
    const product = SESSION_CATALOG[id];
    return {
      id: product.id,
      title: product.title,
      duration: product.durationLabel,
      price: product.priceDisplay,
      text: product.positioning,
      includes: product.includes,
      mostRecommended: product.mostRecommended,
      cta: product.cta,
    };
  }),
};

export const BEFORE_SESSION = {
  title: "Before Your Session",
  items: [
    "Pay & book your Session.",
    "Schedule your time on the confirmation page.",
    "Complete your Pre-Session Intake.",
    "Come as you are — no perfect preparation is needed.",
  ],
  afterNote:
    "After payment you will schedule your Session, then complete Pre-Session Intake so your Blueprint Integration Consultant can prepare with your Soul Blueprint.",
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
    a: "The options are different depths and time containers — not different levels of personal worth. Blueprint Integration Session (45 minutes · USD 119) is focused on one clear question or core pattern. Focused Life Integration Session (60 minutes · USD 159) is the most recommended complete exploration of one primary life theme. Deep Blueprint Integration Session (75 minutes · USD 209) offers more space for transitions, recurring patterns, or several interconnected themes.",
  },
  {
    q: "Will you tell me my future?",
    a: "No. 1320 does not predict your future. The session helps you reflect on patterns, choices, and integration. It is guided reflection and personal integration — non-diagnostic, non-predictive, and non-deterministic. It is not therapy, medical, legal, financial, or crisis support. You remain the author and decision-maker.",
  },
  {
    q: "Who will I meet with?",
    a: "You meet with a Blueprint Integration Consultant (full title: 1320 Soul Blueprint Integration Consultant). The Session supports reflection, recognition and conscious choice. Your Consultant will not define you, predict your future, diagnose you, or make decisions on your behalf.",
  },
  {
    q: "What happens after booking?",
    a: "After payment you schedule your Session, complete Pre-Session Intake, meet with your Blueprint Integration Consultant, and receive a reviewed Personal Integration Summary.",
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
