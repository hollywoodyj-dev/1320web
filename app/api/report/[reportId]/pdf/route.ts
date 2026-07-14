import { NextResponse } from "next/server";
import { getEntitledReportAccess } from "@/lib/auth/access";
import { generateReportPdfFromUrl, isReportPdfGenerationConfigured } from "@/lib/report-system/generate-report-pdf";
import { buildEntitledReportPrintUrl } from "@/lib/report-system/report-print-urls";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type RouteContext = {
  params: Promise<{ reportId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
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

  const { reportId } = await context.params;
  const access = await getEntitledReportAccess(reportId);

  if (!access.allowed) {
    const status =
      access.reason === "unauthenticated"
        ? 401
        : access.reason === "not_found"
          ? 404
          : 403;
    return NextResponse.json({ ok: false, error: access.reason }, { status });
  }

  const printUrl = buildEntitledReportPrintUrl(reportId);

  try {
    const pdf = await generateReportPdfFromUrl({
      url: printUrl,
      cookieHeader: request.headers.get("cookie"),
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="1320-full-report-${reportId.slice(0, 8)}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PDF generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
