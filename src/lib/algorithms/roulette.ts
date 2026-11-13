import { StudentProfile, TeamRole, ProjectDomain } from "@/types";
import { calculateCompatibility } from "./matching";

export interface GeneratedTeamMember {
  student: StudentProfile;
  assignedRole: TeamRole;
  isLeader: boolean;
  matchScoreWithTeam: number;
}

export interface GeneratedTeamResult {
  name: string;
  tagline: string;
  domain: ProjectDomain;
  members: GeneratedTeamMember[];
  avgCompatibilityScore: number;
  coveredSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendedTechStack: string[];
}

const ROLE_POOL: TeamRole[] = [
  "Team Leader",
  "Frontend Developer",
  "Backend Developer",
  "AI/ML Engineer",
  "UI/UX Designer",
  "Researcher",
  "Presenter",
  "Project Manager"
];

const DOMAIN_ESSENTIAL_SKILLS: Record<string, string[]> = {
  "Artificial Intelligence": ["Python", "Machine Learning", "Artificial Intelligence", "PyTorch", "Data Science"],
  "Healthcare": ["Python", "Data Science", "Machine Learning", "Database Management", "UI/UX Design"],
  "FinTech": ["TypeScript", "Next.js", "Node.js", "Cybersecurity", "Database Management", "PostgreSQL"],
  "Education": ["React", "Next.js", "UI/UX Design", "Node.js", "Tailwind CSS"],
  "Cybersecurity": ["Cybersecurity", "Python", "C++", "Cloud Computing", "Database Management"],
  "Smart Cities": ["Python", "Cloud Computing", "Docker", "Database Management", "UI/UX Design"],
  "Environment": ["Data Science", "Python", "UI/UX Design", "React", "Cloud Computing"],
  "Social Impact": ["UI/UX Design", "React", "Next.js", "Node.js", "Database Management"]
};

const TEAM_NAME_PREFIXES = [
  "Apex", "Nova", "Cyber", "Synapse", "Quantum", "Nexus", "Vanguard", "Aether", "Hyperion", "Titan", "Spectra", "Pulse"
];

const TEAM_NAME_SUFFIXES = [
  "Forge", "Labs", "Squad", "Collective", "Syndicate", "Engine", "Initiative", "Dynamics", "Pioneers", "Vector"
];

export function generateTeamName(): { name: string; tagline: string } {
  const prefix = TEAM_NAME_PREFIXES[Math.floor(Math.random() * TEAM_NAME_PREFIXES.length)];
  const suffix = TEAM_NAME_SUFFIXES[Math.floor(Math.random() * TEAM_NAME_SUFFIXES.length)];
  const taglines = [
    "Building high-impact intelligence systems",
    "Engineering the future of autonomous workflows",
    "Pioneering next-generation student innovations",
    "Transforming complex challenges into scalable tech",
    "Architecting resilient cross-functional products"
  ];
  return {
    name: `${prefix} ${suffix}`,
    tagline: taglines[Math.floor(Math.random() * taglines.length)]
  };
}

/**
 * Intelligent Team Formation Algorithm
 */
export function generateTeamFromCandidates({
  candidates,
  teamSize,
  domain,
  mode = "compatibility"
}: {
  candidates: StudentProfile[];
  teamSize: number;
  domain: ProjectDomain;
  mode: "compatibility" | "random";
}): GeneratedTeamResult {
  if (candidates.length < teamSize) {
    throw new Error(`Need at least ${teamSize} eligible students to form a team.`);
  }

  let selected: StudentProfile[] = [];

  if (mode === "random") {
    // Shuffle and pick
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, teamSize);
  } else {
    // Compatibility-driven selection:
    // 1. Pick a seed student who has the highest domain affinity or highest XP/experience
    const domainCandidates = candidates.filter((c) => c.preferredDomain === domain);
    const pool = domainCandidates.length >= teamSize ? domainCandidates : candidates;

    // Pick seed
    const seed = pool.reduce((prev, curr) => (curr.xp > prev.xp ? curr : prev), pool[0]);
    selected.push(seed);

    // Iteratively pick next student with highest average compatibility & new skills
    while (selected.length < teamSize) {
      const remaining = candidates.filter((c) => !selected.some((s) => s.id === c.id));
      if (remaining.length === 0) break;

      let bestCandidate = remaining[0];
      let bestScore = -1;

      for (const candidate of remaining) {
        // Compute avg compatibility with current team
        const avgMatch =
          selected.reduce((acc, s) => acc + calculateCompatibility(s, candidate).totalScore, 0) /
          selected.length;

        // Reward candidate if they bring complementary skills not yet covered by team
        const currentTeamSkills = new Set(selected.flatMap((s) => s.skills.map((k) => k.toLowerCase())));
        const uniqueSkillsCount = candidate.skills.filter(
          (k) => !currentTeamSkills.has(k.toLowerCase())
        ).length;

        const compositeScore = avgMatch + uniqueSkillsCount * 3;
        if (compositeScore > bestScore) {
          bestScore = compositeScore;
          bestCandidate = candidate;
        }
      }

      selected.push(bestCandidate);
    }
  }

  // Assign roles based on student's preferred role and top skills
  const assignedMembers: GeneratedTeamMember[] = [];
  const assignedRoles = new Set<string>();

  // Determine leader: either preferred "Team Leader" / "Project Manager" or highest experience/XP
  let leaderIndex = selected.findIndex(
    (s) => s.preferredRole === "Team Leader" || s.preferredRole === "Project Manager"
  );
  if (leaderIndex === -1) {
    leaderIndex = selected.reduce(
      (maxIdx, s, idx, arr) => (s.xp > arr[maxIdx].xp ? idx : maxIdx),
      0
    );
  }

  selected.forEach((student, index) => {
    const isLeader = index === leaderIndex;
    let assignedRole: TeamRole = student.preferredRole || "Full-Stack Developer";

    // Deduplicate roles if someone already took that exact role
    if (assignedRoles.has(assignedRole) && !isLeader) {
      // Pick a suitable vacant role
      const studentSkillsLower = student.skills.map((s) => s.toLowerCase());
      if (studentSkillsLower.some((s) => s.includes("ai") || s.includes("machine learning") || s.includes("pytorch"))) {
        assignedRole = "AI/ML Engineer";
      } else if (studentSkillsLower.some((s) => s.includes("design") || s.includes("ui") || s.includes("figma"))) {
        assignedRole = "UI/UX Designer";
      } else if (studentSkillsLower.some((s) => s.includes("node") || s.includes("database") || s.includes("python") || s.includes("postgres"))) {
        assignedRole = "Backend Developer";
      } else if (studentSkillsLower.some((s) => s.includes("react") || s.includes("next") || s.includes("tailwind"))) {
        assignedRole = "Frontend Developer";
      } else {
        assignedRole = ROLE_POOL.find((r) => !assignedRoles.has(r)) || "Researcher";
      }
    }

    if (isLeader && !assignedRole.includes("Leader") && !assignedRole.includes("Manager")) {
      assignedRole = "Team Leader";
    }

    assignedRoles.add(assignedRole);

    // Calculate individual compatibility with peers
    const peers = selected.filter((s) => s.id !== student.id);
    const avgScore =
      peers.length > 0
        ? Math.round(
            peers.reduce((acc, p) => acc + calculateCompatibility(student, p).totalScore, 0) / peers.length
          )
        : 85;

    assignedMembers.push({
      student,
      assignedRole,
      isLeader,
      matchScoreWithTeam: avgScore
    });
  });

  // Calculate aggregated team metrics
  const allTeamSkills = Array.from(new Set(selected.flatMap((s) => s.skills)));
  const domainSkills = DOMAIN_ESSENTIAL_SKILLS[domain] || ["TypeScript", "Next.js", "Python", "Database Management"];
  
  const coveredSkills = domainSkills.filter((req) =>
    allTeamSkills.some((s) => s.toLowerCase() === req.toLowerCase())
  );
  const missingSkills = domainSkills.filter(
    (req) => !allTeamSkills.some((s) => s.toLowerCase() === req.toLowerCase())
  );

  const teamStrengths: string[] = [];
  if (allTeamSkills.some((s) => s.toLowerCase().includes("ai") || s.toLowerCase().includes("machine"))) {
    teamStrengths.push("Deep AI & Algorithmic Capabilities");
  }
  if (allTeamSkills.some((s) => s.toLowerCase().includes("react") || s.toLowerCase().includes("next"))) {
    teamStrengths.push("Rapid Frontend Prototyping");
  }
  if (allTeamSkills.some((s) => s.toLowerCase().includes("database") || s.toLowerCase().includes("node") || s.toLowerCase().includes("docker"))) {
    teamStrengths.push("Robust Backend Architecture");
  }
  if (allTeamSkills.some((s) => s.toLowerCase().includes("design") || s.toLowerCase().includes("ui"))) {
    teamStrengths.push("Polished User Experience & Design");
  }
  if (teamStrengths.length === 0) {
    teamStrengths.push("Agile Multidisciplinary Problem Solvers");
  }

  const avgCompatibility = Math.round(
    assignedMembers.reduce((acc, m) => acc + m.matchScoreWithTeam, 0) / assignedMembers.length
  );

  const { name, tagline } = generateTeamName();

  return {
    name,
    tagline,
    domain,
    members: assignedMembers,
    avgCompatibilityScore: avgCompatibility,
    coveredSkills: allTeamSkills.slice(0, 8),
    missingSkills,
    strengths: teamStrengths,
    recommendedTechStack: domainSkills.slice(0, 4)
  };
}

