import { NextResponse } from "next/server";
import { FeedbackSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = FeedbackSchema.parse(body);

    const feedbackEntry = {
      id: `fb-${Date.now()}`,
      teamId: validated.teamId,
      targetStudentId: validated.targetStudentId,
      ratings: validated.ratings,
      constructiveNote: validated.constructiveNote,
      submittedAt: new Date().toISOString(),
      isModerated: true
    };

    return NextResponse.json({
      success: true,
      data: feedbackEntry
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid feedback payload"
      },
      { status: 400 }
    );
  }
}

