import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getWebhookEvents() {
  return prisma.webhookEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function AdminWebhooksPage() {
  const events = await getWebhookEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Webhooks</h1>
        <p className="text-muted-foreground">
          Monitor and retry failed webhook events.
        </p>
      </div>

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
                          ? "bg-emerald-500/10 text-emerald-600"
                          : event.status === "failed"
                            ? "bg-rose-500/10 text-rose-600"
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
