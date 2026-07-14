# 1320 Unified Report Renderer Spec v1.0

**Document Type:** Frontend Architecture / Report Rendering / PDF Consistency Spec  
**Version:** v1.0  
**Status:** Ready for Nova Implementation  
**Target Site:** 1320soulcode.com  
**Primary Surfaces:** Sample Report, Full Report, Mobile Report, Downloadable PDF  
**Owner:** Tree / 信伊咲  
**Implementation Owner:** Nova  
**QA Owner:** Lumen  

## Executive Directive

Stop maintaining Sample Report, Full Report, Mobile Report, and PDF as separate layout systems.

```
Canonical Report Data → Report Page Map → Shared Report Components → Surface Adapter (Web | Mobile | PDF)
```

**Goal:** Same content, section order, hierarchy, visual language, and component logic — with surface-appropriate layout adaptation.

## Core Product Rule

| Surface | Implementation |
|---------|----------------|
| Sample Report | Full Report Renderer + Preview Mode + Access Rules |
| Full Report | Full Report Renderer + Full Access + S0–S9 + tail pages |
| PDF | Full Report Renderer + PDF Surface + Print CSS |
| Mobile | Full Report Renderer + Mobile Surface + card layout + navigation |

## File Structure

```
components/report-system/   — ReportRenderer, ReportRoot, ReportPage, shared UI
lib/report-system/          — page map, access, builders, normalize
styles/report-system/       — tokens, web/mobile/pdf/print CSS
```

## Renderer API

```tsx
<ReportRenderer reportType="sample" | "full" surface="web" | "mobile" | "pdf" data={canonicalReport} />
```

## Data Priority

1. commercial_report_blocks  
2. overlay commercial blocks  
3. S5 output_blocks / steward fields  
4. symbolic source fallback  

Do not overwrite symbolic source. Do not expose source-layer template language when commercial blocks exist.

## Report Order

Foundation: **S1 → S3 → S2 → S0**, then **S4 → S5 → S6 → S7 → S8 → S9**, then practice / journal / closing / disclaimer.

See `lib/report-system/report-page-map.ts` for `FULL_REPORT_PAGE_MAP` and `lib/report-system/report-access.ts` for `SAMPLE_REPORT_ACCESS`.

## Implementation Steps

1. Report System Foundation (components, tokens, types)  
2. Report Page Map + access rules  
3. Refactor Web Full Report → `ReportRenderer` surface=web  
4. Refactor Sample Report → reportType=sample + locked previews  
5. Refactor Mobile Report → surface=mobile  
6. PDF surface + `/report/[reportId]/print` + PDF API  
7. QA regression (5+ birth dates, Web/Mobile/PDF parity)  

## Final Principle

> One Soul Blueprint. One Report System. Three beautiful formats.
