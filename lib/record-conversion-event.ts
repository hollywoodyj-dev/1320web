import { getSql, withDb } from "@/lib/db/client";
import {
  PERSISTED_CONVERSION_EVENT_NAMES,
  type RecordConversionEventInput,
} from "@/lib/soulcode-conversion-tracking";

/** Once per user (when userId present). */
const DEDUPE_ONCE_PER_USER = new Set([
  "signup_completed",
  "generate_code_completed",
  "purchase_completed",
  "subscription_completed",
  "checkout_started",
]);

const SENSITIVE_METADATA_KEYS = new Set([
  "token",
  "auth_token",
  "password",
  "birth_date",
  "birthDate",
  "birth_year",
  "birthYear",
  "birth_month",
  "birthMonth",
  "birth_day",
  "birthDay",
  "blueprint",
  "soul_blueprint",
  "soulBlueprint",
  "report",
  "report_body",
  "reportBody",
  "code_string",
  "codeString",
  "s1_code",
  "s2_code",
  "s3_code",
  "s0_code",
]);

function sanitizeMetadata(
  metadata: RecordConversionEventInput["metadata"],
): Record<string, string | number | boolean> | null {
  if (!metadata) return null;
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (SENSITIVE_METADATA_KEYS.has(key)) continue;
    if (value === null || value === undefined) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      out[key] = value;
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

/** Server-side: persist one conversion event (best-effort, never throws to caller). */
export async function recordConversionEvent(
  input: RecordConversionEventInput,
): Promise<void> {
  if (!PERSISTED_CONVERSION_EVENT_NAMES.has(input.eventName)) {
    return;
  }

  try {
    await withDb(async () => {
      const db = getSql();

      // purchase_completed: once per Stripe checkout session (transaction), not merely once per user.
      if (input.eventName === "purchase_completed" && input.sessionId) {
        const existingTx = await db<{ id: string }[]>`
          SELECT id FROM marketing_conversion_events
          WHERE event_name = ${input.eventName}
            AND session_id = ${input.sessionId}
          LIMIT 1
        `;
        if (existingTx[0]) return;
      } else if (DEDUPE_ONCE_PER_USER.has(input.eventName) && input.userId) {
        const existing = await db<{ id: string }[]>`
          SELECT id FROM marketing_conversion_events
          WHERE event_name = ${input.eventName}
            AND user_id = ${input.userId}
          LIMIT 1
        `;
        if (existing[0]) return;
      }

      const metadata = sanitizeMetadata(input.metadata);

      await db`
        INSERT INTO marketing_conversion_events (
          event_name, user_id, session_id, source, lp, ad_group, platform, path, metadata
        ) VALUES (
          ${input.eventName},
          ${input.userId ?? null},
          ${input.sessionId ?? null},
          ${input.source ?? null},
          ${input.lp ?? null},
          ${input.adGroup ?? null},
          ${input.platform ?? null},
          ${input.path ?? null},
          ${metadata ? db.json(metadata) : null}
        )
      `;
    });
  } catch (error) {
    console.error("[recordConversionEvent]", input.eventName, error);
  }
}
