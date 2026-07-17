# Lumen / Nova — Page 07 production text/cache verification

**Date:** 2026-07-18  
**URL:** https://www.1320soulcode.com/full-report  
**Method:** HTTP HTML scan + Puppeteer rendered DOM at 390px and 1280px  

## Verdict

**PASS — live production matches accepted Page 07 refinement.**

Wisewave’s reported pre-refinement strings were **not found** on the live rendered surface.

## Checks

| Check | 390px | 1280px |
|---|---|---|
| `.full-report-marketing--refined` present | Yes | Yes |
| Hero gold CTA = Unlock My Full Report → `/checkout` | Yes | Yes |
| Hero secondary = View Sample Report → `/full-report-v2` | Yes | Yes |
| Hero CTA count | 2 | 2 |
| “Book a 1320 Reading” in page text | Absent | Absent |
| Waitlist / join waitlist | Absent | Absent |
| Money patterns / Money Frequency | Absent | Absent |
| “Not a Sentence” | Absent | Absent |
| “Not a Fixed Identity” | Present | Present |

## Expected secondary pathway (not a regression)

“Book Personal Integration Session” appears **below** the unlock section in `.full-report-live-path` as a secondary link (not gold, not in hero). This is correct per the accepted refinement.

## Likely cause of earlier mismatch

Cached HTML / accessibility snapshot / older CDN edge, or confusion between:
- old: **Book a 1320 Reading** (removed from this page)
- current secondary lower CTA: **Book Personal Integration Session**

Hard refresh / cache-bypass confirms current production is refined.

## Script

`npx tsx scripts/verify-full-report-production-v1.ts`
