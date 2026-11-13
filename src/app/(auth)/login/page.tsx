"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { Brain, Sparkles, Mail, Lock, ArrowRight, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const { switchUser, allStudents } = useDemoStore();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter your academic email and password.",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Find matching demo student or default to first
      const matched = allStudents.find((s) => s.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        switchUser(matched.id);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${matched.fullName}`,
          type: "success"
        });
      } else {
        // Fallback demo login
        switchUser("student-1");
        toast({
          title: "Demo Login Successful",
          description: "Logged in under default student persona (Aria Vance).",
          type: "success"
        });
      }
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const handleQuickDemoPersona = (studentId: string, name: string, role: string) => {
    switchUser(studentId);
    toast({
      title: "Demo Persona Activated",
      description: `Signed in as ${name} (${role})`,
      type: "success"
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-glow-violet">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-2xl font-black text-white tracking-wider">
              MIND<span className="text-cyan-400">MELD</span>
            </span>
          </Link>
          <h2 className="font-heading text-xl font-bold text-white pt-2">Sign In to Your Workspace</h2>
          <p className="text-xs text-slate-400">
            Connect with collegiate collaborators and build next-gen startups.
          </p>
        </div>

        {/* 1-Click Demo Personas */}
        <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>1-Click Instant Demo Personas</span>
            </div>
            <Badge variant="cyan" className="text-[10px]">No password required</Badge>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoPersona("student-1", "Aria Vance", "Student / AI Engineer")}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-violet-950/40 border border-slate-800 hover:border-violet-500/40 text-left transition-all"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Aria"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Aria Vance (Student)</div>
                  <div className="text-[11px] text-slate-400">Stanford • AI/ML Engineer (Level 4)</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-violet-400" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoPersona("student-2", "Marcus Sterling", "Team Leader")}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Marcus"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Marcus Sterling (Team Leader)</div>
                  <div className="text-[11px] text-slate-400">MIT • Full-Stack Lead (Level 6)</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoPersona("student-7", "Dr. Elena Ramos", "Administrator")}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-pink-950/40 border border-slate-800 hover:border-pink-500/40 text-left transition-all"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Admin"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Dr. Elena Ramos (Admin)</div>
                  <div className="text-[11px] text-slate-400">CMU Faculty • Admin Dashboard Access</div>
                </div>
              </div>
              <Shield className="h-4 w-4 text-pink-400" />
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <Card className="glass-card border-violet-500/20">
          <CardContent className="p-6">
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Academic or Personal Email</label>
                <Input
                  type="email"
                  placeholder="student@university.edu"
                  icon={<Mail className="h-4 w-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <Link href="/forgot-password" className="text-[11px] text-violet-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-2"
                isLoading={isLoading}
              >
                Sign In With Email
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-cyan-400 hover:underline font-semibold">
                Register as Student
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

