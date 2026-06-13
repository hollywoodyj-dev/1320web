/**
 * Re-copy v2 content JSON from steward pack into web/data/1320-v2/.
 * Run: npm run import:v2-databases
 *
 * Steward root (adjust if your path differs):
 *   C:\New folder (2)\1320 内容资产数据库-更新版（S0-S9)\1320 （S0-S9）内容数据库及计算逻辑
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const STEWARD_ROOT =
  process.env.STEWARD_1320_PACK ??
  "C:\\New folder (2)\\1320 内容资产数据库-更新版（S0-S9)\\1320 （S0-S9）内容数据库及计算逻辑";

const here = dirname(fileURLToPath(import.meta.url));
const dest = join(here, "..", "data", "1320-v2");

const copies: Array<{ src: string; dest: string }> = [
  {
    src: "S0 Void Gate 空性之门\\1320_S0_Void_Gate_Content_Database_v2_EN.json",
    dest: "s0-void-gate.json",
  },
  {
    src: "S1 Soul Origin 灵魂震动源频\\1320_S1_Soul_Origin_Content_Database_v2_EN.json",
    dest: "s1-soul-origin.json",
  },
  {
    src: "S2 Soul Mirror 灵魂镜像\\1320_S2_Soul_Mirror_Content_Database_v2_EN.json",
    dest: "s2-soul-mirror.json",
  },
  {
    src: "S3 Soul Vibration 灵魂震动\\1320_S3_Soul_Vibration_Content_Database_v2_EN.json",
    dest: "s3-soul-vibration.json",
  },
  {
    src: "S3 Soul Vibration 灵魂震动\\1320_S3_Vibration_Level_Mapping_Table_v2.json",
    dest: "s3-vibration-mapping.json",
  },
  {
    src: "S4 Core Shadow Pattern 核心阴影模式\\1320_S4_Core_Shadow_Pattern_Content_Database_v2_EN.json",
    dest: "s4-core-shadow.json",
  },
  {
    src: "S5 Soul Mission 灵魂使命\\1320_S5_Soul_Mission_Content_Database_v4_EN.json",
    dest: "s5-soul-mission.json",
  },
  {
    src: "S6 Value and Receiving 价值与接收\\1320_S6_Value_Receiving_Content_Database_v1_EN.json",
    dest: "s6-value-receiving.json",
  },
  {
    src: "S7 Soul Sovereignty｜灵魂主权\\1320_S7_Soul_Sovereignty_Content_Database_v1_EN.json",
    dest: "s7-soul-sovereignty.json",
  },
  {
    src: "S8 Soul Contribution｜灵魂贡献\\1320_S8_Soul_Contribution_Content_Database_v1_EN.json",
    dest: "s8-soul-contribution.json",
  },
  {
    src: "S9 Return to Source｜回源之门\\1320_S9_Return_to_Source_Content_Database_v1_EN.json",
    dest: "s9-return-to-source.json",
  },
];

if (!existsSync(STEWARD_ROOT)) {
  console.error("Steward pack not found:", STEWARD_ROOT);
  console.error("Set STEWARD_1320_PACK env var to the 1320 （S0-S9）内容数据库及计算逻辑 folder.");
  process.exit(1);
}

mkdirSync(dest, { recursive: true });

for (const file of copies) {
  const from = join(STEWARD_ROOT, file.src);
  const to = join(dest, file.dest);
  if (!existsSync(from)) {
    console.error("Missing source:", from);
    process.exit(1);
  }
  copyFileSync(from, to);
  console.log("copied", file.dest);
}

console.log("Done — v2 databases in", dest);
