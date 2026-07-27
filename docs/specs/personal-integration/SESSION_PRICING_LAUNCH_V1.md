# Personal Integration Session Pricing & Product Tier Update · Launch v1

**Status:** Authorized for implementation  
**Authority:** Wisewave (2026-07-27); currency adjusted to USD by founder  
**Pricing version:** `launch-v1-usd`  
**Currency:** USD

## Products

| Order | session_type | Title | Duration | Price |
|------:|---|---|---:|---:|
| 1 | `blueprint_integration` | Blueprint Integration Session | 45 | USD 119 |
| 2 | `focused_life_integration` | Focused Life Integration Session | 60 | USD 159 · **Most Recommended** |
| 3 | `deep_blueprint_integration` | Deep Blueprint Integration Session | 75 | USD 209 |

CTA (all cards): **Pay & Book Session**

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
