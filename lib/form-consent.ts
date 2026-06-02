/** Unified form consent copy — 10/15 handoff. */

export const FORM_CONSENT = {
  calculator:
    "I understand 1320 is a symbolic self-awareness tool — not prediction, diagnosis, or professional advice.",
  waitlist:
    "I want to receive updates about the Full 1320 Soul Origin Report and can unsubscribe at any time.",
  booking:
    "I understand this is a reflection and self-awareness request — not prediction, diagnosis, therapy, legal, financial, or medical advice.",
  emailCapture:
    "I agree to receive my 1320 code and related guidance by email, and I can unsubscribe at any time.",
} as const;

export const FORM_MESSAGES = {
  waitlistSuccess: "You are on the waitlist. We will reach out when the Full Soul Origin Report opens.",
  waitlistError: "Please complete all required fields and confirm your consent.",
  bookingSuccess:
    "Your booking request has been received. We will follow up by email to coordinate your session.",
  bookingError: "Please complete all required fields and confirm your consent.",
  emailSuccess: "Thanks. Your interest has been captured.",
} as const;
