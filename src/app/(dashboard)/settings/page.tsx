"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import {
  Settings,
  Shield,
  Bell,
  Eye,
  Lock,
  Moon,
  Trash2,
  LogOut,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, updateProfile, resetAllDemoData } = useDemoStore();
  const { toast } = useToast();

  const [visibility, setVisibility] = useState<"public" | "college-only" | "private">(
    currentUser.profileVisibility || "public"
  );
  const [notifyConnections, setNotifyConnections] = useState(true);
  const [notifyTasks, setNotifyTasks] = useState(true);
  const [notifyStreaks, setNotifyStreaks] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ profileVisibility: visibility });
    toast({
      title: "Settings Saved",
      description: "Your notification and visibility configurations have been updated.",
      type: "success"
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
        type: "error"
      });
      return;
    }
    toast({
      title: "Password Updated",
      description: "Your credentials have been securely updated.",
      type: "success"
    });
    setOldPassword("");
    setNewPassword("");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to request account deletion? This action is irreversible.")) {
      resetAllDemoData();
      toast({
        title: "Account Request Processed",
        description: "Local data cleared.",
        type: "info"
      });
      router.push("/");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Settings className="h-7 w-7 text-violet-400" />
          Settings & Account Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your collegiate identity, privacy controls, and security configurations.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Profile Visibility & Network Privacy */}
        <Card className="glass-panel border-violet-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" />
              Profile Visibility & Networking Scope
            </CardTitle>
            <CardDescription>
              Control who can discover your skills and send collaboration invites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[
                {
                  id: "public",
                  title: "Public (Recommended)",
                  desc: "Visible to all collegiate innovators across all universities."
                },
                {
                  id: "college-only",
                  title: "My University Only",
                  desc: `Restricted strictly to students verified at ${currentUser.college}.`
                },
                {
                  id: "private",
                  title: "Private / Stealth Mode",
                  desc: "Only visible to members of squads you have explicitly joined."
                }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                    visibility === opt.id
                      ? "bg-violet-950/40 border-violet-500 text-white"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    className="mt-1"
                    checked={visibility === opt.id}
                    onChange={() => setVisibility(opt.id as any)}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{opt.title}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <Button size="sm" variant="primary" onClick={handleSavePreferences}>
              Save Privacy Preferences
            </Button>
          </CardContent>
        </Card>

        {/* 2. Notification Preferences */}
        <Card className="glass-panel border-cyan-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-5 w-5 text-violet-400" />
              Notification Channels
            </CardTitle>
            <CardDescription>Configure alerts for matching and sprint activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer">
              <span>Connection requests and peer match notifications</span>
              <input
                type="checkbox"
                checked={notifyConnections}
                onChange={(e) => setNotifyConnections(e.target.checked)}
                className="rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer">
              <span>Sprint task assignments and Kanban updates</span>
              <input
                type="checkbox"
                checked={notifyTasks}
                onChange={(e) => setNotifyTasks(e.target.checked)}
                className="rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 cursor-pointer">
              <span>Daily collaboration streak reminders</span>
              <input
                type="checkbox"
                checked={notifyStreaks}
                onChange={(e) => setNotifyStreaks(e.target.checked)}
                className="rounded"
              />
            </label>
          </CardContent>
        </Card>

        {/* 3. Password & Security */}
        <Card className="glass-panel border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-400" />
              Security & Credentials
            </CardTitle>
            <CardDescription>Update your authentication password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Current Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">New Password</label>
                <Input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <Button type="submit" size="sm" variant="secondary">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 4. Danger Zone */}
        <Card className="glass-panel border-red-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
              <div>
                <div className="text-xs font-bold text-white">Delete Student Account</div>
                <div className="text-[11px] text-slate-400">
                  Permanently erase your student profile, squad memberships, and XP progress.
                </div>
              </div>
              <Button size="sm" variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="h-4 w-4 mr-1.5" /> Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 5. Help & FAQ Section */}
        <Card className="glass-panel border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-400" />
              Frequently Asked Questions & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="font-bold text-white">How does Demo Mode work?</div>
              <p className="text-slate-400 leading-relaxed">
                MINDMELD is equipped with full local browser persistence. You can create teams, assign deliverables, spin roulette, and chat in demo mode without any external database keys.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="font-bold text-white">How is the compatibility score calculated?</div>
              <p className="text-slate-400 leading-relaxed">
                The AI matching engine evaluates 6 transparent dimensions: Skill Complementarity (30%), Shared Interests (20%), Goals (20%), Availability (15%), Experience (10%), and Role Preferences (5%).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

