/** FS-006 — Personal Integration prep page copy. */

import { ROLE_TITLE_SHORT } from "@/lib/personal-integration/role-titles";

export const PREP_META = {
  title: "Session Confirmation | Personal Integration | 1320",
  description:
    "Your Personal Integration Session is requested — review your Soul Blueprint and add optional notes for your Blueprint Integration Consultant.",
};

export const PREP_HERO = {
  eyebrow: "SESSION CONFIRMATION",
  title: "Your Session Is Requested",
  body: `We saved your focus from booking. Review your Soul Blueprint below and add optional notes for your ${ROLE_TITLE_SHORT}. We will follow up by email to confirm your session time.`,
  boundary:
    "Symbolic reflection only — not therapy, diagnosis, or prediction. You remain the author of your choices.",
};

export const PREP_SAVED_FOCUS = {
  title: "Your session focus",
  note: "Saved from your booking request — update it by submitting a new booking if your focus changes.",
};

export const PREP_BLUEPRINT = {
  title: "Your Soul Blueprint (read-only)",
  note: "Calculated from your birth date — this structure does not change during prep or the session.",
};

export const PREP_FORM = {
  notesLabel: "Optional prep notes",
  notesHelp: `Anything you want your ${ROLE_TITLE_SHORT} to know before the session.`,
  notesPlaceholder: "Context, recent shifts, or questions you are sitting with…",
  submit: "SAVE NOTES",
  success: "Notes saved. We will follow up by email to confirm your session time.",
  done: "Your session is confirmed. You can return here anytime from My Account to add notes.",
};

export const PREP_INVALID = {
  title: "Prep link unavailable",
  body: "This prep link is invalid or has expired. If you requested a session recently, check your email or submit a new request from the booking page.",
  cta: "Return to booking",
};

export const PREP_STATUS = {
  scheduled: "Your session is scheduled — prep helps us begin with clarity.",
  active: "Your session is in progress.",
  completed: "This session is complete. Thank you for your integration work.",
  cancelled: "This session request was cancelled.",
};
