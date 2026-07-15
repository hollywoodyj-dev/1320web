import { PageShell } from "@/components/page-shell";
import { getHeaderAccountSummary } from "@/lib/auth/account-context";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const leadsEnabled = isLeadsWebhookConfigured();
  const headerAccount = await getHeaderAccountSummary();

  return (
    <PageShell leadsEnabled={leadsEnabled} headerAccount={headerAccount}>
      {children}
    </PageShell>
  );
}
