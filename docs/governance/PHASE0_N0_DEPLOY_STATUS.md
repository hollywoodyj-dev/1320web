# Phase 0 · N0 deploy status

**Updated:** 2026-09-17  
**Rule:** Acceptance = observed working in production, not implemented in repo.

---

## Deploy · `0b47209` (2026-09-17)

Pushed `master` → Vercel Production **Ready** (~1m build).

| Probe (Nova, post-deploy) | Result |
|---|---|
| `/is-numerology-scientifically-proven` | **200** |
| `sitemap.xml` `<loc>` count | **20** |

**Acceptance still pending** — Haze production verify (same gate as N0.2).

| ID | Repo | Production (post-deploy) | Acceptance |
|----|------|--------------------------|------------|
| **T17** | Page + sitemap entry | 200 · sitemap 20 | **Pending Haze** — canonical self-ref, Genovese accuracy |
| **N0.2** | Booking funnel events | Code live | **Pending eyewitness** — prod booking test, four events in admin |

---

## Post-deploy sequence (Haze)

1. T17 production check
2. Booking test flow — four events in admin (`booking_completed` = verified payment only)
3. N0.3 booking baseline freeze
4. N0.4 RAW/CLEAN + legacy `haze_t6b` / `closure_2026-08-23` + `purchase_context=internal_qa`

---

## In parallel (not blocked)

| ID | Status |
|----|--------|
| **N0.5** | Live calculator survey continues (D-9 #4/#6/#7) |
| **N0.3 prep** | `lib/funnel/booking-start-baseline.ts` placeholder |
| **N0.4 prep** | Spec in work order — implement after deploy eyewitness |
