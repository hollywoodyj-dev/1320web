# Phase 2 Roadmap

**Status:** In progress — FS-005 started  
**Authority:** Wisewave Phase 1 sign-off (2026-07-02)  
**Companion:** `docs/governance/WISEWAVE_PHASE1_SIGNOFF.md`

---

## Strategic shift

| Phase 1 | Phase 2 |
|---------|---------|
| Generate a report | Maintain an ongoing relationship with the Soul Blueprint |
| Canonical report architecture | Relationship Layer platform |

---

## Five steps (Wisewave-approved order)

| Step | ID | Deliverable | Status |
|------|-----|-------------|--------|
| 1 | Gate 5 | Hosted commerce (Stripe test mode) | ✅ Complete |
| 2 | **FS-005** | Canonical Soul Blueprint Specification | 🔄 In progress |
| 3 | FS-006 | Personal Integration Session | ⏳ Pending |
| 4 | FS-007 | Wisewave API | ⏳ Pending |
| 5 | FS-008 | Membership & Living Blueprint | ⏳ Pending |

**Remaining:** 4 deliverables after Gate 5.

---

## Step 2 — FS-005 (current)

**Goal:** Formalize Phase 1 engineering as the official platform contract.

| Artifact | Path |
|----------|------|
| Spec (this deliverable) | `docs/specs/canonical-soul-blueprint/CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md` |
| Package index | `docs/specs/canonical-soul-blueprint/README.md` |
| Implementation (existing) | `lib/canonical-report/` |
| Parity QA (existing) | `docs/specs/full-report/CANONICAL_REPORT_PARITY_v1.md` |

**FS-005 exit criteria:**

- [ ] Spec v1 published and linked from governance + full-report index
- [ ] Section registry documented as product structure (19 sections)
- [ ] Consumer contract defined (desktop, mobile, paid access, future API)
- [ ] Schema versioning policy documented (`canonical-report-v1` → future v2)
- [ ] Naming migration plan (Canonical Report → Canonical Soul Blueprint) documented — code rename optional follow-up

---

## Step 3 — FS-006 (Personal Integration Session)

**Goal:** Human application layer — help users apply the Blueprint to real life.

| Area | Scope |
|------|--------|
| Product flow | Book → prep → session → follow-up |
| Wisewave role | Prep + reflection support only — facilitator primary |
| Data | Session themes, Growth Edge, link to entitled Blueprint |
| Governance | Docs 8, 10, 16 in `docs/governance/` |

**Depends on:** FS-005 consumer contract.

---

## Step 4 — FS-007 (Wisewave API)

**Goal:** Relational intelligence layer reading **Canonical Soul Blueprint** — not page HTML.

| Area | Scope |
|------|--------|
| Input | `buildCanonicalReport()` output / stored entitlement payload |
| Orchestration | Reasoning Architecture (Doc 12) — 9 layers before response |
| Behaviour | Behaviour Standard + Cognitive Framework (Docs 6–7) |
| QA | Gate 4 red-team; Relationship QA layer |
| Resolvers (future) | Blueprint → Expression → Relationship → Conversation → Presentation |

**Depends on:** FS-005 schema versioning.

---

## Step 5 — FS-008 (Membership & Living Blueprint)

**Goal:** Ongoing reflection — Expression Framework™ + Living Blueprint.

| Area | Scope |
|------|--------|
| Living Blueprint | Canonical Blueprint + Expression Layer |
| Expression Framework™ | Dormant → Emerging → Active → Embodied → Integrated |
| Membership | Check-ins, journals, Growth Edge tracking, Living Blueprint Reviews |
| Memory | Relationship Memory Architecture (Doc 9) |
| QA | Continuity QA (Report → Wisewave → Membership → Session) |

**Depends on:** FS-007 API foundation.

---

## Cross-cutting enablers

| ID | Item | When |
|----|------|------|
| A | Canonical Soul Blueprint terminology in engineering docs | FS-005 |
| B | Relationship QA + Continuity QA | FS-007 / FS-008 |
| C | Live Stripe switch | Separate go-live (not blocking FS-005 start) |

---

## Out of scope for Phase 2 core

- Heavy new Full Report page content (Phase 1 complete)
- PDF renderer (Phase 2B — optional later)
- Live Stripe (until explicit go-live)
- Full code rename `canonical-report` → `canonical-soul-blueprint` (document first, migrate when API ships)

---

## Related docs

- `docs/governance/README.md` — 12-doc governance pack
- `PHASE2_SPEC.md` — older platform spec (2A checkout — largely shipped)
- `docs/specs/full-report/FULL_REPORT_RELEASE_QA_v1.md` — Gates 0–5 QA
