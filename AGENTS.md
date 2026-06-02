<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 1320 Website Agent Rules

## Project intent

- Build the 1320 marketing website with a clean, calm, mobile-first UX.
- Use the provided UI/spec as source of truth.
- Prefer small, reversible changes and fast feedback loops.

## Working style

- Start by summarizing requirements before broad implementation.
- Keep architecture simple: avoid adding extra frameworks unless requested.
- For each significant change, report: what changed, why, and what to test.

## Quality bar

- `npm run lint` must pass.
- `npm run build` must pass.
- Verify responsive behavior on mobile and desktop breakpoints.

## Scope discipline

- Do not expand product scope beyond agreed milestones.
- If trade-offs exist, present at most 2 options and recommend one.
- Avoid hidden behavior or magic defaults that are hard to maintain.

## Continuity files

- `memory.md` stores project facts (decisions, handoffs, open threads).
- `soul.md` stores stable style/stance guidance.
- Keep these concise and truthful; update after meaningful milestones.

## Shared continuity note

- This workspace may reuse high-level operating patterns from Nova's other projects (clarity, restraint, small iterations), but never copy project-specific facts or private details unless explicitly provided for 1320.
