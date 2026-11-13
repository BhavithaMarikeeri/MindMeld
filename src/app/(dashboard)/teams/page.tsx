"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { Team, ProjectDomain } from "@/types";
import {
  Users2,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Search,
  Compass,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function TeamsPage() {
  const { teams, currentUser, createTeam } = useDemoStore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New team form state
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamTagline, setNewTeamTagline] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamDomain, setNewTeamDomain] = useState<ProjectDomain>("Artificial Intelligence");
  const [newTeamMax, setNewTeamMax] = useState<number>(4);

  const filteredTeams = teams.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.domain.toLowerCase().includes(q) ||
      (t.tagline && t.tagline.toLowerCase().includes(q))
    );
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName || !newTeamDesc) {
      toast({
        title: "Validation Error",
        description: "Please enter a team name and description.",
        type: "error"
      });
      return;
    }

    const teamId = `team-${Date.now()}`;
    const newTeam: Team = {
      id: teamId,
      name: newTeamName,
      tagline: newTeamTagline || "Engineering future tech solutions",
      description: newTeamDesc,
      domain: newTeamDomain,
      leaderId: currentUser.id,
      members: [
        {
          id: `tm-${Date.now()}`,
          teamId,
          studentId: currentUser.id,
          student: currentUser,
          role: "Team Leader",
          isLeader: true,
          joinedAt: new Date().toISOString()
        }
      ],
      maxMembers: newTeamMax,
      techStack: currentUser.skills.slice(0, 4),
      projectGoals: ["Build MVP", "Deploy to production"],
      compatibilityScore: 92,
      createdAt: new Date().toISOString(),
      status: "in_progress",
      avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
    };

    createTeam(newTeam);
    toast({
      title: "Workspace Created!",
      description: `"${newTeam.name}" has been created. +50 XP awarded!`,
      type: "success"
    });

    setIsCreateModalOpen(false);
    setNewTeamName("");
    setNewTeamTagline("");
    setNewTeamDesc("");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Users2 className="h-7 w-7 text-violet-400" />
            Team Workspaces
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Collaborative environments featuring sprint Kanban boards, role matrices, skill gap diagnostics, and team chat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/roulette">
            <Button variant="cyber" size="sm">
              <Sparkles className="h-4 w-4 mr-1.5" />
              Spin Roulette
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create Squad
          </Button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Search teams by name or domain..."
          icon={<Search className="h-4 w-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => {
          const isMember = team.members.some((m) => m.studentId === currentUser.id);

          return (
            <Card
              key={team.id}
              className="glass-card border-violet-500/20 hover:border-violet-400/60 flex flex-col justify-between"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="violet" className="text-[10px]">
                        {team.domain}
                      </Badge>
                      {isMember && (
                        <Badge variant="emerald" className="text-[10px]">
                          Your Squad
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {team.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {team.compatibilityScore}%
                    </span>
                    <div className="text-[9px] text-slate-400">Synergy</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {team.tagline || team.description}
                </p>

                {/* Member Avatars */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-400">
                    Members ({team.members.length} / {team.maxMembers}):
                  </div>
                  <div className="flex items-center -space-x-2">
                    {team.members.map((m) => (
                      <img
                        key={m.id}
                        src={m.student?.avatarUrl}
                        alt={m.student?.fullName || "Member"}
                        title={`${m.student?.fullName} (${m.role})`}
                        className="h-8 w-8 rounded-full object-cover border-2 border-slate-900"
                      />
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {team.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link href={`/teams/${team.id}`} className="block">
                    <Button variant="secondary" size="sm" className="w-full text-xs">
                      <span>Enter Workspace</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Team Modal */}
      <Dialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Team Workspace"
        description="Establish a collaborative environment for your next collegiate project."
      >
        <form onSubmit={handleCreateTeam} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Team Name *</label>
            <Input
              required
              placeholder="e.g. Apex Neural Labs"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Tagline (Optional)</label>
            <Input
              placeholder="e.g. Building low latency clinical AI models"
              value={newTeamTagline}
              onChange={(e) => setNewTeamTagline(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Domain</label>
              <select
                className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:outline-none"
                value={newTeamDomain}
                onChange={(e) => setNewTeamDomain(e.target.value as any)}
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="FinTech">FinTech</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Smart Cities">Smart Cities</option>
                <option value="Social Impact">Social Impact</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Max Members</label>
              <select
                className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:outline-none"
                value={newTeamMax}
                onChange={(e) => setNewTeamMax(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Members
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Description *</label>
            <textarea
              required
              className="w-full min-h-[90px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:outline-none"
              placeholder="Outline project vision, expectations, and milestones..."
              value={newTeamDesc}
              onChange={(e) => setNewTeamDesc(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Team (+50 XP)
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

