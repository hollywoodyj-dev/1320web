import { recordConversionEvent } from "@/lib/record-conversion-event";

/** Persist signup_completed only when a users row is actually inserted. */
export async function recordAccountSignupIfCreated(input: {
  created: boolean;
  userId: string;
  path: string;
  entry: string;
  source?: string | null;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}): Promise<void> {
  if (!input.created) return;
  await recordConversionEvent({
    eventName: "signup_completed",
    userId: input.userId,
    source: input.source ?? null,
    path: input.path,
    metadata: {
      entry: input.entry,
      ...input.metadata,
    },
  });
}
