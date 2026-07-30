"use client";

import { useEffect } from "react";
import { saveBirthCookie } from "@/lib/birth-cookie";
import type { ReportViewModel } from "@/lib/report/build-report-view-model";
import { REPORT_NAV, type ReportSectionId } from "@/lib/report/report-nav";
import { FREE_RESULT_MODULE, FREE_RESULT_NAV } from "@/lib/result-content";
import { BlueprintOverviewRow } from "@/components/report/blueprint-overview-row";
import { IntegratedSummaryCard } from "@/components/report/integrated-summary-card";
import { IntegrationPracticeGrid } from "@/components/report/integration-practice-grid";
import { ReflectionJournal } from "@/components/report/reflection-journal";
import { ReportFinalCta } from "@/components/report/report-final-cta";
import { ReportFullUpsell } from "@/components/report/report-full-upsell";
import { ReportHeader } from "@/components/report/report-header";
import { ReportModuleCard } from "@/components/report/report-module-card";
import { ReportSidebar, useReportScrollSpy } from "@/components/report/report-sidebar";
import { ReportDebugPanel } from "@/components/report/report-debug-panel";
import { ResultExtras } from "@/components/report/result-extras";
import { FreeResultConversionBlock } from "@/components/funnel/free-result-conversion";
import { trackEvent } from "@/lib/analytics";
import { attributionToAnalyticsProps } from "@/lib/funnel/attribution";

type ReportDashboardProps = {
  viewModel: ReportViewModel;
  analyticsEvent?: "sample_report_view" | "result_view";
  fullReportPriceDisplay?: string;
};

export function ReportDashboard({
  viewModel,
  analyticsEvent,
  fullReportPriceDisplay = "USD 49",
}: ReportDashboardProps) {
  const isFreeRefined = viewModel.mode === "free";
  const navItems = isFreeRefined
    ? FREE_RESULT_NAV
    : viewModel.mode === "full"
      ? REPORT_NAV
      : REPORT_NAV.filter((item) => item.id !== "integration");
  const sectionIds = navItems.map((item) => item.id) as ReportSectionId[];
  const activeSection = useReportScrollSpy(sectionIds);

  useEffect(() => {
    if (analyticsEvent) trackEvent(analyticsEvent);
    if (viewModel.mode === "free") {
      trackEvent("free_blueprint_result_viewed", attributionToAnalyticsProps());
      trackEvent("free_blueprint_completed", attributionToAnalyticsProps());
    }
  }, [analyticsEvent, viewModel.mode]);

  useEffect(() => {
    if (!viewModel.birthDateLabel) return;
    const match = viewModel.birthDateLabel.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    saveBirthCookie(year, month, day);
    void fetch("/api/birth-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, month, day }),
      credentials: "same-origin",
    }).catch(() => {
      // Query params on checkout links still preserve birth context.
    });
  }, [viewModel.birthDateLabel]);

  return (
    <div className={`report-dashboard${isFreeRefined ? " report-dashboard--refined" : ""}`}>
      <ReportSidebar
        navItems={navItems}
        activeSection={activeSection}
        onNavigate={(id) => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        refined={isFreeRefined}
      />

      {isFreeRefined ? (
        <nav className="report-mobile-chips" aria-label="Result sections">
          {FREE_RESULT_NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "is-active" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="report-dashboard-main">
        <ReportHeader
          title={viewModel.headerTitle}
          subtitle={viewModel.headerSubtitle}
          codeString={viewModel.codeString}
          fictionBanner={viewModel.fictionBanner}
          refined={isFreeRefined}
          mirrorLine={viewModel.boundaryNote}
          checkoutHref={viewModel.checkoutHref}
        />

        {!isFreeRefined ? <p className="report-boundary-note">{viewModel.boundaryNote}</p> : null}

        <BlueprintOverviewRow cards={viewModel.overviewCards} refined={isFreeRefined} />

        {isFreeRefined ? (
          <section className="report-modules-section" id="segments">
            <h2 className="report-section-title">{FREE_RESULT_MODULE.sectionTitle}</h2>
            <div className="report-modules-grid">
              {viewModel.modules.map((module) => (
                <ReportModuleCard
                  key={`${module.segmentId}-${module.codeLabel}`}
                  module={module}
                  checkoutHref={viewModel.checkoutHref}
                  preview
                />
              ))}
            </div>
          </section>
        ) : null}

        <IntegratedSummaryCard
          title={viewModel.integratedTitle}
          lead={viewModel.integratedLead}
          body={viewModel.integratedSummary}
          sections={viewModel.integratedSections}
          integrationTheme={viewModel.integrationTheme}
          error={viewModel.synthesisError}
          refined={isFreeRefined}
        />

        {!isFreeRefined ? (
          <section className="report-modules-section" id="segments">
            <h2 className="report-section-title">Your Segment Blueprint</h2>
            <div className="report-modules-grid">
              {viewModel.modules.map((module) => (
                <ReportModuleCard
                  key={`${module.segmentId}-${module.codeLabel}`}
                  module={module}
                  checkoutHref={viewModel.checkoutHref}
                  preview={false}
                />
              ))}
            </div>
          </section>
        ) : null}

        {viewModel.mode === "full" ? (
          <>
            <IntegrationPracticeGrid practices={viewModel.practices} />
            <ReflectionJournal prompts={viewModel.journalPrompts} />
          </>
        ) : (
          <section className="report-free-reflection" id="reflection">
            <h2 className="report-section-title">Reflection Question</h2>
            <p>{viewModel.reflectionQuestion}</p>
          </section>
        )}

        {viewModel.showFullUpsell ? (
          isFreeRefined ? (
            <FreeResultConversionBlock
              checkoutHref={viewModel.checkoutHref}
              priceDisplay={fullReportPriceDisplay}
            />
          ) : (
            <ReportFullUpsell checkoutHref={viewModel.checkoutHref} refined={false} />
          )
        ) : null}

        {!isFreeRefined ? (
          <ReportFinalCta
            title={viewModel.finalCta.title}
            body={viewModel.finalCta.body}
            unlock={viewModel.finalCta.unlock}
            unlockHref={viewModel.checkoutHref}
            book={viewModel.finalCta.book}
            bookHref={viewModel.finalCta.bookHref}
            profile={viewModel.finalCta.profile}
            profileNote={viewModel.finalCta.profileNote}
          />
        ) : null}

        {viewModel.mode === "free" ? (
          <ResultExtras codeString={viewModel.codeString} refined={isFreeRefined} />
        ) : null}

        {viewModel.debug ? <ReportDebugPanel debug={viewModel.debug} /> : null}
      </div>
    </div>
  );
}
