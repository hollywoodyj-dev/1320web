# Phase 1 Handoff Tracker (1320 Website)

**Purpose:** Single source for Nova continuity while steward sends 15 docs + 2 UI files.  
**Workspace:** `C:\github\1320-website\web`  
**Last updated:** 2026-05-29 (docs 1–15/15 + **UI 2/2** complete)

---

## Locked scope (founder decision)

| Item | Decision |
|------|----------|
| Phase | **Option A — Core Function MVP only** |
| Phase 2+ | Thin Soul Profile → Membership / Evolution Timeline (not now) |
| Language | **English-first UI**; bilingual fields in JSON/data retained; architecture ready for EN/ZH toggle later |
| `/full-report` | **Waitlist only** — no purchase flow |
| Homepage visual | **Images + layout frozen** (Lumen rebuild). **Text/copy may change** per handoff docs |
| Data architecture | Calculation ≠ Content ≠ UI. No hardcoded S1–S6 interpretation in components |
| Primary CTA (site-wide) | `GENERATE MY CODE` |

---

## Handoff intake status

| Asset | Status |
|-------|--------|
| Docs 1/15 – 15/15 | ✅ **Complete** — summarized below |
| **11/15** | ✅ **Master Implementation Pack** (routes, nav, CTAs, build order, acceptance criteria) |
| **12/15** | ✅ **JSON data schema standard** (S1–S0 bilingual structure) |
| UI files (2) | ✅ **2/2** — homepage · `/generating` · **report dashboard** |
| Data package | ✅ `data/1320/*.json` + libs in repo |
| Implementation | ✅ **Ready to start** — all handoff docs + UI references in `public/` |

---

## Phase 1 page IA (target)

| Route | Role | Code status (2026-05-29) |
|-------|------|---------------------------|
| `/` | Homepage — conversion | ✅ Rich UI; copy ≠ 2/15 yet; homepage form **not wired** to `/result` |
| `/about-1320` | Trust + system explanation | 🟡 3-card placeholder; ≠ 7/15 (14 sections, FAQ×8) |
| `/blueprint` | Educate on S1/S3/S2/S0 — **one page + anchors** `#s1` `#s3` `#s2` `#s0` (15/15) | ✅ Batch 2 — 16 sections (`lib/blueprint-content.ts`) |
| `/your-code` | Calculator entry | ✅ Batch 3 — full 3/15 page + funnel |
| `/generating` | Activation chamber (UI1) | ✅ Batch 4 — full sacred chamber |
| `/result` | Free layer result + **in-page report modules** (sidebar anchors, 15/15) | 🟡 Basic JSON render; ≠ 4/15 + 14/15 lite / 15/15 nav |
| `/full-report` | Waitlist **marketing** page | 🟡 Minimal; ≠ 5/15 (sales/education, not report dashboard) |
| `/sample-report` | **Full report dashboard** preview (fictional) | 🟡 Outline; apply **14/15** sacred dashboard UI + **6/15** content |
| `/booking` | 1320 Reading request | 🟡 Minimal form; ≠ 9/15 (15 sections, 3 reading options, FAQ×9) |
| `/faq` | Global FAQ | 🟡 Placeholder (Batch 8 full copy); RESOURCES nav → `/faq` |
| `/privacy` | Privacy Policy | ❌ Missing (footer links 404 today) |
| `/terms` | Terms of Service | ❌ Missing |
| `/disclaimer` | Disclaimer | ❌ Missing |

**Not in Phase 1:** login, Soul Profile, check-in, timeline, membership tiers, payment, real email send (unless later doc overrides).

---

## Open questions (blockers until answered in docs 4–15)

1. **`/blueprint` vs `/sample-report`** — ✅ **Both.** `/blueprint` = education (8/15); `/sample-report` = full report preview (6/15). Homepage **EXPLORE THE BLUEPRINT** → `/blueprint`.
2. **`VIEW SAMPLE REPORT`** → **`/sample-report`** ✅ (6/15)
3. **Nav `RESOURCES`** → ✅ **`/sample-report` or `/faq`** (11/15; recommend `/faq` with Sample Report in footer RESOURCES column)
4. **Nav `ABOUT US`** → ✅ placeholder or footer anchor for now (11/15); not a full company page in P1 unless doc 12–15 adds one
5. **Homepage §8–§10** (Mid CTA, Full Report preview, About preview) — 11/15 lists them; **layout frozen** → merge copy into nearest existing sections unless steward approves new bands
6. **Hero mini labels** (ORIGIN / TRINITY / DUALITY / EMPTINESS) — 2/15; add only if slot exists without layout change
7. **`/your-code` UI** — Not in UI1; may share cosmic shell or arrive in UI2
8. **Contact email + effective date** — `[Insert Contact Email]` / `[Insert Date]` for legal pages (steward to provide)

---

## Doc log

### 1/15 — Content skeleton + structure ✅

**Goal:** User understands 1320 → enters birth date → clear free result → Full Report / Waitlist / Booking.

**System:** S1 Origin, S3 Vibration, S2 Mirror, S0 Void Gate. Independent frequency system; no fortune-telling / destiny language.

**7 pages:** `/`, `/about-1320`, `/your-code`, `/result`, `/full-report`, `/blueprint`, `/booking`.

**Homepage sections (content intent):** Hero, Calculator, Four dimensions, How 1320 Works (stable wording), Stats, Final CTA.

**Principles for Nova:** Separate UI / copy / calculation / JSON data.

---

### 2/15 — Homepage copy (English) ✅

**Source of truth for homepage text** (layout/images unchanged).

**Nav:** HOME | ABOUT 1320 | YOUR CODE | BLUEPRINT | RESOURCES | ABOUT US | GENERATE MY CODE

**Secondary CTAs:** EXPLORE THE BLUEPRINT | VIEW SAMPLE REPORT | JOIN THE FULL REPORT WAITLIST | BOOK A 1320 READING

**Key sections & copy notes:**
- Hero: CODE YOUR ORIGIN / REMEMBER YOUR SOUL + trust note + optional mini concept labels
- Calculator: START YOUR JOURNEY / Discover Your 1320 Soul Code
- Blueprint intro + 4 cards (Who You Are / How You Express / Who You Attract / How You Awaken) + LEARN MORE →
- How 1320 Works: 01 KNOW YOURSELF | 02 SEE YOUR PATTERNS | 03 ALIGN & CREATE | 04 INTEGRATE & REMEMBER
- Stats + optional line: “A symbolic system for self-awareness…”
- §8 Mid CTA: “Your code is not a sentence. It is a mirror.”
- §9 Full Report preview on homepage
- §10 About preview on homepage
- Final CTA + footer columns (SYSTEM / RESOURCES / COMPANY) + newsletter + © 2026
- SEO: Meta title/description, H1 “Remember Your Soul”, suggested H2s

**Tone:** Premium, calm, mystical, grounded. No astrology/tarot/HD/religion mix; no deterministic destiny.

---

### 3/15 — `/your-code` copy (English) ✅

**Meta:** Discover Your 1320 Soul Code | … (description in doc)

**Sections (implement in order):**
1. Hero — BEGIN YOUR 1320 JOURNEY; anchor ENTER MY BIRTH DATE
2. Birth Date Input — GENERATE YOUR CODE; labels Year/Month/Day; GENERATE MY CODE; privacy subtext
3. What You Will Receive — 4 items S1–S0
4. Why Your Birth Date
5. Grounded Disclaimer
6. FAQ × 6
7. Final CTA

**Behavior:**
- Route success → `/result`
- Loading sequence (5 lines recommended in doc)
- Transition copy before navigation
- Validation messages (empty, invalid year/month/day, combo, future, system error)

**Mobile short copy** provided for compression.

---

### 4/15 — `/result` free result copy (English) ✅

**Page goal:** User feels seen; **do not** give full report. Understand four codes; drive email + Full Report / Booking.

**Meta:** Your 1320 Soul Code Result | … (description in doc)

**Primary CTA:** `JOIN THE FULL REPORT WAITLIST`  
**Secondary:** `SEND MY RESULT` | `BOOK A READING` | `VIEW SAMPLE REPORT` | `GENERATE MY CODE`

**Sections (implement in order — 13 blocks):**
1. Loading / before result (optional sequence: S1→S3→S2→S0→preparing)
2. Result hero — YOUR 1320 SOUL CODE; boundary: mirror not prediction
3. Code display — `S1-{s1} / S3-{s3} / S2-{s2} / S0-{s0}` (pad S0 as needed)
4. **Four result cards** — each: label, dynamic title, subtitle, short description, `{sNFreeEssence}`, **locked full-report teaser** (do not show full S1–S6 body)
5. Integrated reflection — `{integratedFreeSummary}` + “first layer” closing
6. Reflection question — `{reflectionQuestion}` + fallback pool in doc
7. Email capture — SEND MY RESULT; success/error copy
8. Full report CTA — includes list + optional mention S4/S5/S6 locked modules
9. Sample report CTA → VIEW SAMPLE REPORT
10. Booking CTA — BOOK A READING
11. Share — COPY MY CODE / SHARE RESULT + share text template
12. Grounded disclaimer
13. FAQ × 5

**Empty state:** No query params / invalid → “No Soul Code Found” → CTA `/your-code`

**Dynamic fields (from calc + `get1320Content()` — not hardcoded):**

| Field | Source |
|-------|--------|
| `{s1}` `{s3}` `{s2}` `{s0}` | `calculate1320Code()` |
| `{s1Name}` `{s3Name}` `{s2Name}` `{s0Name}` | JSON (en/zh fallback) |
| `{s1FreeEssence}` … `{s0FreeEssence}` | JSON free-layer fields (map from essence/guidance per data schema) |
| `{integratedFreeSummary}` | `generateFreeSummary()` or template from S1+S0 |
| `{reflectionQuestion}` | JSON or rotated fallback from doc |

**Fallback if missing data:**  
“This section is being prepared for the full report. Your current code still offers a meaningful first-layer reflection.”

**Mobile short:** code line + UNLOCK FULL REPORT / SAVE MY RESULT

**Boundaries:** No fate/prediction; no medical/legal/financial claims; S6 not on free page as full content.

**Current code gap vs 4/15:**
- Only ~7 simple `SectionCard` blocks
- No per-card locked teaser
- No loading state on page entry
- No share, sample CTA block, FAQ, empty-state polish
- Email CTA copy/button label differs (`Send My Code to Email` vs `SEND MY RESULT`)
- S4/S5/S6: mention in full-report section, not per-card locked teasers

---

### 5/15 — `/full-report` waitlist copy (English) ✅

**Page goal:** Convert free-result users → **waitlist** (Phase 1: **no payment**) or **booking**. Boundaries: awareness/integration, not prediction or fate.

**Meta:** Full 1320 Soul Origin Report | Unlock Your Soul Blueprint (description in doc)

**Primary CTA:** `JOIN THE WAITLIST` (also hero: `JOIN THE WAITLIST`; form button same)  
**Secondary:** `BOOK A 1320 READING` | `VIEW SAMPLE REPORT` | `GENERATE MY CODE`

**Sections (14 blocks):**
1. Hero — GO DEEPER INTO YOUR CODE; boundary line; trust note
2. Report Promise — “deeper map”; “code is not a sentence”
3. **Free vs Full comparison** — two columns (free 5 bullets vs full 10+ bullets)
4. Full Report Includes — 6 modules (S1, S3, S2, S0, Integrated Blueprint, Reflection & Integration)
5. **Advanced Modules Preview** — S4 Shadow, S5 Soul Mission, S6 Money + **S6 disclaimer** (not financial advice)
6. Report Experience — 3 points: SEE / UNDERSTAND MIRRORS / CHOOSE FROM AWARENESS
7. **Waitlist form** — First Name, Email, optional Birth Date, checkbox, success/error messages
8. Booking CTA
9. Sample Report CTA → VIEW SAMPLE REPORT
10. Who This Is For (5 items)
11. Who This Is Not For — prediction boundary
12. FAQ × 8 (incl. S6 not financial advice, reading vs waitlist)
13. Final CTA
14. Grounded Disclaimer

**Phase 1 behavior (explicit):**
- Waitlist-only; no Stripe/payment
- Booking = secondary path
- Sample report link if `/sample-report` exists

**Waitlist form fields (upgrade from current `LeadCaptureForm`):**
- First Name + Email (+ optional birth date)
- Checkbox: “I want to receive updates about the Full 1320 Soul Origin Report.”
- Success: “You are on the waitlist…”

**Mobile short copy** included.

**Current code gap vs 5/15:**
- Only ~3 `SectionCard` blocks + basic `LeadCaptureForm` (email + consent only)
- Missing: comparison table, 6 modules, advanced S4–S6 preview, experience section, who for/not for, FAQ×8, expanded form fields

---

### 6/15 — `/sample-report` preview copy (English) ✅

**Page goal:** Show what Full Report **looks/feels like** — not deliver a personal reading. Build trust → waitlist / booking / generate own code.

**Meta:** Sample 1320 Soul Origin Report | Preview Your Soul Blueprint

**Fixed fictional sample (canonical for Phase 1):**

| Field | Value |
|-------|--------|
| Birth date | **May 22, 1980** |
| Code | **S1-18 / S3-110 / S2-27 / S0-07** |

Must state clearly: **sample only, not a real person, not personal reading.**

**Primary CTA:** `GENERATE MY CODE` → `/your-code`  
**Secondary:** `JOIN THE FULL REPORT WAITLIST` | `BOOK A 1320 READING`

**Sections (16 blocks):**
1. Hero — SAMPLE REPORT; boundary: personal report from user’s own birth date
2. Sample Profile — date + code display + fiction note
3. Report Opening — four dimensions intro
4. **Sample S1** — S1-18 The Transformer (overview, gifts, shadow, integration, reflection Q)
5. **Sample S3** — S3-110 Vibration Expression
6. **Sample S2** — S2-27 Mirror Path 27
7. **Sample S0** — S0-07 Illusion of Self-Worth
8. Integrated Blueprint Summary
9. Advanced Layer Preview — S4/S5/S6 + S6 disclaimer
10. Sample Integration Practices (3 practices)
11. What Makes the Full Report Different (3 points)
12. Generate Personal Code CTA
13. Waitlist CTA (form: first name, email, optional birth date)
14. Booking CTA
15. FAQ × 6
16. Grounded Disclaimer

**Implementation note for Nova:**
- Prefer **`get1320Content()`** for S1-18 / S2-27 / S0-07 / S3 default where JSON fields exist; doc provides **tone/structure template** and extended sample prose where JSON is thin.
- Do **not** expose full S4–S6 body — preview teasers only (aligned with 4/15 free layer rules).
- Routes: `/your-code`, `/full-report`, `/booking`

**Clarifies open question:** `VIEW SAMPLE REPORT` (2/15, 4/15) → **`/sample-report`** (not `/blueprint`).

**Current code gap vs 6/15:**
- Only section list placeholder; no sample profile, no S1–S0 sample sections, no integration practices, no waitlist block, no FAQ

---

### 7/15 — `/about-1320` copy (English) ✅

**Page goal:** Build trust — what 1320 is / is not; why birth date; how four codes work; not fortune-telling or fate lock.

**Meta:** About 1320 | Soul Origin Code System

**Primary CTA:** `GENERATE MY CODE`  
**Secondary:** `EXPLORE THE BLUEPRINT` → `/blueprint` | `VIEW SAMPLE REPORT` → `/sample-report`

**Sections (14 blocks):**
1. Hero — A Soul Intelligence System for Remembering Who You Are
2. What Is 1320 — 1/3/2/0 symbolism (Origin, Trinity, Duality, Emptiness)
3. What 1320 Is Not — not astrology/tarot/HD/numerology/prediction; “mirror not sentence”
4. Why Birth Date — how year/month/day map to S1/S3/S2/S0 calculation (educational)
5. The Four Codes — S1/S3/S2/S0 modules with microcopy
6. How 1320 Works — 4 steps: Calculate → Read → See Patterns → Integrate
7. Philosophy — not fixed identity; quote
8. What Makes 1320 Different — 3 points (frequency-based, relationship-aware, integration-focused)
9. Who 1320 Is For (5 items)
10. Who 1320 Is Not For — not outsourcing power
11. The 1320 Path — CTA `DISCOVER YOUR 1320 SOUL CODE`
12. FAQ × 8
13. Final CTA — VIEW SAMPLE REPORT secondary
14. Grounded Disclaimer

**Tone:** Premium, calm, mystical, grounded; free will + integration; no external authority.

**Nav note:** Footer “About 1320” / “ABOUT US” may both need routing clarity (7/15 is `/about-1320`; “About Us” company page may be later doc).

**Current code gap vs 7/15:**
- Only 3 minimal `SectionCard` blocks
- Missing: 1/3/2/0 explanation, four code modules, how-it-works steps, philosophy, who for/not for, FAQ×8, secondary CTAs

---

### 8/15 — `/blueprint` education copy (English) ✅

**Page goal:** **Educate** (not primary conversion) — why S1/S3/S2/S0 matter; user understands their result. Trust + clarity before/after generating code.

**Meta:** The 1320 Blueprint | Origin Frequency, Vibration Tier, Mirror Path & Void Gate

**Primary CTA:** `GENERATE MY CODE` → `/your-code`  
**Secondary:** `VIEW SAMPLE REPORT` → `/sample-report` | (layout item) `EXPLORE FULL REPORT` → `/full-report`

**Sections (16 blocks):**
1. Hero — Four Dimensions. One Soul Code.
2. Blueprint Overview — four layers (core / expression / mirror / return)
3. Meaning of 1320 — 1/3/2/0 symbolic blocks (Origin, Trinity, Duality, Emptiness)
4. **S1 section** — Who You Are + what it reveals + microcopy + CTA `DISCOVER YOUR ORIGIN FREQUENCY`
5. **S3 section** — How You Express + CTA `GENERATE MY VIBRATION TIER`
6. **S2 section** — Who You Attract + CTA `DISCOVER MY MIRROR PATH`
7. **S0 section** — How You Awaken + CTA `DISCOVER MY VOID GATE`
   - *(Per-segment CTAs can all route to `/your-code` unless later doc says otherwise)*
8. How the Four Codes Work Together — four questions summary
9. Example Blueprint — sample **S1-18 / S3-110 / S2-27 / S0-07** + VIEW SAMPLE REPORT
10. Why the Blueprint Matters
11. Blueprint vs Identity — not your identity, mirror only
12. How to Read Your Result — 4 reading steps
13. The 1320 Blueprint Path — 4 steps (aligns with homepage How 1320 Works wording)
14. Generate Code CTA
15. FAQ × 8
16. Grounded Disclaimer

**Tone:** Education-first; premium, calm; no prediction/astrology/tarot/HD/religion framing.

**Resolves IA:**
- `/blueprint` ≠ `/sample-report`
- Homepage pillar **LEARN MORE →** `/blueprint#s1` … `#s0` per card (15/15); not `/sample-report`
- Nav **BLUEPRINT** → `/blueprint`

**Current code gap:** Route does not exist; pillar cards may still link to `/sample-report`.

---

### 9/15 — `/booking` reading request copy (English) ✅

**Page goal:** 1320 Reading = space for **awareness & integration**, not fortune-telling or telling user their fate.

**Meta:** Book a 1320 Soul Code Reading | …

**Primary CTA:** `BOOK A READING` / form submit `REQUEST BOOKING`  
**Secondary:** `GENERATE MY CODE FIRST` | `JOIN FULL REPORT WAITLIST` | `VIEW SAMPLE REPORT`

**Phase 1 behavior:**
- Booking **request form only** — no payment, no instant confirmation promise
- Success: “Your booking request has been received…”
- **Testimonials:** placeholders only — **do not fabricate** names/photos/ratings

**Sections (15 blocks):**
1. Hero
2. What Is a 1320 Reading
3. What We Explore (S1–S0 modules)
4. Session Experience (3 points)
5. Who This Is For (5 items)
6. Who This Is Not For — no outsourcing decisions; not therapy/diagnosis
7. **Reading Options** — Intro 45min | Deep 75min | Integration 60min (each with CTA)
8. Before You Book — generate code first
9. What to Prepare
10. **Booking Form** — First/Last name, Email, Birth Date, Code (optional), Reading Type, Timezone, Message, consent checkbox
11. After Booking — 4 steps what happens next
12. Testimonial placeholders (3 quotes, no fake clients)
13. FAQ × 9
14. Final CTA
15. Grounded Disclaimer

**Form fields (upgrade from current booking page):**
- Preferred Reading Type: Intro | Deep | Integration | Not Sure Yet
- Consent: reflection/self-awareness, not prediction/diagnosis/professional advice
- Submit label: `REQUEST BOOKING` (not generic Submit Request)

**Current code gap vs 9/15:**
- Single basic form (name, email, birth date, service dropdown, message)
- Missing: reading options section, before-book/prepare, after-book steps, testimonials placeholder, FAQ×9, expanded form fields

**Steward note — Phase 1 primary path (all pages now have copy docs 1–9):**
```
Homepage → /your-code → /result → /full-report
         ↘ /sample-report, /about-1320, /blueprint, /booking
```
(Supporting/education/conversion pages; homepage calculator wire still P0.)

---

### 10/15 — Legal / support pages + footer + consent copy ✅

**New routes (Phase 1 MVP):**

| Route | Purpose |
|-------|---------|
| `/faq` | Global FAQ (grouped: General, Calculation, Free/Full Report, Reading, Privacy) |
| `/privacy` | Privacy Policy — placeholders: `[Insert Date]`, `[Insert Contact Email]` |
| `/terms` | Terms of Service — same placeholders; Phase 1 no payment (§6 placeholder) |
| `/disclaimer` | Standalone disclaimer (S6 money, relationships, no guarantees, etc.) |

**`/faq` highlights:**
- Sections: General | Calculation (S1–S0) | Free Result & Full Report | Reading/Booking | Privacy
- Final CTA: `GENERATE MY CODE`
- Meta title/description provided

**Footer (site-wide):**
- Mini legal line: symbolic tool, not prediction/professional advice, user authority
- **Links must work:** FAQ | Privacy Policy | Terms of Service | Disclaimer
- Homepage footer columns (2/15) should link FAQ + legal pages (not plain text)

**Form consent copy (apply across site):**

| Context | Consent text |
|---------|----------------|
| Birth date calculator | Understand symbolic tool, not prediction/professional advice |
| Waitlist | Updates about Full Report + unsubscribe |
| Booking | Reflection only; not prediction/diagnosis/therapy/legal/financial/medical |
| Email capture | Result + related updates + unsubscribe |

**Note for steward:** MVP placeholder — **not final legal counsel**. Nova adds effective date + contact email placeholders.

**Current code gap:**
- `/privacy`, `/terms`, `/faq`, `/disclaimer` do not exist
- Footer links are non-functional list items on homepage
- Consent strings on forms ≠ 10/15 unified copy

---

### 11/15 — NOVA Content Implementation Pack (master) ✅

**Role:** Consolidates docs 1–10 into one implementation spec. **Use 1–10 for full page copy; use 11/15 for routing, tech, build order, acceptance.**

**Product / domain:**
- Primary: **1320SoulCode.com**
- Phase 2 (do not build): **TheSoulProfile.com** — Soul Profile, saved code, check-ins, evolution timeline, membership

**13 routes (canonical list, +13/15):** `/` · `/about-1320` · `/blueprint` · `/your-code` · **`/generating`** · `/result` · `/full-report` · `/sample-report` · `/booking` · `/faq` · `/privacy` · `/terms` · `/disclaimer`

**Global header nav:**

| Label | Route |
|-------|--------|
| HOME | `/` |
| ABOUT 1320 | `/about-1320` |
| YOUR CODE | `/your-code` |
| BLUEPRINT | `/blueprint` |
| RESOURCES | `/sample-report` **or** `/faq` |
| ABOUT US | placeholder / footer anchor (P1) |
| CTA | `GENERATE MY CODE` → `/your-code` |

**Global CTA routing:**

| CTA | Route / action |
|-----|----------------|
| GENERATE MY CODE | `/your-code` |
| EXPLORE THE BLUEPRINT | `/blueprint` |
| VIEW SAMPLE REPORT | `/sample-report` |
| JOIN THE FULL REPORT WAITLIST | `/full-report` |
| BOOK A 1320 READING | `/booking` |
| SEND MY RESULT | email capture on `/result` |

**Boundary lines (repeat site-wide):**
- “Your code is a mirror — not a sentence.”
- “You remain the authority of your own path.”

**Visual (non-negotiables from mockup):**
- Dark midnight cosmic, gold sacred geometry, serif hero, ivory text, violet/blue/teal accents
- **Do not redesign** homepage layout/images (steward lock) — apply visual system to **inner pages**
- Avoid: generic SaaS white, cheap astrology, neon sci-fi, flat corporate

**Data architecture (11/15 suggestion vs current repo):**

| 11/15 suggests | Current repo | Nova approach |
|----------------|--------------|---------------|
| `data/s1.json` etc. | `data/1320/s1-origin-frequency.json` + S0–S6 | **Keep `data/1320/`** canonical for interpretations |
| `data/pages/*.json` | not yet | Add modular **page copy** files or `content/pages/*.ts` for static EN (ZH-ready) |
| `calculate1320Code` | ✅ `lib/calculate1320Code.ts` | Align return shape; S0 pad 2 digits in display |
| `get1320Content()` | ✅ exists | Extend to return all fields in §9: `*Name`, `*FreeEssence`, `integratedFreeSummary`, `reflectionQuestion` |

**Calculation (confirmed):** S1=year digits sum · S3=month×day · S2=month+day · S0=YYYYMMDD digit sum % 20 · display `S0-07` padded

**Forms (Phase 1):** All validation/error/success strings in docs 3/4/5/9/10/11 — no payment · booking request only · store calc result in **session/local** for `/result`

**Suggested components (11/15 §15):** Header, Footer, HeroSection, CTAButton, BirthDateCalculator, BlueprintCard, HowItWorksStep, StatsBar, ResultCodeDisplay, ResultCard, ReflectionQuestion, EmailCaptureForm, WaitlistForm, BookingRequestForm, FAQAccordion, DisclaimerBlock, LegalPageTemplate, SampleReportSection, SacredGeometryVisual

**States to implement:** calculator (empty/validating/loading/success/error) · result (loading/hasResult/missingResult/email success/error) · waitlist · booking

**Analytics events (11/15 §17):** `homepage_generate_click`, `calculator_submit`, `calculator_success`, `calculator_error`, `result_view`, `email_capture_submit`, `email_capture_success`, `full_report_waitlist_click`, `waitlist_submit`, `waitlist_success`, `booking_click`, `booking_submit`, `booking_success`, `sample_report_view`, `blueprint_view`

**SEO metadata:** All page titles/descriptions listed in 11/15 §13 — implement via Next.js `metadata` per route

**Footer columns (11/15 §14):** SYSTEM (About, How It Works, Blueprint, FAQ) · RESOURCES (Articles, Guides, Glossary, Blog, **Sample Report**) · COMPANY (About Us, Mission, Contact, Privacy, Terms, Disclaimer) · Newsletter SUBSCRIBE · mantra + © 2026

**Phase 1 build order (updated with 13/15):**
1. Global layout, Header, Footer  
2. Homepage (copy only where layout allows)  
3. `/your-code` calculator  
4. `calculate1320Code()` + session/query handoff  
5. **`/generating` activation chamber** (4–6s → auto `/result`)  
6. `/result` free rendering  
7. Email capture  
8. `/full-report` waitlist  
9. `/sample-report`  
10. `/about-1320`  
11. `/blueprint`  
12. `/booking`  
13. `/faq` · `/privacy` · `/terms` · `/disclaimer`  
14. Responsive mobile polish  
15. SEO metadata (+ `/generating` if needed)  
16. Analytics events (+ `generating_view`, `generating_complete`?)  

**Phase 1 acceptance criteria (11/15 §19):**
- [ ] Homepage → generate → valid birth date → `/generating` (4-step chamber) → `/result` with correct code + 4 cards  
- [ ] Email save · waitlist · sample report · booking request  
- [ ] Legal pages linked from footer  
- [ ] Mobile clean  
- [ ] No prediction/fate/diagnosis/professional-advice framing in copy  

**Homepage sections (11/15 §11 — vs layout lock):** Hero, Calculator, Blueprint intro, S1–S0 cards, How 1320 Works, Stats, **Mid-Page CTA**, **Full Report Preview**, **About Preview**, Final CTA, Footer — last three may be copy-only merge if no new layout bands.

---

### 12/15 — JSON data structure standard (S1–S0) ✅

**Principle:** **Schema first, then content.** Do not hardcode interpretations in UI.

**Target files under `data/1320/`:**

| File | Lookup |
|------|--------|
| `s1-origin-frequency.json` | exact `number` 1–44 |
| `s3-vibration-tier.json` | **range** `min`–`max` (12 tiers recommended) |
| `s2-mirror-path.json` | exact `number` 1–50 |
| `s0-void-gate.json` | exact `number` 0–19 |
| `reflection-questions.json` | by tags / segments |
| `integrated-summary-templates.json` | by `conditions` + default |
| `free-result-copy.json` | static UI labels for `/result` |

**Core types (bilingual-ready):**

```ts
type LocalizedText = { en: string; zh?: string };
type Locale = "en" | "zh";
```

**Per-segment fields (minimum for `/result` free layer):**
- `title`, `subtitle`, `shortLabel`, `freeEssence`, `lockedPreview`
- Optional on entry: `reflectionQuestion`, `integrationPrompt`
- **Full report only:** `fullEssence`, `coreGifts`, `shadowPatterns`, `lesson`, `direction`, etc.

**`get1320Content()` target API (12/15):**

```ts
get1320Content({ s1, s3, s2, s0, locale?: "en" | "zh" })
→ {
  s1Content, s3Content, s2Content, s0Content,
  integratedFreeSummary: LocalizedText,
  reflectionQuestion: LocalizedText
}
```

**S3 helper:** `getS3Tier(s3Raw, tiers[])` — range match; fallback if no tier.

**`/result` render rules:**
- Show only `freeEssence` + `lockedPreview` per card (not `fullEssence` / shadow arrays)
- Reserve advanced fields for full report / paid layer

**Fallback copy (missing entry):**
> This section is being prepared for the full report. Your current code still offers a meaningful first-layer reflection.

---

#### Current repo vs 12/15 target schema (important)

| Aspect | **Current v1** (in repo) | **Target v2** (12/15) |
|--------|-------------------------|----------------------|
| Shape | Object keyed by number `"18": {…}` | **Array** of records `[{ id, number, … }]` |
| i18n | `nameEn` / `nameZh` / `essenceZh` flat fields | **`{ en, zh }`** `LocalizedText` objects |
| S3 | `default` + empty `tiers[]` | Range-based **12 tiers** |
| Extras | S4–S6 separate JSON (keep) | Same; not redefined in 12/15 |
| Helpers | `get1320Content(code)` raw records | Typed content + `locale` + summary/reflection resolution |
| New files | Missing | `reflection-questions.json`, `integrated-summary-templates.json`, `free-result-copy.json` |

**Migration strategy (steward-approved phased approach):**

1. **Phase A — Structure alive:** Add `lib/types/1320-content.ts` + adapter `lib/getLocalized.ts` + extend `get1320Content()` to normalize **v1 → v2 shape** at read time (no mass JSON rewrite yet).
2. **Phase B — Sample codes in v2 native format:** Fully model **S1-18 / S3-110 / S2-27 / S0-07** in new schema (matches sample-report + test cases).
3. **Phase C — Gradual fill:** S1 1–44, S3 12 tiers, S2 1–50, S0 0–19 (do **not** bulk-convert all founder v1 copy without approval).
4. **Do not** rewrite founder JSON wording without explicit approval (AGENTS.md / handoff rule).

**Canonical test code (use for smoke + sample-report):**

`1980-05-22` → `S1-18 / S3-110 / S2-27 / S0-07`

**Calculation (unchanged):**
- S1 = sum year digits
- S3 = month × day (raw number for tier lookup)
- S2 = month + day
- S0 = sum YYYYMMDD digits % 20 · display `S0-07` zero-padded

---

### 13/15 — `/generating` activation chamber (new route) ✅

**Steward decision:** **Add this page.** Transforms experience from “form site” → “system entry.”

**Updated critical path:**
```
/your-code  →  /generating  →  /result
```
(Homepage calculator should use same path after valid submit.)

**Route:** `/generating`  
**Duration:** 4–6 seconds total · ~1s per step · then **auto-route** to `/result`  
**Fallback:** `VIEW MY RESULT` button if auto-route fails

**Page positioning:**
- Not generic spinner / SaaS progress
- **Sacred technology activation chamber** — frequency scan / blueprint opening
- Tone: sacred, premium, clear, grounded — **not** fortune-telling ritual, not “universe decoding you”

**Visual:**
- Dark midnight cosmic + gold sacred geometry portal
- Central **1320 emblem** (approved asset)
- Four nodes around emblem: **S1 → S3 → S2 → S0** light in sequence
- Gold glow, subtle particles, luminous orbit / progress line
- Mobile 9:16: logo top · emblem center · step text · CTA bottom

**Copy structure:**
| Block | Text |
|-------|------|
| Eyebrow | YOUR CODE IS FORMING |
| H1 | Opening Your / 1320 Soul Blueprint |
| Body | Mapping four-part code through S1, S3, S2, S0 |
| Boundary | Not a prediction — mirror for awareness |
| Step 01 | Reading your Origin Frequency… (+ subcopy) |
| Step 02 | Mapping your Vibration Tier… |
| Step 03 | Revealing your Mirror Path… |
| Step 04 | Opening your Void Gate… |
| Complete | Your 1320 Soul Code is ready. + four labels listed |
| CTA | VIEW MY RESULT |

**Technical:**
- Pass birth date via query params (`?year=&month=&day=`) or sessionStorage (11/15 already mentions session for result)
- Run `calculate1320Code()` during or before sequence (can pre-calc on entry)
- `generating` state machine: step 0–4 → complete → redirect

**Relates to 3/15:** 3/15 had loading on your-code / result — **13/15 supersedes** with dedicated `/generating` page (richer UX than inline spinner).

**Inner UI:** ✅ **UI1 mockup** — `public/generating-ui.png` (source: `Generating Your 1320 Soul Code.png`)

---

### 14/15 — Full report visual system (Sacred Report Dashboard) ✅

**Steward intent:** Full report ≠ PDF ≠ generic quiz result. = **Soul Blueprint Dashboard + Sacred Report** — ritual + readable structure; user returns to re-read (Phase 2 Soul Profile precursor).

**Tone vs homepage:** Homepage = attract · Report = **calm, spacious,沉淀 (settle/read)**

**Design system:**
- Dark cosmic + gold sacred geometry accents
- Glassmorphism report cards
- Premium serif headings · warm ivory body
- Soft glowing dividers
- **Color modules:** S1 gold/deep violet · S3 violet/blue-purple · S2 blue · S0 teal
- Interactive report feel (not static PDF layout)

**Report page structure (10 sections):**

| # | Section | Notes |
|---|---------|--------|
| 1 | **Report Header** | YOUR 1320 SOUL ORIGIN REPORT + code line + boundary sentence |
| 2 | **Soul Code Overview** | Four-part at-a-glance (S1–S0 labels + shortLabel) |
| 3 | **Integrated Soul Blueprint** | Hero summary card — gold line, subtle geometry bg |
| 4 | **S1 Full Card** | Heaviest weight — Overview, Gifts, Shadow, Lesson, Direction, Color, Totem, Integration, Reflection Q |
| 5 | **S3 Full Card** | Expression — not “stat levels”; rhythm, growth edge |
| 6 | **S2 Full Card** | Mirror — not “destined partner”; patterns, lesson |
| 7 | **S0 Full Card** | Deepest — illusion, awakening path, integration practice |
| 8 | **Integration Practices** | 3 actionable mini-cards |
| 9 | **Reflection Journal** | 3 static questions (P1); saveable P2 on TheSoulProfile.com |
| 10 | **Final CTA** | Book reading · Soul Profile waitlist · “awareness → action” |

**Header actions (Phase 1):**

| Button | P1 behavior |
|--------|-------------|
| SAVE REPORT | UI placeholder / local bookmark? |
| DOWNLOAD PDF | **UI only — implement later** |
| EMAIL ME THIS REPORT | hook to email capture |
| BOOK A READING | → `/booking` |

**Final CTA (P1):**
- BOOK A 1320 READING ✅
- SAVE TO MY SOUL PROFILE → **Coming Soon** (Phase 2)
- JOIN THE SOUL PROFILE WAITLIST ✅

**Boundaries:** No quiz/medical/horoscope look · S2 not relationship prediction · S3 not ability scores

---

#### How 14/15 maps to routes (clarification)

| Route | Role per 14/15 |
|-------|----------------|
| `/result` | **Free layer** only (4/15) — short cards + locked teasers, NOT full dashboard |
| `/sample-report` | **Canonical full report dashboard UI** — fictional S1-18… (6/15 content + 14/15 layout) |
| `/full-report` | **Marketing / waitlist** (5/15) — sells full report; does not replace dashboard |
| Future paid / profile | Reuse same **ReportDashboard** components (14/15) |

**Implementation:** Build shared components e.g. `ReportHeader`, `ReportModuleCard`, `IntegratedSummaryCard`, `IntegrationPracticeGrid`, `ReflectionJournal` — used by `/sample-report` first; data from `get1320Content()` **full** fields per 12/15 schema.

**S4–S6:** Not in 14/15 wireframe; can append as additional modules on full report when data ready (after S1–S0 cards).

---

### 15/15 — S-segment routing & anchor architecture ✅

**Founder decision:** Phase 1 **no separate public pages** per S segment. Avoid “content encyclopedia” weight. Priority funnel:

`Homepage → Generate My Code → Result → Full Report / Booking / Waitlist`

#### Phase 1 — `/blueprint` (single page, four anchored sections)

| Anchor | Segment | Role (order locked) |
|--------|---------|---------------------|
| `/blueprint#s1` | Origin Frequency | **Core** — soul archetype, gifts, life axis |
| `/blueprint#s3` | Vibration Tier | **Expression** — how energy shows (not ability scores) |
| `/blueprint#s2` | Mirror Path | **Mirror** — relationship patterns (not destiny match) |
| `/blueprint#s0` | Void Gate | **Awakening** — illusion, return to clarity |

- Homepage four pillar cards: **LEARN MORE** → matching anchor (not `/sample-report`)
- Map to 8/15 sections 4–7 (`id="s1"` … `id="s0"`)

#### Phase 1 — Report pages (modules in-page, not routes)

On **`/result`** (free) and **`/sample-report`** (full dashboard per 14/15):

- S1 / S3 / S2 / S0 = **separate report module cards** on one URL
- **Left sidebar anchor nav** (sticky on desktop): Overview · S1 · S3 · S2 · S0 · Integration · Reflection Journal
- No `/report/s1` etc. in Phase 1

#### Phase 2 — reserved deep education routes (do not build in P1)

```
/blueprint/s1-origin-frequency
/blueprint/s3-vibration-tier
/blueprint/s2-mirror-path
/blueprint/s0-void-gate
```

Each future page: What is Sx · calculation · why it matters · what it reveals · sample archetypes · how to read · CTA Generate My Code.

**Nova implementation notes:**
- Centralize segment metadata + future slugs in e.g. `lib/segments.ts` (ids, anchors, P2 paths, colors from 14/15)
- `LearnMoreLink` / nav helpers use anchors now; swap to P2 paths without rewriting pages
- Homepage `page.tsx`: fix four `LEARN MORE` links → `/blueprint#s1` … `#s0` (currently → `/sample-report`)

---

## Phase 1 final implementation order

**Gate:** 15/15 ✅ · UI 2/2 ✅ (`generating-ui.png`, `report-ui.jpeg`).

| Batch | Scope | Depends on |
|-------|--------|------------|
| **0** | `lib/types/1320-content.ts`, v1→v2 adapter, `get1320Content({ locale })`, new JSON stubs (12/15), smoke **S1-18 / S3-110 / S2-27 / S0-07** | — |
| **1** | `lib/segments.ts` (anchors, colors, P2 slug placeholders); shared `Header`/`Footer` + `page-shell` (11/15 nav) | 0 |
| **2** | `/blueprint` (8/15 copy, sections `id=s1|s3|s2|s0`, scroll-margin); homepage LEARN MORE → anchors | 1 |
| **3** | `/your-code` (3/15); form → `/generating` (13/15); session storage for codes | 0, 1 |
| **4** | `/generating` chamber → auto `/result` | 3 |
| **5** | `/result` (4/15 structure + 15/15 sidebar + module cards; locked teasers; JSON-driven) | 0, 4 |
| **6** | Report dashboard components (14/15); `/sample-report` (6/15 fictional sample + sidebar) | 0, 1 |
| **7** | `/full-report` waitlist (5/15); `/about-1320` (7/15); `/booking` (9/15) | 1 |
| **8** | Legal + `/faq` (10/15); footer links + consent copy | 1 |
| **9** | Homepage copy-only pass (2/15); wire hero calculator if slot allows without layout change | 2, 3 |
| **10** | SEO metadata, analytics hooks, `.env.example`, lead API stub, lint/build + funnel smoke (11/15 §19) | all |

**Do not build in Phase 1:** `/blueprint/s1-*` routes · per-S public pages · Soul Profile save · PDF download backend.

---

## UI files log

| # | Route / use | Repo path | Source | Status |
|---|-------------|-----------|--------|--------|
| — | Homepage | `public/homepage-ui.png` | (in repo) | ✅ Layout locked |
| **UI1** | **`/generating`** activation chamber | `public/generating-ui.png` | `C:\Users\holly\Downloads\Generating Your 1320 Soul Code.png` | ✅ Reference for Batch 4 |
| **UI2** | **Report dashboard** (`/sample-report`; informs `/result` modules) | `public/report-ui.jpeg` | `YOUR 1320 SOUL ORIGIN REPORT.jpeg` | ✅ Batch 5–6 |

### UI1 — `/generating` layout spec (match mockup)

**Canvas:** Dark cosmic full-bleed (nebula, stars, mountain silhouette); gold sacred geometry; same brand language as homepage.

| Zone | Elements |
|------|----------|
| **Top bar** | Left: geometric mark + `1320 SOUL CODE` · Right: lock + `Secured & Private` |
| **Hero copy** | Eyebrow: `YOUR CODE IS FORMING` · H1 (serif): `Opening Your` / `1320 Soul Blueprint` · Sub: four-part mapping through S1–S0 |
| **Center portal** | Large gold sacred-geometry ring · center glow `1320` · **4 orbital nodes** (lines to center): S1 sun “Origin Frequency”, S3 wave “Vibration Tier”, S2 triquetra “Mirror Path”, S0 circle “Void Gate” — each with short descriptor |
| **Active step** | `CURRENT STEP` label · step title e.g. `01 Reading your Origin Frequency...` (serif) · one-line subcopy |
| **Progress** | Horizontal gold gradient bar (~25% per step when animating) |
| **Step rail** | 01–04 labels matching 13/15 copy (Origin → Vibration → Mirror → Void) |
| **Boundary card** | Glass panel + gold border + geometry icon: “not a prediction… mirror for awareness…” |
| **CTA** | Gold pill `VIEW MY RESULT` (chevron) — visible during sequence as **fallback**; auto-redirect still primary per 13/15 |
| **Footer** | Lock + `Your data is encrypted and never stored` |

**Build notes:** Reuse homepage tokens (`globals.css` gold/cosmic); emblem can be CSS/SVG + optional asset; animate node glow + progress bar on 1s × 4 steps; mobile: stack emblem → step → CTA per 13/15.

### UI2 — Sacred Report Dashboard layout spec (match mockup + 14/15 + 15/15)

**Primary route:** `/sample-report` (fictional S1-18…). **Reuse on:** `/result` (free layer subset + same sidebar pattern per 15/15).

**Canvas:** Dark cosmic + starfield + gold horizon glow; calmer/spacious than homepage (14/15 “沉淀”).

| Zone | Elements |
|------|----------|
| **Left sidebar (sticky)** | Brand: `1320 Soul Origin Code System` + geometry mark · Nav anchors: **Overview** (active state) · S1 Origin Frequency · S3 Vibration Tier · S2 Mirror Path · S0 Void Gate · Integration · Reflection Journal · Bottom mini glass card (“Your Soul Journey” / philosophy blurb) |
| **Top actions** | `SAVE REPORT` · `EMAIL ME` · `DOWNLOAD PDF` (P1 UI only) · gold **`BOOK A READING`** |
| **Report header** | H1 serif (mockup: *Your Soul Blueprint Is Ready* — align final H1 with **14/15** `YOUR 1320 SOUL ORIGIN REPORT` unless steward prefers mockup line) · **Code strip** color-coded: S1-18 / S3-110 / S2-27 / S0-07 · large gold sacred geometry behind header |
| **Overview row** | Four glass cards (S1 gold · S3 violet · S2 blue · S0 teal): icon, segment label, subtitle (Who You Are / How You Express / …), one-line essence |
| **Integrated card** | Wide glass panel + gold geometry icon + **Integrated Soul Blueprint** paragraph (14/15 §3) |
| **Segment columns** | Desktop: **4-column grid** of deep module cards (mockup); mobile: stack in S1→S3→S2→S0 order. Each: hero glyph (phoenix/portal etc.), archetype name, field list (Overview, Core Gifts, Shadow… per 14/15), **Reflection Question** box, **`VIEW FULL INSIGHT`** (expand or scroll-to-section) |
| **Integration Practices** | 3 horizontal practice tiles (01 Observe / 02 Return Worth / 03 Transform) with icons |
| **Reflection Journal** | 3 prompt rows with chevrons (P1 static; P2 save) |
| **Final CTA band** | “Your Code Is Only the Beginning” + copy · **BOOK A 1320 READING** (gold) · **JOIN SOUL PROFILE WAITLIST** (violet) · **SAVE TO MY SOUL PROFILE (COMING SOON)** (teal + lock) |

**CSS tokens:** `backdrop-blur`, `bg-white/5`, `border-white/10`, segment accent borders/glows, gold divider diamonds (14/15).

**Copy source:** 14/15 structure + 6/15 sample content + JSON via `get1320Content()`; mockup is layout authority, not copy override.

**Do not build from mockup alone:** Quiz-result density, diagnosis tone, horoscope framing (14/15 boundaries).

---

## Current codebase gaps (Phase 1 wrap-up checklist)

### P0 — Data layer (12/15 — before full page builds)
- [x] Add `lib/types/1320-content.ts` + `LocalizedText` helpers (`lib/getLocalized.ts`)
- [x] Add `reflection-questions.json`, `integrated-summary-templates.json`, `free-result-copy.json`
- [x] Extend `get1320Content({ s1, s3, s2, s0, locale })` with adapter from current v1 JSON (`lib/adapt1320V1.ts`)
- [x] S3 range tiers: 12 tiers; **110** → S3-T04 Amplified Expression
- [x] Smoke: **S1-18 / S3-110 / S2-27 / S0-07** — `npm run smoke:content`

### P0 — Critical path
- [ ] Homepage + `/your-code` form → **`/generating`** → `/result` (13/15)
- [ ] `/generating` page per **13/15** + **UI1** (`generating-ui.png`): portal, 4 nodes, step rail, progress, boundary card, CTA
- [ ] `/your-code` full content + validation copy + loading/transition (per 3/15)
- [ ] `/result` per **4/15** + **15/15** in-page S modules + sidebar anchors (not separate routes)
- [ ] `/result` dynamic fields wired to JSON (`*FreeEssence`, names, reflection question)
- [ ] **`/blueprint`** per **8/15** + **15/15** anchors `#s1` `#s3` `#s2` `#s0` (no per-S routes)
- [ ] `lib/segments.ts` + homepage LEARN MORE → `/blueprint#s1` … `#s0`

### P1 — Content & conversion
- [ ] Homepage English copy from 2/15 (text only)
- [ ] `/full-report` full structure per **5/15** (14 sections, waitlist form fields, S6 disclaimer, FAQ×8)
- [ ] `/about-1320` per **7/15** (14 sections, FAQ×8, EXPLORE THE BLUEPRINT link)
- [ ] `/booking` per **9/15** (15 sections, 3 reading options, expanded form, FAQ×9, testimonial placeholders only)
- [ ] `/sample-report` per **6/15** + **14/15** + **UI2** (`report-ui.jpeg`) + **15/15** sidebar anchors
- [ ] Shared `ReportSidebar`, `ReportHeader`, `ReportModuleCard`, … (P2 Soul Profile reuse)
- [ ] Result page: per-card **locked full-report teaser** + optional S4/S5/S6 mention in GO DEEPER section (4/15)
- [ ] Legal/support pages per **10/15**: `/faq`, `/privacy`, `/terms`, `/disclaimer`
- [ ] Footer mini legal + working links (FAQ, Privacy, Terms, Disclaimer)
- [ ] Unified form consent copy (calculator, waitlist, email, booking) per 10/15
- [ ] Footer SUBSCRIBE → lead hook

### P2 — Polish & ship (align with 11/15 §18 steps 13–15)
- [ ] Shared `Header` + `Footer` on all routes (nav + CTA routing from 11/15)
- [ ] Inner pages: `page-shell` visual system (after inner UI review if provided)
- [ ] Per-page SEO metadata (11/15 §13)
- [ ] Analytics event hooks (11/15 §17)
- [ ] Session/local storage for result handoff
- [ ] Extend `get1320Content()` return shape (11/15 §9)
- [ ] `.env.example` + deploy asset check (`public/` images committed)
- [ ] Lead capture: `/api/leads` or chosen storage (hooks today are client-only)
- [ ] Lint/build + mobile/desktop smoke — **11/15 §19 acceptance**

---

## Architecture reminders (do not break)

```
User birth date
  → calculate1320Code()     // lib/calculate1320Code.ts
  → get1320Content()        // lib/get1320Content.ts + data/1320/*.json
  → UI render only          // app/* + components/*
```

- Free result: S1/S3/S2/S0 short + integrated summary + reflection question
- Full report: deeper S1–S0 + S4/S5/S6 (waitlist gates premium modules)
- S6: never financial advice

**Forward-compatible for Phase 2:** Soul Profile, check-ins, timeline; **`/blueprint/s1-origin-frequency`** … **`s0-void-gate`** (slugs in `lib/segments.ts`); schema hooks only until content stable.

---

## Milestone mapping (original Nova plan)

| Milestone | Handoff alignment |
|-----------|-------------------|
| M1 Core pages + layout + nav | Homepage done; inner pages + `/blueprint` pending |
| M2 Responsive polish + components | After inner UI + copy |
| M3 QA + deploy readiness | Metadata, env, funnel test, assets in git |

---

## How to use this file

1. Steward sends doc **N/15** → Nova appends under **Doc log**.
2. **15/15 complete** → implementation order above is canonical; start **Batch 0** on steward go-ahead.
3. **15/15 + UI 2/2 complete** → step through **`IMPLEMENTATION_BATCHES.md`** one batch at a time.

---

## Shipped / test log (implementation)

| Date | Batch | Notes |
|------|-------|-------|
| 2026-05-28 | Foundation | Routes, data layer, basic result; homepage rebuilt by team; logo/step-03 fixes |
| 2026-05-29 | Handoff | Docs 15/15; anchor IA (15/15) |
| 2026-05-29 | **Batch 0** | Data layer: types, v1 adapter, 3 JSON stubs, S3 12 tiers, smoke script; `/result` wired to new API |
| 2026-05-29 | **Batch 0 QA** | Lumen **Pass** (EN S2/S0 fix: overlays + locale rules; smoke + canonical + random date) |
| 2026-05-29 | **Batch 1** | `(site)` layout, PageShell, site nav/footer 11/15, `lib/segments.ts`, glass/segment CSS, legal/blueprint/faq stubs |
| 2026-05-29 | **Batch 1 QA** | Lumen **Pass** |
| 2026-05-29 | **Batch 2** | Full `/blueprint` (8/15); homepage LEARN MORE → `#s1–s0`; nav THE BLUEPRINT → `/blueprint` |
| 2026-05-29 | **Batch 2 QA** | Lumen **Pass** |
| 2026-05-29 | **Batch 3** | `/your-code` 3/15, funnel → `/generating` → `/result`, sessionStorage, homepage form wired |
| 2026-05-29 | **Batch 3 QA** | Lumen **Pass** |
| 2026-05-29 | **Batch 4** | Full `/generating` UI1 chamber (`GeneratingChamber`, step machine, portal + nodes) |
| 2026-05-29 | **Batch 4 fix** | `/generating` moved to `app/generating/` + `ImmersiveShell` (no site header/footer per UI1) |
| 2026-05-29 | **Batch 4 QA** | Lumen **Pass** (immersive shell fix verified) |
