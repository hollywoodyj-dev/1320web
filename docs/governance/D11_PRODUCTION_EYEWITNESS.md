# D-11 · Production eyewitness (post-T0, non-blocking)

**Status:** **PASS** — Flow A (test014) · Flow B (test07@yy.com, post `b07d103`)  
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

**Note:** `referrer_into_booking` = **entry path onto `/booking`**, not the booking URL itself. Direct URL open → `direct` (correct).

---

## Flow B · D-8 continuation (`/full-report → /booking`)

**Purpose:** `referrer_into_booking` = `/full-report` when user enters booking from Full Report ($49 continuation vs independent entry).

1. Fresh incognito.
2. Open:

   ```
   https://www.1320soulcode.com/full-report?utm_source=operator&utm_campaign=haze_d11_flowb_v3
   ```

3. Scroll to **「Prefer Live Integration?」** → click **「Explore Personal Integration」** (same tab).
4. Optional: scroll to Session Options → click tier card → signup → return `/booking`.
5. Stop before checkout.

**Pass:** booking events show `referrer_into_booking` = `/full-report` (or path + query), not `direct`.

---

## D-8 fix · client navigation referrer

**Problem:** Next.js `<Link>` client transitions leave `document.referrer` empty → `direct` on `/full-report → /booking` (test015).

**Fix (`b07d103`):** `primeBookingEntryReferrer()` + `BookingEntryLink` on internal `/booking` CTAs.

**Observed PASS:** test07@yy.com — `referrer_into_booking: "/full-report?utm_source=operator&utm_campaign=haze_d11_flowb_v3"` pre/post signup.

---

## Verify (after run)

```bash
npx tsx --env-file=.env.local scripts/probe-n02-session-continuity.ts <email>
npx tsx --env-file=.env.local scripts/probe-d11-email-dump.ts <email>
```

---

## Eyewitness log

| Date | Account | Flow | session_id | referrer | option_selected | stitch | Result |
|------|---------|------|------------|----------|-----------------|--------|--------|
| 2026-09-17 | test013@yy.com | A | ✅ | `direct` ✅ | ❌ | ✅ | PARTIAL — likely no card click |
| 2026-09-17 | test014@yy.com | A | ✅ | `direct` ✅ | ✅ | ✅ | **PASS** |
| 2026-09-17 | test015@yy.com | B | ✅ | ❌ `direct` (pre-fix) | ✅ | ✅ | **FAIL** referrer |
| 2026-09-18 | test016@yy.com | B | ✅ | ❌ `direct` | ✅ | ✅ | **INVALID** — deploy Error; fix not live |
| 2026-09-21 | test07@yy.com | B | ✅ `2676fe9c-…` | ✅ `/full-report?…flowb_v3` | ✅ | ✅ | **PASS** |

### test07 · notes (Flow B post-fix)

- Holly confirmed account **test07@yy.com** (Flow B re-test after `b07d103`).
- Timeline: `/full-report` → `/booking` → `option_selected` → signup → return `/booking`.
- Referrer stable across signup; session_id stable.

---

## Closed

D-11 session continuity + D-8 entry referrer **observed in production**. No further eyewitness required unless regression.
