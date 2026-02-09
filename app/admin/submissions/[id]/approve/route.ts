import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToolFromSubmission } from "@/lib/submissions";
import { sendSubmissionApprovedEmail } from "@/lib/emails";

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

  if (submission.status !== "approved") {
    await createToolFromSubmission(submission);
    await prisma.submission.update({
      where: { id },
      data: { status: "approved" },
    });
    try {
      await sendSubmissionApprovedEmail({
        to: submission.email,
        toolName: submission.toolName,
        tier: submission.tier,
        websiteUrl: submission.websiteUrl,
      });
    } catch (error) {
      console.error("Failed to send approval email:", error);
    }
  }

  return NextResponse.redirect(new URL("/admin/submissions", request.url));
}
