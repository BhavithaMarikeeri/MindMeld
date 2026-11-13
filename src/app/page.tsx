"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConstellationCanvas } from "@/components/network/ConstellationCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Users,
  Dices,
  Trophy,
  Network,
  Cpu,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Layers,
  Zap,
  Target,
  Clock,
  Award
} from "lucide-react";

export default function LandingPage() {
  const [activeFormulaTab, setActiveFormulaTab] = useState<number>(0);

  const formulaFactors = [
    {
      name: "Skill Complementarity",
      weight: "30%",
      color: "from-violet-500 to-indigo-500",
      description: "Balances common baseline frameworks with unique specialized superpowers so your squad has end-to-end execution coverage."
    },
    {
      name: "Shared Interests",
      weight: "20%",
      color: "from-cyan-500 to-blue-500",
      description: "Aligns personal technical passions (e.g. AI research, Web3, Hackathons, Open Source) to ensure shared intrinsic motivation."
    },
    {
      name: "Project Goals",
      weight: "20%",
      color: "from-pink-500 to-rose-500",
      description: "Synchronizes milestone expectations—whether aiming for a 48-hr hackathon victory, publishing a paper, or founding a venture-backed startup."
    },
    {
      name: "Availability Alignment",
      weight: "15%",
      color: "from-emerald-500 to-teal-500",
      description: "Harmonizes weekly commitment hours to eliminate unequal workload distribution and asynchronous communication delays."
    },
    {
      name: "Experience Compatibility",
      weight: "10%",
      color: "from-amber-500 to-orange-500",
      description: "Pairs students for optimal peer velocity or productive senior-junior mentorship ratios."
    },
    {
      name: "Collaboration Preferences",
      weight: "5%",
      color: "from-purple-500 to-fuchsia-500",
      description: "Matches cross-functional role selections (Frontend, Backend, Design, Research) so everyone fills their sweet spot."
    }
  ];

  const testimonials = [
    {
      quote: "MINDMELD paired me with an AI researcher from CMU and a designer from Berkeley. We took 1st place in the TreeHacks Healthcare track within 3 weeks of connecting.",
      author: "Aria Vance",
      role: "AI/ML Engineer",
      school: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The Team Roulette feature is magic. It formed our 4-person squad with zero role overlap. The kanban workspace and skill gap recommendations kept us on track through launch.",
      author: "Marcus Sterling",
      role: "Full-Stack Lead",
      school: "MIT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "As a designer, it used to be impossible to find engineers who cared about UI polish. Here, the compatibility score actually understood our complementary work styles.",
      author: "Elena Rostova",
      role: "UI/UX Designer",
      school: "UC Berkeley",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark text-slate-100 relative selection:bg-violet-600 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-24 cyber-grid">
        <ConstellationCanvas />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-medium mb-8 shadow-glow-violet animate-fade-in">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-spin-slow" />
            <span>The Intelligent Collegiate Collaboration Network</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-cyan-300">Live Demo Ready</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Your next great idea starts with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(139,92,246,0.3)]">
              right people.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            MINDMELD connects ambitious college students based on verified skills, cognitive personality archetypes, project ambitions, and weekly availability. Form winning hackathon squads and venture-backed teams.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto group">
                <span>Launch Engine (Free Demo)</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/discover" className="w-full sm:w-auto">
              <Button size="lg" variant="cyber" className="w-full sm:w-auto">
                <Compass className="h-5 w-5 text-cyan-400" />
                <span>Explore Student Network</span>
              </Button>
            </Link>
          </div>

          {/* Live Platform Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80">
            <div className="glass-panel p-4 rounded-xl text-center border-violet-500/20">
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">2,450+</div>
              <div className="text-xs text-slate-400 mt-1">Active Innovators</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border-cyan-500/20">
              <div className="text-2xl sm:text-3xl font-heading font-black text-cyan-300">680+</div>
              <div className="text-xs text-slate-400 mt-1">Squads Assembled</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border-pink-500/20">
              <div className="text-2xl sm:text-3xl font-heading font-black text-pink-300">94%</div>
              <div className="text-xs text-slate-400 mt-1">Match Compatibility</div>
            </div>
            <div className="glass-panel p-4 rounded-xl text-center border-emerald-500/20">
              <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-300">1,200+</div>
              <div className="text-xs text-slate-400 mt-1">Missions Solved</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative border-t border-violet-500/20 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="violet" className="mb-3">
              Frictionless Process
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              How MINDMELD Powers Cross-Disciplinary Breakthroughs
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              From discovering potential teammates to shipping production code in shared workspaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-violet-500/20">
              <div className="h-10 w-10 rounded-xl bg-violet-600/30 flex items-center justify-center text-violet-400 font-bold mb-4 font-heading border border-violet-500/30">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Build Your Identity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Showcase your technical stack, weekly availability, project ambitions, and take our 2-minute personality quiz to uncover your collaboration archetype.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-cyan-500/20">
              <div className="h-10 w-10 rounded-xl bg-cyan-600/30 flex items-center justify-center text-cyan-400 font-bold mb-4 font-heading border border-cyan-500/30">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">6-Factor AI Matching</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our transparent algorithm analyzes skill complementarity, goal alignment, and working style to surface high-synergy partners.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-pink-500/20">
              <div className="h-10 w-10 rounded-xl bg-pink-600/30 flex items-center justify-center text-pink-400 font-bold mb-4 font-heading border border-pink-500/30">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Team Roulette</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Need a full squad fast? Select your domain and team size. Our automated engine assembles a balanced squad with zero duplicate roles.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl relative overflow-hidden border-emerald-500/20">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/30 flex items-center justify-center text-emerald-400 font-bold mb-4 font-heading border border-emerald-500/30">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Execute & Level Up</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Collaborate in dedicated team workspaces, conquer curated missions, track tasks on kanban boards, and earn XP and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI MATCHING EXPLANATION */}
      <section id="ai-matching" className="py-24 relative border-t border-violet-500/20 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="cyan" className="mb-2">
                Transparent & Explainable
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                No Black Boxes. <br />
                <span className="text-gradient-cyan">A 6-Dimensional Matching Engine.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Great teams aren't formed by random luck or identical resumes. MINDMELD calculates a normalized 0-100 compatibility score using weighted dimensions that balance shared vision with complementary technical capabilities.
              </p>

              <div className="pt-4 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Differentiates between overlapping and complementary skills</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Harmonizes weekly availability to avoid burnt-out teams</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Provides clear human-readable explanations for every match</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/matching">
                  <Button variant="secondary" size="md">
                    <span>Try Compatibility Calculator</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive Dimension Tabs & Preview */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Algorithm Breakdown</h3>
                    <p className="text-xs text-slate-400">Click a dimension to see how weights are scored</p>
                  </div>
                  <div className="text-right font-mono text-cyan-400 text-sm font-semibold">
                    Total: 100%
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {formulaFactors.map((factor, idx) => (
                    <button
                      key={factor.name}
                      onClick={() => setActiveFormulaTab(idx)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        activeFormulaTab === idx
                          ? "bg-violet-900/40 border-violet-500 shadow-glow-violet text-white"
                          : "bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div className="text-xs font-semibold">{factor.name}</div>
                      <div className="text-lg font-bold font-heading text-cyan-300 mt-1">
                        {factor.weight}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">
                      {formulaFactors[activeFormulaTab].name}
                    </span>
                    <Badge variant="cyan">
                      Weight: {formulaFactors[activeFormulaTab].weight}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {formulaFactors[activeFormulaTab].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE FEATURES SHOWCASE */}
      <section id="features" className="py-24 relative border-t border-violet-500/20 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="magenta" className="mb-3">
              Full Suite Architecture
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Everything Your Squad Needs to Build Fast
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Designed from the ground up to replace fragmented Google Forms, discord servers, and awkward hackathon pitch sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="glass-card border-violet-500/20 hover:border-violet-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
                  <Dices className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">Team Roulette</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  An exciting animated formation tool. Choose team size, project domain, and formation mode. Intelligently assigns roles like Frontend, Backend, AI/ML, and Project Manager.
                </p>
                <Link href="/roulette" className="text-xs text-violet-400 hover:text-violet-300 font-semibold inline-flex items-center gap-1">
                  Launch Roulette <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="glass-card border-cyan-500/20 hover:border-cyan-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Network className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">Connection Universe</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  An interactive 2D graph network powered by React Flow. Visualize student connections, filter by university or domain, zoom, pan, and inspect profiles on click.
                </p>
                <Link href="/universe" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1">
                  Explore Universe <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="glass-card border-pink-500/20 hover:border-pink-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-400 mb-5 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">Skill Gap Analyzer</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Audits your squad's technical stack against domain standards. Pinpoints missing critical capabilities and recommends specific student profiles to recruit.
                </p>
                <Link href="/skill-gap" className="text-xs text-pink-400 hover:text-pink-300 font-semibold inline-flex items-center gap-1">
                  Analyze Gaps <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="glass-card border-emerald-500/20 hover:border-emerald-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">AI Project Ideas</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Generates high-impact startup and hackathon project concepts calibrated to your squad members' combined strengths with complete architecture breakdowns.
                </p>
                <Link href="/ideas" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                  Generate Ideas <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="glass-card border-amber-500/20 hover:border-amber-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">Gamification & XP</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Earn XP for connecting, completing workspace tasks, and solving missions. Unlock rare tier badges, maintain daily streaks, and climb global collegiate leaderboards.
                </p>
                <Link href="/leaderboard" className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1">
                  View Leaderboard <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="glass-card border-purple-500/20 hover:border-purple-400/60 transition-all group">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">Team Workspaces</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  Dedicated squad environments with 4-stage Kanban task management, member role assignments, goal milestones, and team messaging.
                </p>
                <Link href="/teams" className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1">
                  Open Workspaces <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section className="py-24 relative border-t border-violet-500/20 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="cyan" className="mb-3">
              Sample Case Studies
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Trusted by Collegiate Hackers & Founders
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Demonstrating real collaboration workflows from sample top university profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between">
                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="h-11 w-11 rounded-full object-cover border border-violet-400/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-xs text-slate-400">{t.role} • {t.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-20 relative border-t border-violet-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/40 via-cyber-dark to-cyan-950/40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to find your future co-founders?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop coding in isolation. Join thousands of student builders discovering compatible teammates, launching startup missions, and shipping real software.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto group">
                <span>Enter Mindmeld Dashboard</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create Free Student Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

