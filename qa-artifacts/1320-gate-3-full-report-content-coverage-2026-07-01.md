# 1320 Gate 3 QA - Full Report Content Coverage

Date: 2026-07-01  
Tester: Lumen  
Baseline birth date: `1982-02-03`  
Desktop route: `/full-report-v2?year=1982&month=2&day=3`  
Mobile route: `/mobile-report-v2?year=1982&month=2&day=3`  
Scope: Full-report content coverage, desktop/mobile parity, missing content risk, and duplicate-content watchpoints.  
Out of scope: visual polish of every scroll position, checkout, and conversational red-team safety.

## Verdict

FAIL - CONTENT PARITY, if paid mobile must contain the same substantive report detail as desktop.

PASS ONLY IF PRODUCT DECIDES MOBILE IS AN INTENTIONALLY CONDENSED REPORT.

The system is technically rendering valid desktop and mobile report experiences:

- Desktop has `19` registered full-report pages: `00` through `18`.
- Mobile has `33` swipe panels: `00` through `32`.
- Core S0-S9 codes and titles match between desktop and mobile for `1982-02-03`.
- Smoke tests passed:
  - `npm run smoke:full-report-payload`
  - `npm run smoke:full-report-v2-sample`

But the detail content is not equivalent. Mobile is currently an adapted/condensed report, not a full content-equivalent mobile layout.

## Important Screenshot Note

Mobile screenshots are viewport captures only. Many mobile pages have inner scroll areas, so a single screenshot does not prove full-page content coverage.

For Gate 3, the content verdict is based on:

- route/component structure checks,
- live mobile DOM confirmation that all `33` panels render,
- existing resolver-level page-by-page diff,
- payload smoke tests.

The earlier diff remains valid because it compared content fields, not only screenshots.

Reference artifact:

`qa-artifacts/1320-web-mobile-detail-content-diff-2026-07-01.md`

## Evidence Checked

| Check | Result | Notes |
|---|---|---|
| Desktop route loads | PASS | Desktop viewer rendered `/full-report-v2?year=1982&month=2&day=3`. |
| Mobile route loads | PASS | Mobile viewer rendered `/mobile-report-v2?year=1982&month=2&day=3`. |
| Desktop page registry | PASS | `page-00-cover` through `page-18-disclaimer`. |
| Mobile panel registry | PASS | `mobile-page-00-cover` through `mobile-page-32-final-disclaimer`. |
| Payload smoke | PASS | `full=41 screens`, `advanced=47`. |
| Full Report v2 sample smoke | PASS | `S1-18|S3-03|S2-27|S0-07`, `modules=10`. |
| Codes/titles parity | PASS | S0-S9 code/title content aligns. |
| Detail parity | FAIL | Mobile omits or replaces many desktop detail fields. |

## Page Coverage Summary

| Desktop page | Mobile page(s) | Gate 3 result |
|---|---|---|
| 00 Cover | 00, 03 | Mostly relocated |
| 01 Opening | 01, 05 | Partial |
| 02 Dimensions | 04, 05 | Partial |
| 03 Signature | 03, 04 | Mostly aligned |
| 04 S1 | 06, 07 | Partial |
| 05 S3 | 08, 09 | Partial |
| 06 S2 | 10, 11 | Partial |
| 07 S0 | 12, 13 | Partial |
| 08 Integrated | 14, 15 | Mostly aligned, small gaps |
| 09 S4 | 16, 17 | Mostly aligned, small gaps |
| 10 S5 | 18, 19 | Partial |
| 11 S6 | 20, 21 | Major gap |
| 12 S7 | 22, 23 | Major gap |
| 13 S8 | 24, 25 | Major gap |
| 14 S9 | 26, 27 | Major gap |
| 15 Practice | 28, 29 | Major gap |
| 16 Journal | 30 | Major gap |
| 17 Closing | 31 | Major gap |
| 18 Disclaimer | 02, 32 | Major gap |

## Highest-Risk Missing Content

### 1. Practice Pages

Severity: Release blocker if mobile is paid full report.

Desktop practice contains personalized/day-specific fields:

- `purpose`
- `openingReminder`
- day focus
- day practice
- day reflection

Mobile practice currently uses a more generic 7-day journey. The desktop personalized practice day fields are not represented with parity.

### 2. Journal Page

Severity: Release blocker if mobile is paid full report.

Desktop journal contains:

- reflection rationale,
- multiple journal guidelines,
- personalized prompt cards across layers.

Mobile journal is simplified and does not carry the same personalized prompt-card set.

### 3. Closing Page

Severity: Major.

Desktop closing includes fuller completion/remembrance copy, seal-node copy, and multiple `remember` items.

Mobile closing is shorter and loses the richer integration/completion language.

### 4. Disclaimer Page

Severity: Major to legal/product blocker.

Desktop disclaimer contains fuller interpretive and professional-boundary language around:

- symbolic interpretation,
- fixed identity,
- fate,
- diagnosis,
- life decisions,
- professional advice.

Mobile has a disclaimer snapshot plus final disclaimer, but not the full desktop legal/interpretive detail.

### 5. S6-S9 Expansion Modules

Severity: Major.

Mobile S6-S9 carries the high-level module framing, codes, and titles, but omits much of the desktop detail:

- second essence paragraphs,
- `shows up` fields,
- map-node copy/fullCopy,
- life influence details,
- several reflection details.

This makes the later transformation layers feel thinner on mobile than desktop.

## Duplicate Watchpoints

Some repetition may be intentional because mobile splits one desktop page across two pages. Still, these should be reviewed:

- S1 reveal/essence meaning repeats.
- S3 reveal/expression meaning repeats.
- S2 mirror line and emotional reaction phrase repeat.
- S0 breathing/separation practice repeats in multiple fields.
- S4 practice copy repeats.
- S5 mission line repeats as icon/pathway text.
- S8 contribution essence repeats.
- S9 return essence repeats.

## Product Decision Needed

Gate 3 cannot be resolved by QA alone. Chino/Nova need to choose one rule:

### Option A - Full Parity

Mobile is the same paid report content, redesigned for a phone.

If this is the rule, current Gate 3 verdict is:

`FAIL - CONTENT PARITY`

Required fix:

- every substantive desktop field must appear somewhere in mapped mobile pages,
- mobile may restructure/split content, but should not silently omit paid report detail.

### Option B - Adapted Mobile

Mobile is intentionally shorter and more guided.

If this is the rule, current Gate 3 verdict becomes:

`PASS WITH DOCUMENTED PRODUCT DIFFERENCE`

Required fix:

- document that mobile is condensed,
- decide what mobile users receive instead of omitted desktop content,
- avoid selling it as the same full-detail report unless the difference is clear.

## Recommended Fix Order

1. Decide parity rule first.
2. If full parity: fix tail pages first:
   - Practice
   - Journal
   - Closing
   - Disclaimer
3. Fix S6-S9 expansion modules next.
4. Fix smaller gaps in S1/S3/S2/S0/S4/S5/integrated pages.
5. Add a parity smoke test:
   - map desktop page ids to mobile page ids,
   - define required shared fields,
   - allow explicit intentional omissions,
   - ignore image URLs, alt text, decorative labels, and static chrome.

## Final Gate 3 Decision

Gate 3 is not clean for a paid full-report release if desktop and mobile are meant to deliver the same substantive content.

Current mobile is valid as a mobile preview/adapted report, but not as a content-equivalent full report.
