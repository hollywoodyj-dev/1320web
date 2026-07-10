# 1320 Commercial Report Blocks Schema v1.0

**Status:** Step 1 — locked schema (Nova implementation)  
**Governance:** Wisewave audit v1.0 / Tree  
**Implementation:** `lib/types/commercial-report-blocks.ts`, `lib/1320-v2/commercial-report-layer.ts`

---

## Layer model

```text
Symbolic Source Layer          ← existing `data/1320-v2/*.json` fields (preserve)
        ↓
Commercial Report Output Layer ← `commercial_report_blocks` per entry
        ↓
Rendered report surfaces       ← Full Report / Mobile / PDF / API
```

Nova **must not** overwrite symbolic source fields. Add or overlay `commercial_report_blocks` only.

---

## Required block keys (canonical)

| Key | Purpose |
|---|---|
| `opening_essence` | Warm narrative opening — direct “you” language |
| `how_this_may_show_up` | Lived expression / pattern recognition |
| `core_gift` | Strength / gift without ranking |
| `growth_edge` | Shadow / development edge without shame |
| `integration_key` | One-line integration anchor |
| `one_week_practice` | Practical 7-day oriented practice |
| `wisewave_reflection` | Closing reflective line |

Optional module-specific keys may appear **inside** `commercial_report_blocks` (e.g. S2 `recurring_relational_loop`). Nova renders known extras after the canonical seven when present.

---

## Entry envelope

```json
{
  "code": "S1-18",
  "display_name": "The Transformer",
  "commercial_report_blocks": {
    "opening_essence": "…",
    "how_this_may_show_up": "…",
    "core_gift": "…",
    "growth_edge": "…",
    "integration_key": "…",
    "one_week_practice": "…",
    "wisewave_reflection": "…"
  },
  "governance": {
    "non_predictive": true,
    "non_diagnostic": true,
    "non_ranking": true,
    "user_agency_required": true
  }
}
```

`display_name` overrides archetype title in commercial rendering when set.

---

## Renderer precedence (Nova)

1. Entry-level `commercial_report_blocks` on database row  
2. Overlay file `data/1320-v2/commercial-report-blocks-overlay.json` (sample / staged content)  
3. Legacy module blocks (`output_blocks` for S5, steward fields for S4–S9)  
4. Symbolic source fields (`origin_essence`, `reflective_summary`, etc.)

When (1) or (2) is present, segment `contentLayer` is `commercial`.

---

## Sample overlay

Wisewave sample patch lives at:

- `data/1320-v2/commercial-report-blocks-overlay.json`
- Source doc: `1320_REPORT_OUTPUT_QUALITY_SAMPLE_PATCH_v1.json`

Covers sample blueprint: `S1-18 / S3-03 / S2-27 / S0-07 / S4-14 / S6-28`.

---

## Related docs

- [Commercial Quality Audit](./1320_DATABASE_COMMERCIAL_QUALITY_AUDIT_v1.md)
- [Upgrade & Refinement Plan](./1320_DATABASE_UPGRADE_AND_REFINEMENT_PLAN_v1.md)
- [Content Database Index v2](./1320_Content_Database_Index_v2.md)
