/**
 * Import S3 master bilingual JSON into `data/1320/s3-vibration-tier.json`.
 * Source: `data/1320/sources/S3_Master_VibrationTier_Bilingual.json`
 *
 * Run: npm run import:s3-master
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/1320/sources/S3_Master_VibrationTier_Bilingual.json");
const OUT = path.join(ROOT, "data/1320/s3-vibration-tier.json");

/** Max birth-date S3 raw = 12 × 31 */
const S3_RAW_MAX = 372;

type MasterTier = {
  code?: string;
  tierNumber?: number;
  englishTitle?: string;
  chineseTitle?: string;
  minRaw?: number;
  maxRaw?: number | null;
  rawRange?: string;
  soulTraitsZH?: string;
  soulTraitsEN?: string;
  strengthsZH?: string;
  strengthsEN?: string;
  challengesZH?: string;
  challengesEN?: string;
  guidanceZH?: string;
  guidanceEN?: string;
  reachableByCurrentFormula?: boolean;
  status?: string;
};

function buildEssenceEn(title: string, raw: number, traits: string | undefined): string {
  const lead = `Your S3 number (${raw}) expresses through the ${title} vibration tier.`;
  if (!traits?.trim()) return lead;
  return `${lead} ${traits.trim()}`;
}

function buildEssenceZh(title: string, raw: number, traits: string | undefined): string {
  const lead = `你的 S3 编号（${raw}）通过「${title}」振动层级表达。`;
  if (!traits?.trim()) return lead;
  return `${lead}${traits.trim()}`;
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing", SOURCE);
    process.exit(1);
  }

  const master = JSON.parse(fs.readFileSync(SOURCE, "utf8")) as Record<string, MasterTier>;
  const keys = Object.keys(master)
    .filter((k) => /^S3-\d{2}$/.test(k))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  const tiers = keys.map((key) => {
    const row = master[key];
    const tierNumber = row.tierNumber ?? Number(key.slice(3));
    const minRaw = row.minRaw ?? 0;
    const maxRaw = row.maxRaw == null ? S3_RAW_MAX : row.maxRaw;
    const nameEn = row.englishTitle ?? key;
    const nameZh = row.chineseTitle ?? nameEn;

    return {
      id: `S3-T${String(tierNumber).padStart(2, "0")}`,
      code: key,
      tierNumber,
      range: [minRaw, maxRaw] as [number, number],
      rawRange: row.rawRange ?? `${minRaw}–${maxRaw}`,
      nameEn,
      nameZh,
      essenceEn: buildEssenceEn(nameEn, minRaw, row.soulTraitsEN),
      essenceZh: buildEssenceZh(nameZh, minRaw, row.soulTraitsZH),
      soulTraitsEn: row.soulTraitsEN ?? "",
      soulTraitsZh: row.soulTraitsZH ?? "",
      strengthsEn: row.strengthsEN ?? "",
      strengthsZh: row.strengthsZH ?? "",
      challengesEn: row.challengesEN ?? "",
      challengesZh: row.challengesZH ?? "",
      guidanceEn: row.guidanceEN ?? "",
      guidanceZh: row.guidanceZH ?? "",
      reachableByCurrentFormula: row.reachableByCurrentFormula ?? true,
      status: row.status ?? "approved",
    };
  });

  const output = {
    _meta: {
      module: "S3 Vibration Tier",
      version: "2.0.0",
      updatedAt: new Date().toISOString().slice(0, 10),
      language: "zh-en-bilingual",
      source: "S3_Master_VibrationTier_Bilingual.json",
      note: "12 master tiers with min/max raw lookup (month × day). Tiers 10–12 exceed current formula max (372) but kept for future use.",
    },
    default: {
      id: "S3-DEFAULT",
      nameEn: "Vibration Expression",
      nameZh: "振动表达",
      essenceEn: "Your S3 number reflects how your energy expresses in the world.",
      essenceZh: "你的 S3 编号映照你的能量如何在现实中表达。",
      noteEn: "Tier content is being expanded for your vibration expression.",
      noteZh: "振动层级内容正在完善中。",
      displayRule: "Show raw S3 number first, then use tier when available.",
    },
    tiers,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${tiers.length} S3 tiers → ${path.relative(ROOT, OUT)}`);
  console.log("  Sample S3-110 →", tiers.find((t) => t.range[0] <= 110 && t.range[1] >= 110)?.nameEn);
}

main();
