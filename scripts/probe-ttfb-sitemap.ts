/**
 * Discovery audit — TTFB probe for all sitemap URLs (3 samples each).
 * Run: npx tsx scripts/probe-ttfb-sitemap.ts
 */
import { CANONICAL_SITE_URL } from "../lib/platform-config";
import { getSitemapRoutes } from "../lib/seo/public-routes";

const SAMPLES = 3;
const PAUSE_MS = 500;

async function measure(url: string) {
  const start = performance.now();
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "Cache-Control": "no-cache" },
  });
  await res.arrayBuffer();
  return {
    status: res.status,
    ms: Math.round(performance.now() - start),
    cache: res.headers.get("x-vercel-cache") ?? "-",
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const siteUrl = CANONICAL_SITE_URL.replace(/\/$/, "");
  const routes = getSitemapRoutes();

  console.log("path\tstatus\tmin/avg/max ms\tcache runs");
  for (const route of routes) {
    const url = `${siteUrl}${route.path === "/" ? "" : route.path}`;
    const runs = [];
    for (let i = 0; i < SAMPLES; i++) {
      runs.push(await measure(url));
      if (i < SAMPLES - 1) await sleep(PAUSE_MS);
    }
    const values = runs.map((r) => r.ms);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    console.log(
      `${route.path}\t${runs[0].status}\t${min}/${avg}/${max}\t${runs.map((r) => r.cache).join(",")}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
