"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { Mission, MissionCategory, MissionDifficulty, ProjectDomain } from "@/types";
import {
  Trophy,
  Sparkles,
  Zap,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Clock,
  Layers,
  ShieldCheck,
  Users,
  Compass,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function MissionsPage() {
  const { missions, teams, currentUser, createMission } = useDemoStore();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [acceptedMissions, setAcceptedMissions] = useState<string[]>(["mis-1"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [assigningMission, setAssigningMission] = useState<Mission | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const categories: MissionCategory[] = [
    "Artificial Intelligence",
    "Healthcare",
    "Education",
    "FinTech",
    "Cybersecurity",
    "Smart Cities",
    "Environment",
    "Social Impact"
  ];

  const difficulties: MissionDifficulty[] = ["Easy", "Medium", "Hard", "Expert"];

  const filteredMissions = missions.filter((m) => {
    if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
    if (selectedDifficulty !== "all" && m.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
      toast({ title: "Removed from Saved Missions", type: "info" });
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast({ title: "Mission Saved to Favorites", type: "success" });
    }
  };

  const handleAcceptMission = (id: string, title: string) => {
    if (!acceptedMissions.includes(id)) {
      setAcceptedMissions([...acceptedMissions, id]);
      toast({
        title: "Challenge Mission Accepted!",
        description: `Your squad is now tackling "${title}". +20 XP awarded!`,
        type: "success"
      });
    }
  };

  const handleGenerateRandom = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const domains: ProjectDomain[] = [
        "Artificial Intelligence",
        "Healthcare",
        "FinTech",
        "Environment",
        "Education",
        "Cybersecurity"
      ];
      const diffs: MissionDifficulty[] = ["Medium", "Hard", "Expert"];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomDiff = diffs[Math.floor(Math.random() * diffs.length)];

      const newId = `mis-gen-${Date.now()}`;
      const newMission: Mission = {
        id: newId,
        title: `Project Apex: Autonomous ${randomDomain} Resilience Engine`,
        problemStatement: `High latency and uncoordinated data pipelines cause 30%+ efficiency loss in modern ${randomDomain} operations.`,
        description: `Architect a real-time reactive streaming service that synthesizes incoming telemetry, flags anomalies, and displays verified action recommendations on a dark cyberpunk HUD.`,
        category: randomDomain,
        difficulty: randomDiff,
        suggestedSolutions: [
          "Event-driven microservice architecture with Kafka/MQTT",
          "Edge ML inference model with ONNX runtime",
          "Accessible WCAG AAA telemetry dashboard"
        ],
        recommendedTechStack: ["Python", "React", "Next.js", "Docker", "Tailwind CSS"],
        estimatedDuration: "2 weeks",
        requiredSkills: ["Python", "React", "Docker"],
        potentialImpact: `Accelerates resolution velocity by 4.5x and establishes a reproducible collegiate benchmark.`,
        xpReward: randomDiff === "Expert" ? 500 : randomDiff === "Hard" ? 350 : 200,
        isCustom: true
      };

      createMission(newMission);
      setIsGenerating(false);
      toast({
        title: "New Challenge Mission Generated!",
        description: `Generated "${newMission.title}". +15 XP!`,
        type: "success"
      });
    }, 700);
  };

  const handleAssignToTeam = () => {
    if (!assigningMission || !selectedTeamId) return;
    const team = teams.find((t) => t.id === selectedTeamId);
    toast({
      title: "Mission Assigned to Squad",
      description: `"${assigningMission.title}" assigned to ${team?.name || "your team"}.`,
      type: "success"
    });
    setAssigningMission(null);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Trophy className="h-7 w-7 text-pink-400" />
            Collegiate Mission Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Curated real-world startup and hackathon problem statements across 8 high-impact domains.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          isLoading={isGenerating}
          onClick={handleGenerateRandom}
        >
          <Sparkles className="h-4 w-4 mr-1.5" />
          <span>Generate New Mission (+15 XP)</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border-violet-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-300">Category:</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg font-medium border transition-colors ${
              selectedCategory === "all"
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Difficulty:</span>
          <select
            className="h-8 rounded-lg border border-slate-700 bg-slate-900 px-2.5 text-xs text-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMissions.map((mission) => {
          const isAccepted = acceptedMissions.includes(mission.id);
          const isSaved = bookmarkedIds.includes(mission.id);

          return (
            <Card
              key={mission.id}
              className={`glass-card flex flex-col justify-between transition-all ${
                isAccepted ? "border-emerald-500/50 shadow-glow-cyan" : "border-violet-500/20"
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="cyan" className="text-[10px]">
                        {mission.category}
                      </Badge>
                      <Badge
                        variant={
                          mission.difficulty === "Expert"
                            ? "magenta"
                            : mission.difficulty === "Hard"
                            ? "amber"
                            : "violet"
                        }
                        className="text-[10px]"
                      >
                        {mission.difficulty}
                      </Badge>
                      {isAccepted && (
                        <Badge variant="emerald" className="text-[10px]">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {mission.title}
                    </h3>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(mission.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-5 w-5 text-pink-400" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Problem & Description */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <strong className="text-white block mb-0.5">Problem Statement:</strong>
                    {mission.problemStatement}
                  </div>
                  <p className="leading-relaxed line-clamp-3">
                    {mission.description}
                  </p>
                </div>

                {/* Impact Callout */}
                <div className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>Impact: {mission.potentialImpact}</span>
                </div>

                {/* Tech Stack & Required Skills */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-semibold text-slate-400">
                    Recommended Technologies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mission.recommendedTechStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & XP Reward Banner */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold font-mono">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span>+{mission.xpReward} XP</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAssigningMission(mission)}
                      className="text-xs"
                    >
                      Assign to Squad
                    </Button>

                    <Button
                      variant={isAccepted ? "ghost" : "primary"}
                      size="sm"
                      disabled={isAccepted}
                      onClick={() => handleAcceptMission(mission.id, mission.title)}
                      className="text-xs"
                    >
                      {isAccepted ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Accepted
                        </span>
                      ) : (
                        "Accept Challenge"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assign Mission Modal */}
      {assigningMission && (
        <Dialog
          isOpen={!!assigningMission}
          onClose={() => setAssigningMission(null)}
          title="Assign Challenge to Team"
          description={`Link "${assigningMission.title}" to an active workspace`}
        >
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Select Squad Workspace</label>
              <select
                className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
              >
                <option value="">Choose team...</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.members.length} members)
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAssigningMission(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!selectedTeamId}
                onClick={handleAssignToTeam}
              >
                Confirm Assignment
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

