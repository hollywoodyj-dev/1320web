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

## Step 3 — Production Web Migration (2026-07-14)

- `/full-report-v2` now uses `UnifiedReportWebShell` + `ReportRenderer` with `reportType="sample"` and `surface="web"`.
- `/my-report/[reportId]` (entitled) uses `reportType="full"` with close link to `/account`.
- Legacy `FullReportV2Viewer` retained in codebase for reference; no longer mounted on production web routes.
- Mobile sample still redirects to `/mobile-report-v2` (Step 5).

## Step 5 — Production Mobile Migration (2026-07-14)

- `/mobile-report-v2` now uses `UnifiedReportMobileShell` + `ReportRenderer` with `reportType="sample"` and `surface="mobile"`.
- Mobile navigation: Prev/Next buttons, horizontal swipe, sessionStorage page index persistence.
- Legacy `MobileReportV2Viewer` (32-page swipe) retained in codebase; no longer mounted on production mobile sample route.
- `/my-report/[reportId]` on mobile still uses web unified renderer until entitled mobile path is added.

## Step 6 — PDF Surface + Download API (2026-07-14)

- Print HTML routes:
  - `/sample-report/print?type=full|sample`
  - `/report/[reportId]/print` (entitled, session required)
  - `/report-system-preview/print` (dev preview, unchanged path)
- PDF download API:
  - `/api/report/sample/pdf?type=full|sample`
  - `/api/report/[reportId]/pdf` (entitled, forwards session cookie to Chromium)
- Shared print document: `UnifiedReportPrintDocument` + `ReportRenderer surface="pdf"`
- PDF generation: `puppeteer-core` + `@sparticuz/chromium` (or `PUPPETEER_EXECUTABLE_PATH` locally)

### Lumen Step 5 Re-check

**Verdict:** PASS WITH NOTES — production `/mobile-report-v2` now uses the unified sample mobile renderer and passes the requested Step 5 checks. Entitled `/my-report/[reportId]` mobile remains out of scope for this pass.

Command checks on commit `aee2308`:

- `npm run build` — PASS
- `npm run smoke:report-system` — PASS (`pages=17 sampleLocked=9`)
- `npm run smoke:commercial-overlay` — PASS

Production `/mobile-report-v2` at 390px width:

- PASS: rendered `.report-root` with `data-surface="mobile"` and `data-report-type="sample"`.
- PASS: `UnifiedReportMobileShell` sample banner visible: `Sample report — S1–S0 open. Advanced sections show locked previews until you unlock the Full Report.`
- PASS: one active `.report-page` at a time with single-column card grid (`346px` at 390px viewport).
- PASS: Prev/Next navigation visible; first page disables Prev and enables Next.
- PASS: full Prev/Next walk produced the same 17-page order as web sample: `cover`, `blueprint-overview`, `s1-origin`, `s3-vibration`, `s2-mirror`, `s0-void`, `integrated-foundation`, `s4-shadow`, `s5-mission`, `s6-value`, `s7-sovereignty`, `s8-contribution`, `s9-return`, `seven-day-practice`, `reflection-journal`, `closing-reflection`, `final-disclaimer`.
- PASS: exactly 9 locked previews appeared: S4-S9 plus `seven-day-practice`, `reflection-journal`, and `closing-reflection`.
- PASS: horizontal swipe handler moved forward and backward (`s2-mirror` → `s0-void` → `s2-mirror`) using touch events.
- PASS: sessionStorage page persistence worked; stored index `4` survived reload and returned to `s2-mirror`.
- PASS: S6 locked preview preserved `Value & Receiving`.
- PASS: S7 locked preview did not contain `%`, percent, percentage, score, ranking, ranked, or rank language.
- PASS: no source-layer/template leak terms found.
- PASS WITH NOTE: mobile shell min-height matched viewport (`844px` in 390x844 test) and nav used bottom padding. Browser environment reported safe-area inset as `0px`, so physical-device notch inset was not separately validated.

Screenshots saved:

- `qa-artifacts/unified-step5-mobile-prod-cover-20260714.png`
- `qa-artifacts/unified-step5-mobile-prod-s7-locked-20260714.png`

### Lumen Step 3 Re-check

**Verdict:** PASS WITH NOTES — `/full-report-v2` sample migration passes; one S7 locked-preview copy issue was fixed locally and needs deploy; entitled `/my-report/[reportId]` full-renderer path still needs an authenticated magic-link session for product verification.

Production `/full-report-v2?view=desktop`:

- PASS: route rendered `UnifiedReportWebShell` + `ReportRenderer`.
- PASS: `data-report-type="sample"` and `data-surface="web"`.
- PASS: `17` scroll pages rendered in canonical order.
- PASS: `9` locked preview blocks rendered for S4-S9 plus practice / journal / closing.
- PASS: sample banner visible: `Sample report preview — foundation layers S1–S0 are open...`.
- PASS: desktop web card grid remained spacious two-column (`493px 493px` at 1440px viewport).
- PASS: no source-layer/template leak terms found.
- NOTE: deployed S7 locked preview text still contained `ranking or scores`. Lumen patched `lib/report-system/report-access.ts` locally to remove score/rank language and verified the corrected local route.

Local fixed `/full-report-v2?view=desktop` on `http://127.0.0.1:3016`:

- PASS: `17` pages, `9` locks, sample banner, canonical page map, and two-column grid preserved.
- PASS: S6 still contains `Value & Receiving`.
- PASS: S7 locked preview no longer contains `%`, percent, percentage, score, ranking, ranked, or rank language.
- PASS: no source-layer/template leak terms found.

`/my-report/fa695c92-8593-4cef-9c17-715de202a78b?view=desktop`:

- BLOCKED FOR PRODUCT VERIFICATION: production browser session is unauthenticated and correctly returned `Magic Link Required`.
- Code inspection confirms the entitled branch renders `UnifiedReportWebShell reportType="full"` with `closeHref="/account"`.
- Remaining product check: open an authenticated entitled report session and verify all 17 sections are open, no locked preview blocks appear, and close returns to `/account`.

Re-run commands after local S7 copy fix:

- `npm run smoke:report-system` — PASS (`pages=17 sampleLocked=9`)
- `npm run smoke:commercial-overlay` — PASS
- `npm run build` — PASS

Screenshots saved:

- `qa-artifacts/unified-step3-full-report-v2-prod-20260714.png`
- `qa-artifacts/unified-step3-my-report-prod-unauth-20260714.png`
- `qa-artifacts/unified-step3-full-report-v2-local-fixed-20260714.png`

### Lumen Step 6 Re-check

**Verdict:** PASS WITH NOTES - production sample PDF HTML and sample PDF download API pass. Entitled print/PDF routes remain blocked for product verification without an authenticated magic-link session, as expected.

Command checks on commit `1c46da2`:

- `npm run build` - PASS
- `npm run smoke:report-pdf` - PASS (`unifiedPages=17`)
- `npm run smoke:report-system` - PASS (`pages=17 sampleLocked=9`)

Production `/sample-report/print?type=full`:

- PASS: rendered `.report-root` with `data-surface="pdf"` and `data-report-type="full"`.
- PASS: rendered `17` `.report-page` entries in canonical order: `cover`, `blueprint-overview`, `s1-origin`, `s3-vibration`, `s2-mirror`, `s0-void`, `integrated-foundation`, `s4-shadow`, `s5-mission`, `s6-value`, `s7-sovereignty`, `s8-contribution`, `s9-return`, `seven-day-practice`, `reflection-journal`, `closing-reflection`, `final-disclaimer`.
- PASS: first PDF page box measured `1600 x 900`.
- PASS: print CSS loaded with `@page` size `1600px 900px` and zero margin.
- PASS: no report nav, site header/footer navigation, locked blocks, or visible CTA controls in the full PDF HTML surface.
- PASS: S6 full PDF page preserved `Value & Receiving`.
- PASS: S7 full PDF page did not contain `%`, percent, percentage, score, ranking, ranked, or rank language.
- PASS: no source-layer/template leak terms found.

Production `/sample-report/print?type=sample`:

- PASS: rendered `.report-root` with `data-surface="pdf"` and `data-report-type="sample"`.
- PASS: rendered `17` pages and exactly `9` locked preview blocks.
- PASS: locked previews matched S4-S9 plus `seven-day-practice`, `reflection-journal`, and `closing-reflection`.
- PASS: S6 locked preview preserved `Value & Receiving`.
- PASS: S7 locked preview did not contain `%`, percent, percentage, score, ranking, ranked, or rank language.
- PASS WITH NOTE: the DOM still contains nine `Unlock Full Report` anchors inside locked preview blocks, but `.report-print-document .locked-cta { display: none; }` and print media hide them, so they are not visible in the rendered/PDF output.

Production `/api/report/sample/pdf?type=full`:

- PASS: returned HTTP `200`.
- PASS: `Content-Type: application/pdf`.
- PASS: `Content-Disposition: attachment; filename="1320-sample-report-full.pdf"`.
- PASS: downloaded body begins with `%PDF-` and was `4,325,115` bytes.

Entitled routes:

- `/report/fa695c92-8593-4cef-9c17-715de202a78b/print` - blocked in unauthenticated browser session; expected secure access requirement.
- `/api/report/fa695c92-8593-4cef-9c17-715de202a78b/pdf` - returned HTTP `401` with `{"ok":false,"error":"unauthenticated"}`.
- Code inspection confirms the entitled PDF API checks report access, then forwards the request cookie to Chromium when generating `/report/[reportId]/print`.

Screenshots / files saved:

- `qa-artifacts/unified-step6-sample-print-full-prod-20260714.png`
- `qa-artifacts/unified-step6-sample-print-locked-prod-20260714.png`
- `qa-artifacts/unified-step6-sample-full-prod.pdf`
- `qa-artifacts/unified-step6-sample-full-prod.headers.txt`
- `qa-artifacts/unified-step6-entitled-unauth-pdf.headers.txt`
- `qa-artifacts/unified-step6-entitled-unauth-pdf.body`
