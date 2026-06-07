import type { Metadata } from "next";
import Link from "next/link";
import { MagicLinkRequestForm } from "@/components/checkout/magic-link-request-form";
import { UnlockCheckoutForm } from "@/components/checkout/unlock-checkout-form";
import { SectionCard } from "@/components/section-card";
import { resolveBirthDateFromRequest } from "@/lib/resolve-birth-date";
import { isDatabaseConfigured, isStripeConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: "Unlock Full Report",
  description: "Purchase your 1320 Full Soul Origin Report — one-time unlock with magic-link return access.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const birth = await resolveBirthDateFromRequest(params);
  const configured = isDatabaseConfigured() && isStripeConfigured();
  const authError =
    typeof params.error === "string"
      ? {
          expired: "That magic link is invalid, already used, or expired. Request a new one below.",
          token: "That sign-in link was incomplete. Request a new magic link below.",
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
          Integrated Soul Blueprint, and return access via magic link.
        </p>
      </header>

      {authError ? (
        <SectionCard title="Sign-In Link Issue">
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
      ) : (
        <SectionCard title="Purchase Full Report">
          <UnlockCheckoutForm
            defaultYear={birth?.year}
            defaultMonth={birth?.month}
            defaultDay={birth?.day}
            source="checkout_page"
          />
        </SectionCard>
      )}

      <SectionCard title="Already Purchased?">
        <p className="mb-4 text-sm text-[#B9C1D0]">
          Request a new magic link to return to your Full Report.
        </p>
        <MagicLinkRequestForm />
      </SectionCard>
    </div>
  );
}
