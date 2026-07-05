type PrepLinkEmailInput = {
  email: string;
  clientName: string;
  prepUrl: string;
  sessionVariantLabel: string;
};

/** Sends Personal Integration prep link when Resend is configured; logs in dev. */
export async function sendPrepLinkEmail(input: PrepLinkEmailInput): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";

  const subject = "Prepare for your Personal Integration Session";
  const text = [
    `Hello ${input.clientName},`,
    "",
    "Thank you for requesting a Personal Integration Session with 1320.",
    "",
    `Session type: ${input.sessionVariantLabel}`,
    "",
    "Before we meet, please take a few minutes to prepare — confirm your growth edge and optional notes:",
    input.prepUrl,
    "",
    "Your Soul Blueprint is read-only on the prep page. This step names what you want to integrate in the live session.",
    "",
    "We will follow up separately to confirm date and time.",
    "",
    "If you did not request this, you can ignore this email.",
  ].join("\n");

  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[email:prep-link]", { to: input.email, url: input.prepUrl });
  }

  if (!resendKey) {
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [input.email], subject, text }),
  });

  if (!response.ok) {
    console.error("[email:prep-link] Resend error", await response.text());
    return { sent: false };
  }

  return { sent: true };
}
