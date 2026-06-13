/**
 * Audit EN/ZH locale exports for wrong-language slots in body fields.
 * Run: npm run audit:bilingual-v2
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..");
const enDir = join(webRoot, "data", "1320-v2-locale", "en");
const zhDir = join(webRoot, "data", "1320-v2-locale", "zh");

const ZH_LATIN_ONLY_FIELDS = ["wisewave_guidance", "wisewave_reflection"];

const EN_CJK_FIELDS = [
  "wisewave_guidance",
  "wisewave_reflection",
  "integration_key",
  "reflective_summary",
  "origin_essence",
  "vibration_essence",
  "core_lesson",
  "guidance",
];

function containsCjk(text: string): boolean {
  return /[\u3400-\u9fff]/.test(text);
}

function extractEntries(file: Record<string, unknown>): Record<string, unknown>[] {
  const content = file.content;
  if (Array.isArray(content)) return content as Record<string, unknown>[];
  const entries = file.entries;
  if (Array.isArray(entries)) return entries as Record<string, unknown>[];
  return [];
}

type Issue = { file: string; code: string; field: string; problem: string; sample: string };

const issues: Issue[] = [];

function auditFile(path: string, locale: "en" | "zh"): void {
  const file = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  const fileName = path.split(/[/\\]/).pop() ?? path;
  for (const entry of extractEntries(file)) {
    const code = typeof entry.code === "string" ? entry.code : "?";
    for (const field of EN_CJK_FIELDS) {
      const value = entry[field];
      if (typeof value !== "string" || !value.trim()) continue;
      const sample = value.slice(0, 80);
      if (locale === "en" && containsCjk(value)) {
        issues.push({ file: fileName, code, field, problem: "CJK in EN export", sample });
      }
    }
    if (locale === "zh") {
      for (const field of ZH_LATIN_ONLY_FIELDS) {
        const value = entry[field];
        if (typeof value !== "string" || !value.trim()) continue;
        const sample = value.slice(0, 80);
        if (!containsCjk(value) && value.length > 24) {
          issues.push({ file: fileName, code, field, problem: "Latin-only in ZH export", sample });
        }
      }
    }
  }
}

for (const name of readdirSync(enDir).filter((f) => f.endsWith(".json"))) {
  auditFile(join(enDir, name), "en");
}
for (const name of readdirSync(zhDir).filter((f) => f.endsWith(".json"))) {
  auditFile(join(zhDir, name), "zh");
}

if (issues.length) {
  const enIssues = issues.filter((i) => i.problem.includes("EN"));
  const zhIssues = issues.filter((i) => i.problem.includes("ZH"));

  if (zhIssues.length) {
    console.warn(`WARN: ${zhIssues.length} ZH locale field(s) still English-only (steward ZH body copy gap):\n`);
    for (const issue of zhIssues.slice(0, 15)) {
      console.warn(`  ${issue.file} ${issue.code} ${issue.field}: ${issue.sample}…`);
    }
    if (zhIssues.length > 15) {
      console.warn(`  … and ${zhIssues.length - 15} more`);
    }
  }

  if (enIssues.length) {
    console.error(`FAIL: ${enIssues.length} EN locale field(s) contain Chinese:\n`);
    for (const issue of enIssues.slice(0, 40)) {
      console.error(`  ${issue.file} ${issue.code} ${issue.field}: ${issue.sample}…`);
    }
    process.exit(1);
  }
}

console.log("PASS: audit-bilingual-v2 — no wrong-language slots in watched fields");
