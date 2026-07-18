import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { LOGIN_COPY, LOGIN_META } from "@/lib/auth/account-content";
import { getAccountContext } from "@/lib/auth/account-context";
import { safeNextPath } from "@/lib/auth/next-path";
import {
  authReturnContextNote,
  resolveAuthReturnContext,
} from "@/lib/auth/return-context";
import "@/styles/auth-density-v1.css";

export const metadata: Metadata = {
  title: LOGIN_META.title,
  description: LOGIN_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readNext(params: SearchParams): string {
  const value = params.next;
  const raw = Array.isArray(value) ? value[0] : value;
  return safeNextPath(raw, "/account");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const nextPath = readNext(params);
  const account = await getAccountContext();
  if (account) {
    redirect(nextPath);
  }

  const contextNote = authReturnContextNote(resolveAuthReturnContext(nextPath));

  return (
    <div className="auth-page auth-page--refined">
      <div className="auth-main">
        <div className="auth-card glass-card">
          <header className="auth-card-header">
            <p className="auth-card-eyebrow">{LOGIN_META.title}</p>
            <h1 className="auth-card-title">{LOGIN_COPY.title}</h1>
            <p className="auth-card-lead">{LOGIN_COPY.body}</p>
            {contextNote ? <p className="auth-card-note">{contextNote}</p> : null}
          </header>
          <LoginForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
