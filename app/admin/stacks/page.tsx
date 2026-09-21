import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Info, Layers } from "lucide-react";
import { stacks } from "@/lib/stacks";

/**
 * Read-only on purpose.
 *
 * Stacks are code-managed: /stack/[stackId], the sitemap, /search, /favorites,
 * /compare and the homepage all read `lib/stacks.ts`. The create/edit/delete
 * screens that used to live here wrote to the `Stack` table instead, which no
 * public page reads for content — saving appeared to work, revalidatePath ran,
 * and the site never changed. They also left behind `Stack` rows with no
 * counterpart in `lib/stacks.ts` (efficiency, indie-builder-stack,
 * product-team-stack, research-writing-stack), which is why the featured-stack
 * resolver now drops unknown ids.
 *
 * The rows themselves are kept: view counts, saves, ratings and testimonials
 * all hang off them, and this page is where those numbers are read.
 */

type StackMetricsRow = {
  idField: string;
  stackMetrics: {
    views: number;
    saves: number;
    avgRating: number;
    reviewCount: number;
  } | null;
};

async function getStackMetricRows(): Promise<StackMetricsRow[]> {
  try {
    return await prisma.stack.findMany({
      orderBy: { idField: "asc" },
      select: {
        idField: true,
        stackMetrics: {
          select: {
            views: true,
            saves: true,
            avgRating: true,
            reviewCount: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to load stack metrics:", error);
    return [];
  }
}

export default async function AdminStacksPage() {
  const rows = await getStackMetricRows();
  const metricsById = new Map(rows.map((row) => [row.idField, row.stackMetrics]));

  const curatedIds = new Set(stacks.map((stack) => stack.id));
  // Rows the curated file does not define. They render nowhere on the site;
  // listed here so the numbers they still hold are not mistaken for a live
  // stack's numbers.
  const orphanRows = rows.filter((row) => !curatedIds.has(row.idField));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Stacks</h1>
        <p className="text-muted-foreground">
          Engagement for the curated stacks. Read-only.
        </p>
      </div>

      <div className="flex gap-3 rounded-md border border-border bg-muted/40 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="space-y-1">
          <p className="font-medium">Stack definitions live in <code>lib/stacks.ts</code>.</p>
          <p className="text-muted-foreground">
            Names, descriptions, prices, tools and workflows are code, not database
            rows — they ship with a deploy and cannot be edited here. The numbers
            below come from the database and update on their own.
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tools</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Views</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Saves</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {stacks.map((stack) => {
                const metrics = metricsById.get(stack.id) ?? null;
                return (
                  <tr key={stack.id} className="border-b">
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/stack/${stack.id}`} className="hover:underline">
                        {stack.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {stack.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{stack.tools.length}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{stack.totalPrice}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {metrics ? metrics.views.toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {metrics ? metrics.saves.toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {metrics && metrics.reviewCount > 0
                        ? `${metrics.avgRating.toFixed(1)} (${metrics.reviewCount})`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {orphanRows.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Unused database rows</h2>
          <p className="text-sm text-muted-foreground">
            These <code>Stack</code> rows have no entry in <code>lib/stacks.ts</code>,
            so they are not published anywhere. They are kept because metrics and
            testimonials reference them.
          </p>
          <ul className="flex flex-wrap gap-2">
            {orphanRows.map((row) => (
              <li key={row.idField}>
                <Badge variant="secondary" className="font-mono text-xs">
                  {row.idField}
                  {row.stackMetrics ? ` · ${row.stackMetrics.views.toLocaleString()} views` : ""}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
