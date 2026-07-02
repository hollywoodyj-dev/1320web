# Full Report · Percentage Display Rules

**Effective:** Nova revision — qualitative indicators by default; S4 only for numeric display.

---

## Core decision

Only **Page 09 · S4 · Core Shadow Pattern** may show percentage values.

All other module pages (04–08, 10–14) must **not** display percentage numbers in influence-style bars.

---

## Pages 04–07 (S1, S3, S2, S0)

- Section title: **Integration Focus** (`INTEGRATION_FOCUS_SECTION_TITLE`)
- Replace percentage bars with qualitative **focus pills**
- Labels: Strong Focus · Active Focus · Emerging Focus · Supportive Focus
- Implementation: `module-focus-display.ts`, `*-page-static.ts` (`*_INTEGRATION_FOCUS`), `fr-v2-s1-focus-list`

---

## Page 09 · S4

- Section title: **Pattern Intensity in Your Life**
- Display note under bars (see `S4_PATTERN_INTENSITY_NOTE`)
- Internal formula: `S4_INTENSITY_MAP` maps symbolic level 1–5 → 60–90%
- Database field: `pattern_intensity` per dimension (1–5), keys:
  - `relationships`, `daily_choices`, `emotional_repetition`, `energy_wellbeing`

---

## Pages 10–14 (S5–S9)

No percentage bars by default. Use module-specific qualitative maps:

| Page | Section title | Qualitative labels |
|------|---------------|-------------------|
| 10 S5 | Mission Activation Map | Clear, Activating, Developing, Embodying |
| 11 S6 | Receiving Pattern Map | Open, Strengthening, Rebalancing, Reclaiming |
| 12 S7 | Sovereignty Alignment Map | Strong Boundary, Reclaiming Choice, Self-Trust Building, Inner Authority Awakening |
| 13 S8 | Contribution Pathway | Pathway cards (not bars) |
| 14 S9 | Return Pathway / Integration Remembrance | Reflective only — no scores |

Static definitions: `lib/full-report-v2/advanced-module-display-static.ts`

---

## CSS

- Qualitative rows: `.fr-v2-s1-focus-list`, `.fr-v2-s1-focus-pill`
- Percentage bars (S4 only): `.fr-v2-s1-influence-list`, `.fr-v2-s1-bar`
