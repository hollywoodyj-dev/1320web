import type { Metadata } from "next";
import { FacilitatorSessionList } from "@/components/personal-integration/facilitator-session-list";
import "@/styles/personal-integration-ops-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Facilitator Sessions | 1320",
  description: "Personal Integration Session workspace",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function FacilitatorSessionsPage() {
  return (
    <div className="pi-ops-page" style={{ width: "min(100% - 32px, 980px)" }}>
      <header className="pi-ops-hero">
        <p className="pi-ops-eyebrow">FACILITATOR</p>
        <h1 className="pi-ops-title">Session Workspace</h1>
        <p className="pi-ops-lead">
          Manage Personal Integration Sessions. Access is verified before any client Session data
          loads.
        </p>
      </header>
      <FacilitatorSessionList />
    </div>
  );
}
