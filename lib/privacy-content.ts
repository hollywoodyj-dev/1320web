/** Privacy Policy — Conversion UI Refinement · Launch v1 · P0 product-state alignment. */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const PRIVACY_META = {
  title: "Privacy Policy | 1320 Soul Code",
  description:
    "How 1320 collects, uses, and protects information for Free Soul Blueprint, Full Report, accounts, purchases, and Sessions.",
};

export const PRIVACY_HERO = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  body: "How 1320 collects, uses, and protects information when you generate your Soul Blueprint or use related services.",
  subline:
    "We only collect what is needed to provide the Free Soul Blueprint, reports, purchases, bookings, accounts, and support you request.",
};

export type PrivacyBlock = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PrivacyCollectItem = {
  title: string;
  body: string;
};

export const PRIVACY_OVERVIEW: PrivacyBlock = {
  id: "overview",
  title: "Overview",
  paragraphs: [
    `This Privacy Policy explains how ${LEGAL_PLACEHOLDERS.companyName} collects and uses information when you use 1320SoulCode.com and related 1320 experiences.`,
    "1320 is a symbolic self-awareness system. We collect only what is needed to provide Free Soul Blueprint generation, Sample and Full Report access, account entitlement, Personal Integration Session purchase and booking, and support you request.",
    `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}`,
    `Questions: ${LEGAL_PLACEHOLDERS.contactEmail}`,
  ],
};

export const PRIVACY_SUMMARY = {
  id: "summary",
  title: "Privacy Summary",
  items: [
    "Your birth date is used to generate your Free Soul Blueprint and related report content.",
    "Account, purchase, and booking details are collected when you create an account, check out, or book a Session.",
    "Transactional emails may be sent for purchases, access, booking, and account activity.",
    "Marketing emails are sent only when you have opted in or recorded consent.",
    "We do not sell your personal information.",
    "Technical data may be collected to keep the site working and improve reliability.",
    "You may contact us to request access, correction, or deletion of information you submitted.",
  ],
};

export const PRIVACY_COLLECT = {
  id: "collect",
  title: "Information We Collect",
  items: [
    {
      title: "Birth Date",
      body: "Used to calculate your Soul Blueprint. On your device, your birth date may also be stored in session or local storage so your result page can load.",
    },
    {
      title: "Account & Contact Details",
      body: "Name, email, and password-related account data when you create an account or sign in for entitled Full Report access.",
    },
    {
      title: "Purchase & Booking Information",
      body: "Checkout, entitlement, Session selection, scheduling, and Pre-Session Intake details needed to complete paid products and deliver access.",
    },
    {
      title: "Form Information",
      body: "Optional messages and preferences you submit through support, email capture, or booking-related forms.",
    },
    {
      title: "Technical & Campaign Data",
      body: "Basic logs such as browser type, pages visited, and approximate region may be collected by hosting or analytics providers. Campaign attribution (such as UTM parameters) may be stored without birth dates or report content.",
    },
  ] satisfies PrivacyCollectItem[],
};

export const PRIVACY_USE: PrivacyBlock = {
  id: "use",
  title: "How We Use Information",
  paragraphs: [
    "We use information to calculate and display your Free Soul Blueprint and related report experiences.",
    "We use it to process Full Report and Personal Integration Session purchases, confirm entitlement, and support Web, Mobile, and PDF access.",
    "We use it to operate booking, scheduling, Pre-Session Intake, and Session delivery workflows.",
    "We may send transactional emails about purchases, access, booking, and account activity.",
    "We may send marketing updates only when you have opted in or recorded consent, with unsubscribe options when available.",
    "We use aggregate usage signals to improve the site, fix errors, and understand reliability.",
    "We do not sell your personal information.",
  ],
};

export const PRIVACY_DO_NOT: PrivacyBlock = {
  id: "do-not",
  title: "What We Do Not Do",
  paragraphs: [
    "We do not sell your personal information.",
    "We do not use 1320 data to provide medical, psychological, legal, or financial advice.",
    "We do not claim to predict your future or guarantee outcomes.",
    "We do not send birth dates, Blueprint codes, report text, or private reflections to advertising platforms as analytics properties.",
  ],
};

export const PRIVACY_STORAGE: PrivacyBlock = {
  id: "storage",
  title: "Storage, Retention & Sharing",
  paragraphs: [
    "1320 may store account, purchase, entitlement, booking, and form data in databases and tools configured by the site operator.",
    "Birth date may be stored on your browser through session or local storage so your result page can reload, and may be associated with report records needed for entitlement.",
    "Payment card details are handled by payment providers; 1320 does not store full card numbers.",
    "Submitted data is retained only as long as needed for the purpose collected, to provide entitled access and Session delivery, or as required by law.",
    "We may share data with service providers who help us host the site, process payments, send email, authenticate users, schedule bookings, or operate forms under confidentiality obligations.",
    "We may disclose information if required by law or to protect the rights, safety, and integrity of the service.",
  ],
};

export const PRIVACY_CHOICES: PrivacyBlock = {
  id: "choices",
  title: "Your Choices",
  paragraphs: [
    "You may generate a Free Soul Blueprint without creating an account or providing an email.",
    "You may choose not to submit optional form fields.",
    "You may request access, correction, or deletion of information you submitted by contacting us.",
    "You may unsubscribe from marketing emails when an unsubscribe link is provided.",
  ],
};

export const PRIVACY_AUDIENCE = {
  id: "audience",
  title: "Children & International Users",
  subsections: [
    {
      title: "Children",
      paragraphs: [
        "The service is intended for adults capable of consenting to data processing.",
        "If you believe a minor submitted data, please contact us to request removal.",
      ],
    },
    {
      title: "International Users",
      paragraphs: [
        "If you access the site from outside your home country, your information may be processed where our providers operate.",
      ],
    },
  ],
};

export const PRIVACY_CHANGES_CONTACT = {
  id: "changes-contact",
  title: "Changes & Contact",
  subsections: [
    {
      title: "Changes",
      paragraphs: [
        "We may update this policy from time to time.",
        "The effective date will change when updates are made. Continued use after updates means you accept the revised policy.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [`Privacy questions: ${LEGAL_PLACEHOLDERS.contactEmail}`],
    },
  ],
};

export const PRIVACY_CTA = {
  title: "Continue With Clarity",
  body: "1320 uses your information to support your requested experience — not to sell your personal data.",
  primaryCta: "Discover My Free Soul Blueprint",
  primaryHref: "/free-soul-blueprint",
  secondaryCta: "Read Disclaimer",
  secondaryHref: "/disclaimer",
};

/** Flat sections for any LegalDocument-shaped consumers. */
export const PRIVACY_SECTIONS = [
  PRIVACY_OVERVIEW,
  {
    title: PRIVACY_SUMMARY.title,
    paragraphs: PRIVACY_SUMMARY.items,
  },
  {
    title: PRIVACY_COLLECT.title,
    paragraphs: PRIVACY_COLLECT.items.map((item) => `${item.title} — ${item.body}`),
  },
  PRIVACY_USE,
  PRIVACY_DO_NOT,
  PRIVACY_STORAGE,
  PRIVACY_CHOICES,
  {
    title: PRIVACY_AUDIENCE.title,
    paragraphs: PRIVACY_AUDIENCE.subsections.flatMap((sub) => [
      `${sub.title}. ${sub.paragraphs.join(" ")}`,
    ]),
  },
  {
    title: PRIVACY_CHANGES_CONTACT.title,
    paragraphs: PRIVACY_CHANGES_CONTACT.subsections.flatMap((sub) => [
      `${sub.title}. ${sub.paragraphs.join(" ")}`,
    ]),
  },
].map(({ title, paragraphs }) => ({ title, paragraphs }));
