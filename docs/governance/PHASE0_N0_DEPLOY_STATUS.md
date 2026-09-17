# Phase 0 · N0 deploy status

**Updated:** 2026-09-17  
**Rule:** Acceptance = observed working in production, not implemented in repo.

---

## Deploy · `87d2e10` (2026-09-17)

Pushed `master` → Vercel Production **Ready** (~2m build).

| Probe (Nova, post-deploy) | Result |
|---|---|
| `/is-numerology-scientifically-proven` | **200** |
| `sitemap.xml` `<loc>` count | **20** |
| C-3 observed (`allow_promotion_codes`) | **false** (live probe session) |
| N0.4 write-path + D-11 signup stitch | **deployed** |

---

## Deploy · `0b47209` (2026-09-17)

Pushed `master` → Vercel Production **Ready** (~1m build).

| Probe (Nova, post-deploy) | Result |
|---|---|
| `/is-numerology-scientifically-proven` | **200** |
| `sitemap.xml` `<loc>` count | **20** |

| ID | Repo | Production | Acceptance |
|----|------|------------|------------|
| **T17** | Asset 07 epistemic page | 200 · canonical self-ref · sitemap 20 · title exact · TTFB 0.09–0.35s | **PASS** (Haze, 2026-09-17) — Genovese citation verified; modulo/birth-number note **not** added (proportionate to evidence) |
| **N0.2** | Booking funnel events | Eyewitness PASS + post-fix deploy | **PASS** (core) — ordering/referrer/C-3 fixes shipped |
| **N0.3** | Booking baseline | Frozen 2026-09-17 | **PASS** — RAW 2/2/2/1, CLEAN 0 (QA only pre-T0) |
| **N0.4** | QA RAW/CLEAN | Deployed | **PASS** — read-time + write-time `purchase_context` |
| **C-3** | Promo observed | Probe 2026-09-17 | **PASS** — `allow_promotion_codes: false` when switch=false; test012 contrast `true` |
| **D-11** | Session continuity | test013–015 | **PARTIAL PASS** — Flow A ✅; Flow B referrer fail (test015) → **fix deployed**, Holly re-test pending |

---

## T0 · Pinterest distribution

**Status:** **OPEN** (Haze, 2026-09-17) — N0 preconditions met (T17 200, sitemap 20, C-3 observed, N0.4 PASS).

D-11 production eyewitness does **not** block T0.

---

## Post-deploy sequence (Haze)

1. ~~T17 production check~~ **PASS**
2. ~~Booking test flow~~ **PASS**
3. ~~N0.3 booking baseline freeze~~ **PASS**
4. ~~N0.4 RAW/CLEAN + legacy + purchase_context~~ **PASS**
5. ~~Deploy N0.4 write-path + D-11 signup stitch~~ **PASS**
6. ~~Pinterest T0~~ **OPEN**

---

## T0+ priority (content & distribution)

1. **N0.5** — close calculator survey (conditional: ≥2 A/A′/B + ≥2 mismatch, ~8 rows) → T18 body → publish
2. **T18** — post-launch editorial outreach
3. **Measurement** — maintenance only unless blocking distribution

**Resource gate:** 70–80% of new work must directly produce discovery / content asset / distribution. Every new task must pass: *Would this make someone who didn't know 1320 more likely to see, understand, cite, or enter 1320?*

---

## In parallel (not blocked)

| ID | Status |
|----|--------|
| **N0.5** | Live calculator survey — conditional closure (Nova) |
| **D-11 eyewitness** | Flow B re-test after `primeBookingEntryReferrer` deploy — Holly |
