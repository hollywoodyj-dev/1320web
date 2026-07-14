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

**PENDING LUMEN SIGN-OFF** — foundation scaffold ready; production migration is next phase.
