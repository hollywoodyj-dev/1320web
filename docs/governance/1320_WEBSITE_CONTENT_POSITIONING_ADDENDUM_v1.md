# 1320 Website Content & Positioning Upgrade Addendum v1.0

**Document Type:** Website Design / Content / Governance Addendum  
**Version:** v1.0  
**Status:** Implemented (Nova, 2026-07-10)  
**Target Site:** https://www.1320soulcode.com/  
**Primary Reference:** 1320_INTERNAL_DESIGN_BLUEPRINT_v1.md  
**Owner:** Tree / 信伊咲  
**Implementation Owner:** Nova  
**QA Owner:** Lumen  
**Classification:** Website Meaning-Layer Upgrade  

---

## Executive Directive

The website must express **1320 Living Blueprint Architecture** publicly:

```text
Soul Blueprint → Expression → Relationship Intelligence → Human Life
```

The report remains the entry point. The larger system is an ongoing reflective relationship with the user's Soul Blueprint.

## Core Public Positioning Lock

**Approved public definition:**

> 1320 is a reflective intelligence platform built around the Soul Blueprint.

**Approved short definition:**

> A reflective intelligence platform for building a living relationship with your Soul Blueprint.

**Strategic shift:** Replace dominant "Discover Your Soul Code" framing with **Meet Your Soul Blueprint** / **Build a Living Relationship with your Soul Blueprint**.

## Global Governance Rules

- No prediction, diagnosis, spiritual ranking, or user-facing numeric worth measures
- Human agency: user remains final authority
- Replace **Money Frequency** → **Value & Receiving**
- Replace **Who You Attract** → **What Relationships Mirror**
- Avoid **spiritual maturity** — use lived expression / growth edge
- **1320 Living Blueprint OS™** is internal only; public: **Living Blueprint** journey language
- Birth calculation uses **year, month, day only** — not time or location

## P0 Critical Corrections

| ID | Item | Status |
|----|------|--------|
| P0.1 | Unify Full Report checkout (live Stripe) vs waitlist copy | ✅ |
| P0.2 | Full Report scope S4–S9 (not S4–S6 only) | ✅ |
| P0.3 | Sample S3: S3-03 + raw value 110 labeled | ✅ |
| P0.4 | Disclaimer includes S7–S9 boundaries | ✅ |
| P0.5 | Birth time/location not required — public copy | ✅ |
| P0.6 | Terminology: Value & Receiving, Relationship Mirror | ✅ |

## P1 Positioning Upgrade

| Item | Status |
|------|--------|
| Homepage hero + reflective intelligence positioning | ✅ |
| About page philosophy + calculation boundary | ✅ |
| Your Code + Blueprint pages | ✅ |
| Full Report page S0–S9 positioning | ✅ |
| FAQ alignment | ✅ |
| Footer + metadata | ✅ |

## P2 (Future)

- Verified testimonials
- Membership language (when live)
- Post-session Living Blueprint surfacing

## Non-Goals

Do not change calculation logic, expose proprietary details, rename S0–S9, reorder S1→S3→S2→S0, introduce public scoring, or change pricing/checkout without approval.

**Founder origin:** [1320_FOUNDER_ORIGIN_COCREATION_ADDENDUM_v1.md](./1320_FOUNDER_ORIGIN_COCREATION_ADDENDUM_v1.md)

## Lumen QA Checklist

See sections 19–20 of the original Wisewave addendum for full QA verification after deploy.

## Implementation Files

| Area | Primary files |
|------|----------------|
| Homepage | `lib/homepage-content.ts`, `app/page.tsx` |
| About | `lib/about-1320-content.ts` |
| Your Code | `lib/your-code-content.ts` |
| Blueprint | `lib/blueprint-content.ts` |
| Full Report | `lib/full-report-content.ts`, `app/(site)/full-report/page.tsx` |
| FAQ | `lib/faq-content.ts` |
| Disclaimer | `lib/disclaimer-content.ts` |
| Footer / nav | `lib/site-nav.ts`, `components/site-footer.tsx` |
| Segment labels | `lib/1320-v2/adapt-v2-segment.ts`, `lib/adapt1320V1.ts` |
| Booking | `lib/booking-content.ts` (FS-006 v2.0) |
