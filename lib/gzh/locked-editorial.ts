import { readFileSync } from "node:fs";
import path from "node:path";

export type LockedEntry = {
  index: number;
  endIndex: number | null;
  title: string;
  paragraphs: string[];
  sourceFile: string;
};

const HEADING = /^##\s+(?:S\d+-)?(\d+)(?:\s*[–—-]\s*(\d+))?｜(.+)$/;

function paragraphsAfterFull(section: string): string[] {
  const marker = section.split(/\r?\n/).findIndex((line) => line.trim() === "新版 Full");
  if (marker < 0) return [];
  const body = section
    .split(/\r?\n/)
    .slice(marker + 1)
    .join("\n")
    .trim();
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, "").trim())
    .filter(Boolean);
}

export function parseLockedEditorial(sourceFile: string, markdown: string): LockedEntry[] {
  const normalized = markdown.replace(/^\uFEFF/, "");
  const parts = normalized.split(/\r?\n(?=##\s+)/);
  const entries: LockedEntry[] = [];
  for (const part of parts) {
    const firstLine = part.split(/\r?\n/, 1)[0]?.trim() ?? "";
    const match = HEADING.exec(firstLine);
    if (!match) continue;
    const index = Number(match[1]);
    const endIndex = match[2] ? Number(match[2]) : null;
    entries.push({
      index,
      endIndex,
      title: match[3].trim(),
      paragraphs: paragraphsAfterFull(part),
      sourceFile,
    });
  }
  return entries;
}

const FILE_NAMES = [
  "1320_S0_EDITORIAL_PASS_v0.1.md",
  "1320_S1_EDITORIAL_PASS_v0.1.md",
  "1320_S2_EDITORIAL_PASS_v0.1.md",
  "1320_S3_EDITORIAL_PASS_v0.1.md",
  "1320_S4_EDITORIAL_PASS_v0.1.md",
  "1320_S5_EDITORIAL_PASS_v0.1.md",
  "1320_S5_RELATIONSHIP_EDITORIAL_PASS_v0.1.md",
  "1320_S5_EXPRESSION_EDITORIAL_PASS_v0.1.md",
  "1320_S5_PATTERN_EDITORIAL_PASS_v0.1.md",
  "1320_S6_EDITORIAL_PASS_v0.1.md",
  "1320_S7_EDITORIAL_PASS_v0.1.md",
  "1320_S8_EDITORIAL_PASS_v0.1.md",
  "1320_S9_EDITORIAL_PASS_v0.1.md",
  "1320_SEVEN_DAY_EDITORIAL_PASS_v0.1.md",
] as const;

export type LockedLibrary = Record<(typeof FILE_NAMES)[number], LockedEntry[]>;

let cached: LockedLibrary | null = null;

export function lockedEditorialFiles(): readonly string[] {
  return FILE_NAMES;
}

export function loadLockedLibrary(): LockedLibrary {
  if (cached) return cached;
  const directory = path.join(process.cwd(), "docs", "gzh");
  const library = {} as LockedLibrary;
  for (const fileName of FILE_NAMES) {
    const markdown = readFileSync(path.join(directory, fileName), "utf8");
    library[fileName] = parseLockedEditorial(fileName, markdown);
  }
  cached = library;
  return library;
}

export function findLockedEntry(entries: LockedEntry[], number: number): LockedEntry | null {
  const exact = entries.filter((entry) => entry.endIndex == null && entry.index === number);
  if (exact.length === 1) return exact[0];
  if (exact.length > 1) return null;
  const ranged = entries.filter(
    (entry) => entry.endIndex != null && number >= entry.index && number <= entry.endIndex,
  );
  return ranged.length === 1 ? ranged[0] : null;
}

export function duplicateLockedIndexes(entries: LockedEntry[]): number[] {
  const seen = new Set<number>();
  const duplicates = new Set<number>();
  for (const entry of entries) {
    if (entry.endIndex != null) continue;
    if (seen.has(entry.index)) duplicates.add(entry.index);
    seen.add(entry.index);
  }
  return [...duplicates];
}
