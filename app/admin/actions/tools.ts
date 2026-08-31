"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

function prepareStringArray(formData: FormData, key: string): string[] {
  const value = formData.get(key) as string;
  if (!value) return [];
  return value.split("\n").map(s => s.trim()).filter(Boolean);
}

/**
 * Every render surface that shows tool data (title, pricing, affiliateUrl,
 * etc.) after a create/update/delete in the admin panel.
 *
 * Fixed paths are pages that read `getTools()`/`getToolBySlug()`
 * (lib/tools-db.ts) directly and server-render tool data into static HTML —
 * they're invalidated by literal path.
 *
 * Dynamic-segment routes are invalidated with the `"/[param]"` template form
 * + `"page"` type, which Next.js's revalidatePath clears for *every*
 * prerendered instance of that route in one call — not just one slug/category.
 * That's necessary here, not just convenient: a single tool's data surfaces
 * on pages keyed by a *different* param, e.g. `/tool/[slug]` renders "related
 * tools" pulled from the full table, `/best/[category]` and
 * `/categories/[category]` each list every tool in that category, and
 * `/compare/[slug]` renders whichever two tools the slug names — so the only
 * dynamic segment whose set of affected instances is reliably knowable ahead
 * of time is "all of them".
 *
 * `revalidateTag("tools", ...)` additionally clears the separate
 * `unstable_cache` in app/api/tools/route.ts (tag: `"tools"`), which
 * /tools, /search, /compare, and other client components read via
 * hooks/use-tools.ts — a different cache from the one above, since those
 * pages fetch client-side instead of calling getTools() in a server component.
 */
function revalidateToolSurfaces() {
  // Fixed paths: server components that call getTools()/getToolBySlug() directly.
  revalidatePath("/");
  revalidatePath("/tools");
  revalidatePath("/compare");
  revalidatePath("/admin/tools");

  // Dynamic-segment templates: "page" type invalidates every prerendered instance.
  revalidatePath("/tool/[slug]", "page");
  revalidatePath("/best/[category]", "page");
  revalidatePath("/categories/[category]", "page");
  revalidatePath("/compare/[slug]", "page");
  revalidatePath("/stack/[stackId]", "page");
  revalidatePath("/blog/[slug]", "page");

  // Client-fetched surfaces backed by the /api/tools unstable_cache.
  // "max" is the explicit profile Next.js recommends in place of the
  // deprecated single-argument call — see the revalidateTag warning in
  // next/dist/server/web/spec-extension/revalidate.js.
  revalidateTag("tools", "max");
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

    revalidateToolSurfaces();
  } catch (error) {
    console.error("Failed to create tool:", error);
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

    revalidateToolSurfaces();
  } catch (error) {
    console.error("Failed to update tool:", error);
  }

  redirect("/admin/tools");
}

export async function deleteTool(id: string) {
  try {
    await prisma.tool.delete({
      where: { id },
    });
    
    revalidateToolSurfaces();
  } catch (error) {
    console.error("Failed to delete tool:", error);
  }
}
