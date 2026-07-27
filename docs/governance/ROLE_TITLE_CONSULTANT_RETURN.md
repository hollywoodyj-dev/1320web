# Role Title Refinement — Blueprint Integration Consultant

## Approved titles

| Form | Text |
|------|------|
| Full | 1320 Soul Blueprint Integration Consultant |
| Short | Blueprint Integration Consultant |
| ZH | 1320 灵魂蓝图整合顾问 |
| ZH short | 蓝图整合顾问 |

Shared source: `lib/personal-integration/role-titles.ts`

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

- `qa-artifacts/LUMEN_QA_ROLE_TITLE_CONSULTANT.md`
- Screenshots: `qa-artifacts/role-title-consultant/`
