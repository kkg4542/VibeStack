"use client";

import { createStack, updateStack } from "@/app/admin/actions/stacks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

type StackLike = {
  id?: string;
  idField?: string;
  name?: string;
  description?: string | null;
  longDescription?: string | null;
  totalPrice?: string | null;
  tags?: string[];
  idealFor?: string[];
  workflow?: string[];
  icon?: string | null;
  color?: string | null;
  toolSlugs?: string[]; // Synthesized from relation for easier form editing
};

export function StackForm({ stack }: { stack?: StackLike }) {
  const isEditing = !!stack?.id;
  const action = isEditing ? updateStack.bind(null, stack.id!) : createStack;
  
  return (
    <Card className="max-w-4xl mx-auto">
      <form action={action}>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Stack" : "Add New Stack"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={stack?.name} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idField">Slug (ID Field)</Label>
              <Input id="idField" name="idField" defaultValue={stack?.idField} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalPrice">Total Price</Label>
              <Input id="totalPrice" name="totalPrice" defaultValue={stack?.totalPrice || ""} placeholder="$40/mo" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon URL (Optional)</Label>
              <Input id="icon" name="icon" defaultValue={stack?.icon || ""} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" defaultValue={stack?.description || ""} rows={2} required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea id="longDescription" name="longDescription" defaultValue={stack?.longDescription || ""} rows={4} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="toolSlugs">Connected Tool Slugs (Comma separated)</Label>
              <Input id="toolSlugs" name="toolSlugs" defaultValue={stack?.toolSlugs?.join(", ")} placeholder="chatgpt, cursor, v0" />
              <p className="text-xs text-muted-foreground">Used to build the relations between this Stack and the Tools.</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags (One per line)</Label>
              <Textarea id="tags" name="tags" defaultValue={stack?.tags?.join("\n")} rows={3} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="idealFor">Ideal For (One per line)</Label>
              <Textarea id="idealFor" name="idealFor" defaultValue={stack?.idealFor?.join("\n")} rows={3} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="workflow">Workflow Steps (One per line)</Label>
              <Textarea id="workflow" name="workflow" defaultValue={stack?.workflow?.join("\n")} rows={4} />
            </div>
            
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
          <Button variant="outline" asChild>
            <Link href="/admin/stacks">Cancel</Link>
          </Button>
          <Button type="submit">
            {isEditing ? "Save Changes" : "Create Stack"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
