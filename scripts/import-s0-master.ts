/**
 * Import S0 master bilingual JSON into `data/1320/s0-void-gate.json`.
 * Source: `data/1320/sources/S0_Master_VoidGate_Bilingual.json`
 *
 * Run: npm run import:s0-master
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/1320/sources/S0_Master_VoidGate_Bilingual.json");
const OUT = path.join(ROOT, "data/1320/s0-void-gate.json");

type MasterRecord = {
  code?: string;
  number?: number;
  englishTitle?: string;
  chineseTitle?: string;
  coreIllusionEn?: string;
  coreIllusionZh?: string;
  voidChallengeEn?: string;
  voidChallengeZh?: string;
  voidPowerEn?: string;
  voidPowerZh?: string;
  pathOfReturnEn?: string;
  pathOfReturnZh?: string;
  guidanceEn?: string;
  guidanceZh?: string;
  formulaReachable?: boolean;
  status?: string;
};

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing", SOURCE);
    process.exit(1);
  }

  const master = JSON.parse(fs.readFileSync(SOURCE, "utf8")) as Record<string, MasterRecord>;
  const keys = Object.keys(master)
    .filter((k) => /^S0-\d{2}$/.test(k))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  const output: Record<string, unknown> = {
    _meta: {
      module: "S0 Void Gate",
      version: "2.0.0",
      updatedAt: new Date().toISOString().slice(0, 10),
      language: "zh-en-bilingual",
      source: "S0_Master_VoidGate_Bilingual.json",
      note: "Lookup by code key S0-00 … S0-19 (sum of YYYY-MM-DD digits mod 20).",
    },
  };

  for (const key of keys) {
    const row = master[key];
    const number = row.number ?? Number(key.slice(3));
    const nameEn = row.englishTitle ?? key;
    const nameZh = row.chineseTitle ?? nameEn;
    const illusionEn = row.coreIllusionEn ?? "";
    const illusionZh = row.coreIllusionZh ?? "";

    output[key] = {
      id: key,
      number,
      nameEn,
      nameZh,
      essenceEn: illusionEn || `Your Void Gate works through the illusion of ${nameEn}.`,
      essenceZh: illusionZh || `你的空门通过「${nameZh}」的幻象运作。`,
      coreIllusionEn: illusionEn,
      coreIllusionZh: illusionZh,
      voidChallengeEn: row.voidChallengeEn ?? "",
      voidChallengeZh: row.voidChallengeZh ?? "",
      voidPowerEn: row.voidPowerEn ?? "",
      voidPowerZh: row.voidPowerZh ?? "",
      pathOfReturnEn: row.pathOfReturnEn ?? "",
      pathOfReturnZh: row.pathOfReturnZh ?? "",
      practiceEn: row.pathOfReturnEn ?? "",
      practiceZh: row.pathOfReturnZh ?? "",
      guidanceEn: row.guidanceEn ?? "",
      guidanceZh: row.guidanceZh ?? "",
      formulaReachable: row.formulaReachable ?? true,
      status: row.status ?? "approved",
    };
  }

  fs.writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${keys.length} S0 entries → ${path.relative(ROOT, OUT)}`);
  console.log("  Sample S0-07 →", (output["S0-07"] as { nameEn?: string })?.nameEn);
}

main();
