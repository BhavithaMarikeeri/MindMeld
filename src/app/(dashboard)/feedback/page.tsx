"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import {
  MessageCircleQuestion,
  ShieldCheck,
  Star,
  Send,
  Sparkles,
  Users2,
  Lock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AnonymousFeedbackPage() {
  const { teams, currentUser, allStudents, feedback, submitFeedback } = useDemoStore();
  const { toast } = useToast();

  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || "");
  const [targetStudentId, setTargetStudentId] = useState<string>("");
  const [commRating, setCommRating] = useState<number>(5);
  const [relRating, setRelRating] = useState<number>(5);
  const [techRating, setTechRating] = useState<number>(5);
  const [spiritRating, setSpiritRating] = useState<number>(5);
  const [note, setNote] = useState<string>("");

  const currentTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];
  const eligibleTeammates = currentTeam
    ? currentTeam.members.filter((m) => m.studentId !== currentUser.id)
    : [];

  // Feedback received by current student
  const receivedFeedback = feedback.filter((f) => f.targetStudentId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudentId) {
      toast({
        title: "Teammate Required",
        description: "Please select a teammate to review.",
        type: "error"
      });
      return;
    }

    if (note.trim().length < 10) {
      toast({
        title: "Constructive Note Required",
        description: "Please provide at least 10 characters of constructive peer insight.",
        type: "error"
      });
      return;
    }

    submitFeedback({
      teamId: selectedTeamId,
      targetStudentId,
      ratings: {
        communication: commRating,
        reliability: relRating,
        technicalContribution: techRating,
        teamSpirit: spiritRating
      },
      constructiveNote: note.trim()
    });

    toast({
      title: "Anonymous Feedback Delivered",
      description: "Encrypted review saved. Your identity is permanently protected. +25 XP awarded!",
      type: "success"
    });

    setNote("");
    setTargetStudentId("");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <MessageCircleQuestion className="h-7 w-7 text-cyan-400" />
            Anonymous Peer Feedback & Growth
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Foster psychological safety and radical constructive candor with cryptographically anonymized teammate reviews.
          </p>
        </div>

        <Badge variant="cyan" className="py-1 px-3 text-xs w-fit">
          <Lock className="h-3.5 w-3.5 mr-1" /> Anonymity Protected
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Submit Peer Feedback */}
        <div className="lg:col-span-7">
          <Card className="glass-panel border-violet-500/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Submit Anonymous Review
              </CardTitle>
              <CardDescription>
                Your name and user ID are strictly scrubbed before delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Select Squad</label>
                    <select
                      className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                      value={selectedTeamId}
                      onChange={(e) => setSelectedTeamId(e.target.value)}
                    >
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Teammate to Review *</label>
                    <select
                      required
                      className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                      value={targetStudentId}
                      onChange={(e) => setTargetStudentId(e.target.value)}
                    >
                      <option value="">Choose peer...</option>
                      {eligibleTeammates.map((m) => (
                        <option key={m.studentId} value={m.studentId}>
                          {m.student?.fullName} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating Dimensions (1-5) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="space-y-1 text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Communication</span>
                    <select
                      className="w-full rounded bg-slate-950 border border-slate-700 text-xs text-white p-1 text-center font-bold"
                      value={commRating}
                      onChange={(e) => setCommRating(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Reliability</span>
                    <select
                      className="w-full rounded bg-slate-950 border border-slate-700 text-xs text-white p-1 text-center font-bold"
                      value={relRating}
                      onChange={(e) => setRelRating(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Technical</span>
                    <select
                      className="w-full rounded bg-slate-950 border border-slate-700 text-xs text-white p-1 text-center font-bold"
                      value={techRating}
                      onChange={(e) => setTechRating(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-semibold block">Team Spirit</span>
                    <select
                      className="w-full rounded bg-slate-950 border border-slate-700 text-xs text-white p-1 text-center font-bold"
                      value={spiritRating}
                      onChange={(e) => setSpiritRating(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Constructive Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Constructive Peer Insight *
                  </label>
                  <textarea
                    required
                    className="w-full min-h-[100px] rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    placeholder="Highlight what went brilliantly during the sprint and one actionable area where they can level up..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-cyan-400" />
                    <span>Submitted feedback is automatically checked against harassment guidelines.</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="md">
                    <Send className="h-4 w-4 mr-1.5" />
                    Submit Anonymously (+25 XP)
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Aggregated Feedback Received */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="glass-panel border-cyan-500/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Feedback Received</CardTitle>
              <CardDescription>
                Aggregated constructive reviews from your teammates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {receivedFeedback.length > 0 ? (
                receivedFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-300 font-bold font-mono">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                        <span>
                          {((fb.ratings.communication + fb.ratings.reliability + fb.ratings.technicalContribution + fb.ratings.teamSpirit) / 4).toFixed(1)} / 5.0 Average
                        </span>
                      </div>
                      <Badge variant="cyan" className="text-[9px]">Verified Peer</Badge>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      "{fb.constructiveNote}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-slate-400 glass-panel rounded-xl border-slate-800">
                  No teammate reviews received yet. As your squad completes deliverables, reviews will appear here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

