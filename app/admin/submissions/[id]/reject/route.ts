import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const submission = await prisma.submission.findUnique({
    where: { id },
  });

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  if (submission.status !== "rejected") {
    await prisma.submission.update({
      where: { id },
      data: { status: "rejected" },
    });
  }

  return NextResponse.redirect(new URL("/admin/submissions", request.url));
}
