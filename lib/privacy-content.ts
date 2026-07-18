/** Privacy Policy — Page 13 Refinement Spec v1.0 (Wisewave). */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const PRIVACY_META = {
  title: "Privacy Policy | 1320 Soul Code",
  description:
    "How 1320 collects, uses, and protects information when you generate your Soul Blueprint or use related services.",
};

export const PRIVACY_HERO = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  body: "How 1320 collects, uses, and protects information when you generate your Soul Blueprint or use related services.",
  subline:
    "We only collect what is needed to provide the calculator, forms, reports, and support you request.",
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
    `This Privacy Policy explains how ${LEGAL_PLACEHOLDERS.companyName} collects and uses information when you use 1320SoulCode.com and related Phase 1 experiences.`,
    "1320 is a symbolic self-awareness system. We collect only what is needed to provide the calculator, forms, reports, and support you request.",
    `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}`,
    `Questions: ${LEGAL_PLACEHOLDERS.contactEmail}`,
  ],
};

export const PRIVACY_SUMMARY = {
  id: "summary",
  title: "Privacy Summary",
  items: [
    "Your birth date is used to generate your Soul Blueprint result.",
    "Optional form details are collected only when you submit them.",
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
      body: "Used to calculate your four-part code. On your device, your birth date may also be stored in session or local storage so your result page can load.",
    },
    {
      title: "Form Information",
      body: "Name, email, optional birth date, booking preferences, and messages you submit through waitlist, email capture, or booking forms.",
    },
    {
      title: "Technical Data",
      body: "Basic logs such as browser type, pages visited, and approximate region may be collected by our hosting or analytics providers when enabled.",
    },
  ] satisfies PrivacyCollectItem[],
};

export const PRIVACY_USE: PrivacyBlock = {
  id: "use",
  title: "How We Use Information",
  paragraphs: [
    "We use information to calculate and display your 1320 Soul Origin Code result.",
    "We use it to respond to waitlist sign-ups, email capture requests, and booking inquiries.",
    "We may send updates you opted into, with unsubscribe options when available.",
    "We use aggregate usage signals to improve the site, fix errors, and understand reliability.",
    "We do not use your personal information to sell your data.",
  ],
};

export const PRIVACY_DO_NOT: PrivacyBlock = {
  id: "do-not",
  title: "What We Do Not Do",
  paragraphs: [
    "We do not sell your personal information.",
    "We do not use 1320 data to provide medical, psychological, legal, or financial advice.",
    "We do not claim to predict your future or guarantee outcomes.",
  ],
};

export const PRIVACY_STORAGE: PrivacyBlock = {
  id: "storage",
  title: "Storage, Retention & Sharing",
  paragraphs: [
    "Phase 1 may store form submissions in email or internal tools as configured by the site operator.",
    "Birth date may be stored on your browser through session or local storage so your result page can reload.",
    "Submitted form data is retained only as long as needed for the purpose collected or as required by law.",
    "We may share data with service providers who help us host the site, send email, or operate forms under confidentiality obligations.",
    "We may disclose information if required by law or to protect the rights, safety, and integrity of the service.",
  ],
};

export const PRIVACY_CHOICES: PrivacyBlock = {
  id: "choices",
  title: "Your Choices",
  paragraphs: [
    "You may choose not to submit forms or optional fields.",
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
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
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
