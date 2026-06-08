# What’s Left — 1320 Phase 1 → Launch → Phase 2

**Last updated:** 2026-06-08  
**Workspace:** `web/`  
**Status:** Phase 1 launch ops cleared for Phase 2 handoff. Wisewave Phases A–C shipped; Lumen production QA **PASS** (`QA_WISEWAVE_ABC_LUMEN.md`). Post-deploy legal + W1/Case A spot-check done. Optional: physical-phone Safari + Chrome pass; legal counsel review deferred.

---

## Is the core Soul Code function ready?

**Yes — for Phase 1 MVP.**

| Capability | Ready? | Notes |
|------------|--------|--------|
| Birth date → **S1 / S3 / S2 / S0** calculation | ✅ | `calculate1320Code()` — canonical test: `1980-05-22` → S1-18 / S3-110 / S2-27 / S0-07 |
| Content from founder JSON (EN) | ✅ | `get1320Content()` + `data/1320/*.json` — do not rewrite interpretation copy in components |
| Funnel: `/` → `/your-code` → `/generating` → `/result` | ✅ | Mobile + desktop verified (incl. cookie / meta refresh fixes) |
| Free result report UI | ✅ | Locked teasers → `/full-report` waitlist |
| Sample report (free layer, fictional) | ✅ | `/sample-report` — same depth as `/result`, not the ~32-page Full Report |
| Blueprint education + anchors | ✅ | `/blueprint#s1` … `#s0` |
| Waitlist + booking forms | ✅ | Persist to DB when `POSTGRES_URL` set (Phase 2A) |
| Legal + footer | ✅ | Live legal copy (`info@1320soulcode.com`, June 6, 2026); footer subscribe hidden until Phase 2A DB |

**Not the “full” product** — that’s Phase 2 (Soul Profile, save code, timeline, membership, payments). Phase 1 is **discover → calculate → free mirror → waitlist / book**.

---

## Phase 1 — What’s left (finish next)

### A. Launch / ops (no new features)

- [ ] **Deploy** to Vercel (root directory = `web`)
- [ ] Set env: `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [x] ~~`LEADS_WEBHOOK_URL`~~ **skipped** — Phase 2A uses `POSTGRES_URL` (see `PHASE2_SPEC.md`)
- [x] **Lumen QA:** `QA_WISEWAVE_ABC_LUMEN.md` on production (Phases A–C) — **PASS** 2026-06-06 (`b2ab836`)
- [ ] **Optional:** physical-phone Safari + Chrome production pass (Lumen)
- [x] **Post-deploy spot-check:** hard refresh `/privacy`, `/terms`, `/disclaimer`; W1 (`1977-11-12`) + Case A (`1980-05-22`) on `/result`
- [ ] **Production smoke:** full funnel + blueprint anchors (legal spot-check done above)
- [ ] Run: `npm run lint` · `npm run build` · `npm run smoke:content` · `npm run smoke:canonical` · `npm run smoke:result-1977`

### B. Steward / content (before public marketing)

- [x] Replace `[Insert Contact Email]` and `[Insert Date]` in `lib/legal-placeholders.ts` (`info@1320soulcode.com`, June 6, 2026)
- [x] Legal pages live on production — not MVP placeholders (`lib/legal-placeholders.ts`)
- [ ] ~~Legal counsel review~~ **optional / deferred** — copy is live; counsel pass before Phase 2 payments if desired
- [ ] Confirm booking testimonial placeholders stay generic (no fabricated clients)

### C. Optional polish (Phase 1 — nice to have)

- [x] ~~**Marcellus + Inter** typography~~ **rolled back** — Geist + Georgia restored
- [x] Homepage Full Report: gold waitlist CTA + demoted reading link
- [x] Footer **SUBSCRIBE** hidden until leads persist (webhook today; DB in Phase 2A)
- [ ] Wire **SAVE REPORT** / **EMAIL ME** on report header to lead capture (buttons exist; no action today)
- [ ] ~~Webhook to Zapier/Make~~ → **Phase 2A:** product database for waitlist, booking, newsletter
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

## Phase 2 — Spec locked (Wisewave 2026-06-06)

**Full spec:** `PHASE2_SPEC.md` — **do not build in Phase 1**.

### Launch product

```
Free Soul Code → Paid Full Report (one-time) → Magic-link return → Optional Reading
```

| Decision | Phase 2 launch |
|----------|----------------|
| **Access** | Free recognition layer + locked preview; paid unlocks full depth + S4/S5/S6 |
| **Pricing** | One-time **Unlock My Full Blueprint** — no subscription yet |
| **Delivery** | In-browser first (2A); PDF on-demand later (2B) |
| **Identity** | Email magic link — no password accounts at launch |
| **Data** | Own database (waitlist, booking, purchases, entitlements, saved reports) |
| **S4** | Core Shadow Pattern module — after Integrated Soul Blueprint, not the same thing |
| **Soul Profile / membership** | Phase 2C — not initial launch |

### Build tracks

- **2A** — ✅ **Foundation shipped in repo** — needs ops env (see below)  
- **2B** — Expanded report UI (S1–S0, synthesis, S4, S5, S6, 7-day practice)  
- **2C** — Soul Profile dashboard, timeline, journal, membership (later)  

#### Phase 2A ops checklist (steward)

1. Create Postgres (Neon / Vercel Postgres) → set `POSTGRES_URL` on Vercel  
2. Run `npm run db:migrate` against production DB  
3. Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_FULL_REPORT_AMOUNT_CENTS` or `STRIPE_FULL_REPORT_PRICE_ID`  
4. Webhook endpoint: `https://www.thesoulprofile.com/api/webhooks/stripe` → `checkout.session.completed`  
5. Optional email: `RESEND_API_KEY` + `EMAIL_FROM` (dev logs magic link if unset)  
6. Smoke: `npm run smoke:phase2a` · test `/checkout` → pay → `/my-report/[id]`

`IMPLEMENTATION_BATCHES.md` (Batches 0–10) remains Phase 1 only.

---

## Quick reference — you are here

```
[✅ Phase 1 build]  →  [✅ Launch ops cleared]  →  [ Phase 2A code shipped — ops env next ]
     Batches 0–10         legal + W1/Case A spot-check    PHASE2_SPEC.md
```

---

## Related files

| File | Purpose |
|------|---------|
| `PHASE2_SPEC.md` | **Phase 2 platform + product spec lock (Wisewave)** |
| `IMPLEMENTATION_BATCHES.md` | Phase 1 batch checklist (needs checkbox sync) |
| `PHASE1_HANDOFF.md` | Full 15-doc handoff + architecture (status table stale) |
| `README.md` | Dev, deploy, env, smoke commands |
| `.env.example` | Production env template |

---

## Suggested “next session” order

1. ~~Lumen local QA (birth dates + funnel)~~ ✅ **2026-05-31**  
2. ~~Steward fills legal placeholders~~ ✅ **2026-06-06**  
3. ~~Deploy to production~~ ✅ `thesoulprofile.com`  
4. ~~Post-deploy spot-check (legal + W1 + Case A)~~ ✅ **2026-06-07**  
5. Report header email hook (defer to Phase 2A DB)  
6. Update tracker markdown checkboxes (`IMPLEMENTATION_BATCHES.md`)  
7. **Phase 2A ops** — configure `POSTGRES_URL` + Stripe on Vercel, run `db:migrate`, test checkout  
8. **Phase 2B** — ~32-page Full Report spec (from Wisewave) + S4/S5/S6 depth UI per `PHASE2_SPEC.md`  
