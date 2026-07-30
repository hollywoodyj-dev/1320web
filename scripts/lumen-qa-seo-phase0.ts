/**
 * Lumen QA — SEO Phase 0 Technical Foundation
 * Run: npx tsx scripts/lumen-qa-seo-phase0.ts
 */
import fs from "node:fs";
import path from "node:path";
import { getPublishedSeoArticles, SEO_PLANNED_ARTICLES } from "../lib/seo/articles";
import { getSitemapRoutes } from "../lib/seo/public-routes";
import { ANALYTICS_EVENTS } from "../lib/analytics-events";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_SEO_PHASE0.md");

type Check = { name: string; pass: boolean; notes: string[] };
const results: Check[] = [];

function record(name: string, pass: boolean, notes: string[] = []) {
  results.push({ name, pass, notes });
  console.log(`\n=== ${name}: ${pass ? "PASS" : "FAIL"} ===`);
  for (const note of notes) console.log(`  - ${note}`);
}

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  const requiredEvents = [
    "seo_article_view",
    "seo_article_scroll_50",
    "seo_article_cta_click",
    "seo_to_free_blueprint",
    "free_blueprint_started",
    "free_blueprint_completed",
    "free_to_full_report",
    "seo_to_session",
  ];
  const missingEvents = requiredEvents.filter((event) => !ANALYTICS_EVENTS.includes(event as never));
  record("Required SEO analytics events registered", missingEvents.length === 0, [
    missingEvents.length ? missingEvents.join(", ") : "all present",
  ]);

  const routes = getSitemapRoutes();
  record(
    "Sitemap includes /guides",
    routes.some((route) => route.path === "/guides"),
    [routes.map((route) => route.path).join(", ")],
  );
  record(
    "No unpublished article paths in sitemap",
    getPublishedSeoArticles().every((article) =>
      routes.some((route) => route.path === `/guides/${article.slug}`),
    ) &&
      !routes.some(
        (route) =>
          route.path.startsWith("/guides/") &&
          !getPublishedSeoArticles().some((article) => route.path === `/guides/${article.slug}`),
      ),
    [`published=${getPublishedSeoArticles().length} planned=${SEO_PLANNED_ARTICLES.length}`],
  );

  record(
    "Article template + hub files exist",
    fs.existsSync(path.join(process.cwd(), "components/seo/seo-article-template.tsx")) &&
      fs.existsSync(path.join(process.cwd(), "app/(site)/guides/page.tsx")),
    [],
  );

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });

  try {
    const puppeteer = await import("puppeteer-core");
    const browser = await puppeteer.default.launch({
      executablePath: await resolveExecutablePath(),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: { width: 1280, height: 900 },
    });
    try {
      const page = await browser.newPage();
      const response = await page.goto(`${BASE}/guides`, {
        waitUntil: "networkidle2",
        timeout: 90_000,
      });
      const status = response?.status() ?? 0;
      const text = await page.evaluate(() => (document.body.textContent ?? "").replace(/\s+/g, " "));
      record(
        "Guides hub loads",
        status === 200 && /1320 Guides|Soul Blueprint/i.test(text),
        [`status=${status}`],
      );
      record(
        "Guides hub shows roadmap",
        /What Is a Soul Blueprint/i.test(text) && /Coming Next|P1/i.test(text),
        [],
      );

      const sitemapRes = await page.goto(`${BASE}/sitemap.xml`, {
        waitUntil: "networkidle2",
        timeout: 60_000,
      });
      const sitemapText = await page.evaluate(() => document.body?.textContent ?? "");
      record(
        "Sitemap lists guides hub on canonical host",
        (sitemapRes?.status() ?? 0) === 200 &&
          /www\.1320soulcode\.com\/guides/.test(sitemapText) &&
          !/thesoulprofile\.com\/guides/.test(sitemapText),
        [],
      );
    } finally {
      await browser.close();
    }
  } catch (error) {
    record("Browser QA", false, [error instanceof Error ? error.message : String(error)]);
  }

  const failed = results.filter((item) => !item.pass);
  const lines = [
    "# Lumen QA — SEO Phase 0 Technical Foundation",
    "",
    `Base: ${BASE}`,
    `Date: ${new Date().toISOString()}`,
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"}`,
    "",
    ...results.map(
      (item) =>
        `- **${item.name}**: ${item.pass ? "PASS" : "FAIL"} — ${item.notes.join("; ")}`,
    ),
    "",
  ];
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");
  console.log(`\nWrote ${REPORT}`);
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
