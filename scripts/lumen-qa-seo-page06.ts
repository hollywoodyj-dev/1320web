/**
 * Lumen production QA for Page 06 · What Does Your Birthday Mean?
 * Run: npx tsx scripts/lumen-qa-seo-page06.ts
 * Override: QA_BASE_URL=http://localhost:3020
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const CANONICAL_ORIGIN = (process.env.QA_CANONICAL_ORIGIN ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const ROUTE = "/what-does-your-birthday-mean";
const PAGE_URL = `${BASE}${ROUTE}`;
const CANONICAL_PAGE_URL = `${CANONICAL_ORIGIN}${ROUTE}`;
const OG_PATH = "/seo/what-does-your-birthday-mean-1320.webp";
const CANONICAL_OG_URL = `${CANONICAL_ORIGIN}${OG_PATH}`;
const OUT = path.join(process.cwd(), "qa-artifacts", "seo-page06-production-338d0b7");

type Check = { name: string; pass: boolean; detail: unknown };
const checks: Check[] = [];
const check = (name: string, pass: boolean, detail: unknown = "") => checks.push({ name, pass, detail });
const step = (name: string) => console.log(`[page06-qa] ${new Date().toISOString()} ${name}`);
const fetchBounded = (url: string, init: RequestInit = {}) =>
  fetch(url, { ...init, signal: AbortSignal.timeout(20_000) });
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

  step(`base ${BASE}`);
  step("fetch canonical HTML");
  const response = await fetchBounded(PAGE_URL, { redirect: "manual" });
  const initialHtml = await response.text();
  check("Canonical route returns HTTP 200", response.status === 200, response.status);
  check(
    "Canonical response is indexable",
    !/noindex/i.test(response.headers.get("x-robots-tag") ?? ""),
    response.headers.get("x-robots-tag") ?? "(none)",
  );
  check(
    "Core article answer is present in initial HTML",
    initialHtml.includes("Your birthday can mean several different things") &&
      initialHtml.includes("cannot scientifically determine your complete personality") &&
      initialHtml.includes("A birth date may offer a mirror for reflection"),
    "required answer phrases",
  );
  check(
    "Initial HTML contains no birth-date result URL",
    !/[?&](?:birth(?:date|_date)?|year|month|day)=/i.test(initialHtml),
    "query scan",
  );
  check(
    "No calculator form markup in initial HTML",
    !/<select[^>]*name=["']month["']/i.test(initialHtml) && !/name=["']birthDate["']/i.test(initialHtml),
    "form scan",
  );

  step("fetch redirect, sitemap, and OG asset");
  const duplicate = await fetchBounded(`${BASE}/guides${ROUTE}`, { redirect: "manual" });
  check("Duplicate guide route returns exact HTTP 301", duplicate.status === 301, {
    status: duplicate.status,
    location: duplicate.headers.get("location"),
  });
  check(
    "Duplicate guide route targets canonical path",
    duplicate.headers.get("location") === ROUTE,
    duplicate.headers.get("location"),
  );

  const sitemap = await fetchBounded(`${BASE}/sitemap.xml`);
  const sitemapText = await sitemap.text();
  check(
    "Canonical route appears in sitemap",
    sitemap.ok && sitemapText.includes(`<loc>${CANONICAL_PAGE_URL}</loc>`),
    { status: sitemap.status, expected: `<loc>${CANONICAL_PAGE_URL}</loc>` },
  );

  const ogResponse = await fetchBounded(`${BASE}${OG_PATH}`);
  const ogBuffer = Buffer.from(await ogResponse.arrayBuffer());
  const sharp = (await import("sharp")).default;
  const ogMetadata = await sharp(ogBuffer).metadata();
  fs.writeFileSync(path.join(OUT, "what-does-your-birthday-mean-1320-live.webp"), ogBuffer);
  check(
    "Live OG asset is a 1200×630 WebP",
    ogResponse.status === 200 &&
      ogMetadata.format === "webp" &&
      ogMetadata.width === 1200 &&
      ogMetadata.height === 630,
    {
      status: ogResponse.status,
      format: ogMetadata.format,
      width: ogMetadata.width,
      height: ogMetadata.height,
      bytes: ogBuffer.length,
      sha256: crypto.createHash("sha256").update(ogBuffer).digest("hex"),
    },
  );

  step("launch Chromium");
  const puppeteer = await import("puppeteer-core");
  const browser = await bounded(
    "Chromium launch",
    puppeteer.default.launch({
      executablePath: await executablePath(),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }),
    30_000,
  );
  try {
    const page = await browser.newPage();
    const consoleErrors: string[] = [];
    const requests: Array<{ url: string; resource: string; method: string }> = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    page.on("request", (request) =>
      requests.push({ url: request.url(), resource: request.resourceType(), method: request.method() }),
    );
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    step("navigate desktop");
    const navigation = await bounded(
      "desktop navigation",
      page.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 30_000 }),
      35_000,
    );
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    await page.evaluate("globalThis.__name = (target) => target");
    check("Browser navigation returns HTTP 200", navigation?.status() === 200, navigation?.status());

    step("evaluate desktop assertions");
    const desktop = await bounded(
      "desktop evaluation",
      page.evaluate((expectedUrl, expectedOg) => {
        const text = document.body.innerText.replace(/\s+/g, " ").trim();
        const allText = (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
        const pageRoot = document.querySelector(".wdym-page")!;
        const hero = document.querySelector(".wdym-hero")!;
        const direct = document.querySelector(".wdym-direct-answer");
        const directStart = "Your birthday can mean several different things";
        const directIndex = text.indexOf(directStart);
        const directWordIndex =
          directIndex < 0 ? -1 : text.slice(0, directIndex).split(/\s+/).filter(Boolean).length;
        const links = Array.from(pageRoot.querySelectorAll<HTMLAnchorElement>("a")).map((a) => ({
          text: (a.textContent ?? "").replace(/\s+/g, " ").trim(),
          path: new URL(a.href).pathname,
          inHero: Boolean(a.closest(".wdym-hero")),
          inArticle: Boolean(a.closest(".wdym-article")),
          top: Math.round(a.getBoundingClientRect().top + scrollY),
          classes: a.className,
        }));
        const primaryCtas = links.filter((link) => link.classes.includes("gold-button"));
        const firstViewportGold = Array.from(document.querySelectorAll<HTMLElement>(".gold-button")).filter(
          (element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0 &&
              rect.top < innerHeight &&
              rect.bottom > 0
            );
          },
        ).map((element) => (element.textContent ?? "").replace(/\s+/g, " ").trim());
        const topbarGold = Array.from(
          document.querySelectorAll<HTMLElement>(".inner-topbar .gold-button, .topbar-cta.gold-button"),
        ).filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        });
        const quietTopbarCta = Boolean(document.querySelector(".inner-topbar .topbar-cta--quiet"));
        const ld = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'))
          .map((script) => {
            try {
              return JSON.parse(script.textContent ?? "");
            } catch {
              return null;
            }
          })
          .filter(Boolean);
        const article = ld.find((item) => item?.["@type"] === "Article");
        const breadcrumb = ld.find((item) => item?.["@type"] === "BreadcrumbList");
        const sequences = Array.from(text.matchAll(/S\d\s*→\s*S\d\s*→\s*S\d\s*→\s*S\d/g)).map((match) =>
          match[0].replace(/\s+/g, " "),
        );
        const table = document.querySelector(".wdym-layers-table");
        const cards = document.querySelector(".wdym-mobile-cards");
        const visible = (el: Element | null) => {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
        };
        const heroText = (hero.textContent ?? "").replace(/\s+/g, " ").trim();
        const heroFigure = document.querySelector<HTMLElement>(".wdym-hero-figure");
        const directBox = direct?.getBoundingClientRect();
        const figureBox = heroFigure?.getBoundingClientRect();
        const img = document.querySelector<HTMLImageElement>(".wdym-hero-image");
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
          article,
          breadcrumb,
          links,
          primaryCtas,
          firstViewportGold,
          topbarGoldVisible: topbarGold.length,
          quietTopbarCta,
          sequences,
          tableVisible: visible(table),
          cardsVisible: visible(cards),
          layerRows: document.querySelectorAll(".wdym-layers-table tbody tr").length,
          cardCount: document.querySelectorAll(".wdym-mobile-card").length,
          controls: pageRoot.querySelectorAll("form,input,select,textarea,button").length,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          heroPressure: /full report|checkout|session|email gate|email required|buy now|purchase/i.test(heroText),
          heroAnswerBeforeArt: Boolean(directBox && figureBox && directBox.top < figureBox.top),
          alt: img?.alt ?? "",
          expectedUrl,
          expectedOg,
          text,
          allText,
        };
      }, CANONICAL_PAGE_URL, CANONICAL_OG_URL),
      30_000,
    );

    const expectedTitle = "What Does Your Birthday Mean? What It Can—and Cannot—Tell You";
    check(
      "Title and meta description are present and H1-aligned",
      desktop.title === expectedTitle &&
        desktop.description.length >= 100 &&
        /birthday/i.test(desktop.description) &&
        /personality|destiny|worth/i.test(desktop.description),
      { title: desktop.title, description: desktop.description },
    );
    check(
      "Self-canonical is correct and robots permit indexing",
      desktop.canonical === CANONICAL_PAGE_URL && !/noindex/i.test(desktop.robots),
      { canonical: desktop.canonical, robots: desktop.robots },
    );
    check(
      "H1 appears once with exact text",
      desktop.h1Count === 1 && desktop.h1 === "What Does Your Birthday Mean?",
      `${desktop.h1Count} × ${desktop.h1}`,
    );
    check(
      "Direct answer appears early in rendered text",
      desktop.directWordIndex >= 0 && desktop.directWordIndex <= 120,
      desktop.directWordIndex,
    );
    check(
      "Article JSON-LD has 1320 Soul Code Organization author and publisher",
      desktop.article?.["@type"] === "Article" &&
        desktop.article?.author?.["@type"] === "Organization" &&
        desktop.article?.author?.name === "1320 Soul Code" &&
        desktop.article?.publisher?.["@type"] === "Organization" &&
        desktop.article?.publisher?.name === "1320 Soul Code" &&
        desktop.article?.url === CANONICAL_PAGE_URL,
      desktop.article,
    );
    check(
      "BreadcrumbList JSON-LD validates canonical trail",
      desktop.breadcrumb?.["@type"] === "BreadcrumbList" &&
        desktop.breadcrumb?.itemListElement?.length === 3 &&
        desktop.breadcrumb?.itemListElement?.[2]?.item === CANONICAL_PAGE_URL,
      desktop.breadcrumb?.itemListElement,
    );
    check(
      "OG and Twitter metadata reference the required live asset",
      desktop.og === CANONICAL_OG_URL && desktop.twitter === CANONICAL_OG_URL,
      { og: desktop.og, twitter: desktop.twitter },
    );

    const t = desktop.text;
    check(
      "Four meaning layers are explicit (factual, cultural, personal, symbolic)",
      /Factual/i.test(t) && /Cultural/i.test(t) && /Personal/i.test(t) && /Symbolic/i.test(t) &&
        t.includes("These are not the same kind of meaning"),
      "layer language present",
    );
    check(
      "Birthday meaning is distinguished from Birthday Number",
      t.includes("Birthday meaning is a broad question") &&
        t.includes("A Birthday Number is one specific numerology interpretation") &&
        desktop.links.some((link) => link.path === "/birthday-number-vs-life-path-number-vs-soul-blueprint"),
      "comparison language + Page 05 link",
    );
    check(
      "Birthday cannot scientifically determine personality",
      t.includes("No birth date can scientifically determine or completely describe a person’s personality") ||
        t.includes("No birth date can scientifically determine or completely describe a person's personality"),
      "personality boundary present",
    );
    check(
      "Cannot-determine list rejects destiny, prediction and fixed identity uses",
      t.includes("your complete personality") &&
        t.includes("your future") &&
        t.includes("your spiritual rank") &&
        t.includes("Do not remain in a harmful or unsafe situation"),
      "cannot + safety present",
    );
    check(
      "No 1–31 birthday directory or personality test",
      !/Birthday\s+(?:for\s+)?(?:day\s+)?(?:1|01)\b.*\b31\b/i.test(t) &&
        !/personality test/i.test(t) &&
        desktop.layerRows === 4,
      { layerRows: desktop.layerRows },
    );
    check(
      "1320 uses proprietary framework and rejects fixed identity",
      t.includes("proprietary symbolic calculation framework") &&
        t.includes("Your Blueprint is a mirror—not a fixed identity") &&
        t.includes("Full Soul Blueprint extends through S0–S9"),
      "1320 framing present",
    );
    check(
      "Foundation order is S1 → S3 → S2 → S0 everywhere",
      desktop.sequences.length >= 2 && desktop.sequences.every((sequence) => sequence === "S1 → S3 → S2 → S0"),
      desktop.sequences,
    );
    check(
      "No wrong Foundation order S1 → S2 → S3 → S0",
      !/S1\s*→\s*S2\s*→\s*S3\s*→\s*S0/.test(desktop.allText),
      "wrong-order scan",
    );
    check(
      "No calculator, form controls, or birth-date inputs on the page",
      desktop.controls === 0,
      { controls: desktop.controls },
    );
    check(
      "Hero/mid/final primary CTAs all target Free Soul Blueprint",
      desktop.primaryCtas.length === 3 &&
        desktop.primaryCtas.every(
          (cta) => cta.text === "Discover My Free Soul Blueprint" && cta.path === "/free-soul-blueprint",
        ) &&
        desktop.primaryCtas.some((cta) => cta.inHero),
      desktop.primaryCtas,
    );
    check(
      "Secondary CTAs link Soul Blueprint definition and Page 05 comparison",
      desktop.links.some((link) => link.path === "/what-is-a-soul-blueprint") &&
        desktop.links.some(
          (link) =>
            link.path === "/birthday-number-vs-life-path-number-vs-soul-blueprint" &&
            /Birthday Number|Life Path/i.test(link.text),
        ),
      desktop.links.filter((link) =>
        /what-is-a-soul|birthday-number-vs-life-path/.test(link.path),
      ),
    );
    check(
      "Related cluster pages 01/03/04 are linked",
      ["/what-is-a-soul-blueprint", "/what-is-my-life-path-number", "/numerology-by-date-of-birth-vs-soul-blueprint"].every(
        (path) => desktop.links.some((link) => link.path === path),
      ),
      desktop.links.filter((link) =>
        /what-is-a-soul|what-is-my-life-path|numerology-by-date/.test(link.path),
      ),
    );
    check(
      "First 1280px viewport has exactly one dominant gold CTA",
      desktop.firstViewportGold.length === 1 && desktop.firstViewportGold[0] === "Discover My Free Soul Blueprint",
      desktop.firstViewportGold,
    );
    check(
      "Quiet header CTA: topbar CTA is demoted (no gold button)",
      desktop.topbarGoldVisible === 0 && desktop.quietTopbarCta,
      { topbarGoldVisible: desktop.topbarGoldVisible, quietTopbarCta: desktop.quietTopbarCta },
    );
    check(
      "Desktop layers table is visible and cards hidden",
      desktop.tableVisible && !desktop.cardsVisible,
      { table: desktop.tableVisible, cards: desktop.cardsVisible },
    );
    check(
      "No horizontal overflow at 1280px",
      !desktop.overflow,
      { scrollWidth: desktop.scrollWidth, clientWidth: desktop.clientWidth },
    );
    check(
      "Hero answer precedes artwork and no birthday form exists",
      desktop.heroAnswerBeforeArt && desktop.controls === 0,
      { answerBeforeArt: desktop.heroAnswerBeforeArt, controls: desktop.controls },
    );
    check(
      "Hero has no checkout, report, session, or email-gate pressure",
      !desktop.heroPressure,
      desktop.heroPressure,
    );
    check(
      "Artwork alt describes four meaning layers without zodiac identity claims",
      /factual|memory|symbolic|choice|four layers/i.test(desktop.alt) && !/zodiac|aries|leo|scorpio/i.test(desktop.alt),
      desktop.alt,
    );
    check(
      "Prediction and fixed-identity claims are rejected in body copy",
      (desktop.allText.includes("No birth date can reliably predict") ||
        desktop.allText.includes("cannot reliably predict")) &&
        t.includes("Free to explore. No prediction. No fixed identity."),
      "prediction/fixed-identity rejection present",
    );

    step("capture desktop screenshots");
    await bounded("desktop viewport screenshot", page.screenshot({ path: path.join(OUT, "page06-1280-first-viewport.png") }), 30_000);
    await bounded(
      "desktop full screenshot",
      page.screenshot({ path: path.join(OUT, "page06-1280-full.png"), fullPage: true }),
      45_000,
    );

    const apiRequests = requests.filter(
      (request) => ["fetch", "xhr"].includes(request.resource) && /\/api\//.test(request.url),
    );
    check(
      "No Blueprint Resolver or calculation API call",
      apiRequests.length === 0 &&
        !requests.some((request) =>
          /blueprint.*resolver|resolve.*blueprint|api\/(?:result|calculate|resolve)/i.test(request.url),
        ),
      apiRequests,
    );

    const mobile = await browser.newPage();
    await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    step("navigate mobile");
    let mobileNavOk = false;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await bounded(
          `mobile navigation attempt ${attempt}`,
          mobile.goto(PAGE_URL, { waitUntil: "domcontentloaded", timeout: 45_000 }),
          50_000,
        );
        mobileNavOk = true;
        break;
      } catch (error) {
        console.warn(`[page06-qa] mobile navigation attempt ${attempt} failed`, error);
        if (attempt === 3) throw error;
      }
    }
    check("Mobile navigation succeeded", mobileNavOk, mobileNavOk);
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    await mobile.evaluate("globalThis.__name = (target) => target");
    const mobileState = await mobile.evaluate(() => {
      const visible = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return s.display !== "none" && s.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const firstViewportGold = Array.from(document.querySelectorAll<HTMLElement>(".gold-button")).filter(
        (element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top < innerHeight &&
            rect.bottom > 0
          );
        },
      ).length;
      return {
        tableVisible: visible(".wdym-layers-table"),
        cardsVisible: visible(".wdym-mobile-cards"),
        cardCount: document.querySelectorAll(".wdym-mobile-card").length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        firstViewportGold,
      };
    });
    check(
      "Mobile cards replace layers table at 390px",
      !mobileState.tableVisible && mobileState.cardsVisible && mobileState.cardCount === 4,
      mobileState,
    );
    check("No horizontal overflow at 390px", !mobileState.overflow, mobileState);
    check(
      "Mobile first viewport has exactly one gold CTA",
      mobileState.firstViewportGold === 1,
      mobileState.firstViewportGold,
    );
    step("capture mobile screenshots");
    await bounded("mobile viewport screenshot", mobile.screenshot({ path: path.join(OUT, "page06-390-first-viewport.png") }), 30_000);
    await bounded(
      "mobile full screenshot",
      mobile.screenshot({ path: path.join(OUT, "page06-390-full.png"), fullPage: true }),
      45_000,
    );

    step("check linked routes");
    for (const target of [
      "/free-soul-blueprint",
      "/what-is-a-soul-blueprint",
      "/what-is-my-life-path-number",
      "/numerology-by-date-of-birth-vs-soul-blueprint",
      "/birthday-number-vs-life-path-number-vs-soul-blueprint",
    ]) {
      const linked = await fetchBounded(`${BASE}${target}`, { redirect: "manual" });
      check(`Linked route ${target} is live`, linked.status === 200, linked.status);
    }
    check("No production console/page errors", consoleErrors.length === 0, consoleErrors);
  } finally {
    step("close Chromium");
    await bounded("Chromium close", browser.close(), 10_000).catch((error) => console.error(error));
  }

  step("write results");
  fs.writeFileSync(path.join(OUT, "page06-production-checks.json"), JSON.stringify(checks, null, 2));
  for (const item of checks) console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${JSON.stringify(item.detail)}`);
  const failures = checks.filter((item) => !item.pass);
  console.log(`\nSUMMARY ${checks.length - failures.length}/${checks.length} passed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  try {
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, "page06-production-checks.json"), JSON.stringify(checks, null, 2));
    for (const item of checks) {
      console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${JSON.stringify(item.detail)}`);
    }
    console.log(`\nSUMMARY (partial) ${checks.filter((c) => c.pass).length}/${checks.length} passed before crash`);
  } catch (writeError) {
    console.error(writeError);
  }
  process.exitCode = 1;
});
