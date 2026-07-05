import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReflectChat } from "@/components/reflect-chat";
import { SectionCard } from "@/components/section-card";
import { getWisewaveSessionContext } from "@/lib/wisewave/process-turn";
import { REFLECT_HERO, REFLECT_INVALID, REFLECT_META } from "@/lib/wisewave/reflect-content";

export const metadata: Metadata = {
  title: REFLECT_META.title,
  description: REFLECT_META.description,
};

type SearchParams = Record<string, string | string[] | undefined>;

function readToken(params: SearchParams): string | undefined {
  const value = params.token;
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReflectSessionPage({
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
        <SectionCard title={REFLECT_INVALID.title}>
          <p>{REFLECT_INVALID.body}</p>
          <Link href="/reflect" className="gold-button mt-4 inline-block">
            {REFLECT_INVALID.cta}
          </Link>
        </SectionCard>
      </div>
    );
  }

  const session = await getWisewaveSessionContext(sessionId, token);
  if (!session) notFound();

  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{REFLECT_HERO.eyebrow}</p>
        <h1 className="conversion-title">Hello, {session.clientName}</h1>
        <p className="conversion-boundary text-sm opacity-90">{REFLECT_HERO.boundary}</p>
      </section>
      <SectionCard title="Reflection">
        <ReflectChat sessionId={sessionId} accessToken={token} initialSession={session} />
      </SectionCard>
    </div>
  );
}
