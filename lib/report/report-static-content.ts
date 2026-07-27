/** Static copy for report pages (practices, journal, sample banners). */

export const SAMPLE_REPORT_META = {
  title: "Sample 1320 Full Soul Origin Report",
  description:
    "Full-report preview with fictional birth date July 14, 1988 — S1-26 / S3-03 / S2-21 / S0-18. For layout and tone only; not your personal code.",
  fictionBanner:
    "Sample only — fictional birth date July 14, 1988. This preview uses the full report template; your personal code lives on /result after you enter your birth date.",
  headerTitle: "YOUR 1320 SOUL ORIGIN CODE",
  headerSubtitle: "Full report preview — fictional code S1-26 / S3-03 / S2-21 / S0-18",
  birthDate: "1988-07-14",
};

export const REPORT_HEADER_ACTIONS = {
  save: "SAVE REPORT",
  email: "EMAIL ME",
  download: "DOWNLOAD PDF",
};

export const REPORT_FULL_UPSELL = {
  title: "Meet Your Complete Soul Blueprint",
  lead: "Your Free Report opens the doorway.",
  body: "Your Full Report shows how the whole Blueprint lives together — shadow, mission, value, sovereignty, contribution, return, practice, and journal.",
  items: [
    "Complete S0–S9 Soul Blueprint",
    "7-Day Integration Practice",
    "Reflection Journal",
    "Web · Mobile · PDF",
    "Account Access",
  ] as string[],
  primaryCta: "Unlock My Full Soul Blueprint",
  primaryHref: "/checkout",
  secondaryCta: "View Sample Full Report",
  secondaryHref: "/full-report-v2",
};

export const INTEGRATION_PRACTICES = [
  {
    number: "01",
    title: "Observe the Mirror",
    body: "When a relationship triggers you this week, pause and ask: what is this showing me about myself?",
  },
  {
    number: "02",
    title: "Return Worth Inward",
    body: "Once daily, name one quality you already carry — without proving it through achievement.",
  },
  {
    number: "03",
    title: "Transform Gently",
    body: "Choose one small pattern to soften rather than force. Integration grows through awareness, not pressure.",
  },
];

export const REFLECTION_JOURNAL_PROMPTS = [
  "What part of this report feels most true?",
  "What part feels uncomfortable or resistant?",
  "What is one small action I can take from awareness?",
];

export const REPORT_FINAL_CTA = {
  title: "Your Blueprint Continues",
  body: "A report can show you the mirror. Your life changes when awareness becomes action.",
  unlock: "Unlock My Full Report",
  unlockHref: "/checkout",
  book: "Book a 1320 Reading",
  bookHref: "/booking",
  profile: "Save to My Soul Profile",
  profileNote: "Coming soon",
};

export const RESULT_EXTRAS = {
  keepTitle: "Keep Your Code",
  keepBody: "Save or send your four-part code so you can return to it later.",
  shareTitle: "Share Your Code",
  shareCopyLabel: "Copy My Code",
  shareHint: "Copy your four-part code as a personal reference.",
  emailTitle: "Send My Code to Email",
  emailHint: "Receive a copy of your result link.",
  faqTitle: "FAQ",
  faq: [
    {
      q: "Is this my full report?",
      a: "No. This is the free foundation layer. The Full Report expands into the complete S0–S9 Soul Blueprint.",
    },
    {
      q: "Can my code change?",
      a: "Your birth structure is stable. Your relationship to the mirror evolves as you integrate.",
    },
    {
      q: "What should I do next?",
      a: "Sit with your reflection question, explore the sample report, or unlock the Full Report for deeper layers.",
    },
    {
      q: "How is 1320 different from a score?",
      a: "1320 describes symbolic patterns for awareness — not whether you are higher or lower than anyone else.",
    },
  ],
};
