# Personal Integration Operating Flow — Roadmap

**Status:** Phase 1 accepted and closed (2026-07-22)  
**Authority:** Founder / Wisewave operating clarification (2026-07-23)  
**Related:** FS-006, Operating Flow Phase 1 ship (`4714fff` / Lumen QA `bed5d75`)

---

## Phase 1 — Closed

Personal Integration Operating Flow Phase 1 is **accepted as shipped**.

Operating model for the initial launch period:

```text
One Facilitator
  → One protected internal workspace
  → Multiple client sessions
```

Shared `PERSONAL_INTEGRATION_FACILITATOR_KEY` remains the Phase 1 access model.

### Keep in place (no change required)

- `PERSONAL_INTEGRATION_FACILITATOR_KEY` configured
- Server-side key validation
- No session data loaded before successful validation
- No secret or environment-variable name exposed in the UI
- `noindex`, `noarchive`, and sensitive-response `no-store`
- Private facilitator notes separated from client-facing summaries
- Publish / send actions require Facilitator review
- Assignment-ready DB fields and audit structure retained for future expansion

### Not required while one Facilitator operates

- Separate facilitator accounts
- Facilitator onboarding
- Assignment-based record visibility
- Admin reassignment workflows
- Multi-facilitator permission management

**No architectural changes are required now.**

---

## Revised Phase 2 order

### Phase 2A · 7-Day Practice Tracker

Lightweight reflective practice flow connected to the **published** Session Summary.

Required direction:

- One Growth Edge
- One agreed practice
- Day 1–7 optional reflection
- States: `in_progress` / `paused` / `completed` (plus not-started as needed)
- No streaks
- No ranking
- No failure language
- No pressure-based reminders

### Phase 2B · Follow-Up Intake and Session Continuity

Shorter than Pre-Session Intake. Carry forward:

- Previous Session Summary
- Previous Growth Edge
- Previous conscious choice
- Previous practice
- What changed
- What became easier
- What remains difficult
- What the client wants to explore next

### Phase 2C · Wisewave Context Bridge

Wisewave may receive **only** published, client-visible Session content:

- Session Focus
- Core Recognition
- Existing Resource
- Growth Edge
- Conscious Choice
- 7-Day Practice
- Reflection Question
- Relevant Blueprint Layers

**Wisewave must never receive Facilitator Private Notes.**

### Phase 2D · Summary PDF

Simple client-facing PDF from the published Integration Summary.

Delivery surface only — not a separate content system.

---

## Future expansion gate · Facilitator accounts

Proper facilitator accounts and assignment authorization begin **only when a second Facilitator is preparing to access real client sessions**.

At that gate, required scope includes:

- Individual facilitator authentication
- Assigned-session authorization
- Admin reassignment
- Access revocation
- Record-level audit history
- Facilitator onboarding and offboarding

This upgrade must use the **assignment-ready fields already shipped** in Phase 1 and **must not** require redesigning the Session data model.

Until that gate is reached, facilitator-account development remains **deferred**.
