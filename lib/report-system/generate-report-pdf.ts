type GenerateReportPdfOptions = {
  url: string;
  cookieHeader?: string | null;
  timeoutMs?: number;
};

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
  return chromium.default.args;
}

export async function generateReportPdfFromUrl({
  url,
  cookieHeader,
  timeoutMs = 60_000,
}: GenerateReportPdfOptions): Promise<Buffer> {
  const puppeteer = await import("puppeteer-core");
  const executablePath = await resolveExecutablePath();
  const args = await resolveLaunchArgs();

  const browser = await puppeteer.default.launch({
    args,
    executablePath,
    headless: true,
    defaultViewport: { width: 1600, height: 900 },
  });

  try {
    const page = await browser.newPage();
    if (cookieHeader) {
      await page.setExtraHTTPHeaders({ Cookie: cookieHeader });
    }

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: timeoutMs,
    });
    await page.emulateMediaType("print");

    await page.waitForSelector(".report-root[data-surface='pdf']", { timeout: timeoutMs });
    await page.waitForSelector(".report-page", { timeout: timeoutMs });

    const pdf = await page.pdf({
      printBackground: true,
      width: "1600px",
      height: "900px",
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
