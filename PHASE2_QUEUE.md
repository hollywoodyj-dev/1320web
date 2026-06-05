# Phase 2 UI Queue (Step 5)

**Date:** 2026-06-02  
**Status:** Backlog — not in scope for Phase 1 baseline  
**Reference:** `UI_BASELINE_CHECKPOINT.md`, `PERFORMANCE_A11Y_AUDIT.md`

Use these as tickets when resuming polish. Priority is suggestive (P0 = user-visible gap, P2 = nice-to-have).

---

## Card packs & report art

| ID | Priority | Title | Acceptance criteria |
|----|----------|-------|---------------------|
| P2-001 | ~~done~~ | **S2 card pack** | `public/S2-50/` + `S2-NN.webp`; add missing `S2-45` if needed |
| P2-002 | ~~done~~ | **S0 card pack** | `public/S0-19/` + `S0-NN.webp` (0–19) |
| P2-003 | P1 | **Transparent PNG exports** | Remove black matte; drop `mix-blend-mode: screen` on `.report-segment-card-img` |
| P2-004 | P1 | **Compress S1-44 / S3-12** | Each card &lt; ~600 KB or WebP; `audit:assets` budget tightened |
| P2-005 | P2 | **Per-segment hero tone** | Optional distinct mobile/desktop bg or pillar gradient per S1–S0 |

---

## Performance

| ID | Priority | Title | Acceptance criteria |
|----|----------|-------|---------------------|
| P2-010 | ~~done~~ | **Compress `report-bg-v3`** | WebP in repo; `npm run compress:assets` to re-run from PNG sources |
| P2-011 | ~~done~~ | **Prune unused heroes** | Removed `hero-banner-v1`…`v4`, old `report-bg-v1`, wide generating bgs |
| P2-012 | P1 | **Generating asset diet** | `generating-bg-wide-v2`, step PNGs compressed or sprite |
| P2-013 | P2 | **Mobile fixed inner bg** | Re-evaluate `page-shell-inner::before` fixed + `100dvh` if scroll gaps return |

---

## Accessibility

| ID | Priority | Title | Acceptance criteria |
|----|----------|-------|---------------------|
| P2-020 | P1 | **Contrast audit (automated)** | axe or Lighthouse A11y on `/`, `/sample-report`, `/your-code` — document exceptions |
| P2-021 | P2 | **Generating live region** | `aria-live="polite"` on status line during step animation |
| P2-022 | P2 | **FAQ accordion a11y** | `aria-expanded` / keyboard on custom details if not native |

---

## Layout & mobile polish

| ID | Priority | Title | Acceptance criteria |
|----|----------|-------|---------------------|
| P2-030 | P1 | **Segment module card spacing** | Tighter hero + card stage on ≤640px; no excess gap under archetype line |
| P2-031 | P1 | **Inner hero vertical rhythm** | Consistent `clamp()` padding under gold title on all inner pages |
| P2-032 | P2 | **Report sidebar mobile** | Sticky mini-nav or section progress on long scroll |

---

## Product / routes

| ID | Priority | Title | Acceptance criteria |
|----|----------|-------|---------------------|
| P2-040 | P0 | **VIEW FULL INSIGHT** | Wire CTA to real route or modal; remove placeholder |
| P2-041 | P1 | **Blueprint segment routes** | `/blueprint/s1-origin-frequency`, S3/S2/S0 slugs + content |
| P2-042 | P2 | **Share / email flows** | Backend or third-party for result extras (currently UI-only) |

---

## Suggested sprint order

1. P2-010 (v3 compress) + P2-004 (card packs) — unblocks production perf  
2. P2-001 / P2-002 (S2/S0 art) — report parity  
3. P2-030 / P2-031 — mobile QA from baseline matrix  
4. P2-040 / P2-041 — product depth  

---

## Definition of done (Phase 2 UI slice)

- `npm run audit:assets` PASS with stricter threshold (e.g. 4 MB max single file)
- Lighthouse mobile Performance ≥ 85 on `/` and `/sample-report` (lab)
- All four segments show card art on `/sample-report`
- No open P0 items in this queue
