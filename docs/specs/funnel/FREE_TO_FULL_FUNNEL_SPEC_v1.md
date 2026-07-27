# 1320 Free Report → Full Report Landing Page Funnel · Spec Lock v1.0

**Status:** Phase F1 · Core Funnel — Accepted (Wisewave); documentation closure  
**Authority:** Wisewave Funnel Spec v1.0 · F1 review PASS WITH LIGHT CORRECTIONS  
**Target:** `/free-soul-blueprint` → existing generator → `/result` → `/full-report` → `/checkout` → entitlement  

## Production commercial lock (canonical)

Current production currency: **USD**  
Production checkout configuration is the source of truth for amounts charged.

| Product | Production price |
|---------|------------------|
| Full Soul Blueprint Report | **USD 49** |
| Blueprint Integration Session (45m) | **USD 119** |
| Focused Life Integration Session (60m) · Most Recommended | **USD 159** |
| Deep Blueprint Integration Session (75m) | **USD 209** |

Session pricing version: `launch-v1-usd`  
Catalog: `lib/personal-integration/session-catalog.ts` · Spec: `personal-integration/SESSION_PRICING_LAUNCH_V1.md`

### This Funnel (Free → Full)

- Full Report display and checkout: **USD 49**
- Session prices are **outside** this Funnel and must **not** appear on:
  - `/free-soul-blueprint`
  - Free Result Missing Map / Full Report offer block
- Quiet, below-primary Personal Integration link on `/full-report` is acceptable if visually secondary and without Session price cards

## Superseded pricing (not production)

Earlier draft / proposal Session prices in **AUD 168 / 228 / 298** are:

- **Superseded launch-pricing proposal**
- **Not current production pricing**

Do not treat AUD figures as active Spec truth.  
Do not convert historical purchase records.  
Do not silently rewrite older accepted artifacts where historical accuracy matters — mark them superseded instead.

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
- Do not begin F2 / F3 without separate authorization

## Attribution (non-PII)

Persist only: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ref`, `language`  
(and optional landing path for first-party continuity)

Do **not** send to advertising or general analytics: birth date, Blueprint codes, report content, reflection text, account details.

## Catalog source

- Landing copy: `lib/free-soul-blueprint-content.ts`
- Attribution: `lib/funnel/attribution.ts`
- Production URL: `https://www.1320soulcode.com/free-soul-blueprint`
