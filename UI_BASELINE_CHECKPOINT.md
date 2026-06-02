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
- Segment modules: pillar hero + content; **S1 + S3 archetype card art** in hero
- Integrated summary, practices, reflection (full sample)
- Result extras: Share + Email **duo row**, gold pill buttons
- Sticky sidebar (desktop); horizontal nav wrap (mobile ≤900px)
- Scroll anchors: `scroll-margin-top: 6.5rem` on sections/modules

### Card packs
| Segment | Folder | Mapping |
|---------|--------|---------|
| S1 | `public/S1-44/` | `S01.png` … `S44.png` by code number |
| S3 | `public/S3-12/` | `S01.png` … `S12.png` by vibration **tier** (from `s3Raw` range) |
| S2 | — | Pillar text hero (no pack yet) |
| S0 | — | Pillar text hero (no pack yet) |

### Automation
- `npm run smoke:content` — canonical codes + copy + card paths
- `npm run build` — all routes compile
- `npm run qa:baseline` — routes, assets, module fields (this checkpoint)

---

## Later polish (not blocking baseline)

- **S2 / S0 card packs** — integrate when assets land (same pattern as S1/S3)
- **Card PNG matte** — export transparent backgrounds; reduce reliance on `mix-blend-mode: screen`
- **Image weight / LCP** — compress `report-bg-v3`, card packs, generating assets
- **Accessibility pass** — focus rings, contrast audit on gold-on-dark, heading order review
- **Fine mobile spacing** — segment module cards, inner-page hero gaps
- **Per-segment bg tuning** — optional different mobile/desktop art per segment tone
- **VIEW FULL INSIGHT** — placeholder button (no route yet)
- **Phase 2 routes** — `/blueprint/s1-origin-frequency`, etc.

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
- S3 tier: Amplified Expression (T04) → `/S3-12/S04.png`  
- S2/S0: English copy from JSON; no `cardImageUrl`  
- Free `/result`: locked teasers + waitlist CTA on modules  
- CTAs: `/your-code`, `/full-report`, `/sample-report`, `/booking`, `/privacy` wired in components

---

## How to verify after pull

```bash
cd web
npm install
npm run qa:baseline
npm run smoke:content
npm run build
npm run dev:fresh
```

Hard refresh (Ctrl+Shift+R) when checking CSS changes.
