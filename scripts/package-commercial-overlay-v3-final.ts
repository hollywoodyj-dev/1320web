/**
 * Step 5A — Package commercial-v3-final from production runtime overlay.
 * Run: npx tsx scripts/package-commercial-overlay-v3-final.ts
 */
import fs from "node:fs";
import path from "node:path";
import {
  COMMERCIAL_REPORT_BLOCK_KEYS,
} from "../lib/types/commercial-report-blocks";

const ROOT = path.join(__dirname, "..");
const SOURCE_OVERLAY = path.join(ROOT, "data/1320-v2/commercial-report-blocks-overlay.json");
const FINAL_OVERLAY = path.join(
  ROOT,
  "data/1320-v2/commercial-report-blocks-overlay-v3-final.json",
);
const FINAL_DIR = path.join(ROOT, "data/1320-v2/commercial-overlay/v3-final");
const MANIFEST_PATH = path.join(ROOT, "data/1320-v2/_manifest.json");

const MODULE_COUNTS: Record<string, number> = {
  S0: 20,
  S1: 44,
  S2: 50,
  S3: 12,
  S4: 20,
  S5: 44,
  S6: 44,
  S7: 7,
  S8: 8,
  S9: 9,
};

const MODULES = Object.keys(MODULE_COUNTS);

const SOURCE_LAYER_PHRASES = [
  "This Soul Origin reflects",
  "It invites the user",
  "This vibration tier reflects",
  "Commercial report output layer",
  "This S6 pattern reflects",
];

const S6_LEGACY_PHRASES = ["Money Frequency", "金矿", "prosperity", "abundance"];
const S7_GOVERNANCE = [/\b\d+\s*%/, /\bscore\b/i, /spiritual rank/i, /entitlement/i];
const S8_GOVERNANCE = [/public success/i, /social status/i, /usefulness/i];
const S9_GOVERNANCE = [/enlightenment status/i, /spiritual level/i, /superiority/i, /final attainment/i];

type OverlayRow = {
  code?: string;
  display_name?: string;
  display_name_zh?: string;
  commercial_report_blocks?: Record<string, string>;
  governance?: Record<string, boolean>;
};

type OverlayFile = {
  document: Record<string, unknown>;
  commercial_report_blocks: Record<string, OverlayRow>;
};

function fail(message: string): never {
  console.error("FAIL:", message);
  process.exit(1);
}

function moduleForCode(code: string): string {
  const match = /^S(\d+)-/.exec(code);
  if (!match) fail(`Invalid code prefix: ${code}`);
  return `S${match[1]}`;
}

function allBlockText(row: OverlayRow): string {
  const blocks = row.commercial_report_blocks ?? {};
  return Object.values(blocks).join("\n");
}

function validateEntry(code: string, row: OverlayRow) {
  if (!row.code) fail(`${code}: missing code`);
  if (!row.display_name?.trim()) fail(`${code}: missing display_name`);

  const blocks = row.commercial_report_blocks;
  if (!blocks || typeof blocks !== "object") fail(`${code}: missing commercial_report_blocks`);

  for (const key of COMMERCIAL_REPORT_BLOCK_KEYS) {
    const value = blocks[key];
    if (!value?.trim()) fail(`${code}: missing or empty block ${key}`);
  }

  const text = allBlockText(row);
  for (const phrase of SOURCE_LAYER_PHRASES) {
    if (text.includes(phrase)) fail(`${code}: source-layer phrase: ${phrase}`);
  }

  const module = moduleForCode(code);
  if (module === "S6") {
    for (const phrase of S6_LEGACY_PHRASES) {
      if (text.toLowerCase().includes(phrase.toLowerCase())) {
        fail(`${code}: S6 legacy phrase: ${phrase}`);
      }
    }
  }
  if (module === "S7") {
    for (const pattern of S7_GOVERNANCE) {
      if (pattern.test(text)) fail(`${code}: S7 governance hit: ${pattern}`);
    }
  }
  if (module === "S8") {
    for (const pattern of S8_GOVERNANCE) {
      if (pattern.test(text)) fail(`${code}: S8 governance hit: ${pattern}`);
    }
  }
  if (module === "S9") {
    for (const pattern of S9_GOVERNANCE) {
      if (pattern.test(text)) fail(`${code}: S9 governance hit: ${pattern}`);
    }
  }
}

function main() {
  const source = JSON.parse(fs.readFileSync(SOURCE_OVERLAY, "utf8")) as OverlayFile;
  const codes = Object.keys(source.commercial_report_blocks).sort();
  const totalExpected = Object.values(MODULE_COUNTS).reduce((sum, n) => sum + n, 0);

  if (codes.length !== totalExpected) {
    fail(`total count ${codes.length} !== ${totalExpected}`);
  }

  const byModule: Record<string, OverlayRow[]> = Object.fromEntries(
    MODULES.map((m) => [m, []]),
  );

  for (const code of codes) {
    const row = source.commercial_report_blocks[code];
    validateEntry(code, row);
    const module = moduleForCode(code);
    if (!byModule[module]) fail(`Unknown module for ${code}`);
    byModule[module].push(row);
  }

  for (const module of MODULES) {
    const expected = MODULE_COUNTS[module];
    const actual = byModule[module].length;
    if (actual !== expected) fail(`${module} count ${actual} !== ${expected}`);
  }

  const packagedAt = new Date().toISOString().slice(0, 10);

  const finalOverlay: OverlayFile = {
    document: {
      title: "1320 Commercial Report Blocks Overlay v3 — Final (S0–S9)",
      version: "commercial-v3-final",
      status: "Final archive-ready package — Step 5A",
      packaged_at: packagedAt,
      source: "commercial overlay (Steps 2–4 consolidated)",
      symbolic_source: "unchanged — data/1320-v2/*.json",
      renderer_precedence:
        "entry commercial_report_blocks → overlay file → S5 output_blocks / steward fields → symbolic source",
      integration_notes:
        "docs/specs/1320-v2-content/COMMERCIAL_REPORT_OUTPUT_LAYER_v3_FINAL_NOVA_INTEGRATION_NOTES.md",
      provenance: {
        step2: { deploy: "3bb720c", modules: "S0–S3", entries: 126 },
        step3: { deploy: "9cf0825", modules: "S4–S6", entries: 108 },
        step4: { deploy: "633fe03", modules: "S7–S9", entries: 24 },
        step5a: { date: packagedAt, action: "v3-final consolidation" },
      },
      scope: { ...MODULE_COUNTS, total: totalExpected },
      governance_note:
        "Reflective, non-predictive, non-diagnostic, non-ranking user-facing copy. S6 Value & Receiving. S7 no score/ranking. S8 no public-success framing. S9 no enlightenment/superiority framing.",
    },
    commercial_report_blocks: source.commercial_report_blocks,
  };

  fs.mkdirSync(FINAL_DIR, { recursive: true });
  fs.writeFileSync(FINAL_OVERLAY, `${JSON.stringify(finalOverlay, null, 2)}\n`, "utf8");

  const sourceDbMap: Record<string, string> = {
    S0: "s0-void-gate.json",
    S1: "s1-soul-origin.json",
    S2: "s2-soul-mirror.json",
    S3: "s3-soul-vibration.json",
    S4: "s4-core-shadow.json",
    S5: "s5-soul-mission.json",
    S6: "s6-value-receiving.json",
    S7: "s7-soul-sovereignty.json",
    S8: "s8-soul-contribution.json",
    S9: "s9-return-to-source.json",
  };

  for (const module of MODULES) {
    const slug = module.toLowerCase();
    const moduleFile = {
      document: {
        title: `1320 Commercial Report Blocks v3 Final — ${module}`,
        version: "commercial-v3-final",
        status: "Final archive module export — Step 5A",
        packaged_at: packagedAt,
        source_database: sourceDbMap[module],
        entry_count: MODULE_COUNTS[module],
        purpose:
          "Commercial Report Output Layer blocks for Full Report / Mobile Report / PDF / API rendering. Symbolic source unchanged.",
      },
      module,
      entries: byModule[module].map((row) => ({
        code: row.code,
        display_name: row.display_name,
        display_name_zh: row.display_name_zh,
        commercial_report_blocks: row.commercial_report_blocks,
        governance: row.governance,
      })),
    };
    fs.writeFileSync(
      path.join(FINAL_DIR, `${slug}-commercial-report-blocks-v3-final.json`),
      `${JSON.stringify(moduleFile, null, 2)}\n`,
      "utf8",
    );
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Record<string, unknown>;
  manifest.commercial_output_layer = {
    version: "commercial-v3-final",
    schema_doc: "docs/specs/1320-v2-content/COMMERCIAL_REPORT_BLOCKS_SCHEMA_v1.md",
    overlay: "commercial-report-blocks-overlay-v3-final.json",
    total_entries: totalExpected,
    modules: MODULE_COUNTS,
    source: "commercial overlay",
    symbolic_source: "unchanged",
    renderer_precedence:
      "commercial_report_blocks / overlay before symbolic fallback",
    packaged_at: packagedAt,
    module_exports: {
      v3_final: "commercial-overlay/v3-final/",
      step2_s0_s3: "commercial-overlay/step2-s0-s3/",
      step3_s4_s6: "commercial-overlay/step3-s4-s6/",
      step4_s7_s9: "commercial-overlay/step4-s7-s9/",
    },
    integration_notes:
      "docs/specs/1320-v2-content/COMMERCIAL_REPORT_OUTPUT_LAYER_v3_FINAL_NOVA_INTEGRATION_NOTES.md",
    governance_summary:
      "docs/specs/1320-v2-content/COMMERCIAL_REPORT_OUTPUT_LAYER_v3_FINAL_GOVERNANCE_SUMMARY.md",
    changelog:
      "docs/specs/1320-v2-content/COMMERCIAL_REPORT_OUTPUT_LAYER_v3_FINAL_CHANGELOG.md",
  };
  if (manifest.files && typeof manifest.files === "object") {
    (manifest.files as Record<string, string>).commercial_overlay =
      "commercial-report-blocks-overlay-v3-final.json";
  }
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log("PASS: commercial-v3-final package created");
  console.log(`  total entries: ${totalExpected}`);
  for (const module of MODULES) {
    console.log(`  ${module}: ${MODULE_COUNTS[module]}`);
  }
  console.log(`  overlay: ${path.relative(ROOT, FINAL_OVERLAY)}`);
  console.log(`  modules: ${path.relative(ROOT, FINAL_DIR)}/`);
}

main();

export {};
