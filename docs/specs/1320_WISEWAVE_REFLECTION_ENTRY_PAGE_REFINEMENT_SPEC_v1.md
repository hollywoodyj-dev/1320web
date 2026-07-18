# Page 18 · Wisewave Reflection Entry Page Refinement Spec v1.0

1320 Soulcode Website UI / Reflect With Your Soul Blueprint / Wisewave Entry Flow  
Page: Wisewave Reflection (`/reflect`)  
Target Site: 1320soulcode.com  
Design Direction: Quiet · Reflective · Low-Presence · Spacious · Safe · Blueprint-Connected  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

Wisewave Reflection should begin with the user's lived question, not with form completion.

## Primary fixes

1. Reflection prompt is the primary entry (before connect fields)  
2. Logged-in / report-context users are not asked for name, email, or birth date  
3. Anonymous: optional connect after prompt (Month / Day / Year + email); Generate My Code / Sign In  
4. Replace “S1–S0” with Soul Blueprint / S1 → S3 → S2 → S0 framing  
5. Personal Integration Session stays secondary  
6. Compact footer + mantra: YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.

## QA

```bash
npm run qa:reflect-entry-refinement-v1
```
