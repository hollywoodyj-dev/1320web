# 1320 Platform Domain Model

**FS-005A · Version 1.0**  
**Owner:** Nova  
**Status:** Draft — Phase 2 Step 2.5  
**Authority:** Wisewave FS-005 review (Approved with Strategic Notes, 9.8/10)  
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
| **Session** | ❌ | One complete context: a Wisewave conversation, Personal Integration Session, or Membership check-in chapter. |
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
| Soul Blueprint | ✅ Shipped | `lib/canonical-report/`, `soul_reports` table |
| Expression Profile | ⏳ Not built | FS-008 |
| Relationship Memory | ⏳ Not built | FS-007 / FS-008 |
| Session | ⏳ Partial | Booking exists; session model not formalized |
| Reflection | ⏳ Not built | Journal UI exists in report; no persistent user store |
| Journey | ⏳ Not built | FS-008 |

---

## 7. FS-005A exit checklist

- [x] Six core objects defined
- [x] Immutability rules per object
- [x] Phase 2 deliverable mapping
- [ ] Wisewave review of domain model
- [ ] Schema sketches per object (FS-006 kickoff)
- [ ] DB migration plan (when Expression / Session persist)

---

## 8. Related artifacts

| Artifact | Path |
|----------|------|
| Canonical Soul Blueprint Spec v1.1 | `CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md` |
| Wisewave FS-005 sign-off | `WISEWAVE_FS005_SIGNOFF.md` |
| Phase 2 roadmap | `../phase-2/PHASE2_ROADMAP_v1.md` |
| Relationship Memory (governance) | `../../governance/WISEWAVE_RELATIONSHIP_MEMORY_ARCHITECTURE_v1.md` |
