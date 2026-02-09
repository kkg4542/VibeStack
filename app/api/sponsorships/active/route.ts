import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placement = searchParams.get("placement");

  if (!placement) {
    return NextResponse.json({ error: "placement is required" }, { status: 400 });
  }

  const sponsorship = await prisma.sponsorship.findFirst({
    where: {
      placement,
      status: "active",
      currentPeriodEnd: { gte: new Date() },
    },
    include: { tool: true },
    orderBy: { currentPeriodEnd: "desc" },
  });

  return NextResponse.json({ sponsorship });
}
