# Wisewave — Personal Integration Session Page Refinement v1.0

**Date:** 2026-07-18  
**Spec:** `docs/specs/1320_BOOKING_PAGE_REFINEMENT_SPEC_v1.md`  
**Status:** Implemented — pending Lumen QA  

## Backup

`backups/page-08-booking-pre-refinement-2026-07-18/`

## Nova implementation

- `/booking` refined into a calmer human integration invitation
- Hero: Pay & Book + Explore Full Report only
- Generate My Code First only when user has no code (not in hero)
- Session options keep Stripe ids; CTA unified to “Book This Session”
- FAQ capped at 5; merged prepare/after booking
- Sign-in return path preserved (`next` → booking + type hash)
- CSS: `styles/booking-density-v1.css`

**Next:** Lumen light QA → Wisewave visual acceptance
