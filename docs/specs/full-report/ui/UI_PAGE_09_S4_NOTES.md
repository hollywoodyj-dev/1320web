# Page 09 · S4 Core Shadow Pattern — Implementation Notes

**Component:** `components/full-report-v2/pages/page-09-s4.tsx`  
**Resolver:** `lib/full-report-v2/resolve-s4-page-content.ts`  
**Intensity rules:** `lib/full-report-v2/module-focus-display.ts`

---

## Pattern Intensity (S4 only — symbolic, not clinical)

- Section title: **Pattern Intensity in Your Life**
- User-visible note: *Symbolic intensity indicator. Not a clinical, diagnostic, or predictive score.*
- Formula: official S4 `pattern_intensity` levels 1–5 → display % via `S4_INTENSITY_MAP` (60–90%)
- Database keys: `relationships`, `daily_choices`, `emotional_repetition`, `energy_wellbeing`

Sample (S4-14): levels 5,4,5,4 → 90%, 85%, 90%, 85%.

---

## Dynamic content (official S4 database)

All narrative fields resolve from `modules.s4` (enriched from `get1320Content()` steward fields):

| UI block | Source fields |
|----------|----------------|
| Code + archetype | `code`, `archetype` / `title` |
| Essence paragraphs | `reflective_summary` / `essence` |
| How This Pattern Shows Up | `emotional_trigger`, `defense_pattern`, `relationship_pattern`, `work_life_pattern`, `hidden_need`, `core_loop` |
| Cycle wheel (6 nodes) | Same six steward sections |
| Root belief | `hidden_need` |
| Hidden gifts | `integration_key`, `practice`, `wisewave_guidance` |
| Reflection prompts | `reflection_question` + pattern fields |
| How S4 Influences Your Life | `reflective_summary` |
| Key insight | `wisewave_guidance`, `integration_key` |

Do not AI-generate S4 page copy — retrieve from the calculated S4 code entry.

---

## Safe language

S4 is symbolic and reflective — not diagnostic, predictive, or a fixed identity label.

---

## Known gaps (amend later)

See **`UI_PAGE_09_S4_AMEND_LATER.md`** for open issues: empty blocks, middle wheel polish, missing S4 card image, and Chinese locale leakage.
