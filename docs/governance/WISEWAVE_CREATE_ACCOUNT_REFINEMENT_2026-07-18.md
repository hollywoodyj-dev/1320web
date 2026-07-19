# Wisewave — Create Account Page Refinement (Page 16)

**Date:** 2026-07-18  
**Spec:** `docs/specs/1320_CREATE_ACCOUNT_PAGE_REFINEMENT_SPEC_v1.md`  
**Route:** `/signup`  
**Status:** UX accepted + production migration & signup smoke PASS (2026-07-19) — ready for Wisewave final closure

## Directional acceptance

Create Account UX Acceptance: **PASS WITH REQUIRED DEPLOYMENT WATCHPOINT** (watchpoint cleared).

Accepted fixes:

1. Birth Date removed from generic Create Account form  
2. Soul Blueprint copy (contextual report lead when `next` is a report path)  
3. Compact auth footer + mantra: YOUR BLUEPRINT IS A MIRROR — NOT A FIXED IDENTITY.

## Production deployment watchpoint — cleared

Applied: `db/schema-v2-optional-birth-date.sql`  
Verified: `users.birth_date is_nullable = YES`

## Production smoke — PASS

1. Signup API without birth date → **200 / ok**  
2. `next=/my-report/demo` preserved → redirect `/my-report/demo`  
3. UI QA PASS (compact footer, no birth fields, password helper, mantra, mobile no overflow)  
4. `safeNextPath` shared with Sign In (internal paths only)

**UI artifact:** `qa-artifacts/LUMEN_QA_SIGN_UP_REFINEMENT_v1_2026-07-18.md`  
**Live:** https://www.1320soulcode.com/signup

**Page 16 · Create Account is ready for Wisewave final closure.**
