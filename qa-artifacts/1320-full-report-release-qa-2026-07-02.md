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
| 5 Checkout/access | BLOCKED LOCALLY | Local `/checkout` shows `Checkout Not Yet Live`; `POST /api/checkout` returns controlled `503` without local Stripe env; `/checkout/status?session_id=cs_test_missing` remains pending; `/my-report` requires magic-link sign-in. Hosted Stripe test-mode checkout still required. |
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

---

## Overall verdict

| Status | Notes |
|--------|-------|
| **PASS WITH CHECKOUT NOTE** | Full Report content, renderer parity, ethical language, and cross-surface code consistency passed. Public paid release still requires hosted Stripe test-mode checkout/access verification before live commerce switch. |
