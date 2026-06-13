# 1320 Content Database Index v2

**Version:** 2.0  
**Date:** 2026-06-13  
**System:** 1320 Soul Origin Code System™  
**Product Context:** TheSoulProfile / SeeSoul / NOVA  

## Purpose

Master index for all S0–S9 content databases, defining module ranges, file references, lookup keys, rendering fields, product tier placement, and safety rules for NOVA.

---

## Global Rules

Content databases are the source of truth for user-facing interpretations. NOVA calculates codes, looks up matching records, and renders the approved content.

### NOVA Generation Boundary

- NOVA may generate short bridge sentences, section transitions, integration summaries, and localized formatting.
- NOVA must not generate core interpretation fields from scratch when the field exists in the content database.
- NOVA must preserve the symbolic, reflective, non-deterministic tone.
- NOVA must not convert any code into destiny, fixed identity, diagnosis, prediction, financial advice, or spiritual rank.

### Safe Language Note

All interpretations are symbolic and reflective. They are not predictive, diagnostic, deterministic, medical, legal, financial, or religious instructions, and they do not define a fixed identity.

---

## Product Layers

| Range | Layer | 中文 | Tier | Function |
|---|---|---|---|---|
| S0-S4 | Awareness Layer | 看见层 | Free Detailed Report | Helps the user see foundational patterns clearly. |
| S5-S7 | Transformation Layer | 转化层 | Full Soul Reflection Report | Helps the user transform awareness into mission, value, receiving, and sovereignty. |
| S8-S9 | Integration Layer | 整合层 | Advanced Integration Report | Helps the user integrate life themes into contribution and return-to-source reflection. |

---

## Database Index

| Module | Name | 中文 | Layer | Tier | Range | Primary JSON | Status |
|---|---|---|---|---|---|---|---|
| S0 | Void Gate | 空性之门 | Awareness Layer | Free Detailed Report | S0-00 to S0-19 | `1320_S0_Void_Gate_Content_Database_v2_EN.json` | needs_alignment_or_confirmed_source |
| S1 | Soul Origin | 灵魂本源 | Awareness Layer | Free Detailed Report | S1-01 to S1-44 | `1320_S1_Soul_Origin_Content_Database_v2_EN.json` | legacy_content_exists_needs_v2_index_confirmation |
| S2 | Soul Mirror | 灵魂镜像 | Awareness Layer | Free Detailed Report | S2-02 to S2-43 for valid Gregorian dates; legacy range may extend depending on source database | `1320_S2_Soul_Mirror_Content_Database_v2_EN.json` | needs_alignment_or_confirmed_source |
| S3 | Soul Vibration | 灵魂振动 | Awareness Layer | Free Detailed Report | Defined by official S3 vibration_level mapping table | `1320_S3_Soul_Vibration_Content_Database_v2_EN.json` | requires_official_mapping_table |
| S4 | Core Shadow Pattern | 核心阴影模式 | Awareness Layer | Free Detailed Report | S4-00 to S4-19 | `1320_Awareness_Layer_S4_Core_Shadow_Pattern_Content_Database_v1_EN.json` | source_sample_confirmed |
| S5 | Soul Mission | 灵魂使命 | Transformation Layer | Full Soul Reflection Report | S5-01 to S5-44 | `1320_S5_Soul_Mission_Content_Database_v4_EN.json` | completed_v4 |
| S6 | Value & Receiving | 价值与接收 | Transformation Layer | Full Soul Reflection Report | S6-01 to S6-44 | `1320_S6_Value_Receiving_Content_Database_v1_EN.json` | completed_v1 |
| S7 | Soul Sovereignty | 灵魂主权 | Transformation Layer | Full Soul Reflection Report | S7-00 to S7-06 | `1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json` | completed_v1 |
| S8 | Soul Contribution | 灵魂贡献 | Integration Layer | Advanced Integration Report | S8-00 to S8-07 | `1320_S8_Soul_Contribution_Content_Database_v1_EN.json` | completed_v1 |
| S9 | Return to Source | 回源之门 | Integration Layer | Advanced Integration Report | S9-00 to S9-08 | `1320_S9_Return_to_Source_Content_Database_v1_EN.json` | completed_v1 |

---

## S0 · Void Gate / 空性之门

**Layer:** Awareness Layer  
**Product Tier:** Free Detailed Report  
**Code Range:** S0-00 to S0-19  
**Calculation:** `full_birth_date_digit_sum mod 20`  
**Zero Rule:** Keep 0 as S0-00.  
**Lookup Key Format:** `S0-XX`  
**Primary JSON:** `1320_S0_Void_Gate_Content_Database_v2_EN.json`  
**Markdown:** `1320_S0_Void_Gate_Content_Database_v2_EN.md`  
**Status:** needs_alignment_or_confirmed_source  

### Rendering Fields

- Reflection Question
- Void Theme
- Core Illusion
- How This Gate Appears
- Integration Key
- Grounded Practice
- Wisewave Guidance
- Safe Language Note

### NOVA Instruction

Calculate S0 and lookup corresponding Void Gate content. Use reflective language and do not frame the void gate as fate or defect.

---

## S1 · Soul Origin / 灵魂本源

**Layer:** Awareness Layer  
**Product Tier:** Free Detailed Report  
**Code Range:** S1-01 to S1-44  
**Calculation:** `digit_sum(birth_year)`  
**Zero Rule:** Not applicable under normal year digit sum.  
**Lookup Key Format:** `S1-XX`  
**Primary JSON:** `1320_S1_Soul_Origin_Content_Database_v2_EN.json`  
**Markdown:** `1320_S1_Soul_Origin_Content_Database_v2_EN.md`  
**Status:** legacy_content_exists_needs_v2_index_confirmation  

### Rendering Fields

- Origin Essence
- Soul Traits
- Strengths
- Shadow Frequency
- Core Lesson
- Mission Direction
- Wisewave Guidance
- Symbolic Color
- Totem
- Safe Language Note

### NOVA Instruction

Use S1 as the foundational origin frequency. Do not treat archetype as fixed identity.

---

## S2 · Soul Mirror / 灵魂镜像

**Layer:** Awareness Layer  
**Product Tier:** Free Detailed Report  
**Code Range:** S2-02 to S2-43 for valid Gregorian dates; legacy range may extend depending on source database  
**Calculation:** `birth_month + birth_day`  
**Zero Rule:** Not applicable.  
**Lookup Key Format:** `S2-XX`  
**Primary JSON:** `1320_S2_Soul_Mirror_Content_Database_v2_EN.json`  
**Markdown:** `1320_S2_Soul_Mirror_Content_Database_v2_EN.md`  
**Status:** needs_alignment_or_confirmed_source  

### Rendering Fields

- Mirror Essence
- Relationship Pattern
- Attraction Dynamic
- Trigger Pattern
- Hidden Need
- Integration Key
- Wisewave Guidance
- Safe Language Note

### NOVA Instruction

Use S2 to reflect relational mirror patterns. Do not instruct users to stay, leave, pursue, or end any relationship.

---

## S3 · Soul Vibration / 灵魂振动

**Layer:** Awareness Layer  
**Product Tier:** Free Detailed Report  
**Code Range:** Defined by official S3 vibration_level mapping table  
**Calculation:** `S3_raw = birth_month × birth_day; S3 = vibration_level(S3_raw)`  
**Zero Rule:** Follow official S3 vibration mapping.  
**Lookup Key Format:** `S3-XX`  
**Primary JSON:** `1320_S3_Soul_Vibration_Content_Database_v2_EN.json`  
**Markdown:** `1320_S3_Soul_Vibration_Content_Database_v2_EN.md`  
**Status:** requires_official_mapping_table  

**Mapping File:** `1320_S3_Vibration_Level_Mapping_Table_v2.json`  

### Rendering Fields

- Vibration Essence
- Expression Style
- Maturity Pattern
- Acceleration Pattern
- Grounding Challenge
- Integration Key
- Wisewave Guidance
- Safe Language Note

### NOVA Instruction

NOVA must not infer S3 without the official vibration_level mapping table. If mapping table is unavailable, return an error or missing mapping warning.

---

## S4 · Core Shadow Pattern / 核心阴影模式

**Layer:** Awareness Layer  
**Product Tier:** Free Detailed Report  
**Code Range:** S4-00 to S4-19  
**Calculation:** `(S2 + S0) mod 20`  
**Zero Rule:** Keep 0 as S4-00. Do not convert to 20.  
**Lookup Key Format:** `S4-XX`  
**Primary JSON:** `1320_Awareness_Layer_S4_Core_Shadow_Pattern_Content_Database_v1_EN.json`  
**Markdown:** `1320_Awareness_Layer_S4_Core_Shadow_Pattern_Content_Database_v1_EN.md`  
**Status:** source_sample_confirmed  

### Rendering Fields

- Reflection Question
- Core Loop
- Reflective Summary
- Emotional Trigger
- Defense Pattern
- Hidden Need
- Relationship Pattern
- Work & Life Pattern
- Integration Key
- One-Week Practice
- Wisewave Guidance
- Safe Language Note

### NOVA Instruction

Lookup S4 content directly. This layer should describe protective loops, not diagnose pathology.

---

## S5 · Soul Mission / 灵魂使命

**Layer:** Transformation Layer  
**Product Tier:** Full Soul Reflection Report  
**Code Range:** S5-01 to S5-44  
**Calculation:** `(S1 + S2 + S3) mod 44; 0 → 44`  
**Zero Rule:** If result is 0, convert to S5-44.  
**Lookup Key Format:** `S5-XX`  
**Primary JSON:** `1320_S5_Soul_Mission_Content_Database_v4_EN.json`  
**Markdown:** `1320_S5_Soul_Mission_Content_Database_v4_EN.md`  
**Status:** completed_v4  

**Calculation Logic File:** `NOVA_S5_Soul_Mission_Calculation_Logic_v4.json`  

### Rendering Fields

- Mission Essence
- What Your Soul Is Learning to Express
- How Your Patterns Become Mission
- Natural Mission Fields
- Shadow Distortion of This Mission
- Mature Expression
- Wisewave Reflection

### NOVA Instruction

NOVA must retrieve the seven S5 blocks from the content database. Do not generate How Your Patterns Become Mission from scratch.

---

## S6 · Value & Receiving / 价值与接收

**Layer:** Transformation Layer  
**Product Tier:** Full Soul Reflection Report  
**Code Range:** S6-01 to S6-44  
**Calculation:** `(S1 + S3 + S0) mod 44; 0 → 44`  
**Zero Rule:** If result is 0, convert to S6-44.  
**Lookup Key Format:** `S6-XX`  
**Primary JSON:** `1320_S6_Value_Receiving_Content_Database_v1_EN.json`  
**Markdown:** `1320_S6_Value_Receiving_Content_Database_v1_EN.md`  
**Status:** completed_v1  

**Legacy Name:** Money Archetypes / Money Core Frequency  

**Calculation Logic File:** `NOVA_S6_Value_Receiving_Calculation_Logic_v1.json`  

### Rendering Fields

- Value Essence
- What Your Soul Is Learning to Receive
- How Value Wants to Flow
- Natural Value Fields
- Shadow Distortion of Receiving
- Mature Receiving Expression
- Wisewave Reflection

### NOVA Instruction

User-visible output must use Value & Receiving language. Do not output Money Frequency as the public label. Do not provide financial predictions or investment advice.

---

## S7 · Soul Sovereignty / 灵魂主权

**Layer:** Transformation Layer  
**Product Tier:** Full Soul Reflection Report  
**Code Range:** S7-00 to S7-06  
**Calculation:** `(S1 + S3 + S4 + S6) mod 7`  
**Zero Rule:** Keep 0 as S7-00.  
**Lookup Key Format:** `S7-XX`  
**Primary JSON:** `1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json`  
**Markdown:** `1320_S7_Soul_Sovereignty_Content_Database_v1_EN.md`  
**Status:** completed_v1  

**Calculation Logic File:** `NOVA_S7_Soul_Sovereignty_Calculation_Logic_v1.json`  

### Rendering Fields

- Sovereignty Essence
- Where Power Was Given Away
- What Your Soul Is Learning to Choose
- Boundary & Agency Pattern
- Shadow Distortion of Sovereignty
- Mature Sovereignty Expression
- Wisewave Reflection

### NOVA Instruction

Use S7 to reflect agency, boundary, and choice. Do not tell the user what decision to make.

---

## S8 · Soul Contribution / 灵魂贡献

**Layer:** Integration Layer  
**Product Tier:** Advanced Integration Report  
**Code Range:** S8-00 to S8-07  
**Calculation:** `(S5 + S6 + S7) mod 8`  
**Zero Rule:** Keep 0 as S8-00.  
**Lookup Key Format:** `S8-XX`  
**Primary JSON:** `1320_S8_Soul_Contribution_Content_Database_v1_EN.json`  
**Markdown:** `1320_S8_Soul_Contribution_Content_Database_v1_EN.md`  
**Status:** completed_v1  

**Calculation Logic File:** `NOVA_S8_Soul_Contribution_Calculation_Logic_v1.json`  

### Rendering Fields

- Contribution Essence
- How Your Life Themes Become Contribution
- Natural Contribution Fields
- Who or What You May Serve
- Shadow Distortion of Contribution
- Mature Contribution Expression
- Wisewave Reflection

### NOVA Instruction

Use S8 as an integration reflection, not as a rank or proof of awakening.

---

## S9 · Return to Source / 回源之门

**Layer:** Integration Layer  
**Product Tier:** Advanced Integration Report  
**Code Range:** S9-00 to S9-08  
**Calculation:** `(S1 + S0 + S7 + S8) mod 9`  
**Zero Rule:** Keep 0 as S9-00.  
**Lookup Key Format:** `S9-XX`  
**Primary JSON:** `1320_S9_Return_to_Source_Content_Database_v1_EN.json`  
**Markdown:** `1320_S9_Return_to_Source_Content_Database_v1_EN.md`  
**Status:** completed_v1  

**Calculation Logic File:** `NOVA_S9_Return_to_Source_Calculation_Logic_v1.json`  

### Rendering Fields

- Return Essence
- What Is Being Integrated
- The Path Back to Wholeness
- What Must Be Released
- Shadow Distortion of Return
- Mature Return Expression
- Wisewave Reflection

### NOVA Instruction

Use S9 as return-to-wholeness reflection. Do not frame it as a final answer, spiritual graduation, or ultimate truth.

---

## Master Logic Files

- **architecture:** `1320_Master_System_Architecture_v2.json`
- **nova_calculation:** `NOVA_Master_Calculation_Logic_v2.json`
- **website_copy:** `Website_Copy_Rewrite_Pack_v2.json`

---

## Status Legend

- **completed_v1:** Content and calculation logic exist in current upgraded architecture, first complete version.
- **completed_v4:** Content and calculation logic exist in current upgraded architecture with multiple iterations and finalized rendering blocks.
- **source_sample_confirmed:** Source format and content sample confirmed from uploaded source.
- **needs_alignment_or_confirmed_source:** Needs final v2 content database confirmation or migration from legacy source.
- **legacy_content_exists_needs_v2_index_confirmation:** Legacy content exists but should be confirmed against v2 naming and rendering fields.
- **requires_official_mapping_table:** Cannot be safely computed without official mapping table.

---

## Handoff Notes

### For Developers

- Use this index to connect NOVA calculation outputs to the correct content database file.
- Do not hard-code user-facing descriptions in calculation logic if the content database includes that field.
- Each module output should include code, name, localized name, layer, content fields, and safe language note.
- If a database file listed here is not present in production, return a controlled missing_content_database error.

### For Content Team

- S0, S1, S2, and S3 may need final v2 alignment if legacy files are not yet migrated.
- S5 is currently the most stable version and should be used as the model for future content database field structure.
- S6 should retain Value & Receiving language and avoid reverting to Money Frequency publicly.
- S8–S9 should remain integration layers, not hierarchy or enlightenment language.