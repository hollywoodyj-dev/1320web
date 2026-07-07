# Lumen QA Plan — Reflect with Wisewave (Account Birth Prefill)

**Product:** 1320 Soul Origin Code — Reflect / Wisewave  
**Environment:** Production `https://www.1320soulcode.com`  
**Deploy baseline:** `3f850c9` and later on `master`  
**Audience:** Lumen  
**Last updated:** 2026-07-07

**Pair with:** `qa-artifacts/LUMEN_QA_HANDOFF_ENTITLED_ACCOUNT_2026-07-07.md` (credentials) · `LUMEN_QA_PROTOCOL_v1.md` §9–13 (ethical language)

---

## Primary test links (account birth prefill)

Use the **entitled QA account** (`hollywoodyj@gmail.com`, birth **1982-02-03**). Password is provided out-of-band — never commit it.

| Purpose | URL |
|---------|-----|
| **Recommended start** — sign in, then land on Reflect on account | https://www.1320soulcode.com/login?next=/account%23reflect |
| **Direct** (must already be signed in) | https://www.1320soulcode.com/account#reflect |
| **Alternate entry** — standalone Reflect page with same account prefill | https://www.1320soulcode.com/login?next=/reflect |
| **Standalone Reflect** (signed in) | https://www.1320soulcode.com/reflect |

**Anchor note:** `#reflect` scrolls to the **Reflect with Wisewave** section (below Living Blueprint on the account page).

**Expected profile on account Reflect:**

| Field | Expected (QA account) |
|-------|------------------------|
| Name | `jing` or email local-part |
| Email | `hollywoodyj@gmail.com` |
| Birth date | `1982-02-03` |
| Soul codes in chat header | `S1-20` · `S3-01` · `S2-05` · `S0-05` |

---

## Prerequisites

| Item | Detail |
|------|--------|
| Account | Entitled QA account with birth date saved on profile |
| Browser | Private tab for first run; hard refresh between major scenarios |
| Network | Production only (not local) unless disputing a failure |
| LLM | Responses may be rule-based or OpenAI-backed — pass on **no errors/timeouts**, not on exact prose |

---

## Session log

```text
Date:
Tester: Lumen
Deploy:
Account used: hollywoodyj@gmail.com (yes/no)

R1 Account Reflect prefill: PASS / FAIL
R2 Opening message required only: PASS / FAIL
R3 Session start + auto-send: PASS / FAIL
R4 First Wisewave response: PASS / FAIL
R5 Follow-up via Send button: PASS / FAIL
R6 Follow-up via Enter key: PASS / FAIL
R7 Ethical tone spot check: PASS / FAIL
R8 Standalone /reflect account prefill: PASS / FAIL
R9 Guest /reflect (logged out): PASS / FAIL / SKIPPED
R10 Error handling: PASS / FAIL / SKIPPED

Overall: QA PASS / PASS WITH NOTES / FAIL
Notes:
```

---

## Test cases

### R1 — Account Reflect section shows saved birth profile

| Step | Action |
|------|--------|
| 1 | Open https://www.1320soulcode.com/login?next=/account%23reflect |
| 2 | Sign in with QA credentials |
| 3 | Confirm page scrolls to or shows **Reflect with Wisewave** section |

**Pass criteria:**

- [ ] Name, email, and birth date are **shown** (read-only summary) — user does **not** re-type them
- [ ] Only **“What brings you here today?”** is an empty required input
- [ ] Section appears **under** Living Blueprint on account page
- [ ] No `email and birthDate are required` error visible on load

---

### R2 — Validation: opening message only

| Step | Action |
|------|--------|
| 1 | On account Reflect, leave intention empty |
| 2 | Click **BEGIN REFLECTION** |

**Pass criteria:**

- [ ] Shows `Please share what brings you here today.` (or equivalent opening-required message)
- [ ] Does **not** navigate away from account

| Step | Action |
|------|--------|
| 3 | Enter a short intention (e.g. `I want clarity on a recurring relationship pattern.`) |
| 4 | Submit |

**Pass criteria:**

- [ ] Navigates to `/reflect/[sessionId]?token=...&send=...`
- [ ] No generic `Please complete all required fields.` timeout error

---

### R3 — Session URL and auto-send opening message

| Step | Action |
|------|--------|
| 1 | After R2 submit, observe chat page load |

**Pass criteria:**

- [ ] URL contains `sessionId`, `token`, and `send=` query params
- [ ] Hero greets client by name (e.g. `Hello, jing`)
- [ ] Opening user message appears in transcript (auto-sent from `send=` param)
- [ ] Wisewave reply appears within reasonable time (no infinite spinner)

---

### R4 — Code strip matches account birth

On the chat page header:

**Pass criteria:**

- [ ] Codes show `S1-20` · `S3-01` · `S2-05` · `S0-05`
- [ ] Expression state label present (any valid value)
- [ ] No `undefined` / `null` / placeholder leaks in UI

---

### R5 — Follow-up message (Send button)

| Step | Action |
|------|--------|
| 1 | Type a short follow-up in the text box |
| 2 | Click **Send** |

**Pass criteria:**

- [ ] User message appears in transcript
- [ ] Second Wisewave response returns
- [ ] No hard error banner

---

### R6 — Follow-up message (Enter key) — `3f850c9+`

| Step | Action |
|------|--------|
| 1 | Type another follow-up |
| 2 | Press **Enter** (not Shift+Enter) |

**Pass criteria:**

- [ ] Message submits same as clicking Send
- [ ] Wisewave responds

| Step | Action |
|------|--------|
| 3 | Type text with **Shift+Enter** |

**Pass criteria:**

- [ ] Inserts newline — does **not** submit prematurely

---

### R7 — Ethical language spot check (Gate 2)

Read the first two Wisewave assistant turns.

**Must present:**

- [ ] Reflective / symbolic framing
- [ ] Invitational questions or observations
- [ ] User agency preserved

**Must NOT present:**

- [ ] Deterministic fate (`you will`, `destined`, `meant to be`)
- [ ] Diagnosis or therapy claims
- [ ] Financial / legal / medical advice
- [ ] Internal QA strings or placeholders

Reference: `LUMEN_QA_PROTOCOL_v1.md` §9–10.

---

### R8 — Standalone `/reflect` with account prefill

| Step | Action |
|------|--------|
| 1 | While signed in, open https://www.1320soulcode.com/reflect |
| 2 | Start a new session with a different intention |

**Pass criteria:**

- [ ] Lead copy: profile details already saved
- [ ] Same name / email / birth prefill as account
- [ ] Session starts successfully (same as R2–R5)

---

### R9 — Guest Reflect (logged out) — optional regression

| Step | Action |
|------|--------|
| 1 | Sign out |
| 2 | Open https://www.1320soulcode.com/reflect |
| 3 | Enter name, email, birth `1982-02-03`, and intention |
| 4 | Submit |

**Pass criteria:**

- [ ] All four fields required when logged out
- [ ] Session starts; codes match `1982-02-03` signature
- [ ] No account-only false errors

---

### R10 — Error handling — optional

| Scenario | Steps | Expect |
|----------|-------|--------|
| Invalid session link | Open `/reflect/fake-id` without token | Friendly invalid / 404 — not stack trace |
| Missing token | `/reflect/[valid-id]` without `?token=` | “Reflection unavailable” + link to start reflect |
| Expired token | Reuse very old session URL if available | Graceful error, can start new session from `/reflect` |

---

## Quick happy path (5 min smoke)

1. https://www.1320soulcode.com/login?next=/account%23reflect → sign in  
2. Confirm birth `1982-02-03` prefilled on Reflect section  
3. Enter intention → **BEGIN REFLECTION**  
4. Confirm codes + first Wisewave reply  
5. Send follow-up with **Enter**  
6. Spot-check tone (R7)

---

## Fail examples → severity

| Symptom | Severity |
|---------|----------|
| `email and birthDate are required` with account prefill | **Critical — FAIL** |
| Session never loads / endless spinner | **Critical — FAIL** |
| Wrong codes for 1982-02-03 | **Major — FAIL** |
| Enter does not submit (`3f850c9+`) | **Minor — PASS WITH NOTES** |
| Prose is rule-based not LLM | **Not a fail** |

---

## Lumen sign-off template

```text
Reflect QA — Account birth prefill
Date:
Deploy:
Account: hollywoodyj@gmail.com

Entry link used: login?next=/account#reflect / other
Birth prefill verified: yes/no
Session start: PASS / FAIL
Chat follow-up (Send + Enter): PASS / FAIL
Ethical language: PASS / FAIL

Overall: QA PASS / PASS WITH NOTES / FAIL
Notes:
```

---

## Related docs

- `qa-artifacts/LUMEN_QA_HANDOFF_ENTITLED_ACCOUNT_2026-07-07.md`
- `docs/specs/phase-2/LUMEN_QA_PLATFORM_AUTH_ACCOUNT_REPORT.md` (Pass 6)
- `qa-artifacts/1320-platform-auth-account-report-retest-2026-07-07.md`
