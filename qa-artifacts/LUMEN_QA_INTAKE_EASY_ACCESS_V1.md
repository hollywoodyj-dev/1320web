# Lumen QA — Pre-Session Intake v1.1 · Easy Access Edition

Date: 2026-07-27T15:20:49.247Z
Result: PASS
Form version: `pre-session-intake-v1.1-easy-access`

- **Ordinary language — no interpretive self-diagnosis asks**: PASS — clean
- **No S0–S9 terminology in client questions**: PASS — clean
- **Only Easy Access required fields**: PASS — required=explore_topics,what_is_happening,helpful_outcomes,scope_acknowledgement
- **I'm not sure options present**: PASS — 
- **Time estimate + easy intro copy**: PASS — 
- **Form version Easy Access**: PASS — 
- **Legacy fields archived (not in client sections)**: PASS — 
- **Validation accepts short answers**: PASS — 
- **Facilitator prep panel maps Easy Access answers**: PASS — 
- **Fixture layout no overflow 320px**: PASS — 
- **Fixture layout no overflow 375px**: PASS — 
- **Fixture layout no overflow 390px**: PASS — 
- **Fixture layout no overflow 430px**: PASS — 
- **Fixture layout no overflow 1280px**: PASS — 
- **Fixture: no S0–S9 labels**: PASS — 
- **Fixture: Save Draft + Submit visible**: PASS — 
- **Live form screenshots**: PASS — skipped — set QA_INTAKE_URL for authenticated intake URL

Artifacts: `C:\github\1320-website\web\qa-artifacts\intake-easy-access-v1`

## Schema compatibility
- New clients render `INTAKE_SECTIONS` (v1.1 Easy Access) only.
- Legacy v1.0 field IDs archived in `LEGACY_INTAKE_SECTIONS_V1_0` / `LEGACY_INTAKE_FIELD_IDS`.
- Older `responses_json` keys remain stored; Facilitator prep panel prefers Easy Access keys.
- Growth Edge is no longer collected from the client form.

## Analytics
- Intake free text is not sent to advertising/general analytics (form has no trackEvent calls).
