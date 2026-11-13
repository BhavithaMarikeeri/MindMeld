import { Achievement } from "@/types";

export const SYSTEM_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    code: "CONNECTOR",
    title: "The Connector",
    description: "Form 5 verified collaborative connections with fellow students.",
    icon: "Users",
    xpValue: 150,
    tier: "bronze"
  },
  {
    id: "ach-2",
    code: "IDEA_MACHINE",
    title: "Idea Machine",
    description: "Generate 10 custom startup or hackathon missions in the engine.",
    icon: "Lightbulb",
    xpValue: 200,
    tier: "silver"
  },
  {
    id: "ach-3",
    code: "TEAM_BUILDER",
    title: "Team Builder",
    description: "Successfully assemble and save 3 balanced project squads.",
    icon: "ShieldAlert",
    xpValue: 250,
    tier: "silver"
  },
  {
    id: "ach-4",
    code: "CONSISTENT",
    title: "Consistent Mind",
    description: "Maintain an active 7-day collaboration streak on the platform.",
    icon: "Flame",
    xpValue: 300,
    tier: "gold"
  },
  {
    id: "ach-5",
    code: "CODE_MASTER",
    title: "Code Master",
    description: "Complete 5 technical project tasks across your workspaces.",
    icon: "Code2",
    xpValue: 350,
    tier: "gold"
  },
  {
    id: "ach-6",
    code: "CHAMPION",
    title: "Vanguard Champion",
    description: "Complete an Expert-tier cross-functional innovation mission.",
    icon: "Trophy",
    xpValue: 500,
    tier: "platinum"
  }
];

export const XP_RULES = {
  CONNECT_STUDENT: 30,
  ACCEPT_MISSION: 20,
  COMPLETE_TASK: 40,
  COMPLETE_MISSION_EASY: 100,
  COMPLETE_MISSION_MEDIUM: 200,
  COMPLETE_MISSION_HARD: 350,
  COMPLETE_MISSION_EXPERT: 500,
  CREATE_TEAM: 50,
  SUBMIT_FEEDBACK: 25,
  COMPLETE_PERSONALITY_QUIZ: 75
};

export function checkEligibleAchievements({
  connectionCount,
  generatedMissionsCount,
  teamsCreatedCount,
  streakDays,
  completedTasksCount,
  completedMissionsCount,
  alreadyUnlockedCodes
}: {
  connectionCount: number;
  generatedMissionsCount: number;
  teamsCreatedCount: number;
  streakDays: number;
  completedTasksCount: number;
  completedMissionsCount: number;
  alreadyUnlockedCodes: string[];
}): Achievement[] {
  const eligible: Achievement[] = [];

  if (connectionCount >= 5 && !alreadyUnlockedCodes.includes("CONNECTOR")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "CONNECTOR");
    if (ach) eligible.push(ach);
  }

  if (generatedMissionsCount >= 10 && !alreadyUnlockedCodes.includes("IDEA_MACHINE")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "IDEA_MACHINE");
    if (ach) eligible.push(ach);
  }

  if (teamsCreatedCount >= 3 && !alreadyUnlockedCodes.includes("TEAM_BUILDER")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "TEAM_BUILDER");
    if (ach) eligible.push(ach);
  }

  if (streakDays >= 7 && !alreadyUnlockedCodes.includes("CONSISTENT")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "CONSISTENT");
    if (ach) eligible.push(ach);
  }

  if (completedTasksCount >= 5 && !alreadyUnlockedCodes.includes("CODE_MASTER")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "CODE_MASTER");
    if (ach) eligible.push(ach);
  }

  if (completedMissionsCount >= 1 && !alreadyUnlockedCodes.includes("CHAMPION")) {
    const ach = SYSTEM_ACHIEVEMENTS.find((a) => a.code === "CHAMPION");
    if (ach) eligible.push(ach);
  }

  return eligible;
}

