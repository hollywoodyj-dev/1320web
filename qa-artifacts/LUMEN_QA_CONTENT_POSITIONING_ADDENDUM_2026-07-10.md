# Lumen QA - Content Positioning & Founder Story Addenda v1.0

**Date:** 2026-07-10  
**Environment:** Production https://www.1320soulcode.com  
**Deploy ref:** `origin/master` / local `master` = `5d48de3794b38dfbd3df81f0cf787f6625e3bf60`; production addendum content not confirmed live  
**Overall:** FAIL  

## Summary

Production is serving older public positioning copy, not the requested Content Positioning + Founder Story addenda. The live pages still use the previous "Discover Your Soul Code" / report-centered framing, expose deprecated S2/sample-code language, and retain waitlist language alongside checkout. The founder-origin story and expanded disclaimer governance sections required by the addenda are not visible on production.

## Failures / Holds

- **Deploy/live-content confirmation:** latest Git `master` is `5d48de3`, while the addendum files and content changes are present only in the local dirty worktree during this QA run. Production content does not match the addendum requirements, so latest addenda are not confirmed live.
- **Homepage `/`:** hero still says **"Discover Your Soul Code"**, not **"Meet Your Soul Blueprint"**. The page still frames 1320 as "Soul Origin Code System" and does not show the required short origin section **"Born from a Number. Built into a System."**
- **Blueprint `/blueprint`:** visible S2 headline still says **"Who You Attract"**. Example blueprint shows **"S1-18 / S3-110 / S2-27 / S0-07"**, with no visible raw-value label for `110`.
- **Blueprint `/blueprint`:** CTA still says **"EXPLORE FULL REPORT WAITLIST"**, violating the live Full Report checkout positioning.
- **Full Report `/full-report`:** hero copy still says the Full Report covers "identity, relationships, shadows, mission, and money patterns" and only previews advanced modules through Shadow, S5, and S6, not full **S4-S9** scope.
- **Full Report `/full-report`:** live page contains contradictory waitlist/checkout copy: **"Purchase the Full Soul Origin Report once..."** appears near **"You can also join the waitlist"**, **"JOIN LAUNCH UPDATES"**, **"Join the waitlist for the Full Soul Origin Report"**, and **"JOIN THE WAITLIST"**.
- **FAQ `/faq`:** live FAQ still includes waitlist framing, including **"How is a reading different from the waitlist?"** and page-path copy pointing users to the **"full report waitlist"**.
- **About `/about-1320`:** required founder-origin story is absent. Browser-visible checks missed **"The Origin of 1320"**, **"AI-supported system design"**, **"Nobu Isaki"**, **"信伊咲"**, and **"Founder & Origin Steward"**.
- **Disclaimer `/disclaimer`:** disclaimer is still old-scope. It lists only **S1, S3, S2, S0, S4, S5, or S6** and does not include required S7/S8/S9 boundaries around accountability, public success/status, or spiritual superiority/enlightenment.
- **Booking `/booking`:** applied-integration framing is present, but required continuation section **"What Comes After Personal Integration?"** with Wisewave / Living Blueprint path is absent.
- **Your Code `/your-code`:** still frames entry as **"Discover Your Soul Origin Code"** and S2 as **"Who you attract"**, not the new Soul Blueprint / relationship mirror positioning.

## Notes

- Commerce was intentionally not re-tested because Holly already verified Stripe/entitlement and the current blockers are copy/coherence/deploy blockers.
- Production routes checked returned HTTP 200, including `/`, `/about-1320`, `/your-code`, `/blueprint`, `/full-report`, `/full-report-v2`, `/booking`, `/faq`, `/disclaimer`, `/result?year=1982&month=2&day=3`, and `/checkout`.
- `/booking` has some FS006 revision language live, including **"Applied Integration - Not a Report Read-Aloud"**, so that page appears partially updated compared with older marketing pages.
- No public occurrence of **"1320 Living Blueprint OS"** was found in rendered spot checks.

## Sign-off

Ready for public positioning sign-off: **No**
