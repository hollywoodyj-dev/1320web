# Page 00 · Cover — UI Spec

**Delivery:** 5/6 (+ first of two page UI specs)  
**Status:** Reference only — do not implement until delivery 6/6 received.

| Asset | Path |
|-------|------|
| Reference mockup image | `ui/reference-00-cover.png` |
| Canonical HTML/CSS template | `ui/page_00_cover.html` |

---

## Critical implementation rule (founder)

**S0–S9 module wheel labels must be rendered in HTML/SVG/CSS — never baked into AI-generated images.**

- Background may use cosmic glow / star field imagery only.
- All module codes, names, and wheel structure must be **code output**.
- Prevents prior art-pack errors: **S6 missing**, **S8 duplicate**, **S1/S2 misplacement**, **S7 missing** in summary rows.

LUMEN should fail cover QA if wheel labels are image-only or module list incomplete.

---

## Canvas & layout

| Property | Value |
|----------|-------|
| Design canvas | **1600 × 900** (16:9) |
| Grid | 3 columns: `360px | 1fr | 380px` + footer row `132px` |
| Padding | `56px 72px 48px` |
| Mobile | Single column stack; wheel `scale(0.78)` below 1100px |

### Regions

1. **Left panel** — seal SVG, FULL / 1320 / SOUL ORIGIN REPORT, divider, description, brand lines
2. **Center panel** — module wheel (620×620) + core signature preview panel
3. **Right panel** — client card + “This Full Report Includes” module list
4. **Footer** — disclaimer + agency reminder (3-column: symbol | disclaimer | agency)

---

## Theme tokens (cover-specific)

Slightly deeper than delivery 2 defaults:

```css
--bg-deep: #050d19;
--bg-main: #081526;
--gold-bright: #f4d88a;
--panel: rgba(5, 14, 27, 0.68);
--panel-border: rgba(214, 181, 109, 0.38);
```

Display font: **Cormorant Garamond**; UI/body: **Inter / Avenir Next / Montserrat**.

---

## Module wheel — locked order

**Clockwise sequence:** `S9 → S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8`

| Node | Position (approx.) | Label |
|------|---------------------|-------|
| S9 | 12 o'clock | Return to Source |
| S0 | between S9 and S1 | Void Gate |
| S1 | right | Soul Origin |
| S2 | lower-right | Soul Mirror |
| S3 | bottom-right | Soul Vibration |
| S4 | bottom | Core Shadow Pattern |
| S5 | lower-left | Soul Mission |
| S6 | left lower | Value & Receiving |
| S7 | left | Soul Sovereignty |
| S8 | upper-left (before S9) | Soul Contribution |

Center hub: **1320** + **Soul Code** (not a module node).

Wheel structure: 4 concentric rings, cross axes, 10 `module-node` circles with icon + code + name.

CSS classes: `.node-s0` … `.node-s9` with absolute positions in `page_00_cover.html`.

---

## Dynamic fields

### Client / report (right card)

| Template | Source |
|----------|--------|
| `{{client.name}}` | Client name |
| `{{client.birth_date_display}}` | e.g. May 22, 1980 |
| `{{report.type}}` | e.g. Sample Full Report / Paid Full Report |
| `{{report.generated_by}}` | 1320 Soul Code System |
| `{{report.version}}` | Full Report v1.0 |
| `{{report.generated_date}}` · `{{report.generated_time}}` | Generation timestamp |

### Core signature preview (center, below wheel)

| Template | Notes |
|----------|-------|
| `{{calculation.s1.code}} \| {{calculation.s3.code}} \| {{calculation.s2.code}} \| {{calculation.s0.code}}` | Order **S1 \| S3 \| S2 \| S0** (not signature pipe order) |
| Sub-line | Each code + `{{calculation.sN.title}}` |

Canonical example: `S1-18 | S3-03 | S2-27 | S0-07`

### Static (not dynamic)

- Left description: “10 core dimensions…”
- Brand lines: mirror + not your fate
- Module list S0–S9 in includes card (fixed labels)
- Footer disclaimer text

---

## Reference mockup vs HTML template

Mockup sample data: **Mira Solen**, **1980-05-22**, signature **S1-18 | S3-03 | S2-27 | S0-07**.

Mockup bottom “includes” row showed **S7 missing** in icon strip — HTML template uses full **10-item list**; implementation must show **all S0–S9**.

---

## React mapping (when implementing)

| Spec component | Suggested implementation |
|----------------|--------------------------|
| `ReportPage` | Full-report cover route/screen wrapper |
| `ModuleWheel` | Dedicated component; all 10 nodes from data array |
| `GlassPanel` / client card | Right panel cards |
| `DisclaimerBox` | Footer |
| `CodeCard` | Signature preview panel |

Do not reuse old art-pack `01-cover.png` as primary web cover.

---

## LUMEN cover QA (from delivery 4)

- [ ] Client name + birth date present
- [ ] S0–S9 wheel present with all 10 modules labeled in code
- [ ] “Not Your Fate. Your Mirror.” visible
- [ ] Footer disclaimer present
- [ ] No `{{...}}` placeholders
- [ ] Dark cosmic theme (not cream primary)
- [ ] Signature matches calculation QA
