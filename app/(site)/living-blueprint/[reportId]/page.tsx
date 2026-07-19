import type { Metadata } from "next";
import Link from "next/link";
import { LivingBlueprintDashboard } from "@/components/living-blueprint-dashboard";
import { SectionCard } from "@/components/section-card";
import { getEntitledReportAccess } from "@/lib/auth/access";
import {
  ACCESS_DENIED,
  LIVING_BLUEPRINT_HERO,
  LIVING_BLUEPRINT_META,
  MEMBERSHIP_SECTION,
} from "@/lib/living-blueprint/content";
import { buildLivingBlueprintSnapshot } from "@/lib/living-blueprint/build-snapshot";
import "@/styles/living-blueprint-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: LIVING_BLUEPRINT_META.title,
  description: LIVING_BLUEPRINT_META.description,
  robots: { index: false, follow: false, nocache: true },
};

type PageProps = { params: Promise<{ reportId: string }> };

export default async function LivingBlueprintPage({ params }: PageProps) {
  const { reportId } = await params;
  const access = await getEntitledReportAccess(reportId);

  if (!access.allowed) {
    const signInHref = `/login?next=${encodeURIComponent(`/living-blueprint/${reportId}`)}`;
    return (
      <div className="living-blueprint-page living-blueprint-page--gate">
        <SectionCard title={ACCESS_DENIED.title}>
          <p>
            {access.reason === "unauthenticated"
              ? ACCESS_DENIED.unauthenticated
              : ACCESS_DENIED.noEntitlement}
          </p>
          <div className="living-blueprint-gate-actions">
            {access.reason === "unauthenticated" ? (
              <Link href={signInHref} className="gold-button">
                {ACCESS_DENIED.ctaSignIn}
              </Link>
            ) : (
              <Link href="/checkout" className="gold-button">
                {ACCESS_DENIED.ctaCheckout}
              </Link>
            )}
            <Link href="/account" className="blueprint-secondary-link">
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
      <div className="living-blueprint-page living-blueprint-page--gate">
        <SectionCard title="Living Blueprint">
          <p>Could not load your Living Blueprint.</p>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="living-blueprint-page living-blueprint-page--member">
      <section className="living-blueprint-hero" aria-labelledby="living-blueprint-title">
        <p className="living-blueprint-eyebrow">{LIVING_BLUEPRINT_HERO.eyebrow}</p>
        <h1 id="living-blueprint-title" className="living-blueprint-title">
          {LIVING_BLUEPRINT_HERO.title}
        </h1>
        <p className="living-blueprint-lead">{LIVING_BLUEPRINT_HERO.body}</p>
        <p className="living-blueprint-boundary">{LIVING_BLUEPRINT_HERO.boundary}</p>
      </section>

      <section className="living-blueprint-main" aria-labelledby="living-blueprint-membership-title">
        <h2 id="living-blueprint-membership-title" className="living-blueprint-membership-title">
          {MEMBERSHIP_SECTION.title}
        </h2>
        <LivingBlueprintDashboard reportId={reportId} initialSnapshot={snapshot} />
      </section>
    </div>
  );
}
