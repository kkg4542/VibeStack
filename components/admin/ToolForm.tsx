"use client";

import { useActionState } from "react";
import { createTool, updateTool } from "@/app/admin/actions/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

type ToolLike = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: string;
  pricing?: string;
  websiteUrl?: string;
  affiliateUrl?: string | null;
  icon?: string | null;
  color?: string;
  bgGradient?: string;
  tier?: string;
  isFeatured?: boolean;
  features?: string[];
  pros?: string[];
  cons?: string[];
};

export function ToolForm({ tool }: { tool?: ToolLike }) {
  const isEditing = !!tool?.id;
  const action = isEditing ? updateTool.bind(null, tool.id!) : createTool;
  
  // To use useActionState with our simple action signatures, we wrap it
  // Actually, since we're not returning formal FormStates from the actions (just a redirect or error),
  // we can use standard form actions with an intermediate wrapper to catch errors.
  
  return (
    <Card className="max-w-4xl mx-auto">
      <form action={action}>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Tool" : "Add New Tool"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={tool?.title} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={tool?.slug} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={tool?.category} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pricing">Pricing (e.g., Free, Freemium, Paid)</Label>
              <Input id="pricing" name="pricing" defaultValue={tool?.pricing} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={tool?.websiteUrl} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Affiliate URL (Optional)</Label>
              <Input id="affiliateUrl" name="affiliateUrl" type="url" defaultValue={tool?.affiliateUrl || ""} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={tool?.description} required rows={3} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon URL (Optional)</Label>
              <Input id="icon" name="icon" defaultValue={tool?.icon || ""} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tier">Tier (e.g., free, pro, enterprise)</Label>
              <Input id="tier" name="tier" defaultValue={tool?.tier || "free"} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Tailwind Text Color (e.g., text-blue-500)</Label>
              <Input id="color" name="color" defaultValue={tool?.color || "text-foreground"} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bgGradient">Tailwind BG Gradient</Label>
              <Input id="bgGradient" name="bgGradient" defaultValue={tool?.bgGradient || "from-transparent to-transparent"} required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="features">Features (One per line)</Label>
              <Textarea id="features" name="features" defaultValue={tool?.features?.join("\n")} rows={4} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pros">Pros (One per line)</Label>
              <Textarea id="pros" name="pros" defaultValue={tool?.pros?.join("\n")} rows={3} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cons">Cons (One per line)</Label>
              <Textarea id="cons" name="cons" defaultValue={tool?.cons?.join("\n")} rows={3} />
            </div>
            
            <div className="flex items-center space-x-2 md:col-span-2 pt-2">
              <input 
                type="checkbox" 
                id="isFeatured" 
                name="isFeatured" 
                defaultChecked={tool?.isFeatured} 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">Featured Tool</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
          <Button variant="outline" asChild>
            <Link href="/admin/tools">Cancel</Link>
          </Button>
          <Button type="submit">
            {isEditing ? "Save Changes" : "Create Tool"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
