# Full Report Release QA - Session

**Date:** 2026-07-02  
**Tester:** Lumen  
**Scope:** Final one-Full-Report release QA for Sections 1-6  
**Checklist:** `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md`

---

## Section 1 - Automated regression

**Result: PASS** via `npm run smoke:release-qa`, rerun after Lumen release-QA fixes.

| Step | Command | Result |
|------|---------|--------|
| 1.1 | `npm run build` | PASS |
| 1.2 | `npm run smoke:report-canonical` | PASS |
| 1.3 | `npm run smoke:report-parity` | PASS - content 0, experience 0 |
| 1.4 | `npm run smoke:report-parity -- --enforce-priority=2` | PASS |
| 1.5 | `audit-experience-gaps` | PASS - 0 actionable |
| 1.6 | `smoke:v2-calculation` | PASS |
| 1.7 | `smoke:v2-content` | PASS |
| 1.8 | `smoke:full-report-v2-sample` | PASS |
| 1.9 | `smoke:full-report-payload` | PASS |
| 1.10 | `smoke:result-1977` | PASS |

---

## Sections 2-6 - Lumen manual

| Section | Result | Notes |
|---------|--------|-------|
| 2 Desktop full walkthrough | PASS | Pages 00-18 checked for `1980-05-22` and `1982-02-03`; codes/titles matched expected truth; practice, journal, closing, and disclaimer present; no horizontal overflow or source/template leaks after S6 sanitizer fix. |
| 3 Mobile full walkthrough | PASS | `390x844` text/DOM pass checked both canonical dates; expected codes/titles present; no horizontal overflow; pages 01-32 detected plus cover content; agency, practice, journal, closing, and final disclaimer present; public-string scan clean. |
| 4 Gate 2 ethical language | PASS | Mobile disclaimer/final-disclaimer plus desktop closing/final disclaimer preserve symbolic/reflection framing, agency, and professional-boundary language; no deterministic, diagnostic, or internal QA strings found. |
| 5 Checkout/access | PASS (hosted, Stripe test mode) | Hosted checkout, payment, `/checkout/status` fulfillment, `/my-report/[reportId]` Full Report v2 access, and magic-link return verified in Stripe **test mode**. Live Stripe switch remains a separate go-live step. |
| 6 Cross-surface consistency | PASS | Result, desktop, and mobile for both canonical dates showed expected S1/S3/S2/S0 codes and titles; no `Raw Value`, `Who You Attract`, `NOVA should`, old source-language, `the user`, `user's`, `you's`, `undefined`, or `null` in final public-string scan. |

### Canonical URLs checked

```text
/result?year=1980&month=5&day=22
/full-report-v2?year=1980&month=5&day=22
/mobile-report-v2?year=1980&month=5&day=22

/result?year=1982&month=2&day=3
/full-report-v2?year=1982&month=2&day=3
/mobile-report-v2?year=1982&month=2&day=3
```

### Fixes applied during release QA

- Desktop S6 page 11 sanitized visible `old money-language source` / `NOVA should` copy.
- Shared and mobile report resolvers now apply customer-facing sanitizer to remove `the user`, `user's`, and `you's` style output.
- Free result S3 label changed from `Raw Value` to `Expression Index`.
- Free result S2 short label changed from `Who You Attract` to `Relationship Mirror`.

### Post-QA fixes (before Gate 5 close)

- Paid `/my-report/[reportId]` now serves Full Report v2 (was legacy v1 viewer).
- Page 08 Life Purpose Flow arrow encoding fixed (`\2192` CSS).

---

## Gate 5 — Hosted Stripe test mode (verified)

| Check | Result |
|-------|--------|
| `/checkout` live with Stripe test keys | PASS |
| Test payment (`4242…`) | PASS |
| `/checkout/success` + status polling | PASS |
| `/my-report/[reportId]` entitled access | PASS |
| Magic-link return | PASS |

**Mode:** Stripe test mode only. Live commerce requires separate `sk_live_` + live webhook switch.

## Overall verdict

| Status | Notes |
|--------|-------|
| **QA PASS** | Gates 0–5 complete for Stripe **test mode**. Full Report content, parity, ethical language, cross-surface consistency, and hosted checkout/access verified. **Live** Stripe switch is a separate go-live decision. |
