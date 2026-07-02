# 1320 Web vs Mobile Detail Content Diff

Date: 2026-07-01  
Tester: Lumen  
Baseline birth date: `1982-02-03` (`S1-20 | S3-01 | S2-05 | S0-05`)  
Routes checked:
- Desktop/web: `/full-report-v2?year=1982&month=2&day=3`
- Mobile: `/mobile-report-v2?year=1982&month=2&day=3`

## Summary

Codes and titles match between desktop and mobile.

Detail content does not have parity. Mobile is currently a condensed/adapted report, not the same report content split across mobile pages. This creates a real risk that users on mobile receive less detail than desktop users.

If the product requirement is "same report content, different mobile layout," this should be treated as a content-parity fix before paid delivery.

## Suggested Work Split

1. Decide parity rule:
   - Full parity: every substantive desktop field must appear somewhere on mobile.
   - Adapted mobile: mobile may be shorter, but omissions are intentional and documented.
2. Fix foundation pages:
   - Desktop pages 00-03 vs mobile 00-05.
3. Fix core modules:
   - Desktop pages 04-08 vs mobile 06-15.
4. Fix expansion modules:
   - Desktop pages 09-14 vs mobile 16-27.
5. Fix tail pages:
   - Desktop pages 15-18 vs mobile 28-32.
6. Add a reusable resolver-level parity smoke:
   - Compare desktop resolver fields against mapped mobile resolver fields.
   - Ignore image URLs, alt text, and decorative/static label differences.

## Page Mapping

| Desktop page | Desktop meaning | Mobile page(s) | Parity status |
|---|---|---|---|
| 00 | Cover | 00, 03 | Mostly relocated, not exact |
| 01 | Opening | 01, 05 | Partial, mobile simplified |
| 02 | Dimensions | 04, 05 | Partial, mobile simplified/restructured |
| 03 | Signature | 03, 04 | Mostly aligned |
| 04 | S1 | 06, 07 | Partial |
| 05 | S3 | 08, 09 | Partial |
| 06 | S2 | 10, 11 | Partial |
| 07 | S0 | 12, 13 | Partial |
| 08 | Integrated | 14, 15 | Mostly aligned, small gaps |
| 09 | S4 | 16, 17 | Mostly aligned, small gaps |
| 10 | S5 | 18, 19 | Partial |
| 11 | S6 | 20, 21 | Major gap |
| 12 | S7 | 22, 23 | Major gap |
| 13 | S8 | 24, 25 | Major gap |
| 14 | S9 | 26, 27 | Major gap |
| 15 | Practice | 28, 29 | Major gap |
| 16 | Journal | 30 | Major gap |
| 17 | Closing | 31 | Major gap |
| 18 | Disclaimer | 02, 32 | Major gap |

## Detailed Differences

### Desktop 00 Cover -> Mobile 00 + 03

Status: mostly relocated.

Desktop cover includes the full report chrome, prepared-for details, generated metadata, core signature preview, S0-S9 module wheel, and disclaimer note. Mobile cover has brand, birth date, and report framing, while the signature is moved to mobile page 03 and disclaimer content is split across mobile pages 02 and 32.

Not a blocker if relocation is intentional, but not page-equivalent.

### Desktop 01 Opening -> Mobile 01 + 05

Status: partial.

Desktop has richer opening guidance:
- `OPENING_HOW_TO_USE`: Read Slowly, Use as a Mirror, Journal & Reflect, Apply with Awareness, Return Often.
- `OPENING_GUIDANCE_ROWS`: mirror/not sentence, free will, non-linear growth, not everything resonates, already whole.
- `OPENING_NOT_LIST`: not prediction, not medical/psychological advice, not therapy substitute, not financial/tax/business/investment advice, not legal advice, not superstition/fixed destiny.
- `OPENING_FOOTER_ITEMS`: mirror for awareness, more than any pattern, thank-you note.

Mobile pages 01 and 05 cover the spirit, but not all desktop detail.

### Desktop 02 Dimensions -> Mobile 04 + 05

Status: partial.

Desktop dimensions page has the 10-core-dimension architecture:
- System-at-a-glance copy.
- Interaction items about interconnected dimensions.
- Category groupings: Foundation, Reflection & Pattern, Purpose & Expression, Integration & Return.
- Why the map matters: clarity, alignment, empowerment.

Mobile page 04 gives an S0-S9 overview and mobile page 05 explains report structure, but the desktop architecture/categorization copy is not fully represented.

### Desktop 03 Signature -> Mobile 03 + 04

Status: mostly aligned.

Codes and titles match. Mobile page 03 has the four-part signature and explanatory "what this is / what happens next" copy. Mobile page 04 contains the S0-S9 map. No major content loss found here.

### Desktop 04 S1 -> Mobile 06 + 07

Status: partial.

Resolver audit: 15 substantive desktop strings, 3 not found in mapped mobile pages.

Missing or not represented:
- `shadowPatterns[2]`: "Compromises self from fear of losing connection"
- `expressionNodes[3].copy`: "Healing, counseling, relationship guidance, and emotional intelligence work"
- `influenceIntro`: "Your Soul Origin sets the foundation for your entire soul journey..."

Duplicate watchpoint:
- S1 reveal meaning repeats as S1 essence short description.
- Reflection prompt repeats.
- Integration quote/tip repeats.

### Desktop 05 S3 -> Mobile 08 + 09

Status: partial.

Resolver audit: 12 substantive desktop strings, 3 not found in mapped mobile pages.

Missing or not represented:
- `essenceBody`: "Early-stage energy tender soul development high sensitivity..."
- `shadowPatterns[3]`: "emotional susceptibility to external influence."
- `influenceIntro`: "Your Soul Vibration shapes how you experience the world..."

Duplicate watchpoint:
- S3 reveal meaning repeats as vibration frequency copy.
- Reflection prompt repeats.
- Integration tip appears multiple times.

### Desktop 06 S2 -> Mobile 10 + 11

Status: partial.

Resolver audit: 15 substantive desktop strings, 3 not found in mapped mobile pages.

Missing or not represented:
- `essenceSecondary`: S2 is not fixed fate or destined relationship.
- `keyInsight`: mirrors are not judgment/punishment/definition.
- `influenceIntro`: Soul Mirror influence on relationships, triggers, reflection, growth.

Duplicate watchpoint:
- Mirror line appears in multiple mobile fields.
- "Misunderstanding, blame, and emotional reactions" repeats across mobile lesson/theme fields.

### Desktop 07 S0 -> Mobile 12 + 13

Status: partial.

Resolver audit: 14 substantive desktop strings, 5 not found in mapped mobile pages.

Missing or not represented:
- `essenceBody`: Void Gate invitation to pause, soften, and see through illusion.
- `essenceSecondary`
- `keyInsight`: void is not emptiness, illusion softens and truth becomes visible.
- `keyInsightBold`: "You are already worthy before the world responds."
- `influenceIntro`: how Void Gate shapes uncertainty, silence, and identity dissolution.

Duplicate watchpoint:
- "Practice conscious breathing and separation from emotional identification" repeats across gifts, integration keys, integration practice, and integrated flow.

### Desktop 08 Integrated -> Mobile 14 + 15

Status: mostly aligned, small gaps.

Resolver audit: 22 substantive desktop strings, 3 not found in mapped mobile pages.

Missing or not represented:
- `codeRoles[0].copy`: S1 role explanation.
- `codeRoles[1].copy`: S3 role explanation.
- `codeRoles[2].copy`: S2 role explanation.

Most personalized code/title and blueprint content is present.

### Desktop 09 S4 -> Mobile 16 + 17

Status: mostly aligned, small gaps.

Resolver audit: 32 substantive desktop strings, 3 not found in mapped mobile pages.

Missing or not represented:
- `reflectionPrompts[2]`
- `reflectionPrompts[3]`: "What small step could interrupt the cycle this week?"
- `patternIntensityNote`: symbolic intensity indicator, not clinical/diagnostic/predictive.

Duplicate watchpoint:
- Practice copy repeats across mobile S4 reveal and loop page.

### Desktop 10 S5 -> Mobile 18 + 19

Status: partial.

Resolver audit: 21 substantive desktop strings, 7 not found in mapped mobile pages.

Missing or not represented:
- `missionShowsUp[0]`: receiving sudden inspiration and sensing futures not yet visible.
- `missionShowsUp[1]`: fear distortion around disconnected present steps.
- `mapNodes.left.copy`
- `mapNodes.left.fullCopy`
- `reflectionPrompts[0]`
- `lifeInfluence`
- Related mission map detail is simplified on mobile.

Duplicate watchpoint:
- One-line mission repeats as mission icon description.
- Practice/support copy repeats.

### Desktop 11 S6 -> Mobile 20 + 21

Status: major gap.

Resolver audit: 18 substantive desktop strings, 14 not found in mapped mobile pages.

Missing or not represented:
- `essenceParagraphs[1]`: receiving from alignment rather than pressure.
- `receivingShowsUp[0]`
- `receivingShowsUp[1]`
- `receivingShowsUp[2]`
- `mapNodes.right.copy`
- `mapNodes.right.fullCopy`
- `mapNodes.bottom.copy`
- `mapNodes.bottom.fullCopy`
- `mapNodes.left.fullCopy`
- Several desktop map-node details around value flow, mature expression, and receiving field.

Mobile S6 appears to use more generic value/receiving copy rather than the full desktop S6 detail.

### Desktop 12 S7 -> Mobile 22 + 23

Status: major gap.

Resolver audit: 21 substantive desktop strings, 18 not found in mapped mobile pages.

Missing or not represented:
- `essenceParagraphs[1]`: trusting perception, intuition, choice without perfect certainty.
- `sovereigntyShowsUp[0]`
- `sovereigntyShowsUp[1]`
- `sovereigntyShowsUp[2]`
- `mapNodes.right.copy`
- `mapNodes.right.fullCopy`
- `mapNodes.bottom.copy`
- `mapNodes.bottom.fullCopy`
- `mapNodes.left.copy/fullCopy`
- Several reflection and life-influence details.

Mobile S7 keeps the high-level sovereignty framing but loses much of the desktop personalized/detail layer.

### Desktop 13 S8 -> Mobile 24 + 25

Status: major gap.

Resolver audit: 22 substantive desktop strings, 18 not found in mapped mobile pages.

Missing or not represented:
- `essenceParagraphs[1]`: meeting endings, transitions, and renewal without turning away.
- `contributionShowsUp[0]`
- `contributionShowsUp[1]`
- `contributionShowsUp[2]`
- `mapNodes.right.copy`
- `mapNodes.right.fullCopy`
- `mapNodes.bottom.copy`
- `mapNodes.bottom.fullCopy`
- `mapNodes.left.copy/fullCopy`
- Several reflection and life-influence details.

Duplicate watchpoint:
- Contribution essence repeats across mobile page 24 and page 25.

### Desktop 14 S9 -> Mobile 26 + 27

Status: major gap.

Resolver audit: 20 substantive desktop strings, 13 not found in mapped mobile pages.

Missing or not represented:
- `essenceParagraphs[1]`: reality is not an enemy of love.
- `returnShowsUp[0]`
- `returnShowsUp[1]`
- `returnShowsUp[2]`
- `mapNodes.right.copy`
- `mapNodes.right.fullCopy`
- `mapNodes.left.copy`
- `mapNodes.left.fullCopy`
- Several return-map and life-influence details.

Duplicate watchpoint:
- Return essence repeats across mobile page 26 and page 27.

### Desktop 15 Practice -> Mobile 28 + 29

Status: major gap.

Resolver audit: 38 substantive desktop strings, 38 not found in mapped mobile pages.

Mobile practice is a generic 7-day practice journey. Desktop practice contains personalized/day-specific content including:
- `purpose`
- `openingReminder`
- `days[n].focus`
- `days[n].practice`
- `days[n].reflection`

The mobile pages do not carry the desktop personalized practice day fields. This is the largest parity issue after S6-S9.

### Desktop 16 Journal -> Mobile 30

Status: major gap.

Resolver audit: 17 substantive desktop strings, 17 not found in mapped mobile page.

Mobile journal is a simplified reflection page. Desktop journal contains:
- `whyReflectionCopy`
- multiple journal guidelines
- personalized `promptCards[n].prompt` for S1/S2/S3/S4/etc.

Mobile currently shows one generic prompt instead of the desktop personalized prompt-card set.

### Desktop 17 Closing -> Mobile 31

Status: major gap.

Resolver audit: 19 substantive desktop strings, 19 not found in mapped mobile page.

Mobile closing is a simplified completion page. Desktop closing contains:
- `shownCopy[0]`
- `shownCopy[1]`
- `rememberItems[0..4]`
- `beforeForwardCopy`
- seal node copy
- fuller completion/remembrance language.

### Desktop 18 Disclaimer -> Mobile 02 + 32

Status: major gap.

Resolver audit: 23 substantive desktop strings, 22 not found in mapped mobile pages.

Mobile has a short disclaimer snapshot and final disclaimer, but desktop has fuller legal/interpretation boundaries:
- `interpretationLead`
- `interpretationLeadTail`
- `interpretationSecond`
- `interpretationItems[0..4]`
- broader fixed-identity/fate/life-decision caveats.

This needs a product/legal decision: either mobile can use a shorter disclaimer, or it must include the fuller desktop disclaimer content.

## Duplicate Watchpoints

These are not automatically bugs, because split mobile pages often repeat a key idea intentionally. But they should be reviewed for accidental duplication:

- S1: reveal meaning, reflection prompt, and integration tip repeat across pages 06-07.
- S3: reveal meaning, reflection prompt, and integration tip repeat across pages 08-09; one integration line appears multiple times.
- S2: mirror line and "Misunderstanding, blame, and emotional reactions" repeat on page 11.
- S0: breathing/separation practice repeats across multiple fields/pages.
- S4: practice copy repeats across pages 16-17.
- S5: one-line mission repeats as mission icon description; practice/support copy repeats.
- S8: contribution essence repeats across pages 24-25.
- S9: return essence repeats across pages 26-27.

## Proposed Fix Strategy

Best technical direction: make mobile pages consume the same shared resolved content as desktop, then decide at the component layer where each field appears.

Recommended implementation sequence:

1. Create a parity map object:
   - desktop page id
   - mobile page ids
   - required shared fields
   - intentionally omitted fields, if any
2. Fix tail pages first:
   - Practice, Journal, Closing, Disclaimer have the largest gaps and clearest expected content.
3. Fix S6-S9 next:
   - These are the biggest module-detail gaps.
4. Fix smaller S1-S5/S0/S4/integrated gaps.
5. Add a parity smoke test:
   - Fail if required desktop substantive fields are not present in mapped mobile resolver output.
   - Ignore image URLs, alt text, generated metadata, and decorative labels.

## Verdict

Current state is not content-equivalent.

Use "PASS" only if mobile is intentionally a condensed report.

Use "FAIL - content parity" if paid mobile must include the same substantive report detail as desktop.
