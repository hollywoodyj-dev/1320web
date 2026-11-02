import { NextResponse } from "next/server";
import { createRequestId } from "@/lib/blueprint-experience-api/auth";
import {
  BlueprintExperienceApiError,
  toErrorBody,
} from "@/lib/blueprint-experience-api/errors";
import { enforceRateLimit, withRateLimitHeaders } from "@/lib/blueprint-experience-api/http";
import { isSoulSyncKingdomPreviewEnabled } from "@/lib/soulsync-kingdom/preview-access";
import { reflectSoulSyncKingdom } from "@/lib/soulsync-kingdom/reflect";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

/** POST /api/soulsync-kingdom/reflect — Preview-only one-sentence reflection of tonight's choices. */
export async function POST(request: Request) {
  const requestId = createRequestId();
  if (!isSoulSyncKingdomPreviewEnabled(request)) {
    return NextResponse.json(
      toErrorBody(requestId, new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND")),
      { status: 404, headers: PRIVATE_HEADERS },
    );
  }

  const rate = enforceRateLimit({
    requestId,
    clientId: `soulsync-kingdom-reflect:${clientKey(request)}`,
    route: "kingdomReflect",
  });
  if (!rate.ok) return rate.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.info("[soulsync-kingdom] reflect", { request_id: requestId, status: 400 });
    return withRateLimitHeaders(
      NextResponse.json(toErrorBody(requestId, new BlueprintExperienceApiError("INVALID_REQUEST")), {
        status: 400,
        headers: PRIVATE_HEADERS,
      }),
      rate.limit,
    );
  }

  const result = await reflectSoulSyncKingdom(body, { requestId });
  console.info("[soulsync-kingdom] reflect", { request_id: requestId, status: result.status });
  return withRateLimitHeaders(
    NextResponse.json(result.body, { status: result.status, headers: PRIVATE_HEADERS }),
    rate.limit,
  );
}
