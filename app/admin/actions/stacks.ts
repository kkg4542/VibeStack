"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function prepareStringArray(formData: FormData, key: string): string[] {
  const value = formData.get(key) as string;
  if (!value) return [];
  return value.split("\n").map(s => s.trim()).filter(Boolean);
}

export async function createStack(formData: FormData) {
  const name = formData.get("name") as string;
  const idField = formData.get("idField") as string; // slug equivalent
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string || null;
  const totalPrice = formData.get("totalPrice") as string || null;
  const icon = formData.get("icon") as string || null;
  const color = formData.get("color") as string || null;
  
  const tags = prepareStringArray(formData, "tags");
  const idealFor = prepareStringArray(formData, "idealFor");
  const workflow = prepareStringArray(formData, "workflow");
  
  // Tools connection by comma-separated slugs or ids
  const toolSlugsRaw = formData.get("toolSlugs") as string;
  const toolSlugs = toolSlugsRaw ? toolSlugsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

  try {
    // Basic stack creation
    const stack = await prisma.stack.create({
      data: {
        name,
        idField,
        description,
        longDescription,
        totalPrice,
        icon,
        color,
        tags,
        idealFor,
        workflow,
      },
    });

    // Handle tool relations if provided
    if (toolSlugs.length > 0) {
      const tools = await prisma.tool.findMany({
        where: { slug: { in: toolSlugs } },
        select: { id: true },
      });
      
      const stackToolsData = tools.map(t => ({
        stackId: stack.id,
        toolId: t.id,
      }));
      
      if (stackToolsData.length > 0) {
        await prisma.stackTool.createMany({
          data: stackToolsData,
        });
      }
    }

    revalidatePath("/admin/stacks");
    revalidatePath("/stacks");
  } catch (error) {
    console.error("Failed to create stack:", error);
  }

  redirect("/admin/stacks");
}

export async function updateStack(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const idField = formData.get("idField") as string;
  const description = formData.get("description") as string || null;
  const longDescription = formData.get("longDescription") as string || null;
  const totalPrice = formData.get("totalPrice") as string || null;
  const icon = formData.get("icon") as string || null;
  const color = formData.get("color") as string || null;
  
  const tags = prepareStringArray(formData, "tags");
  const idealFor = prepareStringArray(formData, "idealFor");
  const workflow = prepareStringArray(formData, "workflow");

  const toolSlugsRaw = formData.get("toolSlugs") as string;
  const toolSlugs = toolSlugsRaw ? toolSlugsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

  try {
    await prisma.stack.update({
      where: { id },
      data: {
        name,
        idField,
        description,
        longDescription,
        totalPrice,
        icon,
        color,
        tags,
        idealFor,
        workflow,
      },
    });

    if (toolSlugs.length > 0) {
      // Find tools to connect
      const tools = await prisma.tool.findMany({
        where: { slug: { in: toolSlugs } },
        select: { id: true },
      });
      
      // Delete existing relations
      await prisma.stackTool.deleteMany({
        where: { stackId: id }
      });
      
      // Create new relations
      const stackToolsData = tools.map(t => ({
        stackId: id,
        toolId: t.id,
      }));
      
      if (stackToolsData.length > 0) {
        await prisma.stackTool.createMany({
          data: stackToolsData,
        });
      }
    }

    revalidatePath("/admin/stacks");
    revalidatePath(`/stack/${idField}`);
    revalidatePath("/stacks");
  } catch (error) {
    console.error("Failed to update stack:", error);
  }

  redirect("/admin/stacks");
}

export async function deleteStack(id: string) {
  try {
    await prisma.stack.delete({
      where: { id },
    });
    
    revalidatePath("/admin/stacks");
    revalidatePath("/stacks");
  } catch (error) {
    console.error("Failed to delete stack:", error);
  }
}
