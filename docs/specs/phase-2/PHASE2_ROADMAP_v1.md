# Phase 2 Roadmap

**Status:** FS-005 approved — FS-005A in progress  
**Authority:** Wisewave Phase 1 sign-off (2026-07-02) + FS-005 review (9.8/10)  
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
| 2.5 | **FS-005A** | 1320 Platform Domain Model | 🔄 In progress |
| 3 | FS-006 | Personal Integration Session | ⏳ After FS-005A |
| 4 | FS-007 | Wisewave API | ⏳ Pending |
| 5 | FS-008 | Membership & Living Blueprint | ⏳ Pending |

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

## Step 2.5 — FS-005A (current)

**Goal:** Define six core domain objects so FS-006/007/008 share one model.

| Artifact | Path |
|----------|------|
| Domain model | `docs/specs/canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md` |

**Six core objects:**

| Object | Immutable |
|--------|-----------|
| Soul Blueprint | ✅ |
| Expression Profile | ❌ |
| Relationship Memory | ❌ |
| Session | ❌ |
| Reflection | ❌ |
| Journey | ❌ |

**FS-005A exit criteria:**

- [x] Six objects defined with immutability rules
- [x] Phase 2 deliverable mapping
- [ ] Wisewave quick review (optional)
- [ ] Per-object schema sketches (FS-006 kickoff)

---

## Step 3 — FS-006 (Personal Integration Session)

**Depends on:** FS-005A domain model.

| Area | Scope |
|------|--------|
| Product flow | Book → prep → session → follow-up |
| Domain objects | Session, Reflection, Soul Blueprint (read) |
| Wisewave role | Prep + reflection support — facilitator primary |

---

## Step 4 — FS-007 (Wisewave API)

**Depends on:** FS-005A + FS-005 schema versioning.

| Area | Scope |
|------|--------|
| Domain objects | Session, Relationship Memory, Soul Blueprint (read), Expression Profile |
| Orchestration | Reasoning Architecture (Doc 12) |
| QA | Relationship QA layer |

---

## Step 5 — FS-008 (Membership & Living Blueprint)

| Area | Scope |
|------|--------|
| Domain objects | Journey, Expression Profile, Reflection, Relationship Memory |
| Living Blueprint | Immutable Blueprint + dynamic Expression |
| QA | Continuity QA |

---

## Related docs

- `docs/governance/README.md` — 12-doc governance pack
- `docs/specs/canonical-soul-blueprint/README.md` — FS-005 package index
- `PHASE2_SPEC.md` — older platform spec (2A checkout — largely shipped)
