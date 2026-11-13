import { NextResponse } from "next/server";
import { calculateCompatibility } from "@/lib/algorithms/matching";
import { DEMO_STUDENTS } from "@/lib/demo/demoData";

export async function POST(request: Request) {
  try {
    const { studentAId, studentBId } = await request.json();

    const studentA = DEMO_STUDENTS.find((s) => s.id === studentAId) || DEMO_STUDENTS[0];
    const studentB = DEMO_STUDENTS.find((s) => s.id === studentBId) || DEMO_STUDENTS[1];

    const matchResult = calculateCompatibility(studentA, studentB);

    return NextResponse.json({
      success: true,
      data: matchResult
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to calculate compatibility"
      },
      { status: 500 }
    );
  }
}

