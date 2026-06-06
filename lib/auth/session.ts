import { cookies } from "next/headers";
import { createSession, deleteSession, getSessionUserId } from "@/lib/db/sessions";
import { getUserById } from "@/lib/db/users";
import { SESSION_COOKIE_NAME } from "@/lib/platform-config";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function setUserSession(userId: string): Promise<string> {
  const sessionId = await createSession(userId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return sessionId;
}

export async function clearUserSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    try {
      await deleteSession(sessionId);
    } catch {
      // Database may be unavailable during sign-out.
    }
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  try {
    const userId = await getSessionUserId(sessionId);
    if (!userId) return null;
    const user = await getUserById(userId);
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
}
