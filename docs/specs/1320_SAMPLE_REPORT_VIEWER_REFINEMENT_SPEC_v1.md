# Page 10 · Sample Report Viewer Refinement Spec v1.0

1320 Soulcode Website UI / Report Reading Experience Refinement  
Page: Sample Report Viewer / Report Reading Experience (`/full-report-v2`)  
Target Site: 1320soulcode.com  
Design Direction: Sacred · Premium · Guided · Spacious · Report-like · Preview-aware  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

The user should feel guided through the sample, not left to scroll through a long report stack.

Final principle: this page should feel like opening a sacred preview book — not scrolling through a long screenshot of the whole temple.

## Viewer structure

1. Top Intro Bar  
2. Sticky / Floating Report Navigation  
3. Report Page Stack (chapter-grouped)  
4. Locked Preview Section (compact)  
5. Final Boundary + CTA  

## Chapters

01 Opening — Cover, Four Foundation Layers  
02 Foundation Preview — S1 → S3 → S2 → S0  
03 Integrated Mirror  
04 Full Report Preview — locked S4–S9, practice, journal  
05 Closing Boundary — Reflection, Not Instruction  

## Renderer rule

```tsx
<ReportRenderer reportType="sample" surface="web" data={canonicalSampleReport} />
```

Sample = Full Report Renderer + Preview Mode + Locked Blocks.  
Do not create a separate sample visual system.

## Acceptance

- Sample / Preview Mode clear within 5 seconds  
- Guided navigation with reading progress  
- Quality felt without full paid content  
- Same renderer language as Full / Mobile / PDF  
