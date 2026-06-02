import { NextResponse } from "next/server";
import { BIRTH_COOKIE_NAME, formatBirthCookieValue, parseBirthCookieValue } from "@/lib/birth-cookie";

/** Set birth-date cookie from client (Route Handler — allowed to modify cookies). */
export async function POST(request: Request) {
  let body: { year?: number; month?: number; day?: number };

  try {
    body = (await request.json()) as { year?: number; month?: number; day?: number };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const year = Number(body.year);
  const month = Number(body.month);
  const day = Number(body.day);
  const parsed = parseBirthCookieValue(formatBirthCookieValue(year, month, day));

  if (!parsed) {
    return NextResponse.json({ ok: false, error: "Invalid birth date" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(BIRTH_COOKIE_NAME, formatBirthCookieValue(parsed.year, parsed.month, parsed.day), {
    path: "/",
    maxAge: 900,
    sameSite: "lax",
  });
  return response;
}
