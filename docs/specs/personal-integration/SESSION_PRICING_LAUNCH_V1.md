# Personal Integration Session Pricing & Product Tier Update · Launch v1

**Status:** Authorized for implementation  
**Authority:** Wisewave (2026-07-27)  
**Pricing version:** `launch-v1`  
**Currency:** AUD

## Products

| Order | session_type | Title | Duration | Price |
|------:|---|---|---:|---:|
| 1 | `blueprint_integration` | Blueprint Integration Session | 45 | AUD 168 |
| 2 | `focused_life_integration` | Focused Life Integration Session | 60 | AUD 228 · **Most Recommended** |
| 3 | `deep_blueprint_integration` | Deep Blueprint Integration Session | 75 | AUD 298 |

CTA (all cards): **Pay & Book Session**

## Operating flow (unchanged)

Payment → Booking Success → Schedule Session → Pre-Session Intake → Facilitator Workspace → Reviewed Client Summary

One flow; Session type/duration stored on the Session record.

## Persistence

Each Session stores: `session_type` (column `session_variant`), `session_title`, `duration_minutes`, `price_amount`, `currency`, `pricing_version`.

Migration: `db/platform-domain-v1.8-session-pricing-launch-v1.sql`

## Tax display

Pricing page shows `AUD 168` / `AUD 228` / `AUD 298` with no GST claim unless checkout is configured to add GST separately. Current Stripe Checkout uses inclusive `price_data` amounts in AUD with no `automatic_tax` — do not display “plus GST”.

## Catalog source

`lib/personal-integration/session-catalog.ts`
