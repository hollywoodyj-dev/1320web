# Lumen QA — Unified Report Renderer v1.0 (Foundation)

**Date:** 2026-07-14  
**Spec:** `web/docs/specs/1320_UNIFIED_REPORT_RENDERER_SPEC_v1.md`  
**Implementation:** Nova Step 1–2 foundation + preview routes  
**Status:** READY FOR LUMEN REVIEW  

## Scope (this commit)

- `lib/report-system/` — page map, access rules, builders, content normalization
- `components/report-system/` — ReportRenderer + shared components
- `styles/report-system/` — tokens + web/mobile/pdf CSS
- Preview routes:
  - `/report-system-preview?type=sample|full&surface=web|mobile|pdf`
  - `/report-system-preview/print?type=sample|full` (PDF HTML surface)

## Not yet migrated (Steps 3–6)

- Production `/full-report-v2` still uses legacy `FullReportV2Viewer`
- Production `/mobile-report-v2` still uses legacy mobile swipe viewer
- PDF API route (`/api/report/[reportId]/pdf`) not yet wired

## Lumen Checklist (foundation)

| Check | Expected |
|-------|----------|
| Page map order | S1→S3→S2→S0 then S4–S9 then tail |
| Sample access | S4–S9 + practice/journal/closing locked preview |
| Commercial blocks | Segment cards from overlay where available |
| S6 language | Value & Receiving preserved |
| S7 governance | No %/score/rank in normalized blocks |
| Web surface | 2-column cards, spacious pages |
| Mobile surface | Single column + prev/next nav |
| PDF surface | 1600×900 pages, print CSS |

## Commands

```bash
npm run build
npm run smoke:report-system
npm run smoke:commercial-overlay
```

## Preview URLs (local)

- Sample web: `/report-system-preview?type=sample&surface=web`
- Full mobile: `/report-system-preview?type=full&surface=mobile`
- Full PDF HTML: `/report-system-preview/print?type=full`

## Verdict

**PASS WITH NOTES** — unified renderer foundation passes build, smoke, and production preview QA.

## Lumen QA Result

### Command checks

- `npm run build` — PASS
- `npm run smoke:report-system` — PASS (`pages=17 sampleLocked=9`)
- `npm run smoke:commercial-overlay` — PASS

### Production preview checks

Checked deployed preview routes on `https://www.1320soulcode.com`:

- Sample web: `/report-system-preview?type=sample&surface=web`
- Full mobile: `/report-system-preview?type=full&surface=mobile`
- Full PDF HTML: `/report-system-preview/print?type=full`

Evidence:

- Sample web rendered `17` `.report-page` entries and `9` `.locked-preview-block` entries.
- Page order matched canonical map: `cover`, `blueprint-overview`, `s1-origin`, `s3-vibration`, `s2-mirror`, `s0-void`, `integrated-foundation`, `s4-shadow`, `s5-mission`, `s6-value`, `s7-sovereignty`, `s8-contribution`, `s9-return`, `seven-day-practice`, `reflection-journal`, `closing-reflection`, `final-disclaimer`.
- Sample locked pages matched expected preview locks: `s4-shadow`, `s5-mission`, `s6-value`, `s7-sovereignty`, `s8-contribution`, `s9-return`, `seven-day-practice`, `reflection-journal`, `closing-reflection`.
- Full mobile rendered `data-surface="mobile"`, one active page at a time, no locked preview blocks, single-column card grid (`326px`), and visible Prev/Next navigation.
- Stepping through full mobile Prev/Next produced the same 17-page order as web/PDF.
- PDF HTML rendered `data-surface="pdf"`, `17` pages, no locked preview blocks, first page box `1600 x 900`, and loaded print CSS with `@page { size: 1600px 900px; margin: 0px; }`.
- Full-mode S6 preserved `Value & Receiving` language.
- Full-mode S7 text did not contain percentage, percent, score, ranking, ranked, or rank language.
- Production full/PDF text scan found no source-layer/template leak terms such as `commercial_report_blocks`, `source-layer`, `symbolic source`, `source fallback`, `output_blocks`, or `steward fields`.
- Web surface rendered spacious two-column report cards at desktop width (`493px 493px` grid columns).

Screenshots saved:

- `qa-artifacts/unified-renderer-sample-web-prod-20260714.png`
- `qa-artifacts/unified-renderer-full-mobile-prod-20260714.png`
- `qa-artifacts/unified-renderer-pdf-html-prod-20260714.png`

### Notes

- This pass verifies the new preview foundation only.
- `/full-report-v2` and `/mobile-report-v2` remain legacy viewers by design for this step.
- PDF download API wiring remains out of scope for this pass.
