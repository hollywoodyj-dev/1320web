# N0.5 · T18 Convention Provenance

**Date:** 2026-09-16 (rev. 2026-09-17d — conditional closure)  
**Owner:** Nova  
**Status:** IN PROGRESS — live calculator survey (T18 data)  
**Blocks:** **T18 body text only** (survey table must close before publish)

**Parallel (Holly, not Nova):** D-11 production eyewitness — browser flow, first week of T0.

**Does not block:** N0.2 · N0.3 · N0.4 · T17 semantic scan · T17 page build

---

## Classification rule (locked)

```
Classify by FULL TRIPLET on three test dates — never by a single date.

              1985-04-11   1985-06-11   1985-01-09
  A                 2           22            6
  A′               11            4            6
  B                11            4           33
  C                 2            4            6

If measured triplet ≠ any row above → STOP and report. Do not extend model.
```

**Why triplet-only:** 1985-04-11 alone cannot separate A′ from B (both → 11). 1985-06-11 alone cannot separate A′, B, or C (all → 4).

---

## D-9 item 3 · Convention provenance gate

| Question | Answer |
|----------|--------|
| A and B named **primary** provenance? | **YES** — day-one PASS |
| Decoz (worldnumerology.com) | **Convention A** (primary) |
| Millman (*The Life You Were Born to Live*) | **Convention B** (primary) |
| Item 3 PASS/FAIL | **PASS** (existence, primary-source basis) |

Live survey, four-way signatures, and per-row evidence are **not** item 3. They are T18 research data under D-9 items **4, 6, 7**.

---

## D-9 items 4 / 6 / 7 · Live survey (data work)

| D-9 item | N0.5 deliverable | Status |
|----------|------------------|--------|
| **4** Reproducible implementation | Triplet classifier + scripts | ✅ local |
| **6** Test vectors | Three-date signatures + edge refs | ✅ locked table |
| **7** Research artifact | Live calculator table + per-row evidence | **IN PROGRESS** |

**Access date:** 2026-09-17  
**Method:** Puppeteer live form submission + triplet classification  
**Artifact:** `qa-artifacts/t18-calculator-survey-partial.json`

Survey table columns: `proseDeclared` · `outputMeasured` · `proseOutputMismatch` · per-date evidence (HTML + screenshot). `rowClosed` only with full triplet + evidence.

### Closure criteria (conditional — do not pad)

Survey supports two claims only:

1. Conventions **A / A′ / B live in real public tools** (evidenced measured triplets).
2. **Declared ≠ implemented** mismatch exists (named sources with evidence).

**Close when all satisfied:**

| Criterion | Minimum |
|-----------|---------|
| Convention **A** | ≥ 2 closed rows, measured A, with evidence |
| Convention **A′** | ≥ 2 closed rows, measured A′, with evidence |
| Convention **B** | ≥ 2 closed rows, measured B, with evidence |
| **Mismatch** | ≥ 2 named sources, `proseOutputMismatch` + evidence |
| **Total closed** | ~**8** rows (floor, not a target to exceed) |

When criteria met → **close table** → T18 body from `N0_5_T18_ARTIFACT_OUTLINE.md`. Do not add rows for marginal coverage.

**Stop rule (unchanged):** measured triplet matches none of A / A′ / B / C → **halt and report to Haze immediately**. Do not extend the model.

Checklist script: `npx tsx scripts/probe-t18-survey-closure.ts`

---

## Convention definitions

| ID | Rule |
|----|------|
| **A** | Reduce month, day, year separately; **keep** 11/22/33 at each step; combine and reduce |
| **A′** | Reduce month, day, year separately; **do not keep** masters at intermediate steps; combine and reduce |
| **B** | Sum every YYYYMMDD digit once; keep masters only on final reduction |
| **C** | Sum **unreduced** month + day + year; then reduce |

### A′ · artifact placement (draft — 玄微 final ruling pending)

| T18 section | A′ content |
|-------------|------------|
| **Methods** | Classify by output triplet, not prose |
| **Findings** | Mismatch count among **n surveyed** + named sources |
| **Limitations** | **Convention C only** (6.59%, not modeled) |

Full artifact outline: `N0_5_T18_ARTIFACT_OUTLINE.md`

---

## Primary provenance (existence — D-9 item 3)

### Convention A

| Source | Primary citation |
|--------|------------------|
| Hans Decoz / World Numerology | worldnumerology.com — reduce each unit; rejects undifferentiated digit-sum |
| Numerologist.com | numerologist.com/calculators/life-path-calculator |
| TokenRock | tokenrock.com/numerology/life-path-number-calculator |
| Mystical Digits | mysticaldigits.com/life-path-number-calculator |
| AstroBasic ch. 2 | Scribd chapter — reduce units first |
| astrology-numerology.cc | Three-stage method; contrasts with all-digit sum |

### Convention B

| Source | Primary citation |
|--------|------------------|
| Dan Millman | *The Life You Were Born to Live* — + between each digit, continuous sum |
| Rebecca Scolnick | *The Witch's Book of Numbers* (2022) pp. 14–15 — all digits summed |
| GlobalCalcs digital root | YYYYMMDD integer reduction (math reference) |

**Removed:** Explain Fate as Decoz authority. Decoz = A primary.

---

## Next actions

1. Continue live survey until **closure criteria** met (not row padding)
2. **UNKNOWN triplet → stop and report to Haze** (before adding rows)
3. Close table → T18 body draft from `N0_5_T18_ARTIFACT_OUTLINE.md`
