import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { SectionCard } from "@/components/section-card";
import { SIGNUP_COPY, SIGNUP_META } from "@/lib/auth/account-content";

export const metadata: Metadata = {
  title: SIGNUP_META.title,
  description: SIGNUP_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readNext(params: SearchParams): string {
  const value = params.next;
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/account";
}

export default async function SignupPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const nextPath = readNext(params);

  return (
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <h1 className="blueprint-title">{SIGNUP_COPY.title}</h1>
        <p className="blueprint-lead">{SIGNUP_COPY.body}</p>
      </header>
      <SectionCard title="Your details (saved once)">
        <SignupForm nextPath={nextPath} />
      </SectionCard>
      <p className="text-sm text-center">
        <Link href="/login" className="blueprint-secondary-link">
          Already have an account? Sign in
        </Link>
      </p>
    </div>
  );
}
