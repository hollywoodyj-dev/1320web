import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SectionCard } from "@/components/section-card";
import { getAccountContext } from "@/lib/auth/account-context";
import { getIntegrationSummaryBySessionId } from "@/lib/db/integration-summaries";
import { getPlatformSessionById } from "@/lib/db/platform-sessions";
import { SUMMARY_FIELD_META } from "@/lib/personal-integration/ops/summary-template";
import { isDatabaseConfigured } from "@/lib/platform-config";
import "@/styles/personal-integration-ops-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integration Summary | Account",
  description: "Your published Personal Integration Summary",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

type PageProps = { params: Promise<{ sessionId: string }> };

export default async function AccountIntegrationSessionPage({ params }: PageProps) {
  if (!isDatabaseConfigured()) {
    return <SectionCard title="Unavailable"><p>Account features require the platform database.</p></SectionCard>;
  }

  const account = await getAccountContext();
  if (!account) redirect("/login?next=/account");

  const { sessionId } = await params;
  const session = await getPlatformSessionById(sessionId);
  if (!session || session.user_id !== account.user.id || session.kind !== "personal_integration") {
    return (
      <div className="pi-ops-page">
        <SectionCard title="Session not found">
          <p>We could not find this Personal Integration Session for your account.</p>
          <Link href="/account" className="blueprint-secondary-link">
            Return to Account
          </Link>
        </SectionCard>
      </div>
    );
  }

  const summary = await getIntegrationSummaryBySessionId(sessionId);
  const published =
    summary && (summary.status === "published" || summary.status === "sent")
      ? summary.client_facing_content
      : null;

  return (
    <div className="pi-ops-page">
      <header className="pi-ops-hero">
        <p className="pi-ops-eyebrow">PERSONAL INTEGRATION</p>
        <h1 className="pi-ops-title">Integration Summary</h1>
        <p className="pi-ops-boundary">
          Your Soul Blueprint is a mirror — not a fixed identity. Private session notes are never
          shown here.
        </p>
      </header>

      <SectionCard title="Session">
        <p>Status: {session.status}</p>
        <p>Intake: {session.intake_status ?? "not_started"}</p>
        <p>Summary: {session.summary_status ?? "none"}</p>
        {session.prep_access_token ? (
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href={`/integration/intake/${session.id}?token=${session.prep_access_token}`}
              className="gold-button inline-flex"
            >
              Pre-Session Intake
            </Link>
            <Link
              href={`/integration/prep/${session.id}?token=${session.prep_access_token}`}
              className="gold-button inline-flex"
            >
              Session Prep
            </Link>
          </div>
        ) : null}
      </SectionCard>

      {published ? (
        <SectionCard title="Published Summary">
          {SUMMARY_FIELD_META.map((field) => (
            <div key={field.key} className="mb-3">
              <p className="text-xs uppercase tracking-wide opacity-70">{field.label}</p>
              <p>{published[field.key]}</p>
            </div>
          ))}
        </SectionCard>
      ) : (
        <SectionCard title="Summary">
          <p>
            Your Integration Summary will appear here after your Blueprint Integration Consultant
            publishes it.
          </p>
        </SectionCard>
      )}

      <p className="text-sm">
        <Link href="/account" className="blueprint-secondary-link">
          Return to Account
        </Link>
      </p>
    </div>
  );
}
