# FS-008 — Membership & Living Blueprint

**Version:** 1.0  
**Owner:** Nova  
**Status:** Foundation shipped  
**Builds on:** FS-005A domain model, FS-007 Wisewave API

---

## 1. Purpose

FS-008 introduces the **Living Blueprint** — immutable Soul Blueprint + dynamic Expression, Journey, and four-layer Relationship Memory — for entitled Full Report members.

One Soul Blueprint. Expression evolves. Journey composes continuity over time.

---

## 2. Living Blueprint model

```text
Soul Blueprint (immutable, read-only)
       +
Expression Profile (member-updatable stages)
       +
Relationship Memory (4 layers: blueprint, reflection, expression, journey)
       +
Journey (membership arc + Living Blueprint reviews)
       +
Reflections (user-owned)
```

---

## 3. Membership v1 scope

| Feature | Status |
|---------|--------|
| Living Blueprint dashboard | ✅ `/living-blueprint/[reportId]` |
| Expression update (member) | ✅ PATCH `/api/membership/expression` |
| Membership check-in | ✅ POST `/api/membership/check-in` → `membership_checkin` session |
| Four memory layers | ✅ `memory_layer` column + UI grouping |
| Continuity QA | ✅ Presentation audit on snapshot |
| Journey auto-activate | ✅ On first dashboard load (entitled users) |
| Separate membership SKU / billing | ⏳ Deferred |

**Access v1:** Requires Full Report entitlement + magic-link session (same as `/my-report`).

---

## 4. API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/membership/living-blueprint?reportId=` | GET | Snapshot + continuity QA |
| `/api/membership/expression` | PATCH | Update Expression stage |
| `/api/membership/check-in` | POST | Check-in + review timestamp |

---

## 5. Memory layer mapping (Doc 9)

| `kind` (v1) | `memory_layer` |
|-------------|----------------|
| theme | journey |
| practice | journey |
| question | reflection |
| insight | reflection |
| (anchor) | blueprint |
| (expression state) | expression |

---

## 6. Artifacts

| Path | Purpose |
|------|---------|
| `lib/living-blueprint/` | Snapshot builder, continuity QA, membership actions |
| `lib/db/journeys.ts` | Journey CRUD |
| `db/platform-domain-v1.5-membership.sql` | `memory_layer` column |
| `npm run smoke:membership` | Wiring smoke |

---

## 7. FS-008 exit checklist

- [x] Living Blueprint page + API
- [x] Expression write path (member)
- [x] Journey + check-in sessions
- [x] Four memory layers
- [x] Continuity QA
- [ ] Separate membership product / Stripe tier
- [ ] Wisewave review (optional)

---

## 8. Related

- [DEPLOY_REMINDERS.md](../phase-2/DEPLOY_REMINDERS.md)
- [PLATFORM_DOMAIN_MODEL_v1.md](../canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md)
