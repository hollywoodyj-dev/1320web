# SEO Phase 0 — Technical & Measurement Foundation Return

**Status:** Implemented · awaiting Lumen validation  
**Architecture:** `docs/specs/seo/1320_SEO_KEYWORD_ARCHITECTURE_v1.md`  
**Canonical host:** `https://www.1320soulcode.com`

## Delivered

| # | Requirement | Implementation |
|---|-------------|----------------|
| 01 | Content hub | `/guides` |
| 02 | Shared SEO article template | `components/seo/seo-article-template.tsx` |
| 03 | Canonical URL behaviour | Primary host lock + article `alternates.canonical` |
| 04 | Article + Breadcrumb (+ FAQ) JSON-LD | `lib/seo/json-ld.ts` |
| 05 | Sitemap | `/guides` + published article slugs via `getSitemapRoutes()` |
| 06 | Search Console | Ops checklist (Holly) — property already on primary domain |
| 07 | Article → funnel attribution | `lib/seo/attribution.ts` + extended funnel fields |
| 08 | Content performance events | See events below |
| 09 | Author / reviewer fields | On `SeoArticle` + article footer |
| 10 | Update-date / version fields | `publishedAt` · `updatedAt` · `version` |

## Analytics events

| Event | Where |
|-------|--------|
| `seo_article_view` | Article mount |
| `seo_article_scroll_50` | 50% scroll |
| `seo_article_cta_click` | Any article CTA |
| `seo_to_free_blueprint` | Free Blueprint CTA |
| `free_blueprint_started` | Free landing birth-date submit |
| `free_blueprint_completed` | Generating complete + free result view |
| `free_to_full_report` | Free→Full CTA (+ SEO full-report CTA) |
| `seo_to_session` | Session CTA from article |

Attribution props (no birth date / PII): `landing_page`, `content_slug`, `primary_cluster`, UTM, `referrer`, `language`.

## Publishing gate

`SEO_ARTICLES` is empty until **Page 01** approved copy is registered with `published: true`.  
Unpublished slugs 404 and are **not** in the sitemap. Hub lists the P1–P10 roadmap as Coming Next.

## Lumen smoke

```bash
npx tsx scripts/lumen-qa-seo-phase0.ts
```

Optional: `QA_BASE_URL=https://www.1320soulcode.com`

## Next

After Lumen PASS → implement **Page 01 · What Is a Soul Blueprint?** from Content & SEO Spec v1.0.
