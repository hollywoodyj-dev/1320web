import { FooterSubscribe } from "@/components/footer-subscribe";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";

type FooterSubscribeSlotProps = {
  variant?: "homepage" | "inner";
};

/** Renders newsletter subscribe when lead persistence (Phase 2A DB) is configured. */
export function FooterSubscribeSlot({ variant = "inner" }: FooterSubscribeSlotProps) {
  if (!isLeadsWebhookConfigured()) return null;
  return <FooterSubscribe variant={variant} />;
}
