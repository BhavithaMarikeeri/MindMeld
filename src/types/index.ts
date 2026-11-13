export type UserRole = 'student' | 'admin';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type ProjectDomain = 
  | 'Artificial Intelligence'
  | 'Healthcare'
  | 'Education'
  | 'Agriculture'
  | 'Environment'
  | 'FinTech'
  | 'Cybersecurity'
  | 'Smart Cities'
  | 'Social Impact'
  | 'Web3'
  | 'Developer Tools';

export type TeamRole = 
  | 'Team Leader'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'AI/ML Engineer'
  | 'UI/UX Designer'
  | 'Researcher'
  | 'Presenter'
  | 'Project Manager'
  | 'Full-Stack Developer'
  | 'Data Scientist';

export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export type MissionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type MissionCategory = ProjectDomain;

export interface PersonalityProfile {
  archetype: string;
  tagline: string;
  traits: {
    teamwork: number; // 0-100
    leadership: number;
    communication: number;
    problemSolving: number;
    adaptability: number;
  };
  preferredWorkStyle: string;
  strengths: string[];
  growthAreas: string[];
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  college: string;
  department: string;
  academicYear: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Graduate';
  bio: string;
  location?: string;
  role: UserRole;
  isAvailableForCollaboration: boolean;
  profileVisibility: 'public' | 'college-only' | 'private';
  skills: string[];
  interests: string[];
  experienceLevel: ExperienceLevel;
  availableHoursPerWeek: number;
  preferredDomain: ProjectDomain;
  preferredRole: TeamRole;
  preferredTeamSize: number;
  projectGoals: string[];
  xp: number;
  level: number;
  streakDays: number;
  lastActive: string;
  personality?: PersonalityProfile;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  sender?: StudentProfile;
  receiver?: StudentProfile;
  status: ConnectionStatus;
  message?: string;
  createdAt: string;
}

export interface Connection {
  id: string;
  userId1: string;
  userId2: string;
  student1?: StudentProfile;
  student2?: StudentProfile;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  studentId: string;
  student?: StudentProfile;
  role: TeamRole;
  isLeader: boolean;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: ProjectDomain;
  leaderId: string;
  leader?: StudentProfile;
  members: TeamMember[];
  maxMembers: number;
  techStack: string[];
  projectGoals: string[];
  compatibilityScore: number;
  createdAt: string;
  status: 'recruiting' | 'in_progress' | 'completed' | 'archived';
  avatarUrl?: string;
}

export interface Task {
  id: string;
  teamId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedToId?: string;
  assignedTo?: StudentProfile;
  dueDate?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface Mission {
  id: string;
  title: string;
  problemStatement: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  suggestedSolutions: string[];
  recommendedTechStack: string[];
  estimatedDuration: string;
  requiredSkills: string[];
  potentialImpact: string;
  xpReward: number;
  isCustom?: boolean;
}

export interface TeamMission {
  id: string;
  teamId: string;
  missionId: string;
  mission: Mission;
  status: 'active' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  progressPercentage: number;
}

export interface Achievement {
  id: string;
  code: 'IDEA_MACHINE' | 'TEAM_BUILDER' | 'CHAMPION' | 'CODE_MASTER' | 'CONSISTENT' | 'CONNECTOR' | 'EXPLORER' | 'MENTOR';
  title: string;
  description: string;
  icon: string;
  xpValue: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
}

export interface ActivityNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'connection' | 'team_invite' | 'task' | 'achievement' | 'mission' | 'system';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId?: string; // for direct messages
  teamId?: string; // for team chats
  content: string;
  timestamp: string;
}

export interface AnonymousFeedback {
  id: string;
  teamId: string;
  targetStudentId: string;
  ratings: {
    communication: number; // 1-5
    reliability: number;
    technicalContribution: number;
    teamSpirit: number;
  };
  constructiveNote: string;
  submittedAt: string;
  isModerated: boolean;
}

export interface MatchScoreBreakdown {
  totalScore: number;
  skillComplementarity: number; // out of 30
  sharedInterests: number; // out of 20
  projectGoals: number; // out of 20
  availabilityMatch: number; // out of 15
  experienceCompatibility: number; // out of 10
  collaborationPreferences: number; // out of 5
  overlapSkills: string[];
  complementarySkills: string[];
  sharedInterestsList: string[];
  sharedGoalsList: string[];
  explanation: string;
}

export interface GeneratedProjectIdea {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution: string;
  techStack: string[];
  difficulty: MissionDifficulty;
  innovationScore: number; // 0-100
  potentialImpact: string;
  suggestedRoles: { role: TeamRole; rationale: string }[];
}

