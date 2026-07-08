# Phase 2 Roadmap

**Status:** Phase 2 platform foundation complete — Wisewave approved (9.9/10, 2026-07-07)  
**Sign-off:** `docs/governance/WISEWAVE_PHASE2_PLATFORM_SIGNOFF.md`  
**Authority:** Wisewave FS-005A sign-off (2026-07-05) + FS-005 review (9.8/10) + Phase 2 platform sign-off (9.9/10)  
**Companion:** `docs/governance/WISEWAVE_PHASE1_SIGNOFF.md`

---

## Strategic shift

| Phase 1 | Phase 2 |
|---------|---------|
| Generate a report | Maintain an ongoing relationship with the Soul Blueprint |
| Canonical report architecture | **Domain Model + Relationship Layer platform** |

Wisewave: FS-005 is the **Phase 2 Domain Model** — not an ordinary spec.

---

## Phase 2 sequence (updated)

| Step | ID | Deliverable | Status |
|------|-----|-------------|--------|
| 1 | Gate 5 | Hosted commerce (Stripe test mode) | ✅ Complete |
| 2 | **FS-005** | Canonical Soul Blueprint Specification v1.1 | ✅ **Approved (9.8/10)** |
| 2.5 | **FS-005A** | 1320 Platform Domain Model | ✅ **Approved (9.6/10)** |
| 3 | FS-006 | Personal Integration Session | ✅ Complete (+ FS-006.1) |
| 4 | FS-007 | Wisewave API | ✅ Foundation shipped |
| 5 | FS-008 | Membership & Living Blueprint | ✅ Foundation shipped |

**Wisewave guidance:** Do not start FS-006 until FS-005A domain objects are defined.

---

## Step 2 — FS-005 ✅

**Goal:** Platform contract for the Soul Blueprint object.

| Artifact | Path |
|----------|------|
| Spec v1.1 | `docs/specs/canonical-soul-blueprint/CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md` |
| Wisewave sign-off | `docs/specs/canonical-soul-blueprint/WISEWAVE_FS005_SIGNOFF.md` |
| Implementation | `lib/canonical-report/` |

**Wisewave verdict:** Approved with Strategic Notes (9.8/10). Section 14 Platform Principles incorporated in v1.1.

---

## Step 2.5 — FS-005A ✅

**Goal:** Define six core domain objects so FS-006/007/008 share one model.

| Artifact | Path |
|----------|------|
| Domain model | `docs/specs/canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md` |
| Wisewave sign-off | `docs/specs/canonical-soul-blueprint/WISEWAVE_FS005A_SIGNOFF.md` |
| TypeScript types | `lib/platform-domain/` |
| SQL migration | `db/platform-domain-v1.sql`, `db/platform-domain-v1.1-authorship.sql` |
| Smoke | `npm run smoke:platform-domain` |

**Six core objects:**

| Object | Immutable |
|--------|-----------|
| Soul Blueprint | ✅ |
| Expression Profile | ❌ |
| Relationship Memory | ❌ |
| Session (`platform_sessions`) | ❌ |
| Reflection | ❌ |
| Journey | ❌ |

**FS-005A exit criteria:**

- [x] Six objects defined with immutability rules
- [x] Phase 2 deliverable mapping
- [x] Per-object schema sketches (TypeScript + SQL)
- [x] DB migration applied via `db:migrate`
- [x] Domain smoke test
- [x] Wisewave review — Approved with Notes (9.6/10)
- [x] Authorship on mutable objects

---

## Step 3 — FS-006 (Personal Integration Session) ✅

**Depends on:** FS-005A domain model ✅

| Artifact | Path |
|----------|------|
| Spec v1 | `docs/specs/personal-integration/FS006_PERSONAL_INTEGRATION_SESSION_v1.md` |
| FS-006.1 follow-up | `docs/specs/personal-integration/FS006_1_PERSONAL_INTEGRATION_FOLLOWUP_v1.md` |
| Orchestration | `lib/personal-integration/` |
| Prep page | `/integration/prep/[sessionId]` |
| Follow-up page | `/integration/follow-up/[sessionId]` |
| Facilitator console | `/integration/facilitator` |
| Smoke | `npm run smoke:personal-integration` |

| Area | Scope |
|------|--------|
| Product flow | Book ✅ → Prep ✅ → Live session ✅ → Follow-up ✅ |
| Domain objects | Session, Reflection, Soul Blueprint (read) |
| Wisewave role | Prep + reflection support — facilitator primary |

**Env (FS-006.1):** `PERSONAL_INTEGRATION_FACILITATOR_KEY`, `RESEND_API_KEY` (optional emails)

---

## Step 4 — FS-007 (Wisewave API) ✅

**Depends on:** FS-005A + FS-005 schema versioning ✅

| Artifact | Path |
|----------|------|
| Spec v1 | `docs/specs/wisewave-api/FS007_WISEWAVE_API_v1.md` |
| Orchestration | `lib/wisewave/` |
| Reflect UI | `/reflect`, `/reflect/[sessionId]` |
| Smoke | `npm run smoke:wisewave` |

| Area | Scope |
|------|--------|
| Domain objects | Session, Relationship Memory, Soul Blueprint (read), Expression Profile (read) |
| Orchestration | Nine Reasoning Layers → audit JSON per turn |
| QA | Relationship QA (behaviour validation + auto-revision) |

**Env:** `WISEWAVE_API_KEY` (optional server auth), `POSTGRES_URL`

**Deferred:** External LLM provider, full Expression write path (FS-008)

---

## Step 5 — FS-008 (Membership & Living Blueprint) ✅

| Artifact | Path |
|----------|------|
| Spec v1 | `docs/specs/membership/FS008_MEMBERSHIP_LIVING_BLUEPRINT_v1.md` |
| Living Blueprint | `lib/living-blueprint/` |
| Dashboard | `/living-blueprint/[reportId]` |
| Smoke | `npm run smoke:membership` |

| Area | Scope |
|------|--------|
| Domain objects | Journey, Expression Profile (write), Reflection, Relationship Memory |
| Living Blueprint | Immutable Blueprint + dynamic Expression + 4 memory layers |
| QA | Continuity QA on snapshot presentation |

**Access v1:** Full Report entitlement required. Separate membership SKU deferred.

**Before production push:** see [DEPLOY_REMINDERS.md](./DEPLOY_REMINDERS.md) (`WISEWAVE_API_KEY`, etc.).

---

## Related docs

- `docs/governance/README.md` — 12-doc governance pack
- `docs/specs/canonical-soul-blueprint/README.md` — FS-005 package index
- `PHASE2_SPEC.md` — older platform spec (2A checkout — largely shipped)
