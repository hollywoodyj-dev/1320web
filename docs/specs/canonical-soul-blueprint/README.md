# Canonical Soul Blueprint — Spec Package (FS-005)

**Phase 2 · Step 2** — formal platform contract for the Soul Blueprint object.

---

## Documents

| File | Purpose |
|------|---------|
| [CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md](./CANONICAL_SOUL_BLUEPRINT_SPEC_v1.md) | **Primary spec v1.1** — Approved (9.8/10) |
| [PLATFORM_DOMAIN_MODEL_v1.md](./PLATFORM_DOMAIN_MODEL_v1.md) | **FS-005A** — six core domain objects |
| [WISEWAVE_FS005_SIGNOFF.md](./WISEWAVE_FS005_SIGNOFF.md) | Wisewave review record |
| [../phase-2/PHASE2_ROADMAP_v1.md](../phase-2/PHASE2_ROADMAP_v1.md) | Phase 2 five-step roadmap |
| [../full-report/CANONICAL_REPORT_PARITY_v1.md](../full-report/CANONICAL_REPORT_PARITY_v1.md) | Parity QA foundation (Phase 1) |
| [../../governance/README.md](../../governance/README.md) | Governance pack (Constitution → Wisewave OS) |

---

## Implementation (code)

| Path | Role |
|------|------|
| `lib/canonical-report/` | Builder, section registry, parity, presentation resolvers |
| `lib/full-report-v2/` | Payload types + page resolvers (desktop presentation) |
| `lib/mobile-report-v2/` | Mobile presentation resolvers |
| `scripts/smoke-report-canonical.ts` | Schema + required-field audit |
| `scripts/smoke-report-parity.ts` | Content + experience parity |

---

## Product naming

| Term | Meaning |
|------|---------|
| **Soul Blueprint** | The canonical symbolic product (S0–S9 + integrated + tail) |
| **Canonical Soul Blueprint** | Resolved object (`buildCanonicalReport()`) — platform source of truth |
| **Full Report** | One **presentation** of the Soul Blueprint (desktop v2 viewer) |
| **Mobile Report** | Another presentation (swipe UI) |

Code still uses `CanonicalFullReport` and `canonical-report-v1` schema id — aliases documented in spec §9.

---

## FS-005 / FS-005A status

| Item | Status |
|------|--------|
| Spec v1.1 + Platform Principles (§13) | ✅ Approved (9.8/10) |
| FS-005A Platform Domain Model | 🔄 Draft |
| FS-006 start | ⏳ After FS-005A |
| Code rename | ⏳ Deferred until API |
