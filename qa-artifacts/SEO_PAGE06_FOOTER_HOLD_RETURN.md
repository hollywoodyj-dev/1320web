# Page 06 HOLD clearance — mobile footer newsletter

**Status:** HOLD correction implemented — awaiting Wisewave Accepted and Closed after production confirm  
**Canonical:** https://www.1320soulcode.com/what-does-your-birthday-mean  
**Correction commit:** `bde4cc7`  
**Date:** 2026-08-05

## Change

Shared article / guide / inner-marketing mobile footer rule (not Page 06-only):

- Below `860px`, hide `.page-shell .site-footer .inner-footer-subscribe`
- Retains brand, nav/legal, copyright, mirror mantra
- Desktop newsletter unchanged
- Auth / transactional / member compact footers untouched (no `inner-footer-subscribe`)

File: `styles/site-density-v1.css` (alongside homepage `.footer-subscribe` hide)

## Targeted smoke (local production build)

Command:

```bash
QA_BASE_URL=http://localhost:3020 npx tsx scripts/screenshot-seo-page06-footer-hold.ts
```

Result: **12 / 12 PASS**

Confirmations:
- Newsletter inputs / Stay Connected / Subscribe CTA absent on mobile (not visible)
- Brand, legal, copyright, mantra retained
- No horizontal overflow at 390px
- Desktop footer newsletter still present and unchanged

Evidence:
- `qa-artifacts/seo-page06-footer-hold/page06-390-footer-crop.png`
- `qa-artifacts/seo-page06-footer-hold/page06-390-full.png`
- `qa-artifacts/seo-page06-footer-hold/page06-1280-footer-crop.png`
- `qa-artifacts/seo-page06-footer-hold/page06-footer-hold-checks.json`
