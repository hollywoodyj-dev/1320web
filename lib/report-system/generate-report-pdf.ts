import {
  REPORT_PDF_PAGE_HEIGHT_PX,
  REPORT_PDF_PAGE_WIDTH_PX,
} from "@/lib/report-system/report-pdf-page-size";

type GenerateReportPdfOptions = {
  url: string;
  cookieHeader?: string | null;
  timeoutMs?: number;
};

const BLOCKED_RESOURCE_TYPES = new Set(["media", "websocket", "eventsource", "manifest"]);

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;

  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function resolveLaunchArgs(): Promise<string[]> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) {
    return ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"];
  }

  const chromium = await import("@sparticuz/chromium");
  chromium.default.setGraphicsMode = false;
  return chromium.default.args;
}

export async function generateReportPdfFromUrl({
  url,
  cookieHeader,
  timeoutMs = 120_000,
}: GenerateReportPdfOptions): Promise<Buffer> {
  const puppeteer = await import("puppeteer-core");
  const executablePath = await resolveExecutablePath();
  const args = await resolveLaunchArgs();
  const isServerless = !process.env.PUPPETEER_EXECUTABLE_PATH?.trim();

  const browser = await puppeteer.default.launch({
    args,
    executablePath,
    headless: isServerless ? ("shell" as const) : true,
    defaultViewport: {
      width: REPORT_PDF_PAGE_WIDTH_PX,
      height: REPORT_PDF_PAGE_HEIGHT_PX,
    },
  });

  try {
    const page = await browser.newPage();
    if (cookieHeader) {
      await page.setExtraHTTPHeaders({ Cookie: cookieHeader });
    }

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (BLOCKED_RESOURCE_TYPES.has(request.resourceType())) {
        request.abort();
        return;
      }
      request.continue();
    });

    await page.goto(url, {
      waitUntil: "load",
      timeout: timeoutMs,
    });
    await page.emulateMediaType("print");

    await page.waitForSelector(".report-root[data-surface='pdf']", { timeout: timeoutMs });
    await page.waitForSelector(".report-page", { timeout: timeoutMs });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export function isReportPdfGenerationConfigured(): boolean {
  return Boolean(
    process.env.PUPPETEER_EXECUTABLE_PATH?.trim() ||
      process.env.VERCEL ||
      process.env.AWS_REGION ||
      process.env.REPORT_PDF_FORCE_CHROMIUM === "1",
  );
}
