# UI Baseline Checkpoint (Phase 1)

**Date:** 2026-06-02  
**Tag:** `ui-baseline-2026-06-02` (logical name — use commit hash as source of truth)  
**Scope:** Marketing funnel + report dashboard UI (English)

---

## Done (frozen in this baseline)

### Core funnel
- `/` — Homepage (own shell, hero, pillars, birth-date entry, stats, footer)
- `/your-code` — Birth date form + inner cosmic layout
- `/generating` — Immersive chamber, step animation, redirect to result
- `/result` — Free report dashboard (sidebar, modules, extras)
- `/sample-report` — Full fictional report (`1980-05-22` → S1-18 / S3-110 / S2-27 / S0-07)

### Inner marketing pages
- `/about-1320`, `/blueprint`, `/faq` — `InnerPageLayout` + gold hero + glass sections
- Desktop: full-width scrollable cosmic bg band (`report-bg-v3`), black below on scroll
- Mobile: fixed viewport bg (`report-bg-v2`), transparent shell (no scrolling black gaps)

### Report UI
- Header: gold gradient title, code strip, generating ring art
- Four-Part Blueprint row: compact pillar cards (`report-pillar-card`)
- Segment modules: pillar hero + content; **S1 / S2 / S3 / S0 archetype card art** in hero
- Integrated summary, practices, reflection (full sample)
- Result extras: Share + Email **duo row**, gold pill buttons
- Sticky sidebar (desktop); horizontal nav wrap (mobile ≤900px)
- Scroll anchors: `scroll-margin-top: 6.5rem` on sections/modules

### Card packs
| Segment | Folder | Mapping |
|---------|--------|---------|
| S1 | `public/S1-44/` | `S01.webp` … `S44.webp` by code number |
| S3 | `public/S3-12/` | `S01.webp` … `S12.webp` by vibration **tier** (from `s3Raw` range) |
| S2 | `public/S2-50/` | `S2-01.webp` … `S2-50.webp` by code number (`month + day`) |
| S0 | `public/S0-19/` | `S0-00.webp` … `S0-19.webp` by void gate number (0–19) |

### Automation
- `npm run smoke:content` — canonical codes + copy + card paths
- `npm run build` — all routes compile
- `npm run qa:baseline` — routes, assets, module fields (this checkpoint)

---

## Steps 4–5 (completed 2026-06-02)

- **Performance & a11y:** `PERFORMANCE_A11Y_AUDIT.md` — asset inventory, LCP notes, contrast checklist
- **Code:** skip link, `:focus-visible`, `prefers-reduced-motion`, mobile `report-bg-v2`, report `h3` under section `h2`
- **Assets:** WebP via `npm run compress:assets` (~174 MB → ~15 MB public images); `npm run audit:assets` PASS
- **Backlog:** `PHASE2_QUEUE.md` — ticket IDs P2-001 … P2-042

## Later polish (Phase 2 queue)

See **`PHASE2_QUEUE.md`** for full tickets. Highlights:

- S2 / S0 card packs, transparent PNGs, compress v3 + card packs
- Contrast automation, generating live region
- Mobile spacing, VIEW FULL INSIGHT route, blueprint segment pages

---

## Cross-device QA matrix (2026-06-02)

Code + build verified; visual sign-off recommended on real devices after pull.

| Route | Desktop | Mobile | Notes |
|-------|---------|--------|-------|
| `/` | PASS | PASS | Own `page-shell`; not inner-page bg |
| `/your-code` | PASS | PASS | Inner bg + form; fixed bg mobile |
| `/generating` | PASS | PASS | Full-screen immersive; separate shell |
| `/result` | PASS | PASS | Dynamic; needs birth cookie/query |
| `/sample-report` | PASS | PASS | Best reference for full report |
| `/about-1320` | PASS | PASS | Hero centered; glass sections |
| `/blueprint` | PASS | PASS | S-code segments 2-col desktop |
| `/faq` | PASS | PASS | FAQ accordions |

### Checks performed
- **Spacing:** Inner heroes transparent; no drift from `margin-top: auto` on card-layout modules
- **Background:** `:has(.inner-content-page)` desktop `page-frame::before`; mobile `page-shell-inner::before` fixed
- **Sticky/header:** Report sidebar `top: 5.5rem`; inner topbar z-index 40
- **Scroll anchors:** `#s1` … `#s0`, overview `VIEW SECTION` links

### Known visual caveats
- S3/S2/S0 modules without card art use pillar background (expected)
- Very wide desktop: inner bg band is viewport-wide; content stays 920px
- Large PNG assets may slow first load on slow networks

---

## Content / data sanity (automated)

Canonical: `1980-05-22` → `S1-18 / S3-110 / S2-27 / S0-07`

- S1 title: The Transformer  
- S3 tier: Amplified Expression (T04) → `/S3-12/S04.webp`  
- S2-45: asset file missing in pack (birth-date S2 is 2–43; only S2-45 affected)  
- Free `/result`: locked teasers + waitlist CTA on modules  
- CTAs: `/your-code`, `/full-report`, `/sample-report`, `/booking`, `/privacy` wired in components

---

## How to verify after pull

```bash
cd web
npm install
npm run qa:baseline
npm run smoke:content
npm run audit:assets
npm run build
npm run dev:fresh
```

Hard refresh (Ctrl+Shift+R) when checking CSS changes.
