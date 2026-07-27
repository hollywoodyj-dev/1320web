import type { Metadata } from "next";
import { PersonalIntegrationIntakeForm } from "@/components/personal-integration/intake-form";
import { INTAKE_COPY, INTAKE_META } from "@/lib/personal-integration/ops/intake-content";
import "@/styles/personal-integration-ops-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: INTAKE_META.title,
  description: INTAKE_META.description,
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

type PageProps = {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function IntegrationIntakePage({ params, searchParams }: PageProps) {
  const { sessionId } = await params;
  const query = await searchParams;
  const token = typeof query.token === "string" ? query.token : undefined;

  return (
    <div className="pi-ops-page pi-intake-page">
      <header className="pi-ops-hero">
        <p className="pi-ops-eyebrow">{INTAKE_COPY.eyebrow}</p>
        <h1 className="pi-ops-title">{INTAKE_COPY.title}</h1>
        <p className="pi-ops-lead" style={{ whiteSpace: "pre-line" }}>
          {INTAKE_COPY.lead}
        </p>
        <p className="pi-intake-time">{INTAKE_COPY.timeEstimate}</p>
        <p className="pi-ops-boundary">{INTAKE_COPY.boundary}</p>
      </header>
      <PersonalIntegrationIntakeForm sessionId={sessionId} token={token} />
    </div>
  );
}
