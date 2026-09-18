# D-11 · Production eyewitness (post-T0, non-blocking)

**Status:** Flow A **PASS** (test014); Flow B fix **build-broken until redeploy** — test016 ran against old prod  
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
   https://www.1320soulcode.com/full-report?utm_source=operator&utm_campaign=haze_d11_flowb_v1
   ```

3. Scroll to **「Prefer Live Integration?」** → click **「Explore Personal Integration」** (same tab).
4. Optional: scroll to Session Options → click tier card → signup → return `/booking`.
5. Stop before checkout.

**Pass:** booking events show `referrer_into_booking` = `/full-report` (or path + query), not `direct`.

---

## D-8 fix · client navigation referrer (test015 root cause)

**Problem:** Next.js `<Link>` client transitions leave `document.referrer` empty → `captureBookingEntryReferrer()` recorded `direct` even after `/full-report → /booking` (test015 eyewitness: `page_view /full-report` at 11:38:01, then `/booking` at 11:38:41, referrer still `direct`).

**Fix:**

- `primeBookingEntryReferrer()` — on click, write current path to `sessionStorage.1320_booking_entry_referrer` (first-touch only).
- `BookingEntryLink` — wraps internal `/booking` links; calls prime before navigation.
- Wired on: `/full-report`, `/reflect`, `/account`, booking success, integration prep/follow-up invalid states.

**Re-test:** Holly repeats Flow B after deploy → expect `referrer_into_booking: "/full-report"` (or with UTM query if present on full-report URL).

---

## Verify (after run)

```bash
npx tsx --env-file=.env.local scripts/probe-n02-session-continuity.ts <email>
```

---

## Eyewitness log

| Date | Account | Flow | session_id | referrer | option_selected | stitch | Result |
|------|---------|------|------------|----------|-----------------|--------|--------|
| 2026-09-17 | test013@yy.com | A | ✅ | `direct` ✅ | ❌ | ✅ | PARTIAL — likely no card click |
| 2026-09-17 | test014@yy.com | A | ✅ | `direct` ✅ | ✅ | ✅ | **PASS** |
| 2026-09-17 | test015@yy.com | B | ✅ | ❌ `direct` (bug) | ✅ | ✅ | **FAIL** referrer — client-nav gap |
| 2026-09-18 | test016@yy.com | B | ✅ | ❌ `direct` | ✅ | ✅ | **INVALID** — prod deploy **Error** (fix never live); Holly path ✅ |

### test015 · notes

- Holly path confirmed: `page_view /full-report` → `/booking` (+40s).
- Session + stitch + option_selected: PASS.
- Referrer FAIL: client-nav gap, not operator error.

### test016 · notes

- Same path confirmed: `/full-report` 03:50:32 → `/booking` 03:50:56 (+24s).
- Referrer still `direct` because Vercel Production builds **failed** after `6513d0d` (`??`/`||` parse error in `primeBookingEntryReferrer`). **Not a retest of the fix.**
- Re-run Flow B after successful deploy of build fix.
