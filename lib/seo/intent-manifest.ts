/**
 * Expected SEO Intent Manifest — single source of truth for indexable public URLs.
 * Sitemap membership is DERIVED from entries with `sitemap: true` (see generate-sitemap.ts).
 *
 * Classification:
 *   A = correct self-canonical, indexable
 *   B = intentional canonical to another URL
 *   C = wrong canonical (must fix)
 *   D = should not be in sitemap / index
 *
 * Step 1c PENDING (玄微): birth-entry intent overlap for `/`, `/your-code`, `/free-soul-blueprint`.
 * Until decided, all three remain class A + sitemap (current prod state).
 */

export type SeoIntentClass = "A" | "B" | "C" | "D";

export type SeoIntentEntry = {
  path: string;
  /** Expected link[rel=canonical] path (resolved against metadataBase). */
  canonical: string;
  /** Expected robots index directive. */
  index: boolean;
  /** Include in public/sitemap.xml when true. */
  sitemap: boolean;
  /** Document title (browser <title> / metadata.title absolute or default). */
  title: string;
  /** Visible H1 text (normalized whitespace). */
  h1: string;
  class: SeoIntentClass;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  notes?: string;
};

/**
 * Core product + legal + SEO articles. Article titles/h1 match published content registry.
 */
export const SEO_INTENT_MANIFEST: SeoIntentEntry[] = [
  {
    path: "/",
    canonical: "/",
    index: true,
    sitemap: true,
    title: "1320 Soul Code | Meet Your Soul Blueprint",
    h1: "Meet Your Soul Blueprint",
    class: "A",
    priority: 1,
    changeFrequency: "weekly",
    notes: "Step 1c: brand/home vs birth-entry overlap — pending 玄微",
  },
  {
    path: "/free-soul-blueprint",
    canonical: "/free-soul-blueprint",
    index: true,
    sitemap: true,
    title: "Free Soul Blueprint Report | 1320 Soulcode",
    h1: "You Are More Than the Patterns You Learned to Survive.",
    class: "A",
    priority: 0.95,
    changeFrequency: "weekly",
    notes: "Step 1c: primary free funnel LP candidate — pending 玄微",
  },
  {
    path: "/your-code",
    canonical: "/your-code",
    index: true,
    sitemap: true,
    title: "Your Code | Begin Your Soul Blueprint",
    h1: "Start With Your Birth Date",
    class: "A",
    priority: 0.9,
    changeFrequency: "weekly",
    notes: "定案: Public Product Entry Page. Step 1c overlap with home/FSB — pending 玄微",
  },
  {
    path: "/full-report",
    canonical: "/full-report",
    index: true,
    sitemap: true,
    title: "Full Soul Blueprint Report | 1320 Soul Code",
    h1: "Explore Your Complete Soul Blueprint",
    class: "A",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/booking",
    canonical: "/booking",
    index: true,
    sitemap: true,
    title: "Personal Integration Session | 1320 Soul Code",
    h1: "Your Blueprint Does Not Change. Your Relationship With It Does.",
    class: "A",
    priority: 0.85,
    changeFrequency: "weekly",
  },
  {
    path: "/guides",
    canonical: "/guides",
    index: true,
    sitemap: true,
    title: "Guides | 1320 Soul Code",
    h1: "Guides to Understanding Your Soul Blueprint",
    class: "A",
    priority: 0.85,
    changeFrequency: "weekly",
  },
  {
    path: "/about-1320",
    canonical: "/about-1320",
    index: true,
    sitemap: true,
    title: "About 1320",
    h1: "Build a Living Relationship With Your Soul Blueprint",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/blueprint",
    canonical: "/blueprint",
    index: true,
    sitemap: true,
    title: "The Soul Blueprint",
    h1: "Four Foundation Layers. One Living Mirror.",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
    notes: "定案: Public Soul Blueprint Architecture Page — distinct from Page 01",
  },
  {
    path: "/full-report-v2",
    canonical: "/full-report-v2",
    index: true,
    sitemap: true,
    title: "Sample Soul Blueprint Report | 1320 Soul Code",
    h1: "Sample Soul Blueprint Report",
    class: "A",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    path: "/faq",
    canonical: "/faq",
    index: true,
    sitemap: true,
    title: "FAQ | 1320 Soul Code",
    h1: "Frequently Asked Questions",
    class: "A",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/reflect",
    canonical: "/reflect",
    index: true,
    sitemap: true,
    title: "Wisewave Reflection | 1320 Soul Blueprint",
    h1: "Reflect With Your Soul Blueprint",
    class: "A",
    priority: 0.65,
    changeFrequency: "monthly",
  },
  {
    path: "/privacy",
    canonical: "/privacy",
    index: true,
    sitemap: true,
    title: "Privacy Policy | 1320 Soul Code",
    h1: "Privacy Policy",
    class: "A",
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/terms",
    canonical: "/terms",
    index: true,
    sitemap: true,
    title: "Terms of Service | 1320 Soul Code",
    h1: "Terms of Service",
    class: "A",
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/disclaimer",
    canonical: "/disclaimer",
    index: true,
    sitemap: true,
    title: "Disclaimer | 1320 Soul Code",
    h1: "Disclaimer",
    class: "A",
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/what-is-a-soul-blueprint",
    canonical: "/what-is-a-soul-blueprint",
    index: true,
    sitemap: true,
    title: "What Is a Soul Blueprint? Meaning & How It Works | 1320",
    h1: "What Is a Soul Blueprint?",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/life-path-number-vs-soul-blueprint",
    canonical: "/life-path-number-vs-soul-blueprint",
    index: true,
    sitemap: true,
    title: "Life Path Number vs Soul Blueprint: What’s the Difference? | 1320",
    h1: "Life Path Number vs Soul Blueprint",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/what-is-my-life-path-number",
    canonical: "/what-is-my-life-path-number",
    index: true,
    sitemap: true,
    title: "What Is My Life Path Number? Free Calculator & Meaning | 1320",
    h1: "What Is My Life Path Number?",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/numerology-by-date-of-birth-vs-soul-blueprint",
    canonical: "/numerology-by-date-of-birth-vs-soul-blueprint",
    index: true,
    sitemap: true,
    title: "Numerology by Date of Birth vs Soul Blueprint | 1320",
    h1: "Numerology by Date of Birth vs Soul Blueprint",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    canonical: "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    index: true,
    sitemap: true,
    title: "Birthday Number vs Life Path Number vs Soul Blueprint | 1320",
    h1: "Birthday Number vs Life Path Number vs Soul Blueprint",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/what-does-your-birthday-mean",
    canonical: "/what-does-your-birthday-mean",
    index: true,
    sitemap: true,
    title: "What Does Your Birthday Mean? What It Can—and Cannot—Tell You",
    h1: "What Does Your Birthday Mean?",
    class: "A",
    priority: 0.8,
    changeFrequency: "monthly",
  },
];

export function getSitemapRoutesFromManifest() {
  return SEO_INTENT_MANIFEST.filter((entry) => entry.sitemap).map((entry) => ({
    path: entry.path,
    priority: entry.priority,
    changeFrequency: entry.changeFrequency,
  }));
}

export function getManifestEntry(path: string): SeoIntentEntry | undefined {
  return SEO_INTENT_MANIFEST.find((entry) => entry.path === path);
}
