"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { calculateCompatibility } from "@/lib/algorithms/matching";
import {
  User,
  ArrowLeft,
  Sparkles,
  School,
  Clock,
  CheckCircle2,
  UserPlus,
  Flame,
  Award,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PublicProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const { allStudents, currentUser, sendConnectionRequest, connectionRequests } = useDemoStore();
  const { toast } = useToast();

  const student = allStudents.find((s) => s.id === studentId);

  const match = useMemo(() => {
    if (!student || student.id === currentUser.id) return null;
    return calculateCompatibility(currentUser, student);
  }, [student, currentUser]);

  const isPending = connectionRequests.some(
    (r) => r.senderId === currentUser.id && r.receiverId === studentId && r.status === "pending"
  );

  if (!student) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl border-slate-800 space-y-4">
        <User className="h-12 w-12 text-slate-500 mx-auto" />
        <h2 className="font-heading text-xl font-bold text-white">Student Profile Not Found</h2>
        <p className="text-xs text-slate-400">The requested profile could not be located in the directory.</p>
        <Link href="/discover">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Discover
          </Button>
        </Link>
      </div>
    );
  }

  const handleConnect = () => {
    try {
      sendConnectionRequest(student.id, "Hey! Discovered your profile on MINDMELD and would love to collaborate.");
      toast({
        title: "Connection Request Sent",
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

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Discover
      </Link>

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={student.avatarUrl}
              alt={student.fullName}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl object-cover border-2 border-violet-400 shadow-glow-violet"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {student.fullName}
                </h1>
                <Badge variant="cyan">{student.preferredRole}</Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {student.department} • {student.college}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-300">
                  <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                  <strong>{student.streakDays} Day Streak</strong>
                </span>
                <span>•</span>
                <span>Level {student.level} ({student.xp} XP)</span>
                <span>•</span>
                <span>{student.availableHoursPerWeek} hrs/week</span>
              </div>
            </div>
          </div>

          {match && (
            <div className="flex flex-col items-end gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-violet-500/30 text-right">
                <div className="text-[10px] uppercase font-semibold text-slate-400">
                  Synergy With You
                </div>
                <div className="text-2xl font-heading font-black text-cyan-400">
                  {match.totalScore}%
                </div>
              </div>

              {student.id !== currentUser.id && (
                <Button
                  size="sm"
                  variant="primary"
                  disabled={isPending}
                  onClick={handleConnect}
                >
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  {isPending ? "Pending Request" : "Connect with Student"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <Card className="glass-card border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {student.bio}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-cyan-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Verified Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((sk) => (
                  <Badge key={sk} variant="cyan" className="text-xs py-1 px-3">
                    {sk}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {student.personality && (
            <Card className="glass-panel-cyan border-cyan-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-cyan-300 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Collaboration Archetype: {student.personality.archetype}
                </CardTitle>
                <CardDescription>"{student.personality.tagline}"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {student.personality.preferredWorkStyle}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-4 space-y-4">
          <Card className="glass-panel border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white">Collaboration Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">College</span>
                <span className="text-white font-medium">{student.college}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Academic Year</span>
                <span className="text-white font-medium">{student.academicYear}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Experience Level</span>
                <span className="text-white font-medium">{student.experienceLevel}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Target Domain</span>
                <span className="text-white font-medium">{student.preferredDomain}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

