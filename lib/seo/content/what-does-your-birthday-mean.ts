/** Page 06 · What Does Your Birthday Mean? — Content & SEO Spec v1.0 */

import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import type { SeoArticle } from "@/lib/seo/types";
import { FREE_BLUEPRINT_HREF } from "@/lib/seo/types";

export const WHAT_DOES_YOUR_BIRTHDAY_MEAN_PATH = "/what-does-your-birthday-mean" as const;

export const WHAT_DOES_YOUR_BIRTHDAY_MEAN_ARTICLE: SeoArticle = {
  slug: "what-does-your-birthday-mean",
  path: WHAT_DOES_YOUR_BIRTHDAY_MEAN_PATH,
  title: "What Does Your Birthday Mean? What It Can—and Cannot—Tell You",
  description:
    "Explore the factual, cultural, personal and symbolic meaning of your birthday—and learn why a birth date cannot determine your personality, destiny or worth.",
  headline: "What Does Your Birthday Mean?",
  eyebrow: "Birth Date Meaning",
  heroSupporting:
    "Your birthday may carry factual, cultural, personal and symbolic meaning.\n\nIt can become a starting point for reflection—but it cannot determine your complete personality, destiny or worth.",
  directAnswer:
    "Your birthday can mean several different things.\n\nFactually, it records when you were born. Culturally and personally, it may hold family memories, traditions and life milestones. Symbolic systems may interpret the date through numbers, seasons or other patterns.\n\nBut a birthday cannot scientifically determine your complete personality, predict your future or define your value. Its meaning depends partly on the lens being used—and partly on the meaning you continue to create through your life.",
  boundaryLine: "A birth date may offer a mirror for reflection. It is not a verdict about who you are.",
  cluster: "birthday-meaning",
  primaryKeyword: "what does your birthday mean",
  primaryKeywords: [
    "what does your birthday mean",
    "birthday meaning",
    "birth date meaning",
    "what does my birthday mean",
    "my birthday meaning",
    "what does your birth date mean",
    "meaning of my birthday",
    "birthday symbolism",
    "birthday personality",
    "personality by date of birth",
    "what does my birth date say about me",
  ],
  ogImage: "/seo/what-does-your-birthday-mean-1320.webp",
  ogTitle: "What Does Your Birthday Mean?",
  ogDescription:
    "A birthday can carry factual, cultural, personal and symbolic meaning. It cannot define your complete personality, destiny or worth.",
  breadcrumbVisible: [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "What Does Your Birthday Mean?" },
  ],
  breadcrumbSchema: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: "What Does Your Birthday Mean?", path: WHAT_DOES_YOUR_BIRTHDAY_MEAN_PATH },
  ],
  heroCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  heroSecondaryCta: {
    label: "What Is a Soul Blueprint?",
    href: "/what-is-a-soul-blueprint",
    intent: "soul_blueprint_definition",
  },
  midCtaAfterSectionId: "explore-mirror",
  midCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  endHeading: "Your Birthday Marks a Beginning—Not a Finished Definition",
  endSupporting: [
    "A date can locate the beginning of your life.",
    "It cannot contain the whole of who you have become.",
    "Your meaning continues to be shaped through relationship, experience, awareness and choice.",
  ],
  endCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  endSecondaryCta: {
    label: "Explore Birthday Number vs Life Path Number",
    href: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    intent: "birthday_number_comparison",
  },
  endBoundary: "Free to explore. No prediction. No fixed identity.",
  author: "1320 Soul Code",
  authorType: "Organization",
  reviewer: "Wisewave",
  publishedAt: "2026-08-04",
  updatedAt: "2026-08-04",
  version: "v1.0",
  published: true,
  sections: [],
  faq: [
    {
      question: "What does your birthday mean?",
      answer:
        "Your birthday may carry factual, cultural, personal and symbolic meaning. Its interpretation depends on the lens being used.",
    },
    {
      question: "Can your birthday reveal your personality?",
      answer:
        "A birthday may be used in symbolic personality interpretations, but it cannot scientifically determine or completely describe your personality.",
    },
    {
      question: "What does my birth date say about me?",
      answer:
        "It can locate your beginning in time and may be interpreted through symbolic systems. It cannot define your worth, future or complete identity.",
    },
    {
      question: "Is birthday meaning the same as Birthday Number?",
      answer:
        "No. Birthday meaning is a broad topic. Birthday Number is one numerology interpretation based mainly on the day of the month.",
    },
    {
      question: "Is Birthday Number the same as Life Path Number?",
      answer:
        "No. Birthday Number begins with the birth day, while Life Path Number uses the complete birth date.",
    },
    {
      question: "Can my birthday predict my future?",
      answer: "No birth date can reliably predict specific future events or decisions.",
    },
    {
      question: "Why do birthday meanings sometimes feel accurate?",
      answer:
        "They may reflect genuine themes, provide useful language, or contain broadly relatable descriptions. Resonance does not prove that the date caused the trait.",
    },
    {
      question: "Is birthday meaning scientific?",
      answer:
        "Cultural and personal birthday meaning is real as lived meaning. Numerology and other symbolic interpretations are not scientific personality assessments.",
    },
    {
      question: "Is a Soul Blueprint a birthday personality profile?",
      answer:
        "No. A 1320 Soul Blueprint is a proprietary symbolic reflection framework and explicitly rejects fixed-identity interpretation.",
    },
    {
      question: "What do I receive in a Free Soul Blueprint?",
      answer:
        "You receive four Foundation Mirrors in the order S1 → S3 → S2 → S0, together with short interpretations, an integrated reflection and reflection questions.",
    },
  ],
  related: [
    { title: "What a Soul Blueprint means", href: "/what-is-a-soul-blueprint" },
    { title: "Calculate your Life Path Number", href: "/what-is-my-life-path-number" },
    {
      title: "Numerology by date of birth",
      href: "/numerology-by-date-of-birth-vs-soul-blueprint",
    },
    {
      title: "Birthday Number vs Life Path Number",
      href: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    },
    { title: "Discover your Free Soul Blueprint", href: FREE_BLUEPRINT_HREF },
    { title: "View a Sample Soul Blueprint Report", href: SAMPLE_REPORT_HREF },
  ],
};
