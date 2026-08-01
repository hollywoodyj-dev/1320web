/**
 * Lumen production QA for Page 05.
 * Run: npx tsx scripts/lumen-qa-seo-page05.ts
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const ROUTE = "/birthday-number-vs-life-path-number-vs-soul-blueprint";
const PAGE_URL = `${BASE}${ROUTE}`;
const OG_PATH = "/seo/birthday-number-vs-life-path-number-vs-soul-blueprint-1320.webp";
const OUT = path.join(process.cwd(), "qa-artifacts", "seo-page05-production-a3c4d6c");

type Check = { name: string; pass: boolean; detail: unknown };
const checks: Check[] = [];
const check = (name: string, pass: boolean, detail: unknown = "") => checks.push({ name, pass, detail });
const step = (name: string) => console.log(`[page05-qa] ${new Date().toISOString()} ${name}`);
const fetchBounded = (url: string, init: RequestInit = {}) =>
  fetch(url, { ...init, signal: AbortSignal.timeout(15_000) });
async function bounded<T>(label: string, promise: Promise<T>, timeoutMs = 30_000): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} exceeded ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function executablePath() {
  const configured = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (configured) return configured;
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(chrome)) return chrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  step("fetch canonical HTML");
  const response = await fetchBounded(PAGE_URL, { redirect: "manual" });
  const initialHtml = await response.text();
  check("Canonical route returns HTTP 200", response.status === 200, response.status);
  check("Canonical response is indexable", !/noindex/i.test(response.headers.get("x-robots-tag") ?? ""), response.headers.get("x-robots-tag") ?? "(none)");
  check("Core article answer is present in initial HTML",
    initialHtml.includes("Your Birthday Number begins with the day you were born") &&
    initialHtml.includes("A Life Path Number is calculated from your full birth date") &&
    initialHtml.includes("separate S0–S9 symbolic framework"), "required answer phrases");
  check("Initial HTML contains no birth-date result URL", !/[?&](?:birth(?:date|_date)?|year|month|day)=/i.test(initialHtml), "query scan");

  step("fetch redirect, sitemap, and OG asset");
  const duplicate = await fetchBounded(`${BASE}/guides${ROUTE}`, { redirect: "manual" });
  check("Duplicate guide route returns exact HTTP 301", duplicate.status === 301, { status: duplicate.status, location: duplicate.headers.get("location") });
  check("Duplicate guide route targets canonical path", duplicate.headers.get("location") === ROUTE, duplicate.headers.get("location"));

  const sitemap = await fetchBounded(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  check("Canonical route appears in sitemap", sitemap.ok && sitemapText.includes(`<loc>${PAGE_URL}</loc>`), sitemap.status);

  const ogResponse = await fetchBounded(`${BASE}${OG_PATH}`);
  const ogBuffer = Buffer.from(await ogResponse.arrayBuffer());
  const sharp = (await import("sharp")).default;
  const ogMetadata = await sharp(ogBuffer).metadata();
  fs.writeFileSync(path.join(OUT, "birthday-number-vs-life-path-number-vs-soul-blueprint-1320-live.webp"), ogBuffer);
  check("Live OG asset is a 1200×630 WebP", ogResponse.status === 200 && ogMetadata.format === "webp" && ogMetadata.width === 1200 && ogMetadata.height === 630,
    { status: ogResponse.status, format: ogMetadata.format, width: ogMetadata.width, height: ogMetadata.height, bytes: ogBuffer.length,
      sha256: crypto.createHash("sha256").update(ogBuffer).digest("hex") });

  step("launch Chromium");
  const puppeteer = await import("puppeteer-core");
  const browser = await bounded("Chromium launch", puppeteer.default.launch({ executablePath: await executablePath(), headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] }), 30_000);
  try {
  const page = await browser.newPage();
  const consoleErrors: string[] = [];
  const requests: Array<{ url: string; resource: string; method: string }> = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("request", (request) => requests.push({ url: request.url(), resource: request.resourceType(), method: request.method() }));
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  step("navigate desktop");
  const navigation = await bounded("desktop navigation", page.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 }), 35_000);
  await new Promise((resolve) => setTimeout(resolve, 1_500));
  await page.evaluate("globalThis.__name = (target) => target");
  check("Browser navigation returns HTTP 200", navigation?.status() === 200, navigation?.status());

  step("evaluate desktop assertions");
  const desktop = await bounded("desktop evaluation", page.evaluate((expectedUrl, expectedOg) => {
    const text = document.body.innerText.replace(/\s+/g, " ").trim();
    const allText = (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
    const pageRoot = document.querySelector(".bnvs-page")!;
    const hero = document.querySelector(".bnvs-hero")!;
    const direct = document.querySelector(".bnvs-direct-answer");
    const directStart = "A Birthday Number is a numerology interpretation based mainly on the day";
    const directIndex = text.indexOf(directStart);
    const directWordIndex = directIndex < 0 ? -1 : text.slice(0, directIndex).split(/\s+/).filter(Boolean).length;
    const links = Array.from(pageRoot.querySelectorAll<HTMLAnchorElement>("a")).map((a) => ({
      text: (a.textContent ?? "").replace(/\s+/g, " ").trim(), path: new URL(a.href).pathname,
      inHero: Boolean(a.closest(".bnvs-hero")), inArticle: Boolean(a.closest(".bnvs-article")),
      top: Math.round(a.getBoundingClientRect().top + scrollY), classes: a.className,
    }));
    const primaryCtas = links.filter((link) => link.classes.includes("gold-button"));
    const firstViewportGold = Array.from(document.querySelectorAll<HTMLElement>(".gold-button")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0;
    }).map((element) => (element.textContent ?? "").replace(/\s+/g, " ").trim());
    const ld = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')).map((script) => {
      try { return JSON.parse(script.textContent ?? ""); } catch { return null; }
    }).filter(Boolean);
    const article = ld.find((item) => item?.["@type"] === "Article");
    const breadcrumb = ld.find((item) => item?.["@type"] === "BreadcrumbList");
    const sequences = Array.from(text.matchAll(/S\d\s*→\s*S\d\s*→\s*S\d\s*→\s*S\d/g)).map((match) => match[0].replace(/\s+/g, " "));
    const table = document.querySelector(".bnvs-comparison-table");
    const cards = document.querySelector(".bnvs-mobile-cards");
    const visible = (el: Element | null) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect(); const style = getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const heroText = (hero.textContent ?? "").replace(/\s+/g, " ").trim();
    const heroFigure = document.querySelector<HTMLElement>(".bnvs-hero-figure");
    const directBox = direct?.getBoundingClientRect();
    const figureBox = heroFigure?.getBoundingClientRect();
    const img = document.querySelector<HTMLImageElement>(".bnvs-hero-image");
    return {
      title: document.title,
      description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
      robots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
      og: document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? "",
      twitter: document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content ?? "",
      h1Count: document.querySelectorAll("h1").length,
      h1: (document.querySelector("h1")?.textContent ?? "").replace(/\s+/g, " ").trim(),
      directWordIndex,
      article, breadcrumb, links, primaryCtas, firstViewportGold, sequences,
      tableVisible: visible(table), cardsVisible: visible(cards),
      tableRows: document.querySelectorAll(".bnvs-comparison-table tbody tr").length,
      meaningRows: document.querySelectorAll(".bnvs-meaning-table tbody tr").length,
      controls: pageRoot.querySelectorAll("form,input,select,textarea,button").length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth,
      heroPressure: /full report|checkout|session|email gate|email required|buy now|purchase/i.test(heroText),
      heroAnswerBeforeArt: Boolean(directBox && figureBox && directBox.top < figureBox.top),
      alt: img?.alt ?? "", expectedUrl, expectedOg,
      text, allText,
    };
  }, PAGE_URL, `${BASE}${OG_PATH}`), 30_000);

  check("Title and meta description are present and H1-aligned",
    desktop.title === "Birthday Number vs Life Path Number vs Soul Blueprint | 1320" && desktop.description.length >= 120 &&
    /Birthday Number/i.test(desktop.description) && /Life Path/i.test(desktop.description) && /Soul Blueprint/i.test(desktop.description),
    { title: desktop.title, description: desktop.description });
  check("Self-canonical is correct and robots permit indexing", desktop.canonical === PAGE_URL && !/noindex/i.test(desktop.robots), { canonical: desktop.canonical, robots: desktop.robots });
  check("H1 appears once with exact text", desktop.h1Count === 1 && desktop.h1 === "Birthday Number vs Life Path Number vs Soul Blueprint", `${desktop.h1Count} × ${desktop.h1}`);
  check("Direct answer appears early in rendered text", desktop.directWordIndex >= 0 && desktop.directWordIndex <= 120, desktop.directWordIndex);
  check("Article JSON-LD has 1320 Soul Code Organization author and publisher",
    desktop.article?.["@type"] === "Article" && desktop.article?.author?.["@type"] === "Organization" && desktop.article?.author?.name === "1320 Soul Code" &&
    desktop.article?.publisher?.["@type"] === "Organization" && desktop.article?.publisher?.name === "1320 Soul Code" && desktop.article?.url === PAGE_URL, desktop.article);
  check("BreadcrumbList JSON-LD validates canonical trail", desktop.breadcrumb?.["@type"] === "BreadcrumbList" &&
    desktop.breadcrumb?.itemListElement?.length === 3 && desktop.breadcrumb?.itemListElement?.[2]?.item === PAGE_URL, desktop.breadcrumb?.itemListElement);
  check("OG and Twitter metadata reference the required live asset", desktop.og === `${BASE}${OG_PATH}` && desktop.twitter === `${BASE}${OG_PATH}`, { og: desktop.og, twitter: desktop.twitter });

  const t = desktop.text;
  check("Birthday Number uses mainly the birth day and preserves original/reduced forms", t.includes("based on the calendar day") && t.includes("Keep the original day visible") && t.includes("14/5") && t.includes("29/11") && t.includes("31/4"), "day method and examples present");
  check("Compound conventions and Birth Number terminology are tradition-dependent", t.includes("depending on the numerology tradition") && t.includes("Some traditions use the term Birth Number") && t.includes("Other traditions use the same words differently"), "variance language present");
  check("Master Numbers are not framed as spiritually superior", desktop.allText.includes("should not be framed as spiritually superior or more valuable") && t.includes("spiritual rank"), "visible boundary plus FAQ answer present in DOM");
  check("Birthday Number is not science, prediction, or a complete personality", t.includes("not scientifically established traits") && t.includes("scientific diagnosis, reliable prediction") && t.includes("complete personality"), "explicit boundaries present");
  check("No 31-entry birthday directory or personality test", desktop.meaningRows === 11 && !/personality test/i.test(t), { meaningRows: desktop.meaningRows });
  check("Life Path uses month + day + year with correct worked example", t.includes("month, day and year") && t.includes("14 June 1990") && t.includes("Birthday Number: 14/5") && t.includes("Life Path Number: 3"), "method and example present");
  check("Life Path remains a separate calculator tool, not a duplicate calculator", desktop.controls === 0 && desktop.links.some((link) => link.text === "Calculate My Life Path Number" && link.path === "/what-is-my-life-path-number"), { controls: desktop.controls });
  check("Life Path is not called Birthday Number or an S-code", t.includes("The Birthday Number is not a smaller Life Path Number") && t.includes("It does not present the Birthday Number or Life Path Number as the person’s Soul Blueprint"), "concept boundaries present");
  check("Life Path meaning directory is not duplicated", !Array.from({ length: 9 }, (_, i) => `Life Path ${i + 1}`).every((label) => t.includes(label)), "no 1–9 directory");
  check("1320 is proprietary and not conventional numerology", t.includes("separate proprietary calculation framework") && t.includes("not a conventional numerology number"), "framework language present");
  check("Foundation order is S1 → S3 → S2 → S0 everywhere", desktop.sequences.length >= 3 && desktop.sequences.every((sequence) => sequence === "S1 → S3 → S2 → S0"), desktop.sequences);
  check("Full map is framed as S0–S9 and numerology numbers are not 1320 outputs", t.includes("Full Soul Blueprint extends through S0–S9") && t.includes("does not present the Birthday Number or Life Path Number as the person’s Soul Blueprint"), "map and output boundary present");
  check("User authority and non-superiority are explicit", t.includes("without taking authority away from your lived experience") && t.includes("There is no objective test proving") && t.includes("Broader input does not automatically mean complete truth"), "authority language present");
  check("Three lenses are unranked and matching numbers do not imply destiny", t.includes("separate symbolic systems with different calculations, structures and purposes") && t.includes("does not make the person more powerful, evolved or destined"), "different-not-ranked boundary present");
  check("Comparison distinguishes input, method, output, and purpose", desktop.tableRows === 11 && ["Starting input", "Category", "Typical output", "Main focus"].every((phrase) => t.includes(phrase)), { tableRows: desktop.tableRows });
  check("Page 03/04/05 intent boundaries are preserved", t.includes("Birthday Number generally based") || t.includes("Birthday Number is generally based") ?
    desktop.links.some((link) => link.path === "/what-is-my-life-path-number") && desktop.links.some((link) => link.path === "/numerology-by-date-of-birth-vs-soul-blueprint") : false,
    desktop.links.filter((link) => /life-path-number|numerology-by-date/.test(link.path)));

  check("Hero/mid/final primary CTAs all target Free Soul Blueprint", desktop.primaryCtas.length === 3 && desktop.primaryCtas.every((cta) => cta.text === "Discover My Free Soul Blueprint" && cta.path === "/free-soul-blueprint") && desktop.primaryCtas.some((cta) => cta.inHero), desktop.primaryCtas);
  check("Life Path utility is visually secondary and correctly linked", desktop.links.filter((link) => link.text === "Calculate My Life Path Number").length >= 2 && desktop.links.filter((link) => link.text === "Calculate My Life Path Number").every((link) => link.path === "/what-is-my-life-path-number" && link.classes.includes("secondary")), desktop.links.filter((link) => /Calculate My Life Path/.test(link.text)));
  check("Pages 01 and 04 are linked contextually", ["/what-is-a-soul-blueprint", "/numerology-by-date-of-birth-vs-soul-blueprint"].every((path) => desktop.links.some((link) => link.path === path)), desktop.links.filter((link) => /what-is-a-soul|numerology-by-date/.test(link.path)));
  check("First 1280px viewport has exactly one dominant gold CTA", desktop.firstViewportGold.length === 1, desktop.firstViewportGold);
  check("Desktop comparison table is visible and cards hidden", desktop.tableVisible && !desktop.cardsVisible, { table: desktop.tableVisible, cards: desktop.cardsVisible });
  check("No horizontal overflow at 1280px", !desktop.overflow, { scrollWidth: desktop.scrollWidth, clientWidth: desktop.clientWidth });
  check("Hero answer precedes artwork and no Birthday Number form exists", desktop.heroAnswerBeforeArt && desktop.controls === 0, { answerBeforeArt: desktop.heroAnswerBeforeArt, controls: desktop.controls });
  check("Hero has no checkout, report, session, or email-gate pressure", !desktop.heroPressure, desktop.heroPressure);
  check("Artwork alt carries the required three-lens comparison", /Birthday(?: Number)? 14\/5/i.test(desktop.alt) && /Life Path(?: Number)? 3/i.test(desktop.alt) && /S1\s*(?:→|,)\s*S3\s*(?:→|,)\s*S2\s*(?:→|(?:,\s*)?and)\s*S0/i.test(desktop.alt), desktop.alt);

  step("capture desktop screenshots");
  await bounded("desktop viewport screenshot", page.screenshot({ path: path.join(OUT, "page05-1280-first-viewport.png") }), 30_000);
  await bounded("desktop full screenshot", page.screenshot({ path: path.join(OUT, "page05-1280-full.png"), fullPage: true }), 45_000);

  const apiRequests = requests.filter((request) => ["fetch", "xhr"].includes(request.resource) && /\/api\//.test(request.url));
  check("No Blueprint Resolver, Birthday result route, or calculation API call", apiRequests.length === 0 && !requests.some((request) => /blueprint.*resolver|resolve.*blueprint|birthday.*result|api\/(?:result|calculate|resolve)/i.test(request.url)), apiRequests);

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  step("navigate mobile");
  await bounded("mobile navigation", mobile.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 }), 35_000);
  await new Promise((resolve) => setTimeout(resolve, 1_500));
  await mobile.evaluate("globalThis.__name = (target) => target");
  const mobileState = await mobile.evaluate(() => {
    const visible = (selector: string) => { const el = document.querySelector(selector); if (!el) return false; const rect = el.getBoundingClientRect(); const s = getComputedStyle(el); return s.display !== "none" && s.visibility !== "hidden" && rect.width > 0 && rect.height > 0; };
    return { tableVisible: visible(".bnvs-comparison-table"), cardsVisible: visible(".bnvs-mobile-cards"), cardCount: document.querySelectorAll(".bnvs-mobile-card").length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
  });
  check("Mobile cards replace comparison table at 390px", !mobileState.tableVisible && mobileState.cardsVisible && mobileState.cardCount === 11, mobileState);
  check("No horizontal overflow at 390px", !mobileState.overflow, mobileState);
  step("capture mobile screenshots");
  await bounded("mobile viewport screenshot", mobile.screenshot({ path: path.join(OUT, "page05-390-first-viewport.png") }), 30_000);
  await bounded("mobile full screenshot", mobile.screenshot({ path: path.join(OUT, "page05-390-full.png"), fullPage: true }), 45_000);

  step("check linked routes");
  for (const target of ["/free-soul-blueprint", "/what-is-my-life-path-number", "/what-is-a-soul-blueprint", "/numerology-by-date-of-birth-vs-soul-blueprint"]) {
    const linked = await fetchBounded(`${BASE}${target}`, { redirect: "manual" });
    check(`Linked route ${target} is live`, linked.status === 200, linked.status);
  }
  check("No production console/page errors", consoleErrors.length === 0, consoleErrors);
  } finally {
    step("close Chromium");
    await bounded("Chromium close", browser.close(), 10_000).catch((error) => console.error(error));
  }

  step("write results");
  fs.writeFileSync(path.join(OUT, "page05-production-checks.json"), JSON.stringify(checks, null, 2));
  for (const item of checks) console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${JSON.stringify(item.detail)}`);
  const failures = checks.filter((item) => !item.pass);
  console.log(`\nSUMMARY ${checks.length - failures.length}/${checks.length} passed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
