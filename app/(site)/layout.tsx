import { PageShell } from "@/components/page-shell";
import { getAccountContext } from "@/lib/auth/account-context";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const leadsEnabled = isLeadsWebhookConfigured();
  const account = await getAccountContext();
  const headerAccount = account
    ? {
        label: account.user.first_name?.trim() || "Account",
        entitledReportId: account.entitledReportId,
      }
    : null;

  return (
    <PageShell leadsEnabled={leadsEnabled} headerAccount={headerAccount}>
      {children}
    </PageShell>
  );
}
