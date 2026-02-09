import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

async function getSponsorships() {
  return prisma.sponsorship.findMany({
    include: { tool: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function AdminSponsorshipsPage() {
  const sponsorships = await getSponsorships();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Sponsorships</h1>
        <p className="text-muted-foreground">
          Manage active newsletter and placement sponsorships.
        </p>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Placement</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Sponsor</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tool</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
              </tr>
            </thead>
            <tbody>
              {sponsorships.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{s.placement}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{s.sponsorName || "-"}</div>
                    <div className="text-xs text-muted-foreground">{s.sponsorEmail || "-"}</div>
                  </td>
                  <td className="px-4 py-3">
                    {s.tool ? (
                      <div className="font-medium">{s.tool.title}</div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {s.currentPeriodStart
                      ? `${new Date(s.currentPeriodStart).toLocaleDateString()} → ${new Date(s.currentPeriodEnd || s.currentPeriodStart).toLocaleDateString()}`
                      : "-"}
                  </td>
                </tr>
              ))}
              {sponsorships.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={5}>
                    No sponsorships yet.
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
