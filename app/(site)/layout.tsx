import { PageShell } from "@/components/page-shell";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const leadsEnabled = isLeadsWebhookConfigured();
  return <PageShell leadsEnabled={leadsEnabled}>{children}</PageShell>;
}
