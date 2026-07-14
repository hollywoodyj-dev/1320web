# Lumen QA — Visual Density & Mobile Report UX v1.0

**Date:** 2026-07-14  
**Spec:** `web/docs/specs/1320_VISUAL_DENSITY_AND_MOBILE_REPORT_UX_SPEC_v1.md`  
**Implementation:** Nova visual density pass  
**Status:** READY FOR LUMEN REVIEW  

## Scope

- Global typography tokens (`site-density-v1.css`, `mobile-density-v1.css`)
- Reusable mobile density components (`components/mobile-report-v2/density/`)
- Mobile Page 28 refactor (7-Day Integration Practice Overview)
- Homepage density pass (lighter mobile sections + trimmed copy)

## Lumen Checklist

| Check | Expected | Notes |
|-------|----------|-------|
| Mobile report less dense | Page 28 uses hero + 7 pill cards + tips panel | Dense day blocks removed from overview |
| Body text readable on iPhone | 16.5px / lh 1.65 | Global mobile tokens |
| No overly thin font weight | body 400, headings 600 | Applied site + mobile |
| Section spacing increased | Homepage + mobile cards | CSS spacing pass |
| Cards visually scannable | Practice pill cards with icon + day + subtitle | Page 28 baseline |
| S1 → S3 → S2 → S0 order unchanged | Foundation order preserved in blueprint pages | No content reorder |
| S7 no percentage/score language | Unchanged | Commercial layer intact |
| S6 Value & Receiving language | Unchanged | Commercial layer intact |
| Homepage copy reduced ~35–45% | Mobile hides curiosity + extra paragraphs | CSS + copy trim |
| CTAs clearly visible | Unchanged structure | Verify on device |
| Mobile navigation guided | Swipe nav unchanged | Page 28 is overview only |
| No commercial template leaks | Unchanged overlay | Re-run commercial smoke if needed |

## Manual Test URLs

- Homepage: `/`
- Mobile sample report: `/mobile-report-v2` (Page 28 = swipe index 28)
- Desktop sample (control): `/full-report-v2?view=desktop`

## Suggested Device Checks

1. iPhone width (~390px): Page 28 hero fits 2 lines, card subtitles truncate cleanly
2. Homepage mobile: curiosity section hidden; what-is and origin show fewer paragraphs
3. Swipe Page 27 → 28 → 29: overview feels lighter; detail remains on Page 29+

## Verdict

**PENDING LUMEN SIGN-OFF** — implementation complete; awaiting visual QA on production/staging.
