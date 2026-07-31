/**
 * Lumen production QA for Page 04.
 * Run: npx tsx scripts/lumen-qa-seo-page04.ts
 * Optional: QA_BASE_URL=https://www.1320soulcode.com
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const ROUTE = "/numerology-by-date-of-birth-vs-soul-blueprint";
const PAGE_URL = `${BASE}${ROUTE}`;
const OUT = path.join(process.cwd(), "qa-artifacts", "seo-page04-production-c02b345");

type Check = { name: string; pass: boolean; detail: unknown };
const checks: Check[] = [];

function check(name: string, pass: boolean, detail: unknown = "") {
  checks.push({ name, pass, detail });
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

  const canonicalResponse = await fetch(PAGE_URL, { redirect: "manual" });
  const initialHtml = await canonicalResponse.text();
  check("Canonical route returns HTTP 200", canonicalResponse.status === 200, canonicalResponse.status);
  check(
    "Canonical response is indexable",
    !/noindex/i.test(canonicalResponse.headers.get("x-robots-tag") ?? ""),
    canonicalResponse.headers.get("x-robots-tag") ?? "(no X-Robots-Tag)",
  );
  check(
    "Core direct-answer content is present in initial HTML",
    initialHtml.includes("Numerology by date of birth is a broad category of symbolic methods") &&
      initialHtml.includes("A 1320 Soul Blueprint also begins with a full birth date"),
    "direct-answer phrases in response HTML",
  );
  check(
    "Initial HTML contains no birth-date result URL",
    !/[?&](?:birth(?:date|_date)?|year|month|day)=/i.test(initialHtml),
    "query-string scan",
  );

  const duplicate = await fetch(`${BASE}/guides${ROUTE}`, { redirect: "manual" });
  check("Duplicate guide route returns exact HTTP 301", duplicate.status === 301, {
    status: duplicate.status,
    location: duplicate.headers.get("location"),
  });
  check(
    "Duplicate redirect targets canonical route",
    duplicate.headers.get("location") === ROUTE,
    duplicate.headers.get("location"),
  );

  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  check(
    "Canonical route appears in sitemap",
    sitemap.ok && sitemapText.includes(`<loc>${PAGE_URL}</loc>`),
    sitemap.status,
  );

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await executablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const consoleErrors: string[] = [];
  const requests: Array<{ url: string; method: string; resource: string; postData?: string }> = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("request", (request) => requests.push({
    url: request.url(),
    method: request.method(),
    resource: request.resourceType(),
    postData: request.postData(),
  }));

  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  const navigation = await page.goto(PAGE_URL, { waitUntil: "networkidle0", timeout: 60_000 });
  check("Browser navigation returns HTTP 200", navigation?.status() === 200, navigation?.status());

  const desktop = await page.evaluate((expectedUrl) => {
    const text = document.body.innerText.replace(/\s+/g, " ").trim();
    const htmlText = (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
    const direct = document.querySelector(".ndob-direct-answer");
    const directStart = "Numerology by date of birth is a broad category of symbolic methods";
    const directIndex = text.indexOf(directStart);
    const directWordIndex = directIndex < 0
      ? -1
      : text.slice(0, directIndex).split(/\s+/).filter(Boolean).length;
    const hero = document.querySelector(".ndob-hero");
    const heroText = (hero?.textContent ?? "").replace(/\s+/g, " ").trim();
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".ndob-page a")).map((anchor) => ({
      text: (anchor.textContent ?? "").replace(/\s+/g, " ").trim(),
      path: new URL(anchor.href).pathname,
      inHero: Boolean(anchor.closest(".ndob-hero")),
      inArticle: Boolean(anchor.closest(".ndob-article")),
    }));
    const primaryCtas = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".ndob-page a.gold-button"),
    ).map((anchor) => ({
      text: (anchor.textContent ?? "").replace(/\s+/g, " ").trim(),
      path: new URL(anchor.href).pathname,
      inHero: Boolean(anchor.closest(".ndob-hero")),
      inExplore: Boolean(anchor.closest("#explore-more")),
      top: Math.round(anchor.getBoundingClientRect().top + scrollY),
    }));
    const firstViewportGold = Array.from(document.querySelectorAll<HTMLElement>(".gold-button")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" &&
        rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0;
    });
    const ld = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'))
      .map((script) => {
        try { return JSON.parse(script.textContent ?? ""); } catch { return null; }
      })
      .filter(Boolean);
    const article = ld.find((item) => item?.["@type"] === "Article");
    const breadcrumb = ld.find((item) => item?.["@type"] === "BreadcrumbList");
    const table = document.querySelector(".ndob-comparison-table");
    const cards = document.querySelector(".ndob-mobile-cards");
    const tableStyle = table ? getComputedStyle(table) : null;
    const cardsStyle = cards ? getComputedStyle(cards) : null;
    const tableRect = table?.getBoundingClientRect();
    const cardsRect = cards?.getBoundingClientRect();
    const forms = Array.from(document.querySelectorAll(
      ".ndob-page form, .ndob-page input, .ndob-page select, .ndob-page textarea, .ndob-page button",
    ));
    const fourCodeSequences = Array.from(text.matchAll(/S\d\s*→\s*S\d\s*→\s*S\d\s*→\s*S\d/g))
      .map((match) => match[0].replace(/\s+/g, " ").trim());
    const headings = Array.from(document.querySelectorAll("h2, h3"))
      .map((heading) => (heading.textContent ?? "").replace(/\s+/g, " ").trim());
    return {
      title: document.title,
      description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
      robots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
      h1Count: document.querySelectorAll("h1").length,
      h1: (document.querySelector("h1")?.textContent ?? "").replace(/\s+/g, " ").trim(),
      directText: (direct?.textContent ?? "").replace(/\s+/g, " ").trim(),
      directWordIndex,
      umbrella:
        text.includes("Numerology by date of birth is an umbrella term") &&
        text.includes("family of symbolic practices"),
      lifePathAndBirthday:
        text.includes("Life Path Number") &&
        text.includes("uses the complete birth date") &&
        text.includes("Birthday Number generally uses the day of the month") &&
        text.includes("does not use the entire birth date"),
      otherNumerology:
        text.includes("period cycles") &&
        text.includes("personal years") &&
        text.includes("challenge numbers") &&
        text.includes("other chart positions") &&
        text.includes("inaccurate to describe all numerology as only one number"),
      traditionVariance:
        text.includes("methods and meanings can vary between numerology schools and practitioners"),
      notSciencePrediction:
        text.includes("Neither numerology nor a Soul Blueprint should be treated as scientific diagnosis, reliable prediction") &&
        text.includes("should not be treated as reliable prediction"),
      personalityDestinyBoundary:
        text.includes("It is not a verified measurement of personality, destiny or future outcome") &&
        text.includes("A birth date cannot reliably determine: your complete personality your future"),
      notConventionalNumerology:
        text.includes("1320 should not be described as conventional numerology") &&
        text.includes("not presented as conventional numerology"),
      proprietaryFramework:
        text.includes("proprietary symbolic reflection framework") &&
        text.includes("Proprietary 1320 symbolic framework"),
      fourCodeSequences,
      fullMap:
        text.includes("complete S0–S9 map") &&
        text.includes("Full Soul Blueprint extends through S0–S9") &&
        text.includes("Complete S0–S9 Framework"),
      numericOutputsSeparate:
        text.includes("It does not produce a Life Path Number or a conventional numerology chart") &&
        text.includes("It does not present a Life Path Number, Birthday Number or standard numerology chart as the user’s Soul Blueprint"),
      sameInputDifferent:
        text.includes("Both systems begin with the same visible input") &&
        text.includes("The same input does not make two systems equivalent") &&
        text.includes("Birth date is the input. The framework determines the meaning."),
      userAuthority:
        text.includes("User remains the authority") &&
        text.includes("remain the authority of your own life"),
      superiority:
        /(?:more|most)\s+(?:accurate|advanced|evolved|spiritual|powerful)\s+than|better than numerology|numerology is (?:basic|primitive|inferior)/i.test(text),
      equalityBoundary:
        text.includes("The key distinction is not that one system is valid and the other is invalid") &&
        htmlText.includes("This page does not claim that one symbolic system is objectively more accurate"),
      controls: forms.length,
      calculatorDirectory:
        headings.some((heading) => /Life Path (?:1|2|3|4|5|6|7|8|9)|Birthday (?:1|2|3|4|5|6|7|8|9)/i.test(heading)),
      heroPressure: /full report|checkout|session|email|required|buy now|purchase/i.test(heroText),
      primaryCtas,
      lifePathLinks: links.filter((link) => link.path === "/what-is-my-life-path-number"),
      pageLinks: links,
      firstViewportGold: firstViewportGold.map((element) =>
        (element.textContent ?? "").replace(/\s+/g, " ").trim()),
      tableVisible: Boolean(tableRect && tableStyle && tableStyle.display !== "none" &&
        tableStyle.visibility !== "hidden" && tableRect.width > 0 && tableRect.height > 0),
      cardsVisible: Boolean(cardsRect && cardsStyle && cardsStyle.display !== "none" &&
        cardsStyle.visibility !== "hidden" && cardsRect.width > 0 && cardsRect.height > 0),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      article,
      breadcrumb,
      expectedUrl,
      url: location.href,
      bodyQueryLeak: /[?&](?:birth(?:date|_date)?|year|month|day)=/i.test(location.href),
      htmlText,
    };
  }, PAGE_URL);

  check("Title and meta description are present and aligned",
    desktop.title === "Numerology by Date of Birth vs Soul Blueprint | 1320" &&
      desktop.description.length >= 120 &&
      /numerology by date of birth|Life Path|Birthday Number|Soul Blueprint/i.test(desktop.description),
    { title: desktop.title, description: desktop.description });
  check("Self-canonical is correct and meta has no noindex",
    desktop.canonical === PAGE_URL && !/noindex/i.test(desktop.robots),
    { canonical: desktop.canonical, robots: desktop.robots });
  check("H1 appears once with exact text",
    desktop.h1Count === 1 && desktop.h1 === "Numerology by Date of Birth vs Soul Blueprint",
    `${desktop.h1Count} × ${desktop.h1}`);
  check("Direct answer appears as HTML text within first ~100 words",
    desktop.directWordIndex >= 0 && desktop.directWordIndex <= 100 && desktop.directText.length > 250,
    { wordIndex: desktop.directWordIndex, text: desktop.directText });
  check("Article JSON-LD has Organization author",
    desktop.article?.["@type"] === "Article" &&
      desktop.article?.author?.["@type"] === "Organization" &&
      desktop.article?.author?.name === "1320 Soul Code" &&
      desktop.article?.url === PAGE_URL,
    desktop.article);
  check("BreadcrumbList JSON-LD validates canonical trail",
    desktop.breadcrumb?.["@type"] === "BreadcrumbList" &&
      desktop.breadcrumb?.itemListElement?.length === 3 &&
      desktop.breadcrumb?.itemListElement?.[2]?.item === PAGE_URL,
    desktop.breadcrumb?.itemListElement);
  check("No birth-date result URL is generated", !desktop.bodyQueryLeak && desktop.url === PAGE_URL, desktop.url);
  check("Birth-date numerology is framed as an umbrella category", desktop.umbrella, desktop.umbrella);
  check("Life Path and Birthday Number inputs are distinguished", desktop.lifePathAndBirthday, desktop.lifePathAndBirthday);
  check("Other numerology chart numbers and cycles are acknowledged", desktop.otherNumerology, desktop.otherNumerology);
  check("Tradition-dependent methods and non-scientific/predictive boundaries are clear",
    desktop.traditionVariance && desktop.notSciencePrediction,
    { variance: desktop.traditionVariance, boundary: desktop.notSciencePrediction });
  check("No personality or destiny claims are made", desktop.personalityDestinyBoundary, desktop.personalityDestinyBoundary);
  check("1320 is not called conventional numerology", desktop.notConventionalNumerology, desktop.notConventionalNumerology);
  check("Soul Blueprint is framed as a proprietary symbolic framework", desktop.proprietaryFramework, desktop.proprietaryFramework);
  check("Foundation order is correct everywhere",
    desktop.fourCodeSequences.length >= 3 &&
      desktop.fourCodeSequences.every((sequence) => sequence === "S1 → S3 → S2 → S0"),
    desktop.fourCodeSequences);
  check("Full Soul Blueprint is accurately framed as S0–S9", desktop.fullMap, desktop.fullMap);
  check("Life Path and Birthday Number are not presented as 1320 outputs",
    desktop.numericOutputsSeparate, desktop.numericOutputsSeparate);
  check("Same input/different framework and user authority are explicit",
    desktop.sameInputDifferent && desktop.userAuthority,
    { sameInputDifferent: desktop.sameInputDifferent, userAuthority: desktop.userAuthority });
  check("Comparison is different-not-superior",
    !desktop.superiority && desktop.equalityBoundary,
    { superiority: desktop.superiority, equalityBoundary: desktop.equalityBoundary });
  check("Page is comparison-led with no calculator or number directory",
    desktop.controls === 0 && !desktop.calculatorDirectory,
    { controls: desktop.controls, calculatorDirectory: desktop.calculatorDirectory });
  check("Hero has no Full Report, checkout, Session, or email-gate pressure",
    !desktop.heroPressure, desktop.heroPressure);
  check("All hero/mid/final primary CTAs point to Free Soul Blueprint",
    desktop.primaryCtas.length === 3 &&
      desktop.primaryCtas.every((cta) =>
        cta.text === "Discover My Free Soul Blueprint" && cta.path === "/free-soul-blueprint") &&
      desktop.primaryCtas.some((cta) => cta.inHero) &&
      desktop.primaryCtas.some((cta) => cta.inExplore),
    desktop.primaryCtas);
  check("Life Path Calculator is linked as a separate tool",
    desktop.lifePathLinks.length >= 2 &&
      desktop.lifePathLinks.some((link) => /Calculate My Life Path Number/i.test(link.text)),
    desktop.lifePathLinks);
  check("Pages 01–03 are linked contextually",
    ["/what-is-a-soul-blueprint", "/life-path-number-vs-soul-blueprint", "/what-is-my-life-path-number"]
      .every((target) => desktop.pageLinks.some((link) => link.path === target)),
    desktop.pageLinks.filter((link) => /soul-blueprint|life-path-number/.test(link.path)));
  check("First desktop viewport has at most one dominant gold CTA",
    desktop.firstViewportGold.length <= 1, desktop.firstViewportGold);
  check("Desktop comparison table is readable and mobile cards are hidden",
    desktop.tableVisible && !desktop.cardsVisible,
    { table: desktop.tableVisible, cards: desktop.cardsVisible });
  check("No horizontal overflow at 1280px", !desktop.overflow, desktop.overflow);

  await page.screenshot({ path: path.join(OUT, "page04-1280-first-viewport.png") });
  await page.screenshot({ path: path.join(OUT, "page04-1280-full.png"), fullPage: true });

  const apiRequests = requests.filter((request) => {
    try {
      return ["fetch", "xhr"].includes(request.resource) && new URL(request.url).pathname.startsWith("/api/");
    } catch {
      return false;
    }
  });
  check("Page does not call the Blueprint Resolver or any calculation API",
    !requests.some((request) => /blueprint.*resolver|resolve.*blueprint|api\/(?:result|calculate|resolve)/i.test(request.url)) &&
      apiRequests.length === 0,
    apiRequests);

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobile.goto(PAGE_URL, { waitUntil: "networkidle0", timeout: 60_000 });
  const mobileState = await mobile.evaluate(() => {
    const table = document.querySelector(".ndob-comparison-table");
    const cards = document.querySelector(".ndob-mobile-cards");
    const tableRect = table?.getBoundingClientRect();
    const tableStyle = table ? getComputedStyle(table) : null;
    const cardsRect = cards?.getBoundingClientRect();
    const cardsStyle = cards ? getComputedStyle(cards) : null;
    return {
      tableVisible: Boolean(tableRect && tableStyle && tableStyle.display !== "none" &&
        tableStyle.visibility !== "hidden" && tableRect.width > 0 && tableRect.height > 0),
      cardsVisible: Boolean(cardsRect && cardsStyle && cardsStyle.display !== "none" &&
        cardsStyle.visibility !== "hidden" && cardsRect.width > 0 && cardsRect.height > 0),
      cardCount: document.querySelectorAll(".ndob-mobile-card").length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  check("Mobile cards replace desktop table under 720px",
    !mobileState.tableVisible && mobileState.cardsVisible && mobileState.cardCount === 11,
    mobileState);
  check("No horizontal overflow at 390px", !mobileState.overflow, mobileState);
  await mobile.screenshot({ path: path.join(OUT, "page04-390-first-viewport.png") });
  await mobile.screenshot({ path: path.join(OUT, "page04-390-full.png"), fullPage: true });

  check("No production console/page errors", consoleErrors.length === 0, consoleErrors);
  await browser.close();

  fs.writeFileSync(path.join(OUT, "page04-production-checks.json"), JSON.stringify(checks, null, 2));
  for (const item of checks) {
    console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${JSON.stringify(item.detail)}`);
  }
  const failures = checks.filter((item) => !item.pass);
  console.log(`\nSUMMARY ${checks.length - failures.length}/${checks.length} passed; ${failures.length} failed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
