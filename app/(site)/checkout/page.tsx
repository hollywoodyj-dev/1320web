import type { Metadata } from "next";
import Link from "next/link";
import { PurchaserSignInPrompt } from "@/components/checkout/purchaser-sign-in-prompt";
import { UnlockCheckoutForm } from "@/components/checkout/unlock-checkout-form";
import { SectionCard } from "@/components/section-card";
import { accountBirthDateParts, getAccountContext } from "@/lib/auth/account-context";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import { isDatabaseConfigured, isStripeConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: "Unlock Full Report",
  description: "Purchase your 1320 Full Soul Origin Report — one-time unlock with password sign-in return access.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const account = await getAccountContext();
  const accountBirth = account ? accountBirthDateParts(account.birthDate) : null;
  const checkoutBirth = accountBirth ?? birth;
  const profileLocked = Boolean(account?.profileComplete && checkoutBirth);
  const configured = isDatabaseConfigured() && isStripeConfigured();
  const authError =
    typeof params.error === "string"
      ? {
          expired: "That old email link expired. Sign in with your password below instead.",
          token: "That link was incomplete. Sign in with your email and password below.",
          db: "Report access is temporarily unavailable. Please try again shortly.",
        }[params.error]
      : undefined;

  return (
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">FULL SOUL ORIGIN REPORT</p>
        <h1 className="blueprint-title">Unlock My Full Blueprint</h1>
        <p className="blueprint-lead">
          Your free result gives you the first mirror. The Full Report opens the full map — deeper S1–S0,
          Integrated Soul Blueprint, and return access when you sign in with your account.
        </p>
      </header>

      {authError ? (
        <SectionCard title="Sign-In Issue">
          <p>{authError}</p>
        </SectionCard>
      ) : null}

      {!configured ? (
        <SectionCard title="Checkout Not Yet Live">
          <p>
            Phase 2A checkout requires <code>POSTGRES_URL</code> and Stripe environment variables on
            production. Forms still work in preview; payment unlock ships when ops configures the platform.
          </p>
          <Link href="/full-report" className="blueprint-secondary-link">
            Return to Full Report overview
          </Link>
        </SectionCard>
      ) : account && account.entitledReportId ? (
        <SectionCard title="Full Report Already Unlocked">
          <p>Your Full Report is ready.</p>
          <Link href={`/my-report/${account.entitledReportId}`} className="gold-button mt-4 inline-flex">
            OPEN FULL REPORT
          </Link>
        </SectionCard>
      ) : (
        <SectionCard title="Purchase Full Report">
          {!account ? (
            <p className="mb-4 text-sm opacity-90">
              <Link href="/signup?next=/checkout" className="blueprint-secondary-link">
                Create an account
              </Link>{" "}
              to save your details once — checkout becomes one step.
            </p>
          ) : null}
          <UnlockCheckoutForm
            defaultYear={checkoutBirth?.year}
            defaultMonth={checkoutBirth?.month}
            defaultDay={checkoutBirth?.day}
            defaultEmail={account?.user.email}
            defaultFirstName={account?.user.first_name ?? undefined}
            profileLocked={profileLocked}
            source="checkout_page"
          />
        </SectionCard>
      )}

      <SectionCard title="Already Purchased?">
        <PurchaserSignInPrompt />
      </SectionCard>
    </div>
  );
}
