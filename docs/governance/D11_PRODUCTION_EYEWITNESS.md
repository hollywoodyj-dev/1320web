# D-11 · Production eyewitness (post-T0, non-blocking)

**Status:** PENDING — stitch **deployed** (`87d2e10`), not yet **observed** in production  
**Window:** first few days of T0 (Pinterest week 1 unlikely to produce booking traffic)  
**Blocks T0:** No

---

## Flow (no payment)

1. **Log out** (fresh tab or incognito).
2. Open QA URL (operator-tagged — excluded from CLEAN):

   ```
   https://www.1320soulcode.com/booking?utm_source=operator&utm_campaign=haze_d11_stitch_v1
   ```

3. **Click a tier card** while logged out → redirects to signup (same tab).
4. **Create account** → return to `/booking`.
5. **Stop before checkout** — no Stripe, no payment.

---

## Pass criteria

| Check | How |
|-------|-----|
| Analytics `session_id` survives signup | Same UUID on all **client** booking events for this visit (`localStorage.soulcode_analytics_session`) |
| `referrer_into_booking` survives signup | Same value in metadata on post-signup client events (`sessionStorage.1320_booking_entry_referrer`) |
| Stitch | Pre-signup client rows share analytics `session_id`; after signup all rows have same `user_id` (backfill) |
| Funnel order | `funnel_step` monotonic where timestamps cross navigation |

**Note:** `booking_started` / `booking_completed` use Stripe `cs_*` in `session_id` — not expected without checkout. This eyewitness validates **client continuity + stitch**, not full four-event Stripe session.

---

## Verify (after run)

Replace email with the test account used:

```bash
npx tsx --env-file=.env.local scripts/probe-n02-session-continuity.ts you+d11@example.com
```

Record PASS/FAIL in this file and `PHASE0_N0_DEPLOY_STATUS.md`.

---

## Eyewitness log

| Date | Account | session_id stable | referrer_into_booking | stitch (user_id) | Result |
|------|---------|-------------------|----------------------|------------------|--------|
| — | — | — | — | — | PENDING |
