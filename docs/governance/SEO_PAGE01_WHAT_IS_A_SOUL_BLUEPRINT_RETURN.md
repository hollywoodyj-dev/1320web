# Page 01 · What Is a Soul Blueprint? — Nova Return

**Status:** Implemented · Lumen QA PASS (local) · Pending Wisewave production acceptance  
**Canonical URL:** `https://www.1320soulcode.com/what-is-a-soul-blueprint`  
**Spec:** Content & SEO Spec v1.0  
**Date:** 2026-07-31

## Summary

Nova shipped the first canonical SEO definition page for Soul Blueprint at the approved **root** path (not under `/guides`). Duplicate `/guides/what-is-a-soul-blueprint` permanently redirects to the canonical URL. Article + BreadcrumbList JSON-LD are present; FAQPage rich-result schema is intentionally omitted.

## Lumen QA

Local run against build on `:3011`: **PASS** (24/24).  
Artifact: `qa-artifacts/LUMEN_QA_SEO_PAGE01.md`

```bash
npx tsx scripts/lumen-qa-seo-page01.ts
```

## Delivered

| Area | Detail |
|------|--------|
| Route | `app/(site)/what-is-a-soul-blueprint/page.tsx` |
| Page UI | `components/seo/pages/what-is-soul-blueprint-page.tsx` |
| Copy | `lib/seo/content/what-is-a-soul-blueprint.ts` + `…-body.ts` |
| Registry | `SEO_ARTICLES` published; P1 roadmap status `published` |
| Sitemap | Includes `/what-is-a-soul-blueprint` via `seoArticlePath()` |
| Redirect | `next.config.ts` + guides slug `permanentRedirect` |
| OG image | `public/seo/what-is-a-soul-blueprint-1320.webp` (1200×630, S1→S3→S2→S0) |
| Analytics | `seo_article_scroll_90`, `seo_to_sample_report`, `seo_to_full_report` + `cta_position` / `primary_keyword` |
| Incoming links | Home, About, Blueprint, Free Soul Blueprint, FAQ |
| Outgoing | Free Blueprint, Sample, Full Report, Blueprint, About, Disclaimer, Privacy |

## Product vocabulary locked on-page

- **1320 Soul Code** = proprietary system  
- **Soul Blueprint** = user-facing map / product  
- **Soul Profile** = plain-language descriptor (keyword support only)  
- **Free Soul Blueprint** = four Foundation Mirrors (S1→S3→S2→S0)  
- **Full Soul Blueprint Report** = complete S0–S9  

## Conversion

Hero / mid / final primary CTA → `/free-soul-blueprint`  
No hero checkout, Session, urgency, or birth-date form on this page.  
Final secondary → Sample Report.

## Acceptance criteria (visitor outcomes)

After reading, a first-time visitor should be able to answer:

1. What a Soul Blueprint means within 1320  
2. It begins with birth date (Y/M/D only)  
3. Four Foundation Mirrors and required order  
4. Full Report extends into S4–S9  
5. Not prediction, diagnosis, or fixed identity  
6. How it differs from numerology / astrology / personality tests  
7. How to begin with Free Soul Blueprint  

## Explicit non-goals (unchanged)

No P0–P4 reopen, no homepage rebuild, no Session pressure in hero, no calculator positioning on this page.
