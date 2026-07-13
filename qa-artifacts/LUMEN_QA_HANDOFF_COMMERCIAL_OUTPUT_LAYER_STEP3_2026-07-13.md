# Lumen QA Handoff — Commercial Report Output Layer Step 3 (S4–S6)

**From:** Holly / Nova (Wisewave Step 3 integration)  
**To:** Lumen  
**Environment:** Production — https://www.1320soulcode.com (after deploy)  
**Scope:** Commercial overlay for **S4/S5/S6** (108 entries) — symbolic source unchanged  
**Prerequisite:** Step 2 (S0–S3, 126 entries) already integrated — total overlay **234 entries**

**Specs:**

- `docs/specs/1320-v2-content/1320_COMMERCIAL_REPORT_BLOCKS_STEP3_QA_SUMMARY.md`
- `docs/specs/1320-v2-content/1320_STEP3_SAMPLE_ADVANCED_BLOCKS_1980-05-22.md`
- `docs/specs/1320-v2-content/S6_LEGACY_LANGUAGE_CLEANUP_NOTES_v3_step3.json`
- `data/1320-v2/commercial-report-blocks-overlay.json` (runtime overlay, merged Steps 2+3)
- `data/1320-v2/commercial-overlay/step3-s4-s6/*.json` (module exports)

**Nova pre-flight:** `npm run smoke:commercial-overlay` (5 birth dates + S7 fallback check)

---

## Integration summary

| Module | Overlay entries | Runtime behavior |
|--------|----------------:|------------------|
| S0–S3 | 126 (Step 2) | Commercial blocks from overlay |
| S4 | 20 (Step 3) | Commercial blocks from overlay |
| S5 | 44 (Step 3) | Commercial blocks from overlay |
| S6 | 44 (Step 3) | Commercial blocks from overlay |
| S7–S9 | 0 (Step 3) | Symbolic / steward fallback until Step 4 |

Symbolic source JSON in `data/1320-v2/*.json` is **not overwritten**.

---

## Birth dates to test (minimum 5)

| # | Birth date | URL |
|---|------------|-----|
| 1 | 1980-05-22 | https://www.1320soulcode.com/result?year=1980&month=5&day=22 |
| 2 | 1982-02-03 | https://www.1320soulcode.com/result?year=1982&month=2&day=3 |
| 3 | 1977-11-12 | https://www.1320soulcode.com/result?year=1977&month=11&day=12 |
| 4 | 1988-07-14 | https://www.1320soulcode.com/result?year=1988&month=7&day=14 |
| 5 | 1990-03-09 | https://www.1320soulcode.com/result?year=1990&month=3&day=9 |

Paid surface spot-checks:

- https://www.1320soulcode.com/full-report-v2 (sample: S4-14 / S5-04 / S6-28 for 1980-05-22)
- Entitled Full Report if credentials available

---

## Wisewave Step 3 QA checklist

### 1. S4–S6 commercial blocks active

- [ ] Full report for each birth date renders S4/S5/S6 without synthesis errors
- [ ] S4/S5/S6 use direct “you” commercial prose (not source-layer template)
- [ ] No `It invites the user` / `This S6 pattern reflects` / internal dev copy on rendered output

### 2. S4 non-diagnostic framing

- [ ] Shadow framed as protective loop / growth edge, not pathology or fixed defect
- [ ] No dominant diagnostic or pathologizing language

### 3. S5 mission schema mapping

- [ ] S5 renders 7-block commercial schema (opening, show-up, gift, growth, integration, practice, reflection)
- [ ] Mission archetype preserved (e.g. S5-04 “The Mission of Structure” for 1980-05-22)

### 4. S6 Value & Receiving language

- [ ] Module labeled “Value & Receiving” (not Money Frequency)
- [ ] No legacy wealth/money language: `wealth`, `prosperity`, `abundance`, `财富`, `丰盛`, `金矿`
- [ ] Commercial blocks preferred over symbolic source fields with legacy terms

### 5. Foundation order preserved

- [ ] S1 → S3 → S2 → S0 order unchanged on all surfaces

### 6. S7–S9 fallback intact

- [ ] S7–S9 still render from symbolic/steward layers (no blank modules)

### 7. Symbolic source unchanged

- [ ] `data/1320-v2/s4-core-shadow.json`, `s5-soul-mission.json`, `s6-value-receiving.json` not modified

---

## Trigger phrases (FAIL if dominant on S4–S6 user-facing copy)

- `It invites the user`
- `This S6 pattern reflects`
- `Money Frequency`
- `Who You Attract`
- `Commercial report output layer`
- `财富` / `丰盛` / `金矿` (legacy S6 source terms)

---

## Report back

Save artifact: `qa-artifacts/LUMEN_QA_COMMERCIAL_OUTPUT_LAYER_STEP3_2026-07-13.md`

```markdown
# Lumen QA — Commercial Output Layer Step 3 (S4–S6)

**Date:** YYYY-MM-DD  
**Deploy ref:** <sha>  
**Overall:** PASS | PASS WITH NOTES | FAIL  

## Summary
## Birth date results (5+)
## Failures / Holds
## Notes
## Sign-off
Step 3 accepted for Step 4 handoff: Yes / No
```

---

## Reference — Nova smoke

```bash
cd web
npm run smoke:commercial-overlay
npm run smoke:v2-get-content
npm run smoke:full-report-v2-sample
```
