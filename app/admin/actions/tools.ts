"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function prepareStringArray(formData: FormData, key: string): string[] {
  const value = formData.get(key) as string;
  if (!value) return [];
  return value.split("\n").map(s => s.trim()).filter(Boolean);
}

export async function createTool(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const pricing = formData.get("pricing") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateUrl = formData.get("affiliateUrl") as string || null;
  const icon = formData.get("icon") as string || null;
  const color = formData.get("color") as string || "text-foreground";
  const bgGradient = formData.get("bgGradient") as string || "from-transparent to-transparent";
  const tier = formData.get("tier") as string || "free";
  const isFeatured = formData.get("isFeatured") === "on";
  
  const features = prepareStringArray(formData, "features");
  const pros = prepareStringArray(formData, "pros");
  const cons = prepareStringArray(formData, "cons");

  try {
    await prisma.tool.create({
      data: {
        title,
        slug,
        description,
        category,
        pricing,
        websiteUrl,
        affiliateUrl,
        icon,
        color,
        bgGradient,
        tier,
        isFeatured,
        features,
        pros,
        cons,
      },
    });

    revalidatePath("/admin/tools");
    revalidatePath("/tools");
  } catch (error) {
    console.error("Failed to create tool:", error);
    return { error: "Failed to create tool" };
  }

  redirect("/admin/tools");
}

export async function updateTool(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const pricing = formData.get("pricing") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const affiliateUrl = formData.get("affiliateUrl") as string || null;
  const icon = formData.get("icon") as string || null;
  const color = formData.get("color") as string || "text-foreground";
  const bgGradient = formData.get("bgGradient") as string || "from-transparent to-transparent";
  const tier = formData.get("tier") as string || "free";
  const isFeatured = formData.get("isFeatured") === "on";
  
  const features = prepareStringArray(formData, "features");
  const pros = prepareStringArray(formData, "pros");
  const cons = prepareStringArray(formData, "cons");

  try {
    await prisma.tool.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        category,
        pricing,
        websiteUrl,
        affiliateUrl,
        icon,
        color,
        bgGradient,
        tier,
        isFeatured,
        features,
        pros,
        cons,
      },
    });

    revalidatePath("/admin/tools");
    revalidatePath(`/tool/${slug}`);
    revalidatePath("/tools");
  } catch (error) {
    console.error("Failed to update tool:", error);
    return { error: "Failed to update tool" };
  }

  redirect("/admin/tools");
}

export async function deleteTool(id: string) {
  try {
    await prisma.tool.delete({
      where: { id },
    });
    
    revalidatePath("/admin/tools");
    revalidatePath("/tools");
  } catch (error) {
    console.error("Failed to delete tool:", error);
    return { error: "Failed to delete tool" };
  }
}
