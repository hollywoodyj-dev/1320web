/**
 * Lumen production QA for Page 03.
 * Run: npx tsx scripts/lumen-qa-seo-page03.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const ROUTE = "/what-is-my-life-path-number";
const PAGE_URL = `${BASE}${ROUTE}`;
const OUT = path.join(process.cwd(), "qa-artifacts", "seo-page03-production-7bd73cc");

type Check = { name: string; pass: boolean; detail: unknown };
const checks: Check[] = [];

function check(name: string, pass: boolean, detail: unknown = "") {
  checks.push({ name, pass, detail });
}

async function browserPath() {
  const configured = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (configured) return configured;
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(chrome)) return chrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function setDate(page: import("puppeteer-core").Page, month: number | "", day: number | "", year: number | "") {
  await page.select('select[name="month"]', month === "" ? "" : String(month));
  await page.select('select[name="day"]', day === "" ? "" : String(day));
  await page.$eval(
    'input[name="year"]',
    (input, value) => {
      const element = input as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setter?.call(element, value);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    },
    year === "" ? "" : String(year),
  );
}

async function submit(page: import("puppeteer-core").Page) {
  await page.click('button[type="submit"]');
  await new Promise((resolve) => setTimeout(resolve, 350));
}

async function resultSnapshot(page: import("puppeteer-core").Page) {
  return page.evaluate(() => ({
    result: document.querySelector(".wimlpn-result-number")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    root: document.querySelector(".wimlpn-result-root")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    trace: document.querySelector(".wimlpn-trace")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    error: document.querySelector('[role="alert"]')?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    url: location.href,
  }));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const canonical = await fetch(PAGE_URL, { redirect: "manual" });
  check("Canonical route returns HTTP 200", canonical.status === 200, canonical.status);
  check(
    "Canonical response is indexable",
    !/noindex/i.test(canonical.headers.get("x-robots-tag") ?? ""),
    canonical.headers.get("x-robots-tag") ?? "(no X-Robots-Tag)",
  );

  const duplicate = await fetch(`${BASE}/guides${ROUTE}`, { redirect: "manual" });
  check("Duplicate guide route returns exact HTTP 301", duplicate.status === 301, {
    status: duplicate.status,
    location: duplicate.headers.get("location"),
  });
  check("Duplicate guide redirect targets canonical route", duplicate.headers.get("location") === ROUTE, duplicate.headers.get("location"));

  const sitemap = await fetch(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  check("Canonical route appears in sitemap", sitemap.ok && sitemapText.includes(`<loc>${PAGE_URL}</loc>`), sitemap.status);

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await browserPath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const requests: Array<{ url: string; method: string; resource: string; postData?: string }> = [];
  const consoleErrors: string[] = [];
  page.on("request", (request) => requests.push({
    url: request.url(),
    method: request.method(),
    resource: request.resourceType(),
    postData: request.postData(),
  }));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  const navigation = await page.goto(PAGE_URL, { waitUntil: "networkidle0", timeout: 60_000 });
  check("Browser navigation returns HTTP 200", navigation?.status() === 200, navigation?.status());

  const initial = await page.evaluate((expectedUrl) => {
    const body = document.body.innerText.replace(/\s+/g, " ").trim();
    const htmlText = (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
    const calculator = document.querySelector("#life-path-calculator");
    const direct = document.querySelector(".wimlpn-direct-answer");
    const meanings = Array.from(document.querySelectorAll(".wimlpn-meaning"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".wimlpn-page a")).map((a) => ({
      text: a.textContent?.replace(/\s+/g, " ").trim() ?? "",
      path: new URL(a.href).pathname,
    }));
    const ld = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'))
      .map((script) => {
        try { return JSON.parse(script.textContent ?? ""); } catch { return null; }
      })
      .filter(Boolean);
    const article = ld.find((item) => item?.["@type"] === "Article");
    const breadcrumb = ld.find((item) => item?.["@type"] === "BreadcrumbList");
    const firstViewportGold = Array.from(document.querySelectorAll<HTMLElement>(".gold-button")).filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0 &&
        rect.top < innerHeight && rect.bottom > 0;
    });
    const directRect = direct?.getBoundingClientRect();
    const calculatorRect = calculator?.getBoundingClientRect();
    return {
      title: document.title,
      description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
      robots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
      h1Count: document.querySelectorAll("h1").length,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      directText: direct?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      directBeforeCalculator: Boolean(directRect && calculatorRect && directRect.top < calculatorRect.top),
      directServerRendered: Boolean(direct && direct.textContent?.includes("numerology number calculated from your full birth date")),
      meaningCount: meanings.length,
      meaningHeadings: meanings.map((m) => m.querySelector("h3")?.textContent?.replace(/\s+/g, " ").trim() ?? ""),
      inputNames: Array.from(document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "#life-path-calculator form input, #life-path-calculator form select",
      )).map((el) => el.name),
      method:
        body.includes("reduces the month, day and year separately") &&
        body.includes("preserving 11, 22 and 33") &&
        body.includes("combines and reduces the final total"),
      variance: /conventions can vary|different reduction method|different rules to Master Numbers/i.test(body),
      numerology: /Life Path Number is a numerology number|Pythagorean-style Life Path method/i.test(body),
      masterHierarchyClaims:
        /Master Numbers?.{0,60}(?:higher than|better than|more valuable than|more evolved than|superior to) other/i.test(body),
      qualifiedMeanings: /commonly associated|may bring|may feel|may become|can bring|can become/i.test(body),
      unsafeClaims: /destiny revealed|predicts your future|diagnos(?:e|is)|fixed identity/i.test(body),
      explicitBoundaries:
        /not a scientific assessment, diagnosis or prediction of your future/i.test(body) &&
        /not a fixed identity/i.test(body),
      distinctions:
        htmlText.includes("A Life Path Number uses the complete birth date.") &&
        htmlText.includes("A Birthday Number generally uses only the day of the month") &&
        htmlText.includes("A Life Path Number is a numerology result; a 1320 Soul Blueprint uses the proprietary S0–S9 framework."),
      lifePathCalled1320Code: /Life Path(?: Number| result).{0,30}(?:is|as) (?:a )?1320 code/i.test(body),
      foundationSequenceCount: (body.match(/S1\s*[·→]\s*(?:Soul Origin\s*)?S3\s*[·→]/g) ?? []).length,
      foundationBridgeText: document.querySelector(".wimlpn-bridge")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      links,
      initialResult: Boolean(document.querySelector(".wimlpn-result")),
      firstViewportGold: firstViewportGold.map((el) => el.textContent?.replace(/\s+/g, " ").trim()),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      article,
      breadcrumb,
      expectedUrl,
    };
  }, PAGE_URL);

  check("Title and meta description are present and aligned",
    initial.title === "What Is My Life Path Number? Free Calculator & Meaning | 1320" &&
      initial.description.length >= 120 && /birth date|numerology|Master Number/i.test(initial.description),
    { title: initial.title, description: initial.description });
  check("Self-canonical is correct and meta has no noindex",
    initial.canonical === PAGE_URL && !/noindex/i.test(initial.robots), { canonical: initial.canonical, robots: initial.robots });
  check("H1 appears once with exact text",
    initial.h1Count === 1 && initial.h1 === "What Is My Life Path Number?", `${initial.h1Count} × ${initial.h1}`);
  check("Direct answer is server-rendered HTML before calculator",
    initial.directServerRendered && initial.directBeforeCalculator, initial.directText);
  check("Static meanings for 1–9, 11, 22, 33 are crawlable HTML",
    initial.meaningCount === 12 && ["Life Path 1", "Life Path 9", "Life Path 11", "Life Path 22", "Life Path 33"]
      .every((needle) => initial.meaningHeadings.some((heading) => heading.includes(needle))),
    initial.meaningHeadings);
  check("Calculator requires only month/day/year",
    initial.inputNames.length === 3 && ["month", "day", "year"].every((name) => initial.inputNames.includes(name)) &&
      !initial.inputNames.some((name) => /name|email/i.test(name)), initial.inputNames);
  check("Declared reduction method preserves 11/22/33 and acknowledges variance",
    initial.method && initial.variance, { method: initial.method, variance: initial.variance });
  check("Life Path is clearly framed as numerology", initial.numerology, initial.numerology);
  check("Master Numbers are not ranked as superior", !initial.masterHierarchyClaims, initial.masterHierarchyClaims);
  check("Meanings use qualified language", initial.qualifiedMeanings, initial.qualifiedMeanings);
  check("Prediction, diagnosis, and fixed-identity boundaries are explicit",
    initial.explicitBoundaries, { unsafePhraseScan: initial.unsafeClaims, explicit: initial.explicitBoundaries });
  check("Life Path differs from Birthday Number and Soul Blueprint", initial.distinctions, initial.distinctions);
  check("Life Path result is never called a 1320 code", !initial.lifePathCalled1320Code, initial.lifePathCalled1320Code);
  check("Foundation order appears only in Soul Blueprint bridge",
    /S1\s*·\s*Soul Origin.*S3\s*·\s*Soul Vibration.*S2\s*·\s*Soul Mirror.*S0\s*·\s*Void Gate/i.test(initial.foundationBridgeText) &&
      initial.foundationSequenceCount <= 1,
    { sequenceCount: initial.foundationSequenceCount, bridge: initial.foundationBridgeText });
  check("Required contextual links are present",
    ["/life-path-number-vs-soul-blueprint", "/what-is-a-soul-blueprint", "/free-soul-blueprint"]
      .every((target) => initial.links.some((link) => link.path === target)), initial.links);
  check("Article JSON-LD has Organization author",
    initial.article?.["@type"] === "Article" && initial.article?.author?.["@type"] === "Organization" &&
      initial.article?.author?.name === "1320 Soul Code" && initial.article?.url === PAGE_URL,
    initial.article);
  check("BreadcrumbList JSON-LD validates canonical trail",
    initial.breadcrumb?.["@type"] === "BreadcrumbList" &&
      initial.breadcrumb?.itemListElement?.[2]?.item === PAGE_URL, initial.breadcrumb?.itemListElement);
  check("Initial state has one dominant gold Calculate CTA",
    initial.firstViewportGold.length === 1 && /Calculate My Life Path Number/i.test(initial.firstViewportGold[0] ?? ""),
    initial.firstViewportGold);
  check("Initial desktop has no horizontal overflow", !initial.overflow, initial.overflow);

  await page.screenshot({ path: path.join(OUT, "page03-1280-first-viewport.png") });

  const matrix: Array<{ label: string; month: number; day: number; year: number; expected: number; root?: number }> = [
    { label: "15 June 1990", month: 6, day: 15, year: 1990, expected: 4 },
    { label: "22 May 1980", month: 5, day: 22, year: 1980, expected: 9 },
    { label: "2 Feb 1987", month: 2, day: 2, year: 1987, expected: 11, root: 2 },
    { label: "11 May 1950", month: 5, day: 11, year: 1950, expected: 22, root: 4 },
    { label: "22 Feb 1980", month: 2, day: 22, year: 1980, expected: 33, root: 6 },
    { label: "29 Nov 1975", month: 11, day: 29, year: 1975, expected: 8 },
    { label: "29 Feb 2000", month: 2, day: 29, year: 2000, expected: 6 },
  ];

  for (const item of matrix) {
    await setDate(page, item.month, item.day, item.year);
    await submit(page);
    const snapshot = await resultSnapshot(page);
    check(`Calculator: ${item.label} → ${item.expected}${item.root ? ` (root ${item.root})` : ""}`,
      snapshot.result.endsWith(String(item.expected)) &&
        (item.root == null || snapshot.root.endsWith(String(item.root))) &&
        snapshot.error === "" &&
      snapshot.url === PAGE_URL,
      snapshot);
  }

  await setDate(page, 11, 29, 1975);
  await submit(page);
  const fortyFour = await resultSnapshot(page);
  check("44 is reduced rather than treated as a Master Number",
    fortyFour.result.endsWith("8") && /Combined:\s*11 \+ 11 \+ 22 = 44 → 8/i.test(fortyFour.trace), fortyFour);

  const invalids: Array<{ label: string; month: number | ""; day: number | ""; year: number | "" }> = [
    { label: "29 Feb 2001", month: 2, day: 29, year: 2001 },
    { label: "31 Apr 1990", month: 4, day: 31, year: 1990 },
    { label: "future date", month: 1, day: 1, year: 2099 },
    { label: "incomplete date", month: "", day: 15, year: 1990 },
  ];
  for (const item of invalids) {
    await setDate(page, item.month, item.day, item.year);
    await submit(page);
    const snapshot = await resultSnapshot(page);
    check(`Invalid input rejected: ${item.label}`,
      snapshot.result === "" && snapshot.error.length > 0 && snapshot.url === PAGE_URL, snapshot);
  }

  await setDate(page, 2, 2, 1987);
  await submit(page);
  const resultState = await page.evaluate(() => {
    const result = document.querySelector(".wimlpn-result");
    const calc = document.querySelector<HTMLElement>(".wimlpn-calc-submit");
    const continuation = result?.querySelector<HTMLAnchorElement>(".gold-button");
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const local = { ...localStorage };
    const session = { ...sessionStorage };
    const resultText = result?.textContent?.replace(/\s+/g, " ").trim() ?? "";
    return {
      resultText,
      calcClasses: calc?.className ?? "",
      continuationText: continuation?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      continuationPath: continuation ? new URL(continuation.href).pathname : "",
      resultCheckoutLinks: Array.from(result?.querySelectorAll<HTMLAnchorElement>("a") ?? []).map((a) => new URL(a.href).pathname)
        .filter((href) => /checkout|full-report|booking|session/i.test(href)),
      dataLayer,
      local,
      session,
      url: location.href,
    };
  });
  check("Result renders inline without reload or birth-date URL",
    /Your Life Path Number Is 11/.test(resultState.resultText) && resultState.url === PAGE_URL, resultState.url);
  check("Calculation trace and underlying root match result",
    /Underlying root: 2/.test(resultState.resultText) &&
      /Month: 2/.test(resultState.resultText) &&
      /Day: 2/.test(resultState.resultText) &&
      /Year: 1987 → 1 \+ 9 \+ 8 \+ 7 = 25 → 7/.test(resultState.resultText) &&
      /Combined: 2 \+ 2 \+ 7 = 11/.test(resultState.resultText), resultState.resultText);
  check("Post-result Calculate recedes and Free Blueprint becomes primary",
    /gold-button--secondary/.test(resultState.calcClasses) &&
      resultState.continuationText === "Discover My Free Soul Blueprint" &&
      resultState.continuationPath === "/free-soul-blueprint", resultState);
  check("Result card has no Full Report checkout or session pressure",
    resultState.resultCheckoutLinks.length === 0, resultState.resultCheckoutLinks);

  const analyticsText = JSON.stringify(resultState.dataLayer);
  const persistentText = JSON.stringify(resultState.local);
  check("Birth date is absent from analytics payloads",
    !/1987-?0?2-?0?2|birth.?date|birth.?year|birth.?month|birth.?day/i.test(analyticsText), resultState.dataLayer);
  check("Birth date is absent from permanent localStorage",
    !/1987-?0?2-?0?2|\"year\":1987|birth.?date/i.test(persistentText), resultState.local);
  check("No birth date is stored before optional continuation",
    !/\"year\":1987|1987-?0?2-?0?2/i.test(JSON.stringify(resultState.session)), resultState.session);

  const calculatorApiRequests = requests.filter((request) => {
    try {
      return ["fetch", "xhr"].includes(request.resource) && new URL(request.url).pathname.startsWith("/api/");
    } catch {
      return false;
    }
  });
  check("Calculator does not call the 1320 Blueprint Resolver or any calculation API",
    !requests.some((request) => /blueprint.*resolver|resolve.*blueprint|api\/(?:result|calculate|resolve)/i.test(request.url)) &&
      calculatorApiRequests.length === 0, calculatorApiRequests);
  check("No fake multi-second decoding/loading state",
    !/decoding|calculating your destiny|revealing your destiny/i.test(resultState.resultText), resultState.resultText);

  await page.screenshot({ path: path.join(OUT, "page03-1280-post-result.png"), fullPage: true });

  const continuation = await page.$(".wimlpn-result .gold-button");
  if (continuation) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60_000 }),
      continuation.click(),
    ]);
  }
  const handoff = await page.evaluate(() => ({
    url: location.href,
    session: { ...sessionStorage },
    local: { ...localStorage },
  }));
  const handoffSessionText = Object.values(handoff.session).join(" ");
  const handoffLocalText = Object.values(handoff.local).join(" ");
  check("Optional continuation has no birth date in URL and uses session-only handoff",
    new URL(handoff.url).pathname === "/free-soul-blueprint" &&
      !/1987|(?:birth|year|month|day)=/i.test(handoff.url) &&
      /"year":1987/.test(handoffSessionText) &&
      !/"year":1987/.test(handoffLocalText), handoff);

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await mobile.goto(PAGE_URL, { waitUntil: "networkidle0", timeout: 60_000 });
  const mobileState = await mobile.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  check("No horizontal overflow at 390px", !mobileState.overflow, mobileState);
  await mobile.screenshot({ path: path.join(OUT, "page03-390-first-viewport.png") });

  check("No production console/page errors", consoleErrors.length === 0, consoleErrors);
  await browser.close();

  fs.writeFileSync(path.join(OUT, "page03-production-checks.json"), JSON.stringify(checks, null, 2));
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
