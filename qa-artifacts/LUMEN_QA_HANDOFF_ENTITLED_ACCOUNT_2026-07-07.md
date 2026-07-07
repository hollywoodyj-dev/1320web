# Lumen QA Handoff — Entitled Account & Re-test (2026-07-07)

**From:** Holly / Nova  
**To:** Lumen  
**Environment:** Production — https://www.1320soulcode.com  
**Deploy to test:** `cb150de` or later (`master`)  
**Full plan:** `docs/specs/phase-2/LUMEN_QA_PLATFORM_AUTH_ACCOUNT_REPORT.md`  
**Prior report:** `qa-artifacts/1320-platform-auth-account-report-qa-2026-07-07.md` (FAIL / Hold)

---

## What changed since your last run

| Blocker you reported | Status |
|----------------------|--------|
| `qa:baseline` — free modules not locked | **Fixed** — free `/result` modules lock with teaser |
| `/result` exposed full paid fields | **Fixed** — only overview essence + locked teaser per segment |
| `/result` → `/checkout` lost birth date | **Fixed** — cookie on result load + checkout links carry `?year=&month=&day=` |
| `Money Frequency` / `Karmic Loop` on public result | **Fixed** — **Value & Receiving**; **Repeating Mirror Pattern** |
| Entitled account / report / Reflect not tested | **Unblocked** — credentials below (out-of-band password) |

Please re-run from the top of the plan after deploy is live (~2 minutes post-push).

---

## Entitled production QA account

**Do not commit or paste the password into git, Slack logs, or QA artifacts.**

| Field | Value |
|-------|--------|
| **Email** | `hollywoodyj@gmail.com` |
| **Password** | _Provided separately by Holly (1Password / secure message)_ |
| **Birth date** | **1982-02-03** |
| **Expected free signature** | `S1-20 / S3-01 / S2-05 / S0-05` |
| **Entitlement** | Full Report unlocked for this signature |

If login fails or account shows no entitlement, stop and ping Holly — do not create a new production account without approval.

**First-time password:** If the account has no password yet, sign in is not possible until Holly sets one via **Account → Set password** (or completes checkout once). Confirm with Holly before attempting signup with the same email.

---

## Re-test order (do in this sequence)

### Pass 1 — Automated (5 min)

From local `web/` on `master` at `cb150de+`:

```bash
npm run build
npm run smoke:report-canonical
npm run smoke:full-report-v2-sample
npm run smoke:result-1977
npm run qa:baseline
```

**Expect:** all PASS (especially `qa:baseline` free-layer locked).

---

### Pass 2 — Free result fixes (10 min)

Private tab, **logged out**.

1. Open `/result?year=1982&month=2&day=3`
2. Confirm signature `S1-20 / S3-01 / S2-05 / S0-05`
3. Confirm segment cards show **locked teaser** — not full fields (no Soul Traits list, no Karmic Loop, no One-Week Practice, etc.)
4. Confirm upsell says **Value & Receiving** — not Money Frequency
5. Click **VIEW FULL REPORT** or **UNLOCK MY FULL BLUEPRINT**
6. On `/checkout`, confirm **year / month / day** are prefilled **1982 / 2 / 3** (or cookie present: `1320-birth-date`)

Repeat spot-check on `/result?year=1980&month=5&day=22` — signature only; same free-layer behavior.

---

### Pass 3 — Auth (10 min)

Private tab.

| Step | Action | Expect |
|------|--------|--------|
| 3.1 | `/account` logged out | Redirect → `/login?next=/account` |
| 3.2 | Bad password | `Invalid email or password.` — not temporarily unavailable |
| 3.3 | Good login (credentials above) | → `/account` |
| 3.4 | Sign out | Session cleared |
| 3.5 | Login 3× in 30s | No 503 / pool errors |

---

### Pass 4 — Account hub (5 min)

Signed in as entitled user.

1. Section order: **Profile → Codes (if any) → Full Report → Living Blueprint → Reflect → Booking**
2. **Reflect** is **under** Living Blueprint
3. Set/change password flow works if testing password UI

---

### Pass 5 — Full report navigation (15 min)

From account → **OPEN FULL REPORT**.

| Check | Expect |
|-------|--------|
| Layout guide on first open | Dismiss with **Got it** |
| Click right side over pillar/content | Next page (no need for empty margin) |
| Click left side | Previous page |
| **×** top-right | Returns to **`/account`** |
| Page menu (hover top) | Section jump works |

Optional: repeat left/right tap on mobile @ 390×844.

---

### Pass 6 — Reflect & Living Blueprint (10 min)

Signed in, birth date on profile.

1. **Reflect with Wisewave** — name/email/birth prefilled; only intention required
2. Start session → chat loads; no `email and birthDate are required` false error
3. **Open Living Blueprint** → dashboard loads for entitled report

---

## Quick sign-off block (paste into your report)

```text
Lumen re-test — Platform auth / account / report
Date:
Deploy commit:
Entitled account used: hollywoodyj@gmail.com (yes/no)

Pass 1 Automated: PASS / FAIL
Pass 2 Free result + checkout birth: PASS / FAIL
Pass 3 Auth: PASS / FAIL
Pass 4 Account layout: PASS / FAIL
Pass 5 Full report navigation: PASS / FAIL
Pass 6 Reflect + Living Blueprint: PASS / FAIL

Overall: QA PASS / PASS WITH NOTES / FAIL / HOLD
Blockers:
```

---

## If something still fails

| Symptom | Likely cause | Escalate with |
|---------|----------------|---------------|
| Checkout birth empty | Deploy not live or cookie blocked | Screenshot + checkout URL |
| Modules still unlocked | Old deploy / cache | Hard refresh + deploy id |
| Login 503 | Postgres pool | Time + screenshot |
| Reflect validation error | Profile missing birth date | Account profile screenshot |
| No entitlement on account | Purchase not linked | Email + report id if shown |

---

## References

- QA plan: `docs/specs/phase-2/LUMEN_QA_PLATFORM_AUTH_ACCOUNT_REPORT.md`
- Ethical language: `docs/specs/full-report/LUMEN_QA_PROTOCOL_v1.md` §9–13
- Free funnel baseline: `QA_BIRTHDATE_LUMEN.md`
