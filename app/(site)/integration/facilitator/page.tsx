import type { Metadata } from "next";
import { PersonalIntegrationFacilitatorConsole } from "@/components/personal-integration-facilitator-console";
import { FACILITATOR_COPY, FACILITATOR_META } from "@/lib/personal-integration/facilitator-content";
import "@/styles/facilitator-console-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: FACILITATOR_META.title,
  description: FACILITATOR_META.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default function PersonalIntegrationFacilitatorPage() {
  return (
    <div className="facilitator-page facilitator-page--internal">
      <header className="facilitator-hero">
        <p className="facilitator-eyebrow">{FACILITATOR_COPY.eyebrow}</p>
        <h1 className="facilitator-title">{FACILITATOR_COPY.title}</h1>
        <p className="facilitator-lead">{FACILITATOR_COPY.body}</p>
        <p className="facilitator-support">{FACILITATOR_COPY.support}</p>
      </header>
      <PersonalIntegrationFacilitatorConsole />
    </div>
  );
}
