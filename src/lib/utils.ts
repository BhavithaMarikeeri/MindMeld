import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) return (xp / 1000000).toFixed(1) + 'M';
  if (xp >= 1000) return (xp / 1000).toFixed(1) + 'k';
  return xp.toString();
}

export function calculateLevel(xp: number): { level: number; progress: number; nextLevelXp: number } {
  // Level threshold formula: level * 250 XP
  // Level 1: 0-250 XP, Level 2: 250-500 XP, etc.
  const level = Math.floor(xp / 250) + 1;
  const currentLevelFloor = (level - 1) * 250;
  const nextLevelXp = level * 250;
  const progress = Math.min(100, Math.round(((xp - currentLevelFloor) / 250) * 100));
  return { level, progress, nextLevelXp };
}

export function getInitials(name: string): string {
  if (!name) return "MM";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
}

export function formatTimeAgo(dateString: string): string {
  try {
    const now = new Date().getTime();
    const past = new Date(dateString).getTime();
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 30) return formatDate(dateString);
    if (diffDay > 0) return `${diffDay}d ago`;
    if (diffHour > 0) return `${diffHour}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return "just now";
  } catch {
    return dateString;
  }
}

export const POPULAR_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
  "Node.js",
  "Java",
  "C++",
  "C",
  "UI/UX Design",
  "Cloud Computing",
  "Cybersecurity",
  "Database Management",
  "Docker",
  "PostgreSQL",
  "Tailwind CSS",
  "PyTorch",
  "TensorFlow"
];

export const POPULAR_INTERESTS = [
  "Hackathons",
  "Startups",
  "Competitive programming",
  "Research",
  "Open source",
  "AI/ML",
  "Web development",
  "App development",
  "Entrepreneurship",
  "Robotics",
  "Blockchain & Web3",
  "Game Dev"
];

