# D-11 · Production eyewitness (post-T0, non-blocking)

**Status:** **PARTIAL PASS** — session continuity + stitch observed (test013, test014); D-8 `/full-report → /booking` referrer path **PENDING**  
**Blocks T0:** No

---

## Flow A · Direct `/booking` (no payment)

1. **Log out** — fresh incognito window (required).
2. Open:

   ```
   https://www.1320soulcode.com/booking?utm_source=operator&utm_campaign=haze_d11_stitch_v1
   ```

3. **Scroll to Session Options** (six sections down — do not use Create Account above the fold).
4. **Click a tier card** (e.g. Focused Life Integration · 60 min · $159).
5. Complete **signup** in the same tab → return to `/booking`.
6. **Stop before checkout** — no Stripe, no payment.

### Pass criteria (Flow A)

| Check | How |
|-------|-----|
| Analytics `session_id` survives signup | Same UUID on all **client** booking events |
| `referrer_into_booking` survives signup | Same value pre/post signup (direct entry → `direct`) |
| Stitch | Pre-signup rows get `user_id` backfill after signup |
| Card click | `booking_option_selected` present if card was actually clicked |

**Note:** `referrer_into_booking` = **entry path onto `/booking`**, not the booking URL itself. Direct URL open → `direct` (correct). Not `/signup`, not empty.

---

## Flow B · D-8 continuation (PENDING)

**Purpose:** Verify `referrer_into_booking` records `/full-report` when user enters booking from Full Report — the signal for **$49 continuation vs independent entry**.

1. Fresh incognito.
2. Visit `/full-report` (or paid landing → full report path as in prod).
3. Navigate to `/booking` from that context (same tab).
4. Signup if needed; stop before checkout.

**Pass:** post-signup booking events show `referrer_into_booking` = `/full-report` (or full path with query), not `direct`.

---

## Verify (after run)

```bash
npx tsx --env-file=.env.local scripts/probe-n02-session-continuity.ts <email>
```

Record in this file and `PHASE0_N0_DEPLOY_STATUS.md`.

---

## Eyewitness log

| Date | Account | Flow | session_id | referrer | option_selected | stitch | Result |
|------|---------|------|------------|----------|-----------------|--------|--------|
| 2026-09-17 | test013@yy.com | A (direct) | ✅ `78489580-…` | `direct` ✅ | ❌ not in DB | ✅ | **PARTIAL** — likely did not reach card (3s to signup; page ~56KB) |
| 2026-09-17 | test014@yy.com | A (direct) | ✅ `cb30a90b-…` | `direct` ✅ | ✅ funnel_step 2 | ✅ | **PASS** (Flow A) |
| — | — | B (full-report → booking) | — | — | — | — | **PENDING** |

### test013 · notes

- Session continuity + stitch: **PASS** (D-11 critical path).
- `referrer_into_booking` = `direct`: **correct** for direct URL entry.
- `booking_option_selected` missing: **原因待定** — Holly may have used Create Account above the fold without scrolling to Session Options; do **not** investigate beacon until card click is confirmed absent (see test014).

### test014 · notes

- `booking_page_view` 11:33:12 → `booking_option_selected` 11:33:17 (+5s) → signup → return `booking_page_view` 11:33:41.
- Same session `cb30a90b-2bb5-47c3-ac35-6a150c41bfbd` throughout; card click beacon **present**.
