# Page 01 · Opening Note + Disclaimer — UI Spec

**Delivery:** 6/6 (+ second of two page UI specs)  
**Status:** Spec package **complete** — see `FULL_SOUL_ORIGIN_REPORT_V1_SPEC_SUMMARY.md` for implementation delta.

| Asset | Path |
|-------|------|
| Reference mockup | `ui/reference-01-opening.png` |
| Canonical HTML/CSS | `ui/page_01_opening_note.html` |

---

## Critical implementation rule (founder)

**Fixed text only — no personalized interpretation on this page.**

All copy is static approved language. Do not inject user codes, module content, or synthesized insights here.

---

## Page numbering

| Report section | Index | Header display |
|----------------|-------|----------------|
| Cover | **00** | No “of N” badge on cover template |
| **This page** | **01** | **01 of 18** (founder recommendation) |
| Final disclaimer | 18 | 18 of 18 |

Total report: **19 pages (00–18)**. Inner pagination **01–18** = “of 18” (cover 00 excluded from counter).

Alternative (not recommended): “02 of 19” if counting cover in total — **use 01 of 18**.

Note: reference mockup image may show “02 OF 18” — **HTML template and founder directive use 01 of 18**.

---

## Canvas & layout

| Property | Value |
|----------|-------|
| Canvas | **1600 × 900** |
| Shell grid | Header `70px` + main `1fr` + footer `88px` |
| Main grid | 3 columns: `430px | 1fr | 430px` |

### Header (`PageHeader` pattern)

- Brand seal SVG + “1320 Soul Code System” / “Sacred · Symbolic · Self-Awareness”
- Center: “Full 1320 Soul Origin Report” with gold line decorations
- Right: page number badge **01 / of 18**

### Left column

1. **Opening Note** panel — Welcome, what the report is (S0–S9 symbolic mirror), nothing to “fix”
2. **How to Use This Report** — 5 items: Read Slowly, Use as a Mirror, Journal & Reflect, Apply with Awareness, Return Often

### Center column

1. Hero: **Disclaimer & Guidance** + subtitle (not prediction/diagnosis/prescription)
2. **Important Guidance** — 5 rows:
   - Mirror Not a Sentence
   - You Have Free Will
   - Growth is Non-Linear
   - Not Everything Will Resonate
   - You Are Already Whole
3. Bottom cards: **Core Intention** + **Agency Reminder**

### Right column

1. **This Report Is Not** — 6 items (prediction, medical/psych, therapy substitute, financial, legal, fortune-telling/destiny)
2. **Your Role** — author of your life + human-orbit icon

### Footer band (3 columns)

- Mirror for awareness, not fixed identity
- More than any pattern — consciousness in motion
- Thank you for choosing self-awareness

---

## Dynamic vs static content

**All content on this page is static.** No `{{...}}` placeholders in the canonical template.

Optional future: `{{report.page_number}}` / `{{report.page_total}}` for pagination only — not personalized narrative.

---

## Required language (LUMEN gate)

Must include or equivalent:

- Designed for **reflection, not prediction**
- Symbolic self-reflection tool
- Not medical, psychological, financial, legal, or predictive advice
- Does not replace therapy, diagnosis, treatment, crisis support, professional care
- Agency / free will / mirror-not-sentence framing

Cross-check: `LUMEN_QA_PROTOCOL_v1.md` §7.2 Page 01.

---

## React mapping (when implementing)

| Spec | Component |
|------|-----------|
| `ReportPage` | Page wrapper |
| `PageHeader` | Header row with seal + title + page badge |
| `GlassPanel` / `.panel` | All bordered cards |
| `DisclaimerBox` | Guidance + “This Report Is Not” sections |
| `PageFooter` | Footer band |

---

## LUMEN opening page QA

- [ ] Page 01 of 18 displayed (or agreed pagination)
- [ ] Opening disclaimer + agency present
- [ ] No prediction/destiny authority framing
- [ ] No user-specific code content injected
- [ ] Dark cosmic theme consistent with Page 00
- [ ] All six “This Report Is Not” rows present
- [ ] Footer three-part band present
