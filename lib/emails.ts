type EmailPayload = {
  to: string;
  subject: string;
  text: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY or RESEND_FROM is not set");
  }

  return { apiKey, from };
}

async function sendEmail(payload: EmailPayload) {
  const { apiKey, from } = getEmailConfig();

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${error}`);
  }
}

export async function sendSubmissionApprovedEmail(params: {
  to: string;
  toolName: string;
  tier: string;
  websiteUrl: string;
}) {
  const { to, toolName, tier, websiteUrl } = params;
  const text = [
    `Your submission has been approved!`,
    ``,
    `Tool: ${toolName}`,
    `Tier: ${tier}`,
    `Website: ${websiteUrl}`,
    ``,
    `Your listing is now live on VibeStack.`,
  ].join("\n");

  await sendEmail({
    to,
    subject: "Your VibeStack submission is approved",
    text,
  });
}

export async function sendSubmissionFailedEmail(params: {
  to: string;
  toolName: string;
  reason: string;
}) {
  const { to, toolName, reason } = params;
  const text = [
    `We couldn't complete your submission payment.`,
    ``,
    `Tool: ${toolName}`,
    `Reason: ${reason}`,
    ``,
    `If you need help, reply to this email.`,
  ].join("\n");

  await sendEmail({
    to,
    subject: "Payment failed for your VibeStack submission",
    text,
  });
}
