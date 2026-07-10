import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

/** Standalone disclaimer — Living Blueprint Architecture (Addendum v1.0). */

export const DISCLAIMER_META = {
  title: "Disclaimer",
  description:
    "Important boundaries for using 1320 — reflective intelligence for self-awareness only, not professional advice or guarantees.",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export const DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    title: "Reflective Intelligence Platform",
    paragraphs: [
      "1320 is a reflective intelligence platform for symbolic self-awareness and integration.",
      "It does not provide medical, psychological, legal, financial, therapeutic, crisis, or professional advice.",
      "It is not fortune-telling, prophecy, or a substitute for licensed professional care.",
    ],
  },
  {
    title: "Your Authority",
    paragraphs: [
      "Your Soul Blueprint is a mirror — not a sentence. You remain the authority of your own path.",
      "No segment (S1, S3, S2, S0, S4, S5, S6, S7, S8, or S9) should be used to justify harm, bypass professional care, or outsource life decisions.",
      "1320 offers reflection, not instruction. You remain the final authority of your life.",
    ],
  },
  {
    title: "Relationships (S2)",
    paragraphs: [
      "S2 Soul Mirror describes relational patterns for awareness — not destined partners, guaranteed compatibility, who you will attract, or instructions to leave or stay in a relationship.",
    ],
  },
  {
    title: "Value & Receiving (S6)",
    paragraphs: [
      "S6 addresses symbolic patterns around worth, support, resources, recognition, and receiving for self-awareness only.",
      "It is not investment advice, tax guidance, business consulting, money prediction, or a promise of income or abundance.",
    ],
  },
  {
    title: "Soul Sovereignty (S7)",
    paragraphs: [
      "S7 Soul Sovereignty is not permission to disregard others, avoid accountability, or make impulsive decisions.",
      "It reflects themes of boundaries, choice, and self-authority as symbolic integration — not license to harm or bypass responsibility.",
    ],
  },
  {
    title: "Soul Contribution (S8)",
    paragraphs: [
      "S8 Soul Contribution is not a measure of public success, social status, usefulness, or external achievement.",
      "It reflects contribution themes as symbolic integration — not ranking of worth or productivity.",
    ],
  },
  {
    title: "Return to Source (S9)",
    paragraphs: [
      "S9 Return to Source is not a claim of spiritual superiority, enlightenment, absolute truth, or final spiritual attainment.",
      "It is return-path reflection — not hierarchy, ranking, or completion of a spiritual journey.",
    ],
  },
  {
    title: "Scores & Numeric Signals",
    paragraphs: [
      "Numeric scores, if used internally, are intelligence signals only. They are not user-facing measures of worth, maturity, spiritual level, success, or identity.",
    ],
  },
  {
    title: "Health & Crisis",
    paragraphs: [
      "If you are in crisis or need clinical support, contact qualified professionals or emergency services in your region. 1320 does not provide crisis intervention.",
    ],
  },
  {
    title: "Reports & Sessions",
    paragraphs: [
      "Sample reports use fictional data for structure preview. Your personal report is generated from your own birth date.",
      "Personal Integration Sessions and written reports support reflection — they do not guarantee outcomes or replace licensed professionals.",
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
