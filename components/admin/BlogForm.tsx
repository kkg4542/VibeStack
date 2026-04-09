"use client";

import { createBlogPost, updateBlogPost } from "@/app/admin/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

type BlogPostLike = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  author?: string | null;
  category?: string | null;
  readTime?: string | null;
  image?: string | null;
};

export function BlogForm({ post }: { post?: BlogPostLike }) {
  const isEditing = !!post?.id;
  const action = isEditing ? updateBlogPost.bind(null, post.id!) : createBlogPost;
  
  return (
    <Card className="max-w-4xl mx-auto">
      <form action={action}>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Blog Post" : "Add New Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={post?.title} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={post?.slug} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date (e.g., Apr 12, 2026)</Label>
              <Input id="date" name="date" defaultValue={post?.date || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" defaultValue={post?.author || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={post?.category || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time (e.g., 5 min read)</Label>
              <Input id="readTime" name="readTime" defaultValue={post?.readTime || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Cover Image URL (Optional)</Label>
              <Input id="image" name="image" defaultValue={post?.image || ""} />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt || ""} rows={2} required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Content (MDX or HTML)</Label>
              <Textarea id="content" name="content" defaultValue={post?.content || ""} rows={12} className="font-mono" required />
            </div>
            
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
          <Button variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button type="submit">
            {isEditing ? "Save Changes" : "Publish Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
