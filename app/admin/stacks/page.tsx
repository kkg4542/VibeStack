import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";

async function getStacks() {
  return await prisma.stack.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      stackTools: {
        include: {
          tool: true,
        },
      },
    },
  });
}

export default async function AdminStacksPage() {
  const stacks = await getStacks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stacks</h1>
          <p className="text-muted-foreground">
            Manage tool stack recommendations.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/stacks/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Stack
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tools</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stacks.map((stack) => (
                <tr key={stack.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{stack.name}</td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {stack.description}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{stack.stackTools.length}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{stack.totalPrice}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/stacks/${stack.idField}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
