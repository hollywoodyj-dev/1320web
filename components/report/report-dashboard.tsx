"use client";

import { useEffect } from "react";
import type { ReportViewModel } from "@/lib/report/build-report-view-model";
import { REPORT_NAV, type ReportSectionId } from "@/lib/report/report-nav";
import { BlueprintOverviewRow } from "@/components/report/blueprint-overview-row";
import { IntegratedSummaryCard } from "@/components/report/integrated-summary-card";
import { IntegrationPracticeGrid } from "@/components/report/integration-practice-grid";
import { ReflectionJournal } from "@/components/report/reflection-journal";
import { ReportFinalCta } from "@/components/report/report-final-cta";
import { ReportHeader } from "@/components/report/report-header";
import { ReportModuleCard } from "@/components/report/report-module-card";
import { ReportSidebar, useReportScrollSpy } from "@/components/report/report-sidebar";
import { ResultExtras } from "@/components/report/result-extras";
import { trackEvent } from "@/lib/analytics";

type ReportDashboardProps = {
  viewModel: ReportViewModel;
  analyticsEvent?: "sample_report_view" | "result_view";
};

export function ReportDashboard({ viewModel, analyticsEvent }: ReportDashboardProps) {
  const navItems =
    viewModel.mode === "full"
      ? REPORT_NAV
      : REPORT_NAV.filter((item) => item.id !== "integration");
  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useReportScrollSpy(sectionIds);

  useEffect(() => {
    if (analyticsEvent) trackEvent(analyticsEvent);
  }, [analyticsEvent]);

  return (
    <div className="report-dashboard">
      <ReportSidebar
        navItems={navItems}
        activeSection={activeSection}
        onNavigate={(id: ReportSectionId) => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <div className="report-dashboard-main">
        <ReportHeader
          title={viewModel.headerTitle}
          subtitle={viewModel.headerSubtitle}
          codeString={viewModel.codeString}
          fictionBanner={viewModel.fictionBanner}
        />

        <p className="report-boundary-note">{viewModel.boundaryNote}</p>

        <BlueprintOverviewRow cards={viewModel.overviewCards} />

        <IntegratedSummaryCard
          title={viewModel.integratedTitle}
          lead={viewModel.integratedLead}
          body={viewModel.integratedSummary}
        />

        <section className="report-modules-section">
          <h2 className="report-section-title">Your Segment Blueprint</h2>
          <div className="report-modules-grid">
            {viewModel.modules.map((module) => (
              <ReportModuleCard
                key={`${module.segmentId}-${module.codeLabel}`}
                module={module}
              />
            ))}
          </div>
        </section>

        {viewModel.mode === "full" ? (
          <>
            <IntegrationPracticeGrid practices={viewModel.practices} />
            <ReflectionJournal prompts={viewModel.journalPrompts} />
          </>
        ) : (
          <section className="glass-card report-free-reflection" id="reflection">
            <h2 className="report-section-title">Reflection Question</h2>
            <p>{viewModel.reflectionQuestion}</p>
          </section>
        )}

        <ReportFinalCta
          title={viewModel.finalCta.title}
          body={viewModel.finalCta.body}
          book={viewModel.finalCta.book}
          waitlist={viewModel.finalCta.waitlist}
          profile={viewModel.finalCta.profile}
          profileNote={viewModel.finalCta.profileNote}
        />

        {viewModel.mode === "free" ? <ResultExtras codeString={viewModel.codeString} /> : null}
      </div>
    </div>
  );
}
