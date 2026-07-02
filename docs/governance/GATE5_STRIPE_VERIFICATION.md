# Gate 5 — Hosted Stripe Verification Guide

**Purpose:** Complete Wisewave Gate 5 before public paid commerce.  
**Mode:** Stripe **Test mode** only — do **not** switch to Live until this checklist passes.

---

## Do we need production (Live) mode?

| Stage | Stripe mode | When |
|-------|-------------|------|
| **Gate 5 verification (now)** | **Test mode** | Use `sk_test_...`, test webhook, test card `4242 4242 4242 4242` |
| **Public paid launch (later)** | **Live mode** | Only after Gate 5 pass + explicit go-live decision (Chino) |

**Answer:** No — keep Stripe in **Test mode** for Gate 5. Switch to Live only after hosted test checkout, entitlement, and magic-link return all pass.

---

## Prerequisites

| Requirement | Where |
|-------------|--------|
| Code deployed to hosted URL | Vercel production or preview with latest `master` |
| Postgres | `POSTGRES_URL` on Vercel |
| Migrations run | `npm run db:migrate` against production DB (once) |
| Site URL | `NEXT_PUBLIC_SITE_URL=https://your-hosted-domain.com` |
| Email (recommended) | `RESEND_API_KEY` + `EMAIL_FROM` for magic links |

---

## Step 1 — Stripe Dashboard (Test mode)

1. Open [Stripe Dashboard](https://dashboard.stripe.com).
2. Confirm toggle shows **Test mode** (top right) — not Live.
3. **Developers → API keys** — copy **Secret key** (`sk_test_...`).
4. **Products** — create or note one-time Full Report product/price, OR use amount env var.

---

## Step 2 — Vercel environment variables

**Project → Settings → Environment Variables** (Production + Preview for Gate 5 testing):

| Variable | Example | Required |
|----------|---------|----------|
| `POSTGRES_URL` | `postgresql://...` | Yes |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Yes |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Yes (after Step 3) |
| `STRIPE_FULL_REPORT_AMOUNT_CENTS` | `4900` | Yes* |
| `STRIPE_FULL_REPORT_PRICE_ID` | `price_...` | Alternative to amount |
| `NEXT_PUBLIC_SITE_URL` | `https://1320soulcode.com` | Yes |
| `RESEND_API_KEY` | `re_...` | Recommended |
| `EMAIL_FROM` | `1320 Soul Code <noreply@...>` | Recommended |

\* Use one of amount cents OR price ID — not both required.

**Redeploy** after saving env vars.

---

## Step 3 — Stripe webhook (Test mode)

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. **Endpoint URL:** `https://YOUR-DOMAIN/api/webhooks/stripe`
3. **Events:** `checkout.session.completed` (minimum)
4. Copy **Signing secret** (`whsec_...`) → set `STRIPE_WEBHOOK_SECRET` on Vercel → redeploy

---

## Step 4 — Database migrate (one-time)

From a machine with production `POSTGRES_URL`:

```powershell
cd C:\github\1320-website\web
$env:POSTGRES_URL="postgresql://..."
npm run db:migrate
```

---

## Step 5 — Gate 5 manual test path

Use canonical birth date **`1982-02-03`** (or `1980-05-22`).

### 5.1 Free result → checkout

1. Open `/result?year=1982&month=2&day=3`
2. Click **UNLOCK MY FULL BLUEPRINT**
3. Confirm `/checkout` shows purchase form — **not** "Checkout Not Yet Live"
4. Confirm birth date / signature context visible

### 5.2 Checkout API

- `POST /api/checkout` with email + birth date should return `{ ok: true, url: "https://checkout.stripe.com/..." }` — not `503`

### 5.3 Pay with test card

| Field | Value |
|-------|--------|
| Card | `4242 4242 4242 4242` |
| Expiry | Any future date |
| CVC | Any 3 digits |

Complete Stripe Checkout → redirect to `/checkout/success?session_id=cs_test_...`

### 5.4 Status polling

- `/api/checkout/status?session_id=cs_test_...` should move from pending → fulfilled
- Stripe webhook delivery shows **200** in Dashboard → Webhooks → recent events

### 5.5 Return access

1. Check email for magic link (or dev logs if Resend unset)
2. Open magic link → lands on `/my-report` or `/my-report/[reportId]`
3. Paid Full Report loads (desktop and/or mobile)

### 5.6 Already purchased flow

1. Return to `/checkout`
2. Use **Already Purchased?** magic-link form with same email
3. Confirm sign-in link works

---

## Step 6 — Record pass

Update:

- `qa-artifacts/1320-full-report-release-qa-2026-07-02.md` — Section 5 → PASS
- `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md` — session log
- `docs/governance/WISEWAVE_PHASE1_SIGNOFF.md` — Gate 5 row → ✅

---

## Step 7 — Go Live (separate decision, after Gate 5 pass)

Only when Wisewave + ops approve public paid launch:

1. Stripe Dashboard → switch to **Live mode**
2. Replace env vars on Vercel:
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - Create **Live** webhook → new `STRIPE_WEBHOOK_SECRET`
   - Live price ID if using `STRIPE_FULL_REPORT_PRICE_ID`
3. Redeploy
4. One real small-amount smoke purchase (optional) before announcing

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| "Checkout Not Yet Live" | Missing `POSTGRES_URL` or `STRIPE_SECRET_KEY` on hosted env |
| `503` on `/api/checkout` | Same — or redeploy needed after env change |
| Webhook 400/401 | Wrong `STRIPE_WEBHOOK_SECRET` or wrong endpoint URL |
| Status stuck pending | Webhook not firing — check Stripe event log |
| No magic link email | `RESEND_API_KEY` / `EMAIL_FROM` unset — check Vercel logs |
| `/my-report` unauthorized | Token expired or DB entitlement not created — check webhook fulfillment |

---

## Related

- `WHATS_LEFT.md` — Phase 2A ops checklist
- `qa-artifacts/1320-gate-5-checkout-upgrade-2026-07-01.md` — baseline Gate 5 audit
- `.env.example` — local env reference
