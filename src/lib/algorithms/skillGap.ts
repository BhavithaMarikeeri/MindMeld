import { StudentProfile, Team, TeamRole } from "@/types";

export interface SkillGapAnalysisResult {
  coveredSkills: string[];
  missingCriticalSkills: string[];
  recommendedRoleToRecruit: TeamRole;
  targetCandidateCriteria: {
    skillsNeeded: string[];
    roleTitle: string;
    rationale: string;
  };
  recommendedLearningResources: {
    skill: string;
    resourceName: string;
    url: string;
    type: "Docs" | "Course" | "Interactive";
  }[];
  coveragePercentage: number;
  radarData: { subject: string; current: number; ideal: number }[];
}

const DOMAIN_BENCHMARKS: Record<
  string,
  {
    essential: string[];
    radar: { subject: string; ideal: number }[];
  }
> = {
  "Artificial Intelligence": {
    essential: ["Python", "PyTorch", "Machine Learning", "Docker", "FastAPI", "React"],
    radar: [
      { subject: "ML Models", ideal: 95 },
      { subject: "Data Engineering", ideal: 85 },
      { subject: "Frontend/UI", ideal: 70 },
      { subject: "Backend/API", ideal: 80 },
      { subject: "Deployment/Ops", ideal: 75 }
    ]
  },
  "FinTech": {
    essential: ["TypeScript", "Next.js", "PostgreSQL", "Cybersecurity", "Docker", "Node.js"],
    radar: [
      { subject: "Security & Auth", ideal: 95 },
      { subject: "DB Performance", ideal: 90 },
      { subject: "Frontend UI/UX", ideal: 85 },
      { subject: "API Resilience", ideal: 90 },
      { subject: "Compliance/Audit", ideal: 75 }
    ]
  },
  "Healthcare": {
    essential: ["Python", "Data Science", "Machine Learning", "Database Management", "UI/UX Design"],
    radar: [
      { subject: "Clinical Data", ideal: 90 },
      { subject: "ML Precision", ideal: 85 },
      { subject: "UI Accessibility", ideal: 95 },
      { subject: "Data Privacy", ideal: 95 },
      { subject: "Scalability", ideal: 70 }
    ]
  },
  DEFAULT: {
    essential: ["React", "TypeScript", "Node.js", "Database Management", "UI/UX Design"],
    radar: [
      { subject: "Frontend", ideal: 85 },
      { subject: "Backend", ideal: 85 },
      { subject: "Design", ideal: 80 },
      { subject: "DevOps", ideal: 70 },
      { subject: "Testing", ideal: 75 }
    ]
  }
};

const RESOURCE_CATALOG: Record<string, { resourceName: string; url: string; type: "Docs" | "Course" | "Interactive" }> = {
  "Python": { resourceName: "Real Python Advanced Track", url: "https://realpython.com", type: "Interactive" },
  "PyTorch": { resourceName: "PyTorch Deep Learning Zero to Mastery", url: "https://pytorch.org/tutorials", type: "Docs" },
  "Machine Learning": { resourceName: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai", type: "Course" },
  "Docker": { resourceName: "Docker & Container Mastery", url: "https://docs.docker.com/get-started", type: "Docs" },
  "Next.js": { resourceName: "Next.js Official App Router Guide", url: "https://nextjs.org/learn", type: "Interactive" },
  "TypeScript": { resourceName: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs", type: "Docs" },
  "Cybersecurity": { resourceName: "OWASP Top 10 Security Checklist", url: "https://owasp.org", type: "Docs" },
  "PostgreSQL": { resourceName: "Postgres for Production High-Scale", url: "https://use-the-index-luke.com", type: "Course" },
  "UI/UX Design": { resourceName: "Refactoring UI & Figma Systems", url: "https://refactoringui.com", type: "Course" }
};

export function analyzeTeamSkillGaps(team: Team): SkillGapAnalysisResult {
  const members = team.members || [];
  const teamSkills = Array.from(
    new Set(
      members.flatMap((m) =>
        m.student ? m.student.skills : []
      )
    )
  );

  const teamSkillsLower = new Set(teamSkills.map((s) => s.toLowerCase()));
  const benchmark = DOMAIN_BENCHMARKS[team.domain] || DOMAIN_BENCHMARKS.DEFAULT;

  const coveredSkills: string[] = [];
  const missingCriticalSkills: string[] = [];

  benchmark.essential.forEach((skill) => {
    if (teamSkillsLower.has(skill.toLowerCase())) {
      coveredSkills.push(skill);
    } else {
      missingCriticalSkills.push(skill);
    }
  });

  const coveragePercentage = Math.round(
    (coveredSkills.length / Math.max(1, benchmark.essential.length)) * 100
  );

  // Determine which role to recruit
  let recommendedRole: TeamRole = "Full-Stack Developer";
  let rationale = "Add a versatile contributor to accelerate delivery.";

  if (missingCriticalSkills.some((s) => ["PyTorch", "Machine Learning", "Python"].includes(s))) {
    recommendedRole = "AI/ML Engineer";
    rationale = `Your team currently lacks deep ML/data modeling capability (${missingCriticalSkills.filter((s) => ["PyTorch", "Machine Learning", "Python"].includes(s)).join(", ")}).`;
  } else if (missingCriticalSkills.some((s) => ["UI/UX Design", "Figma"].includes(s))) {
    recommendedRole = "UI/UX Designer";
    rationale = "Your squad would benefit from high-fidelity product design and intuitive user journeys.";
  } else if (missingCriticalSkills.some((s) => ["Cybersecurity", "Docker", "Cloud Computing"].includes(s))) {
    recommendedRole = "Backend Developer";
    rationale = "Your architecture needs stronger infrastructure and security hardening.";
  } else if (missingCriticalSkills.some((s) => ["React", "Next.js", "TypeScript"].includes(s))) {
    recommendedRole = "Frontend Developer";
    rationale = "Elevate the user interface responsiveness and modern client interactions.";
  }

  // Compile recommended resources
  const recommendedLearningResources = missingCriticalSkills.map((skill) => {
    const found = RESOURCE_CATALOG[skill];
    if (found) {
      return {
        skill,
        resourceName: found.resourceName,
        url: found.url,
        type: found.type
      };
    }
    return {
      skill,
      resourceName: `${skill} Official Documentation`,
      url: `https://www.google.com/search?q=${encodeURIComponent(skill + " documentation")}`,
      type: "Docs" as const
    };
  });

  // Calculate radar chart coordinates
  const radarData = benchmark.radar.map((r, idx) => {
    // Current estimate based on coverage
    const base = Math.min(100, Math.max(25, coveragePercentage + (idx % 2 === 0 ? 15 : -10)));
    return {
      subject: r.subject,
      current: base,
      ideal: r.ideal
    };
  });

  return {
    coveredSkills,
    missingCriticalSkills,
    recommendedRoleToRecruit: recommendedRole,
    targetCandidateCriteria: {
      skillsNeeded: missingCriticalSkills,
      roleTitle: recommendedRole,
      rationale
    },
    recommendedLearningResources,
    coveragePercentage,
    radarData
  };
}

