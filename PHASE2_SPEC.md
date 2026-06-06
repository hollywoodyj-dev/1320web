# Phase 2 Spec Lock — Wisewave Decisions

**Status:** Approved · implementation-ready  
**Last updated:** 2026-06-06  
**Audience:** Nova (engineering), steward, Wisewave  
**Companion:** Full Report content spec (S5/S6 expansion, premium UI) + this platform spec

---

## Product thesis

Phase 2 is **not** a full membership platform at launch.

```
Free Soul Code → Paid Full Report → Magic-link return access → Optional Reading
```

Sell one stable, trustworthy, returnable Full Report first. Expand to Soul Profile / membership after core product is validated.

---

## 1. Access model

**Tiered access.**

### Free user (recognition layer)

- S1 / S3 / S2 / S0 overview
- Integrated Soul Blueprint — **short summary**
- Locked Full Report preview (structure visible, full content not revealed)
- CTA: unlock Full Report

Free report stays useful but incomplete.

### Paid user (integration layer)

- Full S1, S3, S2, S0 depth
- Integrated Soul Blueprint — **expanded**
- **S4 Shadow Pattern** module
- **S5 Soul Mission**
- **S6 Money Frequency**
- 7-Day Integration Practice
- Reflection prompts

### Teaser copy direction

- *Your free result gives you the first mirror.*
- *The Full Report opens the full map.*

---

## 2. Pricing

**One-time purchase at Phase 2 launch.**

- Primary CTA: **Unlock My Full Blueprint**
- **No subscription** at initial launch

Membership is Phase 3 or Phase 2.5 (optional Soul Profile membership later).

---

## 3. Delivery

| Phase | Scope |
|-------|--------|
| **2A** | In-browser Full Report after purchase |
| **2B** | Downloadable PDF — on demand from saved report state (not a separate static design) |

PDF is planned, not required for first paid launch unless engineering cost is low.

---

## 4. Identity / return access

**Magic link first** — email-based, no password at launch.

Supports: return visits, saved report, purchase entitlements, future Soul Profile.

### Access flow

```
Purchase Full Report
  → email stored
  → entitlement created
  → magic link sent
  → user returns to report
```

**Avoid:** purchase-only anonymous link as the only access model (too fragile for Soul Profile).

Full password/OAuth accounts deferred unless required.

---

## 5. Data retention

**Store only what product access requires.**

### Store (Phase 2 launch)

| Field / record | Purpose |
|----------------|---------|
| email | identity, magic link, comms |
| name (if provided) | personalization |
| birth date | code calculation |
| S1 / S3 / S2 / S0 codes | report content |
| combination signature | canonical identity |
| report version | content drift / regeneration |
| purchase history | billing |
| entitlement status | access gate |
| magic link token / session metadata | return access |
| waitlist status | marketing |
| booking request data | ops |

### Do not store at launch

- Journal / reflection entries (unless deletion controls + accounts are ready)

### User rights

Update **Privacy** and **Terms** for: payments, stored birth data, saved report access, magic-link login, data deletion requests.

Minimum: user can request deletion of personal data and report access records.

---

## 6. S4 Shadow Pattern

**Include as Full Report module** — separate from Integrated Soul Blueprint.

### Canonical data (already in repo)

- `data/1320/s4-shadow-patterns.json`
- `s4Content` — derived from S1

### Full Report sequence

1. S1 Origin Frequency  
2. S3 Vibration Tier  
3. S2 Mirror Path  
4. S0 Void Gate  
5. **Integrated Soul Blueprint** (S1+S3+S2+S0 synthesis)  
6. **S4 Shadow Pattern** (UI label: *Core Shadow Pattern*)  
7. S5 Soul Mission  
8. S6 Money Frequency  
9. 7-Day Integration Practice  

### Naming rules

| Internal | UI / product |
|----------|----------------|
| `integratedSoulBlueprint` | Integrated Soul Blueprint — synthesis layer |
| `s4Content` | S4 Shadow Pattern / Core Shadow Pattern — premium shadow module |

**Do not** use `s4Content` as fallback for Integrated Soul Blueprint.

---

## 7. Data architecture

**Own database = source of truth.** No Zapier/Make as primary pipeline for Phase 2.

All records in product DB:

- waitlist signups  
- booking requests  
- newsletter capture  
- purchases  
- entitlements  
- magic link access  
- saved reports  

Optional later: CRM sync, email marketing sync, analytics export, admin dashboard.

### Phase 1 interim note

`LEADS_WEBHOOK_URL` + `/api/leads` is a **Phase 1 stub** until DB ships. Phase 2 replaces this with DB writes. Footer subscribe gating may move to “DB configured” or always-on once DB exists.

---

## Build order

### Phase 2A — Paid Full Report foundation

1. Database schema  
2. Payment integration (Stripe one-time)  
3. Entitlement model  
4. Magic link access  
5. Paid Full Report route  
6. Full Report UI (canonical content)  
7. Access gate from free report  
8. Email confirmation / magic link delivery  

### Phase 2B — Report depth + delivery

1. Expanded S1 / S3 / S2 / S0  
2. Integrated Soul Blueprint expanded  
3. S4 Shadow Pattern  
4. S5 Soul Mission (seed database)  
5. S6 Money Frequency  
6. 7-Day Integration Practice  
7. Optional PDF on demand  

### Phase 2C — Soul Profile platform (not initial launch)

1. Saved codes  
2. Return dashboard  
3. Timeline / check-ins  
4. Journal entries  
5. Membership layer  

**Do not merge 2C into initial Phase 2 launch** unless timeline and budget allow.

---

## Short decision summary

| # | Decision |
|---|----------|
| 1 | Free preview + paid Full Report unlock |
| 2 | One-time purchase first; membership later |
| 3 | In-browser first; PDF on-demand later |
| 4 | Magic link access; no password account at launch |
| 5 | Store email, birth date, codes, report version, purchase, entitlement; no journal at first |
| 6 | S4 after Integrated Soul Blueprint; never conflate with synthesis |
| 7 | Own database; no webhook/CRM required for Phase 2 launch |

---

## Codebase readiness (Nova reference)

| Asset | Status |
|-------|--------|
| S1–S0 content + adapters | ✅ Phase 1 |
| S4 shadow patterns JSON | ✅ data layer |
| S5 seed database + assembly | ✅ data layer (`npm run smoke:s5-assembly`) |
| S6 money frequency master | ✅ data layer (`npm run smoke:s6-master`) |
| Free report UI + locked teasers | ✅ Phase 1 |
| Payments / DB / magic link | ✅ Phase 2A foundation (needs `POSTGRES_URL` + Stripe env) |
| S5/S6/S4 in report UI | ❌ Phase 2B |
| Access gate / entitlements | ✅ `/result` free layer + `/my-report/[id]` paid route |

---

## Related files

| File | Purpose |
|------|---------|
| `PHASE1_HANDOFF.md` | Phase 1 scope boundary |
| `PHASE2_QUEUE.md` | UI polish backlog (separate from platform) |
| `WHATS_LEFT.md` | Launch tracker |
| `lib/full-report-content.ts` | Marketing copy for Full Report |
| `data/1320/s4-shadow-patterns.json` | S4 canonical |
| `data/1320/s5-seed-database.json` | S5 canonical |
| S6 master import | `npm run import:s6-master` |
