# Lumen QA Handoff — Content Positioning & Founder Story (Addenda v1.0)

**From:** Holly / Nova  
**To:** Lumen  
**Environment:** Production — https://www.1320soulcode.com  
**Scope:** Meaning-layer upgrade only (copy, positioning, governance, origin story)  
**Not in scope:** Calculation logic, Stripe wiring, new features  
**Specs:**

- `docs/governance/1320_WEBSITE_CONTENT_POSITIONING_ADDENDUM_v1.md`
- `docs/governance/1320_FOUNDER_ORIGIN_COCREATION_ADDENDUM_v1.md`
- `docs/specs/personal-integration/FS006_PAGE_REVISION_v2.md` (booking page — already implemented)

**Prior platform QA:** PASS WITH NOTES (2026-07-07). Live Stripe + Full Report access confirmed by Holly (2026-07-09). Re-test commerce only if you see a regression.

---

## Before you start

1. Confirm latest `master` is deployed to production (addenda land after push).
2. Use a **private/incognito** tab for public-page reads.
3. Optional entitled account for checkout/account spot-check (password out-of-band):

| Field | Value |
|-------|--------|
| Email | `hollywoodyj@gmail.com` |
| Birth date | `1982-02-03` |
| Expected signature | `S1-20 / S3-01 / S2-05 / S0-05` |

---

## URLs to open (in order)

| # | Page | URL |
|---|------|-----|
| 1 | Homepage | https://www.1320soulcode.com/ |
| 2 | About (full origin) | https://www.1320soulcode.com/about-1320 |
| 3 | Origin anchor | https://www.1320soulcode.com/about-1320#origin-story |
| 4 | Your Code | https://www.1320soulcode.com/your-code |
| 5 | Blueprint | https://www.1320soulcode.com/blueprint |
| 6 | Full Report | https://www.1320soulcode.com/full-report |
| 7 | Sample Report | https://www.1320soulcode.com/full-report-v2 |
| 8 | Booking | https://www.1320soulcode.com/booking |
| 9 | FAQ | https://www.1320soulcode.com/faq |
| 10 | Disclaimer | https://www.1320soulcode.com/disclaimer |
| 11 | Free result (spot) | https://www.1320soulcode.com/result?year=1982&month=2&day=3 |
| 12 | Checkout (spot) | https://www.1320soulcode.com/checkout |

---

## Pass 1 — Positioning & P0 (15 min)

Mark **PASS / FAIL / NOTE** per row.

### Public positioning

- [ ] Homepage hero says **Meet Your Soul Blueprint** (not “Discover Your Soul Code” as primary frame)
- [ ] Homepage introduces **reflective intelligence platform** + **Living Blueprint** journey language
- [ ] Foundation order **S1 → S3 → S2 → S0** preserved on homepage pillars
- [ ] User feels centered on homepage — origin teaser is short, not in hero

### P0 — Product truth

- [ ] **Full Report is available now** — checkout CTAs on `/full-report`; no page says “waitlist only” while another says “purchase now”
- [ ] Full Report scope is **S4–S9** (not S4–S6 only) on homepage preview, `/full-report`, FAQ
- [ ] Sample / blueprint example code: **S1-18 / S3-03 / S2-27 / S0-07** with **S3 raw value 110** labeled where both appear
- [ ] No unexplained **S3-110** as the public S3 code without “raw value” label

### P0 — Terminology (grep mentally while reading)

- [ ] No **Money Frequency** on public marketing pages
- [ ] No **Who You Attract** as S2 headline (expect **What Relationships Mirror** / **Soul Mirror**)
- [ ] No **spiritual maturity** ranking language
- [ ] **Value & Receiving** used for S6
- [ ] Birth **time/location not required** stated on Your Code + About + FAQ

### P0 — Disclaimer

- [ ] Disclaimer lists **S1, S3, S2, S0, S4, S5, S6, S7, S8, S9**
- [ ] S7 boundary: not permission to disregard others / avoid accountability
- [ ] S8 boundary: not measure of public success / status
- [ ] S9 boundary: not spiritual superiority / enlightenment claim

---

## Pass 2 — Founder / Origin story (10 min)

- [ ] Homepage has short section **Born from a Number. Built into a System.** with CTA **Read the Origin Story**
- [ ] CTA lands on `/about-1320#origin-story`
- [ ] About page includes **The Origin of 1320** (number 1320, quiet inner moment)
- [ ] About explains **co-creation** — human intuition + **AI-supported system design**
- [ ] AI is **not** presented as founder, oracle, or spiritual source
- [ ] **A Note from the Founder** — Nobu Isaki / 信伊咲, Founder & Origin Steward
- [ ] Tone is warm, human, transparent — not guru / prophetic / absolute truth
- [ ] Footer has **Origin Story** link + human-originated / AI-supported microcopy
- [ ] **No long origin blocks** on Your Code, Checkout, or payment flows

### Governance — must NOT appear on public pages

- [ ] No divine revelation / absolute truth / chosen system / AI prophet / AI oracle
- [ ] No **1320 Living Blueprint OS™** in public copy

---

## Pass 3 — Page-by-page spot checks (15 min)

### Homepage `/`

- [ ] “What Is 1320?” reflects reflective intelligence, not report-only product
- [ ] Full Report preview lists **S4–S9** advanced layers
- [ ] Footer definition matches new positioning

### About `/about-1320`

- [ ] Structure: What Is → Why Exists → Philosophy → Origin → Co-Creation → Founder Note → What Is Not → CTA
- [ ] Phase timeline uses **At first / Over time / Later / Today** — no unapproved exact dates
- [ ] CTA **Generate My Code** + **View Sample Report** after founder section

### Your Code `/your-code`

- [ ] Entry framing = Soul Blueprint, not fate calculator
- [ ] Birth year/month/day only

### Blueprint `/blueprint`

- [ ] S2 section uses relationship mirror language
- [ ] Example code S3-03 + raw 110 note
- [ ] CTA **Explore Full Report** (not “waitlist”)

### Full Report `/full-report`

- [ ] Hero = complete **S0–S9** Soul Blueprint
- [ ] Checkout primary; sign-in for already purchased
- [ ] No dominant waitlist messaging

### Booking `/booking`

- [ ] Applied integration positioning (not report read-aloud / fortune-telling)
- [ ] **What Comes After Personal Integration?** → Wisewave / Living Blueprint path
- [ ] Pay & book flow unchanged functionally

### FAQ `/faq`

- [ ] “Can I buy the Full Report now?” → **Yes**
- [ ] S2 does not predict who you will attract
- [ ] S6 is Value & Receiving, not money prediction

### Free result `/result?...`

- [ ] Upsell mentions S4–S9 / Value & Receiving (quick scan)
- [ ] No deprecated Gate 2 terms on upsell

---

## Pass 4 — CTAs & links (5 min)

- [ ] All primary CTAs resolve (no 404): Generate My Code, Full Report, Sample, Booking, Origin Story
- [ ] `/full-report-v2` loads sample report (canonical preview birth date 1980-05-22)
- [ ] Nav includes Blueprint + FAQ without overpromising

---

## Optional — Commerce regression (5 min)

Only if something looks broken:

1. `/checkout` loads (not “Checkout Not Yet Live”)
2. Entitled login → `/account` → Full Report opens
3. Booking form → Stripe redirect (do not complete live payment unless approved)

---

## Report back

Save artifact: `qa-artifacts/LUMEN_QA_CONTENT_POSITIONING_ADDENDUM_2026-07-10.md`

Use this header:

```markdown
# Lumen QA — Content Positioning & Founder Story Addenda v1.0

**Date:** YYYY-MM-DD  
**Environment:** Production https://www.1320soulcode.com  
**Deploy ref:** <git sha or “confirm with Holly”>  
**Overall:** PASS | PASS WITH NOTES | FAIL  

## Summary
(2–4 sentences)

## Failures / Holds
(bullet list, page + exact copy)

## Notes
(minor, non-blocking)

## Sign-off
Ready for public positioning sign-off: Yes / No
```

Ping Holly on any **FAIL** or checkout/waitlist contradiction.

---

## Quick FAIL triggers (stop and report)

| Symptom | Likely issue |
|---------|----------------|
| “Join waitlist” as only Full Report path | Deploy not live or missed page |
| Money Frequency / Who You Attract on marketing | Stray copy not updated |
| Origin story in checkout hero | Placement violation |
| FAQ says cannot buy + Full Report says buy now | P0.1 conflict |
| S3-110 shown as mapped code without label | P0.3 sample inconsistency |
| AI described as spiritual source | Founder addendum governance breach |

---

## Reference — what Holly already verified (no need to repeat)

- Live Stripe payment succeeds
- Webhook fulfillment
- Full Report entitled access from account
- DB migration applied

Focus this run on **copy coherence and governance**, not full platform regression.
