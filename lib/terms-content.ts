/** Terms of Service — Page 14 Refinement Spec v1.0 (product-state aligned draft). */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const TERMS_META = {
  title: "Terms of Service | 1320 Soul Code",
  description:
    "Terms for using the 1320 website, code generator, reports, account access, purchases, and related reflective services.",
};

export const TERMS_HERO = {
  eyebrow: "Legal",
  title: "Terms of Service",
  body: "Terms for using the 1320 website, code generator, reports, account access, purchases, and related reflective services.",
};

export type TermsBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const TERMS_AGREEMENT: TermsBlock = {
  id: "agreement",
  title: "Agreement",
  paragraphs: [
    `By using ${LEGAL_PLACEHOLDERS.companyName} at 1320SoulCode.com, you agree to these Terms of Service.`,
    "If you do not agree, do not use the site.",
    `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}`,
    `Questions: ${LEGAL_PLACEHOLDERS.contactEmail}`,
  ],
};

export const TERMS_PROVIDES: TermsBlock = {
  id: "provides",
  title: "What 1320 Provides",
  paragraphs: [
    "1320 provides symbolic self-awareness and reflection experiences, including:",
  ],
  bullets: [
    "birth-date based Soul Blueprint code generation",
    "Free Result preview",
    "Sample Report preview",
    "Full Soul Blueprint Report",
    "account-based report access where available",
    "mobile and PDF report surfaces",
    "Personal Integration Session booking or inquiry pathways",
    "email updates or related communications when you opt in",
  ],
};

export const TERMS_PROVIDES_CLOSING =
  "1320 content is provided for reflection and integration only. It is not professional advice, diagnosis, treatment, prediction, or crisis support.";

export const TERMS_NO_ADVICE: TermsBlock = {
  id: "no-advice",
  title: "No Professional Advice",
  paragraphs: [
    "1320 content is for self-awareness, reflection, and integration only.",
    "It is not medical, psychological, legal, financial, investment, therapeutic, crisis, or professional advice.",
    "Do not use the site as a substitute for professional care. In emergency situations, contact appropriate local services.",
  ],
};

export const TERMS_NO_GUARANTEES: TermsBlock = {
  id: "no-guarantees",
  title: "No Guarantees",
  paragraphs: [
    "We do not guarantee specific outcomes, relationships, income, health results, spiritual experiences, or life decisions.",
    "Your Soul Blueprint is a symbolic mirror — not a fixed identity.",
    "You remain responsible for your own choices.",
  ],
};

export const TERMS_ACCOUNTS: TermsBlock = {
  id: "accounts",
  title: "Accounts, Purchases & Payments",
  paragraphs: [
    "Some 1320 services may require an account, sign-in, purchase, or payment process.",
    "If you create an account, you are responsible for keeping your login information secure.",
    "Paid products, including Full Report access or related services, may be processed through third-party payment providers. Their terms and privacy practices may also apply.",
    "Access to purchased or entitled reports may require sign-in.",
    "Prices, availability, product scope, and access methods may change over time.",
  ],
};

export const TERMS_REFUNDS: TermsBlock = {
  id: "refunds",
  title: "Purchases, Access & Refunds",
  paragraphs: [
    "Digital report purchases may provide access to generated content after checkout or entitlement confirmation.",
    "Because digital content may be delivered immediately, refunds may be limited unless required by applicable law or stated otherwise at checkout.",
    `If you experience access issues, contact us at ${LEGAL_PLACEHOLDERS.contactEmail}.`,
  ],
};

export const TERMS_ACCEPTABLE_USE: TermsBlock = {
  id: "acceptable-use",
  title: "Acceptable Use",
  paragraphs: [
    "Use the site lawfully and respectfully.",
    "Do not attempt to disrupt, scrape, reverse engineer, overload, misuse, or interfere with the service.",
    "Do not submit false information, impersonate others, or use the site in a way that harms others.",
  ],
};

export const TERMS_IP: TermsBlock = {
  id: "ip",
  title: "Intellectual Property",
  paragraphs: [
    "1320 branding, copy, structure, report design, symbolic language, and original materials are owned by the operator unless otherwise noted.",
    "You may use your personal result for private reflection and conversation.",
    "You may not republish, resell, copy in bulk, scrape, reproduce, or present 1320 materials as your own system without permission.",
  ],
};

export const TERMS_THIRD_PARTY: TermsBlock = {
  id: "third-party",
  title: "Third-Party Services",
  paragraphs: [
    "The site may use third-party providers for hosting, analytics, email, forms, checkout, payment processing, authentication, or scheduling.",
    "Their terms and privacy practices may also apply.",
  ],
};

export const TERMS_LIABILITY: TermsBlock = {
  id: "liability",
  title: "Limitation of Liability",
  paragraphs: [
    'The site is provided "as is" to the fullest extent permitted by law.',
    "We are not liable for indirect, incidental, consequential, or special damages arising from use of 1320 content or reliance on reflection outputs.",
    "Some jurisdictions do not allow certain limitations. In those cases, the limits apply only to the extent permitted.",
  ],
};

export const TERMS_INDEMNITY: TermsBlock = {
  id: "indemnity",
  title: "Indemnity",
  paragraphs: [
    "You agree to indemnify the operator against claims arising from your misuse of the site, violation of these terms, or unlawful use of 1320 materials, to the extent permitted by law.",
  ],
};

export const TERMS_CHANGES: TermsBlock = {
  id: "changes",
  title: "Changes & Termination",
  paragraphs: [
    "We may update these terms, modify features, change access methods, or discontinue parts of the service.",
    "Material changes will be reflected by updating the effective date.",
    "We may suspend or restrict access for conduct that harms the service, other users, or the integrity of the platform.",
  ],
};

export const TERMS_GOVERNING: TermsBlock = {
  id: "governing",
  title: "Governing Law",
  paragraphs: [
    "These terms are governed by the laws applicable to the operator’s principal place of business, unless local law requires otherwise.",
  ],
};

export const TERMS_CONTACT: TermsBlock = {
  id: "contact",
  title: "Contact",
  paragraphs: [`Questions about these terms: ${LEGAL_PLACEHOLDERS.contactEmail}`],
};

export const TERMS_CTA = {
  title: "Continue With Clarity",
  body: "Use 1320 as a reflective symbolic system — you remain responsible for your own choices.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "Read Privacy Policy",
  secondaryHref: "/privacy",
};

/** Product / commerce blocks grouped for calmer reading. */
export const TERMS_COMMERCE_GROUP = {
  id: "commerce",
  title: "Accounts, Purchases & Access",
  blocks: [TERMS_ACCOUNTS, TERMS_REFUNDS],
};

export const TERMS_BLOCKS: TermsBlock[] = [
  TERMS_AGREEMENT,
  TERMS_PROVIDES,
  TERMS_NO_ADVICE,
  TERMS_NO_GUARANTEES,
  TERMS_ACCOUNTS,
  TERMS_REFUNDS,
  TERMS_ACCEPTABLE_USE,
  TERMS_IP,
  TERMS_THIRD_PARTY,
  TERMS_LIABILITY,
  TERMS_INDEMNITY,
  TERMS_CHANGES,
  TERMS_GOVERNING,
  TERMS_CONTACT,
];

/** Flat sections for any LegalDocument-shaped consumers. */
export const TERMS_SECTIONS = TERMS_BLOCKS.map((block) => ({
  title: block.title,
  paragraphs: [
    ...block.paragraphs,
    ...(block.bullets ?? []),
    ...(block.id === "provides" ? [TERMS_PROVIDES_CLOSING] : []),
  ],
}));
