type SlackPayload = {
  text: string;
};

const SLACK_ENDPOINT = process.env.SLACK_WEBHOOK_URL;

export async function sendSlackAlert(message: string) {
  if (!SLACK_ENDPOINT) return;

  const response = await fetch(SLACK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message } satisfies SlackPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Slack webhook error: ${error}`);
  }
}
