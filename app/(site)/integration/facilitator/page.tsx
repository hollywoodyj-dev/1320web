import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy console entry → Session Workspace list. */
export default function LegacyFacilitatorRedirect() {
  redirect("/facilitator/sessions");
}
