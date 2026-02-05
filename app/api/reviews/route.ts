
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "Tool slug is required" }, { status: 400 });
    }

    try {
        const reviews = await prisma.review.findMany({
            where: { toolSlug: slug },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { toolSlug, rating, content } = body;

        if (!toolSlug || !rating || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                toolSlug,
                rating,
                content,
                userId: session.user.id,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Failed to create review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}
