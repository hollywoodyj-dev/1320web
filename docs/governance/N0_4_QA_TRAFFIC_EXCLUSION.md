# N0.4 · RAW / CLEAN · QA traffic exclusion

**Status:** PASS (repo + probes, 2026-09-17) — pending production deploy for write-time `purchase_context`  
**Rule:** RAW = all rows; CLEAN = exclude QA-tagged rows at read time (never delete).

**Probe (30d):** RAW purchase_completed **8** · CLEAN **2** · QA excluded **6**

---

## CLEAN exclusion rules

| Signal | Match |
|--------|--------|
| `purchase_context` | `internal_qa` (written at checkout / fulfillment for new QA-tagged flows) |
| Campaign | `haze_*` prefix |
| Legacy campaign | `closure_2026-08-23` |
| UTM source | `operator` |
| Legacy source | `haze_t6b` |

Implementation: `lib/funnel/qa-traffic-exclusion.ts` (`isQaTaggedConversionEvent`, `QA_EXCLUSION_SQL`).

Admin panel 30d toggle uses the same SQL as probes (`app/api/admin/conversion-tracking/route.ts`).

---

## Write-time tagging (new transactions)

`withPurchaseContextMetadata()` merges `purchase_context=internal_qa` when attribution matches QA rules:

- `app/api/checkout/route.ts`
- `app/api/booking/checkout/route.ts`
- `lib/stripe/fulfill-checkout.ts` (purchase_completed)
- `lib/funnel/record-booking-funnel-event.ts` (booking_started / booking_completed)

Legacy rows without `purchase_context` remain excluded via read-time rules above.

---

## Verify

```bash
npx tsx --env-file=.env.local scripts/probe-purchase-qa-exclusion.ts
npx tsx --env-file=.env.local scripts/probe-admin-30d-exclusion.ts
```

---

## D-11 signup stitch

Pre-auth client events use `localStorage` analytics `session_id`. On signup, the form sends `analyticsSessionId` → `backfillConversionEventsUserByAnalyticsSession` attaches `user_id` to rows from the last 24h with matching `session_id`.

See `scripts/probe-n02-session-continuity.ts` for eyewitness continuity evidence.
