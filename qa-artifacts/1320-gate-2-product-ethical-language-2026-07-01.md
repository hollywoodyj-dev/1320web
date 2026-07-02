# 1320 Gate 2 QA - Product and Ethical Language

Date: 2026-07-01  
Tester: Lumen  
Baseline birth date: `1982-02-03`  
Scope: Product positioning, ethical boundaries, emotional calibration, reflection/practice language, and release-facing copy quality.  
Out of scope: calculation truth already covered by Gate 0; conversion flow and checkout readiness already covered by Gate 1; full red-team conversation safety is Gate 4.

## Verdict

PASS WITH WATCHPOINTS.

The product is directionally aligned with the 1320 ethical frame. The live homepage and free result repeatedly position 1320 as symbolic reflection, not prediction, fate, diagnosis, or professional advice. The strongest release-facing line is:

`A symbolic tool for self-awareness and reflection - not prediction or professional advice. You remain the authority of your own path.`

However, Gate 2 is not clean enough for a public paid launch without wording cleanup. Several visible labels still carry older or riskier framing:

- `Who You Attract`
- `spiritual maturity`
- `Money Frequency`
- `money patterns`
- `Raw Value`

These do not currently create a hard ethical fail because the surrounding boundary language is strong. They are still the exact kind of wording drift this gate is meant to catch.

## Surfaces Checked

| Surface | Method | Result |
|---|---|---|
| Homepage `/` | Browser rendered text extraction | PASS WITH WATCHPOINTS |
| Free result `/result?year=1982&month=2&day=3` | Browser rendered text extraction | PASS WITH MAJOR COPY NOTES |
| Current static copy modules | Source scan of `lib/homepage-content.ts`, `lib/report/report-static-content.ts`, `lib/full-report-content.ts`, `lib/about-1320-content.ts`, `lib/form-consent.ts` | PASS WITH WATCHPOINTS |
| Source/database safety notes | Targeted `rg` scan for prediction, fate, diagnosis, ranking, S6, S2, and raw value terms | PASS for safety intent; watchpoint for user-facing old labels |

## Strong Pass Evidence

### 1. The Core Product Boundary Is Clear

Observed live copy repeatedly says:

- `Not your fate. Your mirror.`
- `This is a first-layer reflection. Your code is a mirror, not fixed destiny.`
- `Share your code as a mirror for conversation - not as a fixed identity.`
- `Your code is not a sentence. It is a mirror.`
- `This is not a prediction. It is a mirror for awareness, reflection, and conscious choice.`

This is aligned with the QA Addendum:

- symbolic self-reflection system
- awareness framework
- pattern recognition tool
- language for inner reflection

### 2. Consent and Footer Copy Preserve Agency

Observed consent copy:

`I understand 1320 is a symbolic self-awareness tool - not prediction, diagnosis, or professional advice.`

Observed footer copy:

`A symbolic tool for self-awareness and reflection - not prediction or professional advice. You remain the authority of your own path.`

This directly supports the required ethical frame: the system is a mirror, not an authority.

### 3. About and Full Report Copy Contain Explicit Guardrails

Current source copy includes:

- `Not fortune-telling or guaranteed prediction`
- `Not a fixed identity box or spiritual hierarchy`
- `Not medical, psychological, legal, or financial advice`
- `Not a replacement for therapy, diagnosis, or professional care`
- `Not an external authority over your life choices`

Full Report copy also says:

- `not prediction, fate, or professional advice`
- `symbolic orientation, not a fixed career command`
- `not investment, tax, or financial planning advice`

### 4. Reflection and Practice Language Is Mostly Healthy

Observed practice/reflection language generally invites observation rather than conclusion:

- `What is this showing me about myself?`
- `What is one small action I can take from awareness?`
- `Choose one small pattern to soften rather than force.`
- `Integration grows through awareness, not pressure.`

This is aligned with the requested reflection/practice QA: open-ended, grounded, repeatable, and agency-preserving.

## Watchpoints To Fix

### 1. `Who You Attract` Sounds Too Deterministic

Severity: Major wording watchpoint  
Surface: Homepage mini-labels, S2 pillar, free result S2 card, About page segment copy

Observed:

`Who You Attract`

Issue:

This phrase can sound like the system predicts who will enter the user's life, especially in relationship contexts. It is partially mitigated by S2 disclaimers, but it still leans toward attraction/destiny language.

Recommendation:

Use one of these instead:

- `What Relationships Mirror`
- `How Relationships Reflect You`
- `Your Relationship Mirror`
- `Relational Mirror Patterns`

Best fit for current product language:

`What Relationships Mirror`

### 2. `spiritual maturity` Can Sound Like Ranking

Severity: Major wording watchpoint  
Surface: Homepage S3 pillar

Observed:

`Your energy expression, strength, spiritual maturity, and frequency layer.`

Issue:

`spiritual maturity` can imply higher/lower spiritual rank, which the QA Addendum explicitly rejects. The FAQ already says S3 is not a score or ranking, so this homepage phrase should not introduce ranking risk.

Recommendation:

Replace with:

`Your energy expression, sensitivity, growth rhythm, and frequency pattern.`

### 3. `Money Frequency` and `money patterns` Are Older Riskier Labels

Severity: Major wording watchpoint  
Surfaces: Homepage Full Report preview, free result upsell, Full Report static copy

Observed:

- `Money Frequency`
- `money patterns`
- `S6 Money Frequency module (self-awareness only)`

Issue:

The source specs say S6 should be translated into `Value & Receiving` language and not presented as financial promise, wealth destiny, or money advice. Current copy includes disclaimers, but the label itself still pulls the experience toward money/wealth expectation.

Recommendation:

Use:

- `Value & Receiving`
- `Worth, Receiving, and Resource Flow`
- `S6 Value & Receiving`

Suggested replacement for upsell:

`The Full Report shows how your code moves through identity, relationships, shadows, mission, and value/receiving patterns.`

### 4. `Raw Value` Should Not Appear In User-Facing Free Report

Severity: Major trust and ethical calibration issue  
Surface: Free result S3 card

Observed:

`Raw Value` -> `6`

Issue:

This looks like a score. Even if technically accurate, it can create ranking/comparison confusion and contradict the FAQ answer that S3 is not higher/lower.

Recommendation:

Remove from user-facing Free Report, or hide behind a debug-only/developer-only panel.

### 5. Some S0/S4/S2 Labels Are Emotionally Heavy

Severity: Minor to moderate tone watchpoint  
Surfaces: Result and full report modules

Observed pattern language:

- `Shadow Frequency`
- `Karmic Loop`
- `Void Challenge`
- `Emotional Illusion`

Issue:

These terms are not inherently unsafe, and several are central to the product's symbolic language. The watchpoint is emotional calibration: if overused without soft framing, they can feel fear-based or fixed.

Recommendation:

Keep them only when immediately framed as observable patterns, not identity. Prefer supporting lines like:

- `This is a pattern to observe, not a flaw.`
- `This is an invitation, not a verdict.`

## Gate 2 Release Criteria

| Criterion | Result | Notes |
|---|---|---|
| Avoids fortune-telling | PASS | Strong repeated boundary language. |
| Avoids deterministic prediction | PASS | No direct future prediction found in checked live surfaces. |
| Avoids fixed identity framing | PASS WITH WATCHPOINTS | Strong disclaimers, but `Who You Attract` and `Raw Value` weaken the frame. |
| Avoids spiritual ranking | PASS WITH WATCHPOINT | Replace `spiritual maturity`. |
| Avoids diagnosis/professional advice | PASS | Consent, footer, About, Full Report, and S6 copy include clear disclaimers. |
| Preserves user agency | PASS | Multiple lines state user remains chooser/authority. |
| Reflection questions are open-ended | PASS | Mostly observational and self-reflective. |
| Practice language is grounded | PASS | Simple, ordinary-life, non-mystical practices. |
| Tone is clear/warm/grounded | PASS WITH NOTES | Boundary tone is good; integrated-summary grammar from Gate 1 still hurts trust. |

## Required Copy Cleanup Before Public Paid Launch

Minimum recommended edits:

1. Replace S2 user-facing label `Who You Attract` with `What Relationships Mirror`.
2. Replace homepage S3 phrase `spiritual maturity` with `growth rhythm` or `expression rhythm`.
3. Replace public `Money Frequency` labels with `Value & Receiving`, especially in upsell/full-report copy.
4. Remove `Raw Value` from the Free Report user UI.
5. Fix Gate 1 grammar issues in the integrated summary, because ethical trust depends on language feeling human and careful.

## Final Gate 2 Decision

Gate 2 passes for internal MVP review because the product consistently underclaims and preserves user agency.

Gate 2 is not yet clean for public paid launch. The system should revise the watchpoint labels above before release so the product experience stays aligned with:

`The purpose of 1320 is not to give people answers. It is to help people ask better questions.`
