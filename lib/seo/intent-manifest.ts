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
 * T14 / Step 1c LOCKED: `/`, `/your-code`, `/free-soul-blueprint` stay self-canonical,
 * index/follow, sitemap=true. Same conversion mechanism ≠ duplicate intent.
 *
 * Governance fields (T13) are metadata only — not auto-asserted against live HTML.
 * New Search Assets must set `admission_basis` to one of SEARCH_ASSET_ADMISSION_BASES.
 */

export type SeoIntentClass = "A" | "B" | "C" | "D";

/** Why this URL exists independently. */
export type PageRole =
  | "brand_home"
  | "branded_product_entry"
  | "acquisition_landing"
  | "product_sales"
  | "product_sample"
  | "session_booking"
  | "guides_hub"
  | "brand_about"
  | "product_architecture"
  | "support_faq"
  | "interactive_reflect"
  | "legal"
  | "search_definition"
  | "search_comparison"
  | "search_tool"
  | "search_bridge"
  | "search_reference";

/**
 * D-7 locked. Do not invent new values without a separate enum expansion.
 *   unaware        — "Who are you?"
 *   known_user     — "I know 1320. Let me begin."
 *   external_cold  — "I arrived through acquisition."
 */
export type AudienceState = "unaware" | "known_user" | "external_cold";

export type QueryFamily =
  | "branded_1320"
  | "branded_code_generation"
  | "free_soul_blueprint"
  | "full_report"
  | "personal_integration"
  | "guides"
  | "about_1320"
  | "soul_blueprint_architecture"
  | "sample_report"
  | "faq"
  | "reflect"
  | "legal"
  | "soul_blueprint_definition"
  | "life_path_vs_soul_blueprint"
  | "life_path_calculator"
  | "numerology_by_dob"
  | "birthday_vs_life_path"
  | "birthday_meaning";

export type PrimaryConversion =
  | "free_blueprint_start"
  | "full_report_checkout"
  | "session_booking"
  | "none";

/**
 * P7+ production gate for new Search Assets. One of the first four is required
 * to ship a new search URL. `What is X?` / `X vs 1320` alone is not enough.
 */
export const SEARCH_ASSET_ADMISSION_BASES = [
  "original_evidence",
  "original_framework",
  "tool_method",
  "commercial_intent",
] as const;

export type SearchAssetAdmissionBasis = (typeof SEARCH_ASSET_ADMISSION_BASES)[number];

export type AdmissionBasis = SearchAssetAdmissionBasis | "not_search_asset" | "grandfathered_pre_p7";

/**
 * T16 search-asset taxonomy — separate from `page_role`.
 * page_role = why the URL exists; asset_class = D-6 keep/observe family.
 */
export type AssetClass =
  | "not_applicable"
  | "tool_search_reference"
  | "bridge_category_clarification"
  | "comparison_bridge"
  | "search_reference_governance"
  | "bridge_explanation";

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
  page_role: PageRole;
  audience_state: AudienceState;
  query_family: QueryFamily;
  primary_conversion: PrimaryConversion;
  admission_basis: AdmissionBasis;
  asset_class: AssetClass;
  notes?: string;
};

export function isAdmissibleNewSearchAsset(basis: AdmissionBasis): boolean {
  return (SEARCH_ASSET_ADMISSION_BASES as readonly string[]).includes(basis);
}

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
    page_role: "brand_home",
    audience_state: "unaware",
    query_family: "branded_1320",
    primary_conversion: "free_blueprint_start",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
    notes: "T14: Brand / Platform Home. Self-canonical, index, sitemap. No consolidation.",
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
    page_role: "acquisition_landing",
    audience_state: "external_cold",
    query_family: "free_soul_blueprint",
    primary_conversion: "free_blueprint_start",
    admission_basis: "commercial_intent",
    asset_class: "not_applicable",
    notes: "T14: Acquisition / Funnel Landing Page for search, ads, Pinterest, outreach.",
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
    page_role: "branded_product_entry",
    audience_state: "known_user",
    query_family: "branded_code_generation",
    primary_conversion: "free_blueprint_start",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
    notes: "T14: Branded Product Entry. Known 1320 users start generation here.",
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
    page_role: "product_sales",
    audience_state: "known_user",
    query_family: "full_report",
    primary_conversion: "full_report_checkout",
    admission_basis: "commercial_intent",
    asset_class: "not_applicable",
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
    page_role: "session_booking",
    audience_state: "known_user",
    query_family: "personal_integration",
    primary_conversion: "session_booking",
    admission_basis: "commercial_intent",
    asset_class: "not_applicable",
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
    page_role: "guides_hub",
    audience_state: "unaware",
    query_family: "guides",
    primary_conversion: "free_blueprint_start",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
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
    page_role: "brand_about",
    audience_state: "unaware",
    query_family: "about_1320",
    primary_conversion: "free_blueprint_start",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
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
    page_role: "product_architecture",
    audience_state: "unaware",
    query_family: "soul_blueprint_architecture",
    primary_conversion: "free_blueprint_start",
    admission_basis: "original_framework",
    asset_class: "not_applicable",
    notes: "Public Soul Blueprint Architecture Page — distinct from Page 01.",
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
    page_role: "product_sample",
    audience_state: "external_cold",
    query_family: "sample_report",
    primary_conversion: "full_report_checkout",
    admission_basis: "commercial_intent",
    asset_class: "not_applicable",
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
    page_role: "support_faq",
    audience_state: "unaware",
    query_family: "faq",
    primary_conversion: "free_blueprint_start",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
  },
  {
    path: "/reflect",
    canonical: "/reflect",
    index: false,
    sitemap: false,
    title: "Wisewave Reflection | 1320 Soul Blueprint",
    h1: "Reflect With Your Soul Blueprint",
    class: "D",
    priority: 0.65,
    changeFrequency: "monthly",
    page_role: "interactive_reflect",
    audience_state: "known_user",
    query_family: "reflect",
    primary_conversion: "none",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
    notes:
      "T29: interaction doorway, not a discovery asset. D class — noindex, follow; sitemap false (20 → 19). Self-canonical kept. robots.txt unchanged in step 1: Disallow /reflect/ still covers session URLs only.",
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
    page_role: "legal",
    audience_state: "unaware",
    query_family: "legal",
    primary_conversion: "none",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
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
    page_role: "legal",
    audience_state: "unaware",
    query_family: "legal",
    primary_conversion: "none",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
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
    page_role: "legal",
    audience_state: "unaware",
    query_family: "legal",
    primary_conversion: "none",
    admission_basis: "not_search_asset",
    asset_class: "not_applicable",
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
    page_role: "search_definition",
    audience_state: "external_cold",
    query_family: "soul_blueprint_definition",
    primary_conversion: "free_blueprint_start",
    admission_basis: "original_framework",
    asset_class: "not_applicable",
    notes:
      "Page 01. T15 added a narrow traditions section (Akashic / numerology chart vs 1320 Soul Blueprint). Title, H1, canonical unchanged.",
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
    page_role: "search_comparison",
    audience_state: "external_cold",
    query_family: "life_path_vs_soul_blueprint",
    primary_conversion: "free_blueprint_start",
    admission_basis: "original_framework",
    asset_class: "bridge_explanation",
    notes: "T16 P2 · Bridge / Explanation Asset. Keep index/canonical/sitemap.",
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
    page_role: "search_tool",
    audience_state: "external_cold",
    query_family: "life_path_calculator",
    primary_conversion: "free_blueprint_start",
    admission_basis: "tool_method",
    asset_class: "tool_search_reference",
    notes: "T16 P3 · Tool / Search Reference. Keep and observe — not Bridge.",
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
    page_role: "search_bridge",
    audience_state: "external_cold",
    query_family: "numerology_by_dob",
    primary_conversion: "free_blueprint_start",
    admission_basis: "grandfathered_pre_p7",
    asset_class: "bridge_category_clarification",
    notes: "T16 P4 · Bridge / Category Clarification. Stable maintenance. No new generic pages in this family.",
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
    page_role: "search_comparison",
    audience_state: "external_cold",
    query_family: "birthday_vs_life_path",
    primary_conversion: "free_blueprint_start",
    admission_basis: "grandfathered_pre_p7",
    asset_class: "comparison_bridge",
    notes: "T16 P5 · Comparison / Bridge Asset. Stable maintenance.",
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
    page_role: "search_reference",
    audience_state: "external_cold",
    query_family: "birthday_meaning",
    primary_conversion: "free_blueprint_start",
    admission_basis: "grandfathered_pre_p7",
    asset_class: "search_reference_governance",
    notes: "T16 P6 · Search Reference / Governance Asset. Stable maintenance.",
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
