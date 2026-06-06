# 1320 Content — Canonical Lookup Rules (NOVA)

This document locks how S0, S1, S2, and S3 content is calculated and looked up, and how **Integrated Soul Blueprint** is separated from **Shadow Pattern Module**.

## Module naming (final — Wisewave)

| Product / UI term | Meaning | Codebase name |
|-------------------|---------|---------------|
| **Integrated Soul Blueprint** | Generated synthesis of S1 + S3 + S2 + S0 | `integratedSoulBlueprint` |
| Integrated Summary (short) | Free-result paragraph | `integratedFreeSummary` ← derived from synthesis |
| Integrated Summary Card | Free result UI | `IntegratedSummaryCard` |
| **Shadow Pattern Module** | Premium shadow module derived from S1 | `s4Content` / `s4-shadow-patterns.json` |

**Do not** use `s4Content` for Integrated Soul Blueprint.

**Do not** fallback synthesis to S1 shadow / `s4Content` when generation fails — show error + admin debug instead.

Optional internal alias only: `s4Synthesis` (not used in UI).

---

## Universal lookup rule

**Always look up by segment code key** — never by English title or bare array index.

| Correct | Incorrect |
|---------|-----------|
| `contentMap["S0-07"]` | `contentMap["Self-Worth Illusion"]` |
| `contentMap["S2-27"]` | `contentMap["Soul Shock Mirror"]` |
| `contentMap["S1-18"]` | `s1List[18]` |
| `contentMap["S3-08"]` | `contentMap["Healer"]` |

Implementation: `lib/lookup-segment-record.ts` → `lookupSegmentRecord(data, "S0", 7)` resolves `S0-07`.

---

## S0 — Void Gate (0–19)

**Formula:** Sum all digits in `YYYY-MM-DD`, then `mod 20`.

**Critical lock — S0-07 ≠ S1-07:**

| Code | English |
|------|---------|
| **S0-07** | Self-Worth Illusion |
| **S1-07** | The Warrior |

**Data:** `data/1320/s0-void-gate.json` (keys `S0-00` … `S0-19`)

---

## S1 — Origin Frequency (1–44)

**Formula:** Sum of birth year digits.

**Data:** `data/1320/s1-origin-frequency.json`

---

## S2 — Mirror Path (1–50)

**Formula:** `birthMonth + birthDay` → reachable **S2-02 … S2-43**

**Data:** `data/1320/s2-mirror-path.json`

---

## S3 — Vibration Tier (12 tiers)

**Formula:** `birthMonth × birthDay` → map raw to tier range.

Display: **`S3-04 · Awakener`** + `Raw Value: 132` — never `S3-132` as code.

**Data:** `data/1320/s3-vibration-tier.json`

---

## Integrated Soul Blueprint (synthesis)

- **Not** Shadow Patterns (`s4-shadow-patterns.json`).
- Generated at runtime: `lib/generate-integrated-blueprint.ts`
- Keyed by: `combinationSignature` e.g. `S1-24|S3-04|S2-23|S0-09`
- API shape:

```json
{
  "integratedSoulBlueprint": {
    "combinationSignature": "S1-24|S3-04|S2-23|S0-09",
    "coreEssenceSummary": "...",
    "energyExpressionSummary": "...",
    "relationshipMirrorSummary": "...",
    "awakeningPathSummary": "...",
    "integratedSummary": "...",
    "integrationTheme": "...",
    "generationMeta": { "usedFallback": false }
  },
  "s4Content": {
    "source": "derived_from_s1",
    "module": "Shadow Pattern"
  }
}
```

Debug: `NEXT_PUBLIC_REPORT_DEBUG=true` on `/result`.

---

## S5 — Soul Mission (deterministic seed assembly)

**S5 is not randomly generated.** It is assembled from four approved bilingual seeds:

| Seed | Source code key | Count |
|------|-----------------|-------|
| Primary Mission | `S1-XX` | 44 |
| Mirror Task | `S2-XX` | 50 |
| Vibration Carrier | `S3-XX` | 12 |
| Void Challenge | `S0-XX` | 20 |

**Data:** `data/1320/s5-seed-database.json` (import: `npm run import:s5-seeds`)

**Assembly:** `lib/assemble-s5-soul-mission.ts` → `get1320Content().s5Content`

**Signature (internal):** `combinationSignature` e.g. `S1-24|S3-04|S2-23|S0-09` — **not** `S5-24` or title-based keys.

**Rules:**

- AI may only polish approved seed text; it may not invent mission meaning.
- No deterministic life-purpose or destiny claims.
- Missing seed: dev throws; production sets `s5AssemblyError` (no generic fallback).

Verify: `npm run smoke:s5-assembly`

---

## Canonical sample birth dates

| Birth date | Codes |
|------------|-------|
| `1980-05-22` | S1-18 / S3-03 (raw 110) / S2-27 / S0-07 |
| `1977-11-12` | S1-24 / S3-04 (raw 132) / S2-23 / S0-09 |

Verify: `npm run smoke:content`, `npm run smoke:result-1977`, `npm run smoke:canonical`

---

## Source masters (import)

| Segment | Import script | Source JSON |
|---------|---------------|-------------|
| S0 | `npm run import:s0-master` | `S0_Master_VoidGate_Bilingual.json` |
| S1 | `npm run import:s1-master` | `S1_Master_*` |
| S2 | `npm run import:s2-master` | `S2_Master_MirrorPath_Bilingual.json` |
| S3 | `npm run import:s3-master` | `S3_Master_VibrationTier_Bilingual.json` |
