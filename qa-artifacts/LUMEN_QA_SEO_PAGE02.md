# Lumen QA · Page 02 · Life Path Number vs Soul Blueprint

**Verdict:** FAIL / HOLD  
**Production readiness:** Not ready for Wisewave acceptance  
**Production URL:** `https://www.1320soulcode.com/life-path-number-vs-soul-blueprint`  
**Implementation commit:** `54b4823`  
**QA date:** 2026-07-31

## Release blocker

The required hero / mid / final primary CTA pattern is incomplete.

Production renders only two primary gold CTA instances:

1. Hero — `Discover My Free Soul Blueprint` → `/free-soul-blueprint`
2. Final `Go Beyond One Number` conversion block — `Discover My Free Soul Blueprint` → `/free-soul-blueprint`

There is no separate mid-article primary CTA. The Page 02 hard check explicitly requires hero, mid, and final primary CTA placements.

## Automated result

`34 / 35` production assertions passed.

Run:

```bash
QA_BASE_URL=https://www.1320soulcode.com npx tsx scripts/lumen-qa-seo-page02.ts
```

The only failing assertion is:

```text
FAIL | Hero, mid, and final primary CTA placements all exist
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
    "inConversion": true
  }
]
```

## Passed hard checks

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
- Page 01 is linked contextually.
- The 1280px first viewport contains one dominant gold CTA.
- Hero contains no Full Report, checkout, purchase, or Session pressure.
- CTA and Page 01 destinations return HTTP 200.
- No browser console or page errors were observed.

## Visual review

- Desktop: educational hierarchy is clear; table is readable; the hero is balanced and not sales-heavy.
- Mobile: H1 wraps cleanly, direct answer remains readable, primary CTA fits the viewport, comparison content switches to cards, and no clipping or horizontal overflow is visible.
- The page is long but remains structurally coherent and appropriately educational for the comparison/discovery role.

Production screenshots:

- `qa-artifacts/seo-page02-check/page02-1280-first-viewport.png`
- `qa-artifacts/seo-page02-check/page02-1280-full.png`
- `qa-artifacts/seo-page02-check/page02-390-first-viewport.png`
- `qa-artifacts/seo-page02-check/page02-390-full.png`

## Replacement OG artwork

A replacement review asset was generated and placed at:

`public/seo/life-path-number-vs-soul-blueprint-1320.webp`

- Exact format/dimensions: WebP · 1200×630
- Local SHA-256: `832CDA2AA92A23881F02DD8D07E19413AEF6FC1C1BF0635687380213A086C61F`
- Production placeholder SHA-256: `82BF27638286C09BC7FF177BEF6715CBA0C735337813A1A120B37BAD27F03C46`
- The local replacement is not deployed.
- Review watchpoint: the image generator retained small-cap `VS` styling in the centre despite correction attempts; all other required labels, including `S1 → S3 → S2 → S0`, are correct.

## Required correction and retest

Add one restrained mid-article primary CTA to `/free-soul-blueprint` while preserving:

- one dominant gold CTA in the first desktop viewport;
- the current educational, non-sales-heavy tone;
- the existing final conversion block;
- mobile no-overflow behavior.

After deployment, rerun the 35-check production suite and refresh the four screenshots. Wisewave acceptance remains on HOLD until that check passes.
