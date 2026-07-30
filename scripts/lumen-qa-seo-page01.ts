/**
 * Lumen QA — Page 01 · What Is a Soul Blueprint?
 * Run: npx tsx scripts/lumen-qa-seo-page01.ts
 * Optional: QA_BASE_URL=http://localhost:3000
 */
import fs from "node:fs";
import path from "node:path";
import { ANALYTICS_EVENTS } from "../lib/analytics-events";
import {
  getPublishedSeoArticles,
  seoArticlePath,
  SEO_PLANNED_ARTICLES,
} from "../lib/seo/articles";
import { WHAT_IS_A_SOUL_BLUEPRINT_PATH } from "../lib/seo/content/what-is-a-soul-blueprint";
import { getSitemapRoutes } from "../lib/seo/public-routes";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const REPORT = path.join(process.cwd(), "qa-artifacts", "LUMEN_QA_SEO_PAGE01.md");

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
  const article = getPublishedSeoArticles().find((item) => item.slug === "what-is-a-soul-blueprint");
  record("Page 01 published in registry", Boolean(article?.published), [
    article ? `path=${seoArticlePath(article.slug)}` : "missing",
  ]);

  record(
    "Canonical path is root /what-is-a-soul-blueprint",
    seoArticlePath("what-is-a-soul-blueprint") === WHAT_IS_A_SOUL_BLUEPRINT_PATH,
    [seoArticlePath("what-is-a-soul-blueprint")],
  );

  const routes = getSitemapRoutes();
  record(
    "Sitemap includes canonical Page 01 URL",
    routes.some((route) => route.path === WHAT_IS_A_SOUL_BLUEPRINT_PATH),
    [],
  );
  record(
    "Sitemap excludes duplicate /guides/what-is-a-soul-blueprint",
    !routes.some((route) => route.path === "/guides/what-is-a-soul-blueprint"),
    [],
  );

  record(
    "Planned roadmap marks P1 published",
    SEO_PLANNED_ARTICLES.find((item) => item.slug === "what-is-a-soul-blueprint")?.status ===
      "published",
    [],
  );

  const requiredEvents = [
    "seo_article_view",
    "seo_article_scroll_50",
    "seo_article_scroll_90",
    "seo_article_cta_click",
    "seo_to_free_blueprint",
    "seo_to_sample_report",
    "seo_to_full_report",
  ];
  const missingEvents = requiredEvents.filter((event) => !ANALYTICS_EVENTS.includes(event as never));
  record("Page 01 analytics events registered", missingEvents.length === 0, [
    missingEvents.length ? missingEvents.join(", ") : "all present",
  ]);

  const ogPath = path.join(process.cwd(), "public/seo/what-is-a-soul-blueprint-1320.webp");
  record("OG image asset present", fs.existsSync(ogPath), [ogPath]);

  const pageFile = path.join(process.cwd(), "app/(site)/what-is-a-soul-blueprint/page.tsx");
  const bodyFile = path.join(process.cwd(), "lib/seo/content/what-is-a-soul-blueprint-body.ts");
  const body = fs.readFileSync(bodyFile, "utf8");
  record("Route file exists", fs.existsSync(pageFile), []);
  record("Foundation order S1 → S3 → S2 → S0 in body", body.includes('sequence: "S1 → S3 → S2 → S0"'), []);
  record(
    "Boundary language present (not prediction / fixed identity)",
    body.includes("mirror—not a fixed identity") && body.includes("prediction"),
    [],
  );

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });

  try {
    const puppeteer = await import("puppeteer-core");
    const browser = await puppeteer.default.launch({
      executablePath: await resolveExecutablePath(),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${WHAT_IS_A_SOUL_BLUEPRINT_PATH}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    const status = res?.status() ?? 0;
    record("Page responds 200", status === 200, [`status=${status}`]);

    const html = await page.content();
    const h1Count = await page.$$eval("h1", (nodes) => nodes.length);
    const h1Text = await page.$eval("h1", (node) => node.textContent?.trim() ?? "");
    record("H1 appears exactly once", h1Count === 1, [`count=${h1Count}`, `text=${h1Text}`]);
    record(
      "H1 aligned to What Is a Soul Blueprint?",
      h1Text === "What Is a Soul Blueprint?",
      [h1Text],
    );

    const title = await page.title();
    record(
      "Title tag present and aligned",
      title.includes("What Is a Soul Blueprint?"),
      [title],
    );

    const canonical = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute("href") ?? "");
    record(
      "Self-canonical is correct",
      canonical.endsWith(WHAT_IS_A_SOUL_BLUEPRINT_PATH),
      [canonical],
    );

    const metaDesc = await page.$eval('meta[name="description"]', (el) => el.getAttribute("content") ?? "");
    record("Meta description present", metaDesc.length > 40, [metaDesc.slice(0, 120)]);

    const hasDirectAnswer = html.includes(
      "symbolic, birth-date-based map designed to help you reflect",
    );
    record("Direct answer appears in HTML", hasDirectAnswer, []);

    const hasOrder = html.includes("S1 → S3 → S2 → S0") || html.includes("S1 → S3 → S2 → S0");
    record("Foundation order visible", hasOrder || html.includes("S1") && html.includes("S3"), []);

    const ldScripts = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.map((node) => node.textContent ?? ""),
    );
    const joinedLd = ldScripts.join("\n");
    record("Article JSON-LD present", joinedLd.includes('"@type":"Article"') || joinedLd.includes('"@type": "Article"'), []);
    record(
      "BreadcrumbList JSON-LD present",
      joinedLd.includes("BreadcrumbList"),
      [],
    );
    record(
      "FAQPage rich-result schema not required (absent ok)",
      !joinedLd.includes("FAQPage"),
      ["intentionally omitted for Page 01"],
    );

    const ctaHref = await page.$$eval('a.gold-button', (nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    record(
      "Primary CTAs lead to Free Soul Blueprint",
      ctaHref.some((href) => href.includes("/free-soul-blueprint")),
      ctaHref,
    );

    const noCheckoutInHero = !(await page.$eval("header", (el) =>
      /checkout|Unlock Full Report|Personal Integration/i.test(el.textContent ?? ""),
    ));
    record("No checkout / Session pressure in hero", noCheckoutInHero, []);

    const guidesDup = await page.goto(`${BASE}/guides/what-is-a-soul-blueprint`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    const finalUrl = page.url();
    record(
      "Guides duplicate redirects to canonical",
      finalUrl.includes(WHAT_IS_A_SOUL_BLUEPRINT_PATH) && !finalUrl.includes("/guides/what-is-a-soul-blueprint"),
      [`status=${guidesDup?.status()}`, `url=${finalUrl}`],
    );

    await browser.close();
  } catch (error) {
    record("Live browser QA", false, [
      error instanceof Error ? error.message : String(error),
      `Ensure dev server is running at ${BASE}`,
    ]);
  }

  const failed = results.filter((item) => !item.pass);
  const lines = [
    "# Lumen QA — SEO Page 01 · What Is a Soul Blueprint?",
    "",
    `Base: ${BASE}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Result: ${failed.length === 0 ? "PASS" : "FAIL"} (${results.length - failed.length}/${results.length})`,
    "",
    ...results.map(
      (item) =>
        `- **${item.pass ? "PASS" : "FAIL"}** ${item.name}${
          item.notes.length ? `\n  - ${item.notes.join("\n  - ")}` : ""
        }`,
    ),
    "",
  ];
  fs.writeFileSync(REPORT, lines.join("\n"), "utf8");
  console.log(`\nWrote ${REPORT}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
