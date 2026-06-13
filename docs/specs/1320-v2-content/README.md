# 1320 S0–S9 v2 content pack (repo lock)

Phase 0 copies **spec and index files** into this folder. Full content JSON databases are imported in Phase 2 to `web/data/1320-v2/` (one S7 file is present now for `/sample-report-v2` smoke).

## Locked decisions (2026-06-14)

| Topic | Decision |
|-------|----------|
| S5 source | `1320_S5_Soul_Mission_Content_Database_v4_EN.json` |
| S4 filename | Use `1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.json` (index v2 line was stale) |
| S8/S9 | Phase 2B — Advanced tier, not deferred |
| Cutover | `USE_1320_V2_CONTENT` env flag (v1 `data/1320` until enabled) |
| Full report UI | New UI later; `/sample-report-v2` = minimal v2 content test pages |
| S7 art | Full-report background PNGs (`public/full-report/backgrounds/`), not marketing pages |

## Report tiers (spec)

| Tier | Modules |
|------|---------|
| Free Detailed Report | S0–S4 + reflection + practices |
| Full Soul Reflection Report | S0–S7 + integration summary + reflection + practices |
| Advanced Integration Report | S0–S9 |

## Calculation order (v2)

`S1 → S2 → S3_raw → S3 → S0 → S4 → S5 → S6 → S7 → S8 → S9`

See `NOVA_Master_Calculation_Logic_v2.md` for formulas and zero rules.

## Files in this folder

| File | Role |
|------|------|
| `1320_Content_Database_Index_v2.json` | Module index + rendering fields (S4 corrected) |
| `1320_Content_Database_Index_v2.md` | Human-readable index |
| `NOVA_Master_Calculation_Logic_v2.md` / `.json` | Calculation spec |
| `NOVA_Anti_Drift_Report_Rendering_Rules_v1.md` | NOVA rendering safety |
| `1320_Master_System_ReAlignment_Pack_v2.md` | System realignment notes |
| `1320_Master_System_Architecture_v2.md` | Architecture overview |
| `IMPLEMENTATION_PHASES.md` | Build phases for engineering |
| `CONTENT_DATABASE_MANIFEST.md` | Per-module file manifest |
