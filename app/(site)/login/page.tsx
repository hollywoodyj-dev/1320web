import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
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
    <div className="auth-page">
      <div className="auth-card glass-card">
        <header className="auth-card-header">
          <p className="auth-card-eyebrow">{LOGIN_META.title}</p>
          <h1 className="auth-card-title">{LOGIN_COPY.title}</h1>
          <p className="auth-card-lead">{LOGIN_COPY.body}</p>
        </header>
        <LoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
