# Pre-Session Intake v1.1 · Easy Access Edition — Return Package

## Copy diff (client-facing)

| Area | Before (v1.0) | After (v1.1 Easy Access) |
|------|---------------|---------------------------|
| Intro | Facilitator prepare with Soul Blueprint | Perfect answer not needed; a few simple words; Consultant knows where to begin |
| Time | (none) | About 3–5 minutes |
| Q1 | Long “what brings you” essay | Multi-select explore topics + optional short note |
| Q2 | Deep “lived experience” essay | Short “what has been happening recently” |
| Q3 | Required “why now” essay | Optional multi-select + optional note |
| Q4 | Required growth edge + intention essays | Multi-select “what would feel helpful” (not a promise) |
| Q5 | Support style + facilitator notes | Optional “anything to know” |
| Boundary | Multi consent + crisis/clinical selects | Single reflective-service acknowledgement |
| Removed | Growth Edge, patterns, stuck, tried, support style, crisis triage as required form | Archived; Facilitator Workspace private prep only |

## Schema compatibility

- `INTAKE_FORM_VERSION` = `pre-session-intake-v1.1-easy-access`
- Client renders only `INTAKE_SECTIONS`
- `LEGACY_INTAKE_SECTIONS_V1_0` / `LEGACY_INTAKE_FIELD_IDS` retained for historical JSON
- Submit validation: explore topics + what is happening + helpful outcomes + scope acknowledgement
- No Growth Edge write from intake submit
- Facilitator Intake tab shows `preparation` panel (Main area / What is happening / Why now / Helpful / Anything to know)
- Blueprint Context remains separate tab; private notes unchanged

## Role title

Client-facing: **Blueprint Integration Consultant**  
Internal IDs: `facilitator_*` unchanged

## Evidence

- Lumen: `qa-artifacts/LUMEN_QA_INTAKE_EASY_ACCESS_V1.md`
- Optional live screenshots: set `QA_INTAKE_URL` then run `npx tsx scripts/lumen-qa-intake-easy-access-v1.ts`
