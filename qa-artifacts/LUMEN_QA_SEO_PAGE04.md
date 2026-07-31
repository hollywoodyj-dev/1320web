# Lumen QA · Page 04 · Numerology by Date of Birth vs Soul Blueprint

**Verdict:** PASS  
**Production readiness:** Ready for Wisewave acceptance  
**Production URL:** `https://www.1320soulcode.com/numerology-by-date-of-birth-vs-soul-blueprint`  
**Implementation commit:** `c02b345`  
**QA date:** 2026-07-31

## Automated result

- Production browser audit: `39 / 39` assertions passed.
- No browser console or page errors were observed.
- Targeted ESLint passed for the QA script and Page 04 implementation/content files.

Command:

```bash
npx tsx scripts/lumen-qa-seo-page04.ts
```

Machine-readable evidence:

`qa-artifacts/seo-page04-production-c02b345/page04-production-checks.json`

## Search and technical

- Canonical route returns HTTP 200 and is indexable.
- Self-canonical is exact and the route appears in `sitemap.xml`.
- `/guides/numerology-by-date-of-birth-vs-soul-blueprint` returns exact HTTP 301 to the canonical route.
- H1 appears once with exact text: `Numerology by Date of Birth vs Soul Blueprint`.
- Title and meta description are present and aligned.
- The direct answer begins at approximately body word 78 and is present in the initial server response.
- Core content is present in the initial HTML.
- No birth-date result URL is created.
- Article and BreadcrumbList JSON-LD parse correctly.
- Article author is `Organization` · `1320 Soul Code`.

## Numerology accuracy

- “Numerology by date of birth” is framed as an umbrella term and family of symbolic practices.
- Life Path is described as one common full-date output.
- Birthday Number is described as using mainly the birth day and is distinguished from Life Path.
- Other chart positions and cycles are acknowledged, including personal years, challenge numbers, and period cycles.
- Method and interpretation differences between numerology traditions are explicit.
- Numerology is not framed as science or reliable prediction.
- Personality, destiny, diagnosis, and future-outcome boundaries are explicit.

## 1320 accuracy

- 1320 is explicitly not described as conventional numerology.
- Soul Blueprint is framed as a proprietary symbolic reflection framework.
- Every four-code arrow sequence is exactly `S1 → S3 → S2 → S0`.
- The complete map is accurately framed as `S0–S9`.
- Life Path and Birthday Number are not presented as 1320 outputs or parts of the Soul Blueprint result.
- “Same input, different framework” is explicit.
- User authority is preserved.
- No scientific or spiritual-superiority claim was detected.

## Comparison and cannibalisation

- The comparison is different-not-superior and does not dismiss numerology.
- There is no calculator form, generic numerology calculator, second Life Path calculator, email gate, or interactive result.
- There is no Life Path 1–9 directory or Birthday 1–31 directory.
- Page 03 retains calculator intent through a clearly separate `Calculate My Life Path Number` link.
- Page 05’s dedicated Birthday/Life Path/Blueprint comparison and Page 06’s birthday-meaning directory are not reproduced.
- No request reached the Blueprint Resolver or any calculation API.

## Conversion and UX

- Hero, mid, and final primary CTAs are present.
- All three read `Discover My Free Soul Blueprint` and point to `/free-soul-blueprint`.
- The Life Path calculator is linked as a separate tool in the hero and article.
- Pages 01, 02, and 03 are linked contextually.
- The first 1280px viewport contains exactly one dominant gold CTA.
- Hero contains no Full Report, checkout, Session, purchase, or email-gate pressure.
- Desktop comparison table is visible and readable.
- Mobile replaces the table with 11 comparison cards below 720px.
- No horizontal overflow at 1280px or 390px.

## Visual review

- Desktop reads as an educational comparison page, not a calculator or ranking page.
- The hero balances the two systems and keeps the Free Blueprint action dominant without crowding the secondary calculator link.
- At 390px, the H1 and direct answer wrap cleanly and the full page preserves a single-column reading rhythm.

Fresh production screenshots:

- `qa-artifacts/seo-page04-production-c02b345/page04-1280-first-viewport.png`
- `qa-artifacts/seo-page04-production-c02b345/page04-1280-full.png`
- `qa-artifacts/seo-page04-production-c02b345/page04-390-first-viewport.png`
- `qa-artifacts/seo-page04-production-c02b345/page04-390-full.png`

## Replacement OG artwork

Local review candidate:

`public/seo/numerology-by-date-of-birth-vs-soul-blueprint-1320.webp`

- Exact format/dimensions: WebP · 1200×630
- SHA-256: `AB01D52853FC171B2A83FD02C923B0946131CB8DAF0918ABF21FF1BF1D856F2B`
- Generated with the built-in image tool and converted locally to the required WebP dimensions.
- The same sample date is shown on both sides to reinforce “same input, different framework.”
- Sample numerology is internally correct: `1990-05-17` gives Life Path `5` and Birthday Number `8`.
- Foundation order is exactly `S1 → S3 → S2 → S0`.
- The composition is equal-weight and contains no zodiac, tarot, fortune-telling, superiority, scientific-proof, neon-purple, human-silhouette, or calculator-UI treatment.

Production still serves the temporary 1200×630 WebP:

- Live SHA-256: `87CEB096A9DAE716B1793EB4670D7F8158944B99436F727192AA42C3D3179CD6`
- Downloaded evidence: `qa-artifacts/seo-page04-production-c02b345/numerology-by-date-of-birth-vs-soul-blueprint-1320-live.webp`

Review and deployment of the replacement artwork is a non-blocking follow-up.

## Acceptance

Page 04 passes production QA and is ready for Wisewave acceptance. The only follow-up is review/deployment of the replacement OG artwork.
