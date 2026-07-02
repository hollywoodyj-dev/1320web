# Page 07 · S0 Void Gate — Implementation Notes

**Component:** `components/full-report-v2/pages/page-07-s0.tsx`  
**Static UI:** `lib/full-report-v2/s0-page-static.ts`  
**Content resolver:** `lib/full-report-v2/resolve-s0-page-content.ts`

---

## Integration Focus (bottom band)

Uses **qualitative focus pills** — no percentage numbers. See `PERCENTAGE_DISPLAY_RULES.md` and `S0_INTEGRATION_FOCUS`.

---

## What is dynamic today

Narrative content comes from the official S0 database via `modules.s0` (enriched from `get1320Content()`):

| NOVA field | Source |
|------------|--------|
| `s0.code` | segment code |
| `s0.title` | void archetype title |
| `s0.essence` | reflective summary / core illusion |
| `s0.core_illusion` | `coreIllusion` |
| `s0.illusion_mechanism` | `voidChallenge` (when no separate steward field) |
| `s0.void_challenge` | `voidChallenge` |
| `s0.void_power` | `voidPower` |
| `s0.path_of_return` | `awakeningPath` / practice |
| `s0.wisewave_guidance` | steward guidance |
| `s0.reflection` | reflection question |

**Strengths** (when no steward list): void power + path of return.  
**Shadow patterns**: void challenge (split when list-like).  
**Expression wheel**: core illusion, void power, path of return, void challenge, guidance.

Sample canonical code: **S0-07 · Self-Worth Illusion** (`1980-05-22`).

Center seal displays **0** when no card image is available (Void Gate symbol).

---

## Content policy

Do **not** let AI freely write S0 page copy. Each user's S0 page must pull from the official content asset for their `s0.code`.

Fixed chrome (`S0_ESSENCE_INTRO`, key insight framing) provides safe context without replacing steward fields.
