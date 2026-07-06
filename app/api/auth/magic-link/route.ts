import { NextResponse } from "next/server";

/** Deprecated — return access uses password sign-in at /login. */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Magic links are no longer used. Sign in with your email and password at /login.",
    },
    { status: 410 },
  );
}
