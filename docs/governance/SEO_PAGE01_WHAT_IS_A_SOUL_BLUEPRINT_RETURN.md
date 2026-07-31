# Page 01 · What Is a Soul Blueprint? — Nova Return

**Status:** ✅ Accepted and Closed by Wisewave  
**Canonical URL:** `https://www.1320soulcode.com/what-is-a-soul-blueprint`  
**Spec:** Content & SEO Spec v1.0  
**Date:** 2026-07-31  
**Wisewave acceptance:** 2026-07-31

## Summary

Nova shipped the first canonical SEO definition page for Soul Blueprint at the approved **root** path (not under `/guides`). Article + BreadcrumbList JSON-LD are present; FAQPage rich-result schema is intentionally omitted.

**Wisewave final decision: Accepted and Closed.**  
This page is the canonical internal definition of Soul Blueprint within 1320.

## Wisewave acceptance (2026-07-31)

Accepted production state:

- Opening section directly defines Soul Blueprint
- Mirror, not a fixed identity
- Foundation sequence locked: **S1 → S3 → S2 → S0**
- Full Soul Blueprint framed as complete S0–S9
- Clear distinction from numerology, astrology, Human Design, personality testing, prediction, diagnosis
- User authority preserved
- Primary conversion: Discover My Free Soul Blueprint
- No hero checkout, Session pressure, urgency, or calculator positioning
- Desktop/mobile hierarchy accepted; one dominant gold CTA in first desktop viewport
- Canonical root URL, metadata, Article JSON-LD, BreadcrumbList, sitemap, duplicate-path **301** accepted
- Live 1200×630 artwork preserves S1 → S3 → S2 → S0
- Lumen production QA and 25/25 automated checks acknowledged

Non-blocking maintenance notes (do not reopen Page 01):

1. Replace archived centering screenshots that still show earlier artwork so repo evidence matches production — addressed below.
2. Future SEO article template: align visible provenance with Article JSON-LD authorship (restrained visible line **or** organization-level author standard).

Next authorized content implementation may proceed under the locked SEO architecture.

## Lumen production QA (f511ee8)

Automation: **PASS** (24/24).  
Manual verdict: **FAIL / HOLD**.

Blockers recorded:

1. `/guides/what-is-a-soul-blueprint` returned HTTP **308**; acceptance requires HTTP **301**.
2. At 1280px, site-header gold CTA + hero gold CTA shared the first viewport.
3. Production still served the temporary programmatic OG diagram.

Artifact: `qa-artifacts/LUMEN_QA_SEO_PAGE01.md`  
Screenshots: `qa-artifacts/seo-page01-production-f511ee8/page01-1280.png` and `page01-390.png`

## Correction patch (post-HOLD)

| Blocker | Fix |
|---------|-----|
| 308 vs 301 | Middleware + `next.config` now emit **HTTP 301**. Removed `permanentRedirect` (308) from `/guides/[slug]`. |
| Dual gold CTA | On `/what-is-a-soul-blueprint` and `/guides*`, header CTA is demoted to quiet text link; article hero keeps the single dominant gold CTA. |
| OG artwork | Deploy Lumen-generated `public/seo/what-is-a-soul-blueprint-1320.webp` (1200×630, S1→S3→S2→S0). |

## Lumen production re-QA (21be3dd)

**Verdict: PASS**

- Duplicate guide URL returns HTTP 301 with the correct canonical destination.
- The 1280px first viewport contains one dominant gold CTA; the header action is quiet and the hero action remains gold.
- Production serves the Lumen replacement artwork at 1200×630.
- Production and repository artwork SHA-256 hashes match exactly: `45f1bfc4bda3a14aba93d3f710528cc731685d761b6bdea0c601041ba5e43b03`.
- The artwork visibly preserves the required S1→S3→S2→S0 sequence.
- Automated production QA passes 25/25; no desktop overflow or console errors were observed.

Acceptance screenshot: `qa-artifacts/seo-page01-production-21be3dd/page01-1280-first-viewport.png`

## Post-PASS polish (Holly)

1. Removed visible on-page byline / published dates (author remains in Article JSON-LD only)
2. Centered breadcrumb, hero copy, CTAs, and hero figure in the 760–780px column
3. Centering screenshots refreshed from **live production** so hero artwork matches current Lumen asset: `qa-artifacts/seo-page01-centering-check/`

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
| Redirect | Middleware + `next.config` **301** to canonical root |
| OG image | Lumen replacement WebP at `public/seo/what-is-a-soul-blueprint-1320.webp` |
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
Header CTA on this page is quiet (non-gold) so the first desktop viewport has one dominant gold CTA.  
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
