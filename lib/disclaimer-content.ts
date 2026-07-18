/** Standalone Disclaimer — Page 12 Refinement Spec v1.0 (Wisewave). */

import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";

export const DISCLAIMER_META = {
  title: "Disclaimer | 1320 Soul Code",
  description:
    "Important boundaries for using 1320 as a symbolic mirror for self-awareness, reflection, and integration.",
};

export const DISCLAIMER_HERO = {
  eyebrow: "Legal",
  title: "Disclaimer",
  body: "Important boundaries for using 1320 as a symbolic mirror for self-awareness, reflection, and integration.",
  subline: "You remain the authority of your own life.",
};

export type DisclaimerBlock = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type DisclaimerSegmentItem = {
  code: string;
  title: string;
  body: string;
};

export const DISCLAIMER_CORE: DisclaimerBlock = {
  id: "core",
  title: "Reflective Intelligence Platform",
  paragraphs: [
    "1320 is a reflective intelligence platform for symbolic self-awareness, reflection, and integration.",
    "It does not provide medical, psychological, legal, financial, therapeutic, crisis, or professional advice.",
    "It is not fortune-telling, prophecy, or a substitute for licensed professional care.",
  ],
};

export const DISCLAIMER_AUTHORITY: DisclaimerBlock = {
  id: "authority",
  title: "Your Authority",
  paragraphs: [
    "Your Soul Blueprint is a mirror — not a fixed identity.",
    "You remain the authority of your own life, choices, relationships, health, and path.",
    "No 1320 segment should be used to justify harm, bypass professional care, avoid responsibility, or outsource life decisions.",
    "1320 offers reflection, not instruction.",
  ],
};

export const DISCLAIMER_SEGMENTS = {
  id: "segments",
  title: "Segment-Specific Boundaries",
  items: [
    {
      code: "S2",
      title: "Relationships",
      body: "S2 reflects relational mirror patterns for awareness. It does not predict destined partners, guaranteed compatibility, who you will attract, or whether you should leave or stay in a relationship.",
    },
    {
      code: "S6",
      title: "Value & Receiving",
      body: "S6 reflects symbolic patterns around worth, support, receiving, and value. It is not investment advice, tax guidance, business consulting, money prediction, or a promise of income or abundance.",
    },
    {
      code: "S7",
      title: "Soul Sovereignty",
      body: "S7 reflects boundaries, choice, and self-authority. It is not permission to disregard others, avoid accountability, make impulsive decisions, or bypass responsibility.",
    },
    {
      code: "S8",
      title: "Soul Contribution",
      body: "S8 reflects contribution themes as symbolic integration. It is not a measure of public success, social status, usefulness, productivity, or external achievement.",
    },
    {
      code: "S9",
      title: "Return to Source",
      body: "S9 reflects return-path themes such as wholeness, simplicity, and reconnection. It is not a claim of spiritual superiority, enlightenment, absolute truth, final attainment, hierarchy, or completion of a spiritual journey.",
    },
  ] satisfies DisclaimerSegmentItem[],
};

export const DISCLAIMER_SCORES: DisclaimerBlock = {
  id: "scores",
  title: "Scores & Numeric Signals",
  paragraphs: [
    "Any numeric scores, if used internally, are intelligence signals only.",
    "They are not user-facing measures of worth, maturity, spiritual level, success, identity, or life value.",
  ],
};

export const DISCLAIMER_HEALTH: DisclaimerBlock = {
  id: "health",
  title: "Health & Crisis",
  paragraphs: [
    "1320 does not provide crisis intervention, diagnosis, treatment, or clinical support.",
    "If you are in crisis, experiencing distress, or need clinical care, please contact qualified professionals or emergency services in your region.",
  ],
};

export const DISCLAIMER_REPORTS_GROUP = {
  id: "reports",
  title: "Reports, Sessions & No Warranties",
  subsections: [
    {
      title: "Reports & Sessions",
      paragraphs: [
        "Sample reports use fictional data for structure preview.",
        "Your personal report is generated from your own birth date.",
        "Personal Integration Sessions and written reports support reflection only. They do not guarantee outcomes, replace licensed professionals, or determine life decisions.",
      ],
    },
    {
      title: "No Warranties",
      paragraphs: [
        '1320 content is provided for educational and reflective purposes "as is."',
        "We make no warranties about completeness, accuracy for every individual, or fitness for a particular purpose.",
      ],
    },
  ],
};

export const DISCLAIMER_CONTACT: DisclaimerBlock = {
  id: "contact",
  title: "Contact",
  paragraphs: [
    `Questions: ${LEGAL_PLACEHOLDERS.contactEmail}`,
    `Effective: ${LEGAL_PLACEHOLDERS.effectiveDate}`,
  ],
};

export const DISCLAIMER_CTA = {
  title: "Continue With Clarity",
  body: "Use 1320 as a mirror for reflection — not as a substitute for your own judgment or professional support.",
  primaryCta: "Generate My Code",
  primaryHref: "/your-code",
  secondaryCta: "Read FAQ",
  secondaryHref: "/faq",
};

/** Flat sections kept for any consumers expecting LegalDocument-shaped data. */
export const DISCLAIMER_SECTIONS = [
  DISCLAIMER_CORE,
  DISCLAIMER_AUTHORITY,
  {
    title: DISCLAIMER_SEGMENTS.title,
    paragraphs: DISCLAIMER_SEGMENTS.items.map(
      (item) => `${item.code} · ${item.title}. ${item.body}`,
    ),
  },
  DISCLAIMER_SCORES,
  DISCLAIMER_HEALTH,
  {
    title: DISCLAIMER_REPORTS_GROUP.title,
    paragraphs: DISCLAIMER_REPORTS_GROUP.subsections.flatMap((sub) => [
      `${sub.title}. ${sub.paragraphs.join(" ")}`,
    ]),
  },
  DISCLAIMER_CONTACT,
].map(({ title, paragraphs }) => ({ title, paragraphs }));
