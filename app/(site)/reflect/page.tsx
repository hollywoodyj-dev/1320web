import type { Metadata } from "next";
import Link from "next/link";
import { ReflectEntryForm } from "@/components/reflect-entry-form";
import { getAccountContext } from "@/lib/auth/account-context";
import { safeNextPath } from "@/lib/auth/next-path";
import { REFLECT_FORM, REFLECT_HERO, REFLECT_META, REFLECT_EXPLORE_LINKS } from "@/lib/wisewave/reflect-content";
import { isDatabaseConfigured } from "@/lib/platform-config";
import "@/styles/reflect-entry-v1.css";

export const metadata: Metadata = {
  title: REFLECT_META.title,
  description: REFLECT_META.description,
  alternates: { canonical: "/reflect" },
};

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() || undefined;
}

export default async function ReflectPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const account = isDatabaseConfigured() ? await getAccountContext() : null;
  const reportIdParam = readParam(params, "reportId");
  const nextPath = safeNextPath(readParam(params, "next"), "/account");

  const reportId = reportIdParam ?? account?.entitledReportId ?? account?.report?.id;
  const hasBlueprintContext = Boolean(
    account && (account.birthDate || account.report || account.entitledReportId || reportIdParam),
  );

  const prefill =
    hasBlueprintContext && account
      ? {
          firstName:
            account.user.first_name?.trim() || account.user.email.split("@")[0] || "Friend",
          email: account.user.email,
          birthDate: account.birthDate ?? "",
          useAccountProfile: true as const,
          reportId,
        }
      : undefined;

  const returnReportHref =
    reportId && (nextPath.startsWith("/my-report") || nextPath.startsWith("/mobile-report") || nextPath === "/report")
      ? nextPath
      : reportId
        ? `/my-report/${reportId}`
        : nextPath.startsWith("/my-report") || nextPath.startsWith("/mobile-report")
          ? nextPath
          : null;

  return (
    <div className="reflect-page reflect-page--refined">
      <section className="reflect-hero">
        <p className="reflect-eyebrow">{REFLECT_HERO.eyebrow}</p>
        <h1 className="reflect-title">{REFLECT_HERO.title}</h1>
        <p className="reflect-lead">{REFLECT_HERO.body}</p>
        <p className="reflect-boundary">{REFLECT_HERO.boundary}</p>
        <p className="reflect-authority">{REFLECT_HERO.authority}</p>
      </section>

      <section className="reflect-begin glass-card" aria-labelledby="reflect-begin-title">
        <h2 id="reflect-begin-title" className="reflect-begin-title">
          {REFLECT_FORM.beginTitle}
        </h2>
        <ReflectEntryForm
          prefill={prefill}
          returnReportHref={prefill ? returnReportHref : null}
        />
      </section>

      <p className="reflect-session-secondary">
        {REFLECT_FORM.sessionSecondary}{" "}
        <Link href="/booking" className="blueprint-secondary-link">
          {REFLECT_FORM.sessionCta}
        </Link>
        .
      </p>

      <nav className="reflect-explore-links" aria-label="Explore 1320">
        {REFLECT_EXPLORE_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="blueprint-secondary-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
