import type { Metadata } from "next";
import Link from "next/link";
import { MagicLinkVerifyForm } from "@/components/auth/magic-link-verify-form";
import { SectionCard } from "@/components/section-card";
import { safeNextPath } from "@/lib/auth/next-path";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: "Open Full Report",
  description: "Confirm your secure link to your 1320 Full Soul Origin Report.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function MagicLinkVerifyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const nextRaw = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = safeNextPath(nextRaw, "/my-report");

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
      <SectionCard title="Sign In Required">
        <p>This link is incomplete. Sign in with your email and password to open your Full Report.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="gold-button inline-flex">
            SIGN IN
          </Link>
          <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link self-center">
            Set password
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <div className="conversion-page space-y-5">
      <SectionCard title="Open Your Full Report">
        <p className="mb-4 text-sm text-[#B9C1D0]">
          This is a legacy email link. Tap continue to sign in, or use your password at the login page
          instead.
        </p>
        <MagicLinkVerifyForm token={token} nextPath={nextPath} />
        <p className="mt-4 text-sm text-[#B9C1D0]">
          Prefer password sign-in?{" "}
          <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="blueprint-secondary-link">
            Go to login
          </Link>
          .
        </p>
      </SectionCard>
    </div>
  );
}
