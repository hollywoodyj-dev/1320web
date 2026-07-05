import {
  listPersonalIntegrationSessions,
  mergePlatformSessionMeta,
  updatePlatformSessionFacilitator,
  getPlatformSessionById,
} from "@/lib/db/platform-sessions";
import { getUserById } from "@/lib/db/users";
import { sendFollowUpLinkEmail } from "@/lib/email/send-follow-up-link";
import { buildFollowUpUrl } from "@/lib/personal-integration/follow-up-context";
import { SESSION_VARIANT_LABELS } from "@/lib/personal-integration/session-variants";
import type { PlatformSessionStatus } from "@/lib/platform-domain";

const VALID_STATUSES: PlatformSessionStatus[] = ["scheduled", "active", "completed", "cancelled"];

export function isPlatformSessionStatus(value: string): value is PlatformSessionStatus {
  return (VALID_STATUSES as string[]).includes(value);
}

export async function listFacilitatorSessions() {
  const rows = await listPersonalIntegrationSessions(50);
  return rows.map((row) => ({
    id: row.id,
    status: row.status,
    sessionVariant: row.session_variant,
    sessionVariantLabel:
      row.session_variant && row.session_variant in SESSION_VARIANT_LABELS
        ? SESSION_VARIANT_LABELS[row.session_variant as keyof typeof SESSION_VARIANT_LABELS]
        : "Personal Integration Session",
    growthEdge: row.growth_edge,
    summary: row.summary,
    clientName:
      typeof row.meta?.clientName === "string"
        ? row.meta.clientName
        : row.user_first_name ?? "Guest",
    clientEmail: row.user_email,
    createdAt: row.created_at.toISOString(),
    startedAt: row.started_at?.toISOString() ?? null,
    completedAt: row.completed_at?.toISOString() ?? null,
    prepUrl: row.prep_access_token
      ? `/integration/prep/${row.id}?token=${row.prep_access_token}`
      : null,
    followUpUrl: row.follow_up_access_token
      ? `/integration/follow-up/${row.id}?token=${row.follow_up_access_token}`
      : null,
  }));
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
