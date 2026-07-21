import type { Metadata } from "next";
import { FacilitatorSessionWorkspace } from "@/components/personal-integration/facilitator-session-workspace";
import "@/styles/personal-integration-ops-v1.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Session Workspace | 1320 Facilitator",
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

type PageProps = { params: Promise<{ sessionId: string }> };

export default async function FacilitatorSessionDetailPage({ params }: PageProps) {
  const { sessionId } = await params;
  return <FacilitatorSessionWorkspace sessionId={sessionId} />;
}
