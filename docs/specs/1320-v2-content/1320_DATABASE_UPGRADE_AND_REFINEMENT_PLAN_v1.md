# 1320 Content Database Upgrade & Refinement Plan v1.0

**Purpose:** Convert the current S0–S9 database into a commercial-grade report content system.  
**Target outcome:** Paid Full Report output should feel premium, coherent, reflective, and commercially trustworthy.  
**Implementation owner:** Nova  
**Content governance:** Tree / 信伊咲  
**QA owner:** Lumen

---

# 1. Upgrade Principle

Do not treat the current database as final user-facing copy.

Treat it as the **Symbolic Source Layer**.

Add a new layer above it:

```text
Symbolic Source Layer
↓
Commercial Report Output Layer
↓
Rendered Full Report / Mobile Report / PDF / API
```

This preserves all symbolic intelligence while upgrading the reading experience.

---

# 2. New Required Entry Structure

Every S0–S9 entry should eventually support this normalized output structure:

```json
{
  "code": "S1-18",
  "module": "S1",
  "display_name": "The Transformer",
  "commercial_report_blocks": {
    "opening_essence": "",
    "how_this_may_show_up": "",
    "core_gift": "",
    "growth_edge": "",
    "integration_key": "",
    "one_week_practice": "",
    "wisewave_reflection": ""
  },
  "governance": {
    "non_predictive": true,
    "non_diagnostic": true,
    "non_ranking": true,
    "user_agency_required": true
  }
}
```

---

# 3. Commercial Writing Standard

## 3.1 Use Direct User Language

Avoid:

```text
The user may experience...
This module reflects...
This code indicates...
```

Use:

```text
You may recognize this pattern...
This part of your blueprint may show up as...
At its best, this pattern helps you...
```

## 3.2 Avoid Fixed Identity

Avoid:

```text
You are...
You always...
Your destiny is...
```

Use:

```text
You may carry...
This may appear as...
This can invite...
```

## 3.3 Keep the Tone Premium

The tone should be:

```text
clear
warm
precise
reflective
grounded
emotionally intelligent
spiritually spacious
non-authoritative
```

Avoid:

```text
generic
over-mystical
over-promising
grandiose
therapeutic diagnosis
fortune-telling
```

---

# 4. Module-Specific Upgrade Directions

## S1 · Soul Origin

Current issue:

- Strong archetype set, but output is too templated.
- Some entries include rank-like language.
- Some mission fields sound like career prescription.

Upgrade direction:

- Present S1 as essence recognition, not fixed identity.
- Use warmer opening paragraphs.
- Keep archetype names.
- Convert career-like fields into “natural fields of expression.”

Recommended blocks:

```text
Your Origin Essence
How This May Show Up
Natural Gifts
Growth Edge
Integration Key
Wisewave Reflection
```

---

## S3 · Soul Vibration

Current issue:

- Most entries use generic “vibration tier” language.
- Some language risks spiritual ranking.
- Chinese fields need refinement.

Upgrade direction:

- Present S3 as expression rhythm, not spiritual level.
- Avoid high/low hierarchy.
- Clarify raw value vs tier code.

Recommended blocks:

```text
Your Expression Rhythm
How Your Energy Moves
Natural Strength
Growth Edge
Stabilizing Practice
```

---

## S2 · Soul Mirror

Current issue:

- Some relationship language can feel predictive or fate-based.
- “Karmic loop” may need softer wording in public report.

Upgrade direction:

- Present S2 as relational mirror, not compatibility or attraction prediction.
- Replace “karmic loop” public label with “recurring relational loop” unless governance allows karmic language.

Recommended blocks:

```text
Your Relationship Mirror
What This May Reflect
Recurring Relational Loop
Lesson in Connection
Integration Practice
```

---

## S0 · Void Gate

Current issue:

- Strong concept, but repeated phrasing and double punctuation.
- “illusion” can feel confrontational if not softened.

Upgrade direction:

- Present S0 as a threshold of release.
- Use “protective belief” or “inner illusion” carefully.
- Make return path compassionate.

Recommended blocks:

```text
Your Void Gate
The Protective Belief
What It May Cost
The Hidden Power
Path of Return
```

---

## S4 · Core Shadow Pattern

Current issue:

- Strongest current module.
- Needs only light normalization.

Upgrade direction:

- Preserve nuance.
- Add commercial output blocks without losing the existing writing quality.
- Ensure S4 activation is not presented as a flaw.

---

## S5 · Soul Mission

Current issue:

- Good output block structure.
- Some fields mention career-like areas.

Upgrade direction:

- Keep existing seven-block structure.
- Reframe “mission fields” as natural expressions, not career instructions.
- Preserve non-deterministic boundaries.

---

## S6 · Value & Receiving

Current issue:

- Correct new direction, but legacy money/wealth language remains.
- Chinese fields still lean toward “wealth.”

Upgrade direction:

- Public-facing copy must use Value & Receiving.
- Money can appear only as one possible resource theme, not the central promise.
- Add receiving, reciprocity, recognition, support, visibility, and value language.

---

## S7 · Soul Sovereignty

Current issue:

- Structure is good but thin.
- Chinese translation incomplete.

Upgrade direction:

- Add report-ready blocks.
- Keep qualitative alignment states.
- Avoid percentages and performance framing.

---

## S8 · Soul Contribution

Current issue:

- Structure is clear but thin.
- Needs fuller report-level prose.

Upgrade direction:

- Contribution must not mean usefulness, public success, or productivity.
- Emphasize natural impact and ethical contribution.

---

## S9 · Return to Source

Current issue:

- Strong concept but needs governance around spiritual superiority.

Upgrade direction:

- Return to Source must not imply enlightenment rank or final truth.
- Present it as return to presence, humility, wholeness, and non-attachment.

---

# 5. Payload Upgrade Requirements

`content-payload.json` and `final-report-payload.json` must be updated.

Required changes:

```text
1. Replace S6 title “Personal Power Wealth” with “Value & Receiving”.
2. Hydrate S7, S8, S9 with titles, subtitles, and display names.
3. Fill integrated_blueprint or prevent rendering blank sections.
4. Fill integration_practice.days or prevent rendering blank practice pages.
5. Label S3 raw value and S3 code separately.
6. Confirm S4/S5/S6 segmentCode logic.
```

---

# 6. QA Rules

Lumen should check:

```text
[ ] No prediction language
[ ] No diagnosis language
[ ] No spiritual ranking
[ ] No S6 wealth/money promise
[ ] No “the user” in user-facing rendered copy
[ ] No blank payload sections
[ ] No inconsistent S3 raw/code display
[ ] S1 → S3 → S2 → S0 order preserved
[ ] S4 activation not framed as personal flaw
[ ] S7 not displayed as percentage/rank
[ ] S8 not displayed as usefulness/public achievement
[ ] S9 not displayed as enlightenment/superiority
```

---

# 7. Recommended Implementation Phases

## Phase 1 — Audit + Schema Normalization

- Add `commercial_report_blocks` schema.
- Preserve all original fields.
- Generate missing module display data.

## Phase 2 — Rewrite S0–S3

These are the highest priority because they shape first impression.

## Phase 3 — Normalize S4–S6

S4/S5/S6 are stronger but need consistency and legacy cleanup.

## Phase 4 — Expand S7–S9

S7–S9 need fuller report-level prose and bilingual completion.

## Phase 5 — Render QA

Test at least 5 sample birth dates and review the final generated report experience.

---

# 8. Final Target

The final commercial report should not feel like a field-by-field database output.

It should feel like a coherent reflective reading:

```text
Your blueprint is being introduced.
Your pattern is being named.
Your lived expression is being reflected.
Your agency is being returned.
Your integration path is being made practical.
```
