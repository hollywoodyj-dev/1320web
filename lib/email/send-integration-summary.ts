type SummaryEmailInput = {
  email: string;
  clientName: string;
  accountUrl: string;
};

/** Client notification when Integration Summary is published/sent. */
export async function sendIntegrationSummaryEmail(
  input: SummaryEmailInput,
): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";

  const subject = "Your Personal Integration Summary is ready";
  const text = [
    `Hello ${input.clientName},`,
    "",
    "Your Facilitator has published your Personal Integration Summary.",
    "",
    "You can read it in your account:",
    input.accountUrl,
    "",
    "This Summary reflects what you named in Session. Your Soul Blueprint remains a mirror — not a fixed identity.",
    "",
    "If you did not attend this Session, you can ignore this email.",
  ].join("\n");

  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[email:integration-summary]", { to: input.email, url: input.accountUrl });
  }

  if (!resendKey) return { sent: false };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [input.email], subject, text }),
  });

  if (!response.ok) {
    console.error("[email:integration-summary] Resend error", await response.text());
    return { sent: false };
  }
  return { sent: true };
}
