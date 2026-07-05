import type { Metadata } from "next";
import { PersonalIntegrationFacilitatorConsole } from "@/components/personal-integration-facilitator-console";
import { FACILITATOR_COPY, FACILITATOR_META } from "@/lib/personal-integration/facilitator-content";

export const metadata: Metadata = {
  title: FACILITATOR_META.title,
  description: FACILITATOR_META.description,
  robots: { index: false, follow: false },
};

export default function PersonalIntegrationFacilitatorPage() {
  return (
    <div className="conversion-page space-y-5">
      <section className="conversion-hero">
        <p className="conversion-eyebrow">{FACILITATOR_COPY.eyebrow}</p>
        <h1 className="conversion-title">{FACILITATOR_COPY.title}</h1>
        <p className="conversion-lead">{FACILITATOR_COPY.body}</p>
      </section>
      <PersonalIntegrationFacilitatorConsole />
    </div>
  );
}
