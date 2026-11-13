import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid academic or personal email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid university or personal email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  college: z.string().min(2, "College name is required"),
  department: z.string().min(2, "Department/Major is required"),
  academicYear: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"]),
  preferredDomain: z.string().min(2, "Preferred domain is required"),
  preferredRole: z.string().min(2, "Preferred role is required")
});

export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  college: z.string().min(2, "College is required"),
  department: z.string().min(2, "Department is required"),
  academicYear: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"]),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  location: z.string().optional(),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  availableHoursPerWeek: z.number().min(1).max(80),
  preferredDomain: z.string(),
  preferredRole: z.string(),
  preferredTeamSize: z.number().min(2).max(10),
  isAvailableForCollaboration: z.boolean(),
  profileVisibility: z.enum(["public", "college-only", "private"]),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  interests: z.array(z.string()).min(1, "Please select at least one interest")
});

export const CreateTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters").max(50),
  tagline: z.string().max(120, "Tagline cannot exceed 120 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  domain: z.string().min(2, "Domain is required"),
  maxMembers: z.number().min(2).max(8),
  techStack: z.array(z.string()).optional(),
  projectGoals: z.array(z.string()).optional()
});

export const CreateTaskSchema = z.object({
  title: z.string().min(3, "Task title must be at least 3 characters").max(120),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "In Review", "Completed"]),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  assignedToId: z.string().optional(),
  dueDate: z.string().optional()
});

export const FeedbackSchema = z.object({
  teamId: z.string().min(1, "Team ID is required"),
  targetStudentId: z.string().min(1, "Target student ID is required"),
  ratings: z.object({
    communication: z.number().min(1).max(5),
    reliability: z.number().min(1).max(5),
    technicalContribution: z.number().min(1).max(5),
    teamSpirit: z.number().min(1).max(5)
  }),
  constructiveNote: z.string().min(10, "Constructive note must be at least 10 characters").max(600)
});

