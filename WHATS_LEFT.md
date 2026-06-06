# What’s Left — 1320 Phase 1 → Launch → Phase 2

**Last updated:** 2026-06-06  
**Workspace:** `web/`  
**Status:** Wisewave Phases A–C shipped. **Lumen production QA blockers cleared** (`b2ab836` retest) — see `QA_WISEWAVE_ABC_LUMEN.md`. Optional: fresh physical-phone Safari + Chrome pass. Prior birth-date sign-off: `QA_BIRTHDATE_LUMEN.md`.

---

## Is the core Soul Code function ready?

**Yes — for Phase 1 MVP.**

| Capability | Ready? | Notes |
|------------|--------|--------|
| Birth date → **S1 / S3 / S2 / S0** calculation | ✅ | `calculate1320Code()` — canonical test: `1980-05-22` → S1-18 / S3-110 / S2-27 / S0-07 |
| Content from founder JSON (EN) | ✅ | `get1320Content()` + `data/1320/*.json` — do not rewrite interpretation copy in components |
| Funnel: `/` → `/your-code` → `/generating` → `/result` | ✅ | Mobile + desktop verified (incl. cookie / meta refresh fixes) |
| Free result report UI | ✅ | Locked teasers → `/full-report` waitlist |
| Full sample report (fictional) | ✅ | `/sample-report` |
| Blueprint education + anchors | ✅ | `/blueprint#s1` … `#s0` |
| Waitlist + booking forms | ✅ | Client success; optional webhook |
| Legal + footer | ✅ | Placeholders filled; footer subscribe hidden until webhook |

**Not the “full” product** — that’s Phase 2 (Soul Profile, save code, timeline, membership, payments). Phase 1 is **discover → calculate → free mirror → waitlist / book**.

---

## Phase 1 — What’s left (finish next)

### A. Launch / ops (no new features)

- [ ] **Deploy** to Vercel (root directory = `web`)
- [ ] Set env: `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `LEADS_WEBHOOK_URL`
- [x] **Lumen QA:** `QA_WISEWAVE_ABC_LUMEN.md` on production (Phases A–C) — **PASS** 2026-06-06 (`b2ab836`)
- [ ] **Optional:** physical-phone Safari + Chrome production pass (Lumen)
- [ ] **Production smoke:** full funnel + legal links + blueprint anchors
- [ ] Run: `npm run lint` · `npm run build` · `npm run smoke:content` · `npm run smoke:canonical` · `npm run smoke:result-1977`

### B. Steward / content (before public marketing)

- [x] Replace `[Insert Contact Email]` and `[Insert Date]` in `lib/legal-placeholders.ts` (`info@1320soulcode.com`, June 6, 2026)
- [ ] Legal review of `/privacy`, `/terms`, `/disclaimer` (placeholders cleared; counsel review still optional)
- [ ] Confirm booking testimonial placeholders stay generic (no fabricated clients)

### C. Optional polish (Phase 1 — nice to have)

- [x] **Marcellus + Inter** typography (display headings, sans body/UI)
- [x] Homepage Full Report: gold waitlist CTA + demoted reading link
- [x] Footer **SUBSCRIBE** hidden until `LEADS_WEBHOOK_URL` is set
- [ ] Wire **SAVE REPORT** / **EMAIL ME** on report header to lead capture (buttons exist; no action today)
- [ ] Connect `LEADS_WEBHOOK_URL` to Zapier / Make / CRM so waitlist & booking emails are stored
- [ ] Desktop pass on all routes (mobile funnel is done)
- [ ] Sync doc checkboxes: `IMPLEMENTATION_BATCHES.md`, `PHASE1_HANDOFF.md` → match repo

### D. Intentionally **not** Phase 1 (do not build yet)

These appear in UI as disabled or “Coming soon” — **by design**:

| Item | Phase 1 behavior |
|------|------------------|
| SAVE TO MY SOUL PROFILE | Disabled — “Phase 2” on result CTA |
| DOWNLOAD PDF | Disabled on report header |
| Login / accounts | Not built |
| Payments / full report purchase | Waitlist only on `/full-report` |
| Real email product (transactional) | Stub `/api/leads` unless webhook configured |
| Per-segment routes (`/blueprint/s1-origin-frequency`, etc.) | Slugs reserved in `lib/segments.ts` only |
| Per-S public marketing pages | Not built |

---

## Phase 2 — Yes, it exists (planned, not started)

From **11/15** and `PHASE1_HANDOFF.md` — **do not build in Phase 1**.

| Theme | Phase 2 intent (high level) |
|-------|-----------------------------|
| **Product home** | **TheSoulProfile.com** (separate from marketing site) |
| **Soul Profile** | Save code, return visits, personal dashboard |
| **Persistence** | Saved birth code, history, re-read report |
| **Engagement** | Check-ins, evolution timeline |
| **Monetization** | Membership tiers, payments |
| **Full report delivery** | PDF backend, deeper S4/S5/S6 modules, paid full report |
| **Routes** | `/blueprint/s1-origin-frequency` and sibling per-S pages (slugs already stubbed) |
| **Report actions** | Working SAVE TO SOUL PROFILE, PDF download |
| **i18n** | EN/ZH toggle (JSON already bilingual-ready) |

Phase 2 needs its own spec, design, and batch plan — **not** in the current `IMPLEMENTATION_BATCHES.md` (Batches 0–10 = Phase 1 only).

---

## Quick reference — you are here

```
[✅ Phase 1 build]  →  [→ You are here: launch prep]  →  [ Phase 2 TBD ]
     Batches 0–10         A + B (+ optional C)            Soul Profile / etc.
```

---

## Related files

| File | Purpose |
|------|---------|
| `IMPLEMENTATION_BATCHES.md` | Phase 1 batch checklist (needs checkbox sync) |
| `PHASE1_HANDOFF.md` | Full 15-doc handoff + architecture (status table stale) |
| `README.md` | Dev, deploy, env, smoke commands |
| `.env.example` | Production env template |

---

## Suggested “next session” order

1. ~~Lumen local QA (birth dates + funnel)~~ ✅ **2026-05-31**  
2. Steward fills legal placeholders  
3. Deploy to staging/production URL  
4. Production smoke (repeat key cases A + B on prod URL)  
5. Optional: `LEADS_WEBHOOK_URL` + report header email hook  
6. Update tracker markdown checkboxes (`IMPLEMENTATION_BATCHES.md`)  
7. **Phase 2 kickoff** — separate planning doc when steward is ready  
