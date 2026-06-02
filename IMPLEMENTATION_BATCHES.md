# Phase 1 Implementation Batches

**Status:** Ready to execute step-by-step  
**Handoff:** 15/15 docs + UI (`homepage-ui.png`, `generating-ui.png`, `report-ui.jpeg`)  
**Rule:** One batch at a time → `npm run lint` + `npm run build` → steward confirms → next batch

---

## How we work each batch

1. Nova implements **one batch only**
2. Report: what changed · why · how to test (desktop + mobile)
3. You smoke-test the listed URLs
4. You reply **“Batch N done, start N+1”** (or request tweaks)

---

## Dependency map

```
Batch 0 (data)
    ├── Batch 1 (shell + segments)
    │       ├── Batch 2 (/blueprint)
    │       ├── Batch 3 (/your-code + funnel wire)
    │       ├── Batch 6 (report UI kit + /sample-report)
    │       ├── Batch 7 (conversion pages)
    │       └── Batch 8 (legal)
    └── Batch 3
            └── Batch 4 (/generating)
                    └── Batch 5 (/result — uses Batch 6 components)

Batch 9 (homepage copy) — after 2 + 3
Batch 10 (ship) — after all
```

**Recommended build order:** `0 → 1 → 2 → 3 → 4 → 6 → 5 → 7 → 8 → 9 → 10`  
*(Build report components on `/sample-report` first, then wire `/result` free layer.)*

---

## Batch 0 — Data foundation

**Goal:** JSON-driven content works for the canonical test code before any page rebuild.

| Item | Detail |
|------|--------|
| **Docs** | 12/15 |
| **UI** | — |

### Deliverables

- [x] `lib/types/1320-content.ts` — `LocalizedText`, segment types, free vs full field shapes
- [x] v1 → adapter in `get1320Content()` — read existing `data/1320/*.json` without rewriting founder copy
- [x] Stub JSON: `reflection-questions.json`, `integrated-summary-templates.json`, `free-result-copy.json`
- [x] S3 tier lookup (must resolve **110** for sample)
- [x] Locale param `{ locale: 'en' \| 'zh' }` — EN default for UI

### Test code (always use for smoke)

`1980-05-22` → **S1-18 / S3-110 / S2-27 / S0-07**

### Done when

- [x] `get1320Content({ s1:18, s3:110, s2:27, s0:7, locale:'en' })` returns names, free essence, reflection Q for all four segments
- [x] `npm run lint` + `npm run build` pass

---

## Batch 1 — Shell, segments, global nav

**Goal:** Inner pages share one cosmic layout; segment metadata lives in one place.

| Item | Detail |
|------|--------|
| **Docs** | 11/15 (nav), 15/15 (anchors) |
| **UI** | Extend homepage tokens — no layout change on `/` |

### Deliverables

- [x] `lib/segments.ts` — S1/S3/S2/S0 ids, labels, colors, `/blueprint#s*` anchors, Phase 2 slug placeholders
- [x] `lib/site-nav.ts` + `components/site-header.tsx` + `components/site-footer.tsx` — 11/15 nav + CTAs
- [x] `components/page-shell.tsx` + `app/(site)/layout.tsx` — inner routes only; `/` unchanged
- [x] CSS tokens in `globals.css`: segment colors, glass-card, scroll-margin, inner footer
- [x] Placeholder routes: `/blueprint`, `/faq`, `/privacy`, `/terms`, `/disclaimer` (full copy later)

### Nav targets (11/15)

| Label | Route |
|-------|-------|
| HOME | `/` |
| ABOUT 1320 | `/about-1320` |
| BLUEPRINT | `/blueprint` |
| YOUR CODE | `/your-code` |
| RESOURCES | `/faq` (or `/sample-report` — confirm if needed) |
| GENERATE MY CODE | `/your-code` |

### Done when

- [x] Any inner page renders with shared header/footer
- [x] Segment colors match 14/15 (gold / violet / blue / teal) — CSS vars + accent classes

---

## Batch 2 — `/blueprint` education page

**Goal:** Single education page with four anchored S sections; homepage LEARN MORE links fixed.

| Item | Detail |
|------|--------|
| **Docs** | 8/15, 15/15 |
| **UI** | Cosmic shell (no separate mockup) |

### Deliverables

- [x] `app/blueprint/page.tsx` + `lib/blueprint-content.ts` — 16 sections from 8/15
- [x] Section ids: `id="s1"`, `id="s3"`, `id="s2"`, `id="s0"` + `scroll-margin-top`
- [x] Homepage `app/page.tsx`: pillar **LEARN MORE** → `/blueprint#s1` … `#s0`; nav THE BLUEPRINT → `/blueprint`
- [x] Secondary CTAs: VIEW SAMPLE REPORT → `/sample-report`, GENERATE MY CODE → `/your-code`

### Done when

- [x] `/blueprint#s3` scrolls to S3 section
- [x] Homepage pillar cards land on correct anchors
- [x] No `/blueprint/s1-*` routes created

---

## Batch 3 — `/your-code` + funnel wiring

**Goal:** Calculator entry page complete; valid submit starts the activation path.

| Item | Detail |
|------|--------|
| **Docs** | 3/15, 11/15, 13/15 |
| **UI** | Cosmic shell |

### Deliverables

- [x] Rebuild `app/your-code/page.tsx` — full 3/15 sections (`lib/your-code-content.ts`)
- [x] `birthdate-form` + `submitBirthDate` → `/generating?year=&month=&day=` + `sessionStorage` (`1320-birth`)
- [x] Homepage `HomeBirthdateEntry` wired (layout unchanged)
- [x] Analytics: `calculator_submit`, `calculator_success`, `calculator_error`, `homepage_generate_click`, `generating_view`, `generating_complete`
- [x] Minimal `/generating` funnel stub (Batch 4 replaces with UI1 full chamber)

### Done when

- [x] Valid date → `/generating` (not `/result` direct)
- [x] Invalid date shows 3/15 validation copy
- [x] Empty `/result` shows “No Soul Code Found” + CTA

---

## Batch 4 — `/generating` activation chamber

**Goal:** Sacred transition page matches UI1; auto-continues to result.

| Item | Detail |
|------|--------|
| **Docs** | 13/15 |
| **UI** | **`public/generating-ui.png`** |

### Deliverables

- [x] `GeneratingChamber` — 4 steps × 1.2s (~5.4s) + redirect
- [x] Portal, 4 orbital nodes (S1→S3→S2→S0), progress bar, step rail, boundary card
- [x] Copy per 13/15 + `lib/generating-content.ts`
- [x] sessionStorage + auto `router.replace('/result')` + **VIEW MY RESULT** fallback
- [x] Secured & Private + encryption note · analytics hooks

### Done when

- [x] Full path: `/your-code` → `/generating` → `/result`
- [x] Mobile layout: stacked rail, scaled portal
- [x] UI1 mood (cosmic + gold geometry)

---

## Batch 6 — Report UI kit + `/sample-report` *(before Batch 5)*

**Goal:** Full Sacred Report Dashboard on static sample; shared components for `/result` later.

| Item | Detail |
|------|--------|
| **Docs** | 6/15, 14/15, 15/15 |
| **UI** | **`public/report-ui.jpeg`** |

### Deliverables

**Components** (`components/report/`):

- [ ] `ReportShell` — sidebar + main column layout
- [ ] `ReportSidebar` — anchor nav + active section highlight + bottom mini card
- [ ] `ReportHeader` — title, code strip, action buttons (SAVE / EMAIL / PDF UI-only / BOOK)
- [ ] `BlueprintOverviewRow` — four glass overview cards
- [ ] `IntegratedSummaryCard`
- [ ] `ReportModuleCard` — per S1–S0 (color accent, fields from 14/15, reflection Q)
- [ ] `IntegrationPracticeGrid` — 3 practice tiles
- [ ] `ReflectionJournal` — 3 static prompts
- [ ] `ReportFinalCta` — bottom band + 3 buttons (Soul Profile = Coming Soon)

**Page:**

- [ ] `app/sample-report/page.tsx` — fictional **1980-05-22** sample, disclaimers from 6/15
- [ ] Sidebar scroll-spy or hash anchors: `#overview`, `#s1`, `#s3`, `#s2`, `#s0`, `#integration`, `#reflection`
- [ ] Desktop: 4-column segment grid where mockup shows; mobile: stack
- [ ] Analytics: `sample_report_view`

### Done when

- [ ] `/sample-report` visually aligns with UI2 (calm, glass, segment colors)
- [ ] All 10 sections from 14/15 present
- [ ] Content from JSON + 6/15 (no hardcoded archetype text in components)

---

## Batch 5 — `/result` free layer

**Goal:** User’s real code on report-style layout with free content + locked full-report teasers.

| Item | Detail |
|------|--------|
| **Docs** | 4/15, 14/15 (lite), 15/15 |
| **UI** | Reuse Batch 6 components (subset) |

### Deliverables

- [ ] `app/result/page.tsx` — read sessionStorage / query; redirect if missing (4/15 empty state)
- [ ] Same `ReportShell` + sidebar as sample, but **user’s calculated codes**
- [ ] Free layer: overview + integrated summary + S1–S0 **short** modules + reflection Q
- [ ] **Locked teasers** per card → CTA to `/full-report` waitlist (4/15)
- [ ] GO DEEPER section — optional S4/S5/S6 mention, locked
- [ ] Share block, email capture (UI + client success; API optional in Batch 10)
- [ ] FAQ section from 4/15
- [ ] Analytics: `result_view`, `email_capture_submit`

### Done when

- [ ] End-to-end: homepage/your-code → generating → result shows **your** code
- [ ] Free vs locked clearly distinguished
- [ ] Does not expose full report fields without waitlist path

---

## Batch 7 — Conversion pages

**Goal:** Waitlist, trust, and booking flows complete.

| Item | Detail |
|------|--------|
| **Docs** | 5/15, 7/15, 9/15 |
| **UI** | Cosmic shell |

### Deliverables

| Route | Sections |
|-------|----------|
| `/full-report` | 5/15 — 14 sections, waitlist form, comparison, S6 disclaimer, FAQ×8 |
| `/about-1320` | 7/15 — 14 sections, FAQ×8, link to `/blueprint` |
| `/booking` | 9/15 — 3 reading options, expanded form, FAQ×9 |

- [ ] Forms use unified consent copy (10/15) — can stub email API
- [ ] Analytics: waitlist + booking events from 11/15

### Done when

- [ ] CTAs from result/sample-report land on correct pages
- [ ] Waitlist is **only** path for “full report” (no checkout)

---

## Batch 8 — Legal + FAQ

**Goal:** Footer links work; legal compliance for forms.

| Item | Detail |
|------|--------|
| **Docs** | 10/15 |

### Deliverables

- [ ] `/faq`, `/privacy`, `/terms`, `/disclaimer` — 10/15 copy
- [ ] Footer: SYSTEM / RESOURCES / COMPANY columns + working links
- [ ] Placeholders flagged: `[Insert Contact Email]`, `[Insert Date]` until steward provides
- [ ] SUBSCRIBE → lead hook (client success or API stub)

### Done when

- [ ] No footer 404s
- [ ] All forms show consent + link to privacy

---

## Batch 9 — Homepage copy pass

**Goal:** English copy matches 2/15 without changing layout/images.

| Item | Detail |
|------|--------|
| **Docs** | 2/15 |
| **UI** | **`public/homepage-ui.png`** — layout frozen |

### Deliverables

- [ ] Text-only updates in `app/page.tsx` — hero, calculator, pillars, how-it-works, stats, CTAs, footer
- [ ] Merge §8–§10 copy into nearest existing sections (no new bands unless approved)
- [ ] Nav labels align with 11/15
- [ ] Meta title/description from 2/15

### Done when

- [ ] Side-by-side with 2/15 doc — copy matches; pixels/layout unchanged
- [ ] All CTAs route correctly

---

## Batch 10 — Ship polish

**Goal:** Production-ready Phase 1 MVP.

| Item | Detail |
|------|--------|
| **Docs** | 11/15 §13, §17, §19 |

### Deliverables

- [ ] Per-route `metadata` / SEO
- [ ] `lib/analytics.ts` — all 11/15 events wired
- [ ] `.env.example` + README deploy notes
- [ ] Optional: `app/api/leads/route.ts` for waitlist/email/booking
- [ ] Asset audit — `public/` images committed (hero banners, logos, card art)
- [ ] Full funnel smoke checklist (below)
- [ ] Mobile pass on all routes

### Acceptance funnel (11/15)

- [ ] `/` → GENERATE MY CODE → `/your-code`
- [ ] Valid birth date → `/generating` → `/result`
- [ ] Result shows correct S1–S0 + free content
- [ ] Sample report at `/sample-report`
- [ ] Waitlist at `/full-report`
- [ ] Booking at `/booking`
- [ ] Blueprint anchors work
- [ ] Legal pages load

---

## Explicitly out of scope (Phase 1)

- Login / Soul Profile / check-ins / timeline / membership / payment
- PDF download backend
- SAVE TO MY SOUL PROFILE (UI “Coming Soon” only)
- `/blueprint/s1-origin-frequency` and sibling routes
- Per-S public pages
- Real email delivery (unless added in Batch 10)
- Rewriting founder JSON interpretation copy

---

## Quick reference — docs × batches

| Batch | Primary docs |
|-------|----------------|
| 0 | 12/15 |
| 1 | 11/15, 15/15 |
| 2 | 8/15, 15/15 |
| 3 | 3/15, 13/15 |
| 4 | 13/15 + UI1 |
| 5 | 4/15, 14/15, 15/15 |
| 6 | 6/15, 14/15, 15/15 + UI2 |
| 7 | 5/15, 7/15, 9/15 |
| 8 | 10/15 |
| 9 | 2/15 |
| 10 | 11/15 |

---

## Start command

Reply with:

> **Start Batch 0**

(or **Start Batch 1** if you want to defer data adapter and see shell first — not recommended)
