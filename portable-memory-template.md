# Portable Memory Template (Cross-Project Safe)

Use this file to carry only reusable working principles across projects.
Do not include private credentials, user data, or project-specific confidential facts.

## 1) Stable working principles

- Principle: Small, reversible steps beat big rewrites.
  - Why it matters: Faster validation, easier rollback, lower coordination cost.
  - How to apply: Ship in thin milestones, verify each slice, avoid bundled high-risk edits.

- Principle: Behavior evidence is the source of truth.
  - Why it matters: Config can look right while runtime still fails.
  - How to apply: Require runtime checks (response quality, logs, tool calls, persistence) before calling a fix complete.

- Principle: Category and scope discipline protect product clarity.
  - Why it matters: Drift usually starts from "small" wording or scope expansions.
  - How to apply: Keep UX/copy aligned to agreed boundaries, surface trade-offs early, reject unapproved expansion.

## 2) Preferred implementation habits

- Keep changes: Focused by intent (one concern per batch), with clear before/after rationale.
- Validation routine: Run lint/build + one real user-path smoke test after meaningful edits.
- Rollback strategy: Create timestamped config/state backups before risky changes; keep one-command restore path.

## 3) Communication defaults

- Tone: Calm, direct, execution-focused.
- Reporting format: What changed -> why -> how to verify -> next step.
- Decision style: Offer max 2 options when needed, recommend one, proceed with smallest safe default.

## 4) Quality guardrails

- Required checks: Build/lint pass, critical flow smoke test, no hidden side effects.
- Scope control rule: Do not widen product behavior, visibility, or claims without explicit approval.
- Drift warning signs: Repetitive system-centered copy, expanding feature surface, weaker suppression/constraint language.

## 5) Reusable checklists

### Release checklist (generic)

- [ ] Build passes
- [ ] Lint passes
- [ ] Critical path manually verified
- [ ] Rollback path documented

### Debug checklist (generic)

- [ ] Reproduce with minimal case
- [ ] Confirm logs/evidence
- [ ] Apply smallest fix
- [ ] Re-test and document outcome

## 6) Explicitly not portable

- Project-specific product strategy
- Proprietary copy and exact messaging
- Secrets, tokens, API keys, user data
- Internal-only decisions not approved for reuse

## 7) 1320-specific adaptation (safe starter)

Use this section as an execution starter for the 1320 website workspace.
Keep it updated as requirements become concrete.

- Project shape (initial): marketing website with mobile-first UX.
- Build stance: prioritize clarity, speed, and maintainability over complexity.
- Milestone preference:
  - M1: layout skeleton + core pages + navigation
  - M2: component polish + responsive QA
  - M3: performance pass + release readiness
- Default technical discipline:
  - avoid unnecessary dependencies
  - keep component boundaries simple
  - keep copy wiring easy to edit
- Validation minimum per milestone:
  - lint/build pass
  - critical-path manual smoke test
  - rollback note recorded

