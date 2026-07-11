# Lumen QA - Addendum 1/2 Acceptance Retest

**Date:** 2026-07-11  
**Environment:** Production https://www.1320soulcode.com  
**Deploy ref:** `8682090` (`Fix free-result regressions from commercial output layer overlay`)  
**Retest scope:** Checkpoints 2 and 9 from `qa-artifacts/LUMEN_QA_HANDOFF_ADDENDUM_1_2_ACCEPTANCE_2026-07-11.md`  
**Overall:** PASS WITH NOTES  

## Deploy Confirmation

- `origin/master` resolves to `86820906a3915aa16f9faca166db7c1b44972708`.
- Production response headers confirm Vercel production (`Server: Vercel`, `X-Matched-Path: /result`) but do not expose a git SHA.
- Production behavior matches the `8682090` fix: the previous synthesis error and internal commercial-layer copy are no longer present on the requested spot-check URLs.

## Wisewave Checklist Retest

| # | Checkpoint | Result | Notes |
|---|------------|--------|-------|
| 1 | Checkout / sign-in / return | PASS WITH NOTES | Carried forward from `LUMEN_QA_ADDENDUM_1_2_ACCEPTANCE_2026-07-11.md`; not rerun in this focused retest. |
| 2 | Free Report flow | PASS | Browser flow from `/your-code` accepted month/day/year only, reached `/generating?year=1980&month=5&day=22`, then `/result?year=1980&month=5&day=22`. Result now renders `S1-18 / S3-03 / S2-27 / S0-07`, expected section fields, locked Full Report upsell copy, and no synthesis/missing-field error. |
| 3 | Sample S3 consistency | PASS | Carried forward from prior gate; `/full-report-v2` spot-check in this retest still shows expected `S1-18 / S3-03 / S2-27 / S0-07`, no `S3-110`, and no synthesis error. |
| 4 | S0-S9 scope | PASS | Carried forward from prior gate; not rerun in this focused retest. |
| 5 | S1->S3->S2->S0 order | PASS | Carried forward from prior gate; retested `1980-05-22` result preserves `S1 -> S3 -> S2 -> S0`. |
| 6 | Disclaimer / FAQ | PASS | Carried forward from prior gate; not rerun in this focused retest. |
| 7 | No Living Blueprint OS(TM) | PASS | Carried forward from prior gate; not rerun in this focused retest. |
| 8 | No prediction/diagnosis/ranking | PASS WITH NOTES | Carried forward from prior gate. Retested result pages use negating boundary language only and do not show the removed internal layer text. |
| 9 | Adapter regression | PASS | Local adapter smokes pass. Production spot-checks for `1980-05-22`, `1988-07-14`, and `/full-report-v2` show no synthesis error, no `Commercial report output layer`, and no `output layer - reflective` internal-copy leak. |

## Retest Evidence

### Local adapter pre-flight

Run from `C:\github\1320-website\web`:

- `npm run smoke:v2-get-content` - PASS
- `npm run smoke:v2-content` - PASS
- `npm run smoke:full-report-v2-sample` - PASS
- `npm run smoke:content` - PASS

`npm run smoke:content` still prints the legacy fixture banner `S1-18 / S3-110 / S2-27 / S0-07`, but its resolved output remains correct: `S1-18 / S3-03 / S2-27 / S0-07`. This is not a public UI failure.

### Production spot-checks

- `https://www.1320soulcode.com/result?year=1980&month=5&day=22`
  - Shows `S1-18 / S3-03 / S2-27 / S0-07`.
  - Shows expected free-layer fields including `Origin Essence`, `Vibration Essence`, and `Reflective Summary`.
  - Shows locked Full Report language as `This interpretation is symbolic and reflective...`
  - Does **not** show `Your Integrated Soul Blueprint could not be generated...`.
  - Does **not** show `missing: s1.soulTraits` or `missing: s1.coreLesson`.
  - Does **not** show `Commercial report output layer`.

- `https://www.1320soulcode.com/result?year=1988&month=7&day=14`
  - Shows `S1-26 / S3-03 / S2-21 / S0-18`.
  - Does **not** show `Commercial report output layer`.
  - Does **not** show `output layer - reflective`.
  - Uses the safe locked-preview note: `This interpretation is symbolic and reflective...`

- `https://www.1320soulcode.com/full-report-v2`
  - Shows expected sample code order `S1-18 / S3-03 / S2-27 / S0-07`.
  - Does **not** show `S3-110`.
  - Does **not** show synthesis or commercial-layer leak text.

## Notes

- Full commerce/entitlement was not rerun; Holly previously verified Stripe/entitlement and Nova scoped this retest to checkpoints 2 and 9.
- Prior PASS WITH NOTES remains for checkpoint 1 because entitled login was not rerun in the original gate.
- Prior PASS WITH NOTES remains for checkpoint 8 because boundary-trigger words appear only in negating safety language.

## Sign-off

Addendum 1/2 Accepted: **Yes, with notes**
