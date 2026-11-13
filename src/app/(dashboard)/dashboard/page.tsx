"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { calculateLevel, formatXP, formatDate } from "@/lib/utils";
import { calculateCompatibility } from "@/lib/algorithms/matching";
import {
  Users,
  Trophy,
  Sparkles,
  Dices,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bell,
  Check,
  ChevronRight,
  ShieldCheck,
  Plus,
  Compass,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function DashboardPage() {
  const {
    currentUser,
    allStudents,
    teams,
    tasks,
    missions,
    connections,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    sendConnectionRequest,
    connectionRequests
  } = useDemoStore();
  const { toast } = useToast();

  const { level, progress, nextLevelXp } = calculateLevel(currentUser.xp);

  // Profile completion calculation
  let completedFields = 0;
  const totalFields = 7;
  if (currentUser.fullName) completedFields++;
  if (currentUser.avatarUrl) completedFields++;
  if (currentUser.college) completedFields++;
  if (currentUser.bio) completedFields++;
  if (currentUser.skills.length >= 3) completedFields++;
  if (currentUser.personality) completedFields++;
  if (currentUser.projectGoals && currentUser.projectGoals.length > 0) completedFields++;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Top recommended collaborators
  const recommendedStudents = allStudents
    .filter((s) => s.id !== currentUser.id)
    .map((s) => ({
      student: s,
      match: calculateCompatibility(currentUser, s)
    }))
    .sort((a, b) => b.match.totalScore - a.match.totalScore)
    .slice(0, 3);

  // User's active teams
  const userTeams = teams.filter((t) =>
    t.members.some((m) => m.studentId === currentUser.id)
  );

  // User's upcoming tasks
  const userTasks = tasks
    .filter((t) => t.assignedToId === currentUser.id && t.status !== "Completed")
    .slice(0, 4);

  // Mock weekly activity telemetry for Recharts
  const activityData = [
    { day: "Mon", commits: 4, xpGained: 75 },
    { day: "Tue", commits: 7, xpGained: 140 },
    { day: "Wed", commits: 3, xpGained: 60 },
    { day: "Thu", commits: 9, xpGained: 190 },
    { day: "Fri", commits: 12, xpGained: 240 },
    { day: "Sat", commits: 8, xpGained: 160 },
    { day: "Sun", commits: 10, xpGained: 210 }
  ];

  const handleQuickConnect = (targetId: string, name: string) => {
    try {
      sendConnectionRequest(targetId, "Hey! Noticed our high synergy match on the dashboard.");
      toast({
        title: "Connection Request Dispatched",
        description: `Sent invitation to collaborate with ${name}.`,
        type: "success"
      });
    } catch (err: any) {
      toast({
        title: "Notice",
        description: err.message || "Request already sent.",
        type: "info"
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-panel border-violet-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-600/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-violet-400 shadow-glow-violet"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-violet-400">
                Lvl {level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome, {currentUser.fullName}
                </h1>
                <Badge variant="cyan" className="hidden sm:inline-flex">
                  {currentUser.role === "admin" ? "Staff Admin" : "Active Student"}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {currentUser.department} • {currentUser.college}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-300">
                  <Flame className="h-4 w-4 fill-amber-400 text-amber-500" />
                  <strong>{currentUser.streakDays}-Day Streak</strong>
                </span>
                <span>•</span>
                <span>{currentUser.xp} Total XP</span>
                <span>•</span>
                <span className="text-cyan-300">{currentUser.preferredRole}</span>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/roulette">
              <Button variant="secondary" size="sm" className="group">
                <Dices className="h-4 w-4 text-cyan-300" />
                <span>Team Roulette</span>
              </Button>
            </Link>
            <Link href="/missions">
              <Button variant="primary" size="sm">
                <Trophy className="h-4 w-4" />
                <span>Generate Mission</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">
              Level {level} Journey: <strong>{progress}%</strong>
            </span>
            <span className="text-cyan-400 font-mono">
              {currentUser.xp} / {nextLevelXp} XP ({nextLevelXp - currentUser.xp} XP to Level {level + 1})
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-700 shadow-glow-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-violet-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Total Connections</div>
              <div className="text-2xl font-heading font-black text-white mt-1">
                {connections.length}
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">Verified Network</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-cyan-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Active Squads</div>
              <div className="text-2xl font-heading font-black text-cyan-300 mt-1">
                {userTeams.length}
              </div>
              <div className="text-[11px] text-cyan-400 mt-0.5">In Workspaces</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-pink-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Missions Solved</div>
              <div className="text-2xl font-heading font-black text-pink-300 mt-1">
                {missions.filter((m) => m.difficulty === "Expert").length + 2}
              </div>
              <div className="text-[11px] text-pink-400 mt-0.5">Real Challenges</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-400">
              <Trophy className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-emerald-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Profile Readiness</div>
              <div className="text-2xl font-heading font-black text-emerald-300 mt-1">
                {completionPercentage}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {completionPercentage < 100 ? "Add personality quiz" : "Fully Optimized"}
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Middle Section: Telemetry Chart & Recommended Teammates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Weekly Collaboration Activity (Recharts) */}
        <div className="lg:col-span-7">
          <Card className="glass-panel border-violet-500/25 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Weekly Collaboration Telemetry</CardTitle>
                <CardDescription>Tasks resolved, peer interactions, and XP momentum</CardDescription>
              </div>
              <Badge variant="violet">+820 XP this week</Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="xpColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="commitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0d1127",
                        borderColor: "#7c3aed",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "12px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="xpGained"
                      name="XP Earned"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#xpColor)"
                    />
                    <Area
                      type="monotone"
                      dataKey="commits"
                      name="Workspace Tasks"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#commitColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Top Recommended Collaborators */}
        <div className="lg:col-span-5">
          <Card className="glass-panel border-cyan-500/25 h-full flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  Top Matched Peers
                </CardTitle>
                <CardDescription>Based on 6-factor compatibility</CardDescription>
              </div>
              <Link href="/matching" className="text-xs text-cyan-400 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3 pt-3 flex-1">
              {recommendedStudents.map(({ student, match }) => {
                const isRequested = connectionRequests.some(
                  (r) =>
                    (r.senderId === currentUser.id && r.receiverId === student.id) ||
                    (r.receiverId === currentUser.id && r.senderId === student.id)
                );
                return (
                  <div
                    key={student.id}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 hover:border-violet-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={student.avatarUrl}
                        alt={student.fullName}
                        className="h-10 w-10 rounded-full object-cover border border-violet-400/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                          <span>{student.fullName}</span>
                          <span className="text-[10px] text-cyan-400 font-mono">
                            {match.totalScore}%
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {student.preferredRole} • {student.college.split(" ")[0]}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {student.skills.slice(0, 2).map((sk) => (
                            <span
                              key={sk}
                              className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={isRequested ? "outline" : "cyber"}
                      disabled={isRequested}
                      onClick={() => handleQuickConnect(student.id, student.fullName)}
                      className="text-xs shrink-0"
                    >
                      {isRequested ? "Pending" : "Connect"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Bottom Section: Active Squads, Pending Tasks, and Notification Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Squads */}
        <Card className="glass-card border-violet-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-violet-400" />
              My Workspaces
            </CardTitle>
            <Link href="/teams">
              <Button variant="ghost" size="sm" className="text-xs">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {userTeams.length > 0 ? (
              userTeams.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="block p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{team.name}</span>
                    <Badge variant="violet" className="text-[10px]">
                      {team.members.length} members
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {team.tagline || team.description}
                  </p>
                </Link>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                You haven't joined any squads yet.
                <div className="mt-2">
                  <Link href="/roulette">
                    <Button size="sm" variant="outline">
                      Assemble via Roulette
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assigned Workspace Tasks */}
        <Card className="glass-card border-cyan-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              Sprint Deliverables
            </CardTitle>
            <Badge variant="cyan" className="text-[10px]">
              {userTasks.length} pending
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {userTasks.length > 0 ? (
              userTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{t.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Due: {t.dueDate || "Flexible"}</div>
                  </div>
                  <Badge
                    variant={
                      t.priority === "Urgent"
                        ? "magenta"
                        : t.priority === "High"
                        ? "amber"
                        : "default"
                    }
                    className="text-[9px] shrink-0"
                  >
                    {t.priority}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                All sprint deliverables completed! +40 XP on your next task.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications & System Alerts */}
        <Card className="glass-card border-pink-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-pink-400" />
              Recent Alerts
            </CardTitle>
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-pink-400 hover:underline"
            >
              Mark all read
            </button>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {notifications.slice(0, 3).map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  !n.isRead
                    ? "bg-violet-950/30 border-violet-500/40 text-slate-200"
                    : "bg-slate-900/50 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white">{n.title}</div>
                  {!n.isRead && (
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] mt-0.5 leading-relaxed">{n.message}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

