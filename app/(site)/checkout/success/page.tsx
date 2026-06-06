import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutSuccessClient } from "@/components/checkout/checkout-success-client";
import { SectionCard } from "@/components/section-card";

export const metadata: Metadata = {
  title: "Purchase Complete",
  description: "Your 1320 Full Report purchase is being confirmed.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return (
    <div className="conversion-page space-y-5">
      <SectionCard title="Thank You — Full Report Unlock In Progress">
        <p>
          We are confirming your purchase and signing you in. You will be redirected to your Full
          Report shortly. A magic link email is also sent when email is configured.
        </p>
        {sessionId ? <CheckoutSuccessClient sessionId={sessionId} /> : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/my-report" className="gold-button inline-flex">
            GO TO MY REPORT
          </Link>
          <Link href="/" className="blueprint-secondary-link">
            Return home
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}
