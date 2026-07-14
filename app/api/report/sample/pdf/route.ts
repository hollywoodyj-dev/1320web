import { NextResponse } from "next/server";
import { generateReportPdfFromUrl, isReportPdfGenerationConfigured } from "@/lib/report-system/generate-report-pdf";
import { buildSampleReportPrintUrl } from "@/lib/report-system/report-print-urls";
import type { ReportType } from "@/lib/report-system/report-surface";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function parseReportType(value: string | null): ReportType {
  return value === "sample" ? "sample" : "full";
}

export async function GET(request: Request) {
  if (!isReportPdfGenerationConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "PDF generation is not configured. Set PUPPETEER_EXECUTABLE_PATH for local Chrome or deploy to a Chromium-enabled runtime.",
      },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const reportType = parseReportType(searchParams.get("type"));
  const printUrl = buildSampleReportPrintUrl(reportType);

  try {
    const pdf = await generateReportPdfFromUrl({
      url: printUrl,
      cookieHeader: request.headers.get("cookie"),
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="1320-sample-report-${reportType}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PDF generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
