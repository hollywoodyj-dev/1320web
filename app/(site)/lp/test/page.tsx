import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LP test (stub)",
  description: "Tracking acceptance stub — not for ads.",
  robots: { index: false, follow: false },
};

/** Stub LP for S0–S3 acceptance: visiting should write page_view + paid_landing_view. */
export default function LpTestPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm tracking-wide text-[var(--muted,#666)]">1320 Soul Code · LP stub</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">/lp/test</h1>
      <p className="mt-4 text-base leading-7 text-[var(--muted,#555)]">
        Acceptance page for marketing tracking. No ads content. Site analytics should record{" "}
        <code>page_view</code> and <code>paid_landing_view</code> with <code>lp=test</code>.
      </p>
      <p className="mt-8">
        <Link href="/free-soul-blueprint" className="underline">
          Continue to Generate
        </Link>
      </p>
    </main>
  );
}
