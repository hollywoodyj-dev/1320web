/**
 * Convert RC3 Free Sample gold Markdown → runtime SAMPLE narrative JSON.
 * Does not invent content; preserves section order and body text.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { calculate1320Code } from "../lib/calculate1320Code";

type V2Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

type Chapter = { id: string; title: string; blocks: V2Block[] };

const ROOT = path.resolve(import.meta.dirname, "..");
const PACK = path.join(ROOT, "docs/gzh/v2-free-sample-content-fix-rc3-2026-11-27");
const OUT_DIR = path.join(ROOT, "data/1320-tw-v2");

const BIRTHS = [
  { birth: "1980-05-22", file: "GOLD_STANDARD_FREE_SAMPLE_1980-05-22_RC3.md", status: "REFERENCE_SAMPLE" as const },
  { birth: "1982-02-03", file: "GOLD_STANDARD_FREE_SAMPLE_1982-02-03_RC3.md", status: "EDITORIAL_CANDIDATE" as const },
  { birth: "1983-03-08", file: "GOLD_STANDARD_FREE_SAMPLE_1983-03-08_RC3.md", status: "EDITORIAL_CANDIDATE" as const },
];

function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function stripMdInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function parseTable(lines: string[]): V2Block | null {
  const rows = lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"))
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => stripMdInline(cell.trim())),
    )
    .filter((cells) => cells.some((cell) => cell.length > 0));
  if (rows.length < 2) return null;
  const headers = rows[0];
  const body = rows.slice(1).filter((row) => !row.every((cell) => /^[-:]+$/.test(cell)));
  return { type: "table", headers, rows: body };
}

function blocksFromSection(body: string): V2Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: V2Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      const table = parseTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: stripMdInline(line.slice(4)) });
      i += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(stripMdInline(lines[i].replace(/^>\s?/, "")));
        i += 1;
      }
      blocks.push({ type: "p", text: quote.join("\n") });
      continue;
    }
    if (line.startsWith("#")) {
      i += 1;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].trim().startsWith("|") && !lines[i].startsWith("> ")) {
      para.push(stripMdInline(lines[i]));
      i += 1;
    }
    const text = para.join("\n").trim();
    if (text && text !== "---") blocks.push({ type: "p", text });
  }
  return blocks;
}

function chapterIdFromTitle(title: string): string | null {
  if (/閱讀地圖/.test(title)) return "map";
  const match = title.match(/^0?([1-7])｜/);
  return match ? match[1].padStart(2, "0") : null;
}

function convert(md: string, birth: string, status: "REFERENCE_SAMPLE" | "EDITORIAL_CANDIDATE") {
  const [year, month, day] = birth.split("-").map(Number);
  const code = calculate1320Code(year, month, day);
  const codes = [
    code.s1Code,
    code.s3Code,
    code.s2Code,
    code.s0Code,
    code.s4Code,
    code.s5Code,
    code.s6Code,
    code.s7Code,
    code.s8Code,
    code.s9Code,
  ];

  const normalized = md.replace(/\r\n/g, "\n");
  const sections = normalized.split(/\n(?=## )/);
  const head = sections[0] ?? "";
  const preamble = head
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line !== "---")
    .map((line) => stripMdInline(line.replace(/^>\s?/, "")));

  const chapters: Chapter[] = [];
  for (const section of sections.slice(1)) {
    const firstNl = section.indexOf("\n");
    const titleLine = (firstNl === -1 ? section : section.slice(0, firstNl)).replace(/^##\s+/, "").trim();
    const body = firstNl === -1 ? "" : section.slice(firstNl + 1);
    const id = chapterIdFromTitle(titleLine);
    if (!id) continue;
    chapters.push({
      id,
      title: titleLine,
      blocks: blocksFromSection(body),
    });
  }

  const required = ["01", "02", "03", "04", "05", "06", "07"];
  for (const id of required) {
    if (!chapters.some((chapter) => chapter.id === id)) {
      throw new Error(`${birth} missing chapter ${id}`);
    }
  }

  return {
    version: "2.0",
    product: "SAMPLE",
    status,
    birth,
    codes,
    approval: "PENDING_REVIEW",
    customer_render: "BLOCKED",
    note: "RC3 Free Sample gold ingest · Preview only · not customer-publishable",
    source_md_sha256: sha256(normalized),
    preamble,
    chapters,
  };
}

const rows: string[] = ["birthday,out_file,text_chars,source_md_sha256,chapters,status"];

for (const item of BIRTHS) {
  const mdPath = path.join(PACK, item.file);
  const md = fs.readFileSync(mdPath, "utf8");
  const narrative = convert(md, item.birth, item.status);
  const outName = `free-sample-${item.birth}.json`;
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(outPath, `${JSON.stringify(narrative, null, 2)}\n`, "utf8");
  const textChars = [...narrative.preamble, ...narrative.chapters.flatMap((c) => c.blocks.map((b) => ("text" in b ? b.text : b.headers.join(" ") + b.rows.flat().join(" "))))]
    .join("")
    .replace(/\s+/g, "").length;
  rows.push(
    `${item.birth},${outName},${textChars},${narrative.source_md_sha256},${narrative.chapters.map((c) => c.id).join(">")},${item.status}`,
  );
  console.log("wrote", outName, "chapters", narrative.chapters.map((c) => c.id).join(","), "textChars≈", textChars);
}

fs.writeFileSync(path.join(PACK, "candidate_content_trace.csv"), `${rows.join("\n")}\n`, "utf8");
console.log("trace → docs/gzh/v2-free-sample-content-fix-rc3-2026-11-27/candidate_content_trace.csv");
