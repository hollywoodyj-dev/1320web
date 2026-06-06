import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Standalone disclaimer — 10/15. */

export const DISCLAIMER_META = {
  title: "Disclaimer",
  description:
    "Important boundaries for using the 1320 Soul Origin Code — self-awareness only, not professional advice or guarantees.",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    title: "Self-Awareness Only",
    paragraphs: [
      "1320 Soul Origin Code is a symbolic system for reflection, pattern recognition, and conscious integration.",
      "It is not fortune-telling, prophecy, medical diagnosis, psychological treatment, legal counsel, or financial advice.",
    ],
  },
  {
    title: "Your Authority",
    paragraphs: [
      "Your code is a mirror — not a sentence. You remain the authority of your own path.",
      "No segment (S1, S3, S2, S0, S4, S5, or S6) should be used to justify harm, bypass professional care, or outsource life decisions.",
    ],
  },
  {
    title: "Relationships (S2)",
    paragraphs: [
      "S2 Mirror Path describes relational patterns for awareness — not destined partners, guaranteed compatibility, or instructions to leave or stay in a relationship.",
    ],
  },
  {
    title: "Money Frequency (S6)",
    paragraphs: [
      "S6 addresses symbolic patterns around worth, receiving, and resource flow for self-awareness only.",
      "It is not investment advice, tax guidance, business consulting, or a promise of income or abundance.",
    ],
  },
  {
    title: "Health & Crisis",
    paragraphs: [
      "If you are in crisis or need clinical support, contact qualified professionals or emergency services in your region. 1320 does not provide crisis intervention.",
    ],
  },
  {
    title: "Readings & Reports",
    paragraphs: [
      "Sample reports use fictional data for structure preview. Your personal report is generated from your own birth date.",
      "Live readings and written reports support reflection — they do not guarantee outcomes or replace licensed professionals.",
    ],
  },
  {
    title: "No Warranties",
    paragraphs: [
      'Content is provided for educational and reflective purposes "as is." We make no warranties about completeness, accuracy for every individual, or fitness for a particular purpose.',
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Questions: ${LEGAL_PLACEHOLDERS.contactEmail}. Effective: ${LEGAL_PLACEHOLDERS.effectiveDate}.`],
  },
];

