/** Privacy Policy — Conversion UI Refinement · Launch v1 · P0 correction patch. */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const PRIVACY_META = {
  title: "Privacy Policy | 1320 Soul Code",
  description:
    "How 1320 collects, uses, and protects information for Free Soul Blueprint, Full Report, accounts, purchases, and Personal Integration.",
};

export const PRIVACY_HERO = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  body: "How 1320 collects, uses, and protects information when you generate your Soul Blueprint or use related services.",
  subline:
    "We collect only what is needed for Free Soul Blueprint generation, Full Report purchase and access, Personal Integration Sessions, accounts, and support you request.",
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
    "1320 currently provides Free Soul Blueprint generation, Sample Report access, Full Report purchase with account-based entitled access (Web, Mobile, and PDF), Personal Integration Session purchase and booking (including scheduling, Pre-Session Intake, and client summary), transactional email, and optional marketing communication where consent is recorded.",
    `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}`,
    `Questions: ${LEGAL_PLACEHOLDERS.contactEmail}`,
  ],
};

export const PRIVACY_SUMMARY = {
  id: "summary",
  title: "Privacy Summary",
  items: [
    "Your birth date is used to generate your Free Soul Blueprint and related report content.",
    "Account creation and authentication support entitled Full Report and Session access.",
    "Purchase and entitlement records support Full Report and Personal Integration delivery.",
    "Transactional emails may be sent for purchases, access, booking, Intake, and account activity.",
    "Marketing emails are sent only when you have opted in or recorded consent.",
    "We do not sell your personal information.",
    "You may contact us to request access, correction, or deletion of information you submitted.",
  ],
};

/** Explicit data categories for clearer live product-state reading. */
export const PRIVACY_DATA_CATEGORIES = {
  id: "categories",
  title: "Types of Information",
  items: [
    {
      title: "Report-generation data",
      body: "Birth date and related calculation inputs used to generate your Free Soul Blueprint and Full Report content. Birth date may also be stored in browser session or local storage so your result can reload.",
    },
    {
      title: "Account and entitlement data",
      body: "Name, email, authentication credentials, and entitlement records that allow sign-in access to purchased Full Report surfaces (Web, Mobile, and PDF) and related account features.",
    },
    {
      title: "Transactional data",
      body: "Checkout, payment confirmation, purchase amounts, product type, and delivery status for Full Report and Personal Integration Session purchases. Payment card details are handled by payment providers; 1320 does not store full card numbers.",
    },
    {
      title: "Personal Integration data",
      body: "Session selection, scheduling details, Pre-Session Intake answers, and client-facing Integration Summary content needed to deliver and continue your Session. Private consultant preparation notes are not published to your client account.",
    },
    {
      title: "Optional marketing consent",
      body: "Email address and consent status when you explicitly opt in to marketing updates. You may unsubscribe when an unsubscribe link is provided.",
    },
    {
      title: "Technical and analytics data",
      body: "Basic logs such as browser type, pages visited, and approximate region may be collected by hosting or analytics providers. Campaign attribution (such as UTM parameters) may be stored without birth dates, Blueprint codes, or report content.",
    },
  ] satisfies PrivacyCollectItem[],
};

export const PRIVACY_COLLECT = {
  id: "collect",
  title: "How Collection Relates to Live Services",
  items: [
    {
      title: "Free Soul Blueprint",
      body: "Birth date is collected to generate your free four-part foundation result. An email or account is not required before reveal.",
    },
    {
      title: "Full Report purchase and access",
      body: "Account and payment details are collected to complete purchase and deliver entitled Web, Mobile, and PDF access.",
    },
    {
      title: "Personal Integration Sessions",
      body: "Purchase, scheduling, Intake, and summary details are collected to deliver the Session operating flow after payment.",
    },
    {
      title: "Support forms",
      body: "Optional messages and preferences you submit through support or related forms.",
    },
  ] satisfies PrivacyCollectItem[],
};

export const PRIVACY_USE: PrivacyBlock = {
  id: "use",
  title: "How We Use Information",
  paragraphs: [
    "We use report-generation data to calculate and display your Free Soul Blueprint and Full Report experiences.",
    "We use account and entitlement data so you can sign in and return to purchased report access.",
    "We use transactional data to process Full Report and Personal Integration purchases and confirm delivery.",
    "We use Personal Integration data to operate scheduling, Pre-Session Intake, Session preparation, and client summary delivery.",
    "We may send transactional emails about purchases, access, booking, Intake, and account activity.",
    "We may send marketing updates only when you have opted in or recorded consent.",
    "We use aggregate technical signals to improve reliability and fix errors.",
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
    "1320 may store account, entitlement, purchase, Session, Intake, and related form data in databases and tools configured by the site operator.",
    "We do not claim a single fixed retention period for all data types. Information is retained as needed to provide entitled access and Session delivery, for the purpose collected, or as required by law.",
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
    title: PRIVACY_DATA_CATEGORIES.title,
    paragraphs: PRIVACY_DATA_CATEGORIES.items.map((item) => `${item.title} — ${item.body}`),
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
