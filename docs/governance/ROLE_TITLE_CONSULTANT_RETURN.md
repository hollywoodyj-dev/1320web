# Role Title Refinement — Blueprint Integration Consultant

**Status:** ✅ Accepted and Closed (Wisewave, 2026-07-28)  
**Implementation commit:** `64ee0af`  
**Lumen QA:** PASS — `qa-artifacts/LUMEN_QA_ROLE_TITLE_CONSULTANT.md`

## Canonical titles

| Form | Text |
|------|------|
| Full | 1320 Soul Blueprint Integration Consultant |
| Short | Blueprint Integration Consultant |
| ZH | 1320 灵魂蓝图整合顾问 |
| ZH short | 蓝图整合顾问 |

**Single source of truth:** `lib/personal-integration/role-titles.ts`

## Architecture distinction (locked)

| Layer | Term |
|-------|------|
| Internal operational role | Facilitator (`facilitator_id`, `assigned_facilitator_id`, Facilitator Console, auth) |
| Client-facing professional title | Blueprint Integration Consultant |

No database migration, permission migration, or role-model change.

## Governance posture (locked)

Service posture: **Facilitative · Reflective · Non-directive**

The Blueprint Integration Consultant may:

- help the client connect the Blueprint with lived experience
- support recognition of themes and recurring patterns
- offer structured reflection
- help the client identify a possible next step
- support integration into real life

The title must **not** imply that the Consultant:

- defines the client
- owns the correct interpretation of the Blueprint
- predicts future outcomes
- diagnoses psychological or medical conditions
- determines the client’s mission or life direction
- makes decisions on the client’s behalf
- holds spiritual authority over the client

The user remains the author and decision-maker in their own life.

## Accepted client journey coverage

Booking → Payment → Scheduling → Intake → Preparation → Session → Summary → Follow-up

Surfaces accepted: Personal Integration booking · meet-with positioning · role boundary · Booking Success · Pre-Session Intake · Session Prep · Account summary · reminder emails · client summary emails · summary template defaults · Reflect CTA · Disclaimer

## Copy diff (client-facing)

| Surface | Before | After |
|---------|--------|-------|
| Booking hero | (no meet line) | Meet With a Blueprint Integration Consultant + role boundary |
| Booking FAQ | (no who question) | Who will I meet with? → Consultant boundary |
| Booking success | Facilitator (earlier) | Blueprint Integration Consultant |
| Intake intro | Facilitator / earlier Consultant | This form helps your Blueprint Integration Consultant… |
| Prep notes | for your facilitator | for your Blueprint Integration Consultant |
| Account summary | after your Facilitator publishes | after your Blueprint Integration Consultant publishes |
| Account boundary | Facilitator private notes | Private session notes |
| Reminder email | your Facilitator | your Blueprint Integration Consultant |
| Summary email | Your Facilitator has published | Your Blueprint Integration Consultant has published |
| Summary default label | 1320 Facilitator | 1320 Soul Blueprint Integration Consultant |
| Summary field label | Facilitator | Blueprint Integration Consultant |
| Reflect CTA | Prefer a live facilitator? | Prefer a live Blueprint Integration Consultant? |
| Disclaimer | Consultant + posture | Consultant + shared ROLE_BOUNDARY.posture |

## Unchanged (internal)

- `facilitator_id`, `assigned_facilitator_id`, `facilitator_notes`, workspace routes
- Facilitator Console UI labels
- No DB migration / auth changes

## Evidence

- Return: this document
- Lumen: `qa-artifacts/LUMEN_QA_ROLE_TITLE_CONSULTANT.md`
- Screenshots: `qa-artifacts/role-title-consultant/`
