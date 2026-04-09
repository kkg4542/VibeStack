"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string || null;
  const content = formData.get("content") as string || null;
  const author = formData.get("author") as string || null;
  const category = formData.get("category") as string || null;
  const readTime = formData.get("readTime") as string || null;
  const image = formData.get("image") as string || null;
  
  // Format current date if not provided
  const dateStr = formData.get("date") as string;
  const date = dateStr ? dateStr : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        date,
        author,
        category,
        readTime,
        image,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
  } catch (error) {
    console.error("Failed to create blog post:", error);
  }

  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string || null;
  const content = formData.get("content") as string || null;
  const author = formData.get("author") as string || null;
  const category = formData.get("category") as string || null;
  const readTime = formData.get("readTime") as string || null;
  const image = formData.get("image") as string || null;
  const dateStr = formData.get("date") as string;
  const date = dateStr ? dateStr : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        date,
        author,
        category,
        readTime,
        image,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
  } catch (error) {
    console.error("Failed to update blog post:", error);
  }

  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
  } catch (error) {
    console.error("Failed to delete blog post:", error);
  }
}
