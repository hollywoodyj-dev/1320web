import { BLUEPRINT_EXPERIENCE_API_VERSION } from "@/lib/blueprint-experience-api/types";
import { isBlueprintExperienceApiConfigured } from "@/lib/blueprint-experience-api/auth";
import {
  createRequestId,
  enforceRateLimit,
  jsonOk,
  withRateLimitHeaders,
} from "@/lib/blueprint-experience-api/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** GET /api/v1/health — no auth; no infrastructure disclosure. */
export async function GET(request: Request) {
  const requestId = createRequestId();
  const clientId = request.headers.get("x-client-id")?.trim() || "anonymous";
  const rate = enforceRateLimit({ requestId, clientId, route: "health" });
  if (!rate.ok) return rate.response;

  const available = isBlueprintExperienceApiConfigured();
  const body = {
    status: "ok" as const,
    api_version: BLUEPRINT_EXPERIENCE_API_VERSION,
    blueprint_service: available ? ("available" as const) : ("degraded" as const),
    experience_profile_service: available ? ("available" as const) : ("degraded" as const),
  };

  const response = jsonOk(body);
  return withRateLimitHeaders(response, rate.limit);
}
