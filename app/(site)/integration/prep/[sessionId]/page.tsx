import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonalIntegrationPrepForm } from "@/components/personal-integration-prep-form";
import { SectionCard } from "@/components/section-card";
import { getPersonalIntegrationPrepContext } from "@/lib/personal-integration/prep-context";
import {
  PREP_BLUEPRINT,
  PREP_HERO,
  PREP_INVALID,
  PREP_META,
  PREP_SAVED_FOCUS,
  PREP_STATUS,
} from "@/lib/personal-integration/prep-content";

export const metadata: Metadata = {
  title: PREP_META.title,
  description: PREP_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readToken(params: SearchParams): string | undefined {
  const value = params.token;
  return Array.isArray(value) ? value[0] : value;
}

export default async function PersonalIntegrationPrepPage({
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
        <SectionCard title={PREP_INVALID.title}>
          <p>{PREP_INVALID.body}</p>
          <Link href="/booking" className="gold-button mt-4 inline-block">
            {PREP_INVALID.cta}
          </Link>
        </SectionCard>
      </div>
    );
  }

  const context = await getPersonalIntegrationPrepContext(sessionId, token);
  if (!context) notFound();

  const statusCopy =
    PREP_STATUS[context.session.status as keyof typeof PREP_STATUS] ?? PREP_STATUS.scheduled;

  const prepNotes =
    [...context.reflections]
      .reverse()
      .find((reflection) => reflection.kind === "practice")?.body ?? "";

  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{PREP_HERO.eyebrow}</p>
        <h1 className="conversion-title">{PREP_HERO.title}</h1>
        <p className="conversion-lead">{PREP_HERO.body}</p>
        <p className="conversion-boundary text-sm opacity-90">{PREP_HERO.boundary}</p>
      </section>

      <SectionCard title={context.variantLabel} subtitle={statusCopy}>
        <p className="text-sm opacity-90">
          Session reference: <span className="font-mono text-xs">{context.session.id}</span>
        </p>
      </SectionCard>

      {context.growthEdge ? (
        <SectionCard title={PREP_SAVED_FOCUS.title} subtitle={PREP_SAVED_FOCUS.note}>
          <p className="leading-relaxed">{context.growthEdge}</p>
        </SectionCard>
      ) : null}

      <SectionCard title={PREP_BLUEPRINT.title} subtitle={PREP_BLUEPRINT.note}>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S1 Origin</dt>
            <dd className="font-medium">{context.codes.s1}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S3 Vibration</dt>
            <dd className="font-medium">{context.codes.s3}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S2 Mirror</dt>
            <dd className="font-medium">{context.codes.s2}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-70">S0 Void Gate</dt>
            <dd className="font-medium">{context.codes.s0}</dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard title="Optional notes for your facilitator">
        <PersonalIntegrationPrepForm
          sessionId={context.session.id}
          prepToken={token}
          initialPrepNotes={prepNotes}
        />
      </SectionCard>
    </div>
  );
}
