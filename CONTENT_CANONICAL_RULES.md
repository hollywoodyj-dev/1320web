# 1320 Content — Canonical Lookup Rules (NOVA)

This document locks how S0, S1, S2, and S3 content is calculated and looked up in the website codebase.

## Universal rule

**Always look up by segment code key** — never by English title, Chinese title, or bare array index.

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

Example `1980-05-22`:

```
1+9+8+0+0+5+2+2 = 27 → 27 mod 20 = 7 → S0-07
```

**Fields:** Void Archetype, Core Illusion, Void Challenge, Void Power, Path of Return, Guidance.

**Critical lock — S0-07 ≠ S1-07:**

| Code | English | 中文 |
|------|---------|------|
| **S0-07** | Self-Worth Illusion | 自我价值幻象 |
| **S1-07** | The Warrior | 坚毅者 |

Do not use Warrior / The Warrior Soul for S0. Warrior belongs to S1 only.

**Data:** `data/1320/s0-void-gate.json` (keys `S0-00` … `S0-19`)

---

## S1 — Origin Frequency (1–44)

**Formula:** Sum of birth year digits.

**Data:** `data/1320/s1-origin-frequency.json` (keys `S1-01` … `S1-44`)

---

## S2 — Mirror Path (1–50)

**Formula:** `birthMonth + birthDay`

| Range | Reachable by current formula? |
|-------|-------------------------------|
| S2-02 … S2-43 | Yes (min 1+1=2, max 12+31=43) |
| S2-01, S2-44 … S2-50 | Canonical DB exists; **not** formula-reachable |

Each entry includes: Mirror Archetype, Relationship Dynamic, Karmic Loop, Lesson, Healing Path, Guidance, `formulaReachable`, `formulaNote`.

**Data:** `data/1320/s2-mirror-path.json` (keys `S2-01` … `S2-50`)

---

## S3 — Vibration Tier (12 tiers)

**Formula:** `birthMonth × birthDay` → map raw value to tier range.

Max raw with current formula: `12 × 31 = 372`.

| Tiers | Reachable? |
|-------|------------|
| S3-01 … S3-09 | Yes |
| S3-10, S3-11, S3-12 | Canonical tiers exist; **not** reachable by current formula |

Tiers: Seed, Spark, Explorer, Awakener, Integrator, Alchemist, Visionary, Healer, Mentor, Master, Ascendant, Source-Channel.

**Data:** `data/1320/s3-vibration-tier.json` — lookup via `getS3TierRecord(raw)` range match; tier records use `code: "S3-03"` etc.

Example: raw `110` → range 81–120 → **S3-03 Explorer**.

---

## Canonical sample birth date

`1980-05-22` → **S1-18** / **S3-110** (→ S3-03 Explorer) / **S2-27** / **S0-07**

Verify: `npm run smoke:content` and `npm run smoke:canonical`

---

## Source masters (import)

| Segment | Import script | Source JSON |
|---------|---------------|-------------|
| S0 | `npm run import:s0-master` | `data/1320/sources/S0_Master_VoidGate_Bilingual.json` |
| S1 | `npm run import:s1-master` | `S1_Master_Database_canonical.json` + EN |
| S2 | `npm run import:s2-master` | `S2_Master_MirrorPath_Bilingual.json` |
| S3 | `npm run import:s3-master` | `S3_Master_VibrationTier_Bilingual.json` |
