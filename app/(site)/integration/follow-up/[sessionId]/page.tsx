import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonalIntegrationFollowUpForm } from "@/components/personal-integration-follow-up-form";
import { SectionCard } from "@/components/section-card";
import { getPersonalIntegrationFollowUpContext } from "@/lib/personal-integration/follow-up-context";
import {
  FOLLOW_UP_FORM,
  FOLLOW_UP_HERO,
  FOLLOW_UP_INVALID,
  FOLLOW_UP_META,
  FOLLOW_UP_SUMMARY,
} from "@/lib/personal-integration/follow-up-content";

export const metadata: Metadata = {
  title: FOLLOW_UP_META.title,
  description: FOLLOW_UP_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readToken(params: SearchParams): string | undefined {
  const value = params.token;
  return Array.isArray(value) ? value[0] : value;
}

export default async function PersonalIntegrationFollowUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { sessionId } = await params;
  const token = readToken(await searchParams);

  if (!token) {
    return (
      <div className="conversion-page space-y-5">
        <SectionCard title={FOLLOW_UP_INVALID.title}>
          <p>{FOLLOW_UP_INVALID.body}</p>
          <Link href="/booking" className="gold-button mt-4 inline-block">
            {FOLLOW_UP_INVALID.cta}
          </Link>
        </SectionCard>
      </div>
    );
  }

  const context = await getPersonalIntegrationFollowUpContext(sessionId, token);
  if (!context) notFound();

  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{FOLLOW_UP_HERO.eyebrow}</p>
        <h1 className="conversion-title">{FOLLOW_UP_HERO.title}</h1>
        <p className="conversion-lead">{FOLLOW_UP_HERO.body}</p>
        <p className="conversion-boundary text-sm opacity-90">{FOLLOW_UP_HERO.boundary}</p>
      </section>

      <SectionCard title={context.variantLabel} subtitle={`Hello, ${context.clientName}`}>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S1</dt>
            <dd className="font-medium">{context.codes.s1}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S3</dt>
            <dd className="font-medium">{context.codes.s3}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S2</dt>
            <dd className="font-medium">{context.codes.s2}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S0</dt>
            <dd className="font-medium">{context.codes.s0}</dd>
          </div>
        </dl>
      </SectionCard>

      {(context.summary || context.growthEdge) && (
        <SectionCard title={FOLLOW_UP_SUMMARY.title}>
          {context.growthEdge ? (
            <p className="mb-3">
              <span className="opacity-70">{FOLLOW_UP_SUMMARY.growthEdge}: </span>
              {context.growthEdge}
            </p>
          ) : null}
          {context.summary ? <p>{context.summary}</p> : null}
        </SectionCard>
      )}

      <SectionCard title={FOLLOW_UP_FORM.label}>
        <PersonalIntegrationFollowUpForm sessionId={context.session.id} followUpToken={token} />
      </SectionCard>
    </div>
  );
}
