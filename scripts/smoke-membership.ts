/**
 * FS-008 smoke — Membership / Living Blueprint wiring (no live DB).
 */
import fs from "node:fs";
import path from "node:path";
import { buildContinuityNote, validateContinuityPresentation } from "@/lib/living-blueprint/continuity-qa";
import { memoryLayerForKind } from "@/lib/living-blueprint/memory-layers";
import { LIVING_BLUEPRINT_VERSION } from "@/lib/living-blueprint/types";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const required = [
  "docs/specs/membership/FS008_MEMBERSHIP_LIVING_BLUEPRINT_v1.md",
  "lib/living-blueprint/build-snapshot.ts",
  "lib/living-blueprint/membership-actions.ts",
  "lib/living-blueprint/continuity-qa.ts",
  "lib/db/journeys.ts",
  "app/api/membership/living-blueprint/route.ts",
  "app/api/membership/check-in/route.ts",
  "app/api/membership/expression/route.ts",
  "app/(site)/living-blueprint/[reportId]/page.tsx",
  "db/platform-domain-v1.5-membership.sql",
];

for (const rel of required) {
  assert(fs.existsSync(path.join(root, rel)), `Missing ${rel}`);
}

assert(memoryLayerForKind("insight") === "reflection", "insight → reflection layer");
assert(memoryLayerForKind("theme") === "journey", "theme → journey layer");

const note = buildContinuityNote({ expressionState: "emerging", lastReviewAt: null });
assert(note.includes("immutable"), "continuity note mentions immutability");

const qa = validateContinuityPresentation({
  version: LIVING_BLUEPRINT_VERSION,
  reportId: "test",
  clientName: "Test",
  email: "test@example.com",
  birthDate: "1982-02-03",
  codes: { s1: "S1-18", s3: "S3-110", s2: "S2-27", s0: "S0-07" },
  expressionState: "emerging",
  journeyStatus: "active",
  membershipTier: "living_blueprint",
  lastReviewAt: null,
  memoriesByLayer: { blueprint: [], reflection: [], expression: [], journey: [] },
  recentReflections: [],
  continuityNote: note,
});
assert(qa.passed, "continuity QA pass");

const accountPage = fs.readFileSync(path.join(root, "app/(site)/account/page.tsx"), "utf8");
assert(accountPage.includes("/living-blueprint/"), "account links to Living Blueprint");
assert(accountPage.includes("ReflectEntryForm"), "account includes Reflect with Wisewave");

console.log("smoke:membership PASS");
