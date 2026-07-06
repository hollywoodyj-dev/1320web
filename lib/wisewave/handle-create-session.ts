import { NextResponse } from "next/server";
import { createWisewaveSession, createWisewaveSessionForUser, processWisewaveTurn } from "@/lib/wisewave";
import { getCurrentUser } from "@/lib/auth/session";
import { getLatestSoulReportForUser, getSoulReportById } from "@/lib/db/reports";
import { getUserByEmail } from "@/lib/db/users";
import type { UserRow } from "@/lib/db/types";

export type CreateWisewaveSessionBody = {
  email?: string;
  firstName?: string;
  birthDate?: string;
  openingMessage?: string;
  useAccountProfile?: boolean;
  reportId?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function parseAccountBirthDate(userBirth: string | Date | null | undefined, reportBirth: string | Date | null | undefined): string | null {
  for (const value of [userBirth, reportBirth]) {
    if (!value) continue;
    const iso = typeof value === "string" ? value.slice(0, 10) : value instanceof Date ? value.toISOString().slice(0, 10) : null;
    if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  }
  return null;
}

async function resolveAccountReflectUser(body: CreateWisewaveSessionBody): Promise<UserRow | null> {
  const sessionUser = await getCurrentUser();
  if (sessionUser) return sessionUser;

  const email = body.email?.trim().toLowerCase();
  if (!body.useAccountProfile || !isValidEmail(email)) return null;

  return getUserByEmail(email);
}

async function handleAccountReflectSession(body: CreateWisewaveSessionBody) {
  const openingMessage = body.openingMessage?.trim();
  if (!openingMessage) {
    return NextResponse.json({ ok: false, error: "What brings you here today is required." }, { status: 400 });
  }

  const user = await resolveAccountReflectUser(body);
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Please sign in again, then start your reflection from My Account." },
      { status: 401 },
    );
  }

  const report = body.reportId ? await getSoulReportById(body.reportId) : await getLatestSoulReportForUser(user.id);
  if (!report || report.user_id !== user.id) {
    return NextResponse.json(
      { ok: false, error: "We could not find a Soul Code report for your account." },
      { status: 400 },
    );
  }

  if (!parseAccountBirthDate(user.birth_date, report.birth_date as string | Date | null)) {
    return NextResponse.json(
      { ok: false, error: "Add your birth date to your profile before starting a reflection." },
      { status: 400 },
    );
  }

  try {
    const clientName =
      body.firstName?.trim() || user.first_name?.trim() || user.email.split("@")[0] || "Friend";
    const result = await createWisewaveSessionForUser({
      userId: user.id,
      reportId: report.id,
      clientName,
      openingMessage,
    });

    const firstTurn = await processWisewaveTurn({
      sessionId: result.sessionId,
      accessToken: result.accessToken,
      message: openingMessage,
    });

    return NextResponse.json({
      ok: true,
      sessionId: result.sessionId,
      accessToken: result.accessToken,
      chatUrl: result.chatUrl,
      reportId: result.reportId,
      firstTurn,
    });
  } catch (error) {
    console.error("[wisewave] account reflect session failed", error);
    return NextResponse.json({ ok: false, error: "Failed to create Wisewave session." }, { status: 500 });
  }
}

/** Shared create-session logic for Wisewave API and public Reflect UI. */
export async function handleCreateWisewaveSession(body: CreateWisewaveSessionBody) {
  if (body.useAccountProfile) {
    return handleAccountReflectSession(body);
  }

  const email = body.email?.trim();
  const birthDate = body.birthDate?.trim();
  if (!isValidEmail(email) || !birthDate) {
    return NextResponse.json({ ok: false, error: "email and birthDate are required." }, { status: 400 });
  }

  try {
    const result = await createWisewaveSession({
      email,
      firstName: body.firstName?.trim(),
      birthDate,
      openingMessage: body.openingMessage?.trim(),
    });

    let firstTurn = null;
    if (body.openingMessage?.trim()) {
      firstTurn = await processWisewaveTurn({
        sessionId: result.sessionId,
        accessToken: result.accessToken,
        message: body.openingMessage.trim(),
      });
    }

    return NextResponse.json({
      ok: true,
      sessionId: result.sessionId,
      accessToken: result.accessToken,
      chatUrl: result.chatUrl,
      reportId: result.reportId,
      firstTurn,
    });
  } catch (error) {
    console.error("[wisewave] create session failed", error);
    return NextResponse.json({ ok: false, error: "Failed to create Wisewave session." }, { status: 500 });
  }
}
