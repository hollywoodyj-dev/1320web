# LUMEN QA Protocol v1.0

**1320 Full Report Quality Assurance & Drift Detection System**

| | |
|---|---|
| For | LUMEN |
| Product | Full 1320 Soul Origin Report |
| Source | NOVA Full Report Auto-Generation |
| Sites | thesoulprofile.com / 1320soulcode.com |
| Report type | Paid Full Report |
| Theme | Website-Aligned Dark Cosmic Portal UI |

**Status:** Pre-implementation reference — pair with `NOVA_IMPLEMENTATION_CHECKLIST_v1.md`. Paid report **only deliverable after LUMEN QA PASS**.

Companion summary: `FULL_SOUL_ORIGIN_REPORT_V1_SPEC_SUMMARY.md`

---

## 0. Purpose

Review every auto-generated Full Report before delivery. Ensure:

- Correctly calculated
- Complete (S0–S9, 19 pages)
- Visually aligned with website
- Free from AI drift, unsafe claims, broken template language
- Suitable for **paid delivery**

**No delivery unless:** `QA PASS` (or `QA PASS WITH MINOR NOTES` per severity rules)

---

## 1. Core principle

> Not your fate. Your mirror.

Report = symbolic self-awareness mirror — **not** prediction, diagnosis, destiny, or professional advice. Violations → **QA FAIL**.

---

## 2. Required QA inputs (from NOVA)

Missing any → **QA FAIL — Missing Required Review Input**

- [ ] `final-report-payload.json`
- [ ] `calculation-output.json`
- [ ] `content-payload.json`
- [ ] Rendered HTML output
- [ ] PDF export (if generated)
- [ ] Content source references
- [ ] Report version number
- [ ] Theme version number
- [ ] Generation timestamp

---

## 3. QA output statuses

| Status | When to use |
|--------|-------------|
| **QA PASS** | All checks pass; no placeholders; safe language; correct sourcing |
| **QA PASS WITH MINOR NOTES** | Deliverable; only polish (spacing, minor typo, optional CTA tweak) — **not** calc errors, missing modules, unsafe claims, broken fields |
| **QA FAIL — CORRECTION REQUIRED** | Correctable: wrong calc, missing page/module, grammar/stitching, placeholders, wrong names, UI mismatch, wrong CTA, unsupported interpretation |
| **QA BLOCKED** | Missing content asset / mapping table; crisis context; diagnosis/legal/financial advice in report; cannot verify calc or source |

---

## 4. Calculation QA (independent recalc)

### Core rules

| Layer | Rule | Critical fail |
|-------|------|---------------|
| **S1** | `digit_sum(birth_year)` | Mismatch vs module page |
| **S3** | raw = month × day; code = **mapping table** | **S3 raw displayed as final code** (e.g. S3-110) |
| **S2** | month + day | — |
| **S0** | full digit sum mod 20; preserve S0-00 | — |
| **Signature** | `S1\|S3\|S2\|S0` order, consistent | Wrong order or values |

### Advanced (S4–S9)

- [ ] All resolved via approved algorithm — not guessed
- [ ] Titles match official database
- Missing algorithm/table → **QA BLOCKED — Missing Advanced Code Mapping**

### Birth date

- [ ] Valid format, leap years, display matches input

### Canonical test: `1980-05-22`

| Field | Expected |
|-------|----------|
| S1 | 18 → S1-18 |
| S3 raw | 110 |
| S3 code | **S3-03** (not S3-110) |
| S2 | 27 → S2-27 |
| S0 | 27 mod 20 = 7 → **S0-07** (not S0-27) |
| Signature | `S1-18|S3-03|S2-27|S0-07` |

---

## 5. Content source QA

Priority: exact DB asset → approved fallback → safe unavailable message.

- [ ] Every module references approved source
- [ ] No invented missing content
- [ ] No unauthorized archetype names / meanings
- [ ] Missing content → **QA FAIL**
- [ ] All S0–S9 present — missing any module = **QA FAIL**

---

## 6. Page completeness (19 pages, fixed order)

00 Cover → 01 Opening → 02 Blueprint → 03 Calculation → 04 S1 → 05 S3 → 06 S2 → 07 S0 → 08 Integrated → 09 S4 → 10 S5 → 11 S6 → 12 S7 → 13 S8 → 14 S9 → 15 Practice → 16 Journal → 17 Closing → 18 Final Disclaimer

- [ ] Correct order, no duplicates, titles match official naming

---

## 7. Page-level QA (highlights)

| Page | Fail triggers |
|------|---------------|
| **00 Cover** | Missing name/date, placeholders, wrong theme |
| **01 Opening** | Fate/destiny framing, missing disclaimer |
| **02 Blueprint** | S3 raw as code, code mismatch |
| **03 Calculation** | Formula errors, no S3 raw/mapped distinction |
| **04–14 Modules** | Wrong code content, missing Wisewave/reflection, unsafe language |
| **15 Practice** | &lt;7 days, intense/risky practices, trauma excavation |
| **16 Journal** | Broken prompts, section missing |
| **17 Closing** | Dependency framing, outcome-promising CTA |
| **18 Disclaimer** | Missing = **QA FAIL** |

---

## 8. UI / visual QA

**Pass:** Deep navy cosmic, champagne gold, warm ivory, glass cards, sacred geometry, premium minimal — **no cream primary on web**.

**Drift fail:** AI backgrounds, wrong palette/fonts, fantasy/astrology styling, religious iconography, heavy galaxy, cream ceremonial as primary.

**Layout:** Desktop/tablet/mobile readable; no overflow; geometry doesn't cover text; CTAs visible.

---

## 9. Language quality QA

- [ ] No broken grammar, stitching artifacts, filler
- [ ] **Placeholder fail:** `{{...}}`, `[INSERT]`, TBD, Lorem, `undefined`, `null`, `NaN`
- [ ] EN-only / ZH-only unless bilingual mode
- Known bad examples: `the soul enters an exploratory stage...`, `between senses energetic change...`, `Where am I letting feeling that...`

---

## 10. Safety QA — automatic fail lists

| Category | Examples (fail) |
|----------|----------------|
| **Prediction** | You will…, destined, fate, meant to be, guaranteed wealth |
| **Diagnosis** | You have depression/disorder, replaces therapy |
| **Financial** | Invest in…, guarantees income, pricing commands |
| **Legal** | Sue, divorce commands, legal determination |
| **Relationship** | Stay for karma, destined partner, abuse as soul contract, must forgive |

Never spiritualize harm, abuse, coercion, unsafe dynamics.

---

## 11. Module-specific safety

| Module | Check |
|--------|-------|
| **S2** | Mirror not command; no destiny/suffer-together language |
| **S5** | Mission not destiny pressure; no chosen-to-save |
| **S6** | **Value & Receiving** only; required symbolic disclaimer; no Money Frequency etc. |
| **S9** | No enlightenment promise, conversion, superiority, salvation |

---

## 12. Website alignment

- [ ] Brand lines, product name, S6 label correct
- [ ] Not positioned as numerology/astrology/tarot/religion/Human Design
- [ ] CTA matches site phase — **no Buy/Pay/Purchase** if checkout not live

---

## 13. CTA QA

**Allowed:** Book Reading, Start 7-Day Practice, Return to Report, Wisewave, Join Waitlist, Request Reading

**Not allowed:** Unlock Destiny, Guarantee Abundance, Find Soulmate, Fix Your Life, Discover Future

---

## 14–15. PDF & responsive

PDF (if generated): all 19 pages, order, page numbers, contrast, no mid-card cuts, disclaimer included.

Responsive: 1280/1440 desktop, tablet stack, mobile one-column, tappable CTAs, usable journal.

---

## 16. Drift detection

**Content drift:** invented archetypes, changed meanings, predictions, reordered modules.

**Visual drift:** non-approved palette, different product look, random images.

**Product drift:** numerology report, money destiny S6, compatibility S2, destiny S5, religious truth.

---

## 17. High-risk context

Signs of crisis/abuse/self-harm/etc. → **QA BLOCKED — HIGH-RISK CONTEXT**

Must trigger safety boundary language; no symbolic interpretation as primary response.

---

## 18. Severity levels

| Level | Examples | Result |
|-------|----------|--------|
| **Critical (1)** | Wrong calc, missing module/disclaimer, prediction/diagnosis/finance promises, placeholders, missing source | FAIL / BLOCKED |
| **Major (2)** | Broken grammar, stitching, wrong title, theme mismatch, page order, missing Wisewave/reflection | FAIL |
| **Minor (3)** | Small typo, spacing, visual imbalance | PASS WITH NOTES |

---

## 19. QA report format (LUMEN output)

```
QA STATUS: [PASS | PASS WITH MINOR NOTES | FAIL | BLOCKED]
REPORT ID: [report_id]
CLIENT: [client_name]
DATE REVIEWED: [date]
SUMMARY: ...
CALCULATION QA: Pass / Fail / Notes
CONTENT QA: Pass / Fail / Notes
UI QA: Pass / Fail / Notes
LANGUAGE QA: Pass / Fail / Notes
SAFETY QA: Pass / Fail / Notes
WEBSITE ALIGNMENT QA: Pass / Fail / Notes
PDF QA: Pass / Fail / N/A
ISSUES FOUND: 1. 2. 3.
REQUIRED CORRECTIONS: 1. 2. 3.
FINAL DECISION: Deliver / Do not deliver / Blocked pending human review
```

---

## 20. Sample test case — must fail if

`1980-05-22` test — fail if:

- [ ] S3 shown as S3-110
- [ ] S0 shown as S0-27
- [ ] S6 titled Money Frequency
- [ ] Shock = destiny in relationship content
- [ ] Any placeholder remains
- [ ] Final disclaimer missing

---

## 21. Final delivery rule

Deliver only when **all** pass: Calculation, Content, Page completeness, UI, Language, Safety, Website alignment, PDF (if applicable).

Any critical fail → **DO NOT DELIVER**

---

## 22. LUMEN role

**Not** creative rewrite. **Protect:** calculation accuracy, system integrity, brand consistency, user safety, language quality, paid product quality.

> Not your fate. Your mirror.

---

## Pending from spec package

- [ ] Delivery 5/6
- [ ] Delivery 6/6
