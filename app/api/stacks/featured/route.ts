import { NextResponse } from "next/server";
import { getFeaturedStackRanking, resolveFeaturedStacks } from "@/lib/data/stacks";
import { getTools } from "@/lib/tools-db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.max(1, Math.min(6, Number(limitParam))) : 4;

    try {
        // Same two-source split as the homepage: the database ranks, and
        // lib/stacks.ts supplies the content, so /tools cannot advertise a
        // stack differently than /stack/<id> does — or link an id that route
        // does not serve. Tool names resolve through getTools(), which drops
        // retired tools.
        const [ranking, allTools] = await Promise.all([getFeaturedStackRanking(), getTools()]);
        const stacks = resolveFeaturedStacks(ranking, allTools, limit);
        return NextResponse.json({ stacks });
    } catch (error) {
        console.error("Failed to build the featured stacks response:", error);
        return NextResponse.json({ stacks: [] }, { status: 200 });
    }
}
