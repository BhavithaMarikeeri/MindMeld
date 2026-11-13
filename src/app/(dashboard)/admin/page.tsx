"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import {
  Shield,
  Users,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Activity,
  Trash2,
  Ban,
  Check,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function AdminPage() {
  const { currentUser, allStudents, teams, missions, connections, switchUser } = useDemoStore();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teams" | "reports">("overview");
  const [studentSearch, setStudentSearch] = useState("");

  const isAdmin = currentUser.role === "admin";

  const chartData = [
    { name: "Week 1", students: 120, teams: 28, matches: 210 },
    { name: "Week 2", students: 260, teams: 65, matches: 480 },
    { name: "Week 3", students: 490, teams: 130, matches: 920 },
    { name: "Week 4", students: 780, teams: 210, matches: 1540 },
    { name: "Week 5", students: 1240, teams: 340, matches: 2420 }
  ];

  if (!isAdmin) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl border-red-500/30 max-w-xl mx-auto space-y-4">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white">Administrator Access Required</h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
          The administrative control plane is restricted to verified faculty advisors and system operators.
        </p>
        <div className="pt-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              switchUser("student-7");
              toast({
                title: "Switched to Administrator Persona",
                description: "Dr. Elena Ramos (Admin) is now active.",
                type: "success"
              });
            }}
          >
            Switch to Admin Persona (Dr. Elena Ramos)
          </Button>
        </div>
      </div>
    );
  }

  const filteredStudents = allStudents.filter((s) => {
    if (!studentSearch) return true;
    const q = studentSearch.toLowerCase();
    return s.fullName.toLowerCase().includes(q) || s.college.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Shield className="h-7 w-7 text-pink-400" />
            Institutional Governance & Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise collegiate safety, analyze multi-campus onboarding telemetry, and manage moderation queues.
          </p>
        </div>

        <Badge variant="magenta" className="py-1 px-3 text-xs w-fit">
          Faculty Staff Mode Active
        </Badge>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-violet-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold">Registered Students</div>
              <div className="text-2xl font-heading font-black text-white mt-1">
                {allStudents.length * 350 + 124}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">+18% this month</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-cyan-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold">Active Squads</div>
              <div className="text-2xl font-heading font-black text-cyan-300 mt-1">
                {teams.length * 85 + 42}
              </div>
              <div className="text-[10px] text-cyan-400 mt-0.5">Across 14 campuses</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-pink-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold">Verified Edges</div>
              <div className="text-2xl font-heading font-black text-pink-300 mt-1">
                {connections.length * 140 + 82}
              </div>
              <div className="text-[10px] text-pink-400 mt-0.5">High cross-synergy</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-emerald-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-semibold">Missions Completed</div>
              <div className="text-2xl font-heading font-black text-emerald-300 mt-1">
                {missions.length * 60 + 15}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">99.8% Safety Pass</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Growth Analytics
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "students"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Student Directory ({allStudents.length})
        </button>
        <button
          onClick={() => setActiveTab("teams")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "teams"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Team Workspaces ({teams.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW TELEMETRY */}
      {activeTab === "overview" && (
        <Card className="glass-panel border-violet-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Collegiate Network Growth</CardTitle>
            <CardDescription>
              New registered innovators, cross-functional squads, and verified matchmaking transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d1127",
                      borderColor: "#ec4899",
                      borderRadius: "0.75rem",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                  <Bar dataKey="students" name="Students" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="teams" name="Squads" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="matches" name="Matches" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: STUDENT MANAGEMENT TABLE */}
      {activeTab === "students" && (
        <Card className="glass-panel border-slate-800">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Registered Innovators</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Filter by student name..."
                icon={<Search className="h-3.5 w-3.5" />}
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Institution</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">XP / Level</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-900/40">
                      <td className="py-3 flex items-center gap-2.5">
                        <img
                          src={student.avatarUrl}
                          alt={student.fullName}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-white">{student.fullName}</div>
                          <div className="text-[10px] text-slate-400">{student.email}</div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-300">{student.college}</td>
                      <td className="py-3 text-cyan-300 font-medium">{student.preferredRole}</td>
                      <td className="py-3 text-white font-mono">{student.xp} XP (Lvl {student.level})</td>
                      <td className="py-3">
                        <Badge variant="emerald" className="text-[9px]">Verified</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="ghost" className="text-red-400 text-xs py-1 h-7">
                          Flag
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 3: TEAMS MANAGEMENT TABLE */}
      {activeTab === "teams" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-2xl glass-card border-slate-800 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.domain} • {t.members.length} members</div>
                <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                  Synergy: {t.compatibilityScore}%
                </div>
              </div>
              <Link href={`/teams/${t.id}`}>
                <Button size="sm" variant="outline" className="text-xs">
                  Inspect Workspace
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

