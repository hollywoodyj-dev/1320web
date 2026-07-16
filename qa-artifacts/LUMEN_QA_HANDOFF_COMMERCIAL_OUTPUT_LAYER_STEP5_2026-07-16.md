# Lumen QA Handoff — Commercial Output Layer Step 5B

**Date:** 2026-07-16  
**Prerequisite:** Step 5A `commercial-v3-final` integrated  
**Environment:** Production — https://www.1320soulcode.com (after deploy)

---

## Acceptance standard

> One Soul Blueprint. One commercial content layer. One Unified Report Renderer.  
> Four consistent product surfaces: Web, Mobile, PDF, Sample.

---

## QA birth-date matrix (10 dates)

| # | Birth date | URL params | Notes |
|---|------------|------------|-------|
| 1 | 1980-05-22 | `year=1980&month=5&day=22` | Step 4 reference |
| 2 | 1982-02-03 | `year=1982&month=2&day=3` | Step 4 set |
| 3 | 1977-11-12 | `year=1977&month=11&day=12` | Step 4 set |
| 4 | 1988-07-14 | `year=1988&month=7&day=14` | Step 4 set |
| 5 | 1990-03-09 | `year=1990&month=3&day=9` | Step 4 set |
| 6 | 2000-01-01 | `year=2000&month=1&day=1` | Year-start boundary |
| 7 | 1999-12-31 | `year=1999&month=12&day=31` | Year-end boundary |
| 8 | 2024-02-29 | `year=2024&month=2&day=29` | Leap day (modern) |
| 9 | 1960-02-29 | `year=1960&month=2&day=29` | Leap day (older) |
| 10 | 1970-01-01 | `year=1970&month=1&day=1` | Early modern baseline |

---

## Surfaces to test

### A. Web Full Report

- `/full-report-v2?year=&month=&day=` (sample)
- `/my-report/[id]` (entitled — requires account)

**Check:** commercial copy, segment order, locked preview on sample, no symbolic leak

### B. Mobile Full Report (390px)

- `/mobile-report-v2?year=&month=&day=` (sample)
- Phone UA → `/my-report/[id]` (entitled)

**Check:** Unified Report Renderer (17 pages), header logo, overview grid, swipe, no overflow

### C. PDF / Print

- `/sample-report/print?type=full`
- `/report/[id]/print` (entitled)
- Account download button

**Check:** portrait layout, pagination, commercial copy parity, no clip/leak

### D. Sample preview

- `reportType=sample` on all sample routes

**Check:** locked sections do not leak paid content; tone matches full report

---

## Pass criteria

- Same commercial content across Web / Mobile / PDF where access allows
- Foundation order: S1 → S3 → S2 → S0
- Advanced order: S4 → S5 → S6 → S7 → S8 → S9
- Tail pages intact
- No source-layer template language where commercial blocks exist
- No S6/S7/S8/S9 governance violations
- Sample does not leak full paid sections
- Mobile: no overflow; PDF: clean pagination
- Smoke suite passes

---

## Pre-flight commands

```bash
npm run smoke:commercial-overlay
npm run smoke:v2-get-content
npm run smoke:full-report-v2-sample
npm run smoke:report-system
npm run smoke:report-pdf
```

---

## Nova Step 5A completion notes

- Package script: `npm run package:commercial-v3-final`
- Runtime version: `commercial-v3-final`
- Report pages: **17** (unified renderer — not legacy 32-page swipe)
