# NOVA Master Calculation Logic v2

**Version:** 2.0  
**Date:** 2026-06-13  
**System:** 1320 Soul Origin Code System™  
**Product Context:** TheSoulProfile / SeeSoul / NOVA  

## Purpose

This document defines the master calculation logic for NOVA to compute S0–S9 codes, normalize outputs, call the correct content databases, and render report sections safely.

---

## Positioning

1320 is a symbolic self-reflection architecture.

It is **not**:

- prediction
- fortune-telling
- diagnosis
- therapy
- medical advice
- legal advice
- financial advice
- religious authority
- deterministic identity labeling

All interpretations must remain symbolic, reflective, non-deterministic, grounded, and self-authority preserving.

---

## Required Input

```json
{
  "birth_year": {
    "type": "integer",
    "format": "YYYY",
    "example": 1980
  },
  "birth_month": {
    "type": "integer",
    "range": "1-12",
    "example": 5
  },
  "birth_day": {
    "type": "integer",
    "range": "1-31 depending on month/year validity",
    "example": 22
  }
}
```

### Validation Rules

- birth_year must be a four-digit integer.
- birth_month must be between 1 and 12.
- birth_day must be valid for the given month and year.
- NOVA should reject impossible dates before calculation.
- NOVA should not ask for birth time; birth time is not used in the 1320 system.

### Normalization Rules

- Use numeric month and day values, without leading-zero influence in arithmetic.
- For full_birth_date_digit_sum, sum all digits from YYYY, MM, and DD. Month/day leading zeros do not change the digit sum except by contributing 0.

---

## Core Functions

### digit_sum

Sum all decimal digits in an integer or date component string.

Example:

```text
1980 → 1 + 9 + 8 + 0 = 18
```

### full_birth_date_digit_sum

Sum all digits across birth year, birth month, and birth day.

Example:

```text
1980-05-22 → 1 + 9 + 8 + 0 + 0 + 5 + 2 + 2 = 27
```

### vibration_level

Map `S3_raw` to the official S3 vibration level using the official S3 mapping table.

**Important:** NOVA must not infer S3 without the official mapping table.

---

## Official Calculation Order

```text
S1
S2
S3_raw
S3
S0
S4
S5
S6
S7
S8
S9
```

---

## Calculations

## S1 · Soul Origin / 灵魂本源

**Layer:** Awareness Layer  
**Formula:** `digit_sum(birth_year)`  
**Dependencies:** birth_year  
**Range:** 1-44  
**Zero Rule:** Not applicable under normal four-digit birth_year calculation.  
**Code Format:** `S1-{value_padded_2_digits}`  
**Content Lookup:** `1320_S1_Soul_Origin_Content_Database` using key `S1-XX`  

---

## S2 · Soul Mirror / 灵魂镜像

**Layer:** Awareness Layer  
**Formula:** `birth_month + birth_day`  
**Dependencies:** birth_month, birth_day  
**Range:** 2-43 for valid Gregorian birth dates; legacy database may support wider range if needed.  
**Zero Rule:** Not applicable.  
**Code Format:** `S2-{value_padded_2_digits}`  
**Content Lookup:** `1320_S2_Soul_Mirror_Content_Database` using key `S2-XX`  

---

## S3_raw · Soul Vibration Raw / 灵魂振动原始值

**Layer:** Awareness Layer  
**Formula:** `birth_month × birth_day`  
**Dependencies:** birth_month, birth_day  
**Range:** 1-372  
**Zero Rule:** Not applicable.  
**Code Format:** `raw_integer`  

---

## S3 · Soul Vibration / 灵魂振动

**Layer:** Awareness Layer  
**Formula:** `vibration_level(S3_raw)`  
**Dependencies:** S3_raw, official_S3_vibration_level_mapping_table  
**Range:** Defined by official S3 vibration mapping table.  
**Zero Rule:** Follow official S3 vibration mapping.  
**Code Format:** `S3-{value_padded_2_digits}`  
**Content Lookup:** `1320_S3_Soul_Vibration_Content_Database` using key `S3-XX`  

**Missing Mapping Behavior:** `S3_MAPPING_TABLE_MISSING` — Official S3 vibration mapping table is required. NOVA must not guess S3.

---

## S0 · Void Gate / 空性之门

**Layer:** Awareness Layer  
**Formula:** `full_birth_date_digit_sum mod 20`  
**Dependencies:** birth_year, birth_month, birth_day  
**Range:** 0-19  
**Zero Rule:** Keep 0 as S0-00. Do not convert to 20.  
**Code Format:** `S0-{value_padded_2_digits}`  
**Content Lookup:** `1320_S0_Void_Gate_Content_Database` using key `S0-XX`  

---

## S4 · Core Shadow Pattern / 核心阴影模式

**Layer:** Awareness Layer  
**Formula:** `(S2 + S0) mod 20`  
**Dependencies:** S2, S0  
**Range:** 0-19  
**Zero Rule:** Keep 0 as S4-00. Do not convert to 20.  
**Code Format:** `S4-{value_padded_2_digits}`  
**Content Lookup:** `1320_S4_Core_Shadow_Pattern_Content_Database` using key `S4-XX`  

---

## S5 · Soul Mission / 灵魂使命

**Layer:** Transformation Layer  
**Formula:** `(S1 + S2 + S3) mod 44`  
**Dependencies:** S1, S2, S3  
**Range:** 1-44  
**Zero Rule:** If modulo result is 0, convert to 44.  
**Code Format:** `S5-{value_padded_2_digits}`  
**Content Lookup:** `1320_S5_Soul_Mission_Content_Database_v4_EN` using key `S5-XX`  

**Rendering Blocks:**
- Mission Essence
- What Your Soul Is Learning to Express
- How Your Patterns Become Mission
- Natural Mission Fields
- Shadow Distortion of This Mission
- Mature Expression
- Wisewave Reflection

**Rendering Rule:** NOVA must retrieve the prewritten S5 content from the content database. NOVA must not generate the core seven blocks from scratch.

---

## S6 · Value & Receiving / 价值与接收

**Layer:** Transformation Layer  
**Formula:** `(S1 + S3 + S0) mod 44`  
**Dependencies:** S1, S3, S0  
**Range:** 1-44  
**Zero Rule:** If modulo result is 0, convert to 44.  
**Code Format:** `S6-{value_padded_2_digits}`  
**Legacy Name:** Money Archetypes / Money Core Frequency  
**Content Lookup:** `1320_S6_Value_Receiving_Content_Database_v1_EN` using key `S6-XX`  

**Rendering Blocks:**
- Value Essence
- What Your Soul Is Learning to Receive
- How Value Wants to Flow
- Natural Value Fields
- Shadow Distortion of Receiving
- Mature Receiving Expression
- Wisewave Reflection

**Rendering Rule:** NOVA must translate old money-frequency meanings into Value & Receiving language. Do not output financial predictions, income promises, investment advice, or wealth destiny statements.

---

## S7 · Soul Sovereignty / 灵魂主权

**Layer:** Transformation Layer  
**Formula:** `(S1 + S3 + S4 + S6) mod 7`  
**Dependencies:** S1, S3, S4, S6  
**Range:** 0-6  
**Zero Rule:** Keep 0 as S7-00. Do not convert.  
**Code Format:** `S7-{value_padded_2_digits}`  
**Content Lookup:** `1320_S7_Soul_Sovereignty_Content_Database_v1_EN` using key `S7-XX`  

---

## S8 · Soul Contribution / 灵魂贡献

**Layer:** Integration Layer  
**Formula:** `(S5 + S6 + S7) mod 8`  
**Dependencies:** S5, S6, S7  
**Range:** 0-7  
**Zero Rule:** Keep 0 as S8-00. Do not convert.  
**Code Format:** `S8-{value_padded_2_digits}`  
**Content Lookup:** `1320_S8_Soul_Contribution_Content_Database_v1_EN` using key `S8-XX`  

---

## S9 · Return to Source / 回源之门

**Layer:** Integration Layer  
**Formula:** `(S1 + S0 + S7 + S8) mod 9`  
**Dependencies:** S1, S0, S7, S8  
**Range:** 0-8  
**Zero Rule:** Keep 0 as S9-00. Do not convert.  
**Code Format:** `S9-{value_padded_2_digits}`  
**Content Lookup:** `1320_S9_Return_to_Source_Content_Database_v1_EN` using key `S9-XX`  

---

# Zero Rules Summary

```json
{
  "keep_zero": [
    "S0",
    "S4",
    "S7",
    "S8",
    "S9"
  ],
  "convert_zero_to_max": {
    "S5": 44,
    "S6": 44
  },
  "not_applicable": [
    "S1",
    "S2",
    "S3_raw"
  ],
  "mapping_dependent": [
    "S3"
  ]
}
```

---

# Code Formatting Rules

- All user-visible module codes should use two-digit padding after the dash, e.g. `S5-09`, `S7-03`, `S0-00`.
- Store both `numeric_value` and `code_string` in output JSON.

---

# Report Tiers

```json
{
  "free_report": {
    "name": "Free Detailed Report",
    "modules": [
      "S0",
      "S1",
      "S2",
      "S3",
      "S4"
    ],
    "purpose": "Awareness Layer: see foundational patterns clearly."
  },
  "full_report": {
    "name": "Full Soul Reflection Report",
    "modules": [
      "S0",
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
      "S6",
      "S7"
    ],
    "purpose": "Awareness + Transformation: understand how patterns become mission, value, and sovereign action."
  },
  "advanced_report": {
    "name": "Advanced Integration Report",
    "modules": [
      "S0",
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
      "S6",
      "S7",
      "S8",
      "S9"
    ],
    "purpose": "Full S0–S9 integration: contribution and return-to-source reflection."
  }
}
```

---

# Output Schema

Top-level output should include:

- `input`
- `calculation_trace`
- `codes`
- `report_tier`
- `sections`
- `safe_language_note`
- `warnings`

---

# Worked Example

Input:

```json
{
  "birth_year": 1980,
  "birth_month": 5,
  "birth_day": 22
}
```

Note: This example assumes the official S3 vibration mapping returns S3 = 8 for S3_raw = 110.

Calculation trace:

```json
{
  "S1": "digit_sum(1980) = 1 + 9 + 8 + 0 = 18",
  "S2": "5 + 22 = 27",
  "S3_raw": "5 × 22 = 110",
  "S3": "vibration_level(110) = 8",
  "S0": "(1 + 9 + 8 + 0 + 0 + 5 + 2 + 2) mod 20 = 27 mod 20 = 7",
  "S4": "(27 + 7) mod 20 = 34 mod 20 = 14",
  "S5": "(18 + 27 + 8) mod 44 = 53 mod 44 = 9",
  "S6": "(18 + 8 + 7) mod 44 = 33 mod 44 = 33",
  "S7": "(18 + 8 + 14 + 33) mod 7 = 73 mod 7 = 3",
  "S8": "(9 + 33 + 3) mod 8 = 45 mod 8 = 5",
  "S9": "(18 + 7 + 3 + 5) mod 9 = 33 mod 9 = 6"
}
```

Final codes:

```json
{
  "S0": "S0-07",
  "S1": "S1-18",
  "S2": "S2-27",
  "S3": "S3-08",
  "S4": "S4-14",
  "S5": "S5-09",
  "S6": "S6-33",
  "S7": "S7-03",
  "S8": "S8-05",
  "S9": "S9-06"
}
```

---

# NOVA Behavior Rules

## Must Do

- Calculate in the official order.
- Validate date before calculation.
- Use the official S3 mapping table.
- Use two-digit code formatting.
- Use content database lookup for all module interpretations.
- Preserve user agency and avoid authority positioning.
- Add safe language notes in report output.

## Must Not Do

- Do not infer S3 without the official mapping table.
- Do not call S6 Money Frequency in user-visible output.
- Do not generate S5 or S6 core blocks from scratch when database content exists.
- Do not present any result as destiny, fate, fixed identity, diagnosis, prophecy, or guarantee.
- Do not rank S8–S9 as higher spiritual levels.

## Allowed Contextual Generation

- Short bridge sentences between sections.
- Brief integration summary based on already calculated and retrieved module content.
- Formatting, localization, and tone adjustment.
- Grounded reflection questions and practices, if aligned with content database safety rules.

---

# Migration Notes

- **Old:** Four-part system using S1, S3, S2, S0 as primary public structure.\n  **New:** Ten-layer S0–S9 system grouped into Awareness, Transformation, and Integration.
- **Old:** Money Frequency\n  **New:** Value & Receiving
- **Old:** S5 as a generated mission report using S1/S2/S3/S0.\n  **New:** S5 as independently calculated code using (S1 + S2 + S3) mod 44; legacy structure may inform report assembly only.
- **Old:** Full Report = mission + money + 7-day practice.\n  **New:** Full Report = S0–S7, including Soul Mission, Value & Receiving, and Soul Sovereignty.
- **Old:** No formal S8/S9 integration layer.\n  **New:** S8 Soul Contribution and S9 Return to Source form the Advanced Integration Layer.

---

# Safe Language Note

All interpretations are symbolic and reflective. They are not predictive, diagnostic, deterministic, medical, legal, financial, or religious instructions, and they do not define a fixed identity.
