# Full Report Spec Package — Index

**Status:** Complete (6/6 deliveries + Page 00 & 01 UI). Ready for implementation planning.

## Documents

| File | Delivery |
|------|----------|
| `FULL_SOUL_ORIGIN_REPORT_V1_SPEC_SUMMARY.md` | Master summary + deltas vs codebase |
| `NOVA_IMPLEMENTATION_CHECKLIST_v1.md` | Nova build checklist |
| `LUMEN_QA_PROTOCOL_v1.md` | Per-report QA gate |

## UI reference templates (`ui/`)

| Page | HTML | Spec | Reference image |
|------|------|------|-----------------|
| 00 Cover | `page_00_cover.html` | `UI_PAGE_00_COVER_SPEC.md` | `reference-00-cover.png` |
| 01 Opening | `page_01_opening_note.html` | `UI_PAGE_01_OPENING_SPEC.md` | `reference-01-opening.png` |
| 02–18 | Pending implementation from delivery 2 page specs | — | — |

## Pagination convention

- **19 pages total:** indices **00–18**
- **Cover = 00** (no “of N” on cover template)
- **Inner pages 01–18** display as `NN of 18`

## Implementation status

| Phase | Status |
|-------|--------|
| **1 Foundation** | Done — theme, components, sample payload |
| **2 Core pages 00–01** | Done — `/full-report-v2` |
| **2 Core pages 02–03** | Next — Blueprint + Calculation |

## Reconciliation items (resolve at build)

- S5 page: 7 DB blocks (delivery 1) vs composed S1/S2/S3/S0 layout (delivery 2)
- 7-day practice day names: delivery 1 vs delivery 2 labels
- S3/S5 content file count ranges in delivery 2 vs calc mod ranges
