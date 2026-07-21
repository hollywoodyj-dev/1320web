import { NextResponse } from "next/server";
import { assertBlueprintExperienceAuth } from "@/lib/blueprint-experience-api/auth";
import {
  createRequestId,
  enforceRateLimit,
  jsonError,
  jsonOk,
  profileEtag,
  withRateLimitHeaders,
} from "@/lib/blueprint-experience-api/http";
import { getBlueprintExperienceProfile } from "@/lib/blueprint-experience-api/resolve";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = { params: Promise<{ blueprint_id: string }> };

/** GET /api/v1/blueprints/{blueprint_id}/experience-profile */
export async function GET(request: Request, context: RouteContext) {
  const requestId = createRequestId();

  try {
    const { clientId } = assertBlueprintExperienceAuth(request);
    const rate = enforceRateLimit({ requestId, clientId, route: "profile" });
    if (!rate.ok) return rate.response;

    const { blueprint_id: blueprintId } = await context.params;
    const url = new URL(request.url);
    const locale = url.searchParams.get("locale") ?? "";
    const purpose = url.searchParams.get("purpose") ?? "";
    const profileVersion = url.searchParams.get("profile_version") ?? undefined;

    const result = getBlueprintExperienceProfile({
      requestId,
      blueprintId,
      locale,
      purpose,
      profileVersion: profileVersion || undefined,
    });

    const etag = profileEtag({
      blueprint_id: result.blueprint_id,
      profile_version: result.profile_version,
      locale,
      purpose,
    });

    if (request.headers.get("if-none-match") === etag) {
      const response = new NextResponse(null, {
        status: 304,
        headers: {
          ETag: etag,
          "Cache-Control": "private, max-age=300",
        },
      });
      return withRateLimitHeaders(response, rate.limit);
    }

    const response = jsonOk(result, { headers: { ETag: etag } });
    withRateLimitHeaders(response, rate.limit);

    console.info("[blueprint-experience] profile ok", {
      request_id: requestId,
      client_id: clientId,
      purpose,
      locale,
    });

    return response;
  } catch (error) {
    return jsonError(requestId, error);
  }
}
