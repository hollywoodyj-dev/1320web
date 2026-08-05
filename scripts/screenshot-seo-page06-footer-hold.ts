/**
 * Page 06 HOLD — mobile footer newsletter hide smoke.
 * Run: QA_BASE_URL=http://localhost:3020 npx tsx scripts/screenshot-seo-page06-footer-hold.ts
 * Production: npx tsx scripts/screenshot-seo-page06-footer-hold.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const PATH = "/what-does-your-birthday-mean";
const OUT = path.join(process.cwd(), "qa-artifacts", "seo-page06-footer-hold");

type Check = { name: string; pass: boolean; detail: unknown };
const checks: Check[] = [];
const check = (name: string, pass: boolean, detail: unknown = "") => checks.push({ name, pass, detail });

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
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await executablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // —— Mobile 390px ——
    const mobile = await browser.newPage();
    await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await mobile.goto(`${BASE}${PATH}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await new Promise((r) => setTimeout(r, 1500));

    const mobileState = await mobile.evaluate(() => {
      const footer = document.querySelector(".site-footer");
      const subscribe = document.querySelector(".site-footer .inner-footer-subscribe, .site-footer .footer-subscribe");
      const form = document.querySelector(
        ".site-footer .inner-footer-subscribe form, .site-footer .footer-subscribe form, .site-footer input[type='email']",
      );
      const email = document.querySelector(".site-footer input[type='email']");
      const checkbox = document.querySelector(".site-footer input[type='checkbox']");
      const subscribeBtn = Array.from(document.querySelectorAll(".site-footer button, .site-footer .gold-button")).find(
        (el) => /subscribe/i.test(el.textContent ?? ""),
      );
      const stayConnected = /stay connected/i.test(footer?.textContent ?? "");
      const brand = Boolean(document.querySelector(".site-footer .footer-brand, .site-footer .brand-number"));
      const legal = Boolean(document.querySelector(".site-footer .footer-legal-nav, .site-footer nav"));
      const copyright = /©\s*2026/i.test(document.body.innerText);
      const mantra = Boolean(document.querySelector(".footer-mantra"));
      const subscribeVisible = (() => {
        if (!subscribe) return false;
        const style = getComputedStyle(subscribe);
        const rect = subscribe.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.height > 0 && rect.width > 0;
      })();
      return {
        stayConnectedVisible: stayConnected && subscribeVisible,
        subscribeVisible,
        hasEmailInput: Boolean(email) && subscribeVisible,
        hasConsentCheckbox: Boolean(checkbox) && subscribeVisible,
        hasSubscribeCta: Boolean(subscribeBtn) && subscribeVisible,
        hasFormInDom: Boolean(form),
        brand,
        legal,
        copyright,
        mantra,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    check("Mobile: newsletter block not visible", !mobileState.subscribeVisible, mobileState);
    check("Mobile: Stay Connected heading not visible", !mobileState.stayConnectedVisible, mobileState.stayConnectedVisible);
    check("Mobile: newsletter email input not visible", !mobileState.hasEmailInput, mobileState.hasEmailInput);
    check("Mobile: consent checkbox not visible", !mobileState.hasConsentCheckbox, mobileState.hasConsentCheckbox);
    check("Mobile: Subscribe CTA not visible", !mobileState.hasSubscribeCta, mobileState.hasSubscribeCta);
    check("Mobile: brand retained", mobileState.brand, mobileState.brand);
    check("Mobile: legal/nav retained", mobileState.legal, mobileState.legal);
    check("Mobile: copyright retained", mobileState.copyright, mobileState.copyright);
    check("Mobile: footer mantra retained", mobileState.mantra, mobileState.mantra);
    check("Mobile: no horizontal overflow", !mobileState.overflow, {
      scrollWidth: mobileState.scrollWidth,
      clientWidth: mobileState.clientWidth,
    });

    await mobile.evaluate(() => {
      const footer = document.querySelector(".site-footer") ?? document.querySelector(".footer-mantra");
      footer?.scrollIntoView({ block: "end" });
    });
    await new Promise((r) => setTimeout(r, 400));
    await mobile.screenshot({ path: path.join(OUT, "page06-390-footer-crop.png") });
    await mobile.screenshot({ path: path.join(OUT, "page06-390-full.png"), fullPage: true });
    await mobile.close();

    // —— Desktop 1280px ——
    const desktop = await browser.newPage();
    await desktop.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    await desktop.goto(`${BASE}${PATH}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await new Promise((r) => setTimeout(r, 1500));

    const desktopState = await desktop.evaluate(() => {
      const subscribe = document.querySelector(".site-footer .inner-footer-subscribe, .site-footer .footer-subscribe");
      const email = document.querySelector(".site-footer input[type='email']");
      const subscribeVisible = (() => {
        if (!subscribe) return false;
        const style = getComputedStyle(subscribe);
        const rect = subscribe.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.height > 0 && rect.width > 0;
      })();
      return {
        subscribeVisible,
        hasEmailInput: Boolean(email) && subscribeVisible,
        stayConnected: /stay connected/i.test(subscribe?.textContent ?? ""),
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });

    // Desktop newsletter may be absent when leads are not configured — still confirm no overflow
    // and that we did not remove desktop presentation when the slot is enabled.
    check("Desktop: no horizontal overflow", !desktopState.overflow, desktopState);
    check(
      "Desktop: footer newsletter presentation unchanged when present",
      !desktopState.subscribeVisible || (desktopState.hasEmailInput && desktopState.stayConnected),
      desktopState,
    );

    await desktop.evaluate(() => {
      document.querySelector(".site-footer")?.scrollIntoView({ block: "end" });
    });
    await new Promise((r) => setTimeout(r, 400));
    await desktop.screenshot({ path: path.join(OUT, "page06-1280-footer-crop.png") });
    await desktop.close();
  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(OUT, "page06-footer-hold-checks.json"), JSON.stringify(checks, null, 2));
  for (const item of checks) {
    console.log(`${item.pass ? "PASS" : "FAIL"} | ${item.name} | ${JSON.stringify(item.detail)}`);
  }
  const failures = checks.filter((c) => !c.pass);
  console.log(`\nSUMMARY ${checks.length - failures.length}/${checks.length} passed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
