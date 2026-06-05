# Performance & Accessibility Audit (Step 4)

**Date:** 2026-06-02  
**Scope:** Phase 1 marketing funnel + report UI (`web/`)

---

## Summary

| Area | Status | Notes |
|------|--------|-------|
| LCP heroes | OK | `priority` on homepage, generating, report header ring |
| Segment cards | OK | `next/image` + `sizes`; lazy by default |
| Inner/report CSS bg | Done | WebP: v3 ~0.23 MB desktop, v2 ~0.08 MB mobile |
| Focus / keyboard | Fixed | Global `:focus-visible` + skip link |
| Heading hierarchy | Fixed | Report pillar/module titles use `h3` under section `h2` |
| Motion | Fixed | `prefers-reduced-motion` disables long animations |
| Asset budget CI | PASS | `npm run audit:assets` (max single file &lt; 8 MB after WebP pass) |

---

## Image inventory (largest)

Run `npm run audit:assets` after adding assets. Snapshot at baseline:

| Asset | ~Size | Used on |
|-------|-------|---------|
| `report-bg-v3-1920x4048.webp` | ~0.23 MB | Desktop inner + report `.page-frame::before` |
| `report-bg-v2.webp` | ~0.08 MB | Mobile inner/report bg (≤900px) |
| `hero-banner-*.webp` | ~0.24–0.32 MB | Homepage LCP (`next/image` + `priority`) |
| `generating-bg-v1.webp` | ~0.12 MB | Generating chamber |
| `S1-44/S*.webp`, `S2-50/S2-*.webp`, `S3-12/S*.webp` | ~0.17–0.42 MB each | Report segment cards (lazy) |

**Total public images:** ~56 files, ~**115 MB** (mostly duplicate-weight card packs).

### Recommendations (Phase 2 — see `PHASE2_QUEUE.md`)

1. Export **`report-bg-v3`** as WebP/AVIF at ~80–85 quality (target &lt; 1.5 MB).
2. Batch-compress **S1-44** / **S3-12** packs (or WebP) — cards load one-at-a-time but hurt slow networks on scroll.
3. Remove unused hero variants (`hero-banner-v1`…`v4`) if no longer referenced.
4. When S2/S0 packs land, cap at ~400–600 KB per card where possible.

---

## LCP by route

| Route | Likely LCP element | Mitigation in place |
|-------|-------------------|---------------------|
| `/` | Mobile `hero-banner-v5` or desktop `hero-banner-desktop-v1` | `priority`, responsive `sizes`, one hidden via CSS |
| `/generating` | Chamber hero / bg | `priority` on key image |
| `/sample-report`, `/result` | Report header ring or first pillar | Header `priority`; cards lazy |
| Inner pages | CSS `report-bg-v*` | Mobile v2; desktop still v3 (heavy) |
| `/your-code` | Form + inner bg | Same inner bg rules as report |

**Manual check:** Chrome DevTools → Performance → LCP on 3G throttling for `/` and `/sample-report`.

---

## Accessibility

### Implemented in code

- **Skip link** — `SkipLink` on homepage, `PageShell`, `ImmersiveShell` → `#main-content`
- **Focus rings** — gold outline on links/inputs; light outline on gold CTAs (`globals.css`)
- **Heading order** — `BlueprintOverviewRow` + `ReportModuleCard` segment titles: `h2` section → `h3` card title
- **Reduced motion** — generating pulse/spin and transitions respect `prefers-reduced-motion`
- **`lang="en"`** — root layout
- **Decorative images** — `alt=""` + `aria-hidden` where appropriate; card art has descriptive `alt`

### Contrast notes (manual sign-off)

| Element | Approx. colors | WCAG note |
|---------|----------------|-----------|
| Gold gradient titles | `#f1c268` → `#c79130` on `#040813` | Large text: generally OK; verify smallest sizes |
| `.text-gold-gradient` on heroes | Gradient on dark | Pass for display sizes; avoid for body copy |
| `.muted-foreground` `#b9c1d0` on `#01010a` | Body secondary | ~4.5:1 for normal text — spot-check small captions |
| Gold buttons | `#17130b` on `#f1c268` | Strong contrast |

### Still to verify manually

- Keyboard path through report sidebar + module anchors
- FAQ `<details>` / accordion focus order
- Screen reader flow on generating step transitions (live region — optional P2)

---

## Commands

```bash
cd web
npm run audit:assets   # fails if any image >= 8 MB (v3 triggers until compressed)
npm run qa:baseline
npm run build
```

---

## Code touchpoints (this pass)

- `components/skip-link.tsx`
- `components/page-shell.tsx`, `immersive-shell.tsx`, `app/page.tsx`
- `app/globals.css` — skip/focus/reduced-motion; mobile `report-bg-v2`
- `components/report/blueprint-overview-row.tsx`, `report-module-card.tsx`
- `scripts/audit-assets.ts`
