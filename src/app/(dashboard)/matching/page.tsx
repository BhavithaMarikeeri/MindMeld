"use client";

import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { calculateCompatibility, getTopMatches } from "@/lib/algorithms/matching";
import { StudentProfile, MatchScoreBreakdown } from "@/types";
import {
  Sparkles,
  Users,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  Layers,
  HeartHandshake,
  UserPlus,
  Compass,
  Sliders
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MatchingPage() {
  const { currentUser, allStudents, sendConnectionRequest, connectionRequests } = useDemoStore();
  const { toast } = useToast();

  const otherStudents = useMemo(() => {
    return allStudents.filter((s) => s.id !== currentUser.id);
  }, [allStudents, currentUser]);

  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    otherStudents[0]?.id || ""
  );

  const selectedTarget = useMemo(() => {
    return otherStudents.find((s) => s.id === selectedTargetId) || otherStudents[0];
  }, [otherStudents, selectedTargetId]);

  const matchBreakdown: MatchScoreBreakdown = useMemo(() => {
    if (!selectedTarget) {
      return {
        totalScore: 0,
        skillComplementarity: 0,
        sharedInterests: 0,
        projectGoals: 0,
        availabilityMatch: 0,
        experienceCompatibility: 0,
        collaborationPreferences: 0,
        overlapSkills: [],
        complementarySkills: [],
        sharedInterestsList: [],
        sharedGoalsList: [],
        explanation: "Select a student to compare."
      };
    }
    return calculateCompatibility(currentUser, selectedTarget);
  }, [currentUser, selectedTarget]);

  // Top 5 matches ranked
  const topMatches = useMemo(() => {
    return getTopMatches(currentUser, allStudents, 5);
  }, [currentUser, allStudents]);

  const handleConnect = (student: StudentProfile) => {
    try {
      sendConnectionRequest(student.id, "Hey! Evaluated our compatibility on the AI matching engine and would love to build together.");
      toast({
        title: "Connection Request Dispatched",
        description: `Sent invitation to ${student.fullName}.`,
        type: "success"
      });
    } catch (err: any) {
      toast({
        title: "Notice",
        description: err.message,
        type: "info"
      });
    }
  };

  const isPending = connectionRequests.some(
    (r) => r.senderId === currentUser.id && r.receiverId === selectedTarget?.id && r.status === "pending"
  );

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Sparkles className="h-7 w-7 text-violet-400" />
            AI Compatibility Matching Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explainable 6-dimensional synergy calculator predicting cross-functional hackathon and startup success.
          </p>
        </div>

        <Badge variant="cyan" className="py-1 px-3 text-xs w-fit">
          Deterministic 6-Factor Algorithm
        </Badge>
      </div>

      {/* Main Grid: Comparison Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Top Suggested Collaborators */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="glass-panel border-violet-500/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400" />
                Top Suggested Collaborators
              </CardTitle>
              <CardDescription>Ranked by highest composite synergy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {topMatches.map(({ student, match }, index) => {
                const isSelected = student.id === selectedTarget?.id;
                return (
                  <button
                    key={student.id}
                    onClick={() => setSelectedTargetId(student.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-violet-950/60 border-violet-400 shadow-glow-violet"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="text-xs font-mono font-bold text-slate-500">
                        #{index + 1}
                      </div>
                      <img
                        src={student.avatarUrl}
                        alt={student.fullName}
                        className="h-10 w-10 rounded-full object-cover border border-violet-400/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {student.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {student.preferredRole} • {student.college.split(" ")[0]}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-heading font-black text-cyan-300">
                        {match.totalScore}%
                      </div>
                      <div className="text-[9px] text-slate-400">Match</div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right: In-Depth Side-by-Side Breakdown */}
        {selectedTarget && (
          <div className="lg:col-span-8 space-y-6">
            {/* Header Comparison Banner */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Person A (You) */}
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="h-14 w-14 rounded-2xl object-cover border-2 border-violet-400"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-violet-400">
                      You
                    </span>
                    <h3 className="font-heading text-base font-bold text-white">
                      {currentUser.fullName}
                    </h3>
                    <div className="text-xs text-slate-400">{currentUser.preferredRole}</div>
                  </div>
                </div>

                {/* Score Pill in Center */}
                <div className="text-center px-6 py-3 rounded-2xl bg-slate-900/90 border border-violet-500/50 shadow-glow-violet">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Compatibility
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                    {matchBreakdown.totalScore}%
                  </div>
                </div>

                {/* Person B (Candidate) */}
                <div className="flex items-center gap-4 text-center sm:text-right">
                  <div className="order-2 sm:order-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400">
                      Collaborator
                    </span>
                    <h3 className="font-heading text-base font-bold text-white">
                      {selectedTarget.fullName}
                    </h3>
                    <div className="text-xs text-slate-400">{selectedTarget.preferredRole}</div>
                  </div>
                  <img
                    src={selectedTarget.avatarUrl}
                    alt={selectedTarget.fullName}
                    className="h-14 w-14 rounded-2xl object-cover border-2 border-cyan-400 order-1 sm:order-2"
                  />
                </div>
              </div>

              {/* Explainability Callout */}
              <div className="mt-6 p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Why this match works: </strong>
                  {matchBreakdown.explanation}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleConnect(selectedTarget)}
                >
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  {isPending ? "Connection Pending" : `Connect with ${selectedTarget.fullName.split(" ")[0]}`}
                </Button>
              </div>
            </div>

            {/* 6-Dimension Progress Bars Breakdown */}
            <Card className="glass-card border-violet-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-white">
                  6-Factor Dimension Scorecard
                </CardTitle>
                <CardDescription>
                  Normalized weighting breakdown against your profile criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 1. Skills (30%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Skill Complementarity</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.skillComplementarity} / 30 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                      style={{ width: `${(matchBreakdown.skillComplementarity / 30) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 2. Shared Interests (20%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Shared Interests</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.sharedInterests} / 20 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full"
                      style={{ width: `${(matchBreakdown.sharedInterests / 20) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 3. Project Goals (20%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Project Goals Alignment</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.projectGoals} / 20 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-pink-600 to-rose-500 rounded-full"
                      style={{ width: `${(matchBreakdown.projectGoals / 20) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 4. Availability (15%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Weekly Availability Synchronization</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.availabilityMatch} / 15 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full"
                      style={{ width: `${(matchBreakdown.availabilityMatch / 15) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 5. Experience (10%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Experience Level Synergy</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.experienceCompatibility} / 10 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"
                      style={{ width: `${(matchBreakdown.experienceCompatibility / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 6. Collaboration Preferences (5%) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Role & Domain Preferences</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {matchBreakdown.collaborationPreferences} / 5 pts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full"
                      style={{ width: `${(matchBreakdown.collaborationPreferences / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overlapping vs. Complementary Skills Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="glass-card border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Shared Common Ground (Overlap)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {matchBreakdown.overlapSkills.length > 0 ? (
                      matchBreakdown.overlapSkills.map((sk) => (
                        <Badge key={sk} variant="emerald" className="text-xs">
                          {sk}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No overlapping frameworks.</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    Complementary Superpowers Added
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {matchBreakdown.complementarySkills.length > 0 ? (
                      matchBreakdown.complementarySkills.map((sk) => (
                        <Badge key={sk} variant="cyan" className="text-xs">
                          +{sk}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Skills are identical.</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

