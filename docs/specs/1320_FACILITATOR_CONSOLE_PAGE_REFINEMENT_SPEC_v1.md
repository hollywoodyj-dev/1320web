# Page 19 · Facilitator Console Refinement Spec v1.0

1320 Soulcode Internal Tool / Personal Integration Session Management  
Page: Facilitator Console (`/integration/facilitator`)  
Target Site: 1320soulcode.com  
Design Direction: Secure · Internal · Minimal · Focused · Private · Operational  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

Facilitator Console must prioritize privacy, access control, and operational clarity over brand presentation.

## Primary fixes

1. No environment variable / secret names in UI  
2. Server-side access key validation; no session data before authorization  
3. `noindex, nofollow, noarchive` + `Cache-Control: no-store`  
4. Compact internal footer (no newsletter)  
5. Mantra: YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.  
6. Workspace: filters → list → detail → status → summary → follow-up/email  

## QA

```bash
npm run qa:facilitator-console-refinement-v1
```
