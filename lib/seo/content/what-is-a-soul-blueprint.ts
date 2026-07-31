/** Page 01 · What Is a Soul Blueprint? — Content & SEO Spec v1.0 */

import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import type { SeoArticle } from "@/lib/seo/types";
import { FREE_BLUEPRINT_HREF } from "@/lib/seo/types";

export const WHAT_IS_A_SOUL_BLUEPRINT_PATH = "/what-is-a-soul-blueprint" as const;

export const WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE: SeoArticle = {
  slug: "what-is-a-soul-blueprint",
  path: WHAT_IS_A_SOUL_BLUEPRINT_PATH,
  title: "What Is a Soul Blueprint? Meaning & How It Works | 1320",
  description:
    "Learn what a Soul Blueprint means in 1320, how it uses your birth date as a symbolic mirror, what it explores, and why it is not prediction or a fixed identity.",
  headline: "What Is a Soul Blueprint?",
  eyebrow: "Soul Blueprint Guide",
  directAnswer:
    "In 1320, a Soul Blueprint is a symbolic, birth-date-based map designed to help you reflect on your original essence, natural expression, relationship mirrors, protective patterns, life direction, and integration.\n\nIt does not predict your future or define your personality. It offers structured language for self-recognition while you remain the authority of your own life.",
  heroSupporting:
    "A Soul Blueprint is not an instruction for who you must become.\n\nIt is a mirror for noticing what may already be moving beneath adaptation, habit, and expectation.",
  cluster: "soul-blueprint-foundation",
  primaryKeyword: "what is a soul blueprint",
  primaryKeywords: [
    "what is a soul blueprint",
    "soul blueprint",
    "soul blueprint meaning",
    "personal soul blueprint",
    "soul profile",
    "soul code",
    "birth date soul blueprint",
    "what does a soul blueprint reveal",
  ],
  ogImage: "/seo/what-is-a-soul-blueprint-1320.webp",
  ogTitle: "What Is a Soul Blueprint?",
  ogDescription:
    "A symbolic mirror for recognising origin, expression, relationships, patterns and integration—without turning them into a fixed identity.",
  breadcrumbVisible: [
    { label: "Home", href: "/" },
    { label: "Soul Blueprint", href: "/blueprint" },
    { label: "What Is a Soul Blueprint?" },
  ],
  breadcrumbSchema: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: "What Is a Soul Blueprint?", path: WHAT_IS_A_SOUL_BLUEPRINT_PATH },
  ],
  heroCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  heroSecondaryCta: {
    label: "See What the Free Blueprint Includes",
    href: "#free-and-full",
    intent: "related",
  },
  midCtaAfterSectionId: "free-and-full",
  midCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  endHeading: "Begin With Your Own Soul Blueprint",
  endSupporting: [
    "You do not need to believe every interpretation or understand every layer at once.",
    "Begin with your birth date.",
    "Receive your four Foundation Mirrors and notice what becomes clearer.",
  ],
  endCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  endSecondaryCta: {
    label: "View a Sample Report",
    href: SAMPLE_REPORT_HREF,
    intent: "sample_report",
  },
  endBoundary: "Not prediction. Not diagnosis. A symbolic mirror for reflection and integration.",
  author: "Nobu Isaki / 信伊咲",
  authorTitle: "Founder and Origin Steward of 1320",
  reviewer: "Wisewave",
  publishedAt: "2026-07-31",
  updatedAt: "2026-07-31",
  version: "v1.0",
  published: true,
  sections: [],
  faq: [
    {
      question: "Is a Soul Blueprint a scientific assessment?",
      answer:
        "No. The 1320 Soul Blueprint is a symbolic reflection framework. It should not be presented as a scientific, clinical, psychological, or diagnostic assessment.",
    },
    {
      question: "Do I need my exact birth time?",
      answer:
        "No. The current 1320 calculation uses only your birth year, month, and day.",
    },
    {
      question: "Is a Soul Blueprint the same as a Life Path Number?",
      answer:
        "No. A Life Path Number is generally one numerological number derived from a birth date. The 1320 Soul Blueprint uses its own multilayer S0–S9 symbolic structure.",
    },
    {
      question: "Can my Soul Blueprint change?",
      answer:
        "The symbolic foundation remains stable within 1320, but your awareness, expression, choices, patterns, and relationship with the Blueprint can evolve.",
    },
    {
      question: "Does the Blueprint predict my future?",
      answer:
        "No. It is designed for reflection, recognition, and integration—not prediction.",
    },
    {
      question: "What happens after I receive my Free Soul Blueprint?",
      answer:
        "You can reflect on your four Foundation Mirrors, save your result, view a Sample Report, or continue into the complete S0–S9 Full Soul Blueprint Report.",
    },
  ],
  related: [
    { title: "Life Path Number vs Soul Blueprint", href: "/life-path-number-vs-soul-blueprint" },
    { title: "How the 1320 Blueprint works", href: "/blueprint" },
    { title: "Discover your Free Soul Blueprint", href: FREE_BLUEPRINT_HREF },
    { title: "Explore the Full Soul Blueprint Report", href: "/full-report" },
    { title: "View a Sample Soul Blueprint Report", href: SAMPLE_REPORT_HREF },
    { title: "About 1320", href: "/about-1320" },
    { title: "Disclaimer", href: "/disclaimer" },
    { title: "Privacy Policy", href: "/privacy" },
  ],
};
