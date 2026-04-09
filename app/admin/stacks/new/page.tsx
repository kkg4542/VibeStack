import { StackForm } from "@/components/admin/StackForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewStackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/stacks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Stack</h1>
          <p className="text-muted-foreground">
            Create a new tool stack recommendation.
          </p>
        </div>
      </div>
      
      <StackForm />
    </div>
  );
}
