/** Facilitator API access for Personal Integration ops (FS-006.1). */

export function isFacilitatorAccessConfigured(): boolean {
  return Boolean(process.env.PERSONAL_INTEGRATION_FACILITATOR_KEY?.trim());
}

export function verifyFacilitatorRequest(request: Request): boolean {
  const expected = process.env.PERSONAL_INTEGRATION_FACILITATOR_KEY?.trim();
  if (!expected) return false;

  const auth = request.headers.get("authorization")?.trim();
  if (auth === `Bearer ${expected}`) return true;

  const headerKey = request.headers.get("x-facilitator-key")?.trim();
  return headerKey === expected;
}
