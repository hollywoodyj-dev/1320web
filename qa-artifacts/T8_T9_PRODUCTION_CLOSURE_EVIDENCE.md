# T8 / T9 · Production-observed closure evidence

**Date archived:** 2026-09-15  
**Status:** Production-observed PASS (two-trace closure)  
**Principle:** Every critical edge must be observed in production. They do not all have to occur in one paid transaction.

## Schema / path declaration (required)

**Trace A and Trace B use the same production stack:**

| Layer | Same across traces |
|---|---|
| App host | `https://www.1320soulcode.com` |
| Checkout API | `POST /api/checkout` → `stripe.checkout.sessions.create` |
| Metadata fields | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ref`, `landingPath`, `product`, `pricing_version`, `userId`, `reportId`, `birthDate` |
| Payment handoff | Stripe Checkout Session metadata + optional `payment_intent_data.metadata` |
| Fulfilment | Stripe webhook → `fulfillPaidCheckout` → `purchase_completed` in `marketing_conversion_events` |
| First-touch store | `localStorage` funnel attribution via `lib/funnel/attribution.ts` |

**Judgment:** Trace A (abandoned session metadata) and Trace B (paid entitlement) are comparable evidence — same schema, same metadata field set, same fulfilment path. Closure is valid without a third payment.

---

## Trace A · UTM → Full Report → checkout_started (no payment required)

**Observed:** 2026-08-25 **20:14:07 SG**  
**Probe:** `scripts/probe-flow-a-session-metadata.ts` (re-run 2026-09-15, live Stripe)

| Field | Value |
|---|---|
| Session id (redacted) | `cs_live_b19Egw…` |
| Status | `expired` / `unpaid` (abandoned — intentional) |
| `utm_source` | `pinterest_b` |
| `utm_medium` | `organic` |
| `utm_campaign` | `haze_t9_cta` |
| `landingPath` | `/full-report` |
| `product` | `full_report` |
| Checkout event | `checkout_started` + `payment_button_clicked` on `/full-report` path (T9 wiring) |
| DB purchase row | `purchases` pending at 20:14:07 SG, same session id prefix |

**Pass:** First-touch attribution entered Stripe Checkout Session metadata on the `/full-report` entry path without completing payment.

---

## Trace B · checkout → payment → entitlement → purchase_completed

**Observed:** 2026-08-25 **11:27:58 – 11:29:14 SG** (pinterest / haze_t8)

| Field | Value |
|---|---|
| Session id (redacted) | `cs_live_b1pS…` |
| `utm_source` | `pinterest` |
| `utm_medium` | `organic` |
| `utm_campaign` | `haze_t8` |
| `landingPath` | `/free-soul-blueprint` |
| `purchase_completed` | 11:29:14 SG, path `/checkout` |
| Entitlement | Report `0ac0d556…` created 11:28:30 SG for user `eae8e8f0…` |
| Amount | $0.49 USD (live test) |

**Pass:** Verified payment → report row → `purchase_completed` with webhook-read Stripe metadata attribution.

---

## First-touch not overwritten by no-UTM return

**Observed:** 2026-08-25 **13:27 – 13:32 SG**

| Time (SG) | Event | Attribution |
|---|---|---|
| 13:27:07 | `purchase_completed` (session `cs_live_b1nF…`) | null (direct return — no UTM on URL) |
| 13:31:46 | `signup_completed` entry `checkout_upsert` | `pinterest_b` retained |
| 13:32:19 | `purchase_completed` (session `cs_live_b1zm…`) | `utm_source=pinterest_b`, `utm_medium=organic`, `utm_campaign=haze_t8b`, `landingPath=/free-soul-blueprint` |

**Pass:** Return visit without fresh UTMs did not erase stored first-touch on the subsequent paid session.

---

## Dedupe evidence

- `purchase_completed`: once per Stripe checkout `session_id` (see `lib/record-conversion-event.ts`)
- `page_view`: burst dedupe within `PAGE_VIEW_BURST_MS` (`lib/funnel/page-view-dedupe.ts`) — smoke asserts operator vs exclude scopes (T32)
- `signup_completed`: split by entry (`footer_subscribe` vs `checkout_upsert` vs account paths) — not a single bundled counter

---

## Verdict

| Gate | Result |
|---|---|
| **T8** production E2E | ✅ PASS (Trace B + first-touch retention) |
| **T9** production funnel | ✅ PASS (Trace A metadata + Trace B purchase mapping) |
| Third payment required | ❌ No |

Measurement Hold: **lifted**.

**Re-verify command:** `npx tsx --env-file=.env.local scripts/probe-flow-a-session-metadata.ts`
