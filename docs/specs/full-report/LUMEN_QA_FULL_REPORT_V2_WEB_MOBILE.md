# LUMEN QA Plan — Full Report v2 (chunked, restartable)

**For:** LUMEN  
**Goal:** Compare **system truth** (calc + DB) vs **page output** for the same birthday — without one long session that gets interrupted.

**核心目标：** 系统本来结果 vs 网页显示结果 — 分小块测，每块可单独完成、记录、暂停。

---

## How to use this doc

1. Pick **one birth date** for the whole run (or one date per chunk).
2. Complete **Chunk 0** first — record expected codes in the session log.
3. Do **one chunk at a time**; check the box and note PASS/FAIL.
4. If interrupted, resume at the next unchecked chunk — no need to repeat finished chunks unless codes changed.

**URLs (same date everywhere):**

```text
/result?year=YYYY&month=M&day=D
/full-report-v2?year=YYYY&month=M&day=D
/mobile-report-v2?year=YYYY&month=M&day=D
```

**Example:** `year=1982&month=2&day=3` → signature `S1-20|S3-01|S2-05|S0-05` (Lumen baseline).

On `/result`, use **Full Report Previews** (under header) for desktop/mobile links.

---

## Session log (copy per run)

```text
Birth date:
Tester:
Chunk 0 system truth: PASS / FAIL
Chunk 1 result page: PASS / FAIL
Chunk 2 desktop 00-03: PASS / FAIL
Chunk 3 desktop 04-08: PASS / FAIL
Chunk 4 desktop 09-14: PASS / FAIL
Chunk 5 desktop 15-18: PASS / FAIL
Chunk 6 mobile 00-05: PASS / FAIL
Chunk 7 mobile 06-11: PASS / FAIL
Chunk 8 mobile 12-17: PASS / FAIL
Chunk 9 mobile 18-23: PASS / FAIL
Chunk 10 mobile 24-27: PASS / FAIL
Chunk 11 mobile 28-32: PASS / FAIL
CLI smokes: (list commands + PASS/FAIL)
Notes:
```

---

## Chunk 0 — System truth only (~5 min)

**Do not open browsers yet.** Record expected values for your birth date.

### CLI (from `web/`)

| Command | Purpose |
|---------|---------|
| `npm run smoke:v2-calculation` | Core calc rules |
| `npm run smoke:v2-content` | v2 DB lookup |
| `npm run smoke:full-report-v2-sample` | Payload 1980-05-22 |
| `npm run smoke:full-report-payload` | Payload shape |
| `npm run smoke:result-1977` | 1977-11-12 regression |

### Record for your date

```bash
npx tsx -e "const {calculate1320Code}=require('./lib/calculate1320Code'); console.log(calculate1320Code(Y,M,D));"
```

Fill in:

| Field | Your value |
|-------|------------|
| S1 / S1-NN | |
| S3 raw (internal) | |
| S3 code (UI) | |
| S2 / S2-NN | |
| S0 / S0-NN | |
| Signature | `S1-…\|S3-…\|S2-…\|S0-…` |
| Code strip | `S1-… / S3-… / S2-… / S0-…` |

**Pass:** All smokes green (or known waivers documented). Signature recorded.

**Fail:** Stop — file engineering issue before visual QA.

---

## Chunk 1 — Result page only (~10 min)

**URL:** `/result?year=&month=&day=`

- [ ] Code strip matches Chunk 0
- [ ] Overview cards: S1, S3, S2, S0 codes + titles
- [ ] Module cards: same codes/titles; S3 is **mapped code** (never raw e.g. S3-132)
- [ ] Integrated summary loads (no generic fallback for known codes)
- [ ] Full Report Previews links include correct `year/month/day`
- [ ] Optional: `NEXT_PUBLIC_REPORT_DEBUG=true` → Report Debug JSON matches Chunk 0

**Paid/full result fields (if testing full mode):**

- [ ] S2 **Relationship Trigger Pattern** present (insight sentence, e.g. “gives more” for S2-23)
- [ ] S0 **Core Illusion Mechanism** present (e.g. “judged” for S0-09)

---

## Chunk 2 — Desktop full report: pages 00–03 (~10 min)

**URL:** `/full-report-v2?year=&month=&day=`

| Page | ID | Check |
|------|-----|--------|
| 00 | Cover | Birth date, S0–S9 wheel codes vs Chunk 0 |
| 01 | Opening | Static chrome OK |
| 02 | Dimensions | Static / intro OK |
| 03 | Signature / code map | S1–S0 codes match result page |

---

## Chunk 3 — Desktop: pages 04–08 (~15 min)

| Page | Module | Check |
|------|--------|--------|
| 04 | S1 | Title + key copy vs result S1 card |
| 05 | S3 | Mapped S3 code + title (not raw) |
| 06 | S2 | Title vs result S2 card |
| 07 | S0 | Title vs result S0 card |
| 08 | Integrated blueprint | Summary themes match integrated card on result |

---

## Chunk 4 — Desktop: pages 09–14 (~20 min)

| Page | Module | Check |
|------|--------|--------|
| 09 | S4 | Code/title resolve, no empty shell |
| 10 | S5 | Mission content |
| 11 | S6 | Value/receiving |
| 12 | S7 | Sovereignty |
| 13 | S8 | Contribution |
| 14 | S9 | Return to source |

---

## Chunk 5 — Desktop: pages 15–18 (~10 min)

| Page | Check |
|------|--------|
| 15 Practice | 7-day / integration content |
| 16 Journal | Prompts populated |
| 17 Closing | Closing copy |
| 18 Disclaimer | Legal boundaries, no prediction/diagnosis framing |

---

## Chunk 6 — Mobile: pages 00–05 (~10 min)

**URL:** `/mobile-report-v2?year=&month=&day=` · viewport ~390px

| Page | Check |
|------|--------|
| 00 Cover | Codes + birth date |
| 01 Opening | Layout |
| 02 Disclaimer snapshot | Layout |
| 03 Signature | Matches desktop/result |
| 04 Code map | S1–S0 codes |
| 05 How to read | Layout |

---

## Chunk 7 — Mobile: pages 06–11 (~15 min)

| Pages | Check |
|-------|--------|
| 06–07 S1 reveal + essence | Title vs desktop S1 |
| 08–09 S3 reveal + expression | Mapped S3 |
| 10–11 S2 reveal + mirror lesson | Title vs desktop S2 |

---

## Chunk 8 — Mobile: pages 12–17 (~15 min)

| Pages | Check |
|-------|--------|
| 12–13 S0 reveal + void integration | Title vs desktop S0 |
| 14 Integrated blueprint | vs result integrated |
| 15 Integrated pattern action | Copy OK |
| 16–17 S4 shadow reveal + loop | S4 content |

---

## Chunk 9 — Mobile: pages 18–23 (~15 min)

| Pages | Check |
|-------|--------|
| 18–19 S5 mission reveal + pathway | |
| 20–21 S6 receiving reveal + pattern map | |
| 22–23 S7 sovereignty reveal + alignment map | |

---

## Chunk 10 — Mobile: pages 24–27 (~15 min)

| Pages | Check |
|-------|--------|
| 24–25 S8 contribution reveal + pathway | |
| 26–27 S9 return reveal + pathway remembrance | |

---

## Chunk 11 — Mobile: pages 28–32 (~15 min)

| Pages | Check |
|-------|--------|
| 28–29 7-day practice overview + cards | 7 days, S card logos |
| 30 Reflection journal | No overlapping text; textarea OK |
| 31 Closing reflection | Layout + CSS |
| 32 Final disclaimer | Layout + CSS |

---

## Canonical birth dates

| Date | Signature | CLI |
|------|-----------|-----|
| `1980-05-22` | `S1-18\|S3-03\|S2-27\|S0-07` | `smoke:full-report-v2-sample` |
| `1977-11-12` | `S1-24\|S3-04\|S2-23\|S0-09` | `smoke:result-1977` |
| `1982-02-03` | `S1-20\|S3-01\|S2-05\|S0-05` | Chunk 0 `npx tsx` one-liner |
| `2000-02-29` | (record in Chunk 0) | Leap-day sanity |

---

## Cross-surface matrix (fill after chunks)

| Data | Chunk 0 | Result | Desktop | Mobile |
|------|---------|--------|---------|--------|
| S1 code + title | | | | |
| S3 code + title | | | | |
| S2 code + title | | | | |
| S0 code + title | | | | |
| Signature | | | | |

---

## Issue template

```text
Chunk:
Birth date:
System expected:
Page showed:
Severity: Blocker | Major | Minor | Visual
Screenshot:
```

---

## Overall pass / fail

| Outcome | When |
|---------|------|
| **PASS** | Chunk 0 smokes green; codes/titles match across surfaces; no placeholders |
| **PASS WITH NOTES** | Visual-only (CSS refresh, spacing) |
| **FAIL** | Calc mismatch, missing module, desktop ≠ mobile for same date |

---

## Dev notes

- One dev server on `localhost:3000`; hard refresh after CSS changes.
- Related: `LUMEN_QA_PROTOCOL_v1.md` (paid delivery gate), `FULL_SOUL_ORIGIN_REPORT_V1_SPEC_SUMMARY.md`.
