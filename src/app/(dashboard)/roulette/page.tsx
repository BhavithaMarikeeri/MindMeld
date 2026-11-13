"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { generateTeamFromCandidates, GeneratedTeamResult } from "@/lib/algorithms/roulette";
import { ProjectDomain, Team } from "@/types";
import {
  Dices,
  Sparkles,
  Users,
  Shield,
  Zap,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Crown,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RoulettePage() {
  const router = useRouter();
  const { allStudents, currentUser, createTeam } = useDemoStore();
  const { toast } = useToast();

  const [teamSize, setTeamSize] = useState<number>(4);
  const [domain, setDomain] = useState<ProjectDomain>("Artificial Intelligence");
  const [formationMode, setFormationMode] = useState<"compatibility" | "random">("compatibility");
  const [isSpinning, setIsSpinning] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedTeamResult | null>(null);

  const domainsList: ProjectDomain[] = [
    "Artificial Intelligence",
    "Healthcare",
    "Education",
    "FinTech",
    "Cybersecurity",
    "Smart Cities",
    "Environment",
    "Social Impact",
    "Developer Tools"
  ];

  const handleSpinRoulette = () => {
    setIsSpinning(true);

    setTimeout(() => {
      try {
        const result = generateTeamFromCandidates({
          candidates: allStudents,
          teamSize,
          domain,
          mode: formationMode
        });
        setGeneratedResult(result);
        toast({
          title: "Squad Assembled!",
          description: `Formed "${result.name}" with ${result.avgCompatibilityScore}% team synergy.`,
          type: "success"
        });
      } catch (err: any) {
        toast({
          title: "Roulette Error",
          description: err.message || "Failed to generate squad.",
          type: "error"
        });
      } finally {
        setIsSpinning(false);
      }
    }, 1200);
  };

  const handleSaveTeam = () => {
    if (!generatedResult) return;

    const newTeamId = `team-${Date.now()}`;
    const leaderMember = generatedResult.members.find((m) => m.isLeader) || generatedResult.members[0];

    const newTeam: Team = {
      id: newTeamId,
      name: generatedResult.name,
      tagline: generatedResult.tagline,
      description: `A cross-functional ${generatedResult.domain} team assembled via Team Roulette.`,
      domain: generatedResult.domain,
      leaderId: leaderMember.student.id,
      members: generatedResult.members.map((m) => ({
        id: `tm-${Date.now()}-${m.student.id}`,
        teamId: newTeamId,
        studentId: m.student.id,
        student: m.student,
        role: m.assignedRole,
        isLeader: m.isLeader,
        joinedAt: new Date().toISOString()
      })),
      maxMembers: teamSize,
      techStack: generatedResult.coveredSkills.slice(0, 5),
      projectGoals: [`Build prototype in ${domain}`, "Compete in collegiate innovation mission"],
      compatibilityScore: generatedResult.avgCompatibilityScore,
      createdAt: new Date().toISOString(),
      status: "in_progress",
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
    };

    createTeam(newTeam);
    toast({
      title: "Team Saved to Workspace!",
      description: `"${newTeam.name}" is now live in your workspaces. +50 XP awarded!`,
      type: "success"
    });

    router.push(`/teams/${newTeamId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Dices className="h-7 w-7 text-cyan-400" />
            Team Roulette – Instant Squad Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Assemble balanced, cross-functional collegiate squads with zero role duplication and explainable skill coverage.
          </p>
        </div>

        <Badge variant="violet" className="py-1 px-3 text-xs w-fit">
          Signature Feature
        </Badge>
      </div>

      {/* Configuration Controls Bar */}
      <div className="glass-panel p-6 rounded-3xl border-violet-500/25 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Team Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Team Size: <strong className="text-cyan-300">{teamSize} Members</strong>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[2, 3, 4, 5, 6].map((size) => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    teamSize === size
                      ? "bg-violet-600 border-violet-400 text-white shadow-glow-violet"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Project Domain Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target Project Domain</label>
            <select
              className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-medium"
              value={domain}
              onChange={(e) => setDomain(e.target.value as any)}
            >
              {domainsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Formation Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Formation Engine</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormationMode("compatibility")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  formationMode === "compatibility"
                    ? "bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-glow-cyan"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                AI Synergy
              </button>
              <button
                onClick={() => setFormationMode("random")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  formationMode === "random"
                    ? "bg-pink-600/30 border-pink-400 text-pink-200"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Wildcard Shuffle
              </button>
            </div>
          </div>
        </div>

        {/* Generate / Spin Action */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Pool: <strong className="text-slate-200">{allStudents.length} Verified Student Profiles</strong> across Stanford, MIT, Berkeley, CMU & Waterloo.
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleSpinRoulette}
            isLoading={isSpinning}
            className="w-full sm:w-auto"
          >
            <Dices className="h-5 w-5 mr-2" />
            <span>Spin & Form Squad</span>
          </Button>
        </div>
      </div>

      {/* Generated Team Showcase */}
      {isSpinning && (
        <div className="py-20 text-center glass-panel rounded-3xl border-cyan-500/30 animate-pulse">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-cyan-600/20 flex items-center justify-center text-cyan-400 mb-4 animate-spin-slow">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white">Synthesizing Complementary Squad...</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Balancing frontend/backend contracts, cross-domain skills, and leadership roles.
          </p>
        </div>
      )}

      {!isSpinning && generatedResult && (
        <div className="space-y-6 animate-scale-in">
          {/* Squad Header Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="cyan">{generatedResult.domain}</Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    {generatedResult.members.length} Members Assembled
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  {generatedResult.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  "{generatedResult.tagline}"
                </p>
              </div>

              {/* Team Synergy Gauge */}
              <div className="text-right p-4 rounded-2xl bg-slate-900/80 border border-violet-500/30 shrink-0">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Squad Synergy
                </div>
                <div className="text-3xl font-heading font-black text-cyan-400">
                  {generatedResult.avgCompatibilityScore}%
                </div>
              </div>
            </div>

            {/* Members Cards Row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {generatedResult.members.map((member) => (
                <div
                  key={member.student.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    member.isLeader
                      ? "bg-violet-950/40 border-violet-400/80 shadow-glow-violet"
                      : "bg-slate-900/70 border-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="relative">
                        <img
                          src={member.student.avatarUrl}
                          alt={member.student.fullName}
                          className="h-12 w-12 rounded-xl object-cover border border-violet-400/40"
                        />
                        {member.isLeader && (
                          <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-sm">
                            <Crown className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <Badge variant={member.isLeader ? "amber" : "cyan"} className="text-[10px]">
                        {member.assignedRole}
                      </Badge>
                    </div>

                    <h4 className="font-heading text-sm font-bold text-white">
                      {member.student.fullName}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {member.student.college.split(" ")[0]} • {member.student.academicYear}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {member.student.skills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Individual Match:</span>
                    <strong className="text-cyan-300 font-mono">{member.matchScoreWithTeam}%</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Missing Skills Breakdown */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Key Squad Strengths
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {generatedResult.strengths.map((str, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  Skill Gap Advisory
                </div>
                {generatedResult.missingSkills.length > 0 ? (
                  <p className="text-xs text-slate-300">
                    Consider recruiting or upskilling in:{" "}
                    <strong>{generatedResult.missingSkills.join(", ")}</strong> to maximize {generatedResult.domain} efficiency.
                  </p>
                ) : (
                  <p className="text-xs text-slate-300">
                    Excellent skill coverage across the entire {generatedResult.domain} lifecycle.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions: Save Squad or Re-roll */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-800">
              <Button
                variant="outline"
                size="md"
                onClick={handleSpinRoulette}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Re-roll Squad</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSaveTeam}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                <span>Save Squad & Open Workspace (+50 XP)</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

