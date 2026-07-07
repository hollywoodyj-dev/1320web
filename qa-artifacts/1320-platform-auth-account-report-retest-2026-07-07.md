# 1320 Platform Auth / Account / Report Re-test - 2026-07-07

QA STATUS: PASS WITH NOTES
SCOPE: Platform auth, account hub, full report navigation, Reflect, Living Blueprint
ENVIRONMENT: production https://www.1320soulcode.com plus local automated gate
DATE REVIEWED: 2026-07-07
DEPLOY: cb150de+ locally, latest local head 8311208
ENTITLED ACCOUNT USED: hollywoodyj@gmail.com

## Summary

Nova's free-result and checkout fixes are verified. The previous missing-credentials blocker is resolved. Lumen's browser automation flagged full-report close/menu behavior, but Chino manually tested those two interactions and cleared them as pass.

Overall decision: PASS WITH NOTES.

## Pass 1 - Automated

| Check | Result |
|---|---|
| `npm run build` | PASS |
| `npm run smoke:report-canonical` | PASS - 1980-05-22, sections=19, schema=canonical-report-v1 |
| `npm run smoke:full-report-v2-sample` | PASS - S1-18\|S3-03\|S2-27\|S0-07, modules=10 |
| `npm run smoke:result-1977` | PASS - S1-24 / S3-04 / S2-23 / S0-09 |
| `npm run qa:baseline` | PASS - free-mode locked teasers restored |

## Pass 2 - Free Result + Checkout Birth

1982-02-03:
- PASS: `/result?year=1982&month=2&day=3` renders `S1-20 / S3-01 / S2-05 / S0-05`.
- PASS: free segment modules now show one overview/essence field plus locked teaser copy, not full paid fields.
- PASS: no `Money Frequency`; public upsell now says `Value & Receiving`.
- PASS: no `Karmic Loop` observed in checked free-result snapshot.
- PASS: checkout CTA includes `?year=1982&month=2&day=3`.
- PASS: checkout fields prefilled `1982 / 2 / 3`.
- PASS: `1320-birth-date=1982-2-3` cookie present.

1980-05-22:
- PASS: `/result?year=1980&month=5&day=22` renders `S1-18 / S3-03 / S2-27 / S0-07`.
- PASS: same locked free-layer behavior observed.

## Pass 3 - Auth

- PASS: `/account` logged out redirects to `/login?next=/account`.
- PASS: wrong password shows `Invalid email or password.`
- PASS: wrong password did not show `Sign-in is temporarily unavailable`.
- PASS: valid login lands on `/account`.
- PASS: sign out clears session and returns to public homepage.
- PASS: three valid login cycles in quick succession all landed on `/account`; no 503 or pool error observed.

## Pass 4 - Account Hub

- PASS: entitled account shows profile with email and birth date `1982-02-03`.
- PASS: signature shown as `S1-20 / S3-01 / S2-05 / S0-05`.
- PASS: account order observed as Profile -> Soul Code -> Full Report -> Living Blueprint -> Reflect with Wisewave -> Booking.
- PASS: `Reflect with Wisewave` appears under `Living Blueprint`.
- PASS: hero quick links for Full Report, Living Blueprint, and Reflect are present.
- NOTE: `OPEN FULL REPORT` link has the correct href, but agent-browser click on the duplicated account link did not navigate; direct URL opened the report. Because there are two identical `OPEN FULL REPORT` links, this may be automation ambiguity rather than a product defect.

## Pass 5 - Full Report Navigation

- PASS: entitled direct report URL opens `/my-report/fa695c92-8593-4cef-9c17-715de202a78b`.
- PASS: layout guide appeared on first open and dismissed with `Got it`.
- PASS: guide did not reappear in the same browser session.
- PASS: right-side click over report content advanced page 1 -> page 2.
- PASS: left-side click over report content returned page 2 -> page 1.
- PASS: ArrowRight advanced page 1 -> page 2.
- PASS BY HUMAN CONFIRMATION: close control `×` returns to `/account`; Lumen browser automation could not verify this reliably.
- PASS BY HUMAN CONFIRMATION: page-menu jump works; Lumen browser automation timed out on this interaction.
- MINOR NOTE: entitled report cover metadata says `Report Type Sample Full Report`, which reads like sample copy on a real entitled report.

## Pass 6 - Reflect + Living Blueprint

Reflect:
- PASS: account Reflect section showed saved name, email, and birth date.
- PASS: submitting an intention reached `/reflect/[sessionId]`.
- PASS: no false `email and birthDate are required` error.
- PASS: first Wisewave response returned.
- PASS: follow-up message sent with the Send button and a second response returned.
- PASS: observed tone was reflective/self-awareness oriented, with no professional advice or deterministic fate claim in the checked turns.
- NOTE: pressing Enter in the follow-up textbox did not submit; clicking Send worked.

Living Blueprint:
- PASS: account `OPEN LIVING BLUEPRINT` CTA opened `/living-blueprint/fa695c92-8593-4cef-9c17-715de202a78b`.
- PASS: membership profile loaded with name, email, birth date, expression stage, and active journey status.
- PASS: read-only Soul Blueprint codes match `S1-20 · S3-01 · S2-05 · S0-05`.
- PASS: return links to Full Report and Reflect are present.

## Issues Found

1. Minor: entitled report cover metadata says `Report Type Sample Full Report`.
2. Minor: account `OPEN FULL REPORT` click did not navigate in agent-browser, though href is correct and duplicate identical links may be confusing automation.
3. Minor: Reflect follow-up requires clicking Send; Enter did not submit in this QA pass.
4. Note: full-report close and page-menu were cleared by Chino's manual test after Lumen's automation false positives.

## Required Corrections

1. Change entitled report metadata from `Sample Full Report` to customer/entitled wording if that copy is unintended.
2. Consider disambiguating duplicate account `OPEN FULL REPORT` links for accessibility/automation.
3. Optional: support Enter-to-send in Reflect follow-up.

FINAL DECISION: Pass with notes. Full-report close/menu behavior accepted by Chino's manual verification.
