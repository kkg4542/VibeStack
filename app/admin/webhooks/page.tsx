import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getWebhookEvents() {
  return prisma.webhookEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

/**
 * The retry route redirects back here with its outcome; nothing read it until
 * now. "unhandled" is the reason this exists: that retry threw nothing, so the
 * operator saw a plain webhook list and read it as success, when in fact no
 * case matched the event type and nothing was applied.
 *
 * `type` comes from our own redirect, not from the operator, but it is still
 * rendered as a JSX text child so it can never be interpreted as markup.
 */
function RetryBanner({ retry, type }: { retry?: string; type?: string }) {
  const label = type ?? "the event";

  if (retry === "ok") {
    return (
      <div
        role="status"
        className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
      >
        <span className="font-medium">Replayed {label}.</span> The handler ran and
        the event is recorded as processed.
      </div>
    );
  }

  if (retry === "unhandled") {
    return (
      <div
        role="status"
        className="rounded-md border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400"
      >
        <span className="font-medium">Nothing changed.</span> There is no handler
        for {label}, so the replay applied nothing. The event is recorded as
        skipped, not processed, and retrying it again will do the same.
      </div>
    );
  }

  if (retry === "failed") {
    return (
      <div
        role="alert"
        className="rounded-md border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-400"
      >
        <span className="font-medium">Retry failed.</span> The event is still
        marked failed — check the error recorded on its row before retrying.
      </div>
    );
  }

  return null;
}

export default async function AdminWebhooksPage({
  searchParams,
}: {
  searchParams: Promise<{ retry?: string; type?: string }>;
}) {
  const { retry, type } = await searchParams;
  const events = await getWebhookEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Webhooks</h1>
        <p className="text-muted-foreground">
          Monitor and retry failed webhook events.
        </p>
      </div>

      <RetryBanner retry={retry} type={type} />

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Provider</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="px-4 py-3">{event.provider}</td>
                  <td className="px-4 py-3 font-medium">{event.type}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={
                        event.status === "processed"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : event.status === "failed"
                            ? "bg-rose-500/10 text-rose-700 dark:text-rose-400"
                            : // "skipped" means no case matched the type, so nothing
                              // was applied. It is not a failure and not a success,
                              // and it gets its own colour so it reads as neither.
                              event.status === "skipped"
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              : "bg-muted text-muted-foreground"
                      }
                    >
                      {event.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(event.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {event.provider === "stripe" && event.status === "failed" ? (
                      <form action={`/admin/webhooks/stripe/${event.eventId}/retry`} method="post">
                        <Button size="sm">Retry</Button>
                      </form>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={5}>
                    No webhook events yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
