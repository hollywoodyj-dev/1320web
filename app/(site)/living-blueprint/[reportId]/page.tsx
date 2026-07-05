import type { Metadata } from "next";
import Link from "next/link";
import { LivingBlueprintDashboard } from "@/components/living-blueprint-dashboard";
import { SectionCard } from "@/components/section-card";
import { getEntitledReportAccess } from "@/lib/auth/access";
import {
  ACCESS_DENIED,
  LIVING_BLUEPRINT_HERO,
  LIVING_BLUEPRINT_META,
} from "@/lib/living-blueprint/content";
import { buildLivingBlueprintSnapshot } from "@/lib/living-blueprint/build-snapshot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: LIVING_BLUEPRINT_META.title,
  description: LIVING_BLUEPRINT_META.description,
};

type PageProps = { params: Promise<{ reportId: string }> };

export default async function LivingBlueprintPage({ params }: PageProps) {
  const { reportId } = await params;
  const access = await getEntitledReportAccess(reportId);

  if (!access.allowed) {
    return (
      <div className="conversion-page space-y-5">
        <SectionCard title={ACCESS_DENIED.title}>
          <p>
            {access.reason === "unauthenticated"
              ? ACCESS_DENIED.unauthenticated
              : ACCESS_DENIED.noEntitlement}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/checkout" className="gold-button">
              {ACCESS_DENIED.ctaCheckout}
            </Link>
            <Link href="/my-report" className="blueprint-secondary-link">
              {ACCESS_DENIED.ctaMyReport}
            </Link>
          </div>
        </SectionCard>
      </div>
    );
  }

  const snapshot = await buildLivingBlueprintSnapshot({
    userId: access.user.id,
    reportId,
    clientName: access.user.first_name ?? undefined,
  });

  if (!snapshot) {
    return (
      <SectionCard title="Living Blueprint">
        <p>Could not load your Living Blueprint.</p>
      </SectionCard>
    );
  }

  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{LIVING_BLUEPRINT_HERO.eyebrow}</p>
        <h1 className="conversion-title">{LIVING_BLUEPRINT_HERO.title}</h1>
        <p className="conversion-lead">{LIVING_BLUEPRINT_HERO.body}</p>
        <p className="text-sm opacity-80">{LIVING_BLUEPRINT_HERO.boundary}</p>
      </section>
      <SectionCard title={`Tier: ${snapshot.membershipTier ?? "living_blueprint"}`}>
        <LivingBlueprintDashboard reportId={reportId} initialSnapshot={snapshot} />
      </SectionCard>
      <p className="text-sm">
        <Link href={`/my-report/${reportId}`} className="blueprint-secondary-link">
          View Full Report
        </Link>
        {" · "}
        <Link href="/reflect" className="blueprint-secondary-link">
          Reflect with Wisewave
        </Link>
      </p>
    </div>
  );
}
