# T18 research artifact · outline (Methods / Findings / Limitations)

**Status:** DRAFT — A′ placement pending 玄微 final ruling  
**Owner:** Nova  
**Prepared from:** N0.5 live calculator survey + Haze full-range scripts

---

## Main conclusion (unchanged)

> Across the two declared conventions tested, every observed disagreement was root-equivalent: one convention displayed a Master Number while the other reduced it to the corresponding single-digit root.

Supporting findings (`14.2014%`, `1 in 7.04`, pair counts) are **not** standalone headlines.

---

## Methods

### Research question (frozen)

How much does the output change when declared Life Path calculation conventions differ?

### Declared conventions under test

| ID | Rule |
|----|------|
| **A** | Reduce month, day, year separately; keep 11/22/33 at each step; combine and reduce |
| **B** | Sum every YYYYMMDD digit once; keep masters only on final reduction |

### Why classification uses **output**, not prose

1. **Triplet signature:** Each source is tested on three fixed dates (1985-04-11, 1985-06-11, 1985-01-09). The full output vector is matched against four known signatures (A, A′, B, C). A single date is insufficient — e.g. 1985-04-11 cannot separate A′ from B (both → 11).

2. **Prose is not execution:** Several public calculators describe Convention A in text but execute a different reduction (A′). Tagging by prose alone would mis-classify live behaviour.

3. **Practitioner attribution:** Named practitioners are cited from **primary sources only** (author site, book, official tool). Third-party paraphrases are not used to attribute a convention to a practitioner.

### Survey protocol

- Target: 12–15 named public calculators + 2–3 written primary sources per convention (existence).
- Per calculator: three test dates → record outputs → classify triplet → compare to `proseDeclared`.
- **Per row evidence required:** result-node HTML snippet and/or screenshot path (see `qa-artifacts/t18-calculator-survey/`).
- **Stop rule:** If measured triplet matches none of the four signatures → halt and report; do not extend the model.
- **Scrape integrity:** A triplet that matches a known signature is **not** auto-trusted — evidence must show the result came from the live calculator for that date, not a static worked example on the page.

### Full-range computation (A vs B)

- Range: 1900-01-01 .. 2099-12-31, N = 73,049 valid dates
- Nova independent implementation (no shared helpers with Haze scripts)

---

## Findings

### Primary · A vs B divergence (full range)

*(Populated after Nova independent cross-check vs Haze reference numbers.)*

### Secondary · Declared vs actual separation (survey)

**Framing:** Among the **n surveyed calculators**, count how many show `proseDeclared ≠ outputMeasured`.

**Allowed wording:**

- ✅ “Of the 14 calculators surveyed, X showed a mismatch between declared method and measured output.”
- ✅ “Source [name] declares Convention A; measured triplet matches A′ (11, 4, 6).”

**Forbidden wording:**

- ❌ “X% of calculators misrepresent their method.” (n = 14 cannot support population proportion.)
- ❌ “Most calculators are wrong.”

**Template (fill when table closes):**

| n surveyed | mismatch count | Sources (with evidence refs) |
|------------|----------------|------------------------------|
| 14 | _pending_ | _pending_ |

*A′ touches the frozen question:* “when **declared** conventions differ” assumes declaration matches execution — survey shows that premise does not always hold.

---

## Limitations

### Convention C — exists, not modeled in primary analysis

- Rule: sum **unreduced** month + day + year, then reduce
- Haze full-range check: differs from both A and B on **6.59%** of 73,049 dates (4,814 cases)
- Examples: 1900-09-19 (A=11, B=11, C=2); 1901-02-09 (A=22, B=22, C=4)
- **This section only** — C is a boundary of the two-convention study, not a headline finding

### What limitations does **not** contain

- **A′ mismatch counts** → Findings (secondary), not limitations
- A′ is an observed fact about sources, not a boundary of our A/B comparison range

### Other limitations

- Survey n = 12–15 establishes existence and documents behaviour in named sources; not global prevalence
- T18 does not adjudicate metaphysical validity of numerology
- Master Number frequency claims must stay convention-relative (see calibration 4)

---

## Evidence discipline

Each calculator row in the closed survey must include:

```
evidence/
  {calculator-slug}/
    1985-04-11.html-snippet.txt
    1985-04-11.png          (optional but preferred)
    1985-06-11.html-snippet.txt
    ...
```

Without per-date evidence, the row does **not** close.
