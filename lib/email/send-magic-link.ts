type MagicLinkEmailInput = {
  email: string;
  magicLinkUrl: string;
  reportId?: string;
};

/** Sends magic-link email when provider is configured; always logs in dev. */
export async function sendMagicLinkEmail(input: MagicLinkEmailInput): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";

  const subject = "Your 1320 Full Report access link";
  const text = [
    "Your Full Soul Origin Report is ready.",
    "",
    "Open this secure link, then tap Continue to sign in:",
    input.magicLinkUrl,
    "",
    "This link expires in 24 hours and can be used once. If it stops working, request a new link from checkout.",
    "",
    "If you did not request this, you can ignore this email.",
  ].join("\n");

  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[email:magic-link]", { to: input.email, url: input.magicLinkUrl, reportId: input.reportId });
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
    body: JSON.stringify({
      from,
      to: [input.email],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    console.error("[email:magic-link] Resend error", await response.text());
    return { sent: false };
  }

  return { sent: true };
}
