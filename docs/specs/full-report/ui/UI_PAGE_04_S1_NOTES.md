# Page 04 · S1 Soul Origin — Implementation Notes

**Component:** `components/full-report-v2/pages/page-04-s1.tsx`  
**Static UI:** `lib/full-report-v2/s1-page-static.ts`

---

## Integration Focus (bottom band)

The bottom **Integration Focus** section uses **qualitative focus pills** — not percentages.

See: `docs/specs/full-report/ui/PERCENTAGE_DISPLAY_RULES.md`

| Label | Focus pill |
|-------|------------|
| Identity & Self-Expression | Strong Focus |
| Life Direction & Purpose | Active Focus |
| Relationships & Connections | Supportive Focus |
| Challenges & Growth Path | Emerging Focus |

Only **Page 09 · S4** may display numeric percentage bars in the Full Report v2 UI.

---

## What is dynamic today

All narrative content on Page 04 comes from the official S1 database via `modules.s1` (enriched from `get1320Content()`): essence, traits, strengths, shadow, remembrance, reflection, expression map nodes, and key insight.

Sample canonical code: **S1-18 · The Transformer** (`1980-05-22`).
