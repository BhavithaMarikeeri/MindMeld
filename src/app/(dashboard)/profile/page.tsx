"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { POPULAR_SKILLS, POPULAR_INTERESTS, calculateLevel } from "@/lib/utils";
import {
  User,
  QrCode,
  Edit3,
  Share2,
  CheckCircle2,
  Sparkles,
  School,
  Clock,
  Layers,
  Award,
  Flame,
  Copy,
  Download,
  Camera,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useDemoStore();
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Edit form state
  const [editName, setEditName] = useState(currentUser.fullName);
  const [editBio, setEditBio] = useState(currentUser.bio || "");
  const [editCollege, setEditCollege] = useState(currentUser.college);
  const [editDept, setEditDept] = useState(currentUser.department);
  const [editHours, setEditHours] = useState(currentUser.availableHoursPerWeek);
  const [editRole, setEditRole] = useState(currentUser.preferredRole);
  const [editDomain, setEditDomain] = useState(currentUser.preferredDomain);
  const [editSkills, setEditSkills] = useState<string[]>(currentUser.skills);
  const [isAvailable, setIsAvailable] = useState(currentUser.isAvailableForCollaboration);

  const { level, progress, nextLevelXp } = calculateLevel(currentUser.xp);

  // Generate QR Code on mount or user change
  useEffect(() => {
    const profileUrl = typeof window !== "undefined"
      ? `${window.location.origin}/profile/${currentUser.id}`
      : `https://mindmeld.app/profile/${currentUser.id}`;

    QRCode.toDataURL(profileUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: "#06080F",
        light: "#FFFFFF"
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [currentUser.id]);

  const toggleEditSkill = (skill: string) => {
    if (editSkills.includes(skill)) {
      if (editSkills.length > 1) {
        setEditSkills(editSkills.filter((s) => s !== skill));
      }
    } else {
      setEditSkills([...editSkills, skill]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName,
      bio: editBio,
      college: editCollege,
      department: editDept,
      availableHoursPerWeek: Number(editHours),
      preferredRole: editRole as any,
      preferredDomain: editDomain as any,
      skills: editSkills,
      isAvailableForCollaboration: isAvailable
    });

    toast({
      title: "Profile Updated",
      description: "Your public student card and matching criteria have been saved.",
      type: "success"
    });
    setIsEditModalOpen(false);
  };

  const copyProfileLink = () => {
    const url = `${window.location.origin}/profile/${currentUser.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Direct profile link copied to clipboard.",
      type: "success"
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Profile Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl object-cover border-2 border-violet-400 shadow-glow-violet"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-violet-600 to-cyan-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-violet-400">
                Lvl {level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {currentUser.fullName}
                </h1>
                <Badge
                  variant={currentUser.isAvailableForCollaboration ? "emerald" : "outline"}
                  className="text-[10px]"
                >
                  {currentUser.isAvailableForCollaboration ? "Open to Connect" : "Busy"}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                {currentUser.preferredRole} • {currentUser.department}
              </p>
              <p className="text-xs text-slate-400">
                {currentUser.college} • {currentUser.academicYear}
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-300">
                  <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                  <strong>{currentUser.streakDays} Day Streak</strong>
                </span>
                <span>•</span>
                <span>{currentUser.xp} XP</span>
                <span>•</span>
                <span>{currentUser.availableHoursPerWeek} hrs/week available</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQrModalOpen(true)}
            >
              <QrCode className="h-4 w-4 mr-1.5" />
              QR Networking
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditName(currentUser.fullName);
                setEditBio(currentUser.bio || "");
                setEditCollege(currentUser.college);
                setEditDept(currentUser.department);
                setEditHours(currentUser.availableHoursPerWeek);
                setEditRole(currentUser.preferredRole);
                setEditDomain(currentUser.preferredDomain);
                setEditSkills(currentUser.skills);
                setIsAvailable(currentUser.isAvailableForCollaboration);
                setIsEditModalOpen(true);
              }}
            >
              <Edit3 className="h-4 w-4 mr-1.5" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Bio & Skills */}
        <div className="md:col-span-8 space-y-6">
          <Card className="glass-card border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-white">About & Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {currentUser.bio || "No bio added yet."}
              </p>
            </CardContent>
          </Card>

          {/* Technical Skills Tag Cloud */}
          <Card className="glass-card border-cyan-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-white">
                Technical Stack & Superpowers ({currentUser.skills.length})
              </CardTitle>
              <CardDescription>
                Verified frameworks utilized in compatibility calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map((skill) => (
                  <Badge key={skill} variant="cyan" className="text-xs py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Archetype */}
          {currentUser.personality && (
            <Card className="glass-panel-cyan border-cyan-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-cyan-300 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Collaboration Archetype: {currentUser.personality.archetype}
                </CardTitle>
                <CardDescription>
                  "{currentUser.personality.tagline}"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentUser.personality.preferredWorkStyle}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Teamwork</div>
                    <div className="text-sm font-bold text-violet-400">
                      {currentUser.personality.traits.teamwork}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Leadership</div>
                    <div className="text-sm font-bold text-cyan-400">
                      {currentUser.personality.traits.leadership}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Problem Solving</div>
                    <div className="text-sm font-bold text-emerald-400">
                      {currentUser.personality.traits.problemSolving}%
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Adaptability</div>
                    <div className="text-sm font-bold text-amber-400">
                      {currentUser.personality.traits.adaptability}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Collaboration Preferences */}
        <div className="md:col-span-4 space-y-6">
          <Card className="glass-panel border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white">Collaboration Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Preferred Domain</span>
                <span className="text-white font-medium">{currentUser.preferredDomain}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Target Role</span>
                <span className="text-cyan-300 font-medium">{currentUser.preferredRole}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Experience Level</span>
                <span className="text-white font-medium">{currentUser.experienceLevel}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Weekly Hours</span>
                <span className="text-white font-medium">{currentUser.availableHoursPerWeek} hrs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Preferred Team Size</span>
                <span className="text-white font-medium">{currentUser.preferredTeamSize} Members</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick QR Preview Box */}
          <div className="glass-card p-5 rounded-2xl border-slate-800 text-center space-y-3">
            <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
              <QrCode className="h-4 w-4 text-cyan-400" />
              <span>Campus QR Badge</span>
            </div>
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Badge"
                className="h-32 w-32 mx-auto rounded-xl bg-white p-2 border border-slate-700 shadow-md"
              />
            )}
            <p className="text-[10px] text-slate-400">
              Share at hackathons or meetups for instant peer connection.
            </p>
            <Button size="sm" variant="outline" className="w-full text-xs" onClick={copyProfileLink}>
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy Link
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
        description="Update your academic credentials, availability, and skillset."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name *</label>
              <Input
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">College *</label>
              <Input
                required
                value={editCollege}
                onChange={(e) => setEditCollege(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Department *</label>
              <Input
                required
                value={editDept}
                onChange={(e) => setEditDept(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Available Hours / Wk</label>
              <Input
                type="number"
                min={1}
                max={60}
                value={editHours}
                onChange={(e) => setEditHours(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Bio</label>
            <textarea
              className="w-full min-h-[70px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
            />
          </div>

          {/* Toggle Skills */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Skills ({editSkills.length} selected)
            </label>
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-2 rounded-xl bg-slate-900 border border-slate-800">
              {POPULAR_SKILLS.map((sk) => {
                const isSelected = editSkills.includes(sk);
                return (
                  <button
                    type="button"
                    key={sk}
                    onClick={() => toggleEditSkill(sk)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {sk} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog>

      {/* QR Code Networking Modal */}
      <Dialog
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Student QR Networking Pass"
        description="Have another student scan your QR code with their mobile camera to connect instantly."
      >
        <div className="space-y-4 pt-2 text-center">
          {qrDataUrl && (
            <div className="p-4 bg-white rounded-3xl inline-block shadow-2xl mx-auto">
              <img
                src={qrDataUrl}
                alt="Student QR Code"
                className="h-56 w-56 mx-auto rounded-xl"
              />
            </div>
          )}

          <div className="text-xs text-slate-300">
            <strong>{currentUser.fullName}</strong> • {currentUser.college}
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <Button size="sm" variant="primary" onClick={copyProfileLink}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copy Direct URL
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

