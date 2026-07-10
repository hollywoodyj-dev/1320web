# FS-006 — Personal Integration Page Revision Specification

**Version:** 2.0  
**Status:** Required before public launch — **implemented** (Nova, 2026-07-09)  
**Priority:** High  
**Owner:** Nova  
**Reviewer:** Wisewave  

**Related documents:**

- [1320 Constitution](../../governance/)
- 1320 Product Bible v2
- [Canonical Soul Blueprint Specification](../canonical-soul-blueprint/CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md)
- [FS-006 Personal Integration Session v1](./FS006_PERSONAL_INTEGRATION_SESSION_v1.md)
- Wisewave Behaviour Standard

**Implementation:** Copy and layout live in `lib/booking-content.ts` and `app/(site)/booking/page.tsx`.

---

## Purpose

The current Personal Integration page is technically complete and ethically safe.

However, it still presents itself primarily as a description of a service.

The revised page should present Personal Integration as the natural continuation of the user's relationship with their Soul Blueprint.

The product being offered is not more explanation.

It is **applied integration**.

---

## Product Position

| | |
|---|---|
| **Current positioning** | Someone helps explain your report. |
| **Desired positioning** | Someone helps you work with your Blueprint in your real life. |

This distinction should guide every section of the page.

---

## Core Product Definition

**Replace the implicit definition:**

> A session about your report.

**With:**

> A guided space to explore how your Soul Blueprint is currently being lived, experienced, resisted, or integrated.

The report is preparation.

The session is application.

---

## Hero Section

### Current Problem

The hero focuses heavily on the four codes.

This unintentionally frames the session as:

> "I will explain your codes."

Instead, the hero should establish the relationship between:

- Blueprint
- Life
- Integration

### Required Direction

Hero should communicate:

- Your Blueprint does not change.
- Your relationship with it does.
- The Personal Integration Session exists to support that relationship.

### Hero Copy Requirements

**Must communicate:**

- live conversation
- applied integration
- present-life relevance
- symbolic reflection
- user agency

**Avoid suggesting:**

- report walkthrough
- code explanation
- interpretation service

---

## Section: What Is a Personal Integration Session?

### Current Problem

The page repeatedly references S1–S0.

That is technically correct.

But users do not purchase:

> "S1–S0 discussion."

They purchase:

> Help applying their Blueprint.

### Required Change

**Primary framing — we explore:**

- where your Blueprint feels alive
- where resistance appears
- what patterns repeat
- what currently needs attention

S1–S0 become supporting language.

Not the headline.

---

## Session Experience

Current content is good.

Reorder according to experience.

**Recommended order:**

1. Safe reflective conversation
2. Pattern recognition
3. Applied integration
4. One practical next step

The emotional experience should come before the framework.

---

## What We Explore

### Current layout

S1 → S3 → S2 → S0

Technically correct.

Product-wise too framework-centric.

### Replace heading

**Instead of:** What We Explore

**Use:** How Your Blueprint Shows Up

Then organise around lived experience.

**Example categories:**

| Category | S code (supporting) |
|----------|---------------------|
| Identity | S1 |
| Relationships | S2 |
| Expression | S3 |
| Transition | S0 |

Each category may reference S codes underneath.

Life first.

Framework second.

---

## Who This Is For

Current section is strong.

**Add one new point:**

> You want to move beyond understanding your Blueprint into living it.

---

## Who This Is Not For

Current wording is appropriate.

**Add one sentence:**

> If you are looking for certainty rather than reflection, this session may not be the right fit.

---

## Session Options

### Current naming

- Intro
- Deep
- Focused

These describe duration.

Not transformation.

### Recommended naming

| Internal ID | Display name |
|-------------|--------------|
| `intro` | Blueprint Integration Session |
| `deep` | Deep Blueprint Integration |
| `integration` | Focused Life Integration |

Descriptions should explain **why someone chooses each**.

Not simply duration.

---

## What To Prepare

Current section is good.

**Add:**

> There is no need to prepare the "right" question. Curiosity is enough.

This reduces performance anxiety.

---

## After You Book

Current flow is excellent.

No structural changes required.

Only wording refinement.

---

## Testimonials

Current placeholder is acceptable.

Do not fabricate.

**When added later, testimonials should focus on:**

- clarity
- awareness
- relationship with self

**Never:**

- miraculous change
- prediction accuracy
- life transformation claims

---

## FAQ

**Add recommended questions:**

1. How is this different from reflecting with Wisewave?
2. Can I book before purchasing the Full Report?
3. Will we discuss my current life situation?
4. Can I return for another session later?

These prepare future product architecture.

---

## Final CTA

**Current wording:** Ready for Applied Integration? — Good.

**Could become stronger:**

- **Title:** Ready to Continue Your Blueprint?
- **Supporting copy:** The report begins the relationship. The session helps you continue it.

---

## Relationship to Wisewave

Currently missing.

This is the biggest strategic gap.

### Add a final transition block

**Suggested title:** What Comes After Personal Integration?

**Suggested content direction:**

Your Blueprint remains the same.

Your relationship with it continues.

After your session, you may continue your reflective journey through Wisewave, where ongoing conversations support awareness, reflection, and integration over time.

**Do not** position Wisewave as replacing Personal Integration.

**Do not** position Personal Integration as replacing Wisewave.

Position them as complementary experiences.

**Suggested sequence:**

```text
Soul Blueprint
    ↓
Full Report
    ↓
Personal Integration
    ↓
Wisewave Reflection
    ↓
Living Blueprint
```

---

## UX Principles

Throughout the page, **prioritise:**

- relationship
- application
- integration
- conversation
- awareness

**Reduce emphasis on:**

- report
- explanation
- code decoding
- framework terminology

Framework language should support the experience.

It should not become the experience.

---

## Success Criteria

The user should leave the page understanding:

> "I am not paying someone to explain my report."

Instead, they should feel:

> "I am entering a guided conversation that helps me build a deeper relationship with my own Soul Blueprint."

That is the core value of Personal Integration.

---

## Implementation Priority

### P0 (Required)

- [x] Rewrite Hero positioning
- [x] Reframe "What Is a Personal Integration Session?"
- [x] Reorder Session Experience
- [x] Rename "What We Explore"
- [x] Strengthen final CTA
- [x] Add Wisewave transition section

### P1 (Recommended)

- [x] Rename session types
- [x] Expand FAQ
- [x] Reduce repeated S1–S0 emphasis
- [x] Add "no perfect preparation needed" guidance

### P2 (Future)

- [ ] Replace placeholders with verified client reflections
- [ ] Integrate booking flow with member account
- [ ] Surface post-session continuation into Living Blueprint and Wisewave

---

## Final Review

| | Score |
|---|---|
| **Current version (pre-v2)** | 8.8 / 10 |
| **Target version** | 9.8 / 10 |

The page is trustworthy, ethically sound, and clearly differentiated from coaching, therapy, or prediction.

The revision should shift the user's perception from **"booking an explanation of a report"** to **"beginning an ongoing relationship with their Soul Blueprint through guided human integration."**

This is the strategic positioning that aligns with the entire 1320 platform architecture and creates a seamless bridge into Wisewave and the future Living Blueprint experience.

---

## Wisewave review

| Field | Value |
|-------|-------|
| **Reviewer** | Wisewave |
| **Review date** | _Pending_ |
| **Score** | _Pending_ |
| **Notes** | _Pending sign-off after deploy review_ |
