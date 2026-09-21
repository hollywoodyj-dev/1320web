/**
 * T18 N0.5 — live calculator triplet survey with per-date evidence.
 * Closure: ≥2 evidenced A / A′ / B + ≥2 mismatches + ~8 closed rows (see N0_5_T18_CONVENTION_PROVENANCE.md).
 * Checklist: npx tsx scripts/probe-t18-survey-closure.ts
 * Run: npx tsx scripts/probe-t18-calculator-survey.ts
 */
import fs from "node:fs";
import path from "node:path";
import {
  T18_PROVENANCE_TEST_DATES,
  classifyMeasuredTriplet,
  type LifePathTriplet,
} from "../lib/t18/life-path-conventions";

type ProseConvention = "A" | "B" | "other" | "undeclared";

type DateEvidence = {
  output: number | null;
  htmlSnippet: string | null;
  screenshotPath: string | null;
  error: string | null;
};

type SurveyRow = {
  name: string;
  url: string;
  proseDeclared: ProseConvention;
  dates: Record<string, DateEvidence>;
  triplet: string | null;
  outputMeasured: string;
  proseOutputMismatch: boolean;
  rowClosed: boolean;
};

async function executablePath(): Promise<string> {
  const configured = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (configured) return configured;
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(chrome)) return chrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Prefer result containers; avoid static worked-example paragraphs. */
async function extractResultEvidence(
  page: import("puppeteer-core").Page,
): Promise<{ output: number | null; htmlSnippet: string | null }> {
  return page.evaluate(() => {
    const selectors = [
      "[data-life-path-result]",
      "[data-result]",
      "#result",
      ".result",
      ".calculator-result",
      "[class*='result' i]",
      "output",
    ];

    for (const selector of selectors) {
      const node = document.querySelector(selector);
      if (node && node.textContent && node.textContent.trim().length < 800) {
        const text = node.textContent;
        const match =
          text.match(/\b(11|22|33)\b/) ??
          text.match(/life path[^0-9]{0,20}(\d{1,2})/i) ??
          text.match(/\b([1-9])\b/);
        const output = match ? Number(match[1] ?? match[0]) : null;
        return { output, htmlSnippet: node.outerHTML.slice(0, 2000) };
      }
    }

    // Fallback: scan for post-form result headings only (exclude long article body)
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,strong,p,div")].filter((el) => {
      const t = el.textContent ?? "";
      return (
        t.length < 200 &&
        /life path/i.test(t) &&
        /\b(11|22|33|[1-9])\b/.test(t) &&
        !/1984-07-29|Working Through/i.test(t)
      );
    });
    const node = headings[0];
    if (node) {
      const text = node.textContent ?? "";
      const match = text.match(/\b(11|22|33)\b/) ?? text.match(/\b([1-9])\b/);
      return {
        output: match ? Number(match[1] ?? match[0]) : null,
        htmlSnippet: node.outerHTML.slice(0, 2000),
      };
    }

    return { output: null, htmlSnippet: null };
  });
}

async function runAgentCalc(
  page: import("puppeteer-core").Page,
  year: number,
  month: number,
  day: number,
): Promise<DateEvidence> {
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  await page.goto("https://agentcalc.com/numerology-life-path-calculator", {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForSelector('input[type="date"]', { timeout: 15_000 });
  await page.evaluate((value) => {
    const input = document.querySelector('input[type="date"]') as HTMLInputElement | null;
    if (!input) return;
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, iso);
  await page.evaluate(() => {
    const calc = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Calculate");
    calc?.click();
  });
  await new Promise((r) => setTimeout(r, 2500));
  const { output, htmlSnippet } = await extractResultEvidence(page);
  return { output, htmlSnippet, screenshotPath: null, error: output === null ? "no result node" : null };
}

const TARGETS: Array<{
  name: string;
  url: string;
  proseDeclared: ProseConvention;
  run: typeof runAgentCalc;
}> = [
  {
    name: "AgentCalc",
    url: "https://agentcalc.com/numerology-life-path-calculator",
    proseDeclared: "A",
    run: runAgentCalc,
  },
];

async function main() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await executablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const evidenceRoot = path.join(process.cwd(), "qa-artifacts", "t18-calculator-survey");
  fs.mkdirSync(evidenceRoot, { recursive: true });

  const rows: SurveyRow[] = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const target of TARGETS) {
      const slug = slugify(target.name);
      const calcDir = path.join(evidenceRoot, slug);
      fs.mkdirSync(calcDir, { recursive: true });

      const dates: Record<string, DateEvidence> = {};
      const outputs: Array<number | null> = [];

      for (const d of T18_PROVENANCE_TEST_DATES) {
        const label = `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
        try {
          const evidence = await target.run(page, d.year, d.month, d.day);
          outputs.push(evidence.output);

          const snippetPath = path.join(calcDir, `${label}.html-snippet.txt`);
          if (evidence.htmlSnippet) {
            fs.writeFileSync(snippetPath, evidence.htmlSnippet);
          }
          const shotPath = path.join(calcDir, `${label}.png`);
          await page.screenshot({ path: shotPath, fullPage: false }).catch(() => {});
          evidence.screenshotPath = fs.existsSync(shotPath)
            ? path.relative(process.cwd(), shotPath)
            : null;

          dates[label] = {
            ...evidence,
            htmlSnippet: evidence.htmlSnippet ? path.relative(process.cwd(), snippetPath) : null,
          };
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          outputs.push(null);
          dates[label] = {
            output: null,
            htmlSnippet: null,
            screenshotPath: null,
            error: message,
          };
        }
      }

      const triplet = outputs.every((v) => v !== null) ? (outputs as LifePathTriplet) : null;
      const outputMeasured = classifyMeasuredTriplet(triplet);
      const hasEvidence = Object.values(dates).every(
        (d) => d.output !== null && (d.htmlSnippet || d.screenshotPath),
      );
      const proseOutputMismatch = Boolean(
        triplet &&
          outputMeasured !== "UNKNOWN" &&
          outputMeasured !== "SCRAPE_FAILED" &&
          outputMeasured !== "INCOMPLETE" &&
          target.proseDeclared !== "undeclared" &&
          target.proseDeclared !== "other" &&
          outputMeasured !== target.proseDeclared,
      );

      const row: SurveyRow = {
        name: target.name,
        url: target.url,
        proseDeclared: target.proseDeclared,
        dates,
        triplet: triplet?.join(",") ?? null,
        outputMeasured,
        proseOutputMismatch,
        rowClosed: Boolean(
          triplet &&
            hasEvidence &&
            outputMeasured !== "UNKNOWN" &&
            outputMeasured !== "SCRAPE_FAILED" &&
            outputMeasured !== "INCOMPLETE",
        ),
      };
      rows.push(row);
      console.log(JSON.stringify(row, null, 2));
    }
  } finally {
    await browser.close();
  }

  const outPath = path.join(process.cwd(), "qa-artifacts", "t18-calculator-survey-partial.json");
  fs.writeFileSync(outPath, `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`\nWrote ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
