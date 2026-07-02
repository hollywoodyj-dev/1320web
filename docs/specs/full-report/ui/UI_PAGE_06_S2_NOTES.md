# Page 06 · S2 Soul Mirror — Implementation Notes

**Component:** `components/full-report-v2/pages/page-06-s2.tsx`  
**Static UI:** `lib/full-report-v2/s2-page-static.ts`  
**Content resolver:** `lib/full-report-v2/resolve-s2-page-content.ts`

---

## Safe language (required)

S2 is a **mirror for awareness**, not a relationship verdict. Page copy must **not** include:

- Destined relationship / soulmate guarantee
- Must stay / must leave commands
- Karmic obligation toward another person
- Compatibility proof or relationship prediction

Fixed safe-language chrome lives in `s2-page-static.ts` (`S2_SAFE_LANGUAGE_NOTE`, `S2_KEY_INSIGHT_INTRO`).

---

## Integration Focus (bottom band)

Uses **qualitative focus pills** — no percentage numbers. See `PERCENTAGE_DISPLAY_RULES.md` and `S2_INTEGRATION_FOCUS`.

---

## What is dynamic today

Narrative content comes from the official S2 database via `modules.s2` (enriched from `get1320Content()`):

| NOVA field | Source |
|------------|--------|
| `s2.code` | segment code |
| `s2.title` | mirror archetype title |
| `s2.essence` | reflective summary / relationship dynamic |
| `s2.relationship_dynamic` | `relationshipPattern` |
| `s2.trigger_pattern` | relationship dynamic (activation pattern) |
| `s2.repeating_loop` | `karmicLoop` |
| `s2.lesson` | `mirrorLesson` |
| `s2.healing_path` | `integrationPrompt` |
| `s2.boundary_lesson` | healing path / integration key |
| `s2.wisewave_guidance` | steward guidance |
| `s2.reflection` | reflection question |

**Strengths** (when no steward list exists): lesson + healing path from DB.  
**Shadow / repeating patterns**: karmic loop steps split on `→`.  
**Expression wheel**: relationship dynamic, lesson, healing path, loop steps, guidance.

Sample canonical code: **S2-27 · The Soul Shock Mirror** (`1980-05-22`).

---

## Content policy

Do **not** let AI freely write S2 page copy. Each user's S2 page must pull from the official content asset for their `s2.code`.
