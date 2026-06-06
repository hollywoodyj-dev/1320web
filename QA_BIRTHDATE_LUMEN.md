# Lumen QA Plan — Birth Date & Result Content

**Product:** 1320 Soul Origin Code — Phase 1 MVP  
**Focus:** Verify that **different birth dates produce different codes** and that **result content matches the displayed code** (no stale/cached segments).  
**Audience:** Lumen (manual QA)  
**Last updated:** 2026-05-30

---

## Prerequisites

| Item | Detail |
|------|--------|
| Environment | Local `npm run dev` **or** staging/production URL |
| Mobile (required) | Same Wi‑Fi URL (e.g. `http://172.16.0.21:3000`) — retest after `allowedDevOrigins` in `next.config.ts` |
| Desktop (required) | `http://localhost:3000` |
| Browser | Safari **and** Chrome on phone; one desktop browser |
| Prep | Hard refresh or private tab between major test runs |
| Automated smoke (dev) | `npm run smoke:content` · `npm run smoke:funnel` |

**Out of scope for this plan:** `/blueprint` education page (same for everyone). **`/sample-report`** is fixed to fictional `1980-05-22` only.

---

## How codes are calculated (reference)

| Segment | Rule |
|---------|------|
| **S1** | Sum of digits in birth **year** |
| **S3** | **Month × day** (raw number, not reduced) |
| **S2** | **Month + day** |
| **S0** | Sum of digits in `YYYYMMDD`, then **mod 20** |

Same birth date → **always** same code. Different dates → usually different code (rare collisions possible).

---

## Test matrix — expected codes

Use these as the source of truth when checking the **code strip** on `/result` and each segment label (`S1-xx`, `S3-xx`, etc.).

| ID | Birth date (Y-M-D) | Expected code | S0 title (EN, spot-check) |
|----|-------------------|---------------|---------------------------|
| **A** | `1980-05-22` | **S1-18 / S3-110 / S2-27 / S0-07** | The Illusion of Self-Worth |
| **B** | `1982-02-03` | **S1-20 / S3-6 / S2-5 / S0-05** | The Emotional Illusion |
| **C** | `1990-03-15` | **S1-19 / S3-45 / S2-18 / S0-08** | *(generic or segment-specific EN)* |
| **D** | `2000-01-01` | **S1-2 / S3-1 / S2-2 / S0-04** | *(verify not empty)* |
| **E** | `2000-02-29` | **S1-2 / S3-58 / S2-31 / S0-15** | Leap day — must be accepted (S0: digit sum of `20000229` = 15, mod 20 = **15**) |
| **F** | `1975-12-31` | **S1-22 / S3-372 / S2-43 / S0-09** | High S3 raw value |

**Canonical pass:** Case **A** must match steward sample exactly (same as `npm run smoke:content`).

**Verify codes in dev (optional):**

```bash
npx tsx -e "import { calculate1320Code } from './lib/calculate1320Code.ts'; console.log(calculate1320Code(2000,2,29).codeString);"
```

---

## Lumen sign-off — **PASS** (2026-05-31)

**Environment:** `http://127.0.0.1:3000` (desktop) + real-device Safari & Chrome  
**Verdict:** Sign-off ready for Phase 1 local MVP.

| Area | Status |
|------|--------|
| Cases **A–F** (birth-date matrix) | ✅ Pass — Case **E** = S1-2 / S3-58 / S2-31 / **S0-15** |
| Stale-content regression B→A→C→A | ✅ Pass |
| Validation **V1–V5**, **V7** | ✅ Pass |
| **V6** (combined `1980/05/22` in one field) | N/A — UI uses three fields only |
| Negative routes **N1–N3** | ✅ Pass |
| Desktop local | ✅ Pass |
| Real-device Safari | ✅ Pass |
| Real-device Chrome | ✅ Pass |
| `/generating` (animation, redirect, no errors) | ✅ Pass |

**Signed off by:** Lumen · **Date:** 2026-05-31

---

## Core funnel — per test case (A–F)

For **each** birth date in the matrix, on **mobile + desktop**:

| Step | Action | Pass criteria |
|------|--------|----------------|
| 1 | Open `/` or `/your-code` | Page loads |
| 2 | Enter **Year / Month / Day** (also try `05` vs `5` for month/day on one case) | Accepts input |
| 3 | Tap **GENERATE MY CODE** | Navigates to `/generating?year=…&month=…&day=…` |
| 4 | Wait on generating (~6 s) | Auto-redirect to `/result?year=…&month=…&day=…` (or tap **VIEW MY RESULT**) |
| 5 | Check top **code strip** | Matches matrix row exactly |
| 6 | Scroll **Your Four-Part Blueprint** (4 overview cards) | Four codes match; titles/essence **differ from other test rows** where codes differ |
| 7 | Scroll **Your Segment Blueprint** (S1, S3, S2, S0 modules) | Each module code label matches; **body text matches that code** (not previous test) |
| 8 | Note URL | Contains `year`, `month`, `day` query params |

**Record:** Pass / Fail + screenshot if Fail + browser + URL.

---

## Regression — “stale S0” / cache (critical)

This targeted flow reproduces the bug fixed 2026-05-30. Run on **mobile Safari**.

| Step | Action | Pass criteria |
|------|--------|----------------|
| 1 | Run test case **B** (`1982-02-03`) full funnel → `/result` | S0 shows **S0-05** + Emotional Illusion copy (not 07) |
| 2 | Without closing browser, run test case **A** (`1980-05-22`) full funnel again | **All four** modules update; S0 = **S0-07** + Self-Worth copy |
| 3 | Run **C**, then return to **A** again | **A** content fully restored (all 4 segments) |

**Fail if:** Code strip updates but **S0 (or any) body text** stays from the previous birthday.

---

## Input format & validation

| ID | Input | Expected |
|----|-------|----------|
| V1 | Empty fields → submit | Validation message; stay on page |
| V2 | `1980` / `13` / `01` | Invalid month message |
| V3 | `1980` / `02` / `30` | Invalid date message |
| V4 | `2030-01-01` | Future date rejected |
| V5 | `1899-01-01` | Year before 1900 rejected |
| V6 | Homepage: one field `1980/05/22` (if user types combined) | Still resolves and funnels (optional) |
| V7 | `1980` / `05` / `22` vs `1980` / `5` / `22` | Same code **A** |

---

## English content spot-check (case A only)

On `/result` for **1980-05-22**, confirm English (no Chinese in body):

| Segment | Check |
|---------|--------|
| S1 | Title includes **The Transformer** |
| S3 | Tier title **Amplified Expression** (S3-110) |
| S2 | **Soul Resonance Mirror** |
| S0 | **The Illusion of Self-Worth**; practice mentions gratitude/allowing |

---

## Negative / edge routes

| ID | Action | Expected |
|----|--------|----------|
| N1 | Open `/result` with no query params | **No Soul Code Found** + CTA to `/your-code` |
| N2 | Open `/result?year=1980` only (partial URL) | Empty state (do **not** show another birthday from cookie) |
| N3 | Open `/sample-report` | Always **1980-05-22** sample (S1-18 / S3-110 / S2-27 / S0-07) regardless of last calculation |

---

## `/generating` chamber (sign-off scope)

| Step | Pass criteria |
|------|----------------|
| 1 | After valid submit, lands on `/generating` with correct `year` / `month` / `day` in URL |
| 2 | Four steps animate (~6 s); progress rail advances |
| 3 | Auto-redirect to `/result` **or** **VIEW MY RESULT** works |
| 4 | No runtime error overlay (e.g. cookie / router errors on LAN IP) |
| 5 | Mobile: banner + copy readable; no stuck page after animation |

---

## Desktop vs mobile parity

| Check | Mobile | Desktop |
|-------|--------|---------|
| Hamburger menu opens | ✓ | N/A |
| Top **GENERATE MY CODE** hidden on mobile header | ✓ | CTA visible |
| Generating auto-redirect | ✓ | ✓ |
| Result readable (no horizontal scroll) | ✓ | ✓ |

---

## Sign-off record (completed)

```
Lumen QA — Birth dates + funnel
Date: 2026-05-31
Environment: local http://127.0.0.1:3000 + real-device Safari/Chrome
Tester: Lumen

Cases A–F: PASS
Regression B→A→C→A: PASS
Validation V1–V5, V7: PASS | V6: N/A
N1–N3: PASS
/generating: PASS

Overall: PASS — sign-off ready
Blockers: none
```

---

## Pass bar (Phase 1)

- All matrix cases **A–F** pass on mobile **and** desktop (Case **E** = **S0-15**).  
- Regression **B → A → C → A** shows correct content on all four segments.  
- Validation **V1–V7** complete.  
- **Real phone** Safari + Chrome (LAN or production URL), not only DevTools emulation.  
- `/generating` chamber checks above.  
- No “No Soul Code Found” when URL has full valid `year`, `month`, `day`.  
- Case **A** English spot-check passes.

---

## Related docs

- `QA_WISEWAVE_ABC_LUMEN.md` — **Phases A–C** production QA (post-Wisewave; run after deploy)  
- `WHATS_LEFT.md` — launch vs Phase 2  
- `README.md` — dev commands  
- `PHASE1_HANDOFF.md` — product scope  
