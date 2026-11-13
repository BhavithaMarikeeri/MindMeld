"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { analyzeTeamSkillGaps } from "@/lib/algorithms/skillGap";
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Users2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function SkillGapPage() {
  const { teams, allStudents, currentUser } = useDemoStore();

  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || "");

  const currentTeam = useMemo(() => {
    return teams.find((t) => t.id === selectedTeamId) || teams[0];
  }, [teams, selectedTeamId]);

  const analysis = useMemo(() => {
    if (!currentTeam) return null;
    return analyzeTeamSkillGaps(currentTeam);
  }, [currentTeam]);

  // Candidates who could fill the gap
  const recommendedCandidates = useMemo(() => {
    if (!analysis) return [];
    return allStudents
      .filter((s) => !currentTeam.members.some((m) => m.studentId === s.id))
      .filter((s) =>
        s.skills.some((sk) =>
          analysis.missingCriticalSkills.some((miss) => miss.toLowerCase() === sk.toLowerCase())
        )
      )
      .slice(0, 3);
  }, [allStudents, currentTeam, analysis]);

  if (!currentTeam || !analysis) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl border-slate-800">
        <Users2 className="h-12 w-12 text-slate-500 mx-auto mb-2" />
        <h3 className="text-white font-bold">No Squads Available for Audit</h3>
        <p className="text-xs text-slate-400 mt-1">Create or join a team first to run skill gap diagnostics.</p>
        <Link href="/roulette" className="mt-4 inline-block">
          <Button variant="primary" size="sm">
            Generate Squad via Roulette
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Cpu className="h-7 w-7 text-pink-400" />
            Squad Skill Gap Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Benchmarks your squad's technical stack against domain requirements to identify missing capabilities.
          </p>
        </div>

        {/* Squad Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Auditing Squad:</span>
          <select
            className="h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white font-semibold focus:outline-none"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.domain})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Diagnostic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Capability Radar Chart */}
        <div className="lg:col-span-6">
          <Card className="glass-panel border-violet-500/25 h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Domain Competency Radar</CardTitle>
                <CardDescription>Current squad capability vs. ideal benchmark</CardDescription>
              </div>
              <Badge variant="cyan">{analysis.coveragePercentage}% Domain Coverage</Badge>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center justify-center">
              <div className="h-72 w-full max-w-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analysis.radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                    <Radar
                      name="Current Squad"
                      dataKey="current"
                      stroke="#EC4899"
                      fill="#EC4899"
                      fillOpacity={0.4}
                    />
                    <Radar
                      name="Ideal Benchmark"
                      dataKey="ideal"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.15}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0d1127",
                        borderColor: "#ec4899",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "12px"
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 text-xs text-slate-400 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-pink-500" />
                  <span>Current Squad</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                  <span>Ideal Benchmark</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Recruitment Recommendation & Missing Skills */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="glass-panel border-pink-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-pink-300 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Target Recruitment Recommendation
              </CardTitle>
              <CardDescription>
                Role needed to bring squad coverage to 100%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-pink-950/30 border border-pink-500/40 text-xs sm:text-sm text-slate-200">
                <div className="font-bold text-white text-sm mb-1">
                  Recruit: {analysis.targetCandidateCriteria.roleTitle}
                </div>
                <p className="leading-relaxed opacity-90">
                  {analysis.targetCandidateCriteria.rationale}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 mb-1.5">
                  Critical Missing Skills:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingCriticalSkills.map((sk) => (
                    <Badge key={sk} variant="magenta" className="text-xs">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Candidates in Network */}
          <Card className="glass-panel border-cyan-500/25">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Available Students to Fill the Gap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recommendedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.fullName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{candidate.fullName}</div>
                      <div className="text-[10px] text-slate-400">{candidate.college.split(" ")[0]} • {candidate.preferredRole}</div>
                    </div>
                  </div>

                  <Link href="/discover">
                    <Button size="sm" variant="secondary" className="text-xs py-1 h-7">
                      Invite to Squad
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Learning Resources for Team */}
      <Card className="glass-card border-violet-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-violet-400" />
            Curated Upskilling & Learning Tracks
          </CardTitle>
          <CardDescription>
            High-leverage documentation and courses to close the technical gap during sprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.recommendedLearningResources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 transition-colors block group"
              >
                <div className="flex items-center justify-between text-xs text-violet-400 font-semibold mb-1">
                  <span>{res.skill}</span>
                  <Badge variant="violet" className="text-[9px]">{res.type}</Badge>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {res.resourceName}
                </div>
                <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <span>Open Resource</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

