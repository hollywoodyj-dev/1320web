# 1320 Founder, Origin & Co-Creation Story Addendum v1.0

**Document Type:** Website Meaning-Layer / Trust-Layer Addendum  
**Version:** v1.0  
**Status:** Implemented (Nova, 2026-07-10)  
**Primary Reference:** [1320_WEBSITE_CONTENT_POSITIONING_ADDENDUM_v1.md](./1320_WEBSITE_CONTENT_POSITIONING_ADDENDUM_v1.md)  
**Owner:** Tree / 信伊咲  
**Implementation Owner:** Nova  
**QA Owner:** Lumen  

---

## Executive Directive

Add a governed Founder / Origin / Co-Creation story layer that explains 1320 began as a number received in a quiet inner moment and evolved through human intuition + AI-supported system design into a reflective intelligence platform.

**Must create:** trust, warmth, origin, meaning, humanity, transparency, system depth.

**Must not create:** guru authority, spiritual dependency, religious claim, absolute truth, divine superiority, belief pressure, AI mystification.

## Core Narrative Lock

- 1320 did not begin as a report — it began with the number 1320 in a quiet inner moment.
- Co-created through human intuition and AI-supported system design.
- Founder remains origin steward; AI is systemization, not spiritual source.

## Website Placement

| Location | Content |
|----------|---------|
| Homepage | Short origin teaser only → `/about-1320#origin-story` |
| About page | Full origin, co-creation, founder note, governance |
| Footer | Origin Story link + one-line microcopy |

**Do not dominate:** Your Code, Checkout, Full Report purchase, Account, payment confirmation.

## Implementation Files

- `lib/homepage-content.ts` — `HOMEPAGE_ORIGIN`
- `lib/about-1320-content.ts` — origin story sections
- `app/page.tsx` — homepage teaser
- `app/(site)/about-1320/page.tsx` — full story (`id="origin-story"`)
- `lib/site-nav.ts` — footer origin link
- `components/site-footer.tsx` — origin microcopy

## Lumen QA Checklist

See sections 16–17 of the original Wisewave addendum for full verification after deploy.
