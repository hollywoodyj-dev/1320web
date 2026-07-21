import { NextResponse } from "next/server";
import { assertBlueprintExperienceAuth } from "@/lib/blueprint-experience-api/auth";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";
import {
  createRequestId,
  enforceRateLimit,
  jsonError,
  jsonOk,
  profileEtag,
  withRateLimitHeaders,
} from "@/lib/blueprint-experience-api/http";
import {
  getIdempotentResponse,
  hashRequestBody,
  saveIdempotentResponse,
} from "@/lib/blueprint-experience-api/idempotency";
import {
  resolveBlueprintExperience,
  validateResolveRequest,
} from "@/lib/blueprint-experience-api/resolve";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** POST /api/v1/blueprints/resolve — Coze Blueprint Experience bridge. */
export async function POST(request: Request) {
  const requestId = createRequestId();

  try {
    const { clientId } = assertBlueprintExperienceAuth(request);
    const rate = enforceRateLimit({ requestId, clientId, route: "resolve" });
    if (!rate.ok) return rate.response;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }

    const idempotencyKey = request.headers.get("idempotency-key")?.trim();
    const bodyHash = hashRequestBody(body);
    if (idempotencyKey) {
      if (idempotencyKey.length < 8 || idempotencyKey.length > 128) {
        throw new BlueprintExperienceApiError("INVALID_REQUEST");
      }
      const cached = getIdempotentResponse(`${clientId}:${idempotencyKey}`, bodyHash);
      if (cached === "conflict") {
        throw new BlueprintExperienceApiError("IDEMPOTENCY_CONFLICT");
      }
      if (cached) {
        const response = new NextResponse(cached.responseJson, {
          status: cached.status,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, max-age=300",
          },
        });
        return withRateLimitHeaders(response, rate.limit);
      }
    }

    const parsed = validateResolveRequest(body);
    const result = resolveBlueprintExperience({ requestId, request: parsed });
    const etag = profileEtag({
      blueprint_id: result.blueprint_id,
      profile_version: result.profile_version,
      locale: parsed.locale,
      purpose: parsed.purpose,
    });

    const response = jsonOk(result, { headers: { ETag: etag } });
    withRateLimitHeaders(response, rate.limit);

    if (idempotencyKey) {
      saveIdempotentResponse({
        key: `${clientId}:${idempotencyKey}`,
        bodyHash,
        status: 200,
        responseJson: JSON.stringify(result),
      });
    }

    console.info("[blueprint-experience] resolve ok", {
      request_id: requestId,
      client_id: clientId,
      purpose: parsed.purpose,
      locale: parsed.locale,
      by: parsed.blueprint_id ? "blueprint_id" : "birth_date",
    });

    return response;
  } catch (error) {
    return jsonError(requestId, error);
  }
}
