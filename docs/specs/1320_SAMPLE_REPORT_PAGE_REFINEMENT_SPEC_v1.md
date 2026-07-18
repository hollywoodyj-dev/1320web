# Page 09 · Sample Report Page Refinement Spec v1.0

1320 Soulcode Website UI / Copy / Visual Density Refinement  
Page: Sample Report / Sample Report Viewer (`/full-report-v2`)  
Target Site: 1320soulcode.com  
Design Direction: Sacred · Premium · Preview-Based · Spacious · Report-Like · Conversion-Aware  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

Sample Report should reveal the quality of the Full Report, while preserving the value of the full paid experience.

It should feel like a beautiful preview of the Full Report experience — enough to feel the depth, not so much that it becomes the full product.

Final page principle: **Sample Report should open the doorway, not give away the whole temple.**

## Page role (three questions)

1. What does a 1320 report feel like?  
2. What kind of content will I receive?  
3. Why should I unlock the full report?

## Implementation model

```tsx
<ReportRenderer
  reportType="sample"
  surface="web"
  data={canonicalSampleReport}
/>
```

Do not create a separate Sample Report layout system.  
Sample = Full Report Renderer + Preview Mode + Locked Blocks + Sample Data.

## Required order

Foundation and segment order must remain: **S1 → S3 → S2 → S0**

## Preview / locking

Sample may show: Cover, Foundation overview, S1/S3/S2/S0 preview pages, Integrated mirror preview, locked S4–S9, locked 7-day practice, locked journal, final boundary.

Sample should not fully expose: complete commercial block sets, full integration practice, complete journal pages, entitlement-only pages, full PDF as paid report.

## CTA rules

- Intro primary: Unlock My Full Report  
- Intro secondary: Generate My Code  
- Final primary: Generate My Code  
- Final secondary: Unlock Full Report  
- Max one dominant gold CTA per viewport  
- Locked blocks may include small Unlock CTAs  

## Lumen watchpoints

- [ ] Uses Unified Report Renderer / shared components  
- [ ] Clearly labeled Sample / Preview Mode  
- [ ] S1 → S3 → S2 → S0 preserved  
- [ ] S2 = relational mirror (not “who you attract”)  
- [ ] S3 not framed as spiritual maturity / ranking  
- [ ] S0 not framed as fate / collapse / diagnosis  
- [ ] S4–S9 locked / preview-only  
- [ ] Full commercial blocks not fully exposed  
- [ ] Unlock CTA clear but not aggressive  
- [ ] Mobile readable, no horizontal overflow  
- [ ] Final boundary: symbolic mirror, not prediction, not diagnosis, not fixed identity, user remains authority  

## Acceptance

A user can feel the quality and depth of the Full Report without receiving the full paid report.  
The page feels like a sacred preview, not a dense unlocked report.  
Next step is clear: Generate my own code or unlock the full report.
