# Lumen QA — Visual Density & Mobile Report UX v1.0

**Date:** 2026-07-14  
**Spec:** `web/docs/specs/1320_VISUAL_DENSITY_AND_MOBILE_REPORT_UX_SPEC_v1.md`  
**Implementation:** Nova visual density pass  
**Status:** PASS WITH NOTES  

## Scope

- Global typography tokens (`site-density-v1.css`, `mobile-density-v1.css`)
- Reusable mobile density components (`components/mobile-report-v2/density/`)
- Mobile Page 28 refactor (7-Day Integration Practice Overview)
- Homepage density pass (lighter mobile sections + trimmed copy)

## Lumen Checklist

| Check | Expected | Notes |
|-------|----------|-------|
| Mobile report less dense | Page 28 uses hero + 7 pill cards + tips panel | PASS — Page 28 renders `mr-v2-screen--7-day-integration-practice-overview mr-v2-screen--density-v1`, 7 practice pills, 4 tips, and no old glass cards |
| Body text readable on iPhone | 16.5px / lh 1.65 | PASS — rendered mobile report body is 16.5px / 400; homepage body is 16.5px / 27.225px / 400 |
| No overly thin font weight | body 400, headings 600 | PASS — rendered body font-weight is 400; heading styling is visually heavier |
| Section spacing increased | Homepage + mobile cards | PASS WITH NOTE — rendered spacing is calmer; no horizontal overflow on Page 28 |
| Cards visually scannable | Practice pill cards with icon + day + subtitle | PASS — 7 pill cards render with icon/day/title/subtitle/chevron pattern |
| S1 → S3 → S2 → S0 order unchanged | Foundation order preserved in blueprint pages | PASS — browser text still exposes `S1-18 | S3-03 | S2-27 | S0-07` and matching card order |
| S7 no percentage/score language | Unchanged | PASS — browser text check found no nearby percentage/score/rank language |
| S6 Value & Receiving language | Unchanged | PASS — browser text still includes `Value & Receiving` |
| Homepage copy reduced ~35–45% | Mobile hides curiosity + extra paragraphs | PASS — `.homepage-curiosity` renders `display:none`; visible homepage section paragraphs reduced |
| CTAs clearly visible | Unchanged structure | PASS — mobile homepage still exposes Generate/View/Explore/Unlock CTAs |
| Mobile navigation guided | Swipe nav unchanged | PASS WITH NOTE — Page 28 was reached through the viewer's persisted page-index state for deterministic QA; adjacent Page 29 remains the detailed practice-card page |
| No commercial template leaks | Unchanged overlay | PASS — browser text check and smoke scripts found no commercial output-layer leak |

## Manual Test URLs

- Homepage: `/`
- Mobile sample report: `/mobile-report-v2` (Page 28 = swipe index 28)
- Desktop sample (control): `/full-report-v2?view=desktop`

## Suggested Device Checks

1. iPhone width (~390px): Page 28 hero fits 2 lines, card subtitles truncate cleanly
2. Homepage mobile: curiosity section hidden; what-is and origin show fewer paragraphs
3. Swipe Page 27 → 28 → 29: overview feels lighter; detail remains on Page 29+

## Verdict

**PASS WITH NOTES** — local QA accepts the visual density implementation for the requested surfaces.

## Lumen Verification — 2026-07-14

Environment:

- Local URL: `http://127.0.0.1:3014`
- Viewport: 390 × 844
- Commit observed: `09bb772 Improve 1320 visual density and mobile report reading experience`

Commands:

- `npm run build` — PASS
- `npm run smoke:commercial-overlay` — PASS
- `npm run smoke:full-report-v2-sample` — PASS

Browser evidence:

- Homepage screenshot: `qa-artifacts/visual-density-home-mobile-20260714.png`
- Page 28 screenshot: `qa-artifacts/visual-density-mobile-report-page28-20260714.png`
- Page 29 screenshot: `qa-artifacts/visual-density-mobile-report-page29-20260714.png`

Observed:

- Mobile homepage renders lighter: curiosity block hidden, 16.5px body, visible CTAs.
- Mobile Page 28 renders as a clean overview: hero, short intro, 7 scannable practice pills, and 4 integration tips.
- Detail remains on Page 29 with 7 practice cards and Focus / Reflection content.
- No horizontal overflow detected on Page 28.
- No `Commercial report output layer` leak detected.

Notes:

- QA was performed locally after build, not against deployed production.
- Page 28 was reached via the viewer's `sessionStorage` page index for deterministic browser QA rather than manual finger swipe.
