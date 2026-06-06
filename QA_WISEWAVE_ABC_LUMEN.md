# Lumen QA Plan — Wisewave Phases A · B · C

**Product:** 1320 Soul Origin Code  
**Scope:** Post-Wisewave refinement (data accuracy, conversion polish, report depth)  
**Build:** commit `1be54d6` and later on `master`  
**Audience:** Lumen (manual QA)  
**Last updated:** 2026-06-02

**Prerequisite:** Prior birth-date funnel sign-off in `QA_BIRTHDATE_LUMEN.md` still applies. This plan adds **what changed** in Phases A–C and what must be re-checked on **production** after deploy.

---

## Prerequisites

| Item | Detail |
|------|--------|
| Environment | **Production** `https://www.thesoulprofile.com` (primary) · optional local `npm run dev` |
| Browsers | Safari + Chrome on phone; one desktop browser |
| Prep | Hard refresh or private tab between major runs |
| Automated (dev/CI) | See [Automated gate](#automated-gate) below |

**Out of scope:** Payment/checkout, login, PDF download, SAVE/EMAIL report actions (UI only).

---

## Automated gate

CI and pre-release should pass:

```bash
npm run qa:baseline
npm run smoke:content
npm run smoke:canonical
npm run smoke:result-1977
npm run build
```

Optional: `npm run smoke:funnel` · `npm run lint`

Lumen does **not** need to run these if CI is green — use them only to dispute a failure or test locally.

---

## Canonical test URLs (source of truth)

### Case W1 — Wisewave sample (`1977-11-12`)

Direct URL:

```
/result?year=1977&month=11&day=12
```

| Check | Expected |
|-------|----------|
| Code strip | **S1-24 / S3-04 / S2-23 / S0-09** |
| S3 label | **S3-04** · Awakener — **not** `S3-132` |
| Combination signature (debug) | `S1-24\|S3-04\|S2-23\|S0-09` |
| Integrated summary | Mentions **Radiant Soul** / **Overgiving** — **not** generic *"learns through depth, reflection, and conscious transformation"* |
| S1–S4 module reflections (full sample only) | **Four different** questions across segments |

### Case A — Steward sample (`1980-05-22`)

```
/result?year=1980&month=5&day=22
```

| Check | Expected |
|-------|----------|
| Code strip | **S1-18 / S3-03 / S2-27 / S0-07** |
| S3 | Tier code **S3-03** (raw 110) — **not** `S3-110` in header |
| S2 title | **The Soul Shock Mirror** (master EN) |
| S0 title | **Self-Worth Illusion** (not Warrior) |

### Case N — Sample report (fixed fiction)

`/sample-report` — always fictional **1980-05-22** full report; codes match Case A display format.

---

## Phase A — Data accuracy & personalization

Run on **Case W1** and **Case A** (desktop + one mobile browser).

| ID | Area | Steps | Pass criteria |
|----|------|-------|---------------|
| A1 | S3 display | Open Case W1 `/result` | Header + each module show **S3-04**, never raw `132` |
| A2 | Integrated blueprint | Scroll integrated summary card on `/result` | Personalized prose; no generic fallback paragraph |
| A3 | Segment reflections | `/sample-report` (full mode) — S1, S3, S2, S0 modules | Each module has its **own** reflection question |
| A4 | Bullet lists | `/sample-report` — S1 module | Soul Traits / Core Gifts / Shadow Pattern render as **bullets**, not one run-on paragraph |
| A5 | S3 raw metadata | `/sample-report` — S3 module | Shows tier code **S3-03**; Raw Value field shows `110` in full mode |
| A6 | Debug panel (optional) | Set `NEXT_PUBLIC_REPORT_DEBUG=true` locally | Panel shows resolved keys, combination signature, no silent shadow fallback |
| A7 | Stale regression | Mobile: Case W1 → Case A → Case W1 | All four segments + integrated summary update (no stuck prior birthday) |

**Fail examples:** `S3-132` in UI · same reflection question × 4 · generic integrated template · traits as one block of text.

---

## Phase B — Conversion & UX polish

| ID | Page | Steps | Pass criteria |
|----|------|-------|---------------|
| B1 | `/` homepage | Hero first screen | **One** gold primary CTA (**Generate My Code**); no competing gold button in hero |
| B2 | `/` homepage | Below entry panel | Secondary text links (Blueprint, Sample Report) — lower visual weight |
| B3 | `/` homepage | Full Report preview section | **No** gold waitlist button; text links only for waitlist / reading |
| B4 | Nav (all pages) | Top bar | **Home · About 1320 · Your Code · Sample Report · Full Report · Reading** |
| B5 | Nav | Footer | **Blueprint** still in footer (not required in top nav) |
| B6 | `/` or `/your-code` | Birth form | Labels **Month / Day / Year** (MM / DD / YYYY grid); submit works |
| B7 | `/result` | Header actions | Email / Download / Save are **quiet** utilities; not competing with main CTA |
| B8 | `/result` | Before final CTA | **Full Report upsell** block visible |
| B9 | `/result` | Bottom CTA | Gold **Unlock My Full Blueprint**; outline **Book a 1320 Reading** |
| B10 | `/full-report` | Hero | Doorway/map copy (*free code = doorway, full report = map*) |
| B11 | `/full-report` | Hero CTA | **Unlock My Full Blueprint** (scrolls to waitlist) |

**Mobile:** B1, B6, B7, B8 — no horizontal scroll; hamburger opens nav.

---

## Phase C — Report depth & Full Report symbols

| ID | Page | Steps | Pass criteria |
|----|------|-------|---------------|
| C1 | `/sample-report` | S2 module (full) | Field **Relationship Trigger Pattern** with insight-style sentence (not empty) |
| C2 | `/sample-report` | S0 module (full) | Field **Core Illusion Mechanism** (replaces old “Void Challenge” label) |
| C3 | `/sample-report` | Integrated card | Full mode shows labeled sections (Core Essence, Energy Expression, etc.) |
| C4 | `/full-report` | Advanced Modules | **S5** and **S6** cards show gold **symbol** above code label (compass+flame / wave+circle) |
| C5 | `/full-report` | Advanced Modules | Shadow card has symbol; S6 disclaimer still visible |
| C6 | `/full-report` | Tone | No financial-advice language beyond self-awareness disclaimer |

**Case W1 spot-check (optional full depth):** S2-23 trigger mentions **gives more**; S0-09 mechanism mentions **judged**.

---

## End-to-end funnel (production)

One happy path on **mobile Safari** + **desktop**:

| Step | Action | Pass |
|------|--------|------|
| 1 | `/` → enter `1977-11-12` → Generate | → `/generating` → `/result` |
| 2 | Verify code strip | S1-24 / S3-04 / S2-23 / S0-09 |
| 3 | Tap **Unlock My Full Blueprint** | → `/full-report` (or waitlist anchor) |
| 4 | Open **Sample Report** from nav | Full dashboard loads; Case A fiction |
| 5 | Footer legal links | `/privacy`, `/terms`, `/disclaimer` — no 404 |

---

## Sign-off record (fill in)

```
Lumen QA — Wisewave Phases A · B · C
Date: ___________
Environment: production https://www.thesoulprofile.com
Tester: Lumen
Commit / deploy: ___________

Phase A (A1–A7):  PASS / FAIL — notes: ___________
Phase B (B1–B11): PASS / FAIL — notes: ___________
Phase C (C1–C6):  PASS / FAIL — notes: ___________
Funnel E2E:       PASS / FAIL — notes: ___________

Overall: PASS / FAIL
Blockers: ___________
```

---

## Pass bar

- **Case W1** and **Case A** code display correct (tier S3 codes, not raw).  
- No generic integrated summary on W1.  
- Phase B conversion hierarchy clear on homepage + result.  
- Phase C depth fields on `/sample-report`; symbols on `/full-report`.  
- Real phone Safari + Chrome on production (not only desktop).  
- No regressions from `QA_BIRTHDATE_LUMEN.md` matrix (spot-check A + W1 + stale regression A7).

---

## Related docs

- `QA_BIRTHDATE_LUMEN.md` — birth-date matrix & prior sign-off  
- `CONTENT_CANONICAL_RULES.md` — naming (Integrated Soul Blueprint vs Shadow Patterns)  
- `README.md` — smoke commands  
- `.github/workflows/ci.yml` — automated CI gate
