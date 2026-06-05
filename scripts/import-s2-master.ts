/**
 * Import S2 master bilingual JSON into `data/1320/s2-mirror-path.json`.
 * Source: `data/1320/sources/S2_Master_MirrorPath_Bilingual.json`
 *
 * Run: npm run import:s2-master
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/1320/sources/S2_Master_MirrorPath_Bilingual.json");
const OUT = path.join(ROOT, "data/1320/s2-mirror-path.json");

type MasterRecord = {
  code?: string;
  number?: number;
  englishTitle?: string;
  chineseTitle?: string;
  relationshipDynamicEN?: string;
  relationshipDynamicZH?: string;
  karmicLoopEN?: string;
  karmicLoopZH?: string;
  lessonEN?: string;
  lessonZH?: string;
  healingPathEN?: string;
  healingPathZH?: string;
  guidanceEN?: string;
  guidanceZH?: string;
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
    .filter((k) => /^S2-\d{2}$/.test(k))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  const output: Record<string, unknown> = {
    _meta: {
      module: "S2 Mirror Path",
      version: "2.0.0",
      updatedAt: new Date().toISOString().slice(0, 10),
      language: "zh-en-bilingual",
      source: "S2_Master_MirrorPath_Bilingual.json",
      note: "Lookup by code key S2-01 … S2-50 (birthMonth + birthDay). S2-01 and S2-44–50 are not formula-reachable.",
    },
    default: {
      id: "S2-DEFAULT",
      nameEn: "Mirror Path",
      nameZh: "镜像关系",
      essenceEn: "Your Mirror Path reveals relationship patterns that activate growth — inviting awareness, not prediction.",
      essenceZh: "你的镜像关系编号揭示关系中会激活你成长的模式。",
      guidanceEn: "Treat relationships as a mirror, not a verdict of fate.",
      guidanceZh: "把关系当成一面镜子，而不是命运的判决。",
    },
  };

  for (const key of keys) {
    const row = master[key];
    const number = row.number ?? Number(key.slice(3));
    const nameEn = row.englishTitle ?? key;
    const nameZh = row.chineseTitle ?? nameEn;
    const dynamicEn = row.relationshipDynamicEN ?? "";
    const dynamicZh = row.relationshipDynamicZH ?? "";

    output[key] = {
      id: key,
      number,
      nameEn,
      nameZh,
      essenceEn: dynamicEn || `Your Mirror Path activates patterns of ${nameEn}.`,
      essenceZh: dynamicZh || `你的镜像路径激活「${nameZh}」的模式。`,
      relationshipDynamicEn: dynamicEn,
      relationshipDynamicZh: dynamicZh,
      karmicLoopEn: row.karmicLoopEN ?? "",
      karmicLoopZh: row.karmicLoopZH ?? "",
      lessonEn: row.lessonEN ?? "",
      lessonZh: row.lessonZH ?? "",
      healingPathEn: row.healingPathEN ?? "",
      healingPathZh: row.healingPathZH ?? "",
      guidanceEn: row.guidanceEN ?? "",
      guidanceZh: row.guidanceZH ?? "",
      formulaReachable: row.formulaReachable ?? true,
      status: row.status ?? "approved",
    };
  }

  fs.writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${keys.length} S2 entries → ${path.relative(ROOT, OUT)}`);
  console.log("  Sample S2-27 →", (output["S2-27"] as { nameEn?: string })?.nameEn);
}

main();
