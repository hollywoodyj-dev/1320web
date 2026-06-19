import { FooterSubscribe } from "@/components/footer-subscribe";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";

type FooterSubscribeSlotProps = {
  variant?: "homepage" | "inner";
  /**
   * Server-decided availability. Pass this when rendering inside a client
   * component tree (e.g. PageShell) so the server-only env check is resolved
   * on the server and serialized — otherwise the client bundle can't read
   * `POSTGRES_URL` and hydration mismatches. Falls back to the env check when
   * rendered directly in a server component.
   */
  enabled?: boolean;
};

/** Renders newsletter subscribe when lead persistence (Phase 2A DB) is configured. */
export function FooterSubscribeSlot({ variant = "inner", enabled }: FooterSubscribeSlotProps) {
  const isEnabled = enabled ?? isLeadsWebhookConfigured();
  if (!isEnabled) return null;
  return <FooterSubscribe variant={variant} />;
}
