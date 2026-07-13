/**
 * One-shot merge: Step 3 S4–S6 into runtime commercial overlay.
 * Run: npx tsx scripts/merge-commercial-overlay-step3.ts
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(__dirname, "..");
const OVERLAY_PATH = path.join(ROOT, "data/1320-v2/commercial-report-blocks-overlay.json");
const STEP3_PATH = path.join(
  ROOT,
  "data/1320-v2/commercial-overlay/step3-s4-s6/commercial-report-blocks-overlay-v3-step3-s4-s6.json",
);

type OverlayFile = {
  document: Record<string, unknown>;
  commercial_report_blocks: Record<string, unknown>;
};

const current = JSON.parse(fs.readFileSync(OVERLAY_PATH, "utf8")) as OverlayFile;
const step3 = JSON.parse(fs.readFileSync(STEP3_PATH, "utf8")) as OverlayFile;

const before = Object.keys(current.commercial_report_blocks).length;
const step3Keys = Object.keys(step3.commercial_report_blocks);
for (const key of step3Keys) {
  current.commercial_report_blocks[key] = step3.commercial_report_blocks[key];
}
const after = Object.keys(current.commercial_report_blocks).length;

current.document = {
  ...current.document,
  title: "1320 Commercial Report Blocks Overlay v3 — Steps 2+3 (S0–S6)",
  version: "v3-step2+step3.0",
  status: "Draft for Nova integration and Lumen commercial copy QA",
  created_for:
    "Steps 2–5 handoff: Step 2 S0–S3 + Step 3 S4–S6 commercial_report_blocks",
  source_files: [
    "s0-void-gate.json",
    "s1-soul-origin.json",
    "s2-soul-mirror.json",
    "s3-soul-vibration.json",
    "s4-core-shadow.json",
    "s5-soul-mission.json",
    "s6-value-receiving.json",
  ],
  scope: {
    S0: 20,
    S1: 44,
    S2: 50,
    S3: 12,
    S4: 20,
    S5: 44,
    S6: 44,
    total: 234,
  },
  governance_note:
    "All blocks use reflective, non-predictive, non-diagnostic, non-ranking user-facing copy. S6 commercial blocks use Value & Receiving language. Symbolic source fields are not overwritten.",
};

fs.writeFileSync(OVERLAY_PATH, `${JSON.stringify(current, null, 2)}\n`, "utf8");
console.log(`Merged ${step3Keys.length} Step 3 entries (${before} → ${after} total).`);
