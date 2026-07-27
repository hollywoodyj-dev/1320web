# 1320 Free Report → Full Report Landing Page Funnel · Spec Lock v1.0

**Status:** Phase F1 · Core Funnel (implementation)  
**Authority:** Wisewave Funnel Spec v1.0  
**Target:** `/free-soul-blueprint` → existing generator → `/result` → `/full-report` → `/checkout` → entitlement  

## Phase F1 in scope

- Dedicated Landing Page `/free-soul-blueprint`
- Hero birth-date form → existing `/generating` → `/result`
- Alias `/free-soul-blueprint/result` → `/result`
- Campaign attribution persistence (UTM / ref / language)
- Free Result Missing Map + Full Report offer
- Spec F1 analytics events
- No Session price cards on LP or free-result offer

## Out of scope (F2 / F3)

- Email nurture 1–6, A/B framework, retargeting dashboard
- Price experiments, discounts, Session bundles

## Session pricing note

Funnel Spec draft listed AUD Session prices. Production Sessions are **USD 119 / 159 / 209** (`launch-v1-usd`). F1 does not surface Session pricing on this funnel.

## Catalog source

- Landing copy: `lib/free-soul-blueprint-content.ts`
- Attribution: `lib/funnel/attribution.ts`
