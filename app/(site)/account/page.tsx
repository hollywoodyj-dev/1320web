import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SectionCard } from "@/components/section-card";
import { getAccountContext } from "@/lib/auth/account-context";
import { ACCOUNT_COPY, ACCOUNT_META } from "@/lib/auth/account-content";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: ACCOUNT_META.title,
  description: ACCOUNT_META.description,
};

export default async function AccountPage() {
  if (!isDatabaseConfigured()) {
    return (
      <SectionCard title="Account Unavailable">
        <p>Account features require the platform database.</p>
      </SectionCard>
    );
  }

  const account = await getAccountContext();
  if (!account) {
    redirect("/login?next=/account");
  }

  const displayName =
    [account.user.first_name, account.user.last_name].filter(Boolean).join(" ") || account.user.email;

  return (
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">{ACCOUNT_COPY.eyebrow}</p>
        <h1 className="blueprint-title">{ACCOUNT_COPY.title}</h1>
        <p className="blueprint-lead">
          {ACCOUNT_COPY.signedInAs} <strong>{displayName}</strong> ({account.user.email})
        </p>
      </header>

      <SectionCard title={ACCOUNT_COPY.profileTitle}>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">Birth date</dt>
            <dd>{account.birthDate ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">Email</dt>
            <dd>{account.user.email}</dd>
          </div>
        </dl>
      </SectionCard>

      {account.codeString ? (
        <SectionCard title={ACCOUNT_COPY.codesTitle}>
          <p className="font-mono text-sm">{account.codeString}</p>
          <Link href="/your-code" className="blueprint-secondary-link mt-3 inline-block">
            Generate / explore code
          </Link>
        </SectionCard>
      ) : null}

      <SectionCard title={ACCOUNT_COPY.fullReportTitle}>
        {account.entitledReportId ? (
          <>
            <p>{ACCOUNT_COPY.fullReportUnlocked}</p>
            <Link href={`/my-report/${account.entitledReportId}`} className="gold-button mt-4 inline-flex">
              {ACCOUNT_COPY.openFullReport}
            </Link>
          </>
        ) : (
          <>
            <p>{ACCOUNT_COPY.fullReportLocked}</p>
            <Link href="/checkout" className="gold-button mt-4 inline-flex">
              {ACCOUNT_COPY.unlockFullReport}
            </Link>
          </>
        )}
      </SectionCard>

      <SectionCard title={ACCOUNT_COPY.bookingTitle}>
        {account.integrationSessions.length > 0 ? (
          <>
            <p>{ACCOUNT_COPY.sessionRequested}</p>
            <ul className="conversion-bullet-list mt-4 space-y-3">
              {account.integrationSessions.map((session) => (
                <li key={session.sessionId} className="list-none">
                  <p className="font-medium">{session.variantLabel}</p>
                  <p className="text-sm opacity-80">
                    Requested {session.createdAt} · {session.status}
                  </p>
                  {session.growthEdge ? (
                    <p className="text-sm opacity-80 mt-1 line-clamp-2">{session.growthEdge}</p>
                  ) : null}
                  <Link href={session.prepPath} className="gold-button mt-3 inline-flex">
                    {ACCOUNT_COPY.viewSessionPrep}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/booking" className="blueprint-secondary-link mt-4 inline-block">
              {ACCOUNT_COPY.bookAnotherSession}
            </Link>
          </>
        ) : (
          <>
            <p>{ACCOUNT_COPY.bookingNone}</p>
            <Link href="/booking" className="gold-button mt-4 inline-flex">
              {ACCOUNT_COPY.bookSession}
            </Link>
          </>
        )}
      </SectionCard>

      <p className="text-sm">
        <SignOutButton />
      </p>
    </div>
  );
}
