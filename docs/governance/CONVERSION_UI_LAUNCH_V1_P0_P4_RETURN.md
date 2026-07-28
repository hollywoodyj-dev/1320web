# Conversion UI Refinement · Launch v1 — P0–P4 Return Package

**Status:** ✅ Fully Accepted and Closed (Wisewave, 2026-07-28)  
**Pricing locked:** Full Report USD 49 · Sessions USD 119 / 159 / 209 (`launch-v1-usd`)  
**Maintenance:** Stable — do not begin P5–P8 without separate authorisation

## Closure summary

| Priority | Surface | Status |
|----------|---------|--------|
| P0 | Legal (`/terms` `/privacy` `/disclaimer`) | ✅ Accepted and Closed |
| P1 | Free Soul Blueprint Landing | ✅ Accepted and Closed |
| P2 | Free Result conversion rhythm | ✅ Accepted and Closed |
| P3 | Full Report sales | ✅ Accepted and Closed |
| P4 | Personal Integration Session pricing UI | ✅ Accepted and Closed |

Correction patch that closed residual P0 Privacy + P4 Session presentation: `5bb76c1` · `CONVERSION_UI_LAUNCH_V1_P0_P4_CORRECTION_RETURN.md`

## Commits

| Commit | Scope |
|--------|--------|
| `9696c43` | P0 Legal product-state alignment |
| `7a7777d` | P1–P4 conversion UI refinement |
| `5bb76c1` | P0 Privacy + P4 Session closure correction |
| `47befa3` | Lumen production PASS evidence |

## Route-by-route summary

| Route | Priority | Change |
|-------|----------|--------|
| `/terms` `/privacy` `/disclaimer` | P0 | Live product language; quieter reading layout; CTA → Free Soul Blueprint |
| `/free-soul-blueprint` | P1 | Form-first; one dominant Discover CTA; eight sections; Foundation order preserved |
| `/result` (free) | P2 | Recognition → Foundation → Integrated → Missing Map → Full Report Offer; no Session pressure |
| `/full-report` | P3 | Complete S0–S9; USD 49 primary purchase; Personal Integration secondary |
| `/booking` (+ success copy) | P4 | USD 119/159/209; 45→60→75; Most Recommended; Pay & Book Session; Consultant title |

## Evidence

- Correction return: `docs/governance/CONVERSION_UI_LAUNCH_V1_P0_P4_CORRECTION_RETURN.md`
- P0: `qa-artifacts/LUMEN_QA_P0_LEGAL.md` + `qa-artifacts/conversion-ui-p0-legal/`
- P1–P4: `qa-artifacts/LUMEN_QA_CONVERSION_UI_P1_P4.md` + `qa-artifacts/conversion-ui-p1-p4/`
- P4 cards: `qa-artifacts/session-pricing-launch-v1/booking-session-cards-desktop-1280.png` · `…-mobile-390.png`
- External legal flags (non-blocking): `docs/governance/LEGAL_EXTERNAL_REVIEW_FLAGS_P0_2026-07-28.md`

## Explicit holds

- P5 Auth chrome · P6 Footer variants · P7 Navigation · P8 Visual system — ⏸ Remain on hold
- Full homepage rebuild — ⏸ Not authorised

## Related closed tracks

- Pre-Session Intake v1.1 · Easy Access — ✅ Accepted and Closed (`7c23421`)
- Client-facing Blueprint Integration Consultant title — ✅ Accepted and Closed (`64ee0af`)

## Still open (outside this scope)

1. External counsel on flagged legal items (tax, refunds, governing law, liability, retention periods)
2. Authorise P5–P8 when ready
