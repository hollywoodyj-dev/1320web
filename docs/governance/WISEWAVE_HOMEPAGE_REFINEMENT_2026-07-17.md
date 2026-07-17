# Wisewave — Homepage Refinement v1.0 Kickoff

**Date:** 2026-07-17  
**Spec:** `docs/specs/1320_HOMEPAGE_REFINEMENT_SPEC_v1.md`  
**Status:** Wisewave visual acceptance — **Accepted** (2026-07-17)  
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
- Unified block width to page-frame; even section gaps

**Lumen QA:** PASS on production (390px + 1280px)  
**Artifact:** `qa-artifacts/LUMEN_QA_HOMEPAGE_REFINEMENT_v1_2026-07-17.md`  
**Wisewave:** Page 01 · Home — **Accepted** (visual acceptance confirmed)
