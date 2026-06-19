# Full 1320 Soul Origin Report — Spec Summary (Incoming V1)

**Status:** **Spec package complete (6/6).** Implementation held until you approve the build — see `README.md` for entry point.

**Received:**
- [x] **Delivery 1/6** — NOVA SPEC + NOVA ADDENDUM + LUMEN QA (generation, alignment, QA protocol — **superseded/extended by delivery 4**)
- [x] **Delivery 2/6** — 1320 Full Report UI & Auto-Generation Spec v1.0 (theme, components, 19-page UI, pipeline, payload)
- [x] **Delivery 3/6** — NOVA Implementation Checklist v1.0 → `NOVA_IMPLEMENTATION_CHECKLIST_v1.md`
- [x] **Delivery 4/6** — LUMEN QA Protocol v1.0 → `LUMEN_QA_PROTOCOL_v1.md`
- [x] **Delivery 5/6** — Page 00 Cover UI → `ui/UI_PAGE_00_COVER_SPEC.md`, `ui/page_00_cover.html`
- [x] **Delivery 6/6** — Page 01 Opening UI → `ui/UI_PAGE_01_OPENING_SPEC.md`, `ui/page_01_opening_note.html`

**NOVA ↔ LUMEN pairing:** Nova generates → Lumen accepts → paid delivery only on **QA PASS** (or PASS WITH MINOR NOTES).

---

## Core principle (from founder)

> NOVA generates. LUMEN gates.
> Depth is allowed; boundary crossing is not.
> Language can be beautiful; dependency is not.
> The system is symbolic; it must not pose as authority.

---

## Product definition (ADDENDUM override)

| Item | Spec |
|------|------|
| **Public name** | Full 1320 Soul Origin Report / 1320 灵魂源频完整报告 |
| **Brand line** | Not your fate. Your mirror. |
| **Secondary** | Your code is a mirror — not a sentence. |
| **Paid product scope** | **S0–S9 complete** — single commercial full report |
| **Legacy tiers** | Old names (Full Soul Reflection = S0–S7, Advanced Integration = S0–S9) are **historical only**; do not gate S8/S9 behind a higher tier in the paid product |
| **Nature** | Symbolic self-reflection mirror — not prediction, diagnosis, fate, compatibility verdict, financial promise, religion, or professional advice |

---

## Required input

```json
{
  "name_or_nickname": "string",
  "birth_date": "YYYY-MM-DD",
  "language": "en | zh | bilingual",
  "report_type": "full_1320_soul_origin_report"
}
```

Optional: `email`, `timezone`, `preferred_name`, `visual_theme`. No unnecessary sensitive data.

---

## Calculation rules (all codes before content lookup)

| Layer | Formula | Range | Zero rule |
|-------|---------|-------|-----------|
| **S1** Soul Origin | `digit_sum(birth_year)` | S1-01 … S1-44 | — |
| **S2** Soul Mirror | `birth_month + birth_day` | — | — |
| **S3** Soul Vibration | `vibration_level(birth_month × birth_day)` | official mapping table | **Must not guess** if table missing |
| **S0** Void Gate | `full_birth_date_digit_sum mod 20` | S0-00 … S0-19 | keep **S0-00** |
| **S4** Core Shadow | `(S2 + S0) mod 20` | S4-00 … S4-19 | keep **S4-00** |
| **S5** Soul Mission | `(S1 + S2 + S3) mod 44` | S5-01 … S5-44 | **0 → S5-44** |
| **S6** Value & Receiving | `(S1 + S3 + S0) mod 44` | S6-01 … S6-44 | **0 → S6-44** |
| **S7** Soul Sovereignty | `(S1 + S3 + S4 + S6) mod 7` | S7-00 … S7-06 | keep **S7-00** |
| **S8** Soul Contribution | `(S5 + S6 + S7) mod 8` | S8-00 … S8-07 | keep **S8-00** |
| **S9** Return to Source | `(S1 + S0 + S7 + S8) mod 9` | S9-00 … S9-08 | keep **S9-00** |

**Canonical example:** `1980-05-22` → S1-18, S2-27, S3 (via table), S0-07.

**S6 label:** Always **Value & Receiving / 价值与接收** — never Money Frequency, wealth fate, etc.

---

## Public rendering order (website continuity)

**Opening (matches site blueprint journey):**
`S1 → S3 → S2 → S0`

**Then deepen:**
`Integrated Blueprint → S4 → S5 → S6 → S7 → S8 → S9`

Reason: users already learned the four-part structure on the website; report expands from that entry point.

---

## Required report structure (19 pages, 00–18 — order locked)

| # | Section |
|---|---------|
| 00 | Cover Page |
| 01 | Opening Note + Disclaimer |
| 02 | Your Four-Part Blueprint |
| 03 | How Your Code Was Calculated |
| 04 | S1 · Soul Origin |
| 05 | S3 · Soul Vibration |
| 06 | S2 · Soul Mirror |
| 07 | S0 · Void Gate |
| 08 | Integrated Soul Blueprint |
| 09 | S4 · Core Shadow Pattern |
| 10 | S5 · Soul Mission |
| 11 | S6 · Value & Receiving |
| 12 | S7 · Soul Sovereignty |
| 13 | S8 · Soul Contribution |
| 14 | S9 · Return to Source |
| 15 | 7-Day Integration Practice |
| 16 | Reflection Journal |
| 17 | Closing Reflection |
| 18 | Final Disclaimer |

---

## Database lookup rule

1. Calculate code → format lookup key → retrieve DB record → render approved fields
2. Content databases are **source of truth** for interpretations
3. NOVA may add light bridge language, transitions, formatting — **must not invent core interpretation fields** when DB fields exist
4. On failure: return explicit error (invalid date, missing S3 table, lookup fail, missing module content) — **no guessing**

---

## Required module fields (rendering checklist)

### S0 · Void Gate
Reflection Question, Void Archetype/Theme, Core Illusion, Void Challenge, Void Power, Path of Return, Reflective Summary, Integration Key, One-Week Practice, Wisewave Guidance, Safe Language Note

### S1 · Soul Origin
Origin Essence, Archetype (+ ZH), Soul Traits, Strengths, Shadow Frequency, Core Lesson, Mission Direction, Integration Key, Wisewave Guidance, Symbolic Color, Totem, Esoteric Link, Safe Language Note

### S2 · Soul Mirror
Reflection Question, Mirror Archetype, Relationship Dynamic, Karmic Loop, Lesson, Healing Path, Reflective Summary, Integration Key, Wisewave Guidance, Safe Language Note

### S3 · Soul Vibration
Vibration Archetype (+ ZH), Vibration Essence, Expression Style, Soul Traits, Strengths, Challenges, Guidance, Integration Key, One-Week Practice, Wisewave Guidance, Safe Language Note

### S4 · Core Shadow Pattern
Reflection Question, Core Loop, Reflective Summary, Emotional Trigger, Defense Pattern, Hidden Need, Relationship Pattern, Work & Life Pattern, Integration Key, One-Week Practice, Wisewave Guidance, Safe Language Note

### S5 · Soul Mission — **7 blocks from DB (do not generate block 3)**
1. Mission Essence  
2. What Your Soul Is Learning to Express  
3. How Your Patterns Become Mission  
4. Natural Mission Fields  
5. Shadow Distortion of This Mission  
6. Mature Expression  
7. Wisewave Reflection  

### S6 · Value & Receiving — **7 blocks from DB**
1. Value Essence  
2. What Your Soul Is Learning to Receive  
3. How Value Wants to Flow  
4. Natural Value Fields  
5. Shadow Distortion of Receiving  
6. Mature Receiving Expression  
7. Wisewave Reflection  

### S7 · Soul Sovereignty — **7 blocks**
Sovereignty Essence, What Your Soul Is Learning to Reclaim, Where Power Was Given Away, Natural Sovereignty Fields, Shadow Distortion of Sovereignty, Mature Sovereignty Expression, Wisewave Reflection

### S8 · Soul Contribution — **7 blocks**
Contribution Essence, What Your Soul Offers, How Contribution Flows, Natural Contribution Fields, Shadow Distortion of Contribution, Mature Contribution Expression, Wisewave Reflection

### S9 · Return to Source — **7 blocks**
Return Essence, What Your Soul Remembers, How Life Themes Resolve, Natural Return Practices, Shadow Distortion of Return, Mature Return Expression, Wisewave Reflection

---

## Integration summary patterns (reflective only)

| Pattern | Modules |
|---------|---------|
| Core Pattern | S0 + S1 + S4 |
| Relationship Pattern | S2 + S4 + S7 |
| Expression Pattern | S1 + S3 + S5 |
| Value Pattern | S5 + S6 + S8 |
| Integration Path | S7 + S8 + S9 |

Must not state combinations define the user permanently.

---

## 7-Day Integration Practice

Practical, not mystical. **Reconcile day themes** between delivery 1 and 2 before build:

| Day | Delivery 1 (NOVA SPEC) | Delivery 2 (UI Spec) |
|-----|------------------------|----------------------|
| 1 | See the Illusion | Observe the Pattern |
| 2 | Return to Origin | Return to Worth |
| 3 | Notice the Mirror | Relationship Mirror Pause |
| 4 | Track the Loop | Explore with a Center |
| 5 | Reclaim Choice | Transform Gently |
| 6 | Receive Value | Structure Receiving |
| 7 | Return to Source | Integration |

Each day: Practice + Reflection (delivery 1 also: Theme, Small Practice, Journal Prompt).

NOVA may personalize from S1/S2/S3/S0/S4/S6 module content. Avoid intense practices (trauma excavation, triggering breathwork, fasting, isolation, confrontation directives).

---

## Language rules

**Allowed (EN/ZH):** may reflect, may suggest, can invite, mirror framing, “this does not define you”

**Forbidden:** destined, guarantees, proves, you must/will, fate, soulmate proof, wealth promises, spiritual rank, diagnosis framing — plus Chinese equivalents (注定, 保证, 命定, etc.)

---

## Required disclaimers

| Placement | Purpose |
|-----------|---------|
| Opening | Symbolic mirror; observe patterns, not predict future or define identity |
| Module safe note | After each major module or footer — not predictive/diagnostic/professional advice |
| Closing | Reflection tool only; not sole basis for medical/legal/financial/relational decisions |
| AI disclosure | Where AI assists generation/organization |

---

## High-risk / crisis handling

Pause symbolic interpretation for: medical/mental health diagnosis, self-harm, abuse, legal/visa, investment/tax/debt, relationship safety, crisis.

Crisis/immediate danger → **no symbolic interpretation**; direct to emergency services and in-person support.

---

## Output format (NOVA)

Structured JSON with:

- `report_meta` (product name, user, birth date, language, generated_at)
- `calculation_trace` (all S0–S9 codes + S3_raw)
- `sections[]` (section_id, title, module, content_blocks)
- `safety` (opening/module/closing disclaimers, AI disclosure)

**Per-page object (ADDENDUM):**
`page_number`, `page_type` (cover | disclaimer | module | integration | journal | closing), `title`, `subtitle`, `visual_component`, `content_blocks`, `footer_note`

**Allowed UI component tags:** `cover_portal`, `code_summary_dashboard`, `calculation_trace_box`, `layer_header`, `essence_card`, `reflection_box`, `integration_box`, `wisewave_quote`, `section_divider`, `journal_prompt_card`, `closing_page`

Do not invent image/SVG paths for assets that do not exist.

---

## LUMEN QA summary

**Verify independently:**
- All calculations + zero rules
- S3 from official table only
- Completeness: all 18 sections; **P0 fail if S8/S9 missing from paid full report**
- DB grounding per module; S5/S6 seven blocks from DB
- Forbidden deterministic language scan (EN + ZH term lists)
- Professional boundary (no medical/legal/financial/relationship commands)
- Crisis boundary
- Website alignment (name, brand line, S1→S3→S2→S0 order, S6 label, tone)
- Disclaimers + AI disclosure
- Visual drift (no wealth promise, destiny couples, spiritual ladder, etc.)

**Severity:**
- **P0** — wrong calc, guessed S3, missing S8/S9, professional advice, crisis mishandled, destiny claims → block release
- **P1** — missing disclaimer, wrong S6 label, wrong order, missing fields
- **P2** — tone/UI polish

**QA output shape:** `qa_status`, `severity`, `blocked`, `issues`, `required_fixes`, `approved_for_release`

---

## Delivery 2/6 — UI & Auto-Generation Spec v1.0

### Generation model

**Fixed Visual Template + Dynamic Personalized Content**

NOVA must **not** redesign per user. Fixed: page order, visual identity, CSS theme, component system, symbolic structure. Dynamic: code calculation + content injection from approved DBs. LUMEN QA before delivery.

Report should feel like entering a **personal Soul Code Portal** — not generic PDF, fortune-telling, or AI spiritual document.

### Free vs paid scope

| Tier | Includes |
|------|----------|
| **Free report** | S1, S3, S2, S0 + basic integrated summary + light reflection prompts + Full Report CTA |
| **Paid full report** | S0–S9 + Integrated Soul Blueprint + 7-Day Practice + Reflection Journal + Closing + Final Disclaimer |

### Visual theme (primary — website-aligned)

**Theme name:** `1320 Dark Cosmic Portal Theme`

- **Primary web report** = dark navy cosmic (cream/gold ceremonial = optional alternate printable theme only)
- **Palette:** Deep navy (`#07111f`, `#0b1728`, `#13243a`), warm ivory text (`#f5ead6`), champagne gold (`#d6b56d`), soft blue/violet glows
- **Feel:** premium soul intelligence dashboard, sacred technology interface, cosmic mirror — NOT fortune PDF, fantasy astrology, religious doc, coaching workbook
- **Background:** layered radial gradients + optional star field / sacred grid / gold orbital lines / noise — NO heavy galaxy, literal planets, nebula overload, bright gradients
- **Typography:** Display = Cormorant Garamond / Playfair; UI/body = Inter / Avenir / Montserrat / Manrope; labels uppercase + letter-spaced
- **Layout:** Web-first; desktop canvas **1280–1440px** (min content **1080px**); **16:9 horizontal** page sections; flexible height; PDF portrait optional later

### CSS tokens (spec-defined)

Key variables: `--bg-deep`, `--bg-main`, `--bg-panel`, `--text-main/soft/muted`, `--gold`, `--border-gold`, `--blue-glow`, `--violet-glow`, glass panel + reflection box styles specified in spec.

### Input schema (delivery 2)

```json
{
  "client": {
    "name": "string",
    "birth_date": "YYYY-MM-DD",
    "birth_date_display": "string",
    "birth_date_iso": "YYYY-MM-DD",
    "timezone": "string",
    "language": "en",
    "report_mode": "paid_full"
  },
  "report": {
    "report_id": "string",
    "generated_date": "string",
    "generated_time": "string",
    "generated_by": "1320 Soul Code System",
    "version": "Full Report v1.0"
  }
}
```

### Calculation output (delivery 2)

Structured per-layer objects with `formula`, `raw`, `code`, `title`. Includes:

- `combination_signature`: e.g. `S1-18|S3-03|S2-27|S0-07`
- **S3 critical rule:** `S3 raw ≠ S3 code` — never display `S3-110` as module code unless explicitly showing raw value (1980-05-22: raw 110 → mapped S3-03)

Page 03 shows S1, S3 raw, S3 mapped, S2, S0 calculations + combination signature. **Do not expose S4–S9 derivation** on calculation page if proprietary.

### Content source priority

1. Exact code from official 1320 database  
2. Approved fallback template for same module  
3. Safe missing-content message — **never invent**

Missing module → show unavailable message + **QA fail** + do not deliver paid report.

### Recommended content file layout (delivery 2)

Per-module folders with `s0_00.json` … `s9_08.json`. Note: spec lists S5 as `s5_01`–`s5_26` and S3 as `s3_01`–`s3_12` — **reconcile with calc ranges (S5 mod 44, S3 mapping table)** before implementation.

### S1 module JSON shape (example)

`module`, `code`, `title`, `subtitle`, `essence`, `description[]`, `soul_traits[]`, `core_gifts[]`, `shadow_pattern[]`, `core_lesson`, `wisewave_guidance`, `reflection`

### Per-page UI highlights (delivery 2)

| Page | Key required elements |
|------|----------------------|
| **00 Cover** | Seal/logo, FULL 1320 SOUL ORIGIN REPORT, brand line, **S0–S9 portal wheel**, client name, birth date, generated time, “Not Your Fate. Your Mirror.”, footer disclaimer. **No cream background** on primary web version. Dynamic: `client.name`, dates, `report.generated_*` |
| **01 Opening** | Opening Note, How to Read, Important Disclaimer, Agency Reminder — reflective-not-predictive language |
| **02 Blueprint** | Four cards (S1 Who You Are, S3 How You Express, S2 Who/What You Attract, S0 How You Awaken) + `combination_signature`; visual S1→S3→S2→S0 pathway |
| **03 Calculation** | Birth date, S1/S3 raw/S3 mapped/S2/S0 blocks; distinguish raw vs mapped S3 |
| **04–07** | S1, S3 (raw + mapped code), S2 (mirror — no destiny language), S0 (gentle, no shame) |
| **08 Integrated** | Core Essence, Energy Expression, Relationship Mirror, Awakening Path, Integrated Pattern, Main Inner Conflict, Integration Theme, Embodiment Practice, Reflection Questions — **synthesis allowed only from approved module content** |
| **09 S4** | Pattern-focused, non-shaming; “You are not your shadow…” |
| **10 S5** | Mission as conscious expression; **page layout differs from delivery 1 seven-block list** — uses composition from S1/S2/S3/S0 (Overview, Primary Mission from S1, Mirror Task from S2, etc.) — reconcile at implementation |
| **11 S6** | Value & Receiving + mandatory symbolic disclaimer; no financial advice |
| **12–14 S7–S9** | Sovereignty / Contribution / Return — empowering, no savior/enlightenment/salvation language |
| **15 Practice** | 7 day cards |
| **16 Journal** | 6 journal prompts + writing areas |
| **17 Closing** | Agency close + CTAs |
| **18 Final Disclaimer** | Full boundary pack (symbolic, no prediction/diagnosis/medical/psych/legal/financial, relationship safety, crisis, user responsibility) |

### Component system (delivery 2)

`ReportPage`, `PageHeader`, `ModuleBadge`, `CodeCard`, `GlassPanel`, `InsightCard`, `ReflectionBox`, `GuidanceBox`, `DisclaimerBox`, `CalculationRow`, `ModuleWheel`, `ProgressRail`, `QuoteBlock`, `CTAButton`, `FooterNote`

Global inner-page header: “1320 Soul Code · Full Soul Origin Report · page/section · sacred geometry mark”

Module badge format: `S1` / `Soul Origin` / `S1-18 · The Transformer`

### Recommended code folder structure (delivery 2)

```
/full-report
  /templates/pages   page_00_cover.html … page_18_final_disclaimer.html
  /templates/partials header, footer, module_badge, reflection_box, …
  /styles            report-global, theme-dark, components, responsive, print
  /assets            seal, module-wheel, sacred-grid, s0–s9 icons
  /data              input, calculation-output, content-payload, final-report-payload
```

(Current codebase uses React/Next + `lib/full-report/` — map spec concepts to components, not necessarily literal HTML templates.)

### Rendering pipeline (10 steps)

Validate input → calc S1/S3 raw/S3/S2/S0 → resolve S4–S9 → retrieve DB content → build content payload → render templates → assemble web report → optional PDF → LUMEN QA → deliver only on pass

### Final payload schema (delivery 2)

`client`, `report`, `calculation` (s1/s3/s2/s0 + combination_signature), `modules` (s0–s9), `integrated_blueprint`, `integration_practice.days[]`, `ctas` (primary/secondary/soft)

### Allowed vs forbidden synthesis

| **Allowed synthesis** (from user's calculated modules only) | Opening Blueprint summary, Integrated Soul Blueprint, 7-Day Practice, Closing Reflection, CTA text |
| **Never synthesize** | Core meanings for S0–S9 individual codes — must come from DB |

### CTAs

- Primary: Book a Personal 1320 Reading  
- Secondary: Start My 7-Day Integration Practice  
- Soft: Return to My Report  
- Optional: Continue Reflection with Wisewave  
- Waitlist mode: Join Full Report Waitlist / Request a 1320 Reading — **no payment CTA unless checkout live**

### PDF export

Same dark theme, print CSS, page numbers, disclaimers visible, no mid-card cuts, readable contrast. Lighter print variant only if readability requires.

### Language quality (delivery 2)

Reject template-stitching artifacts, unfilled placeholders, mixed EN/ZH (unless bilingual), repeated generic paragraphs, broken grammar. Examples of **unacceptable** output flagged in spec.

### Implementation phases (delivery 2 — NOVA build order)

1. Global CSS theme + components  
2. Pages 00–03 (cover, opening, blueprint, calculation)  
3. Module pages S1, S3, S2, S0  
4. Integrated Blueprint + S4  
5. S5–S9  
6. Practice, Journal, Closing, Final Disclaimer  
7. Connect JSON payload to templates  
8. Sample test `1980-05-22`  
9. LUMEN QA  
10. Production

### Reconciliation notes (delivery 1 vs 2)

| Topic | Note |
|-------|------|
| S5 page fields | Delivery 1 = 7 DB blocks; delivery 2 = composed overview from S1/S2/S3/S0 + roadmap — align at build |
| 7-day day names | Different labels — confirm canonical list |
| S5/S3 file counts | UI spec folder ranges may not match calc mod ranges |
| Page count | Both agree: 19 pages (00–18), fixed order |

---

## Delivery 3/6 — NOVA Implementation Checklist v1.0

**Full checklist file:** `NOVA_IMPLEMENTATION_CHECKLIST_v1.md`

Actionable dev checklist — checkbox format for build, test, and delivery gates. Key additions beyond delivery 2:

### New components (vs delivery 2)

- `PageFooter`, `JournalPrompt`, `PracticeDayCard` added to required component list
- Per-component acceptance criteria (e.g. `ReportPage` print-safe spacing, `ReflectionBox` soft gold styling)

### Per-page checklists (sections 5–23)

Each of 19 pages has explicit **required sections**, **dynamic fields**, **prohibited language**, and **tone QA** — usable as page-level acceptance tests during build.

### Engine & pipeline gates

- Calculation engine checklist (24) — step-by-step with S3 raw/code separation
- Content retrieval (25) — 3-tier priority + hard fail on missing paid content
- Payload assembly (26) — mandatory object list before render
- 10-step pipeline (27) — sequential gate; no skip

### QA submission package (33)

NOVA must submit to LUMEN before delivery:

- `final-report-payload.json`
- Rendered HTML
- `calculation-output.json`
- Content source references
- PDF (if generated)

### Canonical test case (34) — locked

`1980-05-22` → S1 raw 18, S3 raw 110, S2 raw 27, S0 raw 27, **S0-07**, **S3-03** (not S3-110), signature `S1-18|S3-03|S2-27|S0-07`

### Implementation phases (35) — 7 phases

1. Foundation (theme, components, structure, sample payload)  
2. Core pages 00–03  
3. Core modules 04–07  
4. Integration 08–09  
5. Advanced 10–14  
6. Practice & closing 15–18  
7. Automation (calc, DB, payload, render, PDF, LUMEN)

### Final delivery rule (36)

**Hold** unless: all calcs pass, all content present, 19 pages render, no placeholders, no safety violations, website alignment, language quality, **LUMEN QA pass**.

---

## Delivery 4/6 — LUMEN QA Protocol v1.0

**Full protocol file:** `LUMEN_QA_PROTOCOL_v1.md`

Per-report acceptance gate for Nova-generated Full Reports. Extends delivery 1 LUMEN doc with operational detail.

### Required inputs (9 items)

`final-report-payload.json`, `calculation-output.json`, `content-payload.json`, rendered HTML, PDF (if any), content source refs, report version, theme version, generation timestamp. Missing any → **QA FAIL — Missing Required Review Input**.

### Four output statuses

| Status | Meaning |
|--------|---------|
| QA PASS | Deliver |
| QA PASS WITH MINOR NOTES | Deliver (polish only — typo, spacing) |
| QA FAIL — CORRECTION REQUIRED | Fix and resubmit |
| QA BLOCKED | Missing data / high-risk — do not deliver |

### QA domains (sections 4–17)

Calculation (independent recalc, S3 raw≠code critical fail) · Content source · 19-page completeness · Per-page gates · UI/visual drift · Language/placeholders · Safety fail lists · Module-specific (S2/S5/S6/S9) · Website alignment · CTA rules · PDF · Responsive · Drift detection · High-risk → BLOCKED

### Severity model

- **Critical (1):** calc error, missing module/disclaimer, prediction/diagnosis/finance, placeholders → FAIL/BLOCKED
- **Major (2):** grammar/stitching, wrong title, theme mismatch → FAIL
- **Minor (3):** typo, spacing → PASS WITH NOTES

### Structured LUMEN output (section 19)

Standard report template: status, report id, client, per-domain Pass/Fail, issues, corrections, final decision (Deliver / Do not deliver / Blocked).

### Delivery 1 vs 4 reconciliation

| Topic | Delivery 1 | Delivery 4 |
|-------|------------|------------|
| Severity | P0/P1/P2 | Critical/Major/Minor + 4 QA statuses |
| QA inputs | nova calc trace, final report, DB manifest | + content-payload, theme/report version, timestamp |
| Output JSON | `qa_status`, `severity`, `blocked` | Formal LUMEN report format (section 19) |
| Use at build | Reference delivery **4** as canonical LUMEN gate; delivery 1 rules still apply where not superseded |

---

## Delivery 5/6 — Page 00 Cover UI

**Files:** `ui/UI_PAGE_00_COVER_SPEC.md` · `ui/page_00_cover.html` · `ui/reference-00-cover.png`

### Critical rule (founder)

**Module wheel S0–S9 labels must be HTML/SVG/CSS — not AI-generated image text.** Background imagery may provide cosmic glow only. Prevents art-pack errors: S6 missing, S8 duplicate, S1/S2 misplacement, S7 missing in summary rows.

### Layout (1600×900)

3-column grid (`360 | 1fr | 380`) + footer row:

| Region | Content |
|--------|---------|
| Left | Flower-of-life seal SVG, FULL / 1320 / SOUL ORIGIN REPORT, brand lines |
| Center | 620px module wheel + core signature preview |
| Right | Client card (6 info rows) + includes list (all S0–S9) |
| Footer | Disclaimer + agency reminder |

### Module wheel — locked clockwise order

`S9 → S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8` (S9 at 12 o'clock)

Center hub: **1320 Soul Code** (not a module node).

### Dynamic fields

- Client: `name`, `birth_date_display`, `report.type`, `generated_by`, `version`, `generated_date` + `time`
- Signature preview: `S1 | S3 | S2 | S0` codes + titles (canonical: `S1-18 | S3-03 | S2-27 | S0-07`)

### Theme note

Cover uses slightly deeper navy (`#050d19`) and `--gold-bright: #f4d88a` vs delivery 2 tokens.

### Mockup vs template

Reference image sample: Mira Solen, 1980-05-22. Mockup bottom icon row omitted S7 — HTML template uses full 10-item list; LUMEN should verify all modules in code-rendered wheel.

---

## Delivery 6/6 — Page 01 Opening Note + Disclaimer UI

**Files:** `ui/UI_PAGE_01_OPENING_SPEC.md` · `ui/page_01_opening_note.html` · `ui/reference-01-opening.png`

### Critical rule (founder)

**Fixed text only** — no personalized interpretation, no user code injection on this page.

### Layout (1600×900)

Header + 3-column main (`430 | 1fr | 430`) + 3-part footer band:

| Column | Content |
|--------|---------|
| Left | Opening Note + How to Use (5 items) |
| Center | Disclaimer & Guidance + 5 guidance rows + Core Intention + Agency Reminder |
| Right | This Report Is Not (6 items) + Your Role |

Establishes `PageHeader` pattern for pages 02–18.

### Pagination (founder decision)

- Report indices: **00–18** (19 pages)
- This page: **01 of 18** (cover 00 excluded from “of 18” counter)
- Mockup may show “02 OF 18” — **use 01 of 18** per HTML + founder note

### All static copy

No `{{...}}` placeholders — LUMEN verifies disclaimer/agency language present.

---

## Spec package complete

All 6 deliveries + Page 00 & 01 UI logged. Index: `README.md`.

**Reconciliation at build:** S5 field model, 7-day day names, S3/S5 file counts.

**Next:** Approve implementation → Phase 1–2 from Nova checklist → canonical test + LUMEN QA.

---

## Likely deltas vs current codebase (pre-implementation notes)

These are **observations for implementation** — full spec package now received.

| Area | Current (approx.) | New spec |
|------|-------------------|----------|
| Product tier | `full` (S0–S7) vs `advanced` (+S8/S9) gating | Single paid product = **S0–S9** always |
| Visual theme | Art-pack PNG backgrounds (`public/full-report/backgrounds/`) | **Dark Cosmic Portal** CSS theme — glass panels, navy gradients, gold geometry; art pack may be retired or secondary |
| Page model | ~41/47 art screens in `screen-manifest.ts` | **19 fixed pages** (00–18), component-based |
| Cover page | Art-pack `01-cover.png` | Code-rendered **ModuleWheel** + dark cosmic CSS (see `ui/page_00_cover.html`) |
| Intro flow | Cover, dashboard, how-to-read, soul archetype… | Cover (portal wheel) → Opening → Blueprint → Calculation |
| S3 display | May conflate raw/mapped | Must show **raw vs mapped** explicitly; never label raw as code |
| Post-S0 content | Multi-screen per segment | One page per module + Integrated Blueprint page |
| Closing | Practice/closing screens | 7-Day + Journal + Closing + Final Disclaimer |
| Payload shape | `build-full-report-payload.ts` screen-oriented | `client` + `report` + `calculation` + `modules` + `integrated_blueprint` + `integration_practice` + `ctas` |
| Architecture | React components | Spec suggests HTML templates — implement as React components matching spec components |
| S6 naming | Largely aligned in v2 | Explicit prohibition of legacy money labels |
| Missing content | Various fallbacks | Hard fail + no delivery until resolved |
| Opening page | How-to-read art screen | **Static** disclaimer/guidance page — no dynamic content |

---

## Next step

**Spec package complete.** Say when to start implementation (recommended: Phase 1–2 from `NOVA_IMPLEMENTATION_CHECKLIST_v1.md`).
