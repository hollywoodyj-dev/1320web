/** Page 03 · What Is My Life Path Number? — Content & SEO Spec v1.0 */

import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import type { SeoArticle } from "@/lib/seo/types";
import { FREE_BLUEPRINT_HREF } from "@/lib/seo/types";

export const WHAT_IS_MY_LIFE_PATH_NUMBER_PATH = "/what-is-my-life-path-number" as const;

export const WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE: SeoArticle = {
  slug: "what-is-my-life-path-number",
  path: WHAT_IS_MY_LIFE_PATH_NUMBER_PATH,
  title: "What Is My Life Path Number? Free Calculator & Meaning | 1320",
  description:
    "Enter your birth date to calculate your Life Path Number. See the step-by-step numerology formula, number meaning and Master Number explanation.",
  headline: "What Is My Life Path Number?",
  eyebrow: "Free Numerology Tool",
  directAnswer:
    "Your Life Path Number is a numerology number calculated from your full birth date.\n\nA common method reduces the month, day and year separately, then combines them into a number from 1 to 9—or, in traditions that preserve them, a Master Number such as 11, 22 or 33.\n\nModern numerology calculators commonly use the full date of birth and reduce the month, day and year separately before combining them. Several widely used systems preserve 11, 22 and 33 as Master Numbers, although conventions can vary between practitioners.",
  boundaryLine:
    "Life Path Numerology is a symbolic tradition—not a scientific assessment, diagnosis or prediction of your future.",
  cluster: "life-path-numerology",
  primaryKeyword: "what is my life path number",
  primaryKeywords: [
    "what is my life path number",
    "life path number calculator",
    "life path calculator",
    "calculate my life path number",
    "find my life path number",
    "life path number by date of birth",
    "how to calculate life path number",
    "life path number meaning",
    "numerology life path number",
    "free life path calculator",
    "what does my life path number mean",
    "master number calculator",
  ],
  ogImage: "/seo/what-is-my-life-path-number-1320.webp",
  ogTitle: "What Is My Life Path Number?",
  ogDescription:
    "Calculate your Life Path Number from your birth date, see the formula, and explore its symbolic meaning without turning it into a fixed identity.",
  breadcrumbVisible: [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "What Is My Life Path Number?" },
  ],
  breadcrumbSchema: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: "What Is My Life Path Number?", path: WHAT_IS_MY_LIFE_PATH_NUMBER_PATH },
  ],
  // No hero gold Free Blueprint CTA — calculator owns the first action.
  endHeading: "What Comes After One Life Path Number?",
  endSupporting: [
    "Your Life Path Number gives you one numerological theme.",
    "A 1320 Soul Blueprint begins from the same basic input—a full birth date—but follows a different symbolic system.",
    "The Free Soul Blueprint opens four Foundation Mirrors:",
    "S1 · Soul Origin",
    "S3 · Soul Vibration",
    "S2 · Soul Mirror",
    "S0 · Void Gate",
    "Your Life Path result is not part of the 1320 calculation.",
    "One number may offer a broad theme.",
    "Four Foundation Mirrors may help you explore how origin, expression, relationships and return move together.",
  ],
  endCta: {
    label: "Discover My Free Soul Blueprint",
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint",
  },
  endSecondaryCta: {
    label: "Life Path Number vs Soul Blueprint",
    href: "/life-path-number-vs-soul-blueprint",
    intent: "life_path_comparison",
  },
  endBoundary: "Free to explore. No prediction. No fixed identity.",
  author: "1320 Soul Code",
  authorType: "Organization",
  reviewer: "Wisewave",
  publishedAt: "2026-07-18",
  updatedAt: "2026-07-18",
  version: "v1.0",
  published: true,
  sections: [],
  faq: [
    {
      question: "How do I calculate my Life Path Number?",
      answer:
        "Reduce the month, day and year of your birth date separately, add the three results, and reduce the total to 1–9 or a preserved Master Number.",
    },
    {
      question: "Which birth date should I use?",
      answer: "Use your complete calendar date of birth: month, day and year.",
    },
    {
      question: "Do I need my birth time?",
      answer: "No. A Life Path Number is calculated from the birth date, not the birth time.",
    },
    {
      question: "Do I need my birthplace?",
      answer: "No. Birth location is not part of the Life Path Number calculation.",
    },
    {
      question: "What if my result is 11, 22 or 33?",
      answer:
        "Many numerology traditions treat these as Master Numbers. This calculator preserves all three and also shows the underlying root number.",
    },
    {
      question: "Why did another calculator give me a different number?",
      answer:
        "It may use a different reduction method or apply different rules to Master Numbers. Compare the visible calculation steps rather than assuming one hidden method is universally correct.",
    },
    {
      question: "Is a Life Path Number scientifically proven?",
      answer:
        "No. Numerology is a symbolic belief and interpretive tradition, not a validated scientific or clinical assessment.",
    },
    {
      question: "Can my Life Path Number change?",
      answer:
        "The number generated from the same birth date and the same calculation method does not change. Your interpretation and relationship with the symbolism may change over time.",
    },
    {
      question: "Is my Life Path Number the same as my Birthday Number?",
      answer:
        "No. A Life Path Number uses the complete birth date. A Birthday Number generally uses only the day of the month on which you were born.",
    },
    {
      question: "Is a Life Path Number the same as a Soul Blueprint?",
      answer:
        "No. They come from separate symbolic systems. A Life Path Number is a numerology result; a 1320 Soul Blueprint uses the proprietary S0–S9 framework.",
    },
  ],
  related: [
    { title: "Life Path Number vs Soul Blueprint", href: "/life-path-number-vs-soul-blueprint" },
    { title: "What a Soul Blueprint means", href: "/what-is-a-soul-blueprint" },
    { title: "Discover your Free Soul Blueprint", href: FREE_BLUEPRINT_HREF },
    { title: "View a Sample Soul Blueprint Report", href: SAMPLE_REPORT_HREF },
  ],
};
