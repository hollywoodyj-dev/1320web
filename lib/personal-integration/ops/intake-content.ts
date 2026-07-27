/** Pre-Session Intake Form v1.1 · Easy Access Edition — page chrome. */

import { ROLE_TITLE_SHORT } from "@/lib/personal-integration/role-titles";

export const INTAKE_META = {
  title: "Pre-Session Intake | Personal Integration",
  description: `A short, simple form to help your ${ROLE_TITLE_SHORT} know where to begin.`,
};

export const INTAKE_COPY = {
  eyebrow: "PERSONAL INTEGRATION",
  title: "Pre-Session Intake",
  lead: `You do not need to prepare the perfect answer.\n\nA few simple words are enough. This form helps your ${ROLE_TITLE_SHORT} understand where you would like to begin.`,
  timeEstimate: "About 3–5 minutes",
  boundary:
    "Personal Integration is a reflective service. You do not need technical Blueprint language — ordinary words are enough.",
  saveDraft: "Save Draft",
  continueLater: "Continue Later",
  submit: "Submit Intake",
  savedDraft: "Draft saved. You can return and continue later.",
  submittedTitle: "Your intake has been received.",
  submittedBody: `Your ${ROLE_TITLE_SHORT} will review it before the Session.`,
  returnAccount: "Return to Account",
  openPrep: "Open Session Prep Space",
  openReport: "Open My Full Report",
  unauthorized: "Sign in or use your session link to complete this intake.",
  notFound: "We could not find this Personal Integration Session.",
  alreadySubmitted: "This intake has already been submitted.",
  missingRequired:
    "Please answer the required questions (explore topics, what has been happening, and what would feel helpful).",
  consentRequired: "Please confirm that you understand the reflective-service boundary.",
};

/** @deprecated Wellbeing flags from v1.0 — retained for historical rows only. */
export const INTAKE_WELLBEING_FLAG_KEYS = ["in_crisis", "professional_care", "scope_acknowledgement"] as const;
