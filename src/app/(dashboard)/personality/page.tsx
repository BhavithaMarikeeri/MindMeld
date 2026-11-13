"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { DemoStore } from "@/lib/demo/store";
import { useToast } from "@/components/ui/toast";
import {
  PERSONALITY_QUIZ_QUESTIONS,
  computePersonalityProfile
} from "@/lib/algorithms/personality";
import { PersonalityProfile } from "@/types";
import {
  HeartHandshake,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  Zap,
  Target,
  RefreshCw,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PersonalityQuizPage() {
  const { currentUser, updateProfile } = useDemoStore();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: number; selectedOptionIndex: number }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(!!currentUser.personality);
  const [resultProfile, setResultProfile] = useState<PersonalityProfile | null>(
    currentUser.personality || null
  );

  const currentQ = PERSONALITY_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updated = [
      ...selectedAnswers.filter((a) => a.questionId !== currentQ.id),
      { questionId: currentQ.id, selectedOptionIndex: optionIndex }
    ];
    setSelectedAnswers(updated);

    if (currentQuestionIndex < PERSONALITY_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final archetype
      const computed = computePersonalityProfile(updated);
      setResultProfile(computed);
      setQuizCompleted(true);
      updateProfile({ personality: computed });
      DemoStore.awardXP(currentUser.id, 75, "Completed Collaboration Personality Quiz");

      toast({
        title: "Archetype Unlocked!",
        description: `You are "${computed.archetype}". +75 XP awarded!`,
        type: "success"
      });
    }
  };

  const handleRetake = () => {
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <HeartHandshake className="h-7 w-7 text-pink-400" />
            Collaboration Personality Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover your teamwork archetype and align with peers who balance your cognitive strengths.
          </p>
        </div>

        <Badge variant="violet" className="py-1 px-3 text-xs w-fit">
          Empirical Cognitive Profile
        </Badge>
      </div>

      {!quizCompleted ? (
        /* Quiz Interface */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Question {currentQuestionIndex + 1} of {PERSONALITY_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-cyan-400 font-mono">
              {Math.round(((currentQuestionIndex + 1) / PERSONALITY_QUIZ_QUESTIONS.length) * 100)}% Completed
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / PERSONALITY_QUIZ_QUESTIONS.length) * 100}%`
              }}
            />
          </div>

          <Card className="glass-panel border-violet-500/30">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/60 hover:bg-violet-950/30 text-left transition-all group"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {opt.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Result Showcase */
        resultProfile && (
          <div className="max-w-3xl mx-auto space-y-6 animate-scale-in">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/40 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Badge variant="cyan" className="mb-2">
                    Verified Archetype
                  </Badge>
                  <h2 className="font-heading text-3xl font-black text-white">
                    {resultProfile.archetype}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 italic">
                    "{resultProfile.tagline}"
                  </p>
                </div>

                <Button variant="outline" size="sm" onClick={handleRetake}>
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Retake Quiz
                </Button>
              </div>

              {/* Trait Gauges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Teamwork</div>
                  <div className="text-xl font-heading font-black text-violet-400 mt-1">
                    {resultProfile.traits.teamwork}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Leadership</div>
                  <div className="text-xl font-heading font-black text-cyan-400 mt-1">
                    {resultProfile.traits.leadership}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Communication</div>
                  <div className="text-xl font-heading font-black text-pink-400 mt-1">
                    {resultProfile.traits.communication}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Problem Solving</div>
                  <div className="text-xl font-heading font-black text-emerald-400 mt-1">
                    {resultProfile.traits.problemSolving}%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400">Adaptability</div>
                  <div className="text-xl font-heading font-black text-amber-400 mt-1">
                    {resultProfile.traits.adaptability}%
                  </div>
                </div>
              </div>

              {/* Working Style & Strengths */}
              <div className="mt-6 space-y-4 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <strong className="text-white block mb-1">Preferred Collaboration Dynamic:</strong>
                  {resultProfile.preferredWorkStyle}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <strong className="text-emerald-300 block mb-2 font-bold">Key Strengths:</strong>
                    <ul className="space-y-1">
                      {resultProfile.strengths.map((str, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                    <strong className="text-amber-300 block mb-2 font-bold">Growth Areas:</strong>
                    <ul className="space-y-1">
                      {resultProfile.growthAreas.map((gr, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <Target className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>{gr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

