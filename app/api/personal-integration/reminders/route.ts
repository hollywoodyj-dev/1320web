import { NextResponse } from "next/server";
import { listPersonalIntegrationSessions, mergePlatformSessionMeta } from "@/lib/db/platform-sessions";
import { getUserById } from "@/lib/db/users";
import {
  sendIntakeReminderEmail,
  sendSessionReminderEmail,
} from "@/lib/email/send-integration-reminders";
import {
  isFacilitatorAccessConfigured,
  verifyFacilitatorRequest,
} from "@/lib/personal-integration/facilitator-auth";
import { getSiteUrl, isDatabaseConfigured } from "@/lib/platform-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/personal-integration/reminders
 * Facilitator/ops-triggered reminder sends (Phase 1). Cron can call with the same key later.
 * Body: { kind: "intake_incomplete" | "session_24h" | "session_1h", sessionId?: string }
 */
export async function POST(request: Request) {
  if (!isDatabaseConfigured() || !isFacilitatorAccessConfigured()) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
  if (!verifyFacilitatorRequest(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    kind?: string;
    sessionId?: string;
  } | null;

  const kind = body?.kind;
  if (!kind || !["intake_incomplete", "session_24h", "session_1h"].includes(kind)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const sessions = await listPersonalIntegrationSessions(80);
  const targets = body?.sessionId
    ? sessions.filter((row) => row.id === body.sessionId)
    : sessions.filter((row) => {
        if (kind === "intake_incomplete") {
          return (
            row.status !== "cancelled" &&
            row.status !== "completed" &&
            (row.intake_status === "not_started" || row.intake_status === "draft")
          );
        }
        return row.status === "scheduled" || row.status === "active";
      });

  let sent = 0;
  for (const row of targets) {
    const user = await getUserById(row.user_id);
    if (!user?.email || !row.prep_access_token) continue;
    const clientName =
      typeof row.meta?.clientName === "string" ? row.meta.clientName : user.first_name ?? "Guest";
    const intakeUrl = `${getSiteUrl()}/integration/intake/${row.id}?token=${row.prep_access_token}`;
    const prepUrl = `${getSiteUrl()}/integration/prep/${row.id}?token=${row.prep_access_token}`;

    if (kind === "intake_incomplete") {
      const result = await sendIntakeReminderEmail({
        email: user.email,
        clientName,
        intakeUrl,
      });
      if (result.sent) {
        sent += 1;
        await mergePlatformSessionMeta(row.id, { intakeReminderSentAt: new Date().toISOString() });
      }
      continue;
    }

    const whenLabel = kind === "session_24h" ? "in about 24 hours" : "in 1–2 hours";
    const result = await sendSessionReminderEmail({
      email: user.email,
      clientName,
      whenLabel,
      intakeUrl,
      prepUrl,
    });
    if (result.sent) {
      sent += 1;
      await mergePlatformSessionMeta(row.id, {
        [kind === "session_24h" ? "sessionReminder24hSentAt" : "sessionReminder1hSentAt"]:
          new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ ok: true, sent, matched: targets.length });
}
