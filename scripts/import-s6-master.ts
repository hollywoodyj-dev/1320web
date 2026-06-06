/**
 * Import S6 master bilingual JSON into `data/1320/s6-money-frequency.json`.
 * Source: `data/1320/sources/S6_Master_MoneyFrequency_Bilingual.json`
 *
 * MVP mapping: S1-NN → S6-NN (base archetype follows S1 Origin Frequency number).
 *
 * Run: npm run import:s6-master
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/1320/sources/S6_Master_MoneyFrequency_Bilingual.json");
const OUT = path.join(ROOT, "data/1320/s6-money-frequency.json");

type MasterRecord = {
  code?: string;
  number?: number;
  englishTitle?: string;
  chineseTitle?: string;
  displayTitleEN?: string;
  displayTitleZH?: string;
  moneyCoreFrequencyEN?: string;
  moneyCoreFrequencyZH?: string;
  shadowFrequencyEN?: string;
  shadowFrequencyZH?: string;
  soulWealthRelationshipEN?: string;
  soulWealthRelationshipZH?: string;
  karmicMoneyLessonEN?: string;
  karmicMoneyLessonZH?: string;
  wisewaveGuidanceEN?: string;
  wisewaveGuidanceZH?: string;
  safetyDisclaimerEN?: string;
  safetyDisclaimerZH?: string;
  recommendedMapping?: string;
  status?: string;
  contentVersion?: string;
  sourceFile?: string;
};

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing", SOURCE);
    process.exit(1);
  }

  const master = JSON.parse(fs.readFileSync(SOURCE, "utf8")) as Record<string, MasterRecord>;
  const keys = Object.keys(master)
    .filter((k) => /^S6-\d{2}$/.test(k))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  const output: Record<string, unknown> = {
    _meta: {
      module: "S6 Money Frequency",
      version: "s6-master-v1.0",
      updatedAt: new Date().toISOString().slice(0, 10),
      language: "zh-en-bilingual",
      source: "S6_Master_MoneyFrequency_Bilingual.json",
      mapping: "S1-NN → S6-NN (MVP base archetype)",
      disclaimerEn:
        "This section is not financial advice. It does not predict income, investment outcomes, or financial success.",
      disclaimerZh: "此部分不是财务建议，也不预测收入、投资结果或财务成功。",
      note: "Lookup by code key S6-01 … S6-44. Do not generate generic wealth content when a record is missing.",
    },
  };

  for (const key of keys) {
    const row = master[key];
    const number = row.number ?? Number(key.slice(3));
    const nameEn = row.englishTitle ?? key;
    const nameZh = row.chineseTitle ?? nameEn;
    const s1Code = `S1-${String(number).padStart(2, "0")}`;

    output[key] = {
      id: key,
      code: key,
      number,
      baseSource: s1Code,
      nameEn,
      nameZh,
      displayTitleEn: row.displayTitleEN ?? `${key} · ${nameEn}`,
      displayTitleZh: row.displayTitleZH ?? `${key} · ${nameZh}`,
      moneyCoreFrequencyEn: row.moneyCoreFrequencyEN ?? "",
      moneyCoreFrequencyZh: row.moneyCoreFrequencyZH ?? "",
      shadowFrequencyEn: row.shadowFrequencyEN ?? "",
      shadowFrequencyZh: row.shadowFrequencyZH ?? "",
      soulWealthRelationshipEn: row.soulWealthRelationshipEN ?? "",
      soulWealthRelationshipZh: row.soulWealthRelationshipZH ?? "",
      karmicMoneyLessonEn: row.karmicMoneyLessonEN ?? "",
      karmicMoneyLessonZh: row.karmicMoneyLessonZH ?? "",
      wisewaveGuidanceEn: row.wisewaveGuidanceEN ?? "",
      wisewaveGuidanceZh: row.wisewaveGuidanceZH ?? "",
      safetyDisclaimerEn: row.safetyDisclaimerEN ?? "",
      safetyDisclaimerZh: row.safetyDisclaimerZH ?? "",
      recommendedMapping: row.recommendedMapping ?? `${s1Code} → ${key}`,
      status: row.status ?? "approved",
      contentVersion: row.contentVersion ?? "s6-master-v1.0",
      sourceFile: row.sourceFile ?? "",
    };
  }

  fs.writeFileSync(OUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${keys.length} S6 entries → ${path.relative(ROOT, OUT)}`);
}

main();
