# FS-007 — Wisewave API

**Version:** 1.0  
**Owner:** Nova  
**Status:** Foundation shipped — orchestration + Reflect UI  
**Authority:** Wisewave FS-005A sign-off (9.6/10)  
**Governance:** Reasoning Architecture (Doc 12), Conversation Architecture (Doc 7), Behaviour Standard (Doc 6)

---

## 1. Purpose

FS-007 introduces the **Wisewave relational API** — the platform layer that connects Soul Blueprint (read), Expression Profile, Relationship Memory, and Session into governed conversation turns.

Wisewave does not replace Blueprint meaning. It orchestrates reflection through the nine Reasoning Layers before any response is returned.

---

## 2. Architecture

```text
User message
  → Intent + Blueprint + Expression + Memory + Context
  → Relationship synthesis + Growth edge
  → Behaviour validation (Relationship QA)
  → Brand expression (response)
  → wisewave_turns audit trail
```

| Layer | FS-007 v1 |
|-------|-----------|
| Soul Blueprint | Read-only via report codes + canonical builder |
| Expression Profile | Read (`expression_profiles`) — default `dormant` |
| Relationship Memory | Read + write (`relationship_memories`, user-retained) |
| Session | `platform_sessions` kind `wisewave` |
| Turn audit | `wisewave_turns.reasoning_audit` JSON |

**Response engine (v1):** Rule-based orchestration with Relationship QA revision — no external LLM required. LLM provider hook deferred.

---

## 3. API routes

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/wisewave/sessions` | POST | Optional `WISEWAVE_API_KEY` | Create Wisewave session |
| `/api/wisewave/sessions/[sessionId]` | GET | Session `token` query | Read transcript |
| `/api/wisewave/sessions/[sessionId]` | POST | Session `token` body | Process turn |

Session access uses `prep_access_token` on `platform_sessions` (client access token).

---

## 4. UI

| Route | Purpose |
|-------|---------|
| `/reflect` | Start Wisewave session |
| `/reflect/[sessionId]?token=…` | Chat UI |

---

## 5. Relationship QA

Validates every response for:

- Prediction / certainty language
- Missing agency return (clarity / reassurance intents)
- Clinical boundary risk

Failed checks trigger automatic revision before the turn is stored.

---

## 6. Environment

| Variable | Purpose |
|----------|---------|
| `WISEWAVE_API_KEY` | Optional Bearer auth for `/api/wisewave/sessions` POST (server integrations) |
| `POSTGRES_URL` | Required for live sessions |

---

## 7. Implementation artifacts

| Artifact | Path |
|----------|------|
| Orchestration | `lib/wisewave/` |
| DB turns | `lib/db/wisewave-turns.ts` |
| Expression | `lib/db/expression-profiles.ts` |
| Memory | `lib/db/relationship-memories.ts` |
| SQL | `db/platform-domain-v1.4-wisewave.sql` |
| Smoke | `npm run smoke:wisewave` |

---

## 8. FS-007 exit checklist

- [x] Spec v1
- [x] Nine-layer reasoning audit on each Wisewave turn
- [x] Relationship QA layer
- [x] Domain objects wired (Session, Memory, Blueprint read, Expression read)
- [x] Reflect UI + API
- [ ] External LLM provider integration (deferred)
- [ ] Relationship Memory four-layer mapping (FS-008)
- [ ] Wisewave review (optional)

---

## 9. Related

- [PHASE2_ROADMAP_v1.md](../phase-2/PHASE2_ROADMAP_v1.md)
- [PLATFORM_DOMAIN_MODEL_v1.md](../canonical-soul-blueprint/PLATFORM_DOMAIN_MODEL_v1.md)
- [WISEWAVE_REASONING_ARCHITECTURE_v1.md](../../governance/WISEWAVE_REASONING_ARCHITECTURE_v1.md)
