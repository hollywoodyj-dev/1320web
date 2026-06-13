/**
 * Build full bilingual v2 content databases from steward pack + v1 bilingual masters.
 *
 * Run: npm run build:bilingual-v2
 *
 * Outputs:
 *   data/1320-v2/*.json          — runtime bilingual (en + *_zh fields)
 *   data/1320-v2-locale/en/*.json — English-only export
 *   data/1320-v2-locale/zh/*.json — Chinese-primary export
 *
 * Optional: set WRITE_STEWARD_BILINGUAL=1 to copy EN/ZH exports into steward pack folder.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  entryToLocale,
  mergeDatabaseContent,
} from "../lib/1320-v2/bilingual-merge";
import type { V2Entry } from "../lib/1320-v2/v2-index";

const STEWARD_ROOT =
  process.env.STEWARD_1320_PACK ??
  "C:\\New folder (2)\\1320 内容资产数据库-更新版（S0-S9)\\1320 （S0-S9）内容数据库及计算逻辑";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..");
const destV2 = join(webRoot, "data", "1320-v2");
const destEn = join(webRoot, "data", "1320-v2-locale", "en");
const destZh = join(webRoot, "data", "1320-v2-locale", "zh");

type ModuleCopy = {
  module: string;
  stewardRel: string;
  dest: string;
  stewardEnName: string;
  stewardZhName: string;
};

const MODULE_COPIES: ModuleCopy[] = [
  {
    module: "S0",
    stewardRel: "S0 Void Gate 空性之门\\1320_S0_Void_Gate_Content_Database_v2_EN.json",
    dest: "s0-void-gate.json",
    stewardEnName: "1320_S0_Void_Gate_Content_Database_v2_EN.json",
    stewardZhName: "1320_S0_Void_Gate_Content_Database_v2_ZH.json",
  },
  {
    module: "S1",
    stewardRel: "S1 Soul Origin 灵魂震动源频\\1320_S1_Soul_Origin_Content_Database_v2_EN.json",
    dest: "s1-soul-origin.json",
    stewardEnName: "1320_S1_Soul_Origin_Content_Database_v2_EN.json",
    stewardZhName: "1320_S1_Soul_Origin_Content_Database_v2_ZH.json",
  },
  {
    module: "S2",
    stewardRel: "S2 Soul Mirror 灵魂镜像\\1320_S2_Soul_Mirror_Content_Database_v2_EN.json",
    dest: "s2-soul-mirror.json",
    stewardEnName: "1320_S2_Soul_Mirror_Content_Database_v2_EN.json",
    stewardZhName: "1320_S2_Soul_Mirror_Content_Database_v2_ZH.json",
  },
  {
    module: "S3",
    stewardRel: "S3 Soul Vibration 灵魂震动\\1320_S3_Soul_Vibration_Content_Database_v2_EN.json",
    dest: "s3-soul-vibration.json",
    stewardEnName: "1320_S3_Soul_Vibration_Content_Database_v2_EN.json",
    stewardZhName: "1320_S3_Soul_Vibration_Content_Database_v2_ZH.json",
  },
  {
    module: "S4",
    stewardRel: "S4 Core Shadow Pattern 核心阴影模式\\1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.json",
    dest: "s4-core-shadow.json",
    stewardEnName: "1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.json",
    stewardZhName: "1320_S4_Core_Shadow_Pattern_Content_Database_v2_ZH.json",
  },
  {
    module: "S5",
    stewardRel: "S5 Soul Mission 灵魂使命\\1320_S5_Soul_Mission_Content_Database_v4_EN.json",
    dest: "s5-soul-mission.json",
    stewardEnName: "1320_S5_Soul_Mission_Content_Database_v4_EN.json",
    stewardZhName: "1320_S5_Soul_Mission_Content_Database_v4_ZH.json",
  },
  {
    module: "S6",
    stewardRel: "S6 Value and Receiving 价值与接收\\1320_S6_Value_Receiving_Content_Database_v1_EN.json",
    dest: "s6-value-receiving.json",
    stewardEnName: "1320_S6_Value_Receiving_Content_Database_v1_EN.json",
    stewardZhName: "1320_S6_Value_Receiving_Content_Database_v1_ZH.json",
  },
  {
    module: "S7",
    stewardRel: "S7 Soul Sovereignty｜灵魂主权\\1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json",
    dest: "s7-soul-sovereignty.json",
    stewardEnName: "1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json",
    stewardZhName: "1320_S7_Soul_Sovereignty_Content_Database_v1_ZH.json",
  },
  {
    module: "S8",
    stewardRel: "S8 Soul Contribution｜灵魂贡献\\1320_S8_Soul_Contribution_Content_Database_v1_EN.json",
    dest: "s8-soul-contribution.json",
    stewardEnName: "1320_S8_Soul_Contribution_Content_Database_v1_EN.json",
    stewardZhName: "1320_S8_Soul_Contribution_Content_Database_v1_ZH.json",
  },
  {
    module: "S9",
    stewardRel: "S9 Return to Source｜回源之门\\1320_S9_Return_to_Source_Content_Database_v1_EN.json",
    dest: "s9-return-to-source.json",
    stewardEnName: "1320_S9_Return_to_Source_Content_Database_v1_EN.json",
    stewardZhName: "1320_S9_Return_to_Source_Content_Database_v1_ZH.json",
  },
];

const MAPPING_COPY = {
  stewardRel: "S3 Soul Vibration 灵魂震动\\1320_S3_Vibration_Level_Mapping_Table_v2.json",
  dest: "s3-vibration-mapping.json",
};

function extractContentArray(file: Record<string, unknown>): V2Entry[] {
  const content = file.content;
  if (Array.isArray(content)) return content as V2Entry[];
  const entries = file.entries;
  if (Array.isArray(entries)) return entries as V2Entry[];
  return [];
}

function writeJson(path: string, data: unknown): void {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function stewardParentDir(stewardRel: string): string {
  return dirname(join(STEWARD_ROOT, stewardRel));
}

if (!existsSync(STEWARD_ROOT)) {
  console.error("Steward pack not found:", STEWARD_ROOT);
  console.error("Set STEWARD_1320_PACK to the 1320 （S0-S9）内容数据库及计算逻辑 folder.");
  process.exit(1);
}

mkdirSync(destV2, { recursive: true });
mkdirSync(destEn, { recursive: true });
mkdirSync(destZh, { recursive: true });

let mergedEntryCount = 0;

for (const spec of MODULE_COPIES) {
  const from = join(STEWARD_ROOT, spec.stewardRel);
  if (!existsSync(from)) {
    console.error("Missing steward file:", from);
    process.exit(1);
  }

  const raw = JSON.parse(readFileSync(from, "utf8")) as Record<string, unknown>;
  const content = extractContentArray(raw);
  const merged = mergeDatabaseContent(spec.module, content);
  mergedEntryCount += merged.length;

  const bilingual = { ...raw };
  if (Array.isArray(raw.content)) bilingual.content = merged;
  else if (Array.isArray(raw.entries)) bilingual.entries = merged;

  bilingual.document = {
    ...(typeof raw.document === "object" && raw.document ? (raw.document as object) : {}),
    bilingual_build: new Date().toISOString().slice(0, 10),
    bilingual_note:
      "Full en + *_zh fields merged from steward v2 EN source and approved v1 bilingual masters (S0–S3, S6).",
  };

  const enContent = merged.map((e) => entryToLocale(e, "en"));
  const zhContent = merged.map((e) => entryToLocale(e, "zh"));

  const enFile = { ...raw };
  const zhFile = { ...raw };
  if (Array.isArray(raw.content)) {
    enFile.content = enContent;
    zhFile.content = zhContent;
  } else {
    enFile.entries = enContent;
    zhFile.entries = zhContent;
  }

  writeJson(join(destV2, spec.dest), bilingual);
  writeJson(join(destEn, spec.dest), enFile);
  writeJson(join(destZh, spec.dest), zhFile);

  if (process.env.WRITE_STEWARD_BILINGUAL === "1") {
    const parent = stewardParentDir(spec.stewardRel);
    mkdirSync(parent, { recursive: true });
    writeJson(join(parent, spec.stewardEnName), enFile);
    writeJson(join(parent, spec.stewardZhName), zhFile);
    console.log("steward export", parent);
  }

  console.log(`merged ${spec.module}: ${merged.length} entries → ${spec.dest}`);
}

const mappingFrom = join(STEWARD_ROOT, MAPPING_COPY.stewardRel);
if (!existsSync(mappingFrom)) {
  console.error("Missing S3 mapping:", mappingFrom);
  process.exit(1);
}
copyFileSync(mappingFrom, join(destV2, MAPPING_COPY.dest));
copyFileSync(mappingFrom, join(destEn, MAPPING_COPY.dest));
copyFileSync(mappingFrom, join(destZh, MAPPING_COPY.dest));
console.log("copied", MAPPING_COPY.dest);

const manifest = {
  version: "2.0",
  importedAt: new Date().toISOString().slice(0, 10),
  source: "1320 内容资产数据库-更新版（S0-S9) + v1 bilingual masters",
  bilingual: true,
  locale_exports: {
    en: "data/1320-v2-locale/en",
    zh: "data/1320-v2-locale/zh",
  },
  files: {
    S0: "s0-void-gate.json",
    S1: "s1-soul-origin.json",
    S2: "s2-soul-mirror.json",
    S3: "s3-soul-vibration.json",
    S3_mapping: "s3-vibration-mapping.json",
    S4: "s4-core-shadow.json",
    S5: "s5-soul-mission.json",
    S6: "s6-value-receiving.json",
    S7: "s7-soul-sovereignty.json",
    S8: "s8-soul-contribution.json",
    S9: "s9-return-to-source.json",
  },
};
writeJson(join(destV2, "_manifest.json"), manifest);

console.log(`Done — ${mergedEntryCount} entries merged into`, destV2);
console.log("EN export:", destEn);
console.log("ZH export:", destZh);
