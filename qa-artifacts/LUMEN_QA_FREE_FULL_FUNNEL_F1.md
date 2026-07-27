# Lumen QA — Free → Full Funnel Phase F1

Base: http://localhost:3000  
Production: https://www.1320soulcode.com/free-soul-blueprint  
Date: 2026-07-27T14:55:00.000Z  
Result: **PASS** (F1 closure corrections)

## Deployed commits

| Commit | Note |
|--------|------|
| `45ba5ef` | Ship Free→Full Funnel Phase F1 with USD Full Report pricing |
| `54d9c1c` | Spec USD lock + superseded AUD + Full Report USD 49 display + Live Integration secondary polish |

## Wisewave F1 review

**PASS WITH LIGHT CORRECTIONS** → documentation + pricing-consistency closure.

## Checks

- **Landing hero CTA + no Session prices**: PASS — cta=true sessionPrices=false
- **Landing foundations + boundary + sample label**: PASS
- **Desktop no overflow**: PASS
- **Mobile no overflow**: PASS
- **Submit opens generating**: PASS
- **Result recognition + Missing Map + offer**: PASS
- **Result has no Session price cards**: PASS
- **Full Report offer price is USD**: PASS — price=USD 49
- **Full Report sales Spec alignment**: PASS
- **Full Report sales keeps USD (no AUD)**: PASS — usd=true aud=false
- **Session continuation secondary (no Session cards / no gold CTA)**: PASS — liveGold=false sessionCards=false
- **Alias /free-soul-blueprint/result serves result**: PASS — status=200

Screenshots: `qa-artifacts/free-full-funnel-f1/`

## Pricing consistency (USD production lock)

| Surface | Expected | Status |
|---------|----------|--------|
| Free Result offer display | USD 49 | Confirmed |
| `/full-report` product details | USD 49 · One-Time Purchase | Confirmed |
| Checkout amount source | `getFullReportAmountCents()` default 4900 / Stripe Price ID | Confirmed (code) |
| Purchase record | `amountCents` from same source | Confirmed (code) |
| Session prices on Funnel LP / Missing Map | Not shown | Confirmed |
| AUD 168 / 228 / 298 in active Spec | Marked superseded | Confirmed |

## Attribution non-PII

`lib/funnel/attribution.ts` persists only: utm_*, ref, language (+ landingPath).  
Explicitly does **not** store birth dates, codes, or reflection text.  
Checkout spreads `body.attribution` into Stripe metadata alongside product fields; attribution keys remain campaign-only.

## Continuity notes

- Birth submit uses existing `/generating` → `/result` (no second engine).
- Checkout remains `/checkout`; attribution metadata forwarded when present.
- Entitlement path unchanged: purchase → `/my-report/[reportId]`.
- F2 / F3 not started (await separate authorization).

## Spec docs updated

- `docs/specs/funnel/FREE_TO_FULL_FUNNEL_SPEC_v1.md` — USD production lock; AUD superseded
- `docs/specs/personal-integration/SESSION_PRICING_LAUNCH_V1.md` — AUD superseded section
- `docs/specs/README.md` — index pricing note
