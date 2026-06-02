import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Terms of Service — 10/15 MVP (steward placeholders). */

export const TERMS_META = {
  title: "Terms of Service",
  description: "Terms for using the 1320 Soul Origin Code website and Phase 1 services.",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: "Agreement",
    paragraphs: [
      `By using ${LEGAL_PLACEHOLDERS.companyName} at 1320SoulCode.com ("the Site"), you agree to these Terms of Service.`,
      `Effective date: ${LEGAL_PLACEHOLDERS.effectiveDate}. Contact: ${LEGAL_PLACEHOLDERS.contactEmail}.`,
      "If you do not agree, do not use the Site.",
    ],
  },
  {
    title: "What 1320 Provides (Phase 1)",
    paragraphs: [
      "A birth-date calculator that generates a four-part symbolic code (S1, S3, S2, S0).",
      "Educational content, a free result layer, sample report preview, full report waitlist, and booking request forms.",
      "Phase 1 does not include paid checkout, guaranteed reading availability, or clinical services.",
    ],
  },
  {
    title: "No Professional Advice",
    paragraphs: [
      "1320 content is for self-awareness and reflection only. It is not medical, psychological, legal, financial, investment, or therapeutic advice.",
      "Do not use the Site as a substitute for professional care. In emergency situations, contact appropriate local services.",
    ],
  },
  {
    title: "No Guarantees",
    paragraphs: [
      "We do not guarantee specific outcomes, relationships, income, health results, or spiritual experiences.",
      "Your code is a symbolic mirror — not a sentence. You remain responsible for your choices.",
    ],
  },
  {
    title: "Accounts & Payments",
    paragraphs: [
      "Phase 1 has no user accounts and no payment processing on the Site.",
      "Future paid products, if offered, will be governed by updated terms and separate purchase flows.",
    ],
  },
  {
    title: "Acceptable Use",
    paragraphs: [
      "Use the Site lawfully and respectfully. Do not attempt to disrupt, scrape, reverse engineer, or misuse the service.",
      "Do not submit false information on forms or impersonate others.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "1320 branding, copy, structure, and original materials are owned by the operator unless otherwise noted.",
      "You may share your personal code for conversation, but may not republish bulk founder content or present 1320 as your own system without permission.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "The Site may use hosting, email, or analytics providers. Their terms and privacy practices may apply to technical processing.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      'The Site is provided "as is" to the fullest extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from use of symbolic content or reliance on reflections.',
      "Some jurisdictions do not allow certain limitations — those limits apply only to the extent permitted.",
    ],
  },
  {
    title: "Indemnity",
    paragraphs: [
      "You agree to indemnify the operator against claims arising from your misuse of the Site or violation of these terms, to the extent permitted by law.",
    ],
  },
  {
    title: "Changes & Termination",
    paragraphs: [
      "We may modify these terms or discontinue features. Material changes will be reflected by updating the effective date.",
      "We may suspend access for conduct that harms the service or other users.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These terms are governed by the laws applicable to the operator's principal place of business, without regard to conflict-of-law rules, unless local law requires otherwise.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Questions about these terms: ${LEGAL_PLACEHOLDERS.contactEmail}.`],
  },
];

export const TERMS_NOTICE =
  "MVP placeholder — not final legal counsel. Steward: replace [Insert Contact Email] and [Insert Date] before production launch.";
