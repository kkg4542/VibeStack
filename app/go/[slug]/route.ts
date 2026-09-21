import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { isRetiredTool } from "@/lib/tools-db";
import { checkRateLimit, rateLimitConfigs } from "@/lib/redis";

// This route computes a per-request redirect target and writes an analytics
// row, so it can never be statically optimized or cached.
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

const VALID_AB_VARIANTS = ["A", "B", "C"] as const;
type AbVariant = (typeof VALID_AB_VARIANTS)[number];

function parseAbVariant(value: string | null): AbVariant | null {
  return (VALID_AB_VARIANTS as readonly string[]).includes(value ?? "")
    ? (value as AbVariant)
    : null;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;

  // Retired tools are filtered at *read* time rather than deleted from the
  // database (see RETIRED_TOOL_SLUGS in lib/tools-db.ts), so the row — and its
  // affiliateUrl — is still here and every read path has to exclude it itself.
  // This one matters most: the vendor is gone or absorbed, so sending a reader
  // out to it with our affiliate tag attached is both useless to them and a
  // claim we no longer stand behind.
  //
  // Answer with an internal redirect rather than a 404 because this endpoint's
  // whole job is to send a browser somewhere: every retired slug has a
  // /tool/<slug> -> live-alternative 301 in next.config.ts (supermaven ->
  // cursor, windsurf-ide -> devin-ai, openai-sora and galileo-ai ->
  // /best/design), so the reader lands on the tool that replaced it. It stays a
  // temporary 307, like the affiliate redirect below, so that removing a slug
  // from RETIRED_TOOL_SLUGS takes effect immediately instead of being pinned in
  // browser caches. Returned before the after() below is registered, so no
  // AffiliateClick row is written for a destination we never sent anyone to.
  if (isRetiredTool(slug)) {
    return NextResponse.redirect(new URL(`/tool/${slug}`, request.nextUrl.origin), 307);
  }

  // Use prisma directly rather than lib/tools-db.ts's getToolBySlug: the
  // ToolData shape it returns has no `id`, and AffiliateClick.toolId needs it.
  const tool = await prisma.tool.findUnique({ where: { slug } });

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // Same rule as components/ui/AffiliateLink.tsx's fullUrl: append ref/utm
  // params, joining with "&" if the base URL already has a querystring.
  const baseUrl = tool.affiliateUrl || tool.websiteUrl;
  const destination = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}ref=vibestack&utm_source=vibestack`;

  const abVariant = parseAbVariant(request.nextUrl.searchParams.get("v"));
  const userAgent = request.headers.get("user-agent") || undefined;
  const referrer = request.headers.get("referer") || undefined;
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;

  // Record the click after the redirect response has been sent, so a slow or
  // failing DB write never delays the outbound redirect. Rate limiting and
  // errors here only skip the analytics row — they must never affect the
  // redirect below, which has already been returned to the client.
  after(async () => {
    try {
      const rateLimitIdentifier = `go-click:${ipAddress || "unknown"}`;
      const { allowed } = await checkRateLimit(
        rateLimitIdentifier,
        rateLimitConfigs.generous
      );

      if (!allowed) {
        return;
      }

      await prisma.affiliateClick.create({
        data: {
          toolId: tool.id,
          toolSlug: tool.slug,
          toolName: tool.title,
          url: destination,
          userAgent,
          referrer,
          ipAddress,
          abVariant,
        },
      });
    } catch (error) {
      console.error("[go] Failed to record affiliate click:", error);
    }
  });

  return NextResponse.redirect(destination, 307);
}
