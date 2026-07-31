# Lumen QA · Page 02 · Life Path Number vs Soul Blueprint

**Verdict:** PASS
**Production readiness:** Ready for Wisewave acceptance
**Production URL:** `https://www.1320soulcode.com/life-path-number-vs-soul-blueprint`
**Implementation commit:** `8b6d50a`
**QA date:** 2026-07-31

## Correction verified

The Page 02 HOLD blocker is resolved in production.

Production renders all three required primary CTA placements:

1. Hero — `Discover My Free Soul Blueprint` → `/free-soul-blueprint`
2. Mid-article, after `Which Should You Explore?` — `Discover My Free Soul Blueprint` → `/free-soul-blueprint`
3. Final `Go Beyond One Number` conversion block — `Discover My Free Soul Blueprint` → `/free-soul-blueprint`

The first 1280px desktop viewport still contains exactly one dominant gold CTA.

## Automated result

`35 / 35` production assertions passed.

Run:

```bash
QA_BASE_URL=https://www.1320soulcode.com npx tsx scripts/lumen-qa-seo-page02.ts
```

Observed live primary CTAs:

```json
[
  {
    "text": "Discover My Free Soul Blueprint",
    "href": "/free-soul-blueprint",
    "inHero": true,
    "inConversion": false
  },
  {
    "text": "Discover My Free Soul Blueprint",
    "href": "/free-soul-blueprint",
    "inHero": false,
    "inConversion": false
  },
  {
    "text": "Discover My Free Soul Blueprint",
    "href": "/free-soul-blueprint",
    "inHero": false,
    "inConversion": true
  }
]
```

## Passed hard checks · 35/35

- Canonical route returns HTTP 200 and is indexable.
- Self-canonical is exact and the route appears in `sitemap.xml`.
- `/guides/life-path-number-vs-soul-blueprint` returns exact HTTP 301 to the canonical route.
- Exact H1 appears once.
- Title and meta description are present and aligned.
- Direct answer is server-rendered HTML text and begins at approximately body word 66.
- Life Path is framed as numerology using the full birth date, normally 1–9 with convention-dependent Master Numbers.
- Worked example is correct: 15 June 1990 → 4.
- No interactive calculator controls; calculator-intent Page 03 keywords are not targeted in title/meta.
- Soul Blueprint is framed as a proprietary symbolic framework.
- Every four-code arrow sequence is `S1 → S3 → S2 → S0`.
- Complete map is accurately framed as `S0–S9`.
- Different-not-better language is explicit; no superiority claim was detected.
- Prediction, diagnosis, scientific-assessment, and fixed-identity boundaries are present.
- Article and BreadcrumbList JSON-LD parse correctly.
- Article author is `Organization` · `1320 Soul Code`.
- Desktop table is visible; mobile replaces it with ten comparison cards below 720px.
- No horizontal overflow at 1280px or 390px.
- All rendered primary CTAs point to `/free-soul-blueprint`.
- Hero, mid, and final primary CTA placements are all present.
- Page 01 is linked contextually.
- The 1280px first viewport contains one dominant gold CTA.
- Hero contains no Full Report, checkout, purchase, or Session pressure.
- CTA and Page 01 destinations return HTTP 200.
- No browser console or page errors were observed.

## Visual review

- Desktop: educational hierarchy remains clear; the hero shows one dominant CTA and is not sales-heavy.
- Mobile: H1 and direct answer wrap cleanly, the primary CTA fits the viewport, and no horizontal overflow is visible.
- The new mid-article CTA is separate from the final conversion block.

Fresh production screenshots:

- `qa-artifacts/seo-page02-production-8b6d50a/page02-1280-first-viewport.png`
- `qa-artifacts/seo-page02-production-8b6d50a/page02-390-first-viewport.png`

## Replacement OG artwork

Production asset:

`https://www.1320soulcode.com/seo/life-path-number-vs-soul-blueprint-1320.webp`

- Exact format/dimensions: WebP · 1200×630
- Local SHA-256: `832CDA2AA92A23881F02DD8D07E19413AEF6FC1C1BF0635687380213A086C61F`
- Production SHA-256: `832CDA2AA92A23881F02DD8D07E19413AEF6FC1C1BF0635687380213A086C61F`
- The replacement is live, is referenced by the production Open Graph and Twitter metadata, and matches the approved local asset byte-for-byte.
- Review watchpoint: the image generator retained small-cap `VS` styling in the centre; all other required labels, including `S1 → S3 → S2 → S0`, are correct.

Downloaded live evidence:

`qa-artifacts/seo-page02-production-8b6d50a/life-path-number-vs-soul-blueprint-1320-live.webp`

## Acceptance

Page 02 passes the complete production suite and is ready for Wisewave acceptance. The small-cap `VS` treatment remains a non-blocking visual review watchpoint.
