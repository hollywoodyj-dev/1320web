# Personal Integration Session Pricing & Product Tier Update · Launch v1

**Status:** Active production pricing  
**Authority:** Wisewave (2026-07-27); currency locked to USD by founder; F1 Spec correction 2026-07-28  
**Pricing version:** `launch-v1-usd`  
**Currency:** USD  

Production checkout configuration is the source of truth for amounts charged.

## Products

| Order | session_type | Title | Duration | Price |
|------:|---|---|---:|---:|
| 1 | `blueprint_integration` | Blueprint Integration Session | 45 | USD 119 |
| 2 | `focused_life_integration` | Focused Life Integration Session | 60 | USD 159 · **Most Recommended** |
| 3 | `deep_blueprint_integration` | Deep Blueprint Integration Session | 75 | USD 209 |

CTA (all cards): **Pay & Book Session**

## Superseded pricing (not production)

Earlier draft Session prices **AUD 168 / AUD 228 / AUD 298** are a **superseded launch-pricing proposal**, not current production pricing.  
Do not use AUD figures in active Specs, marketing copy, QA fixtures, or F2 email.  
Do not convert historical purchase records.

## Operating flow (unchanged)

Payment → Booking Success → Schedule Session → Pre-Session Intake → Facilitator Workspace → Reviewed Client Summary

One flow; Session type/duration stored on the Session record.

## Persistence

Each Session stores: `session_type` (column `session_variant`), `session_title`, `duration_minutes`, `price_amount`, `currency`, `pricing_version`.

Migration: `db/platform-domain-v1.8-session-pricing-launch-v1.sql`

## Tax display

Pricing page shows `USD 119` / `USD 159` / `USD 209` with no unsupported tax claim. Current Stripe Checkout uses inclusive `price_data` amounts in USD with no `automatic_tax`.

## Catalog source

`lib/personal-integration/session-catalog.ts`
