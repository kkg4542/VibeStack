import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getSubmissions() {
  return prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();
  const tools = await prisma.tool.findMany({
    where: { websiteUrl: { in: submissions.map((s) => s.websiteUrl) } },
    select: { id: true, slug: true, title: true, websiteUrl: true },
  });

  const toolByWebsite = new Map(tools.map((t) => [t.websiteUrl, t]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Submissions</h1>
        <p className="text-muted-foreground">
          Review paid submissions and approve or reject listings.
        </p>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Tool</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tier</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const tool = toolByWebsite.get(submission.websiteUrl);
                return (
                  <tr key={submission.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="font-medium">{submission.toolName}</div>
                      <div className="text-xs text-muted-foreground">
                        {submission.websiteUrl}
                      </div>
                      {tool && (
                        <Link
                          href={`/tool/${tool.slug}`}
                          className="text-xs text-indigo-400 hover:underline"
                        >
                          View live tool
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{submission.tier}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={
                          submission.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : submission.status === "rejected"
                              ? "bg-rose-500/10 text-rose-600"
                              : submission.status === "paid"
                                ? "bg-amber-500/10 text-amber-600"
                                : submission.status === "refunded"
                                  ? "bg-slate-500/10 text-slate-600"
                                : "bg-muted text-muted-foreground"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {submission.amount ? `$${(submission.amount / 100).toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <form
                          action={`/admin/submissions/${submission.id}/approve`}
                          method="post"
                        >
                          <Button
                            size="sm"
                            disabled={submission.status === "approved"}
                          >
                            Approve
                          </Button>
                        </form>
                        <form
                          action={`/admin/submissions/${submission.id}/reject`}
                          method="post"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={submission.status === "rejected"}
                          >
                            Reject
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {submissions.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                    No submissions yet.
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
