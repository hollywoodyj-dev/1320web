# N0.2 · Booking funnel · production test runbook

**Eyewitness:** PASS (Haze, 2026-09-17) — `test012@yy.com`  
**Post-fix deploy:** funnel ordering + referrer semantics + C-3 on booking (see below)

---

## Acceptance (PASS)

| Check | Result |
|-------|--------|
| Four events | ✅ |
| `booking_completed` ↔ `purchase.status=completed` same second / session | ✅ |
| Abandoned session → no `booking_completed` | ✅ |
| `report_purchase_status=none` for direct booker | ✅ |
| QA tag + CLEAN exclusion | ✅ |

---

## C-3 · Promo codes on booking checkout

**Root cause (not a separate code path):** Both `/api/checkout` and `/api/booking/checkout` use `allow_promotion_codes: stripeAllowPromotionCodes()` from `lib/stripe/client.ts`.

Promo worked on the eyewitness because **`STRIPE_ALLOW_PROMOTION_CODES` was temporarily set to `true` on Vercel Production** for QA (2026-09-17). Restored to **`false`** before T0.

Smoke lock: `scripts/smoke-funnel.ts` asserts booking route uses the same switch.

---

## Event ordering (post-fix)

**Prior bug:** Card click before signup → `booking_option_selected`; return after signup → `booking_page_view` (inverted timestamps).

**Fix:**
- `booking_page_view` always fires first (`track-booking-funnel-event.ts` gate).
- Card / select handlers call `trackBookingOptionSelected`, which ensures page view first.
- Removed mount-time auto `option_selected` on form.
- All booking events carry **`funnel_step`** 1–4 for ordered drop-off queries (use when timestamps cross navigations).

---

## Metadata semantics

| Field | Meaning |
|-------|---------|
| `referrer_into_booking` | First page that led onto `/booking` this tab session (captured once; D-8 continuation) |
| `source_page` | Page at event time / checkout API call (may be `/signup` after account creation) |
| `funnel_step` | 1=page_view · 2=option · 3=started · 4=completed |

---

## QA test URL

```
https://www.1320soulcode.com/booking?utm_source=operator&utm_campaign=haze_n02_booking_v1
```

Promo codes **off** in production (C-3). Do not re-enable without explicit Haze approval.

---

## Verify

```bash
npx tsx --env-file=.env.local scripts/probe-n02-booking-events.ts
npx tsx --env-file=.env.local scripts/probe-n02-test012.ts
```
