# Lumen QA Plan — Platform Auth, Account Hub & Full Report Navigation

**Product:** 1320 Soul Origin Code  
**Scope:** Phase 2 platform — password auth, account hub, entitled full report UX, Reflect from account  
**Environment:** Production `https://www.1320soulcode.com` (primary)  
**Audience:** Lumen (manual QA)  
**Deploy baseline:** `837d4c5` and later on `master`  
**Last updated:** 2026-07-07

**Pair with:** `LUMEN_QA_PROTOCOL_v1.md` (ethical language on report content) · `FULL_REPORT_RELEASE_QA_v1.md` (desktop/mobile report parity) · `QA_BIRTHDATE_LUMEN.md` (free `/result` funnel)

---

## Purpose

Verify that a paying member can **sign in reliably**, manage their account, **read the full report** with the new page-turn UX, and **start Reflect** from account — without regression on free report codes or ethical copy.

**Out of scope this cycle:** Facilitator console, live Stripe switch, PDF export, email delivery of report, physical-phone pass (optional appendix).

---

## Prerequisites

| Item | Detail |
|------|--------|
| Browsers | Desktop Chrome or Edge; one mobile browser (Safari or Chrome @ 390×844) |
| Tabs | Private/incognito between auth scenarios |
| Test account | Entitled user with known email + password (or set password during test) |
| Canonical birth date | **1982-02-03** (Lumen baseline) · optional **1980-05-22** regression |
| Automated gate | Nova runs Section 0 first; Lumen proceeds only if green |

---

## Entitled QA account (required for Sections 1–5)

Lumen cannot sign off account, full report navigation, Reflect, or Living Blueprint without a **dedicated production test account** with an active full-report entitlement.

| Item | Detail |
|------|--------|
| Provide | Email + password shared out-of-band (1Password / Vercel note — **never commit credentials**) |
| Profile | Birth date **1982-02-03** recommended (matches canonical signature) |
| Entitlement | Active purchase or ops-granted entitlement for that signature |
| After fixes | Re-run full plan from Section 1 |

---

## Session log (fill on completion)

```text
Date:
Tester: Lumen
Environment: production https://www.1320soulcode.com
Commit / deploy:
Birth dates tested: 1982-02-03, (optional 1980-05-22)

Section 0 — Automated regression: PASS / FAIL / SKIPPED (CI green)
Section 1 — Sign-in & sign-up: PASS / FAIL / NOT RUN
Section 2 — Account hub layout: PASS / FAIL / NOT RUN
Section 3 — Entitled full report navigation: PASS / FAIL / NOT RUN
Section 4 — Reflect from account: PASS / FAIL / NOT RUN
Section 5 — Living Blueprint access: PASS / FAIL / NOT RUN
Section 6 — Free report → checkout CTAs: PASS / FAIL / NOT RUN
Section 7 — Ethical language spot check: PASS / FAIL / NOT RUN

Overall: QA PASS / PASS WITH MINOR NOTES / FAIL
Blockers:
Notes:
```

---

## Section 0 — Automated regression (Nova — run first)

From `web/`:

| # | Command | Purpose | Result |
|---|---------|---------|--------|
| 0.1 | `npm run build` | Production compile | |
| 0.2 | `npm run smoke:report-canonical` | Canonical payload | |
| 0.3 | `npm run smoke:full-report-v2-sample` | Sample report payload | |
| 0.4 | `npm run smoke:result-1977` | Free report regression | |
| 0.5 | `npm run qa:baseline` | Core route baseline | |

**Pass criteria:** All green before manual QA.

---

## Section 1 — Sign-in & sign-up

**URLs:** `/login` · `/signup` · `/account`

| ID | Scenario | Steps | Pass criteria | Result |
|----|----------|-------|---------------|--------|
| 1.1 | Happy-path login | `/login` → enter valid email + password → submit | Lands on `/account` (or `?next=` target); no “Could not sign in” | |
| 1.2 | Wrong password | Valid email, bad password | Clear error; **not** “Sign-in is temporarily unavailable” | |
| 1.3 | Pool / infra resilience | Repeat login 3× in 30s (refresh between) | All succeed or show credential error only — **never** 503 “temporarily unavailable” | |
| 1.4 | Protected route | Visit `/account` logged out | Redirects to `/login?next=/account` | |
| 1.5 | Sign-up new user | `/signup` with new email + password + birth date | Account created; can sign in on second visit | |
| 1.6 | Sign-out | Account → Sign out | Session cleared; `/account` redirects to login | |

**Fail examples:** `Sign-in is temporarily unavailable` on valid credentials · infinite spinner · login succeeds but account shows wrong email.

---

## Section 2 — Account hub layout & password

**URL:** `/account` (signed in, entitled user preferred)

| ID | Area | Steps | Pass criteria | Result |
|----|------|-------|---------------|--------|
| 2.1 | Hero quick links | Scan top of account page | Shows **Open Full Report** and **Open Living Blueprint** when entitled; Reflect quick link scrolls to Reflect section | |
| 2.2 | Section order | Scroll full page | Order is: **Profile → Codes (if any) → Full Report → Living Blueprint → Reflect with Wisewave → Booking** | |
| 2.3 | Profile prefill | Profile card | Birth date and email match account; no empty required identity fields | |
| 2.4 | Set password (new) | User without password → **Set password** | Form saves; collapses or confirms success; can log out and log back in with password | |
| 2.5 | Change password (existing) | User with password → change flow | Updates successfully; old password rejected after change | |
| 2.6 | Locked state | Sign in as user **without** full report entitlement | Full Report + Living Blueprint show unlock CTA → `/checkout`; Reflect still visible if birth date present | |

---

## Section 3 — Entitled full report navigation (desktop)

**URL:** `/my-report/[reportId]` from account **Open Full Report**

| ID | Check | Steps | Pass criteria | Result |
|----|-------|-------|---------------|--------|
| 3.1 | First-open layout guide | Open report fresh session (private tab) | Semi-transparent overlay shows zones: top menu, left prev, right next, close; **Got it** dismisses | |
| 3.2 | Guide persistence | Dismiss guide → navigate pages → refresh | Guide does **not** reappear same session; may reappear new private tab | |
| 3.3 | Next page — overlay | Click **right 28%** over pillar/content (not empty margin only) | Advances to next page every time | |
| 3.4 | Previous page — overlay | Click **left 28%** over content | Goes to previous page | |
| 3.5 | Cursor tag | Move mouse over left/right zones | Tag follows cursor (“← Previous page” / “Next page →”) | |
| 3.6 | Keyboard | Arrow Right / Left (or Page Down / Up) | Page turns; focus not trapped | |
| 3.7 | Page menu | Hover top edge → nav dock | Section jump works; current page highlighted | |
| 3.8 | Close control | Click **×** top-right | Returns to **`/account`** | |
| 3.9 | Content integrity | Walk cover → disclaimer (all 19 pages) | No placeholders; codes match birth date; ethical copy per `LUMEN_QA_PROTOCOL_v1.md` | |
| 3.10 | Mobile smoke | Repeat 3.3–3.4 on phone @ 390×844 | Tap left/right edges turns pages; close returns to account | |

**Fail examples:** Must click empty space to turn page · pillars block next · close goes nowhere · layout guide blocks all interaction after dismiss.

---

## Section 4 — Reflect with Wisewave (from account)

**URL:** `/account` → **Reflect with Wisewave** section

| ID | Check | Steps | Pass criteria | Result |
|----|-------|-------|---------------|--------|
| 4.1 | Prefill | Open Reflect section | Name, email, birth date **pre-filled** from account; user does **not** re-enter them | |
| 4.2 | Required field | Leave only “What brings you here today?” empty → submit | Validation on that field only | |
| 4.3 | Happy path | Enter short intention → start session | Reaches `/reflect/[sessionId]`; opening message appears (via auto-send or first turn) | |
| 4.4 | No false errors | Submit with prefill intact | **No** “email and birthDate are required” · **No** generic “Please complete all required fields” timeout | |
| 4.5 | Chat continuity | Send one follow-up message | Response returns (LLM or rule-based); no hard crash | |
| 4.6 | Ethical tone | Read first 2 assistant turns | Reflective mirror language; no fate/diagnosis/financial advice (`LUMEN_QA_PROTOCOL_v1.md` §9–10) | |

**Note:** If `OPENAI_API_KEY` unset on production, rule-based responses are acceptable — fail only on errors/timeouts, not on non-LLM prose.

---

## Section 5 — Living Blueprint (account entry)

| ID | Check | Steps | Pass criteria | Result |
|----|-------|-------|---------------|--------|
| 5.1 | Account CTA | Account → **Open Living Blueprint** | Opens `/living-blueprint/[reportId]` for entitled user | |
| 5.2 | Membership panel | Living Blueprint page | Profile/status prefilled where spec expects | |
| 5.3 | Return path | Link back to full report or account | No 404; coherent navigation | |
| 5.4 | Locked user | Non-entitled account | Living Blueprint section shows checkout unlock CTA | |

---

## Section 6 — Free report → checkout CTAs

**URL:** `/result?year=1982&month=2&day=3`

| ID | Check | Steps | Pass criteria | Result |
|----|-------|-------|---------------|--------|
| 6.1 | Code strip | Load result | **S1-20 / S3-01 / S2-05 / S0-05** (1982-02-03 baseline) | |
| 6.2 | No QA preview block | Scroll full page | **No** “Full Report Previews” dev/QA block | |
| 6.3 | View Full Report CTA | Click **VIEW FULL REPORT** (or equivalent) | Navigates to **`/checkout`** (not dead link) | |
| 6.4 | Checkout birth context | On checkout | Birth date preserved (display or hidden field) | |

---

## Section 7 — Ethical language spot check

Sample surfaces: full report **closing + disclaimer** · Reflect opening turn · account Reflect intro copy.

| # | Must present | Must NOT present |
|---|--------------|------------------|
| 7.1 | Reflective / symbolic framing | Deterministic fate language |
| 7.2 | Inner authority, self-responsibility | Diagnostic / therapeutic claims |
| 7.3 | Mirror-not-cage tone on disclaimers | Financial / legal / medical advice |
| 7.4 | Customer-facing copy only | `{{placeholders}}`, `undefined`, internal QA strings |

Reference: `LUMEN_QA_PROTOCOL_v1.md` §9–13.

---

## End-to-end happy path (production)

Run once on **desktop** + once on **mobile**:

| Step | Action | Pass |
|------|--------|------|
| 1 | `/login` → sign in as entitled test user | → `/account` |
| 2 | Confirm section order (Reflect under Living Blueprint) | Layout matches §2.2 |
| 3 | **Open Full Report** | Report opens; dismiss layout guide |
| 4 | Click next through 3 pages over pillar areas | Pages turn without hunting empty space |
| 5 | **×** close | → `/account` |
| 6 | **Reflect with Wisewave** → start with one line intention | Chat loads; no required-field false error |
| 7 | **Open Living Blueprint** | Dashboard loads for same report |
| 8 | Sign out | Session cleared |

---

## Severity & sign-off

| Level | Examples | Result |
|-------|----------|--------|
| **Critical** | Login 503 for valid users · entitled report 403 · Reflect blocked by false validation · fate/diagnosis in delivered copy | **FAIL** |
| **Major** | Page-turn only works in margins · close button wrong destination · Reflect timeout · wrong codes on 1982-02-03 | **FAIL** |
| **Minor** | Layout guide copy typo · cursor tag offset · spacing on account cards | **PASS WITH MINOR NOTES** |

### Lumen output template

```text
QA STATUS: [PASS | PASS WITH MINOR NOTES | FAIL]
SCOPE: Platform auth, account hub, full report navigation, Reflect
ENVIRONMENT: production https://www.1320soulcode.com
DATE REVIEWED:
DEPLOY:

SUMMARY:
AUTH QA: Pass / Fail / Notes
ACCOUNT QA: Pass / Fail / Notes
FULL REPORT NAV QA: Pass / Fail / Notes
REFLECT QA: Pass / Fail / Notes
LIVING BLUEPRINT QA: Pass / Fail / Notes
FREE REPORT CTA QA: Pass / Fail / Notes
ETHICAL LANGUAGE QA: Pass / Fail / Notes

ISSUES FOUND:
1.
2.

REQUIRED CORRECTIONS:
1.
2.

FINAL DECISION: Ship / Hold
```

---

## Canonical reference data

### 1982-02-03 (primary)

| Field | Expected |
|-------|----------|
| Signature | `S1-20\|S3-01\|S2-05\|S0-05` |
| Free result URL | `/result?year=1982&month=2&day=3` |

### 1980-05-22 (regression)

| Field | Expected |
|-------|----------|
| S3 code | **S3-03** (not S3-110) |
| S0 code | **S0-07** (not S0-27) |
| Signature | `S1-18\|S3-03\|S2-27\|S0-07` |

---

## Related docs

- `docs/specs/phase-2/DEPLOY_REMINDERS.md` — env vars (Postgres pool, OpenAI, Wisewave)
- `docs/specs/full-report/LUMEN_QA_FULL_REPORT_V2_WEB_MOBILE.md` — chunked visual report QA
- `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md` — release gate checklist
- `QA_WISEWAVE_ABC_LUMEN.md` — prior Wisewave phases (still applies to `/result`)
