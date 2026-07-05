/**
 * FS-007 smoke — Wisewave API wiring + reasoning pipeline (no live DB required).
 */
import fs from "node:fs";
import path from "node:path";
import { runReasoningPipeline } from "@/lib/wisewave/run-reasoning-pipeline";
import { validateRelationshipQa } from "@/lib/wisewave/reasoning-helpers";
import { WISEWAVE_API_VERSION } from "@/lib/wisewave/types";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const required = [
  "docs/specs/wisewave-api/FS007_WISEWAVE_API_v1.md",
  "lib/wisewave/run-reasoning-pipeline.ts",
  "lib/wisewave/process-turn.ts",
  "lib/wisewave/reasoning-helpers.ts",
  "lib/db/wisewave-turns.ts",
  "lib/db/expression-profiles.ts",
  "lib/db/relationship-memories.ts",
  "app/api/wisewave/sessions/route.ts",
  "app/api/wisewave/sessions/[sessionId]/route.ts",
  "app/(site)/reflect/page.tsx",
  "app/(site)/reflect/[sessionId]/page.tsx",
  "db/platform-domain-v1.4-wisewave.sql",
];

for (const rel of required) {
  assert(fs.existsSync(path.join(root, rel)), `Missing ${rel}`);
}

const pipeline = runReasoningPipeline({
  userMessage: "I feel anxious about a relationship mirror — what does my S2 pattern mean?",
  clientName: "Sample",
  codes: { s1: "S1-18", s3: "S3-110", s2: "S2-27", s0: "S0-07" },
  expressionState: "emerging",
  memories: [],
  priorTurns: [],
});

assert(pipeline.reasoning.version === WISEWAVE_API_VERSION, "reasoning version");
assert(pipeline.reasoning.layers.behaviour_validation.summary.length > 0, "behaviour layer");
assert(pipeline.response.includes("Sample"), "response uses client name");
assert(!/\byou will\b/i.test(pipeline.response), "QA removes certainty");

const badQa = validateRelationshipQa("You will definitely fix this relationship.", "clarity");
assert(!badQa.passed, "detect bad certainty");

console.log("smoke:wisewave PASS");
