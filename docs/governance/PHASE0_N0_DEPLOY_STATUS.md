# Phase 0 · N0 deploy status

**Updated:** 2026-09-17  
**Rule:** Acceptance = observed working in production, not implemented in repo.

---

## Pending deploy (same gate)

| ID | Repo | Production | Next |
|----|------|------------|------|
| **N0.2** | Booking funnel events wired | Not live — zero booking catalog events | Deploy → prod booking test eyewitness |
| **T17** | `/is-numerology-scientifically-proven` + sitemap entry | **404** · sitemap **19** | Deploy → Haze verify 200 / canonical / sitemap 20 / Genovese |

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
