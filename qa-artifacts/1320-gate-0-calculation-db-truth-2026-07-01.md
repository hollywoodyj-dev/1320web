# 1320 Gate 0 QA - Calculation & DB Truth

Date: 2026-07-01  
Tester: Lumen  
Scope: Gate 0 only: calculation accuracy, database retrieval, payload/module integrity.  
Out of scope: visual layout, free-report conversion quality, ethical language review, red-team conversation safety.

## Verdict

PASS.

No calculation, mapping, payload, or database retrieval failures found in this Gate 0 pass.

## Automated Smoke Suite

Run from `C:\github\1320-website\web`.

| Check | Result | Notes |
|---|---|---|
| `npm run smoke:v2-calculation` | PASS | S0-S9 chain passed for canonical dates. |
| `npm run smoke:v2-content` | PASS | Database index coverage and canonical lookup passed. |
| `npm run smoke:full-report-v2-sample` | PASS | `S1-18|S3-03|S2-27|S0-07`, modules=10. |
| `npm run smoke:full-report-payload` | PASS | Full payload shape passed: full=41 screens, advanced=47. |
| `npm run smoke:result-1977` | PASS | `S1-24 / S3-04 / S2-23 / S0-09`; theme: `Radiate without performing.` |

## Canonical Date Payload Audit

Additional resolver/payload audit checked:

- `calculate1320Code(...)`
- `buildSampleFullReportV2Payload(...)`
- `payload.calculation.combination_signature`
- `payload.modules.s0` through `payload.modules.s9`
- Each module slot has expected code and a title/archetype.
- Main detail field exists for all non-S3 modules checked by this audit.

| Birth date | Result | Core signature | S4-S9 |
|---|---|---|---|
| `1980-05-22` | PASS | `S1-18|S3-03|S2-27|S0-07` | `S4-14 S5-04 S6-28 S7-00 S8-00 S9-07` |
| `1988-07-14` | PASS | `S1-26|S3-03|S2-21|S0-18` | `S4-19 S5-06 S6-03 S7-02 S8-03 S9-04` |
| `1977-11-12` | PASS | `S1-24|S3-04|S2-23|S0-09` | `S4-12 S5-07 S6-37 S7-00 S8-04 S9-01` |
| `1982-02-03` | PASS | `S1-20|S3-01|S2-05|S0-05` | `S4-10 S5-26 S6-26 S7-01 S8-05 S9-04` |
| `2000-02-29` | PASS | `S1-02|S3-02|S2-31|S0-15` | `S4-06 S5-35 S6-19 S7-01 S8-07 S9-07` |

## Gate 0 Notes

- Leap-day sanity date `2000-02-29` passed.
- No hallucinated or missing module titles surfaced in payload audit.
- No incorrect S3 raw/UI-code leakage surfaced in this Gate 0 pass.
- This does not override the separate mobile detail-parity finding in `qa-artifacts/1320-web-mobile-detail-content-diff-2026-07-01.md`; Gate 0 is about truth/calculation/retrieval, not content parity across surfaces.

## Next Gate

Recommended next gate: Gate 1 Phase 1 MVP Free Report QA:

1. Landing page to birth-date entry.
2. Free report correctness and trust/curiosity balance.
3. Upgrade motivation.
4. Upgrade/checkout path sanity.
