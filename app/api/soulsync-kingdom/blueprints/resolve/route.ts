import { NextResponse } from "next/server";
import { createRequestId } from "@/lib/blueprint-experience-api/auth";
import {
  BlueprintExperienceApiError,
  toErrorBody,
} from "@/lib/blueprint-experience-api/errors";
import { enforceRateLimit, withRateLimitHeaders } from "@/lib/blueprint-experience-api/http";
import { isSoulSyncKingdomPreviewEnabled } from "@/lib/soulsync-kingdom/preview-access";
import { resolveSoulSyncKingdomBlueprint } from "@/lib/soulsync-kingdom/resolve-blueprint";

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

function errorCode(body: Record<string, unknown>): string {
  const error = body.error;
  if (error && typeof error === "object" && "code" in error && typeof error.code === "string") {
    return error.code;
  }
  return "ok";
}

/** POST /api/soulsync-kingdom/blueprints/resolve — Preview-only official foundation codes. */
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
    clientId: `soulsync-kingdom:${clientKey(request)}`,
    route: "kingdomResolve",
  });
  if (!rate.ok) return rate.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const invalid = toErrorBody(requestId, new BlueprintExperienceApiError("INVALID_REQUEST"));
    console.info("[soulsync-kingdom] resolve", { request_id: requestId, status: 400, error: "INVALID_REQUEST" });
    return withRateLimitHeaders(
      NextResponse.json(invalid, { status: 400, headers: PRIVATE_HEADERS }),
      rate.limit,
    );
  }

  const result = resolveSoulSyncKingdomBlueprint(body, { requestId });
  console.info("[soulsync-kingdom] resolve", {
    request_id: requestId,
    status: result.status,
    error: errorCode(result.body),
  });
  return withRateLimitHeaders(
    NextResponse.json(result.body, { status: result.status, headers: PRIVATE_HEADERS }),
    rate.limit,
  );
}
