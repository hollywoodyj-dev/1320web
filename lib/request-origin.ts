/** Origin for redirects — keeps cookies on the domain the user actually visited. */
export function getRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return new URL(request.url).origin;
}
