# Page 08 · Integrated Soul Blueprint — Implementation Notes

**Component:** `components/full-report-v2/pages/page-08-integrated.tsx`  
**Builder:** `lib/full-report-v2/build-integrated-blueprint-page.ts`  
**Resolver:** `lib/full-report-v2/resolve-integrated-page-content.ts`

---

## Page type

This is an **integration page**, not a single-module page. Content combines **S1 + S3 + S2 + S0** via:

1. `generateIntegratedSoulBlueprint()` — canonical synthesis from steward fields  
2. `buildIntegratedBlueprintPageSlot()` — maps synthesis + module titles into Page 08 UI fields  

Do **not** read Page 08 copy from only one module database.

---

## Sample codes (`1980-05-22`)

| Layer | Code | Title |
|-------|------|-------|
| S1 | S1-18 | The Transformer |
| S3 | S3-03 | Explorer |
| S2 | S2-27 | The Soul Shock Mirror |
| S0 | S0-07 | Self-Worth Illusion |

---

## `integrated_blueprint` fields (NOVA)

| Field | Source |
|-------|--------|
| `archetype_title` | S1 + S3 title blend |
| `archetype_summary` | Four-code purpose line |
| `gift_1`–`gift_4` | S1/S2/S3/S0 steward strengths, lessons, guidance |
| `s1_expression` … `s0_expression` | Synthesis summaries (short) |
| `synergy_*` | Pairwise combination lines from steward data |
| `flow_*` | Per-module flow titles + steward path/lesson copy |
| `integration_guidance` | Integrated summary closing |
| `final_remembrance` | Fixed safe chrome |

Legacy fields (`core_essence`, `energy_expression`, etc.) remain for downstream use.

---

## Content policy

Page fields are **deterministically assembled** from approved steward content and synthesis templates — not free-form AI page copy.

Fixed chrome: hero, code role descriptions, “See It. Own It. Live It.” framing, `final_remembrance`.

---

## Payload

`buildSampleFullReportV2Payload()` populates `integrated_blueprint` when `get1320Content()` returns `integratedSoulBlueprint`.
