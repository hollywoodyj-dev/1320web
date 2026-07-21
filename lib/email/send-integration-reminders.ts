type ReminderEmailInput = {
  email: string;
  clientName: string;
  intakeUrl: string;
  sessionLabel?: string;
};

export async function sendIntakeReminderEmail(input: ReminderEmailInput): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";
  const subject = "Complete your Pre-Session Intake";
  const text = [
    `Hello ${input.clientName},`,
    "",
    "Your Personal Integration Session is coming up.",
    input.sessionLabel ? `Session: ${input.sessionLabel}` : "",
    "",
    "When you are ready, please complete your Pre-Session Intake:",
    input.intakeUrl,
    "",
    "This helps your Facilitator prepare with your Soul Blueprint. There is no rush — complete it when you can.",
    "",
    "If you already submitted your intake, you can ignore this email.",
  ]
    .filter(Boolean)
    .join("\n");

  if (!resendKey) {
    console.info("[email:intake-reminder]", { to: input.email });
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
    console.error("[email:intake-reminder] Resend error", await response.text());
    return { sent: false };
  }
  return { sent: true };
}

export async function sendSessionReminderEmail(input: {
  email: string;
  clientName: string;
  whenLabel: string;
  intakeUrl?: string | null;
  prepUrl?: string | null;
}): Promise<{ sent: boolean }> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || "1320 Soul Code <noreply@1320soulcode.com>";
  const subject = `Reminder: Personal Integration Session ${input.whenLabel}`;
  const text = [
    `Hello ${input.clientName},`,
    "",
    `This is a gentle reminder that your Personal Integration Session is ${input.whenLabel}.`,
    "",
    input.intakeUrl ? `Intake: ${input.intakeUrl}` : "",
    input.prepUrl ? `Prep space: ${input.prepUrl}` : "",
    "",
    "Come as you are. Your Blueprint is a mirror — not a fixed identity.",
  ]
    .filter(Boolean)
    .join("\n");

  if (!resendKey) {
    console.info("[email:session-reminder]", { to: input.email, when: input.whenLabel });
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
    console.error("[email:session-reminder] Resend error", await response.text());
    return { sent: false };
  }
  return { sent: true };
}
