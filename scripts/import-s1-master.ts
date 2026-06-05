/**
 * Merge S1 master ZH + EN JSON into `data/1320/s1-origin-frequency.json`.
 * Sources: `data/1320/sources/S1_Master_Database_canonical.json` (ZH)
 *          `data/1320/sources/S1_Master_OriginFrequency_EN.json` (EN)
 *
 * Run: npm run import:s1-master
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCES = path.join(ROOT, "data/1320/sources");
const OUT = path.join(ROOT, "data/1320/s1-origin-frequency.json");

type MasterRecord = {
  englishTitle?: string;
  chineseTitle?: string;
  soulTraits?: string[];
  strengths?: string[];
  shadows?: string[];
  coreLesson?: string;
  soulDirection?: string[];
  wisewaveGuidance?: string;
  color?: string;
  totem?: string;
  esotericLink?: string;
  number?: number;
};

function loadJson(file: string): Record<string, MasterRecord> {
  return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, MasterRecord>;
}

function buildEssenceZh(title: string, traits: string[] | undefined): string {
  const lead = `你携带的是「${title}」的原频。`;
  if (!traits?.length) return lead;
  return `${lead}${traits.join("")}`;
}

function buildEssenceEn(title: string, traits: string[] | undefined): string {
  const lead = `You carry the origin frequency of ${title}.`;
  if (!traits?.length) return lead;
  return `${lead} ${traits.join(" ")}`;
}

function main() {
  const zhPath = path.join(SOURCES, "S1_Master_Database_canonical.json");
  const enPath = path.join(SOURCES, "S1_Master_OriginFrequency_EN.json");

  if (!fs.existsSync(zhPath) || !fs.existsSync(enPath)) {
    console.error("Missing source files in data/1320/sources/");
    process.exit(1);
  }

  const zhData = loadJson(zhPath);
  const enData = loadJson(enPath);
  const keys = Object.keys(zhData)
    .filter((k) => /^S1-\d{2}$/.test(k))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  const output: Record<string, unknown> = {
    _meta: {
      module: "S1 Origin Frequency",
      version: "2.0.0",
      updatedAt: new Date().toISOString().slice(0, 10),
      language: "zh-en-bilingual",
      source: "S1_Master_Database_canonical.json + S1_Master_OriginFrequency_EN.json",
      note: "Lookup by code key S1-01 … S1-44 (sum of birth year digits).",
    },
  };

  for (const key of keys) {
    const zh = zhData[key];
    const en = enData[key];
    if (!en) {
      console.warn("skip (no EN):", key);
      continue;
    }

    const number = en.number ?? Number(key.slice(3));
    const nameEn = en.englishTitle ?? zh.englishTitle ?? key;
    const nameZh = zh.chineseTitle ?? en.chineseTitle ?? nameEn;

    output[key] = {
      id: key,
      number,
      nameEn,
      nameZh,
      essenceEn: buildEssenceEn(nameEn, en.soulTraits),
      essenceZh: buildEssenceZh(nameZh, zh.soulTraits),
      traitsEn: en.soulTraits ?? [],
      traitsZh: zh.soulTraits ?? [],
      strengthsEn: en.strengths ?? [],
      strengthsZh: zh.strengths ?? [],
      shadowsEn: en.shadows ?? [],
      shadowsZh: zh.shadows ?? [],
      lessonEn: en.coreLesson ?? "",
      lessonZh: zh.coreLesson ?? "",
      directionEn: en.soulDirection ?? [],
      directionZh: zh.soulDirection ?? [],
      guidanceEn: en.wisewaveGuidance ?? "",
      guidanceZh: zh.wisewaveGuidance ?? "",
      colorEn: en.color ?? "",
      colorZh: zh.color ?? "",
      totemEn: en.totem ?? "",
      totemZh: zh.totem ?? "",
      symbolicLink: en.esotericLink ?? zh.esotericLink ?? "",
      keywords: [],
    };
  }

  fs.writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${keys.length} S1 entries → ${path.relative(ROOT, OUT)}`);
}

main();
