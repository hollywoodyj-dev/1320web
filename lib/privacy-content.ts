import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Privacy Policy — 10/15 MVP (steward placeholders). */

export const PRIVACY_META = {
  title: "Privacy Policy",
  description: "How 1320 Soul Origin Code collects, uses, and protects your information.",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: "Overview",
    paragraphs: [
      `This Privacy Policy describes how ${LEGAL_PLACEHOLDERS.companyName} ("1320," "we," "us") collects and uses information when you use 1320SoulCode.com and related Phase 1 experiences.`,
      "1320 is a symbolic self-awareness system. We collect only what is needed to provide the calculator, forms, and support you request.",
      `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}. Questions: ${LEGAL_PLACEHOLDERS.contactEmail}.`,
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: [
      "Birth date — used to calculate your four-part code. On your device, we may also store your birth date in session or local storage so your result page can load.",
      "Form information — name, email, optional birth date, booking preferences, and messages you submit on waitlist, email capture, or booking forms.",
      "Technical data — basic logs such as browser type, pages visited, and approximate region may be collected by our hosting or analytics providers when enabled.",
    ],
  },
  {
    title: "How We Use Information",
    paragraphs: [
      "To calculate and display your 1320 Soul Origin Code result.",
      "To respond to waitlist sign-ups, email capture requests, and booking inquiries.",
      "To send updates you opted into (full report waitlist, code by email, newsletter) with unsubscribe when available.",
      "To improve the site, fix errors, and understand aggregate usage — not to sell your personal data.",
    ],
  },
  {
    title: "What We Do Not Do",
    paragraphs: [
      "We do not sell your personal information.",
      "We do not use 1320 to provide medical, psychological, legal, or financial advice.",
      "We do not claim to predict your future or guarantee outcomes.",
    ],
  },
  {
    title: "Storage & Retention",
    paragraphs: [
      "Phase 1 may store form submissions in email or internal tools as they are configured by the operator — not necessarily in a permanent database on this site.",
      "Birth date in your browser (session/local storage) can be cleared by closing the tab or clearing site data.",
      "We retain submitted form data only as long as needed for the purpose collected or as required by law.",
    ],
  },
  {
    title: "Sharing",
    paragraphs: [
      "We may share data with service providers who help us host the site, send email, or operate forms — under confidentiality obligations.",
      "We may disclose information if required by law or to protect rights, safety, and integrity of the service.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You may choose not to submit forms or optional fields.",
      "You may request access, correction, or deletion of information you submitted by contacting us.",
      "You may unsubscribe from marketing emails when an unsubscribe link is provided.",
    ],
  },
  {
    title: "Children",
    paragraphs: [
      "The service is intended for adults capable of consenting to data processing. If you believe a minor submitted data, contact us to request removal.",
    ],
  },
  {
    title: "International Users",
    paragraphs: [
      "If you access the site from outside your home country, your information may be processed where our providers operate. By using the site, you acknowledge this transfer.",
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "We may update this policy. The effective date at the top will change when we do. Continued use after updates means you accept the revised policy.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Privacy questions: ${LEGAL_PLACEHOLDERS.contactEmail}.`],
  },
];

