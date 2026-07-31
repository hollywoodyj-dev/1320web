/**
 * Lumen production QA for Page 02.
 * Run: npx tsx scripts/lumen-qa-seo-page02.ts
 * Optional: QA_BASE_URL=https://www.1320soulcode.com
 */
import fs from "node:fs";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const PATH = "/life-path-number-vs-soul-blueprint";
const URL = `${BASE}${PATH}`;
const DUPLICATE_PATH = "/guides/life-path-number-vs-soul-blueprint";
const FREE_PATH = "/free-soul-blueprint";
const PAGE01_PATH = "/what-is-a-soul-blueprint";

type Check = {
  name: string;
  pass: boolean;
  detail: string;
};

const checks: Check[] = [];

function check(name: string, pass: boolean, detail: unknown) {
  checks.push({ name, pass, detail: typeof detail === "string" ? detail : JSON.stringify(detail) });
}

async function resolveExecutablePath(): Promise<string> {
  const configured = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (configured) return configured;
  const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(chrome)) return chrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function responseText(path: string) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

async function main() {
  const canonicalResponse = await fetch(URL, { redirect: "manual" });
  check("Canonical URL returns HTTP 200", canonicalResponse.status === 200, canonicalResponse.status);
  check(
    "Canonical response is indexable",
    !/noindex/i.test(canonicalResponse.headers.get("x-robots-tag") ?? ""),
    canonicalResponse.headers.get("x-robots-tag") ?? "(no X-Robots-Tag)",
  );

  const duplicateResponse = await fetch(`${BASE}${DUPLICATE_PATH}`, { redirect: "manual" });
  check(
    "Duplicate /guides URL returns exact HTTP 301",
    duplicateResponse.status === 301,
    `${duplicateResponse.status} ${duplicateResponse.headers.get("location") ?? ""}`.trim(),
  );
  check(
    "Duplicate redirect points to canonical route",
    duplicateResponse.headers.get("location") === PATH,
    duplicateResponse.headers.get("location") ?? "(missing)",
  );

  const sitemap = await responseText("/sitemap.xml");
  check(
    "Canonical URL appears in sitemap",
    sitemap.response.status === 200 && sitemap.text.includes(`<loc>${URL}</loc>`),
    `status=${sitemap.response.status}`,
  );

  const robots = await responseText("/robots.txt");
  check(
    "robots.txt does not disallow canonical route",
    robots.response.status === 200 && !robots.text.includes(`Disallow: ${PATH}`),
    `status=${robots.response.status}`,
  );

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const consoleErrors: string[] = [];
  const page = await browser.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  const navigation = await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  check("Browser navigation returns HTTP 200", navigation?.status() === 200, navigation?.status() ?? "no response");

  const desktop = await page.evaluate(
    ({ expectedUrl, freePath, page01Path }) => {
      const text = document.body.innerText.replace(/\s+/g, " ").trim();
      const words = text.split(/\s+/);
      const directAnswerStart = "A Life Path Number is a numerological number derived from your full birth date";
      const directCharacterIndex = text.indexOf(directAnswerStart);
      const directWordIndex =
        directCharacterIndex < 0 ? -1 : text.slice(0, directCharacterIndex).trim().split(/\s+/).filter(Boolean).length;
      const hero = document.querySelector(".lpvsb-hero");
      const heroText = hero?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const primaryCtas = Array.from(document.querySelectorAll<HTMLAnchorElement>(".lpvsb-page a.gold-button")).map(
        (anchor) => ({
          text: anchor.textContent?.replace(/\s+/g, " ").trim() ?? "",
          href: new URL(anchor.href).pathname,
          inHero: Boolean(anchor.closest(".lpvsb-hero")),
          inConversion: Boolean(anchor.closest(".lpvsb-conversion")),
          top: Math.round(anchor.getBoundingClientRect().top + window.scrollY),
        }),
      );
      const page01Links = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[href="${page01Path}"]`)).map(
        (anchor) => ({
          text: anchor.textContent?.replace(/\s+/g, " ").trim() ?? "",
          context: anchor.parentElement?.textContent?.replace(/\s+/g, " ").trim() ?? "",
        }),
      );
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
      const table = document.querySelector(".lpvsb-comparison-table");
      const cards = document.querySelector(".lpvsb-mobile-cards");
      const tableStyle = table ? getComputedStyle(table) : null;
      const tableRect = table?.getBoundingClientRect();
      const cardsStyle = cards ? getComputedStyle(cards) : null;
      const cardsRect = cards?.getBoundingClientRect();
      const goldInFirstViewport = Array.from(document.querySelectorAll(".gold-button")).filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
      });
      const forms = Array.from(document.querySelectorAll(".lpvsb-page form, .lpvsb-page input, .lpvsb-page button"));
      const allHrefs = Array.from(document.querySelectorAll<HTMLAnchorElement>(".lpvsb-page a")).map(
        (anchor) => new URL(anchor.href).pathname,
      );
      return {
        title: document.title,
        metaDescription: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
        canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
        metaRobots: document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "",
        h1Count: document.querySelectorAll("h1").length,
        h1Text: document.querySelector("h1")?.textContent?.trim() ?? "",
        directAnswerPresent: directCharacterIndex >= 0,
        directAnswerWordIndex: directWordIndex,
        bodyWordCount: words.length,
        hasLifePathDefinition:
          text.includes("A Life Path Number is one of the best-known concepts in modern numerology") &&
          text.includes("full birth date") &&
          text.includes("1 through 9") &&
          text.includes("11, 22 and 33 as Master Numbers") &&
          text.includes("practices and interpretations can vary"),
        workedExample:
          text.includes("Birth date: 15 June 1990") &&
          text.includes("Total: 6 + 6 + 1 = 13 → 1 + 3 = 4") &&
          text.includes("Life Path Number: 4"),
        interactiveControls: forms.length,
        calculatorKeywordTargeting:
          /life path number calculator|calculate my life path|what is my life path number/i.test(
            `${document.title} ${document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ""}`,
          ),
        proprietaryFramework:
          /proprietary 1320 symbolic framework/i.test(text) &&
          /proprietary symbolic reflection framework/i.test(text),
        foundationSequenceCount: (text.match(/S1 → S3 → S2 → S0/g) ?? []).length,
        incorrectFoundationSequences: Array.from(text.matchAll(/S[0-9] → S[0-9] → S[0-9] → S[0-9]/g))
          .map((match) => match[0])
          .filter((sequence) => sequence !== "S1 → S3 → S2 → S0"),
        fullMapFraming: text.includes("complete S0–S9 map") && text.includes("Complete S0–S9 Blueprint"),
        superiorityLanguage: /better than numerology|more accurate than numerology|spiritually superior/i.test(text),
        differentNotBetter:
          text.includes("This does not automatically make the Soul Blueprint more accurate") &&
          text.includes("It makes it a different kind of reflective object"),
        boundaries:
          text.includes("Neither system should be used as prediction, diagnosis, or a fixed definition") &&
          text.includes("Scientific or clinical assessment? No No") &&
          text.includes("Fixed identity? Should not be treated as one Explicitly not a fixed identity"),
        articleType: article?.["@type"] ?? null,
        articleAuthor: article?.author ?? null,
        articleUrl: article?.url ?? null,
        breadcrumbType: breadcrumb?.["@type"] ?? null,
        breadcrumbItems: breadcrumb?.itemListElement ?? null,
        tableVisible:
          Boolean(tableStyle && tableRect) &&
          tableStyle?.display !== "none" &&
          tableStyle?.visibility !== "hidden" &&
          (tableRect?.width ?? 0) > 0 &&
          (tableRect?.height ?? 0) > 0,
        cardsVisible:
          Boolean(cardsStyle && cardsRect) &&
          cardsStyle?.display !== "none" &&
          cardsStyle?.visibility !== "hidden" &&
          (cardsRect?.width ?? 0) > 0 &&
          (cardsRect?.height ?? 0) > 0,
        desktopOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        primaryCtas,
        allPrimaryToFree: primaryCtas.every((cta) => cta.href === freePath),
        page01Links,
        goldInFirstViewport: goldInFirstViewport.length,
        heroPressure:
          /full report|checkout|book a session|buy now|purchase|limited time/i.test(heroText),
        expectedCanonical: expectedUrl,
        freeLinkPresent: allHrefs.includes(freePath),
      };
    },
    { expectedUrl: URL, freePath: FREE_PATH, page01Path: PAGE01_PATH },
  );

  check(
    "Title is present and aligned",
    desktop.title === "Life Path Number vs Soul Blueprint: What’s the Difference? | 1320",
    desktop.title,
  );
  check(
    "Meta description is present and aligned",
    desktop.metaDescription.length >= 120 && /Life Path Number/i.test(desktop.metaDescription) &&
      /1320 Soul Blueprint/i.test(desktop.metaDescription),
    desktop.metaDescription,
  );
  check("Self-canonical is correct", desktop.canonical === URL, desktop.canonical);
  check("No meta noindex", !/noindex/i.test(desktop.metaRobots), desktop.metaRobots || "(no meta robots)");
  check(
    "H1 appears once with exact text",
    desktop.h1Count === 1 && desktop.h1Text === "Life Path Number vs Soul Blueprint",
    `${desktop.h1Count} × ${desktop.h1Text}`,
  );
  check(
    "Direct answer is HTML text within first ~100 words",
    desktop.directAnswerPresent && desktop.directAnswerWordIndex >= 0 && desktop.directAnswerWordIndex <= 100,
    `starts at body word ${desktop.directAnswerWordIndex}`,
  );
  check("Life Path framing is accurate and convention-aware", desktop.hasLifePathDefinition, desktop.hasLifePathDefinition);
  check("Worked example resolves 15 June 1990 to 4", desktop.workedExample, desktop.workedExample);
  check("No interactive calculator controls", desktop.interactiveControls === 0, desktop.interactiveControls);
  check(
    "Page 03 calculator keywords are not targeted in title/meta",
    !desktop.calculatorKeywordTargeting,
    desktop.calculatorKeywordTargeting,
  );
  check("Soul Blueprint is framed as proprietary", desktop.proprietaryFramework, desktop.proprietaryFramework);
  check(
    "Foundation order is correct wherever a four-code arrow sequence appears",
    desktop.foundationSequenceCount >= 2 && desktop.incorrectFoundationSequences.length === 0,
    {
      correctSequenceCount: desktop.foundationSequenceCount,
      incorrect: desktop.incorrectFoundationSequences,
    },
  );
  check("Full map is accurately framed as S0–S9", desktop.fullMapFraming, desktop.fullMapFraming);
  check(
    "Different-not-better boundary is explicit",
    !desktop.superiorityLanguage && desktop.differentNotBetter,
    { superiorityLanguage: desktop.superiorityLanguage, explicitBoundary: desktop.differentNotBetter },
  );
  check("Prediction/diagnosis/fixed-identity boundaries are present", desktop.boundaries, desktop.boundaries);
  check(
    "Article JSON-LD validates core fields and Organization author",
    desktop.articleType === "Article" &&
      desktop.articleAuthor?.["@type"] === "Organization" &&
      desktop.articleAuthor?.name === "1320 Soul Code" &&
      desktop.articleUrl === URL,
    { type: desktop.articleType, author: desktop.articleAuthor, url: desktop.articleUrl },
  );
  check(
    "BreadcrumbList JSON-LD validates canonical trail",
    desktop.breadcrumbType === "BreadcrumbList" &&
      Array.isArray(desktop.breadcrumbItems) &&
      desktop.breadcrumbItems.length === 3 &&
      desktop.breadcrumbItems[2]?.item === URL,
    desktop.breadcrumbItems,
  );
  check(
    "Desktop comparison table is visible and cards are hidden",
    desktop.tableVisible && !desktop.cardsVisible,
    { table: desktop.tableVisible, cards: desktop.cardsVisible },
  );
  check("No 1280px horizontal overflow", !desktop.desktopOverflow, desktop.desktopOverflow);
  check(
    "All rendered primary gold CTAs point to Free Soul Blueprint",
    desktop.primaryCtas.length > 0 && desktop.allPrimaryToFree,
    desktop.primaryCtas,
  );
  check(
    "Hero, mid, and final primary CTA placements all exist",
    desktop.primaryCtas.length >= 3 &&
      desktop.primaryCtas.some((cta) => cta.inHero) &&
      desktop.primaryCtas.filter((cta) => !cta.inHero).length >= 2,
    desktop.primaryCtas,
  );
  check(
    "Page 01 is linked contextually",
    desktop.page01Links.length >= 2 &&
      desktop.page01Links.some((link) => /What a Soul Blueprint means|What Is a Soul Blueprint/i.test(link.text)),
    desktop.page01Links,
  );
  check("First desktop viewport has at most one gold CTA", desktop.goldInFirstViewport <= 1, desktop.goldInFirstViewport);
  check("Hero has no Full Report/checkout/session pressure", !desktop.heroPressure, desktop.heroPressure);
  check("Free Blueprint destination is linked", desktop.freeLinkPresent, desktop.freeLinkPresent);
  check("No production console/page errors", consoleErrors.length === 0, consoleErrors);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: "networkidle0", timeout: 60000 });
  const mobile = await page.evaluate(() => {
    const table = document.querySelector(".lpvsb-comparison-table");
    const cards = document.querySelector(".lpvsb-mobile-cards");
    const tableStyle = table ? getComputedStyle(table) : null;
    const tableRect = table?.getBoundingClientRect();
    const cardsStyle = cards ? getComputedStyle(cards) : null;
    const cardsRect = cards?.getBoundingClientRect();
    return {
      tableVisible:
        Boolean(tableStyle && tableRect) &&
        tableStyle?.display !== "none" &&
        tableStyle?.visibility !== "hidden" &&
        (tableRect?.width ?? 0) > 0 &&
        (tableRect?.height ?? 0) > 0,
      cardsVisible:
        Boolean(cardsStyle && cardsRect) &&
        cardsStyle?.display !== "none" &&
        cardsStyle?.visibility !== "hidden" &&
        (cardsRect?.width ?? 0) > 0 &&
        (cardsRect?.height ?? 0) > 0,
      cardCount: document.querySelectorAll(".lpvsb-mobile-card").length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });
  check(
    "Mobile comparison cards replace the desktop table under 720px",
    !mobile.tableVisible && mobile.cardsVisible && mobile.cardCount === 10,
    mobile,
  );
  check("No 390px horizontal overflow", !mobile.overflow, mobile.overflow);

  await browser.close();

  for (const result of checks) {
    console.log(`${result.pass ? "PASS" : "FAIL"} | ${result.name} | ${result.detail}`);
  }
  const failures = checks.filter((result) => !result.pass);
  console.log(`\nSUMMARY ${checks.length - failures.length}/${checks.length} passed; ${failures.length} failed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
