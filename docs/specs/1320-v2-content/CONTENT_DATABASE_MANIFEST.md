# Content database manifest (S0–S9 v2)

Maps each module to **steward source path** and **repo import target**. Primary JSONs land in `web/data/1320-v2/` during Phase 2.

**Steward root:** `C:\New folder (2)\1320 内容资产数据库-更新版（S0-S9)\1320 （S0-S9）内容数据库及计算逻辑\`

## S0 — Void Gate

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S0 Void Gate 空性之门\1320_S0_Void_Gate_Content_Database_v2_EN.json` | `web/data/1320-v2/s0-void-gate.json` |
| Markdown | `…\1320_S0_Void_Gate_Content_Database_v2_EN.md` | spec only |
| Calc logic | (in master calc) | — |

## S1 — Soul Origin

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S1 Soul Origin 灵魂震动源频\1320_S1_Soul_Origin_Content_Database_v2_EN.json` | `web/data/1320-v2/s1-soul-origin.json` |
| Markdown | `…\1320_S1_Soul_Origin_Content_Database_v2_EN.md` | spec only |

## S2 — Soul Mirror

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S2 Soul Mirror 灵魂镜像\1320_S2_Soul_Mirror_Content_Database_v2_EN.json` | `web/data/1320-v2/s2-soul-mirror.json` |
| Markdown | `…\1320_S2_Soul_Mirror_Content_Database_v2_EN.md` | spec only |

## S3 — Soul Vibration

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S3 Soul Vibration 灵魂震动\1320_S3_Soul_Vibration_Content_Database_v2_EN.json` | `web/data/1320-v2/s3-soul-vibration.json` |
| Mapping table | `…\1320_S3_Vibration_Level_Mapping_Table_v2.json` | `web/data/1320-v2/s3-vibration-mapping.json` |
| Markdown | mapping + examples only (no full DB `.md`) | spec only |

## S4 — Core Shadow Pattern

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S4 Core Shadow Pattern 核心阴影模式\1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.json` | `web/data/1320-v2/s4-core-shadow.json` |
| Markdown | `…\1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.md` | spec only |

**Index correction:** `1320_Content_Database_Index_v2.json` listed `1320_Awareness_Layer_S4_…_v1_EN.json` — that file is not in the pack. Use the v2 filename above.

Combined S0–S4 pack (optional reference): `S0-S4\1320_Awareness_Layer_S0_S4_Content_Database_v2_EN.json`

## S5 — Soul Mission

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S5 Soul Mission 灵魂使命\1320_S5_Soul_Mission_Content_Database_v4_EN.json` | `web/data/1320-v2/s5-soul-mission.json` |
| Markdown | `…\1320_S5_Soul_Mission_Content_Database_v4_EN.md` | spec only |
| Calc logic | `…\NOVA_S5_Soul_Mission_Calculation_Logic_v4.json` | `web/docs/specs/…` or `web/data/1320-v2/meta/` |

## S6 — Value & Receiving

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S6 Value and Receiving 价值与接收\1320_S6_Value_Receiving_Content_Database_v1_EN.json` | `web/data/1320-v2/s6-value-receiving.json` |
| Markdown | `…\1320_S6_Value_Receiving_Content_Database_v1_EN.md` | spec only |
| Calc logic | `…\NOVA_S6_Value_Receiving_Calculation_Logic_v1.json` | meta |

## S7 — Soul Sovereignty

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S7 Soul Sovereignty｜灵魂主权\1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json` | `web/data/1320-v2/1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json` ✅ (Phase 0) |
| Markdown | `…\1320_S7_Soul_Sovereignty_Content_Database_v1_EN.md` | spec only |
| Calc logic | `…\NOVA_S7_Soul_Sovereignty_Calculation_Logic_v1.json` | meta |

**Field key note:** JSON uses `what_your_soul_is_learning_to_reclaim`; index prose says “What Your Soul Is Learning to Choose”. Map from JSON keys.

## S8 — Soul Contribution (Advanced)

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S8 Soul Contribution｜灵魂贡献\1320_S8_Soul_Contribution_Content_Database_v1_EN.json` | `web/data/1320-v2/s8-soul-contribution.json` |
| Markdown | `…\1320_S8_Soul_Contribution_Content_Database_v1_EN.md` | spec only |
| Calc logic | `…\NOVA_S8_Soul_Contribution_Calculation_Logic_v1.json` | meta |

## S9 — Return to Source (Advanced)

| Role | Steward file | Repo target |
|------|--------------|-------------|
| Content DB | `S9 Return to Source｜回源之门\1320_S9_Return_to_Source_Content_Database_v1_EN.json` | `web/data/1320-v2/s9-return-to-source.json` |
| Markdown | `…\1320_S9_Return_to_Source_Content_Database_v1_EN.md` | spec only |
| Calc logic | `…\NOVA_S9_Return_to_Source_Calculation_Logic_v1.json` | meta |

## Cross-module

| File | Steward path | Notes |
|------|--------------|-------|
| S7–S9 dev index | `S7-S9 Development Index v1\1320_S7_S8_S9_Development_Index_v1.json` | Cross-reference only |
| Website copy | `Website Copy Rewrite Pack v2\` | Marketing, not report DB |
| Legal pack | `1320 Legal … Pack v1\` | Disclaimers |

## Repo vs production v1 (today)

| Area | v1 (`data/1320`) | v2 (target) |
|------|------------------|-------------|
| S4 calc | Derived from S1 shadow | `(S2 + S0) mod 20` |
| S5 | Seed assembly | v4 direct lookup |
| S6 | Money frequency labels | Value & Receiving |
| S7–S9 | Not implemented | Full + Advanced tiers |
