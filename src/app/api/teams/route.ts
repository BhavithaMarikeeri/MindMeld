import { NextResponse } from "next/server";
import { CreateTeamSchema } from "@/lib/validation/schemas";
import { DEMO_TEAMS } from "@/lib/demo/demoData";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: DEMO_TEAMS
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = CreateTeamSchema.parse(body);

    const newTeam = {
      id: `team-${Date.now()}`,
      name: validated.name,
      tagline: validated.tagline || "",
      description: validated.description,
      domain: validated.domain,
      maxMembers: validated.maxMembers,
      members: [],
      compatibilityScore: 88,
      createdAt: new Date().toISOString(),
      status: "in_progress"
    };

    return NextResponse.json({
      success: true,
      data: newTeam
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid team specification"
      },
      { status: 400 }
    );
  }
}

