# Lumen QA — Commercial Output Layer Step 2 (S0–S3)

**Date:** 2026-07-11  
**Environment:** Production — https://www.1320soulcode.com  
**Deploy ref:** `3bb720c` (`Integrate Wisewave Step 2 commercial overlay for S0-S3`)  
**Overall:** PASS WITH NOTES  

## Summary

Wisewave Step 2 commercial overlay (126 entries: S0 20 / S1 44 / S2 50 / S3 12) is integrated at `data/1320-v2/commercial-report-blocks-overlay.json` without overwriting symbolic source. Production serves commercial blocks for S0–S3; S4–S9 continue symbolic/steward fallback. All five required birth dates render without synthesis errors, preserve **S1 → S3 → S2 → S0** order, and show no source-layer template or internal commercial-layer leak phrases.

## Birth date results (5+)

| # | Birth date | Codes (resolved) | Order | Triggers | Result |
|---|------------|------------------|-------|----------|--------|
| 1 | 1980-05-22 | S1-18 / S3-03 / S2-27 / S0-07 | PASS | None | PASS |
| 2 | 1982-02-03 | S1-20 / S3-01 / S2-05 / S0-05 | PASS | None | PASS |
| 3 | 1977-11-12 | S1-24 / S3-04 / S2-23 / S0-09 | PASS | None | PASS |
| 4 | 1988-07-14 | S1-26 / S3-03 / S2-21 / S0-18 | PASS | None | PASS |
| 5 | 1990-03-09 | S1-19 / S3-01 / S2-12 / S0-11 | PASS | None | PASS |

**Paid surface spot-check:** `/full-report-v2` — S1-18 / S3-03 / S2-27 / S0-07, order PASS, no trigger phrases.

## Wisewave Step 2 checklist

| Check | Result | Notes |
|-------|--------|-------|
| 1. Commercial blocks active (S0–S3) | PASS | Direct you/your commercial prose on all five dates; no `This Soul Origin reflects…` / `It invites the user…` / `This vibration tier reflects…` |
| 2. Order preserved (S1→S3→S2→S0) | PASS | Verified on all five dates + `/full-report-v2` |
| 3. S2 relationship mirror governance | PASS | No `who you attract`, `destined partner`, or `compatibility verdict` on spot-checks |
| 4. S3 non-ranking language | PASS | No `spiritual rank` / `spiritual hierarchy`; `spiritual maturity` not present on 1980-05-22 |
| 5. S0 non-diagnostic / non-fate framing | PASS | Void gate framed as threshold/illusion awareness in commercial blocks |
| 6. Fallback when commercial absent | PASS | Local smokes confirm S4–S9 non-commercial; no `Commercial report output layer` in locked previews |
| 7. Paid report spot-check (1980-05-22) | PASS WITH NOTES | Tone aligns with Wisewave reference doc; S4–S9 still symbolic until Step 3 |

## Local pre-flight (Nova)

```bash
npm run smoke:commercial-overlay-step2   # PASS
npm run smoke:v2-get-content             # PASS
npm run smoke:full-report-v2-sample      # PASS
```

Production probe: `npx tsx scripts/lumen-qa-commercial-step2-prod.ts` — PASS (all six URLs).

## Failures / Holds

None.

## Notes

- HTML responses include additional module count metadata (e.g. `S1-44 / S3-12 / S2-50 / S0-19`) alongside resolved user codes; this does not affect rendered section order or user-facing copy.
- Full commerce/entitlement not rerun; Holly previously verified Stripe/entitlement.
- S4–S6 commercial normalization remains Wisewave Step 3 scope.

## Sign-off

**Step 2 accepted for Step 3 handoff: Yes, with notes**

Wisewave may proceed to Step 3 (light normalization for S4–S6).
