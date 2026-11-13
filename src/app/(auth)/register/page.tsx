"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { Brain, User, Mail, Lock, School, BookOpen, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POPULAR_SKILLS, POPULAR_INTERESTS } from "@/lib/utils";
import { StudentProfile } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const { switchUser, updateProfile } = useDemoStore();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState<"1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "Graduate">("3rd Year");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "TypeScript", "Python"]);
  const [preferredDomain, setPreferredDomain] = useState("Artificial Intelligence");
  const [preferredRole, setPreferredRole] = useState("Frontend Developer");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !college || !department) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required academic information.",
        type: "error"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        type: "error"
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newId = `student-${Date.now()}`;
      const newProfile: StudentProfile = {
        id: newId,
        userId: `usr-${Date.now()}`,
        fullName,
        email,
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
        college,
        department,
        academicYear,
        bio: `Undergraduate builder at ${college}. Passionate about ${preferredDomain} and shipping fast with modern frameworks.`,
        role: "student",
        isAvailableForCollaboration: true,
        profileVisibility: "public",
        skills: selectedSkills,
        interests: ["Hackathons", "Startups", "Web development"],
        experienceLevel: "Intermediate",
        availableHoursPerWeek: 15,
        preferredDomain: preferredDomain as any,
        preferredRole: preferredRole as any,
        preferredTeamSize: 4,
        projectGoals: ["Build high impact projects", "Form a competitive hackathon squad"],
        xp: 150, // Welcome bonus
        level: 1,
        streakDays: 1,
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to store and set active
      const existing = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("mindmeld_v1_students") || "[]") : [];
      if (typeof window !== "undefined") {
        window.localStorage.setItem("mindmeld_v1_students", JSON.stringify([newProfile, ...existing]));
        window.localStorage.setItem("mindmeld_v1_current_user_id", newId);
      }
      switchUser(newId);

      toast({
        title: "Account Created Successfully!",
        description: `Welcome to MINDMELD, ${fullName}! +150 Welcome XP awarded.`,
        type: "success"
      });

      setIsLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-glow-violet">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-2xl font-black text-white tracking-wider">
              MIND<span className="text-cyan-400">MELD</span>
            </span>
          </Link>
          <h2 className="font-heading text-2xl font-bold text-white pt-2">Create Student Account</h2>
          <p className="text-xs text-slate-400">
            Join the student innovation network. Showcase your stack and meet compatible teammates.
          </p>
        </div>

        <Card className="glass-card border-violet-500/25">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Full Name *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    icon={<User className="h-4 w-4" />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Academic / Personal Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="maya@college.edu"
                    icon={<Mail className="h-4 w-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">College / University *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Stanford University"
                    icon={<School className="h-4 w-4" />}
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Department / Major *</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Computer Science"
                    icon={<BookOpen className="h-4 w-4" />}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Academic Year</label>
                  <select
                    className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value as any)}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Preferred Role</label>
                  <select
                    className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
                    value={preferredRole}
                    onChange={(e) => setPreferredRole(e.target.value)}
                  >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="AI/ML Engineer">AI/ML Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Team Leader">Team Leader</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Password *</label>
                  <Input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    icon={<Lock className="h-4 w-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Skills Tag Cloud */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Select Primary Skills ({selectedSkills.length} selected)</span>
                  <span className="text-[11px] text-cyan-400">Click to toggle</span>
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  {POPULAR_SKILLS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-violet-600 text-white shadow-sm"
                            : "bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {skill} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-4"
                isLoading={isLoading}
              >
                Complete Registration & Launch Engine
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-400 hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

