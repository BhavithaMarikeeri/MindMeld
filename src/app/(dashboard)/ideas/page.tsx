"use client";

import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { generateProjectIdeasForStudents } from "@/lib/algorithms/ideaGenerator";
import { GeneratedProjectIdea, StudentProfile } from "@/types";
import {
  Lightbulb,
  Sparkles,
  Zap,
  Bookmark,
  Check,
  CheckCircle2,
  Users,
  Layers,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function IdeasPage() {
  const { allStudents, currentUser, saveProjectIdea, savedIdeas } = useDemoStore();
  const { toast } = useToast();

  // Selected students to combine
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([
    currentUser.id,
    allStudents[1]?.id || ""
  ]);

  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedProjectIdea[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const selectedStudents = useMemo(() => {
    return allStudents.filter((s) => selectedStudentIds.includes(s.id));
  }, [allStudents, selectedStudentIds]);

  const toggleStudentSelection = (id: string) => {
    if (selectedStudentIds.includes(id)) {
      if (selectedStudentIds.length > 1) {
        setSelectedStudentIds(selectedStudentIds.filter((s) => s !== id));
      }
    } else {
      if (selectedStudentIds.length < 5) {
        setSelectedStudentIds([...selectedStudentIds, id]);
      } else {
        toast({
          title: "Max 5 Squad Members",
          description: "Select up to 5 members to synthesize a focused architecture.",
          type: "info"
        });
      }
    }
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const ideas = generateProjectIdeasForStudents(selectedStudents);
      setGeneratedIdeas(ideas);
      setIsSynthesizing(false);
      toast({
        title: "Ideas Generated!",
        description: `Synthesized ${ideas.length} high-potential project concepts.`,
        type: "success"
      });
    }, 800);
  };

  const handleSave = (idea: GeneratedProjectIdea) => {
    saveProjectIdea(idea);
    toast({
      title: "Project Idea Saved",
      description: `Saved "${idea.title}" to your idea notebook.`,
      type: "success"
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Lightbulb className="h-7 w-7 text-emerald-400" />
            AI Project Idea Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Combines team members' multi-disciplinary skills to engineer novel startup and hackathon project proposals.
          </p>
        </div>

        <Badge variant="emerald" className="py-1 px-3 text-xs w-fit">
          Cross-Skill Synthesis
        </Badge>
      </div>

      {/* Member Selection Control Panel */}
      <div className="glass-panel p-6 rounded-3xl border-violet-500/25 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Combine Team Members ({selectedStudents.length} selected, max 5):
          </span>
          <span className="text-xs text-slate-400">Click to toggle collaborators</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allStudents.map((student) => {
            const isSelected = selectedStudentIds.includes(student.id);
            return (
              <button
                key={student.id}
                onClick={() => toggleStudentSelection(student.id)}
                className={`p-2 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-medium ${
                  isSelected
                    ? "bg-violet-950/80 border-violet-400 text-white shadow-glow-violet"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <img
                  src={student.avatarUrl}
                  alt={student.fullName}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span>{student.fullName}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-violet-400" />}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="md"
            isLoading={isSynthesizing}
            onClick={handleSynthesize}
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            <span>Synthesize Project Ideas</span>
          </Button>
        </div>
      </div>

      {/* Generated Ideas Showcase */}
      {generatedIdeas.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-heading text-lg font-bold text-white">
            Synthesized Breakthrough Concepts ({generatedIdeas.length})
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {generatedIdeas.map((idea) => {
              const isSaved = savedIdeas.some((i) => i.id === idea.id);

              return (
                <Card key={idea.id} className="glass-panel border-violet-500/30">
                  <CardContent className="p-6 sm:p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="cyan">{idea.difficulty}</Badge>
                          <Badge variant="emerald">
                            Innovation Score: {idea.innovationScore}/100
                          </Badge>
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl font-black text-white">
                          {idea.title}
                        </h3>
                      </div>

                      <Button
                        size="sm"
                        variant={isSaved ? "ghost" : "outline"}
                        disabled={isSaved}
                        onClick={() => handleSave(idea)}
                        className="shrink-0"
                      >
                        <Bookmark className="h-4 w-4 mr-1.5" />
                        {isSaved ? "Saved in Notebook" : "Save Idea"}
                      </Button>
                    </div>

                    {/* Problem Statement & Proposed Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <strong className="text-white block mb-1">Problem Statement:</strong>
                        <p className="leading-relaxed opacity-90">{idea.problemStatement}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/30">
                        <strong className="text-violet-300 block mb-1">Proposed Architecture:</strong>
                        <p className="leading-relaxed opacity-90">{idea.proposedSolution}</p>
                      </div>
                    </div>

                    {/* Impact Callout */}
                    <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 shrink-0" />
                      <span>Potential Market & Civic Impact: {idea.potentialImpact}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Recommended Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {idea.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

