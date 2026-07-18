import type { Metadata } from "next";
import Link from "next/link";
import { ReflectEntryForm } from "@/components/reflect-entry-form";
import { SectionCard } from "@/components/section-card";
import { getAccountContext } from "@/lib/auth/account-context";
import { REFLECT_FORM, REFLECT_HERO, REFLECT_META } from "@/lib/wisewave/reflect-content";
import { isDatabaseConfigured } from "@/lib/platform-config";

export const metadata: Metadata = {
  title: REFLECT_META.title,
  description: REFLECT_META.description,
};

export default async function ReflectPage() {
  const account = isDatabaseConfigured() ? await getAccountContext() : null;
  const prefill =
    account?.birthDate
      ? {
          firstName: account.user.first_name?.trim() || account.user.email.split("@")[0] || "Friend",
          email: account.user.email,
          birthDate: account.birthDate,
          useAccountProfile: true as const,
          reportId: account.entitledReportId ?? account.report?.id,
        }
      : undefined;

  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{REFLECT_HERO.eyebrow}</p>
        <h1 className="conversion-title">{REFLECT_HERO.title}</h1>
        <p className="conversion-boundary text-sm opacity-90">{REFLECT_HERO.boundary}</p>
      </section>
      <SectionCard title="Begin">
        {prefill ? <p className="conversion-lead mb-4">{REFLECT_FORM.accountLead}</p> : null}
        <ReflectEntryForm prefill={prefill} />
      </SectionCard>
      <p className="text-sm opacity-80">
        Prefer a live facilitator?{" "}
        <Link href="/booking" className="blueprint-secondary-link">
          Request a Personal Integration Session
        </Link>
        .
      </p>
    </div>
  );
}
