# Page 16 · Create Account Page Refinement Spec v1.0

1320 Soulcode Website UI / Sign-Up / Account Creation Flow Refinement  
Page: Create Account / Sign Up (`/signup`)  
Target Site: 1320soulcode.com  
Design Direction: Quiet · Secure · Minimal · Trustworthy · Low-Friction  
Owner: Tree / 信伊咲  
Implementation: Nova  
QA: Lumen  

## Core principle

Create Account should feel like receiving a key — not filling out a heavy registration form.

## Primary fixes

1. Compact auth footer (shared with Sign In) — no newsletter / marketing grid  
2. Birth date removed from default signup (optional at API; connect later)  
3. Copy: Soul Blueprint language; no required birth-date framing  
4. Preserve `next` / returnTo after signup (default `/account`)  
5. Password helper on Create Account only  
6. Footer mantra: YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.

## Form fields

First Name · Last Name · Email · Password · Confirm Password

## DB

`db/schema-v2-optional-birth-date.sql` — run via `npm run db:migrate` so `users.birth_date` may be null.

## QA

```bash
npm run qa:sign-up-refinement-v1
```
