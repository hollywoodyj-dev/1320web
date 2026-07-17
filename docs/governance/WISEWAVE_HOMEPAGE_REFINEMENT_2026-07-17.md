# Wisewave — Homepage Refinement v1.0 Kickoff

**Date:** 2026-07-17  
**Spec:** `docs/specs/1320_HOMEPAGE_REFINEMENT_SPEC_v1.md`  
**Status:** Implemented — pending Lumen QA  
**Context:** Post Step 5 stable maintenance gate — separately governed scope (UI/copy/density)

---

## Scope

- Homepage only (`/`)
- Copy reduction 40–55%
- Section reorder and visual spacing
- Governance language preserved
- No report structure / commercial overlay / renderer changes

---

## Nova implementation (2026-07-17)

- Refactored `lib/homepage-content.ts` to spec copy
- Reordered/simplified sections in `app/page.tsx`
- Applied `.home-section` spacing + typography in `styles/site-density-v1.css`
- Simplified pillar cards; compressed boundary + full-report preview
- Removed: curiosity block, stats band, secondary links nav, mid-CTA, about preview card
- Birth date entry: quieter shell; privacy note moved off homepage form

**Next:** Lumen QA against spec §7 watchpoints — **PASS on production (2026-07-17)**
