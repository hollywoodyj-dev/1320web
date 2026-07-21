import { NextResponse } from "next/server";
import { createRequestId, hashForLogs } from "@/lib/blueprint-experience-api/auth";
import {
  BlueprintExperienceApiError,
  toErrorBody,
} from "@/lib/blueprint-experience-api/errors";
import { checkRateLimit, RATE_LIMITS } from "@/lib/blueprint-experience-api/rate-limit";
import { createHash } from "node:crypto";

export function jsonOk(body: unknown, init?: { status?: number; headers?: HeadersInit }) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "private, max-age=300");
  return NextResponse.json(body, { status: init?.status ?? 200, headers });
}

export function jsonError(requestId: string, error: unknown) {
  const apiError =
    error instanceof BlueprintExperienceApiError
      ? error
      : new BlueprintExperienceApiError("INTERNAL_ERROR");
  return NextResponse.json(toErrorBody(requestId, apiError), { status: apiError.status });
}

export function withRateLimitHeaders(
  response: NextResponse,
  limit: { limit: number; remaining: number; reset: number },
) {
  response.headers.set("X-RateLimit-Limit", String(limit.limit));
  response.headers.set("X-RateLimit-Remaining", String(limit.remaining));
  response.headers.set("X-RateLimit-Reset", String(limit.reset));
  return response;
}

export function enforceRateLimit(input: {
  requestId: string;
  clientId: string;
  route: keyof typeof RATE_LIMITS;
}) {
  const config = RATE_LIMITS[input.route];
  const key = `${input.route}:${hashForLogs(input.clientId)}`;
  const result = checkRateLimit({ key, limit: config.limit, windowMs: config.windowMs });
  if (!result.allowed) {
    const response = jsonError(input.requestId, new BlueprintExperienceApiError("RATE_LIMITED"));
    return { ok: false as const, response: withRateLimitHeaders(response, result) };
  }
  return { ok: true as const, limit: result };
}

export function profileEtag(payload: { blueprint_id: string; profile_version: string; locale: string; purpose: string }) {
  const digest = createHash("sha256")
    .update(
      `${payload.blueprint_id}|${payload.profile_version}|${payload.locale}|${payload.purpose}`,
    )
    .digest("hex")
    .slice(0, 20);
  return `"${digest}"`;
}

export { createRequestId };
