"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your academic email address.",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "In demo mode, password reset links are verified locally.",
        type: "success"
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-glow-violet">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-2xl font-black text-white tracking-wider">
              MIND<span className="text-cyan-400">MELD</span>
            </span>
          </Link>
          <h2 className="font-heading text-xl font-bold text-white pt-2">Reset Password</h2>
          <p className="text-xs text-slate-400">
            Enter your university or personal email to receive recovery instructions.
          </p>
        </div>

        <Card className="glass-card border-violet-500/20">
          <CardContent className="p-6">
            {submitted ? (
              <div className="text-center space-y-4 py-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">Reset Email Dispatched</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We've simulated a secure recovery link to <strong>{email}</strong>. Check your inbox to set a new password.
                </p>
                <div className="pt-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full text-xs">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Registered Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    icon={<Mail className="h-4 w-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isLoading}
                >
                  Send Recovery Link
                </Button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to login</span>
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

