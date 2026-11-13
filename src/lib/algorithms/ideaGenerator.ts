import { GeneratedProjectIdea, MissionDifficulty, StudentProfile } from "@/types";

interface IdeaSeed {
  domain: string;
  requiredSkillTriggers: string[];
  title: string;
  problem: string;
  solution: string;
  techStack: string[];
  difficulty: MissionDifficulty;
  innovationScore: number;
  potentialImpact: string;
}

const SEED_IDEAS: IdeaSeed[] = [
  {
    domain: "Artificial Intelligence",
    requiredSkillTriggers: ["Python", "Machine Learning", "PyTorch", "React"],
    title: "NeuroPulse: Autonomous Multimodal Clinical Triage",
    problem: "Hospital emergency rooms suffer from 40%+ diagnostic delay due to fragmented patient intake and unstructured EHR data.",
    solution: "A local-first Edge AI assistant that transcribes patient intake audio in real-time, extracts vitals using multimodal computer vision, and surfaces differential diagnoses to ER staff.",
    techStack: ["PyTorch", "FastAPI", "React", "Tailwind CSS", "WebRTC"],
    difficulty: "Expert",
    innovationScore: 96,
    potentialImpact: "Reduces ER triage latency by 65% and flags critical sepsis risks hours earlier."
  },
  {
    domain: "FinTech",
    requiredSkillTriggers: ["TypeScript", "Next.js", "Cybersecurity", "Database Management", "PostgreSQL"],
    title: "SplitZero: Zero-Knowledge Micro-Equity for Student Founders",
    problem: "Collegiate hackers and open-source contributors struggle to legally split IP and sweat equity without costly legal counsel.",
    solution: "A lightweight smart agreement engine with ZK-proof verifiable milestone tracking, automated cap-table updates, and dispute arbitration.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Zod"],
    difficulty: "Hard",
    innovationScore: 92,
    potentialImpact: "Standardizes collegiate startup equity allocation for over 50,000 student hackers."
  },
  {
    domain: "Smart Cities & Climate",
    requiredSkillTriggers: ["Python", "Data Science", "React", "Cloud Computing"],
    title: "GridWeave: Hyperlocal Microgrid Energy Load Balancer",
    problem: "Urban renewable energy grids face 28% wastage during peak solar/wind surplus hours due to static tariff pricing.",
    solution: "An adaptive reinforcement learning model paired with an IoT dashboard that predicts localized residential battery demand and dynamically orchestrates micro-transfers.",
    techStack: ["Python", "TensorFlow", "React", "Recharts", "Docker"],
    difficulty: "Hard",
    innovationScore: 89,
    potentialImpact: "Diverts 1.4 gigawatt-hours of surplus renewable energy back to underserved community hubs."
  },
  {
    domain: "Education",
    requiredSkillTriggers: ["React", "UI/UX Design", "Next.js", "Node.js"],
    title: "SynapsePeer: Real-Time Collaborative Spatial Whiteboard",
    problem: "Remote engineering students struggle to explain abstract distributed system architectures using conventional flat screens.",
    solution: "An infinite-canvas collaborative workspace with low-latency multiplayer cursors, interactive live code execution blocks, and automated diagram-to-code compilation.",
    techStack: ["Next.js", "React Flow", "Tailwind CSS", "WebSockets"],
    difficulty: "Medium",
    innovationScore: 88,
    potentialImpact: "Empowers 30,000+ computer science students to co-design complex distributed topologies visually."
  },
  {
    domain: "Social Impact & Accessibility",
    requiredSkillTriggers: ["UI/UX Design", "React", "Python"],
    title: "EchoLens: Real-Time AR Spatial Audio for the Visually Impaired",
    problem: "Visually impaired students face immense disorientation navigating sprawling, constantly re-arranged campus environments.",
    solution: "A smartphone camera system using spatial depth sensors and lightweight object detection to whisper directional binaural audio cues about obstacles and pathways.",
    techStack: ["Python", "OpenCV", "React Native / PWA", "Web Audio API"],
    difficulty: "Medium",
    innovationScore: 94,
    potentialImpact: "Restores independent campus mobility to thousands of visually impaired students."
  }
];

export function generateProjectIdeasForStudents(students: StudentProfile[]): GeneratedProjectIdea[] {
  const combinedSkills = new Set(students.flatMap((s) => s.skills.map((k) => k.toLowerCase())));

  // Score candidate seeds based on trigger match
  const scoredIdeas = SEED_IDEAS.map((seed, idx) => {
    const matchedCount = seed.requiredSkillTriggers.filter((t) =>
      combinedSkills.has(t.toLowerCase())
    ).length;

    // Build role suggestions
    const suggestedRoles = students.map((student) => ({
      role: student.preferredRole,
      rationale: `${student.fullName.split(" ")[0]} can lead ${student.skills.slice(0, 2).join(" & ")} execution.`
    }));

    return {
      id: `gen-idea-${idx + 1}-${Date.now().toString(36)}`,
      title: seed.title,
      problemStatement: seed.problem,
      proposedSolution: seed.solution,
      techStack: seed.techStack,
      difficulty: seed.difficulty,
      innovationScore: seed.innovationScore,
      potentialImpact: seed.potentialImpact,
      suggestedRoles,
      relevanceScore: matchedCount
    };
  });

  // Sort by highest match or return top 3
  scoredIdeas.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return scoredIdeas.slice(0, 3);
}

