import { NextResponse } from "next/server";
import { getFeaturedStacks } from "@/lib/data/stacks";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.max(1, Math.min(6, Number(limitParam))) : 4;

    try {
        const stacks = await getFeaturedStacks(limit);
        return NextResponse.json({ stacks });
    } catch (error) {
        return NextResponse.json({ stacks: [] }, { status: 200 });
    }
}
