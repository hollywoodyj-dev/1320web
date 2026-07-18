import type { Metadata } from "next";
import Link from "next/link";
import {
  FORGOT_PASSWORD_COPY,
  FORGOT_PASSWORD_META,
} from "@/lib/auth/account-content";
import { LEGAL_PLACEHOLDERS } from "@/lib/legal-placeholders";
import { safeNextPath } from "@/lib/auth/next-path";
import "@/styles/auth-density-v1.css";

export const metadata: Metadata = {
  title: FORGOT_PASSWORD_META.title,
  description: FORGOT_PASSWORD_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readNext(params: SearchParams): string {
  const value = params.next;
  const raw = Array.isArray(value) ? value[0] : value;
  return safeNextPath(raw, "/account");
}

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const nextPath = readNext(params);
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;
  const signupHref = `/signup?next=${encodeURIComponent(nextPath)}`;
  const mailto = `mailto:${LEGAL_PLACEHOLDERS.contactEmail}?subject=${encodeURIComponent(
    "1320 password help",
  )}`;

  return (
    <div className="auth-page auth-page--refined">
      <div className="auth-main">
        <div className="auth-card glass-card">
          <header className="auth-card-header">
            <p className="auth-card-eyebrow">Account Access</p>
            <h1 className="auth-card-title">{FORGOT_PASSWORD_COPY.title}</h1>
            <p className="auth-card-lead">{FORGOT_PASSWORD_COPY.body}</p>
          </header>

          <div className="auth-recovery-block">
            <h2>{FORGOT_PASSWORD_COPY.firstTimeTitle}</h2>
            <p>{FORGOT_PASSWORD_COPY.firstTimeBody}</p>
          </div>

          <div className="auth-recovery-actions">
            <a href={mailto} className="gold-button auth-submit">
              {FORGOT_PASSWORD_COPY.contactCta}
            </a>
            <Link href={signupHref} className="blueprint-secondary-link">
              {FORGOT_PASSWORD_COPY.createAccountCta}
            </Link>
            <Link href={loginHref} className="blueprint-secondary-link">
              {FORGOT_PASSWORD_COPY.backToSignIn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
