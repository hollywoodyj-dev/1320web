# Lumen QA - Addendum 1/2 Acceptance

**Date:** 2026-07-11  
**Environment:** Production https://www.1320soulcode.com  
**Deploy ref:** `c2fc52e` (`Add Lumen handoff for Addendum 1/2 acceptance gate and fix commercial S4/S6 payload mapping`)  
**Overall:** FAIL  

## Wisewave checklist (1-9)

| # | Checkpoint | Result | Notes |
|---|------------|--------|-------|
| 1 | Checkout / sign-in / return | PASS WITH NOTES | `/full-report` presents purchase path, `/checkout` loads, already-purchased sign-in copy is present, and `/checkout/success` provides return/report messaging. Entitled login was not rerun because no out-of-band password was available in this session and Holly already verified Stripe/entitlement. |
| 2 | Free Report flow | FAIL | `/your-code` accepts month/day/year only and submits to `/generating?year=1980&month=5&day=22`, then `/result?year=1980&month=5&day=22` loads. However the generated result visibly says: `Your Integrated Soul Blueprint could not be generated because one or more code layers are incomplete. Please contact support. (missing: s1.soulTraits, s1.coreLesson)`. |
| 3 | Sample S3 consistency | PASS | Production spot checks showed `S1-18 / S3-03 / S2-27 / S0-07` and `S3 raw value: 110` on sample/report surfaces; exact deprecated trigger scan found no public `S3-110`. |
| 4 | S0-S9 scope | PASS | Homepage, `/full-report`, `/full-report-v2`, FAQ, and free-result upsell describe the complete S0-S9 / S4-S9 scope, including S7-S9. |
| 5 | S1->S3->S2->S0 order | PASS | Order verified on homepage, `/blueprint`, `/your-code`, and generated `/result?year=1980&month=5&day=22`. No S1->S2->S3->S0 reversion found in checked surfaces. |
| 6 | Disclaimer / FAQ | PASS | Disclaimer includes S1, S3, S2, S0, S4, S5, S6, S7, S8, S9 and S7/S8/S9 boundary language. FAQ says Full Report can be purchased now and preserves S2/S6 boundary language. |
| 7 | No Living Blueprint OS(TM) | PASS | Exact public scan across checked routes found no `Living Blueprint OS` or `1320 Living Blueprint OS`. Public `Living Blueprint` journey language appears only without OS framing. |
| 8 | No prediction/diagnosis/ranking | PASS WITH NOTES | Deprecated positive claims were absent: no `Money Frequency`, `Who You Attract`, `spiritual maturity`, waitlist triggers, or bare `S3-110`. Trigger words like `fortune-telling`, `prediction`, `diagnosis`, `public success`, `spiritual superiority`, and `enlightenment` appear only in negating boundary copy. |
| 9 | Adapter regression | FAIL | Local Nova pre-flight commands passed, but production render spot-check exposed adapter/template artifacts on free result: canonical `1980-05-22` shows missing `s1.soulTraits` / `s1.coreLesson`; `1980-05-22` and `1988-07-14` free results expose user-facing internal copy `Commercial report output layer - reflective, non-predictive symbolic reading.` |

## Failures / Holds

- **Checkpoint 2 / Free Report flow:** Generated canonical free result reaches `/result`, but the page contains a visible user-facing failure message:
  - `Your Integrated Soul Blueprint could not be generated because one or more code layers are incomplete. Please contact support. (missing: s1.soulTraits, s1.coreLesson)`
- **Checkpoint 9 / Adapter regression:** Production free-result rendering leaks internal/template copy:
  - `Commercial report output layer - reflective, non-predictive symbolic reading.`
- These are production render regressions even though the local adapter smoke commands passed.

## Notes

- Deploy ref discrepancy: Nova's forwarded message said `c2fc52e`; the checked handoff file still listed `dc6937e`. Local `origin/master` / `HEAD` is `c2fc52e`, so this QA uses `c2fc52e` as the target ref.
- Adapter smoke commands run from `web/` all passed:
  - `npm run smoke:v2-get-content`
  - `npm run smoke:v2-content`
  - `npm run smoke:full-report-v2-sample`
  - `npm run smoke:content`
- `npm run smoke:content` still prints a legacy raw fixture banner `S1-18 / S3-110 / S2-27 / S0-07`, but its resolved code output is correct: `S1-18 / S3-03 / S2-27 / S0-07`. I did not count that local test-label text as a public UI failure.
- Public routes checked included `/`, `/your-code`, `/generating`, `/result?year=1980&month=5&day=22`, `/result?year=1982&month=2&day=3`, `/result?year=1977&month=11&day=12`, `/result?year=1988&month=7&day=14`, `/blueprint`, `/full-report`, `/full-report-v2`, `/sample-report-v2`, `/checkout`, `/checkout/success`, `/faq`, `/disclaimer`, `/about-1320#origin-story`, `/login`, `/account`, and `/my-report`.
- `/account` redirects to `/login?next=/account` when logged out, as expected.

## Sign-off

Addendum 1/2 Accepted: **No**
