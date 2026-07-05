# FS-006.1 — Personal Integration Follow-up & Facilitator Ops

**Version:** 1.0  
**Owner:** Nova  
**Status:** Shipped  
**Builds on:** [FS006_PERSONAL_INTEGRATION_SESSION_v1.md](./FS006_PERSONAL_INTEGRATION_SESSION_v1.md)

---

## 1. Purpose

FS-006.1 completes the Personal Integration lifecycle:

```text
Book → Prep → Live session (facilitator) → Follow-up reflection
```

---

## 2. What shipped

| Capability | Implementation |
|------------|----------------|
| Prep link email | `lib/email/send-prep-link.ts` — on booking when `RESEND_API_KEY` set |
| Facilitator console | `/integration/facilitator` + API with `PERSONAL_INTEGRATION_FACILITATOR_KEY` |
| Session status workflow | `scheduled` → `active` → `completed` / `cancelled` |
| Facilitator summary | `platform_sessions.summary` (`authorship: facilitator`) |
| Follow-up token | `follow_up_access_token` generated on first `completed` |
| Follow-up page | `/integration/follow-up/[sessionId]?token=…` |
| Follow-up email | `lib/email/send-follow-up-link.ts` — on first completion when Resend configured |
| User follow-up reflection | `reflections` (`session_note`, `authorship: user`) |

---

## 3. Environment

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Send prep + follow-up emails (optional — logs URL in dev without) |
| `EMAIL_FROM` | From address (defaults to `1320 Soul Code <noreply@1320soulcode.com>`) |
| `PERSONAL_INTEGRATION_FACILITATOR_KEY` | Bearer token for facilitator API + console |

---

## 4. API routes

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/personal-integration/facilitator/sessions` | GET | Facilitator key | List sessions |
| `/api/personal-integration/facilitator/sessions` | PATCH | Facilitator key | Update status + summary |
| `/api/personal-integration/follow-up` | POST | Follow-up token | Save user reflection |

---

## 5. Pages

| Route | Audience |
|-------|----------|
| `/integration/facilitator` | Internal facilitator ops |
| `/integration/follow-up/[sessionId]?token=…` | Client post-session |

---

## 6. FS-006.1 exit checklist

- [x] Facilitator status + summary workflow
- [x] Follow-up reflection capture
- [x] Prep link email automation
- [x] Follow-up link email on session completion
- [x] Authorship preserved (`facilitator` / `user`)
- [ ] Wisewave review (optional)

---

## 7. Related

- [PHASE2_ROADMAP_v1.md](../phase-2/PHASE2_ROADMAP_v1.md)
- [WISEWAVE_SESSION_ARCHITECTURE_v1.md](../../governance/WISEWAVE_SESSION_ARCHITECTURE_v1.md)
