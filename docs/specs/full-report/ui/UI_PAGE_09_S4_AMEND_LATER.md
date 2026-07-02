# Page 09 · S4 — Amend Later (Known Gaps)

**Status:** Open — track fixes before production polish  
**Component:** `components/full-report-v2/pages/page-09-s4.tsx`  
**Resolver:** `lib/full-report-v2/resolve-s4-page-content.ts`

---

## Summary

Page 09 is structurally implemented (3-column layout, cycle wheel, pattern intensity footer). The following gaps are **known and accepted for now**; we will amend later.

| # | Area | Issue | Priority |
|---|------|--------|----------|
| 1 | Left column | **Empty block(s)** when S4 module slot is thin or not fully enriched | High |
| 2 | Center | **Middle wheel** — layout / titles / content mapping not final | High |
| 3 | Left code orb | **S4 archetype card image missing** (generic module icon only) | Medium |
| 4 | Locale | **Chinese text showing** in EN report preview | High |

---

## 1. Empty block(s)

### What users may see

- **The Essence of Your S4** — no paragraphs
- **How This Pattern Shows Up** — empty bullet list
- **The Root Belief Behind This Pattern** — empty quote area
- **The Gift Hidden in Your Shadow** — empty list
- **Reflection Prompts** — empty list
- Right-column panels may collapse visually and feel like “missing blocks”

### Why (current implementation)

- Content is read from `payload.modules.s4` after `enrichModuleFromSegment()`.
- S4 steward fields are mapped from `segment.soulMissionSections` (v2 block specs: `core_loop`, `emotional_trigger`, etc.).
- If `get1320Content()` does not return full S4 v2 sections for the calculated code, or the sample payload is stale, arrays resolve empty.
- `enrich-module-slot` only copies **English** section bodies (`section.body.en`).

### Amend later

- [ ] Verify sample payload (`build-sample-payload.ts`) always includes full S4 v2 content for canonical date `1980-05-22` / `S4-14`.
- [ ] Add fallbacks or hide panel chrome when a section has no content (avoid blank titled boxes).
- [ ] Smoke test all 20 S4 codes (`S4-00` … `S4-19`) for non-empty cycle + left/right columns.

---

## 2. Middle wheel — “The Cycle of Your Core Shadow Pattern”

### What users may see

- Wheel background present (same asset as Page 07: `fr-v2-s1-expression-bg.webp`) but **nodes feel wrong or sparse**
- Step titles show **fixed steward labels** (e.g. `CORE LOOP`, `EMOTIONAL TRIGGER`) — **same for every S4 code**, not themed short names (e.g. OVER-GIVE, IGNORE SELF) from design mockup
- Some cycle nodes may show **title with empty copy** if a steward field is missing for that code
- Cycle step **icons** are static Unicode (`♡`, `◌`, `♙`, …) — not per-code assets

### Why (current implementation)

- Six wheel positions map to fixed keys: `core_loop`, `emotional_trigger`, `defense_pattern`, `hidden_need`, `relationship_pattern`, `work_life_pattern`.
- Titles come from `s4_section_labels` (steward section titles), uppercased — not custom `cycle_1_title` … `cycle_6_title` per code.
- Copy is first sentence of each steward field body.

### Amend later

- [ ] Decide product rule: **fixed category labels** vs **per-code short cycle titles** (mockup style).
- [ ] If per-code titles: add fields to `s4-core-shadow.json` or derive from archetype + `core_loop` with approved rules.
- [ ] Hide or soften nodes when `copy` is empty.
- [ ] Tune node positions / wheel height for all codes (layout QA).
- [ ] Optional: dedicated S4 cycle background vs reusing S1/S0 expression bg.

---

## 3. S4 card missing (code orb)

### What users may see

- **Your S4 Code** orb shows only `ModuleNodeIcon` (generic S4 glyph), not the **archetype card art** used on Pages 04–07 (`SignatureSegmentCardIcon` + segment card image).

### Why (current implementation)

- `getSignatureCardImageUrl()` supports `s1`, `s3`, `s2`, `s0` only — **no S4 card path**.
- `getSegmentCardImageUrl()` in `lib/segment-card-asset.ts` has no `s4` branch.
- Page 09 does not call `SignatureSegmentCardIcon` or a wheel center seal image.

### Pending asset source (Holly)

S4 archetype card PNGs will be supplied later. **Not in the download folder yet** (checked `C:\Users\holly\Downloads\s\1320 card` — currently has **S5–S9** subfolders only; **no S4 folder**).

When S4 cards arrive:

1. Place / convert PNGs into `web/public/` using the same convention as S0–S3 (e.g. `S4-20/S4-00.webp` … `S4-19.webp` — confirm naming with product).
2. Extend `SegmentId` + `getSegmentCardImageUrl()` for `s4` (lookup by calculated `S4-XX` numeric value).
3. Extend `getSignatureCardImageUrl()` with `s4` case (parse `calculation.s4_code`).
4. Wire Page 09 code orb (and optional wheel center) to `SignatureSegmentCardIcon`.

**Note:** The same Downloads folder already contains S5–S9 card PNGs for a future pass (Pages 10–14); do not mix into S4 wiring.

### Amend later

- [ ] Receive S4 card pack from Holly (`1320 card` folder).
- [ ] Convert to WebP, add under `web/public/…` per agreed naming.
- [ ] Implement `s4` in `segment-card-asset.ts` + `signature-card-images.ts`.
- [ ] Update `page-09-s4.tsx` to use `SignatureSegmentCardIcon` like Page 07.

---

## 4. Chinese showing (locale)

### What users may see

- Mixed **Chinese + English** on Page 09 (titles, labels, or body copy) when viewing the **English** full report.

### Why (likely causes)

- `enrich-module-slot` hard-codes **`.en`** for S4 section labels and bodies; other fields (`title`, `archetype`) may still come from mixed or legacy segment shapes.
- Sample `final-report-payload.json` may contain stale `modules.s4.title` (e.g. combined S1+S4 title from old pipeline).
- v2 locale files (`1320-v2-locale/zh`) vs canonical EN JSON — resolver does not yet use `pickLocalized(payload.client.language, …)` for S4 page.
- Database entries include `archetype_zh`, `name_zh`, etc.; any path that reads raw entry without locale guard can leak Chinese.

### Amend later

- [ ] Pass `payload.client.language` through `resolveS4PageContent` and use `pickLocalized` consistently.
- [ ] Audit `modules.s4` enrichment: never surface `*_zh` fields when `locale === 'en'`.
- [ ] Regenerate sample payload after S4 slot mapping is fixed.
- [ ] QA EN and ZH report previews separately.

---

## Reference — intended content source

| UI section | Intended source |
|------------|-----------------|
| Code + archetype title | Official S4 entry `code`, `archetype` |
| Essence | `reflective_summary` |
| How This Pattern Shows Up | trigger, defense, relationship, work/life, hidden need, core loop |
| Cycle wheel (6 nodes) | Same six steward fields |
| Root belief | `hidden_need` |
| Hidden gifts | `integration_key`, practice, guidance |
| Reflection prompts | `reflection_question` + pattern fields |
| Pattern intensity % | `pattern_intensity` levels 1–5 → `S4_INTENSITY_MAP` |

**Do not** AI-write S4 page copy; retrieve from the calculated S4 code in the official database.

---

## Related docs

- `UI_PAGE_09_S4_NOTES.md` — current implementation notes
- `PERCENTAGE_DISPLAY_RULES.md` — S4-only percentage bars
- `UI_PAGE_07_S0_NOTES.md` — expression wheel / background reference (Page 07)

---

*Last updated: amend-later tracking for Page 09 S4 polish pass.*
