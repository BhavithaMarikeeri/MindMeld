import {
  StudentProfile,
  Team,
  Mission,
  Task,
  Connection,
  ConnectionRequest,
  ActivityNotification,
  ChatMessage,
  AnonymousFeedback
} from "@/types";

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: "student-1",
    userId: "usr-1",
    fullName: "Aria Vance",
    email: "aria.vance@stanford.edu",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Stanford University",
    department: "Computer Science (AI Track)",
    academicYear: "3rd Year",
    bio: "Passionate about generative AI, latency optimization, and human-computer symbiosis. Seeking ambitious builders to tackle healthcare diagnostic friction.",
    location: "Palo Alto, CA",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["Python", "PyTorch", "Machine Learning", "Artificial Intelligence", "FastAPI", "React", "TypeScript"],
    interests: ["AI/ML", "Hackathons", "Startups", "Research"],
    experienceLevel: "Advanced",
    availableHoursPerWeek: 18,
    preferredDomain: "Artificial Intelligence",
    preferredRole: "AI/ML Engineer",
    preferredTeamSize: 4,
    projectGoals: ["Win major collegiate hackathons", "Ship an open-source model", "Form a pre-seed venture"],
    xp: 940,
    level: 4,
    streakDays: 8,
    lastActive: new Date().toISOString(),
    personality: {
      archetype: "The Strategic Architect",
      tagline: "Master of system design, elegant abstractions, and rock-solid foundational logic.",
      traits: { teamwork: 82, leadership: 78, communication: 85, problemSolving: 94, adaptability: 80 },
      preferredWorkStyle: "Structured sprints with clean API contracts and deep technical rigor.",
      strengths: ["ML Pipeline Engineering", "Theoretical Foundations", "Technical Decomposition"],
      growthAreas: ["Early product UI design"]
    },
    createdAt: "2026-09-12T10:00:00Z",
    updatedAt: "2026-11-10T12:00:00Z"
  },
  {
    id: "student-2",
    userId: "usr-2",
    fullName: "Marcus Sterling",
    email: "marcus.s@mit.edu",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "Massachusetts Institute of Technology",
    department: "EECS & Management",
    academicYear: "4th Year",
    bio: "Full-stack architect & technical PM. 3x hackathon winner. I turn complex backend microservices into slick, lightning-fast SaaS products.",
    location: "Cambridge, MA",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "Cloud Computing", "Tailwind CSS"],
    interests: ["Startups", "FinTech", "Hackathons", "Entrepreneurship"],
    experienceLevel: "Expert",
    availableHoursPerWeek: 20,
    preferredDomain: "FinTech",
    preferredRole: "Team Leader",
    preferredTeamSize: 4,
    projectGoals: ["Launch a B2B devtool", "Scale to 10k users", "Secure VC backing"],
    xp: 1480,
    level: 6,
    streakDays: 14,
    lastActive: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    personality: {
      archetype: "The Catalyst Visionary",
      tagline: "Inspiring product leader who connects disparate dots and turns ambiguity into momentum.",
      traits: { teamwork: 88, leadership: 96, communication: 92, problemSolving: 86, adaptability: 90 },
      preferredWorkStyle: "Rapid iteration sprints, daily async standups, and laser-focused milestones.",
      strengths: ["Product Architecture", "Pitching & Positioning", "Rapid Prototyping"],
      growthAreas: ["Deep hardware low-level code"]
    },
    createdAt: "2026-08-15T09:00:00Z",
    updatedAt: "2026-11-12T14:30:00Z"
  },
  {
    id: "student-3",
    userId: "usr-3",
    fullName: "Elena Rostova",
    email: "elena.r@berkeley.edu",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "UC Berkeley",
    department: "Design & Cognitive Science",
    academicYear: "3rd Year",
    bio: "Obsessed with micro-interactions, dark cyberpunk aesthetics, and accessibility. Making complex AI tools feel effortless and magical.",
    location: "Berkeley, CA",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["UI/UX Design", "React", "Tailwind CSS", "Figma", "Design Systems", "Next.js"],
    interests: ["App development", "Web development", "AI/ML", "Startups"],
    experienceLevel: "Advanced",
    availableHoursPerWeek: 16,
    preferredDomain: "Social Impact",
    preferredRole: "UI/UX Designer",
    preferredTeamSize: 3,
    projectGoals: ["Design an Apple Design Award caliber app", "Master Framer Motion & 3D Shaders"],
    xp: 1120,
    level: 5,
    streakDays: 9,
    lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    personality: {
      archetype: "The Pragmatic Builder",
      tagline: "High-velocity powerhouse who translates conceptual ideas into shipped software with speed and grit.",
      traits: { teamwork: 90, leadership: 75, communication: 88, problemSolving: 85, adaptability: 92 },
      preferredWorkStyle: "Design-first execution, component modularity, and tight feedback loops with users.",
      strengths: ["Design Systems", "Visual Hierarchy", "Micro-interactions"],
      growthAreas: ["Database indexing"]
    },
    createdAt: "2026-09-01T11:00:00Z",
    updatedAt: "2026-11-11T16:00:00Z"
  },
  {
    id: "student-4",
    userId: "usr-4",
    fullName: "Kaelen Chen",
    email: "kaelen.c@gatech.edu",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    college: "Georgia Institute of Technology",
    department: "Cybersecurity & Systems",
    academicYear: "4th Year",
    bio: "Zero-knowledge proofs, cryptography, and hardened cloud infrastructure. Red teamer turned defensive cloud systems builder.",
    location: "Atlanta, GA",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["Cybersecurity", "C++", "Python", "Cloud Computing", "Docker", "Database Management", "Java"],
    interests: ["Competitive programming", "Research", "Open source"],
    experienceLevel: "Expert",
    availableHoursPerWeek: 14,
    preferredDomain: "Cybersecurity",
    preferredRole: "Backend Developer",
    preferredTeamSize: 4,
    projectGoals: ["Build decentralized identity protocol", "Present at DEF CON / Black Hat"],
    xp: 1350,
    level: 6,
    streakDays: 12,
    lastActive: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    personality: {
      archetype: "The Strategic Architect",
      tagline: "Master of system design, elegant abstractions, and rock-solid foundational logic.",
      traits: { teamwork: 75, leadership: 72, communication: 78, problemSolving: 98, adaptability: 82 },
      preferredWorkStyle: "Deep asynchronous work, cryptographic proof verifications, and stress testing.",
      strengths: ["Defensive Hardening", "Memory Safety", "Low-level Optimization"],
      growthAreas: ["Frontend CSS animations"]
    },
    createdAt: "2026-08-20T08:00:00Z",
    updatedAt: "2026-11-09T18:00:00Z"
  },
  {
    id: "student-5",
    userId: "usr-5",
    fullName: "Zara Morales",
    email: "zara.m@cmu.edu",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    college: "Carnegie Mellon University",
    department: "Language Technologies Institute",
    academicYear: "Graduate",
    bio: "NLP researcher specializing in low-resource machine translation and multilingual retrieval-augmented generation.",
    location: "Pittsburgh, PA",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["Python", "Machine Learning", "Artificial Intelligence", "Data Science", "C++", "Docker"],
    interests: ["Research", "AI/ML", "Open source"],
    experienceLevel: "Expert",
    availableHoursPerWeek: 15,
    preferredDomain: "Artificial Intelligence",
    preferredRole: "Researcher",
    preferredTeamSize: 3,
    projectGoals: ["Publish at NeurIPS / ACL", "Democratize language models for indigenous tongues"],
    xp: 1620,
    level: 7,
    streakDays: 21,
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    personality: {
      archetype: "The Strategic Architect",
      tagline: "Master of system design, elegant abstractions, and rock-solid foundational logic.",
      traits: { teamwork: 80, leadership: 76, communication: 84, problemSolving: 96, adaptability: 84 },
      preferredWorkStyle: "Empirical hypothesis testing, rigorous benchmarking, and scientific documentation.",
      strengths: ["Model Architecture", "Data Evaluation", "Empirical Rigor"],
      growthAreas: ["Commercial go-to-market strategies"]
    },
    createdAt: "2026-07-10T14:00:00Z",
    updatedAt: "2026-11-12T09:00:00Z"
  },
  {
    id: "student-6",
    userId: "usr-6",
    fullName: "Devon Thorne",
    email: "devon.t@waterloo.ca",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    college: "University of Waterloo",
    department: "Software Engineering",
    academicYear: "2nd Year",
    bio: "Speed demon full-stack hacker. Interned at two YC startups. I write TypeScript and deploy to Kubernetes before breakfast.",
    location: "Waterloo, ON",
    role: "student",
    isAvailableForCollaboration: true,
    profileVisibility: "public",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Database Management", "Tailwind CSS"],
    interests: ["Startups", "Web development", "Hackathons", "Entrepreneurship"],
    experienceLevel: "Intermediate",
    availableHoursPerWeek: 25,
    preferredDomain: "Developer Tools",
    preferredRole: "Frontend Developer",
    preferredTeamSize: 4,
    projectGoals: ["Ship 10 products this year", "Get accepted into Y Combinator"],
    xp: 820,
    level: 4,
    streakDays: 6,
    lastActive: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    personality: {
      archetype: "The Pragmatic Builder",
      tagline: "High-velocity powerhouse who translates conceptual ideas into shipped software with speed and grit.",
      traits: { teamwork: 86, leadership: 80, communication: 82, problemSolving: 88, adaptability: 94 },
      preferredWorkStyle: "Ship code fast, test in production with monitoring, and iterate based on live user telemetry.",
      strengths: ["Velocity", "TypeScript ecosystem", "Component libraries"],
      growthAreas: ["Long-term technical debt planning"]
    },
    createdAt: "2026-09-25T16:00:00Z",
    updatedAt: "2026-11-08T20:00:00Z"
  },
  {
    id: "student-7",
    userId: "usr-7",
    fullName: "Dr. Elena Ramos (Admin)",
    email: "admin@mindmeld.edu",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    college: "Carnegie Mellon University",
    department: "Computer Science Faculty & Admin",
    academicYear: "Graduate",
    bio: "MINDMELD System Administrator & Faculty Advisor for Cross-Disciplinary Innovation.",
    location: "Pittsburgh, PA",
    role: "admin",
    isAvailableForCollaboration: false,
    profileVisibility: "public",
    skills: ["Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Database Management"],
    interests: ["Research", "Startups", "Open source"],
    experienceLevel: "Expert",
    availableHoursPerWeek: 10,
    preferredDomain: "Education",
    preferredRole: "Project Manager",
    preferredTeamSize: 4,
    projectGoals: ["Foster next-gen collegiate startup ecosystem"],
    xp: 3200,
    level: 13,
    streakDays: 45,
    lastActive: new Date().toISOString(),
    createdAt: "2026-06-01T08:00:00Z",
    updatedAt: "2026-11-13T08:00:00Z"
  }
];

export const DEMO_MISSIONS: Mission[] = [
  {
    id: "mis-1",
    title: "Project BioSentry: Real-Time Sepsis Onset Predictor",
    problemStatement: "ICU patient telemetry is filled with noisy sensor data, leading to critical sepsis alerts being identified 4 to 6 hours too late.",
    description: "Build an edge-compatible streaming inference pipeline that consumes real-time heart rate, blood pressure, and lactate telemetry to forecast septic shock probability with high specificity.",
    category: "Healthcare",
    difficulty: "Expert",
    suggestedSolutions: [
      "Lightweight temporal convolutional neural network (TCN)",
      "Low-overhead MQTT telemetry broker",
      "Interactive bedside alert dashboard with explainability SHAP values"
    ],
    recommendedTechStack: ["Python", "PyTorch", "FastAPI", "React", "Tailwind CSS"],
    estimatedDuration: "3 weeks",
    requiredSkills: ["Python", "Machine Learning", "Data Science", "React"],
    potentialImpact: "Has potential to save over 12,000 hospital patient lives annually through earlier antibiotic intervention.",
    xpReward: 500
  },
  {
    id: "mis-2",
    title: "NeuroFlow: Zero-Knowledge Micro-Grants for Collegiate Labs",
    problemStatement: "University research grants take 6-9 months for approval, forcing promising student researchers to abandon urgent breakthrough experiments.",
    description: "Develop a peer-validated micro-grant platform where collegiate researchers can submit milestone proofs cryptographically validated by fellow academics, unlocking immediate donor liquidity.",
    category: "FinTech",
    difficulty: "Hard",
    suggestedSolutions: [
      "Zero-knowledge milestone verifier",
      "Dynamic quadratic funding pool calculation",
      "Real-time research progress tracking kanban"
    ],
    recommendedTechStack: ["Next.js", "TypeScript", "PostgreSQL", "Cybersecurity"],
    estimatedDuration: "2 weeks",
    requiredSkills: ["TypeScript", "Next.js", "PostgreSQL", "Cybersecurity"],
    potentialImpact: "Unlocks \$10M+ in stagnant student grant liquidity across 40 participating universities.",
    xpReward: 350
  },
  {
    id: "mis-3",
    title: "TerraMesh: Autonomous Wildfire Early Warning Sensor Grid",
    problemStatement: "California and Mediterranean forest fires often spread undetected for hours in dense canopy before satellite thermal sensors detect them.",
    description: "Engineer a low-cost mesh-network sensor protocol that detects volatile organic compounds and thermal anomalies at ground level, routing emergency alerts via LoRaWAN.",
    category: "Environment",
    difficulty: "Hard",
    suggestedSolutions: [
      "LoRa mesh network packet deduplication",
      "Geospatial fire spread simulator using wind vector analysis",
      "High-contrast first responder mobile map"
    ],
    recommendedTechStack: ["C++", "Python", "React", "Mapbox GL"],
    estimatedDuration: "2 weeks",
    requiredSkills: ["C++", "Python", "Cloud Computing", "React"],
    potentialImpact: "Cuts median wildfire response dispatch from 180 minutes down to under 12 minutes.",
    xpReward: 350
  },
  {
    id: "mis-4",
    title: "CodeScribe: Real-Time Accessible Pair-Programming Assistant",
    problemStatement: "Neurodivergent and visually impaired computer science students struggle with standard IDE autocomplete tools that lack rich auditory and structural reasoning.",
    description: "Build an IDE plugin and companion web app that parses abstract syntax trees into natural structural explanations, vocalizing code flow and syntax discrepancies with adaptive cognitive pacing.",
    category: "Education",
    difficulty: "Medium",
    suggestedSolutions: [
      "Tree-sitter AST parser wrapper",
      "Context-aware speech synthesis with phonetic coding tokens",
      "High-contrast accessible visualizer"
    ],
    recommendedTechStack: ["TypeScript", "React", "Node.js", "UI/UX Design"],
    estimatedDuration: "10 days",
    requiredSkills: ["TypeScript", "React", "UI/UX Design"],
    potentialImpact: "Enables 150,000+ neurodivergent engineering students to participate fully in pair-programming workflows.",
    xpReward: 200
  },
  {
    id: "mis-5",
    title: "CivicSense: Hyperlocal Urban Pothole & Infrastructure Triage",
    problemStatement: "Municipal road repair reporting relies on manual 311 calls, resulting in low-income neighborhood street hazards remaining unfixed 3x longer.",
    description: "Create a smartphone accelerometer and camera tool that crowdsources road roughness data while driving or cycling, automatically mapping and prioritizing municipal repair tickets.",
    category: "Smart Cities",
    difficulty: "Easy",
    suggestedSolutions: [
      "Mobile sensor vibration frequency classifier",
      "Automated heat-map density clustering",
      "Civic transparency public leaderboard"
    ],
    recommendedTechStack: ["React", "Tailwind CSS", "Node.js", "Database Management"],
    estimatedDuration: "1 week",
    requiredSkills: ["React", "JavaScript", "Database Management"],
    potentialImpact: "Shortens municipal road repair dispatch turnaround from 90 days to 14 days.",
    xpReward: 100
  }
];

export const DEMO_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Nexus AI Lab",
    tagline: "Engineering real-time clinical intelligence systems",
    description: "A cross-disciplinary team from Stanford and Berkeley building AI clinical diagnostics for emergency rooms. Competing in upcoming university hackathons.",
    domain: "Artificial Intelligence",
    leaderId: "student-1",
    members: [
      {
        id: "tm-1",
        teamId: "team-1",
        studentId: "student-1",
        student: DEMO_STUDENTS[0],
        role: "Team Leader",
        isLeader: true,
        joinedAt: "2026-10-01T10:00:00Z"
      },
      {
        id: "tm-2",
        teamId: "team-1",
        studentId: "student-3",
        student: DEMO_STUDENTS[2],
        role: "UI/UX Designer",
        isLeader: false,
        joinedAt: "2026-10-02T14:00:00Z"
      },
      {
        id: "tm-3",
        teamId: "team-1",
        studentId: "student-5",
        student: DEMO_STUDENTS[4],
        role: "AI/ML Engineer",
        isLeader: false,
        joinedAt: "2026-10-05T09:00:00Z"
      }
    ],
    maxMembers: 4,
    techStack: ["PyTorch", "FastAPI", "React", "Next.js", "Tailwind CSS"],
    projectGoals: ["Win Healthcare Track at Stanford TreeHacks", "Validate clinical prediction latency under 150ms"],
    compatibilityScore: 94,
    createdAt: "2026-10-01T10:00:00Z",
    status: "in_progress",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "team-2",
    name: "Apex FinTech Syndicate",
    tagline: "Building zero-knowledge decentralized collegiate equity protocols",
    description: "High-velocity squad engineering verifiable sweat-equity agreements for collegiate builders and student founders.",
    domain: "FinTech",
    leaderId: "student-2",
    members: [
      {
        id: "tm-4",
        teamId: "team-2",
        studentId: "student-2",
        student: DEMO_STUDENTS[1],
        role: "Team Leader",
        isLeader: true,
        joinedAt: "2026-09-15T12:00:00Z"
      },
      {
        id: "tm-5",
        teamId: "team-2",
        studentId: "student-4",
        student: DEMO_STUDENTS[3],
        role: "Backend Developer",
        isLeader: false,
        joinedAt: "2026-09-16T15:00:00Z"
      },
      {
        id: "tm-6",
        teamId: "team-2",
        studentId: "student-6",
        student: DEMO_STUDENTS[5],
        role: "Frontend Developer",
        isLeader: false,
        joinedAt: "2026-09-18T11:00:00Z"
      }
    ],
    maxMembers: 5,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
    projectGoals: ["Launch public testnet MVP", "Secure 5 campus entrepreneurship clubs"],
    compatibilityScore: 91,
    createdAt: "2026-09-15T12:00:00Z",
    status: "in_progress",
    avatarUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80"
  }
];

export const DEMO_TASKS: Task[] = [
  {
    id: "tsk-1",
    teamId: "team-1",
    title: "Implement Fast TCN inference layer for ICU telemetry",
    description: "Benchmark PyTorch streaming model on synthetic vitals dataset. Ensure P99 latency is below 150ms.",
    status: "In Progress",
    priority: "High",
    assignedToId: "student-5",
    assignedTo: DEMO_STUDENTS[4],
    dueDate: "2026-11-20",
    createdById: "student-1",
    createdAt: "2026-11-01T10:00:00Z",
    updatedAt: "2026-11-10T14:00:00Z"
  },
  {
    id: "tsk-2",
    teamId: "team-1",
    title: "Design high-contrast bedside vitals HUD in Figma",
    description: "Create dark cyberpunk telemetry charts with emergency alert color coding that meets WCAG AAA standards.",
    status: "Completed",
    priority: "Medium",
    assignedToId: "student-3",
    assignedTo: DEMO_STUDENTS[2],
    dueDate: "2026-11-12",
    createdById: "student-1",
    createdAt: "2026-11-02T11:00:00Z",
    updatedAt: "2026-11-12T16:00:00Z"
  },
  {
    id: "tsk-3",
    teamId: "team-1",
    title: "Setup WebSocket server for continuous vitals stream",
    description: "Establish resilient bi-directional socket connections with automatic reconnect backoff.",
    status: "To Do",
    priority: "Urgent",
    assignedToId: "student-1",
    assignedTo: DEMO_STUDENTS[0],
    dueDate: "2026-11-25",
    createdById: "student-1",
    createdAt: "2026-11-05T09:00:00Z",
    updatedAt: "2026-11-05T09:00:00Z"
  },
  {
    id: "tsk-4",
    teamId: "team-1",
    title: "Conduct peer review & security validation of patient telemetry buffer",
    description: "Verify that zero PII leaves local sandbox without AES-256 encryption.",
    status: "In Review",
    priority: "High",
    assignedToId: "student-1",
    assignedTo: DEMO_STUDENTS[0],
    dueDate: "2026-11-18",
    createdById: "student-1",
    createdAt: "2026-11-08T13:00:00Z",
    updatedAt: "2026-11-12T18:00:00Z"
  }
];

export const DEMO_CONNECTIONS: Connection[] = [
  {
    id: "conn-1",
    userId1: "student-1",
    userId2: "student-2",
    student1: DEMO_STUDENTS[0],
    student2: DEMO_STUDENTS[1],
    createdAt: "2026-10-10T14:00:00Z"
  },
  {
    id: "conn-2",
    userId1: "student-1",
    userId2: "student-3",
    student1: DEMO_STUDENTS[0],
    student2: DEMO_STUDENTS[2],
    createdAt: "2026-10-12T18:30:00Z"
  },
  {
    id: "conn-3",
    userId1: "student-1",
    userId2: "student-5",
    student1: DEMO_STUDENTS[0],
    student2: DEMO_STUDENTS[4],
    createdAt: "2026-10-15T09:15:00Z"
  },
  {
    id: "conn-4",
    userId1: "student-2",
    userId2: "student-4",
    student1: DEMO_STUDENTS[1],
    student2: DEMO_STUDENTS[3],
    createdAt: "2026-10-16T11:00:00Z"
  },
  {
    id: "conn-5",
    userId1: "student-2",
    userId2: "student-6",
    student1: DEMO_STUDENTS[1],
    student2: DEMO_STUDENTS[5],
    createdAt: "2026-10-18T16:20:00Z"
  }
];

export const DEMO_CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: "cr-1",
    senderId: "student-4",
    receiverId: "student-1",
    sender: DEMO_STUDENTS[3],
    receiver: DEMO_STUDENTS[0],
    status: "pending",
    message: "Hey Aria! Saw your work on hospital latency models. I have deep backend & security experience and would love to collaborate on your next build.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  }
];

export const DEMO_NOTIFICATIONS: ActivityNotification[] = [
  {
    id: "notif-1",
    userId: "student-1",
    title: "Connection Request Received",
    message: "Kaelen Chen sent you a collaboration connection request.",
    type: "connection",
    link: "/discover",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: "notif-2",
    userId: "student-1",
    title: "Task Completed in Nexus AI Lab",
    message: "Elena Rostova completed 'Design high-contrast bedside vitals HUD in Figma'.",
    type: "task",
    link: "/teams/team-1",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: "notif-3",
    userId: "student-1",
    title: "Achievement Unlocked: Consistent Mind",
    message: "You maintained an 8-day active streak. +300 XP awarded!",
    type: "achievement",
    link: "/leaderboard",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }
];

export const DEMO_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "student-3",
    senderName: "Elena Rostova",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    teamId: "team-1",
    content: "Hey team! Just uploaded the final telemetry HUD components in our workspace. Let me know what you think of the color contrast on the emergency alert state!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: "msg-2",
    senderId: "student-5",
    senderName: "Zara Morales",
    senderAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    teamId: "team-1",
    content: "Checking it out now Elena! Looks clean. The latency curve graph fits our inference batching output perfectly.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "msg-3",
    senderId: "student-2",
    senderName: "Marcus Sterling",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    recipientId: "student-1",
    content: "Hey Aria! Are you free for 10 mins tomorrow afternoon to sync on the inter-collegiate demo day?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  }
];

export const DEMO_FEEDBACK: AnonymousFeedback[] = [
  {
    id: "fb-1",
    teamId: "team-1",
    targetStudentId: "student-1",
    ratings: {
      communication: 5,
      reliability: 5,
      technicalContribution: 5,
      teamSpirit: 4
    },
    constructiveNote: "Incredible technical clarity and unblocking ability during high-stress sprint hours. Keep delegating more frontend tasks so you don't burn out!",
    submittedAt: "2026-11-05T12:00:00Z",
    isModerated: true
  }
];

