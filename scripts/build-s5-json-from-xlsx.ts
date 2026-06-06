/**
 * Build `data/1320/sources/S5_Seed_Database_Bilingual.json` from the Excel workbook.
 * Run: npx tsx scripts/build-s5-json-from-xlsx.ts [path-to-xlsx]
 */
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

const ROOT = process.cwd();
const DEFAULT_XLSX = path.join(
  ROOT,
  "data/1320/sources/S5_Seed_Database_Bilingual.xlsx"
);
const OUT = path.join(ROOT, "data/1320/sources/S5_Seed_Database_Bilingual.json");

function asBool(v: unknown): boolean | undefined {
  if (v == null || v === "") return undefined;
  if (typeof v === "boolean") return v;
  const s = String(v).toLowerCase();
  if (s === "true") return true;
  if (s === "false") return false;
  return undefined;
}

function splitPipe(v: unknown): string[] | undefined {
  if (v == null || v === "") return undefined;
  if (Array.isArray(v)) return v as string[];
  return String(v)
    .split(" | ")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitS5Usage(v: unknown): string[] | undefined {
  if (v == null || v === "") return undefined;
  if (Array.isArray(v)) return v as string[];
  return String(v)
    .split(/[,|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function omitEmpty<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj };
  for (const [k, v] of Object.entries(out)) {
    if (v === "" || v === undefined) delete out[k];
  }
  return out;
}

function sheetRows(wb: XLSX.WorkBook, sheet: string) {
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[sheet]);
}

function buildS1(wb: XLSX.WorkBook) {
  const out: Record<string, unknown> = {};
  for (const r of sheetRows(wb, "S1_Mission_Seeds")) {
    const code = String(r.sourceCode);
    out[code] = omitEmpty({
      seedType: r.seedType,
      sourceSegment: r.sourceSegment,
      sourceCode: r.sourceCode,
      sourceTitleEN: r.sourceTitleEN,
      sourceTitleZH: r.sourceTitleZH,
      missionSeedEN: r.missionSeedEN,
      missionSeedZH: r.missionSeedZH,
      missionKeywordsEN: splitPipe(r.missionKeywordsEN),
      missionKeywordsZH: splitPipe(r.missionKeywordsZH),
      missionShadowEN: r.missionShadowEN,
      missionShadowZH: r.missionShadowZH,
      missionActionEN: r.missionActionEN,
      missionActionZH: r.missionActionZH,
      s5Usage: splitS5Usage(r.s5Usage),
      status: r.status,
      contentVersion: r.contentVersion,
      generatedFrom: r.generatedFrom,
      lastReviewedAt: r.lastReviewedAt,
    });
  }
  return out;
}

function buildS2(wb: XLSX.WorkBook) {
  const out: Record<string, unknown> = {};
  for (const r of sheetRows(wb, "S2_Mirror_Seeds")) {
    const code = String(r.sourceCode);
    out[code] = omitEmpty({
      seedType: r.seedType,
      sourceSegment: r.sourceSegment,
      sourceCode: r.sourceCode,
      sourceTitleEN: r.sourceTitleEN,
      sourceTitleZH: r.sourceTitleZH,
      mirrorTaskSeedEN: r.mirrorTaskSeedEN,
      mirrorTaskSeedZH: r.mirrorTaskSeedZH,
      relationshipPatternEN: r.relationshipPatternEN,
      relationshipPatternZH: r.relationshipPatternZH,
      mirrorShadowEN: r.mirrorShadowEN,
      mirrorShadowZH: r.mirrorShadowZH,
      healingActionEN: r.healingActionEN,
      healingActionZH: r.healingActionZH,
      s5Usage: splitS5Usage(r.s5Usage),
      formulaReachable: asBool(r.formulaReachable),
      formulaNote: r.formulaNote,
      status: r.status,
      contentVersion: r.contentVersion,
      generatedFrom: r.generatedFrom,
      lastReviewedAt: r.lastReviewedAt,
    });
  }
  return out;
}

function buildS3(wb: XLSX.WorkBook) {
  const out: Record<string, unknown> = {};
  for (const r of sheetRows(wb, "S3_Carrier_Seeds")) {
    const code = String(r.sourceCode);
    out[code] = omitEmpty({
      seedType: r.seedType,
      sourceSegment: r.sourceSegment,
      sourceCode: r.sourceCode,
      sourceTitleEN: r.sourceTitleEN,
      sourceTitleZH: r.sourceTitleZH,
      rawRange: r.rawRange,
      carrierSeedEN: r.carrierSeedEN,
      carrierSeedZH: r.carrierSeedZH,
      expressionModeEN: r.expressionModeEN,
      expressionModeZH: r.expressionModeZH,
      distortionRiskEN: r.distortionRiskEN,
      distortionRiskZH: r.distortionRiskZH,
      groundingActionEN: r.groundingActionEN,
      groundingActionZH: r.groundingActionZH,
      s5Usage: splitS5Usage(r.s5Usage),
      reachableByCurrentFormula: asBool(r.reachableByCurrentFormula),
      currentFormulaReachableRawRange: r.currentFormulaReachableRawRange,
      status: r.status,
      contentVersion: r.contentVersion,
      generatedFrom: r.generatedFrom,
      lastReviewedAt: r.lastReviewedAt,
    });
  }
  return out;
}

function buildS0(wb: XLSX.WorkBook) {
  const out: Record<string, unknown> = {};
  for (const r of sheetRows(wb, "S0_Void_Seeds")) {
    const code = String(r.sourceCode);
    out[code] = omitEmpty({
      seedType: r.seedType,
      sourceSegment: r.sourceSegment,
      sourceCode: r.sourceCode,
      sourceTitleEN: r.sourceTitleEN,
      sourceTitleZH: r.sourceTitleZH,
      voidChallengeSeedEN: r.voidChallengeSeedEN,
      voidChallengeSeedZH: r.voidChallengeSeedZH,
      coreIllusionEN: r.coreIllusionEN,
      coreIllusionZH: r.coreIllusionZH,
      voidChallengeEN: r.voidChallengeEN,
      voidChallengeZH: r.voidChallengeZH,
      breakthroughGateEN: r.breakthroughGateEN,
      breakthroughGateZH: r.breakthroughGateZH,
      returnPracticeEN: r.returnPracticeEN,
      returnPracticeZH: r.returnPracticeZH,
      s5Usage: splitS5Usage(r.s5Usage),
      formulaReachable: asBool(r.formulaReachable),
      status: r.status,
      contentVersion: r.contentVersion,
      generatedFrom: r.generatedFrom,
      lastReviewedAt: r.lastReviewedAt,
    });
  }
  return out;
}

export function buildS5SeedDatabaseFromXlsx(xlsxPath: string) {
  const wb = XLSX.readFile(xlsxPath);
  const s1 = buildS1(wb);
  const s2 = buildS2(wb);
  const s3 = buildS3(wb);
  const s0 = buildS0(wb);

  return {
    _meta: {
      databaseName: "S5 Seed Database Bilingual",
      version: "s5-seeds-bilingual-v1.0",
      status: "approved_seed_v1",
      createdAt: new Date().toISOString().slice(0, 10),
      language: "en+zh",
      purpose:
        "Deterministic seed database for S5 Soul Mission assembly. This prevents drift by deriving S5 from approved S1/S2/S3/S0 canonical data.",
      rule: "S5 is not randomly generated. S5 is assembled from approved seeds and fixed templates. AI may only polish approved content without changing meaning.",
      sourceWorkbook: path.basename(xlsxPath),
      recordCounts: {
        S1_primaryMissionSeeds: Object.keys(s1).length,
        S2_mirrorTaskSeeds: Object.keys(s2).length,
        S3_vibrationCarrierSeeds: Object.keys(s3).length,
        S0_voidChallengeSeeds: Object.keys(s0).length,
        totalSeedRecords:
          Object.keys(s1).length +
          Object.keys(s2).length +
          Object.keys(s3).length +
          Object.keys(s0).length,
      },
    },
    S5_PrimaryMissionSeeds_From_S1: s1,
    S5_MirrorTaskSeeds_From_S2: s2,
    S5_VibrationCarrierSeeds_From_S3: s3,
    S5_VoidChallengeSeeds_From_S0: s0,
  };
}

function main() {
  const xlsxPath = process.argv[2] ?? DEFAULT_XLSX;
  if (!fs.existsSync(xlsxPath)) {
    console.error("Missing", xlsxPath);
    process.exit(1);
  }

  const data = buildS5SeedDatabaseFromXlsx(xlsxPath);
  fs.writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  console.log("Wrote", OUT);
  console.log("  from:", xlsxPath);
  console.log("  counts:", data._meta.recordCounts);
}

const isDirectRun =
  process.argv[1] != null &&
  path.resolve(process.argv[1]) === path.resolve(import.meta.url.slice(7));

if (isDirectRun) {
  main();
}
