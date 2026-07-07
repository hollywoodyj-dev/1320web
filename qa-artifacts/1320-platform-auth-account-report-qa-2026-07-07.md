# 1320 Platform Auth / Account / Report QA - 2026-07-07

QA STATUS: FAIL
SCOPE: Platform auth, account hub, full report navigation, Reflect
ENVIRONMENT: production https://www.1320soulcode.com plus local automated gate
DATE REVIEWED: 2026-07-07
DEPLOY: baseline commit in repo is 837d4c5; production deploy id not visible in tested UI

## Session Log

Birth dates tested:
- 1982-02-03
- 1980-05-22

Section 0 - Automated regression: FAIL
Section 1 - Sign-in & sign-up: PARTIAL
Section 2 - Account hub layout: NOT RUN
Section 3 - Entitled full report navigation: NOT RUN
Section 4 - Reflect from account: NOT RUN
Section 5 - Living Blueprint access: NOT RUN
Section 6 - Free report -> checkout CTAs: FAIL
Section 7 - Ethical language spot check: FAIL

Overall: QA FAIL

## Automated Gate

Commands run from `web/`:

| Command | Result |
|---|---|
| `npm run build` | PASS |
| `npm run smoke:report-canonical` | PASS - 1980-05-22, sections=19, schema=canonical-report-v1 |
| `npm run smoke:full-report-v2-sample` | PASS - S1-18\|S3-03\|S2-27\|S0-07, modules=10 |
| `npm run smoke:result-1977` | PASS - S1-24 / S3-04 / S2-23 / S0-09 |
| `npm run qa:baseline` | FAIL - `s1 free layer locked` |

Follow-up probe showed every free result module is unlocked in the view model:

| Segment | showLocked | lockedTeaser |
|---|---:|---|
| s1 | false | missing |
| s3 | false | missing |
| s2 | false | missing |
| s0 | false | missing |

## Production Checks Completed

### Free `/result`

1982-02-03:
- PASS: signature rendered as `S1-20 / S3-01 / S2-05 / S0-05`.
- PASS: no visible `Full Report Previews` QA block found in browser snapshot.
- PASS: `VIEW FULL REPORT` CTA navigates to `/checkout`.
- FAIL: page says it shows "free first layer - overview fields only", but exposes full segment sections/fields such as Soul Traits, Strengths, Shadow Frequency, Mission Direction, Wisewave Guidance, Relationship Dynamic, Karmic Loop, Core Illusion, and One-Week Practice.
- FAIL: checkout did not preserve birth context in the tested session; year/month/day inputs were empty and no birth cookie was present after clicking from result to checkout.

1980-05-22:
- PASS: signature rendered as `S1-18 / S3-03 / S2-27 / S0-07`.
- PASS: no `S3-110` or `S0-27` display leak observed in the public result signature.
- FAIL: same free-layer exposure issue as 1982-02-03.

### Auth Public Surfaces

- PASS: visiting `/account` while logged out redirects to `/login?next=/account`.
- PASS: invalid login attempt returns `Invalid email or password.`
- PASS: invalid login did not show `Sign-in is temporarily unavailable`.

Not run:
- Valid login, repeat valid login, signup, signout, account layout, set/change password, entitled full report, Reflect from account, Living Blueprint from account.
- Reason: no entitled production test account credentials were provided in repo docs or runtime context. I did not create a production account from QA without explicit permission.

## Ethical Language Spot Check

FAIL:
- Public free result still exposes deprecated/public-risk vocabulary:
  - `Karmic Loop`
  - `Money Frequency`
- Some public result copy reads more deterministic/intense than the current mirror framing prefers, for example `You did not meet for comfort alone. You met to awaken.`

PASS:
- The main page framing repeatedly includes mirror / not destiny / self-authority language.
- No `Raw Value` display observed in the checked snapshots.

## Issues Found

1. Major: automated gate fails on `npm run qa:baseline` because free-mode modules are not locked.
2. Major: production `/result` exposes full segment fields while claiming only the free first layer is shown.
3. Major: `/result` -> `/checkout` does not preserve visible or hidden birth date context in the tested production session.
4. Major: public result copy still includes deprecated terms `Karmic Loop` and `Money Frequency`.
5. Blocked verification: entitled account/report/Reflect/Living Blueprint QA cannot be signed off without a valid entitled test account.

## Required Corrections

1. Restore free-result locked teaser behavior so `buildReportViewModel(..., { mode: "free", variant: "result" })` returns locked teaser modules and `npm run qa:baseline` passes.
2. Ensure public `/result` shows only the intended free layer and does not expose paid/full-report fields.
3. Preserve birth context from `/result?year=...&month=...&day=...` into `/checkout`.
4. Replace public deprecated language: `Money Frequency` -> approved value/receiving language; soften or replace `Karmic Loop` per Gate 2 vocabulary guidance.
5. Provide Lumen with an entitled production QA account, then rerun Sections 1-5 and the desktop/mobile happy path.

FINAL DECISION: Hold
