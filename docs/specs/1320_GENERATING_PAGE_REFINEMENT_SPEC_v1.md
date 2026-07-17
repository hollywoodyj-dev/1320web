# Page 05 · Generating / Opening Blueprint Page Refinement Spec v1.0

1320 Soulcode Website UI / Copy / Visual Density Refinement  
Page: Generating / Code Forming / Opening Blueprint  
Target Site: 1320soulcode.com  
Design Direction: Sacred · Quiet · Luminous · Reassuring · Minimal · Ceremonial  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

A generating page should reduce anxiety, not increase cognitive load.  
This page should feel like the moment before the mirror opens — not another explanation page.

## Page states

```ts
type BlueprintGenerationState = "loading" | "complete" | "error";
```

## Required section order

01 Top bar (logo + Secured & Private)  
02 Hero  
03 Central mapping visual  
04 Current step  
05 Progress cards  
06 Boundary message  
07 CTA  
08 Privacy line  

## Key rules

- Keep central 1320 sacred geometry
- Foundation order: Origin → Vibration → Mirror → Void (S1 → S3 → S2 → S0)
- CTA disabled until complete: “Forming Your Blueprint…”
- After complete: “View My Result”
- Privacy: do not claim “never stored” unless verified
- Progress sequence is symbolic / UX only
- Copy reduction target: ~25–35%

## Full copy

See Wisewave source message / `lib/generating-content.ts` after implementation.
