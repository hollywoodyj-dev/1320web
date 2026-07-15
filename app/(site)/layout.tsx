import { headers } from "next/headers";
import { PageShell } from "@/components/page-shell";
import { getHeaderAccountSummary } from "@/lib/auth/account-context";
import { isLeadsWebhookConfigured } from "@/lib/leads-config";
import { preferMobileReportFromUserAgent } from "@/lib/report/prefer-mobile-report";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const leadsEnabled = isLeadsWebhookConfigured();
  const headerAccount = await getHeaderAccountSummary();
  const requestHeaders = await headers();
  const preferMobileReportShell =
    requestHeaders.get("x-1320-mobile-report") === "1" ||
    preferMobileReportFromUserAgent(requestHeaders.get("user-agent"));

  return (
    <PageShell
      leadsEnabled={leadsEnabled}
      headerAccount={headerAccount}
      preferMobileReportShell={preferMobileReportShell}
    >
      {children}
    </PageShell>
  );
}
