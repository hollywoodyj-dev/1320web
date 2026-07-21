/**
 * Smoke — Personal Integration Operating Flow Phase 1 (schemas + governance).
 * Run: npx tsx scripts/smoke-personal-integration-ops-p1.ts
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  FOUNDATION_ORDER,
  MAX_ADVANCED_SUGGESTIONS,
} from "@/lib/personal-integration/ops/constants";
import { INTAKE_SECTIONS } from "@/lib/personal-integration/ops/intake-schema";
import { SESSION_GUIDE_STAGES } from "@/lib/personal-integration/ops/session-guide";
import { SUMMARY_FIELD_META, emptySummaryContent } from "@/lib/personal-integration/ops/summary-template";
import { classifySessionBucket } from "@/lib/personal-integration/ops/workspace-service";

const root = process.cwd();
const required = [
  "db/platform-domain-v1.7-integration-ops.sql",
  "app/(site)/integration/intake/[sessionId]/page.tsx",
  "app/(site)/facilitator/sessions/page.tsx",
  "app/(site)/facilitator/sessions/[sessionId]/page.tsx",
  "app/(site)/account/integration-sessions/[sessionId]/page.tsx",
  "lib/personal-integration/ops/blueprint-context.ts",
  "lib/personal-integration/ops/intake-schema.ts",
  "lib/personal-integration/ops/session-guide.ts",
  "lib/personal-integration/ops/summary-template.ts",
];

for (const rel of required) {
  assert.ok(fs.existsSync(path.join(root, rel)), `missing ${rel}`);
}

assert.deepEqual([...FOUNDATION_ORDER], ["s1", "s3", "s2", "s0"]);
assert.equal(MAX_ADVANCED_SUGGESTIONS, 2);
assert.ok(INTAKE_SECTIONS.some((s) => s.id === "consent"));
assert.ok(INTAKE_SECTIONS.some((s) => s.id === "wellbeing_scope"));
assert.equal(SESSION_GUIDE_STAGES.length, 7);
assert.equal(SESSION_GUIDE_STAGES[0].id, "arrival");
assert.equal(SESSION_GUIDE_STAGES[6].id, "closing");
assert.ok(SUMMARY_FIELD_META.some((f) => f.key === "seven_day_practice"));
assert.ok(emptySummaryContent().closing_boundary.includes("mirror"));

assert.equal(
  classifySessionBucket({ status: "cancelled" }),
  "cancelled",
);
assert.equal(
  classifySessionBucket({ status: "scheduled", intake_status: "submitted" }),
  "needs_intake_review",
);
assert.equal(
  classifySessionBucket({ status: "completed", summary_status: "draft" }),
  "needs_summary",
);

const notesApi = fs.readFileSync(
  path.join(root, "app/api/personal-integration/facilitator/sessions/[sessionId]/summary/route.ts"),
  "utf8",
);
assert.ok(notesApi.includes("Never accept private_notes") || notesApi.includes("private_notes"));

const workspace = fs.readFileSync(
  path.join(root, "components/personal-integration/facilitator-session-workspace.tsx"),
  "utf8",
);
assert.ok(workspace.includes("Private facilitator notes are never sent"));
assert.ok(workspace.includes("S1 → S3 → S2 → S0") || workspace.includes("foundationOrderOk"));

console.log("smoke:personal-integration-ops-p1 PASS");
