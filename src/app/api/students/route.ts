import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/validation/schemas";
import { DEMO_STUDENTS } from "@/lib/demo/demoData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: DEMO_STUDENTS
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = RegisterSchema.parse(body);

    const newStudent = {
      id: `student-${Date.now()}`,
      userId: `usr-${Date.now()}`,
      fullName: validated.fullName,
      email: validated.email,
      college: validated.college,
      department: validated.department,
      academicYear: validated.academicYear,
      preferredDomain: validated.preferredDomain,
      preferredRole: validated.preferredRole,
      skills: ["React", "TypeScript", "Python"],
      interests: ["Hackathons", "Startups"],
      experienceLevel: "Intermediate",
      availableHoursPerWeek: 15,
      xp: 150,
      level: 1,
      streakDays: 1,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newStudent
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid payload"
      },
      { status: 400 }
    );
  }
}

