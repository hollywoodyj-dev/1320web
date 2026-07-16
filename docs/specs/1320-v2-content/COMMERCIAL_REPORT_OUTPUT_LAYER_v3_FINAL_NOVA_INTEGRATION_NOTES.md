# Commercial Report Output Layer — v3 Final Nova Integration Notes

**Version:** `commercial-v3-final`  
**Date:** 2026-07-16

---

## Runtime import

```ts
// lib/1320-v2/commercial-report-layer.ts
import overlayData from "@/data/1320-v2/commercial-report-blocks-overlay-v3-final.json";
```

**Version constant:** `COMMERCIAL_LAYER_VERSION = "commercial-v3-final"`  
(`lib/types/commercial-report-blocks.ts`)

---

## Renderer precedence

1. Entry-level `commercial_report_blocks` (if present on v2 database row)
2. **Overlay file** — `commercial-report-blocks-overlay-v3-final.json`
3. S5 `output_blocks` / steward fields (legacy)
4. Symbolic source fields (fallback only)

**Rule:** Do not overwrite symbolic source JSON files. Do not expose internal governance fields or source-layer template language in paid report surfaces when commercial blocks exist.

---

## Report surfaces (Unified Report Renderer)

| Surface | Component | Route examples |
|---------|-----------|----------------|
| Web | `ReportRenderer surface="web"` | `/full-report-v2`, `/my-report/[id]` |
| Mobile | `ReportRenderer surface="mobile"` | `/mobile-report-v2`, phone → `/my-report/[id]` |
| PDF | `ReportRenderer surface="pdf"` | `/report/[id]/print`, `/sample-report/print` |
| Sample | `reportType="sample"` + locked previews | Same routes with access rules |

**Page map:** 17 pages — `lib/report-system/report-page-map.ts`  
**Access rules:** `lib/report-system/report-access.ts`  
**Content normalization:** `lib/report-system/normalizeReportContent.ts`

---

## Sample vs full access

- **Sample (`reportType="sample"`):** S1–S0 + foundation integration open; S4–S9 + tail pages show locked previews
- **Full (`reportType="full"`):** All S0–S9 commercial blocks where entitled; tail pages fully open
- Sample must **not** leak full paid commercial copy for locked sections

---

## Validation commands (Step 5A)

```bash
npm run package:commercial-v3-final   # regenerate + validate package
npm run smoke:commercial-overlay
npm run smoke:v2-get-content
npm run smoke:full-report-v2-sample
npm run smoke:report-system
npx tsc --noEmit
npm run build
```

---

## Archive layout

```
data/1320-v2/
  commercial-report-blocks-overlay-v3-final.json   ← runtime overlay
  commercial-overlay/v3-final/
    s0-commercial-report-blocks-v3-final.json
    … s9-commercial-report-blocks-v3-final.json
  _manifest.json                                   ← commercial-v3-final metadata
```

Step 2/3/4 working folders remain as historical provenance only — **runtime does not depend on them**.

---

## Step 5B handoff

Lumen QA artifact target: `qa-artifacts/LUMEN_QA_COMMERCIAL_OUTPUT_LAYER_STEP5_2026-07-16.md`  
10 birth dates × Web / Mobile / PDF / Sample surfaces.
