# FS-006 — Personal Integration Session

**Version:** 1.0  
**Owner:** Nova  
**Status:** Book → Prep → Follow-up shipped (FS-006 + FS-006.1) — facilitator ops live  
**Authority:** Wisewave FS-005A sign-off (9.6/10)  
**Domain model:** [PLATFORM_DOMAIN_MODEL_v1.md](../canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md)

---

## 1. Purpose

FS-006 turns the `/booking` request flow into a **platform session** — a structured chapter in the user's relationship with their Soul Blueprint.

Personal Integration is **facilitator-led** live integration. Wisewave supports prep and reflection; it does not replace the facilitator or overwrite Blueprint meaning.

---

## 2. Product flow

```text
Book (request) → Prep (growth edge + notes) → Live session (facilitator) → Follow-up (reflection)
```

| Stage | FS-006 v1 | Domain objects |
|-------|-----------|----------------|
| **Book** | ✅ Shipped | `platform_sessions`, `reflections`, `soul_reports`, `leads` |
| **Prep** | ✅ Shipped | Soul Blueprint (read), Session `growth_edge`, Reflection |
| **Live session** | ✅ Facilitator console | Session status + summary (`authorship: facilitator`) |
| **Follow-up** | ✅ FS-006.1 | Reflection `session_note`, follow-up token + email |

---

## 3. Scope boundaries

**In scope (v1):**

- Booking form creates `platform_sessions` row (`kind: personal_integration`)
- Links Soul Blueprint via `report_id` (create or reuse from birth date)
- Prep page with token-gated access (`prep_access_token`)
- User-authored `growth_edge` + optional prep reflection
- Lead capture preserved for ops follow-up

**Out of scope (v1):**

- Payment / scheduling calendar
- Wisewave API conversation (FS-007)
- Expression Profile writes (FS-008)
- Automated prep + follow-up emails when Resend configured (FS-006.1)

---

## 4. Domain mapping

| Field / object | Role |
|----------------|------|
| `platform_sessions.kind` | `personal_integration` |
| `platform_sessions.status` | `scheduled` at request |
| `platform_sessions.growth_edge` | Session focus (user-authored) |
| `platform_sessions.session_variant` | `intro` \| `deep` \| `integration` \| `not-sure` |
| `platform_sessions.summary` | Post-session facilitator note (FS-006.1) |
| `platform_sessions.authorship` | `system` at create; `user` on prep update |
| `reflections` (session_note) | Initial request message |
| `reflections` (practice) | Optional prep notes |
| Soul Blueprint | Read-only via `buildCanonicalReport()` on prep page |

---

## 5. API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/personal-integration/request` | POST | Create session + lead; returns `prepUrl` when DB configured |
| `/api/personal-integration/prep` | POST | Save growth edge + optional prep notes (token required) |
| `/api/personal-integration/follow-up` | POST | Save post-session reflection (token required) |
| `/api/personal-integration/facilitator/sessions` | GET/PATCH | Facilitator session list + status updates |

---

## 6. Pages

| Route | Purpose |
|-------|---------|
| `/booking` | Request form (existing — wired to FS-006 API) |
| `/integration/prep/[sessionId]?token=…` | Token-gated prep — Blueprint read-only + growth edge form |
| `/integration/follow-up/[sessionId]?token=…` | Post-session reflection (FS-006.1) |
| `/integration/facilitator` | Facilitator console (FS-006.1) |

---

## 7. Security

- Prep access requires `sessionId` + `prep_access_token` (32-byte hex, single-use storage)
- No auth cookie required at booking time (matches Phase 2A magic-link pattern)
- Blueprint remains immutable — prep writes only Session + Reflection

---

## 8. Implementation artifacts

| Artifact | Path |
|----------|------|
| Orchestration | `lib/personal-integration/` |
| DB access | `lib/db/platform-sessions.ts`, `lib/db/reflections.ts`, `lib/db/ensure-soul-report.ts` |
| SQL migration | `db/platform-domain-v1.2-personal-integration.sql` |
| Prep UI | `app/(site)/integration/prep/[sessionId]/page.tsx` |
| Smoke | `npm run smoke:personal-integration` |

---

## 9. FS-006 exit checklist

- [x] Spec v1
- [x] Book → platform session + lead
- [x] Prep page + API
- [x] Soul Blueprint read on prep
- [x] Authorship on mutable writes
- [x] Live session status workflow (facilitator admin) — FS-006.1
- [x] Follow-up reflection capture (FS-006.1)
- [x] Prep link email automation (FS-006.1)
- [ ] Wisewave review (optional)

---

## 10. Related docs

- [PHASE2_ROADMAP_v1.md](../phase-2/PHASE2_ROADMAP_v1.md)
- [WISEWAVE_FS005A_SIGNOFF.md](../canonical-soul-blueprint/WISEWAVE_FS005A_SIGNOFF.md)
- [WISEWAVE_SESSION_ARCHITECTURE_v1.md](../../governance/WISEWAVE_SESSION_ARCHITECTURE_v1.md)
