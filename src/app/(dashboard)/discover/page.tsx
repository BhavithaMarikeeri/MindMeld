"use client";

import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { calculateCompatibility } from "@/lib/algorithms/matching";
import { POPULAR_SKILLS, POPULAR_INTERESTS } from "@/lib/utils";
import { StudentProfile } from "@/types";
import {
  Search,
  Filter,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  SlidersHorizontal,
  Mail,
  UserPlus,
  Check,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function DiscoverPage() {
  const {
    currentUser,
    allStudents,
    connections,
    connectionRequests,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    removeConnection
  } = useDemoStore();
  const { toast } = useToast();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [selectedInterest, setSelectedInterest] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"compatibility" | "xp" | "streak">("compatibility");
  const [activeTab, setActiveTab] = useState<"all" | "connections" | "requests">("all");

  // Selected Student Profile Modal
  const [viewingStudent, setViewingStudent] = useState<StudentProfile | null>(null);

  // Colleges list for filter
  const collegesList = useMemo(() => {
    return Array.from(new Set(allStudents.map((s) => s.college))).sort();
  }, [allStudents]);

  // Derived calculations: map each student with compatibility score
  const studentMatches = useMemo(() => {
    return allStudents
      .filter((s) => s.id !== currentUser.id)
      .map((student) => {
        const match = calculateCompatibility(currentUser, student);
        return {
          student,
          match
        };
      });
  }, [allStudents, currentUser]);

  // Filtered & Sorted Student List
  const filteredStudents = useMemo(() => {
    return studentMatches.filter(({ student }) => {
      // Name or bio search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = student.fullName.toLowerCase().includes(q);
        const matchesCollege = student.college.toLowerCase().includes(q);
        const matchesSkill = student.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesCollege && !matchesSkill) return false;
      }

      // Skill Filter
      if (selectedSkill !== "all") {
        if (!student.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())) {
          return false;
        }
      }

      // College Filter
      if (selectedCollege !== "all" && student.college !== selectedCollege) {
        return false;
      }

      // Year Filter
      if (selectedYear !== "all" && student.academicYear !== selectedYear) {
        return false;
      }

      // Experience Filter
      if (selectedExperience !== "all" && student.experienceLevel !== selectedExperience) {
        return false;
      }

      // Interest Filter
      if (selectedInterest !== "all") {
        if (!student.interests.some((i) => i.toLowerCase() === selectedInterest.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "compatibility") {
        return b.match.totalScore - a.match.totalScore;
      }
      if (sortBy === "xp") {
        return b.student.xp - a.student.xp;
      }
      return b.student.streakDays - a.student.streakDays;
    });
  }, [
    studentMatches,
    searchQuery,
    selectedSkill,
    selectedCollege,
    selectedYear,
    selectedExperience,
    selectedInterest,
    sortBy
  ]);

  // Active Connections List
  const myConnections = useMemo(() => {
    return connections.filter(
      (c) => c.userId1 === currentUser.id || c.userId2 === currentUser.id
    );
  }, [connections, currentUser]);

  // Pending Incoming Requests
  const incomingRequests = useMemo(() => {
    return connectionRequests.filter((r) => r.receiverId === currentUser.id && r.status === "pending");
  }, [connectionRequests, currentUser]);

  // Pending Outgoing Requests
  const outgoingRequests = useMemo(() => {
    return connectionRequests.filter((r) => r.senderId === currentUser.id && r.status === "pending");
  }, [connectionRequests, currentUser]);

  const handleSendRequest = (targetStudent: StudentProfile) => {
    try {
      sendConnectionRequest(targetStudent.id, `Hi ${targetStudent.fullName.split(" ")[0]}, let's collaborate on MINDMELD!`);
      toast({
        title: "Connection Request Dispatched",
        description: `Invitation sent to ${targetStudent.fullName}.`,
        type: "success"
      });
    } catch (err: any) {
      toast({
        title: "Notice",
        description: err.message || "Failed to send request.",
        type: "error"
      });
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    acceptConnectionRequest(requestId);
    toast({
      title: "Connection Established!",
      description: "You are now connected. +30 XP awarded!",
      type: "success"
    });
  };

  const handleRejectRequest = (requestId: string) => {
    rejectConnectionRequest(requestId);
    toast({
      title: "Request Declined",
      type: "info"
    });
  };

  const handleRemoveConnection = (connectionId: string) => {
    if (confirm("Are you sure you want to remove this connection?")) {
      removeConnection(connectionId);
      toast({
        title: "Connection Removed",
        type: "info"
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Compass className="h-7 w-7 text-cyan-400" />
            Discover Student Builders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search and filter by verified technical skills, university departments, and explainable AI compatibility.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "all"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Students ({allStudents.length - 1})
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "connections"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            My Connections ({myConnections.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "requests"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Requests</span>
            {incomingRequests.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold">
                {incomingRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "all" && (
        <>
          {/* Search & Filter Toolbar */}
          <div className="glass-panel p-4 rounded-2xl border-violet-500/20 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search Query */}
              <div className="md:col-span-5">
                <Input
                  type="text"
                  placeholder="Search by name, college, or technical skill..."
                  icon={<Search className="h-4 w-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Skill Filter */}
              <div className="md:col-span-3">
                <select
                  className="w-full h-11 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="all">All Skills (Any)</option>
                  {POPULAR_SKILLS.map((sk) => (
                    <option key={sk} value={sk}>
                      {sk}
                    </option>
                  ))}
                </select>
              </div>

              {/* College Filter */}
              <div className="md:col-span-2">
                <select
                  className="w-full h-11 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                >
                  <option value="all">All Colleges</option>
                  {collegesList.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="md:col-span-2">
                <select
                  className="w-full h-11 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-semibold"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="compatibility">Sort: AI Compatibility</option>
                  <option value="xp">Sort: Highest XP</option>
                  <option value="streak">Sort: Longest Streak</option>
                </select>
              </div>
            </div>

            {/* Secondary Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-300">Quick Filters:</span>
                <button
                  onClick={() => setSelectedExperience(selectedExperience === "Expert" ? "all" : "Expert")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    selectedExperience === "Expert"
                      ? "bg-violet-600 text-white border-violet-500"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Expert Builders
                </button>
                <button
                  onClick={() => setSelectedInterest(selectedInterest === "Hackathons" ? "all" : "Hackathons")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    selectedInterest === "Hackathons"
                      ? "bg-cyan-600 text-white border-cyan-500"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Hackathon Enthusiasts
                </button>
                <button
                  onClick={() => setSelectedYear(selectedYear === "Graduate" ? "all" : "Graduate")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    selectedYear === "Graduate"
                      ? "bg-pink-600 text-white border-pink-500"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  Grad Researchers
                </button>
              </div>

              {(searchQuery || selectedSkill !== "all" || selectedCollege !== "all" || selectedYear !== "all" || selectedExperience !== "all" || selectedInterest !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSkill("all");
                    setSelectedCollege("all");
                    setSelectedYear("all");
                    setSelectedExperience("all");
                    setSelectedInterest("all");
                  }}
                  className="text-pink-400 hover:underline text-[11px] flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(({ student, match }) => {
                const isConnected = connections.some(
                  (c) =>
                    (c.userId1 === currentUser.id && c.userId2 === student.id) ||
                    (c.userId2 === currentUser.id && c.userId1 === student.id)
                );
                const isPending = connectionRequests.some(
                  (r) =>
                    (r.senderId === currentUser.id && r.receiverId === student.id && r.status === "pending")
                );

                return (
                  <Card
                    key={student.id}
                    className="glass-card border-violet-500/20 hover:border-violet-500/60 flex flex-col justify-between"
                  >
                    <CardContent className="p-5 space-y-4">
                      {/* Top Row: Avatar & Compatibility Score Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatarUrl}
                            alt={student.fullName}
                            className="h-12 w-12 rounded-2xl object-cover border-2 border-violet-400/40 shadow-glow-violet"
                          />
                          <div>
                            <h3 className="font-heading text-sm font-bold text-white">
                              {student.fullName}
                            </h3>
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {student.college}
                            </p>
                            <div className="text-[10px] text-cyan-300 font-medium">
                              {student.preferredRole} • {student.academicYear}
                            </div>
                          </div>
                        </div>

                        {/* Explainable AI Compatibility Score */}
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-950/80 border border-violet-500/40 text-violet-200 shadow-glow-violet">
                            <Sparkles className="h-3 w-3 text-cyan-300" />
                            <span className="font-heading text-xs font-black">
                              {match.totalScore}%
                            </span>
                          </div>
                          <div className="text-[9px] text-slate-400 mt-0.5">Synergy</div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {student.bio}
                      </p>

                      {/* Skills Tags */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Primary Superpowers:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 4).map((sk) => (
                            <Badge key={sk} variant="outline" className="text-[10px] py-0 px-2 bg-slate-900/60">
                              {sk}
                            </Badge>
                          ))}
                          {student.skills.length > 4 && (
                            <span className="text-[10px] text-slate-500 self-center">
                              +{student.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Match Highlights / Common Ground */}
                      {match.sharedInterestsList.length > 0 && (
                        <div className="text-[11px] p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">
                            Shared: <strong>{match.sharedInterestsList.slice(0, 2).join(", ")}</strong>
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => setViewingStudent(student)}
                        >
                          View Profile
                        </Button>

                        {isConnected ? (
                          <Button size="sm" variant="ghost" disabled className="text-emerald-400 text-xs">
                            <Check className="h-3.5 w-3.5 mr-1" /> Connected
                          </Button>
                        ) : isPending ? (
                          <Button size="sm" variant="outline" disabled className="text-slate-400 text-xs">
                            Pending
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="primary"
                            className="flex-1 text-xs"
                            onClick={() => handleSendRequest(student)}
                          >
                            <UserPlus className="h-3.5 w-3.5 mr-1" /> Connect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center glass-panel rounded-2xl border-slate-800">
                <Users className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-white">No Students Match Your Filter</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Try clearing your search filters or broadening your college and skill constraints.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Tab 2: My Connections */}
      {activeTab === "connections" && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            You have <strong>{myConnections.length}</strong> verified collaborative connections.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myConnections.length > 0 ? (
              myConnections.map((conn) => {
                const partner =
                  conn.userId1 === currentUser.id ? conn.student2 : conn.student1;
                if (!partner) return null;

                return (
                  <Card key={conn.id} className="glass-card border-emerald-500/20">
                    <CardContent className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={partner.avatarUrl}
                          alt={partner.fullName}
                          className="h-11 w-11 rounded-full object-cover border border-emerald-400/40"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">{partner.fullName}</h4>
                          <p className="text-[11px] text-slate-400">{partner.college.split(" ")[0]}</p>
                          <span className="text-[10px] text-emerald-400">Verified Teammate</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewingStudent(partner)}
                          className="text-xs p-2"
                        >
                          Profile
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveConnection(conn.id)}
                          className="text-xs p-2"
                          title="Remove connection"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 glass-panel rounded-2xl border-slate-800 text-xs text-slate-400">
                You haven't connected with any students yet. Explore the directory to send collaboration invites!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Connection Requests (Incoming & Outgoing) */}
      {activeTab === "requests" && (
        <div className="space-y-6">
          {/* Incoming */}
          <div className="space-y-3">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              Incoming Collaboration Requests ({incomingRequests.length})
            </h3>

            {incomingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingRequests.map((req) => (
                  <Card key={req.id} className="glass-panel border-cyan-500/30">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.sender?.avatarUrl}
                          alt={req.sender?.fullName}
                          className="h-11 w-11 rounded-full object-cover border border-cyan-400/40"
                        />
                        <div>
                          <div className="text-sm font-bold text-white">{req.sender?.fullName}</div>
                          <div className="text-xs text-slate-400">{req.sender?.preferredRole} • {req.sender?.college}</div>
                        </div>
                      </div>

                      {req.message && (
                        <p className="text-xs text-slate-300 italic p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                          "{req.message}"
                        </p>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1 text-xs"
                          onClick={() => handleAcceptRequest(req.id)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" /> Accept (+30 XP)
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-xs text-slate-400"
                          onClick={() => handleRejectRequest(req.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No incoming pending requests at this moment.</p>
            )}
          </div>

          {/* Outgoing */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="font-heading text-base font-bold text-white">
              Outgoing Requests Sent ({outgoingRequests.length})
            </h3>
            {outgoingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {outgoingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={req.receiver?.avatarUrl}
                        alt={req.receiver?.fullName}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{req.receiver?.fullName}</div>
                        <div className="text-[10px] text-slate-400">{req.receiver?.college.split(" ")[0]}</div>
                      </div>
                    </div>
                    <Badge variant="cyan" className="text-[10px]">
                      Pending response
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No pending sent invitations.</p>
            )}
          </div>
        </div>
      )}

      {/* View Full Student Profile Modal */}
      {viewingStudent && (
        <Dialog
          isOpen={!!viewingStudent}
          onClose={() => setViewingStudent(null)}
          title={viewingStudent.fullName}
          description={`${viewingStudent.department} • ${viewingStudent.college}`}
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <img
                src={viewingStudent.avatarUrl}
                alt={viewingStudent.fullName}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-violet-400"
              />
              <div>
                <div className="text-xs text-cyan-300 font-semibold">{viewingStudent.preferredRole}</div>
                <div className="text-xs text-slate-400">{viewingStudent.academicYear} • Level {viewingStudent.level} ({viewingStudent.xp} XP)</div>
                <div className="text-xs text-slate-400">{viewingStudent.availableHoursPerWeek} hrs/week available</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1">About</div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                {viewingStudent.bio}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Technical Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {viewingStudent.skills.map((sk) => (
                  <Badge key={sk} variant="violet" className="text-xs">
                    {sk}
                  </Badge>
                ))}
              </div>
            </div>

            {viewingStudent.personality && (
              <div className="p-3 rounded-xl glass-panel-cyan border-cyan-500/30">
                <div className="text-xs font-bold text-cyan-300">
                  Archetype: {viewingStudent.personality.archetype}
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  {viewingStudent.personality.tagline}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleSendRequest(viewingStudent);
                  setViewingStudent(null);
                }}
              >
                Send Collaboration Request
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

