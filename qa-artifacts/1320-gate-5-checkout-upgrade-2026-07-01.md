# 1320 Gate 5 - Checkout / Upgrade QA

Date: 2026-07-01  
Scope: Free-result upsell promise, checkout entry, Stripe checkout API, success/status polling, magic-link return access, and paid report access gating.

## Verdict

**FAIL - PUBLIC PAID LAUNCH READINESS**

The checkout/access architecture is present and mostly coherent, but Gate 5 cannot pass for public paid conversion yet because:

1. Local checkout is not live: `POSTGRES_URL`/DB is available, but Stripe is not configured, so `/checkout` shows `Checkout Not Yet Live` and `/api/checkout` returns `503`.
2. The free-result upgrade CTA drops the visible birth-date query and goes to generic `/checkout`, relying on birth-cookie recovery. The resolver supports cookie fallback, but the visible URL does not preserve user context.
3. The upgrade promise says the paid Full Report unlocks `~32 pages`, advanced modules, and `Your 7-Day Integration Practice`; Gate 3 already found mobile paid report content is condensed and not parity-clean against desktop.
4. The Phase 2A smoke test currently fails because it expects `app/auth/verify/route.ts`, while the implemented route is `app/api/auth/verify/route.ts` plus the site page at `/auth/verify`.

Gate 5 is acceptable for an internal/dev foundation review, but not for a public paid release.

## What Was Checked

### Free Result -> Checkout

Checked live local route:

- `/result?year=1982&month=2&day=3`
- clicked `UNLOCK MY FULL BLUEPRINT`
- landed on `/checkout`

Finding:

- The free result correctly communicates that it is a free first layer.
- The upsell promises `Full Soul Origin Report (~32 pages)`, S1-S0 expansion, Shadow Pattern Module, Soul Mission, Money Frequency, and 7-Day Integration Practice.
- The clicked checkout link is generic `/checkout`, not `/checkout?year=1982&month=2&day=3`.
- `resolveBirthDateFromRequest` can recover birth date from URL query first, then birth cookie, and refuses stale cookie fallback when partial/invalid query params are present.

Evidence screenshot:

- `qa-artifacts/1320-gate5-checkout-not-live-2026-07-01.png`

### Checkout Page

Local `/checkout?year=1982&month=2&day=3` rendered:

- `Unlock My Full Blueprint`
- `Checkout Not Yet Live`
- message: Phase 2A checkout requires `POSTGRES_URL` and Stripe environment variables
- `Already Purchased?` magic-link request form

Because Stripe is not configured, the purchase form is intentionally hidden locally. The code path would render `UnlockCheckoutForm` only when both DB and Stripe are configured.

### Checkout API

POST tested:

```http
POST /api/checkout
{
  "email": "test@example.com",
  "firstName": "Gate",
  "year": 1982,
  "month": 2,
  "day": 3
}
```

Result:

```json
{"ok":false,"error":"Checkout is not configured yet. Set POSTGRES_URL and Stripe env vars."}
```

HTTP status: `503 Service Unavailable`

This is a controlled failure, not a crash.

### Stripe Session Creation Path

Code inspection shows `/api/checkout`:

- validates email and birth date
- calculates 1320 code
- resolves full report content and combination signature
- upserts user
- creates a saved `soul_report`
- creates a Stripe Checkout session
- stores pending purchase with report ID and session ID
- uses success URL `/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- uses cancel URL `/checkout?cancelled=1`

Watchpoint:

- Cancel URL does not preserve visible birth-date context.
- No obvious user-facing checkout summary confirms code/date before payment in the current visible local state because the configured purchase form cannot be rendered without Stripe env.

### Success / Status Polling

Checked:

- `/checkout/success?session_id=cs_test_missing`
- `/api/checkout/status?session_id=cs_test_missing`
- `/api/checkout/status` without session ID

Results:

- success page renders and polls status
- unknown session returns pending:

```json
{"ok":false,"status":"pending"}
```

- missing session ID returns:

```json
{"ok":false,"error":"session_id required"}
```

Evidence screenshot:

- `qa-artifacts/1320-gate5-success-pending-2026-07-01.png`

Watchpoint:

- Unknown session can leave the success page in indefinite `Still confirming payment...` state. Consider surfacing a timeout/help state.

### Magic-Link / Entitlement Access

Checked code paths:

- `app/api/auth/magic-link/route.ts`
- `app/(site)/auth/verify/page.tsx`
- `app/api/auth/verify/route.ts`
- `app/(site)/my-report/page.tsx`
- `app/(site)/my-report/[reportId]/page.tsx`
- `lib/auth/access.ts`
- `lib/db/entitlements.ts`
- `lib/stripe/fulfill-checkout.ts`

Finding:

- Magic-link verification is intentionally a two-step page flow to avoid email scanners consuming one-time links.
- `/my-report` requires a signed-in session.
- `/my-report/[reportId]` requires both session and active entitlement.
- Checkout fulfillment marks purchase completed, grants entitlement, and issues a magic link.
- Local `/my-report` without session shows `Sign In With Magic Link`, not the paid report.

Evidence screenshot:

- `qa-artifacts/1320-gate5-my-report-2026-07-01.png`

Watchpoint:

- `POST /api/auth/magic-link` upserts a user and can return a dev link for any syntactically valid email in dev. It does not grant report access, but it may create noise and can lead non-purchasers to a `No Report Found` style path.

### Smoke Test

Ran:

```bash
npm run smoke:phase2a
```

Result:

```text
FAIL: Missing app/auth/verify/route.ts
```

The app currently has:

- `app/api/auth/verify/route.ts`
- `app/(site)/auth/verify/page.tsx`

So either the smoke script is stale, or the intended route contract changed without updating the test.

## Promise vs Delivery

The free result / upsell promises:

- deeper S1-S0
- Integrated Soul Blueprint
- Shadow Pattern Module
- Soul Mission
- Money Frequency
- 7-Day Integration Practice
- `~32 pages`
- return access via magic link

Desktop delivery appears structurally aligned with that promise from prior full-report checks.

Mobile delivery is not aligned unless product explicitly decides mobile is a shortened report. Gate 3 found missing or replaced detail in Practice, Journal, Closing, Disclaimer, and S6-S9 expansion detail.

## Blocking Fixes Before Public Paid Launch

1. Configure production DB + Stripe env and verify real test-mode checkout end-to-end.
2. Update `smoke:phase2a` to match the implemented auth route, or restore the route path it expects.
3. Make checkout CTAs preserve visible birth-date context, for example `/checkout?year=YYYY&month=M&day=D`, even if cookie fallback remains.
4. Add a visible checkout summary before payment: birth date, code string, product name, one-time purchase, return-access promise.
5. Decide and fix Gate 3 mobile parity: either make mobile paid content equivalent, or clearly label mobile as condensed.
6. Add success-page timeout/recovery copy for stuck or unknown Stripe sessions.

## Pass Conditions For Rerun

- `npm run smoke:phase2a` passes.
- Test-mode Stripe checkout can create a session and redirect.
- Stripe completion grants entitlement.
- Success page redirects to `/my-report/{reportId}`.
- Magic link opens the same report after session reset.
- Checkout preserves or clearly re-confirms the user's birth date/code before payment.
- Paid report content delivered on mobile matches the product promise or is explicitly scoped as condensed.
