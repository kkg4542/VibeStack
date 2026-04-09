import { ToolForm } from "@/components/admin/ToolForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewToolPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/tools">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Tool</h1>
          <p className="text-muted-foreground">
            Create a new AI tool listing for the directory.
          </p>
        </div>
      </div>
      
      <ToolForm />
    </div>
  );
}
