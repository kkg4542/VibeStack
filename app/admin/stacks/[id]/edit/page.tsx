import { StackForm } from "@/components/admin/StackForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditStackPage({ params }: { params: { id: string } }) {
  // Try finding by id or idField since the route uses [id] but link passes idField
  const stack = await prisma.stack.findFirst({
    where: {
      OR: [
        { id: params.id },
        { idField: params.id }
      ]
    },
    include: {
      stackTools: {
        include: {
          tool: true
        }
      }
    }
  });

  if (!stack) {
    notFound();
  }

  // Synthesize tools into comma-separated slugs for the form
  const synthesizedStack = {
    ...stack,
    toolSlugs: stack.stackTools.map(st => st.tool.slug)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/stacks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Stack</h1>
          <p className="text-muted-foreground">
            Update information for {stack.name}.
          </p>
        </div>
      </div>
      
      <StackForm stack={synthesizedStack} />
    </div>
  );
}
