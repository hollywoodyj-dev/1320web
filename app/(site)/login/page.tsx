import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { SectionCard } from "@/components/section-card";
import { LOGIN_COPY, LOGIN_META } from "@/lib/auth/account-content";

export const metadata: Metadata = {
  title: LOGIN_META.title,
  description: LOGIN_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readNext(params: SearchParams): string {
  const value = params.next;
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/account";
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const nextPath = readNext(params);

  return (
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <h1 className="blueprint-title">{LOGIN_COPY.title}</h1>
        <p className="blueprint-lead">{LOGIN_COPY.body}</p>
      </header>
      <SectionCard title="Sign in with email">
        <LoginForm nextPath={nextPath} />
      </SectionCard>
      <p className="text-sm text-center">
        <Link href="/signup" className="blueprint-secondary-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
