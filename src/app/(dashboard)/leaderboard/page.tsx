"use client";

import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { DemoStore } from "@/lib/demo/store";
import { useToast } from "@/components/ui/toast";
import { SYSTEM_ACHIEVEMENTS, checkEligibleAchievements } from "@/lib/algorithms/gamification";
import { calculateLevel, formatXP } from "@/lib/utils";
import {
  Trophy,
  Flame,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  Lock,
  Crown,
  Medal,
  ChevronRight,
  Zap,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
  const {
    currentUser,
    allStudents,
    teams,
    tasks,
    missions,
    connections,
    refreshState
  } = useDemoStore();
  const { toast } = useToast();

  const [leaderboardScope, setLeaderboardScope] = useState<"global" | "weekly" | "teams">("global");
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>(["CONSISTENT", "CONNECTOR"]);

  // Calculate current user unlocked achievements vs pending
  const eligibleAchievements = useMemo(() => {
    return checkEligibleAchievements({
      connectionCount: connections.length,
      generatedMissionsCount: missions.filter((m) => m.isCustom).length,
      teamsCreatedCount: teams.filter((t) => t.leaderId === currentUser.id).length,
      streakDays: currentUser.streakDays,
      completedTasksCount: tasks.filter((t) => t.status === "Completed").length,
      completedMissionsCount: 1,
      alreadyUnlockedCodes: unlockedCodes
    });
  }, [connections, missions, teams, currentUser, tasks, unlockedCodes]);

  const handleClaimAchievement = (code: string, title: string, xpValue: number) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    setUnlockedCodes([...unlockedCodes, code]);
    DemoStore.awardXP(currentUser.id, xpValue, `Unlocked achievement: ${title}`);
    refreshState();

    toast({
      title: "Achievement Claimed!",
      description: `Unlocked "${title}". +${xpValue} XP awarded!`,
      type: "success"
    });
  };

  // Student Leaderboard (sorted by XP)
  const rankedStudents = useMemo(() => {
    return [...allStudents].sort((a, b) => b.xp - a.xp);
  }, [allStudents]);

  // Teams Leaderboard (sorted by compatibility / member size)
  const rankedTeams = useMemo(() => {
    return [...teams].sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [teams]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Trophy className="h-7 w-7 text-amber-400" />
            Leaderboard & Gamification Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compete across collegiate ranks, earn milestone badges, and maintain your collaboration momentum.
          </p>
        </div>

        {/* User Current Tier Badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel border-amber-500/30">
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-heading">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Your Current Rank</div>
            <div className="text-sm font-bold text-white">
              Level {currentUser.level} • {formatXP(currentUser.xp)} XP
            </div>
          </div>
        </div>
      </div>

      {/* Scope Selector Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setLeaderboardScope("global")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            leaderboardScope === "global"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Global Innovators
        </button>
        <button
          onClick={() => setLeaderboardScope("weekly")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            leaderboardScope === "weekly"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Weekly Streak Champions
        </button>
        <button
          onClick={() => setLeaderboardScope("teams")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            leaderboardScope === "teams"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Top Squads
        </button>
      </div>

      {/* Main Content Layout: Rankings List + Achievement Badges Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Rankings Table */}
        <div className="lg:col-span-7">
          <Card className="glass-panel border-violet-500/25">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  {leaderboardScope === "teams" ? "Squad Leaderboard" : "Student Standings"}
                </CardTitle>
                <CardDescription>
                  {leaderboardScope === "weekly"
                    ? "Ranked by consecutive collaboration streak days"
                    : "Ranked by cumulative experience points (XP)"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboardScope === "teams"
                ? rankedTeams.map((team, index) => (
                    <div
                      key={team.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 hover:border-violet-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            index === 0
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : index === 1
                              ? "bg-slate-300/20 text-slate-200 border border-slate-400/30"
                              : index === 2
                              ? "bg-amber-700/20 text-amber-600 border border-amber-700/40"
                              : "text-slate-500"
                          }`}
                        >
                          #{index + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{team.name}</div>
                          <div className="text-[10px] text-slate-400">{team.domain} • {team.members.length} members</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-cyan-300">
                          {team.compatibilityScore}% Synergy
                        </div>
                        <div className="text-[9px] text-slate-400">Team Score</div>
                      </div>
                    </div>
                  ))
                : rankedStudents.map((student, index) => {
                    const isCurrentUser = student.id === currentUser.id;

                    return (
                      <div
                        key={student.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          isCurrentUser
                            ? "bg-violet-950/50 border-violet-500/60 shadow-glow-violet"
                            : "bg-slate-900/60 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                              index === 0
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : index === 1
                                ? "bg-slate-300/20 text-slate-200 border border-slate-400/30"
                                : index === 2
                                ? "bg-amber-700/20 text-amber-600 border border-amber-700/40"
                                : "text-slate-500"
                            }`}
                          >
                            #{index + 1}
                          </div>

                          <img
                            src={student.avatarUrl}
                            alt={student.fullName}
                            className="h-9 w-9 rounded-full object-cover border border-violet-400/40 shrink-0"
                          />

                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                              <span>{student.fullName}</span>
                              {isCurrentUser && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-violet-600 text-white font-semibold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {student.preferredRole} • {student.college.split(" ")[0]}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-mono font-bold text-white">
                            {formatXP(student.xp)} XP
                          </div>
                          <div className="text-[9px] text-amber-300 flex items-center justify-end gap-1">
                            <Flame className="h-3 w-3 fill-amber-400 text-amber-500" />
                            <span>{student.streakDays}d streak</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </CardContent>
          </Card>
        </div>

        {/* Right: Milestone Achievements Badges */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="glass-panel border-cyan-500/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-cyan-400" />
                Achievement Badges
              </CardTitle>
              <CardDescription>
                Earn verified collegiate credentials as you ship projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {SYSTEM_ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlockedCodes.includes(ach.code);
                const isEligibleToClaim = eligibleAchievements.some((e) => e.code === ach.code);

                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isUnlocked
                        ? "bg-slate-900/80 border-emerald-500/40 text-slate-200"
                        : isEligibleToClaim
                        ? "bg-violet-950/60 border-violet-400 shadow-glow-violet animate-pulse"
                        : "bg-slate-900/40 border-slate-800 text-slate-500 opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                            isUnlocked
                              ? "bg-emerald-500/20 text-emerald-400"
                              : isEligibleToClaim
                              ? "bg-violet-600/30 text-violet-300"
                              : "bg-slate-800 text-slate-600"
                          }`}
                        >
                          {isUnlocked ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isEligibleToClaim ? (
                            <Sparkles className="h-5 w-5 text-cyan-300" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{ach.title}</span>
                            <Badge
                              variant={
                                ach.tier === "platinum"
                                  ? "magenta"
                                  : ach.tier === "gold"
                                  ? "amber"
                                  : "violet"
                              }
                              className="text-[9px] uppercase py-0"
                            >
                              {ach.tier}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                            {ach.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-amber-300">
                          +{ach.xpValue} XP
                        </span>
                      </div>
                    </div>

                    {isEligibleToClaim && !isUnlocked && (
                      <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleClaimAchievement(ach.code, ach.title, ach.xpValue)}
                          className="text-xs py-1 h-8"
                        >
                          Claim Badge (+{ach.xpValue} XP)
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

