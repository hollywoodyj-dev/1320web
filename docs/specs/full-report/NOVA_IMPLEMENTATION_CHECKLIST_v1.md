# NOVA Implementation Checklist

**1320 Full Report Auto-Generation System**

| | |
|---|---|
| Version | v1.0 |
| Product | Full 1320 Soul Origin Report |
| Theme | Website-Aligned Dark Cosmic Portal UI |
| Sites | thesoulprofile.com / 1320soulcode.com |

**Status:** Pre-implementation reference — do not start build until full spec package (6/6) is received.

Companion summary: `FULL_SOUL_ORIGIN_REPORT_V1_SPEC_SUMMARY.md`

---

## 0. Core Rule

NOVA must implement the Full Report using:

**Fixed UI Templates + Dynamic Approved Content + LUMEN QA**

NOVA must not freely redesign, rename, reinterpret, or invent report content.

> Not your fate. Your mirror.

---

## 1. Project Setup

### 1.1 Folder structure

```
/full-report
  /templates/pages
  /templates/partials
  /styles
  /assets
  /data
  /scripts
  /qa
```

### 1.2 Style files

- `report-global.css`
- `report-theme-dark.css`
- `report-components.css`
- `report-responsive.css`
- `report-print.css`

### 1.3 Data files

- `input-client.json`
- `calculation-output.json`
- `content-payload.json`
- `final-report-payload.json`

**Note:** Current codebase uses Next.js/React under `lib/full-report/` — map spec folders to components/CSS, not necessarily literal `/full-report` at repo root.

---

## 2. Global UI Theme

- [ ] Implement official dark theme CSS variables (`--bg-deep`, `--gold`, etc.)
- [ ] Deep navy background + champagne geometry + star field + sacred grid + glass panels
- [ ] **No** cream primary, fantasy galaxy, AI backgrounds, decorative clutter

---

## 3. Components (all required)

- [ ] `ReportPage` — cosmic bg, max-width container, responsive, page number, section id, print spacing
- [ ] `PageHeader` — 1320 Soul Code, Full Soul Origin Report, section title, geometry mark
- [ ] `PageFooter`
- [ ] `ModuleBadge` — S1 / Soul Origin / S1-18 · The Transformer
- [ ] `CodeCard`
- [ ] `GlassPanel`
- [ ] `InsightCard`
- [ ] `ReflectionBox` — soft gold, non-aggressive
- [ ] `GuidanceBox` — WISEWAVE GUIDANCE label, gold accent, luminous icon
- [ ] `DisclaimerBox`
- [ ] `CalculationRow`
- [ ] `ModuleWheel`
- [ ] `ProgressRail`
- [ ] `QuoteBlock`
- [ ] `CTAButton`
- [ ] `JournalPrompt`
- [ ] `PracticeDayCard`

---

## 4. Page templates (19 fixed — order locked)

- [ ] `page_00_cover`
- [ ] `page_01_opening_note`
- [ ] `page_02_four_part_blueprint`
- [ ] `page_03_code_calculation`
- [ ] `page_04_s1_origin`
- [ ] `page_05_s3_vibration`
- [ ] `page_06_s2_mirror`
- [ ] `page_07_s0_void_gate`
- [ ] `page_08_integrated_blueprint`
- [ ] `page_09_s4_shadow`
- [ ] `page_10_s5_mission`
- [ ] `page_11_s6_value_receiving`
- [ ] `page_12_s7_sovereignty`
- [ ] `page_13_s8_contribution`
- [ ] `page_14_s9_return`
- [ ] `page_15_integration_practice`
- [ ] `page_16_reflection_journal`
- [ ] `page_17_closing_reflection`
- [ ] `page_18_final_disclaimer`

---

## 5–23. Per-page acceptance (summary)

| Page | Must-have |
|------|-----------|
| **00 Cover** | Seal, FULL 1320 SOUL ORIGIN REPORT, brand line, S0–S9 wheel, client name, birth date, generated time, footer disclaimer. Dynamic: `client.*`, `report.*` |
| **01 Opening** | Opening Note, How to Read, Disclaimer, Agency Reminder — reflection-not-prediction language |
| **02 Blueprint** | Four cards (S1/S3/S2/S0) + `combination_signature` |
| **03 Calculation** | Birth date, S1, S3 raw, S3 mapped, S2, S0, signature. **Never** show raw as final S3 code. Hide S4–S9 derivation if proprietary |
| **04 S1** | Essence, traits, gifts, shadow, lesson, direction, Wisewave, reflection |
| **05 S3** | Raw + mapped code, energy/aligned/distorted expression, integration advice |
| **06 S2** | Mirror fields + boundary tone — **no** destiny/soulmate language |
| **07 S0** | Illusion, mechanism, challenge, power, path of return — gentle, non-shaming |
| **08 Integrated** | 9 synthesis sections — **only** from approved S1/S3/S2/S0/S4 content |
| **09 S4** | Shadow pattern sections + “You are not your shadow…” |
| **10 S5** | Overview composed from S1/S2/S3/S0 + roadmap — **no** destiny/chosen-one language |
| **11 S6** | **Value & Receiving** + symbolic disclaimer — **no** money-frequency labels or financial advice |
| **12 S7** | Sovereignty theme, power/boundary/choice — empowering, non-controlling |
| **13 S8** | Contribution — no savior / self-erasure language |
| **14 S9** | Return path — sacred but non-religious, no enlightenment promises |
| **15 Practice** | 7 days (Observe Pattern → Integration) — practice + reflection each; no trauma excavation / intense breathwork / fasting / confrontation |
| **16 Journal** | 6 prompts + writable fields, printable, calm spacing |
| **17 Closing** | Agency language + CTAs (Reading / 7-Day / Return / optional Wisewave) |
| **18 Disclaimer** | Full boundary pack + crisis support note |

---

## 24. Calculation engine

- [ ] Validate birth date
- [ ] S1 = year digit sum
- [ ] S3 raw = month × day; S3 code = **approved mapping table**
- [ ] S2 = month + day
- [ ] S0 = full digit sum mod 20 (preserve S0-00)
- [ ] Combination signature
- [ ] S4–S9 via approved algorithm
- [ ] Store S3 raw and S3 code **separately**

---

## 25. Content retrieval

Priority: exact DB asset → approved fallback → safe unavailable message.

- [ ] All S0–S9 databases loaded
- [ ] Missing content → no invent, QA fail, no paid delivery

---

## 26. Final payload (before render)

- [ ] `client`, `report`, `calculation`, `modules` (s1–s9), `integrated_blueprint`, `integration_practice`, `ctas`

---

## 27. Rendering pipeline (10 steps)

1. Validate input  
2. Calculate core codes  
3. Resolve S4–S9  
4. Retrieve content  
5. Build payload  
6. Inject into templates  
7. Render web report  
8. Optional PDF  
9. LUMEN QA  
10. Deliver only on pass  

---

## 28–30. Safety, alignment, language quality

- [ ] Forbidden deterministic / soulmate / wealth / diagnosis language blocked
- [ ] Preferred reflective phrasing used
- [ ] Product name, brand line, S6 label, dark cosmic UI aligned with site
- [ ] No template stitching artifacts, placeholders, mixed EN/ZH (unless bilingual)

---

## 31. Responsive

- [ ] Desktop 1280–1440px, 16:9 sections
- [ ] Tablet — cards stack, wheel scales
- [ ] Mobile — single column, readable fonts, usable journal + CTAs

---

## 32. PDF export (if enabled)

- [ ] `report-print.css`, page order, page numbers, no mid-card cuts, disclaimers visible, all 19 pages

---

## 33. LUMEN QA submission

Submit: `final-report-payload.json`, rendered HTML, `calculation-output.json`, content source refs, PDF if any.

**Do not deliver until LUMEN pass.**

---

## 34. Canonical test case

**Birth date:** `1980-05-22`

| Field | Expected |
|-------|----------|
| S1 raw | 18 |
| S3 raw | 110 |
| S2 raw | 27 |
| S0 raw | 27 |
| S0 code | S0-07 |
| S3 mapped | S3-03 (not S3-110) |
| Signature | `S1-18|S3-03|S2-27|S0-07` |

- [ ] All calculations correct
- [ ] All S0–S9 pages render
- [ ] No placeholders / prohibited language
- [ ] Dark theme applied
- [ ] LUMEN QA pass

---

## 35. Implementation phases

| Phase | Work |
|-------|------|
| **1 Foundation** | Global theme, components, project structure, sample payload |
| **2 Core pages** | 00–03 |
| **3 Core modules** | 04–07 (S1, S3, S2, S0) |
| **4 Integration** | 08 Integrated Blueprint, 09 S4 |
| **5 Advanced** | 10–14 (S5–S9) |
| **6 Closing** | 15–18 |
| **7 Automation** | Calc engine, DB connect, payload generator, auto-render, PDF, LUMEN hook |

---

## 36. Final delivery rule

Deliver only when **all** pass:

- [ ] Calculations
- [ ] Content assets present
- [ ] 19 pages render
- [ ] No placeholders
- [ ] No safety violations
- [ ] Website alignment
- [ ] Language quality
- [ ] **LUMEN QA pass**

Any failure → hold for correction.

---

## LUMEN gate

Pair with `LUMEN_QA_PROTOCOL_v1.md`. Submit all required QA inputs; deliver only on **QA PASS** or **QA PASS WITH MINOR NOTES**.

**Status:** Phase 1 foundation shipped — see `/full-report-v2-phase1`.

## Phase 1 complete

- [x] Global dark cosmic theme (`styles/full-report-v2/`)
- [x] 17 React components (`components/full-report-v2/`)
- [x] Payload types + sample builder (`lib/full-report-v2/`)
- [x] Sample JSON (`data/full-report-v2/sample/`)
- [x] `npm run smoke:full-report-v2-sample`
- [x] Preview route `/full-report-v2` (cover + opening)
- [ ] Page 02 Four-Part Blueprint
- [ ] Page 03 Code Calculation

## Spec package

**Complete (6/6).** See `README.md` in this folder.
