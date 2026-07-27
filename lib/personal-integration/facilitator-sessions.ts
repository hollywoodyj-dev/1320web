import {
  listPersonalIntegrationSessions,
  mergePlatformSessionMeta,
  updatePlatformSessionFacilitator,
  getPlatformSessionById,
} from "@/lib/db/platform-sessions";
import { getUserById } from "@/lib/db/users";
import { sendFollowUpLinkEmail } from "@/lib/email/send-follow-up-link";
import { buildFollowUpUrl } from "@/lib/personal-integration/follow-up-context";
import { formatSessionHeading } from "@/lib/personal-integration/format-session-heading";
import type { PlatformSessionStatus } from "@/lib/platform-domain";

const VALID_STATUSES: PlatformSessionStatus[] = ["scheduled", "active", "completed", "cancelled"];

export function isPlatformSessionStatus(value: string): value is PlatformSessionStatus {
  return (VALID_STATUSES as string[]).includes(value);
}

function metaString(meta: Record<string, unknown> | null | undefined, key: string): string | null {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function listFacilitatorSessions() {
  const rows = await listPersonalIntegrationSessions(50);
  return rows.map((row) => {
    const meta = (row.meta ?? {}) as Record<string, unknown>;
    return {
      id: row.id,
      status: row.status,
      sessionVariant: row.session_variant,
      sessionVariantLabel: formatSessionHeading(row),
      growthEdge: row.growth_edge,
      summary: row.summary,
      clientName:
        typeof meta.clientName === "string" ? meta.clientName : row.user_first_name ?? "Guest",
      clientEmail: row.user_email,
      bookingNotes: metaString(meta, "notes") ?? metaString(meta, "bookingNotes"),
      birthDate: metaString(meta, "birthDate"),
      createdAt: row.created_at.toISOString(),
      updatedAt: (row.completed_at ?? row.started_at ?? row.created_at).toISOString(),
      startedAt: row.started_at?.toISOString() ?? null,
      completedAt: row.completed_at?.toISOString() ?? null,
      prepUrl: row.prep_access_token
        ? `/integration/prep/${row.id}?token=${row.prep_access_token}`
        : null,
      followUpUrl: row.follow_up_access_token
        ? `/integration/follow-up/${row.id}?token=${row.follow_up_access_token}`
        : null,
      followUpEmailSentAt: metaString(meta, "followUpEmailSentAt"),
      followUpEmailFailedAt: metaString(meta, "followUpEmailFailedAt"),
    };
  });
}

/** Public boolean only — never expose provider or env names. */
export function isFollowUpEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function updateFacilitatorSession(input: {
  sessionId: string;
  status: PlatformSessionStatus;
  summary?: string | null;
}) {
  const before = await getPlatformSessionById(input.sessionId);
  const updated = await updatePlatformSessionFacilitator(input);
  if (!updated) return null;

  const followUpToken = updated.follow_up_access_token;
  const justCompleted =
    input.status === "completed" &&
    before?.status !== "completed" &&
    Boolean(followUpToken);

  if (justCompleted && followUpToken) {
    const user = await getUserById(updated.user_id);
    const clientName =
      typeof updated.meta?.clientName === "string" ? updated.meta.clientName : user?.first_name ?? "Guest";

    if (user?.email) {
      const followUpUrl = buildFollowUpUrl(updated.id, followUpToken);
      const { sent } = await sendFollowUpLinkEmail({
        email: user.email,
        clientName,
        followUpUrl,
      });
      if (sent) {
        await mergePlatformSessionMeta(updated.id, {
          followUpEmailSentAt: new Date().toISOString(),
        });
      }
    }
  }

  return updated;
}
