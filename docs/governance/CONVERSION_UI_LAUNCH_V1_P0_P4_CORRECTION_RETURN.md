# Conversion UI Refinement · Launch v1 — P0–P4 Closure Correction Patch

**Wisewave status:** PASS WITH CORRECTIONS → this patch closes P0 Privacy + P4 Session presentation only  
**P1–P3:** No rework (Accepted)  
**Holds unchanged:** P5–P8 · Intake Easy Access rebuild · Full homepage rebuild  

**Pricing / checkout / Operating Flow:** Unchanged in catalog and product logic  
- Full Report: USD 49  
- Sessions: USD 119 / USD 159 / USD 209 (`launch-v1-usd`)  
- Catalog cents: 11900 / 15900 / 20900  
- Personal Integration Operating Flow unchanged  

**Checkout confirmation:** Session card UI and catalog remain USD with locked cents (11900 / 15900 / 20900). Checkout now rejects non-USD Stripe Price IDs and falls back to `price_data` USD so amounts stay Launch v1 USD even if env still points at legacy AUD Price objects. Prefer replacing those Price IDs with USD prices in Stripe Dashboard when convenient.

## Correction scope

### P0 · Privacy Policy
- Removed / replaced residual Phase 1, waitlist, and booking-inquiry framing
- Explicit live product-state categories:
  - Report-generation data
  - Account and entitlement data
  - Transactional data
  - Personal Integration data
  - Optional marketing consent
  - Technical and analytics data
- External legal flags remain in `docs/governance/LEGAL_EXTERNAL_REVIEW_FLAGS_P0_2026-07-28.md` (Nova does not independently resolve counsel items)

### P4 · Session cards (`/booking`)
- Visible prices on cards before checkout: USD 119 / 159 / 209
- Display order: 45 → 60 → 75
- Most Recommended on 60-minute Focused Life card (visually primary)
- Approved best-fit positioning copy
- Consistent CTA: **Pay & Book Session**
- Client-facing **Blueprint Integration Consultant** title retained in service-positioning / hero

## Evidence

| Artifact | Path |
|----------|------|
| P0 Legal QA | `qa-artifacts/LUMEN_QA_P0_LEGAL.md` |
| P0 screenshots | `qa-artifacts/conversion-ui-p0-legal/` |
| P4 Session Pricing QA | `qa-artifacts/LUMEN_QA_SESSION_PRICING_LAUNCH_V1.md` |
| P4 Session card screenshots | `qa-artifacts/session-pricing-launch-v1/booking-session-cards-desktop-1280.png` · `…-mobile-390.png` |
| Role title QA | `qa-artifacts/LUMEN_QA_ROLE_TITLE_CONSULTANT.md` |

## Explicit non-scope

- No P1 Free Landing rework  
- No P2 Free Result rhythm change  
- No P3 Full Report structure reopen  
- No F2/F3 funnel work  
- No catalog price or Operating Flow redesign  

## Requested Wisewave action

Once Lumen verifies this patch on production, mark full P0–P4:

**Accepted and Closed**
