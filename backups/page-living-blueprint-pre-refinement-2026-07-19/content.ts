/** FS-008 — Living Blueprint / Membership UI copy (member-facing). */

export const LIVING_BLUEPRINT_META = {
  title: "Living Blueprint | 1320 Membership",
  description:
    "Your immutable Soul Blueprint alongside how you are living it now — a quiet membership journey.",
};

export const LIVING_BLUEPRINT_HERO = {
  eyebrow: "MEMBERSHIP",
  title: "Your Living Blueprint Journey",
  body: "One Soul Blueprint — always read-only. Expression, reflections, and journey notes evolve as you do.",
  boundary: "Continuity for reflection — not surveillance or prediction.",
};

export const MEMBERSHIP_SECTION = {
  title: "Living Blueprint Membership",
};

export const EXPRESSION_FORM = {
  label: "Current Expression State",
  help: "How you are living your blueprint now — movement matters more than position.",
  save: "Update expression",
  saved: "Expression updated.",
};

export const CHECKIN_FORM = {
  label: "Membership check-in",
  help: "A brief note on what shifted since your last review.",
  placeholder: "What are you noticing in your patterns, practice, or growth edge?",
  submit: "Save check-in",
  success: "Check-in saved. Your Living Blueprint review date was updated.",
};

export const PROFILE_SUMMARY = {
  title: "Your membership profile",
  name: "Name",
  codes: "Soul Blueprint codes",
  expression: "Current Expression State",
  journey: "Journey",
  lastReview: "Last Living Blueprint review",
  notYet: "Not yet recorded",
};

export const MEMORY_EMPTY = "Nothing here yet — your journey will gather here over time.";

export const SOUL_BLUEPRINT_SECTION = {
  title: "Soul Blueprint",
  note: "Read-only and immutable.",
};

export const NEXT_STEPS = {
  title: "Continue your journey",
  items: [
    {
      id: "todays-reflection",
      label: "Today’s Reflection",
      href: "#todays-reflection",
      primary: true,
    },
    {
      id: "wisewave",
      label: "Continue With Wisewave",
      href: "/reflect",
      primary: false,
    },
    {
      id: "full-report",
      label: "Open My Full Report",
      href: null as string | null, // filled with report id at render
      primary: false,
    },
    {
      id: "booking",
      label: "Book Personal Integration Session",
      href: "/booking",
      primary: false,
    },
  ],
};

export const ACCESS_DENIED = {
  title: "Living Blueprint",
  unauthenticated: "Sign in with your account to view your Living Blueprint.",
  noEntitlement: "Living Blueprint membership is available with Full Report access.",
  ctaCheckout: "Get Full Report",
  ctaMyReport: "My reports",
  ctaSignIn: "Sign In",
};
