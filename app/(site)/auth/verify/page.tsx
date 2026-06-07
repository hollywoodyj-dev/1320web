import type { Metadata } from "next";
import Link from "next/link";
import { MagicLinkVerifyForm } from "@/components/auth/magic-link-verify-form";
import { SectionCard } from "@/components/section-card";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: "Open Full Report",
  description: "Confirm your secure return link to your 1320 Full Soul Origin Report.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function MagicLinkVerifyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const nextPath =
    typeof params.next === "string" && params.next.startsWith("/") ? params.next : "/my-report";

  if (!isDatabaseConfigured()) {
    return (
      <SectionCard title="Report Access Unavailable">
        <p>Database is not configured on this environment.</p>
        <Link href="/checkout" className="blueprint-secondary-link">
          Return to checkout
        </Link>
      </SectionCard>
    );
  }

  if (!token) {
    return (
      <SectionCard title="Invalid Link">
        <p>This sign-in link is missing a token. Request a new magic link from checkout.</p>
        <Link href="/checkout?error=token" className="gold-button mt-4 inline-flex">
          GO TO CHECKOUT
        </Link>
      </SectionCard>
    );
  }

  return (
    <div className="conversion-page space-y-5">
      <SectionCard title="Open Your Full Report">
        <p className="mb-4 text-sm text-[#B9C1D0]">
          Tap continue to sign in securely. This extra step prevents email scanners from using your
          one-time link before you do.
        </p>
        <MagicLinkVerifyForm token={token} nextPath={nextPath} />
        <p className="mt-4 text-sm text-[#B9C1D0]">
          Link expired?{" "}
          <Link href="/checkout" className="blueprint-secondary-link">
            Request a new magic link
          </Link>
          .
        </p>
      </SectionCard>
    </div>
  );
}
