/** FS-007 — optional server-to-server Wisewave API key. */

export function isWisewaveApiConfigured(): boolean {
  return Boolean(process.env.WISEWAVE_API_KEY?.trim());
}

export function verifyWisewaveApiRequest(request: Request): boolean {
  const expected = process.env.WISEWAVE_API_KEY?.trim();
  if (!expected) return false;
  const auth = request.headers.get("authorization")?.trim();
  return auth === `Bearer ${expected}`;
}
