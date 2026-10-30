import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isSoulSyncKingdomPreviewEnabled } from "@/lib/soulsync-kingdom/preview-access";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BRIDGE_FILE = path.join(
  process.cwd(),
  "soulsync-kingdom-1320",
  "src",
  "current",
  "soulsync-kingdom-1320-v0.2.4-1320web-bridge.html",
);

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

/** GET /soulsync-kingdom — serve the existing SoulSync bridge HTML. Preview only. */
export async function GET(request: Request) {
  if (!isSoulSyncKingdomPreviewEnabled(request)) {
    return new NextResponse("Not found.", {
      status: 404,
      headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const html = await readFile(BRIDGE_FILE, "utf8");
    if (!html.includes("/api/soulsync-kingdom/blueprints/resolve")) {
      return new NextResponse("Bridge file is not available.", {
        status: 503,
        headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return new NextResponse(html, {
      status: 200,
      headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new NextResponse("Bridge file is not available.", {
      status: 503,
      headers: { ...PRIVATE_HEADERS, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
