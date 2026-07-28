# Pre-Session Intake v1.1 · Easy Access Edition — Return Package

**Status:** ✅ Accepted and Closed (Wisewave, 2026-07-28)  
**Implementation commit:** `7c23421`  
**Lumen QA:** PASS — `qa-artifacts/LUMEN_QA_INTAKE_EASY_ACCESS_V1.md`

## Final decision

Wisewave confirms the Intake is the correct doorway into Personal Integration:

- Easy to enter
- Safe to answer
- No need to sound insightful

The client describes what is happening. The Blueprint Integration Consultant helps explore what it may mean.

## Accepted structure

| # | Question | Required |
|---|----------|----------|
| Q1 | What would you like to explore? (topics) | Required |
| Q1 note | Optional short note | Optional |
| Q2 | What has been happening? | Required |
| Q3 | Why does this feel important now? | Optional |
| Q4 | What would feel helpful? | Required |
| Q5 | Anything you would like the Consultant to know? | Optional |
| — | Boundary acknowledgement | Required |

Approx. completion time: 3–5 minutes.

## Governance boundary (locked)

Intake must **not** re-expand into client self-diagnosis of:

Growth Edge · shadow / protective pattern · Blueprint activation · receiving block · sovereignty state · mission expression · embodiment level · what life is mirroring · what integration should look like

Those belong in live Session exploration and private Consultant preparation.

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
| Removed | Growth Edge, patterns, stuck, tried, support style, crisis triage as required form | Archived; private Consultant Workspace prep only |

## Schema compatibility

- `INTAKE_FORM_VERSION` = `pre-session-intake-v1.1-easy-access`
- Client renders only `INTAKE_SECTIONS`
- `LEGACY_INTAKE_SECTIONS_V1_0` / `LEGACY_INTAKE_FIELD_IDS` retained for historical JSON
- Submit validation: explore topics + what is happening + helpful outcomes + scope acknowledgement
- No Growth Edge write from intake submit
- Consultant Workspace Intake tab shows `preparation` panel (Main area / What is happening / Why now / Helpful / Anything to know)
- Blueprint Context remains separate; private notes unchanged
- Intake free text excluded from analytics

## Role title

Client-facing form and related copy: **Blueprint Integration Consultant** (`ROLE_TITLE_SHORT`)  
Internal IDs: `facilitator_id` · `facilitator_notes` · `facilitator_workspace` unchanged — no DB/auth migration

## Watchpoint (non-blocking)

Authenticated screenshot pass may complete later when a safe QA session fixture is available, provided Draft/Submit behaviour and Workspace answer mapping remain correct and no client PII is exposed in artifacts.

## Evidence

- Lumen: `qa-artifacts/LUMEN_QA_INTAKE_EASY_ACCESS_V1.md`
- Responsive fixtures: `qa-artifacts/intake-easy-access-v1/`
- Optional live screenshots: set `QA_INTAKE_URL` then run `npx tsx scripts/lumen-qa-intake-easy-access-v1.ts`
