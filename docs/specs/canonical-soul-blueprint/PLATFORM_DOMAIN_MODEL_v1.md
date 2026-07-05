# 1320 Platform Domain Model

**FS-005A · Version 1.0**  
**Owner:** Nova  
**Status:** Approved with Notes (9.6/10) — FS-006 unlocked  
**Authority:** Wisewave FS-005A sign-off (2026-07-05)  
**Builds on:** [CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md](./CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md)

---

## 1. Purpose

FS-005 defined **architecture**. FS-005A defines the **domain objects** every Phase 2 capability shares.

Without this model, FS-006 (Personal Integration), FS-007 (Wisewave API), and FS-008 (Membership) risk diverging into separate data models.

All future capabilities must compose from these six core objects — not invent parallel ones.

---

## 2. Domain stack

```text
Soul Blueprint (immutable)
       ↓
Expression Profile (dynamic)
       ↓
Relationship Memory + Reflection + Session
       ↓
Journey (long-term)
       ↓
Presentation (Report, Wisewave, Dashboard, Voice, …)
```

---

## 3. Core objects

| Core object | Immutable | Description |
|-------------|-----------|-------------|
| **Soul Blueprint** | ✅ | The canonical symbolic structure calculated from birth data. One per birth date + calculation version. Source: `buildCanonicalReport()`. |
| **Expression Profile** | ❌ | Current lived expression state (Expression Framework™). Dormant → Emerging → Active → Embodied → Integrated. Never overwrites Blueprint. |
| **Relationship Memory** | ❌ | User-chosen long-term reflections, themes, and continuity (light touch — not surveillance). See governance Doc 9. |
| **Session** | ❌ | One complete context: a Wisewave conversation, Personal Integration Session, or Membership check-in chapter. Stored as `platform_sessions` (not auth `sessions`). |
| **Reflection** | ❌ | A single user record: journal entry, practice note, Growth Edge observation, or explicit insight. |
| **Journey** | ❌ | Long-term Membership arc — recurring themes, expression movement, Living Blueprint Reviews over time. |

---

## 4. Object relationships

```text
Soul Blueprint
  ├── has many → Sessions (each references Blueprint, never redefines it)
  ├── has one active → Expression Profile (evolves over time)
  ├── accumulates → Reflections (user-owned, deletable)
  ├── summarized in → Relationship Memory (continuity, not identity)
  └── tracked as → Journey (Membership long arc)
```

**Rules:**

- Every Session **reads** Soul Blueprint; none **writes** to it.
- Expression Profile **relates to** Blueprint; it does not **replace** Blueprint.
- Relationship Memory stores patterns of exploration — not fixed personality labels.
- Journey composes Sessions + Reflections + Expression movement — not a second Blueprint.

---

## 5. Mapping to Phase 2 deliverables

| Deliverable | Primary objects |
|-------------|-----------------|
| **FS-005** (done) | Soul Blueprint |
| **FS-005A** (this doc) | All six objects — domain contract |
| **FS-006** Personal Integration | Session, Reflection, Soul Blueprint (read), Expression Profile (read) |
| **FS-007** Wisewave API | Session, Relationship Memory, Soul Blueprint (read), Expression Profile (read/write) |
| **FS-008** Membership | Journey, Expression Profile, Reflection, Relationship Memory |

---

## 6. Implementation status (current codebase)

| Object | Status | Notes |
|--------|--------|-------|
| Soul Blueprint | ✅ Shipped | `lib/canonical-report/`, `soul_reports` table, `lib/platform-domain/soul-blueprint.ts` |
| Expression Profile | ✅ Schema + types | `expression_profiles` table — FS-008 writes |
| Relationship Memory | ✅ Schema + types | `relationship_memories` table — FS-007/008 |
| Session | ✅ Schema + types | `platform_sessions` table — FS-006/007 |
| Reflection | ✅ Schema + types | `reflections` table — FS-006 |
| Journey | ✅ Schema + types | `journeys` table — FS-008 |

**Code:** `lib/platform-domain/` · **DB:** `db/platform-domain-v1.sql` · **Smoke:** `npm run smoke:platform-domain`

---

## 7. Schema reference (v1)

### Soul Blueprint (immutable)

| Store | Key fields |
|-------|------------|
| `soul_reports` | `id`, `user_id`, birth fields, `s*_code`, `combination_signature` |
| Runtime payload | Rebuilt via `buildCanonicalReport()` — never persisted as mutable JSON |

TypeScript: `SoulBlueprintRef`, `SoulBlueprintSnapshot` in `lib/platform-domain/types.ts`.

### Expression Profile

| Column | Type | Notes |
|--------|------|-------|
| `state` | enum | `dormant` → `integrated` |
| `notes` | JSONB | Optional structured notes |
| Unique | `(user_id, report_id)` | One active profile per Blueprint |

### Relationship Memory

| Column | Type | Notes |
|--------|------|-------|
| `kind` | enum | `theme`, `question`, `insight`, `practice` |
| `content` | text | User-facing continuity item |
| `user_retained` | boolean | User can remove from continuity |

### Platform Session

| Column | Type | Notes |
|--------|------|-------|
| `kind` | enum | `wisewave`, `personal_integration`, `membership_checkin`, `first_reflection` |
| `status` | enum | `scheduled`, `active`, `completed`, `cancelled` |
| `growth_edge` | text | Session focus (FS-006) |
| `summary` | text | Post-session summary |

**Naming:** Auth cookie sessions remain in `sessions` (Phase 2A). Relationship sessions use `platform_sessions`.

### Reflection

| Column | Type | Notes |
|--------|------|-------|
| `kind` | enum | `journal`, `practice`, `growth_edge`, `session_note` |
| `body` | text | User-owned content |
| `deleted_at` | timestamptz | Soft delete |

### Journey

| Column | Type | Notes |
|--------|------|-------|
| `status` | enum | `active`, `paused`, `archived` |
| `membership_tier` | text | FS-008 |
| `meta` | JSONB | Living Blueprint Review metadata |
| Unique | `(user_id, report_id)` | One journey arc per Blueprint |

Apply migration: `npm run db:migrate` (runs `schema.sql`, `platform-domain-v1.sql`, `platform-domain-v1.1-authorship.sql`).

### Authorship / provenance (v1.1)

Every **mutable** object includes `authorship`:

| Value | Meaning |
|-------|---------|
| `user` | User-authored |
| `facilitator` | Personal Integration facilitator |
| `wisewave` | Wisewave-generated |
| `system` | System-derived |

Required for trust, review, deletion, and audit (Wisewave FS-005A note).

### Relationship Memory — future layer mapping

v1 kinds (`theme`, `question`, `insight`, `practice`) are sufficient for FS-006.  
Deferred: map to governance four memory layers — Blueprint, Reflection, Expression, Journey Memory (FS-007/008).

---

## 8. FS-005A exit checklist

- [x] Six core objects defined
- [x] Immutability rules per object
- [x] Phase 2 deliverable mapping
- [x] Per-object schema sketches (TypeScript + SQL)
- [x] DB migration (`db/platform-domain-v1.sql`)
- [x] Domain smoke test (`smoke:platform-domain`)
- [x] Wisewave review — **Approved with Notes (9.6/10)** — see `WISEWAVE_FS005A_SIGNOFF.md`
- [x] Authorship on mutable objects (v1.1)

---

## 9. Related artifacts

| Artifact | Path |
|----------|------|
| Canonical Soul Blueprint Spec v1.1 | `CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md` |
| Wisewave FS-005A sign-off | `WISEWAVE_FS005A_SIGNOFF.md` |
| Phase 2 roadmap | `../phase-2/PHASE2_ROADMAP_v1.md` |
| Relationship Memory (governance) | `../../governance/WISEWAVE_RELATIONSHIP_MEMORY_ARCHITECTURE_v1.md` |
| TypeScript domain types | `../../../lib/platform-domain/` |
| SQL migration | `../../../db/platform-domain-v1.sql` |
