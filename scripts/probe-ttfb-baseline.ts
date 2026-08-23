/**
 * Step 0 / Step 3 — TTFB probe with cold vs warm distinction.
 * Run: npx tsx scripts/probe-ttfb-baseline.ts [paths...]
 *
 * Default targets: /full-report /full-report-v2
 * Each path: 1 cold (Cache-Control: no-cache) + 2 warm (no cache-bust).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { CANONICAL_SITE_URL } from "../lib/platform-config";

const DEFAULT_PATHS = ["/full-report", "/full-report-v2"];
const WARM_SAMPLES = 2;
const PAUSE_MS = 800;

type Run = {
  label: "cold" | "warm";
  status: number;
  ms: number;
  cache: string;
  age: string;
};

async function measure(url: string, cold: boolean): Promise<Run> {
  const headers: Record<string, string> = {};
  if (cold) headers["Cache-Control"] = "no-cache";
  const start = performance.now();
  const res = await fetch(url, { redirect: "follow", headers });
  await res.arrayBuffer();
  return {
    label: cold ? "cold" : "warm",
    status: res.status,
    ms: Math.round(performance.now() - start),
    cache: res.headers.get("x-vercel-cache") ?? "-",
    age: res.headers.get("age") ?? "-",
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const siteUrl = CANONICAL_SITE_URL.replace(/\/$/, "");
  const paths = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_PATHS;
  const stamped = new Date().toISOString().replace(/[:.]/g, "-");
  const rows: { path: string; runs: Run[] }[] = [];

  console.log(`TTFB baseline ${stamped}`);
  console.log("path\tphase\tstatus\tms\tcache\tage");

  for (const routePath of paths) {
    const url = `${siteUrl}${routePath === "/" ? "" : routePath}`;
    const runs: Run[] = [];

    const cold = await measure(url, true);
    runs.push(cold);
    console.log(`${routePath}\tcold\t${cold.status}\t${cold.ms}\t${cold.cache}\t${cold.age}`);
    await sleep(PAUSE_MS);

    for (let i = 0; i < WARM_SAMPLES; i++) {
      const warm = await measure(url, false);
      runs.push(warm);
      console.log(`${routePath}\twarm${i + 1}\t${warm.status}\t${warm.ms}\t${warm.cache}\t${warm.age}`);
      if (i < WARM_SAMPLES - 1) await sleep(PAUSE_MS);
    }

    const coldMs = runs.filter((r) => r.label === "cold").map((r) => r.ms);
    const warmMs = runs.filter((r) => r.label === "warm").map((r) => r.ms);
    console.log(
      `${routePath}\tsummary\tcold=${coldMs.join("/")} warm=${warmMs.join("/")} (min/avg/max warm=${Math.min(...warmMs)}/${Math.round(warmMs.reduce((a, b) => a + b, 0) / warmMs.length)}/${Math.max(...warmMs)})`,
    );
    rows.push({ path: routePath, runs });
  }

  const outDir = path.join(process.cwd(), "qa-artifacts", "discovery-ttfb");
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `ttfb-baseline-${stamped}.json`);
  writeFileSync(
    outFile,
    JSON.stringify({ capturedAt: new Date().toISOString(), siteUrl, rows }, null, 2),
    "utf8",
  );
  console.log(`Wrote ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
