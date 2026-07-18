import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { SIGNUP_COPY, SIGNUP_META } from "@/lib/auth/account-content";
import { safeNextPath } from "@/lib/auth/next-path";
import "@/styles/auth-density-v1.css";

export const metadata: Metadata = {
  title: SIGNUP_META.title,
  description: SIGNUP_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readNext(params: SearchParams): string {
  const value = params.next;
  const raw = Array.isArray(value) ? value[0] : value;
  return safeNextPath(raw, "/account");
}

export default async function SignupPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const nextPath = readNext(params);

  return (
    <div className="auth-page auth-page--refined">
      <div className="auth-main">
        <div className="auth-card auth-card-wide glass-card">
          <header className="auth-card-header">
            <p className="auth-card-eyebrow">{SIGNUP_META.title}</p>
            <h1 className="auth-card-title">{SIGNUP_COPY.title}</h1>
            <p className="auth-card-lead">{SIGNUP_COPY.body}</p>
          </header>
          <SignupForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
