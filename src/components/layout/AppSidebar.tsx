"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import {
  Brain,
  LayoutDashboard,
  Search,
  Sparkles,
  Dices,
  Users2,
  Trophy,
  Network,
  Cpu,
  Lightbulb,
  MessageSquare,
  Shield,
  Settings,
  User,
  HeartHandshake,
  MessageCircleQuestion,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Badge } from "../ui/badge";

export function AppSidebar() {
  const pathname = usePathname();
  const { currentUser, unreadNotifsCount } = useDemoStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Discover Students", href: "/discover", icon: Search },
    { label: "AI Matching", href: "/matching", icon: Sparkles, badge: "AI" },
    { label: "Team Roulette", href: "/roulette", icon: Dices, badge: "New" },
    { label: "Team Workspaces", href: "/teams", icon: Users2 },
    { label: "Mission Generator", href: "/missions", icon: Trophy },
    { label: "Connection Universe", href: "/universe", icon: Network },
    { label: "Skill Gap Analyzer", href: "/skill-gap", icon: Cpu },
    { label: "AI Project Ideas", href: "/ideas", icon: Lightbulb },
    { label: "Personality Quiz", href: "/personality", icon: HeartHandshake },
    { label: "Leaderboard & XP", href: "/leaderboard", icon: Trophy },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Anonymous Feedback", href: "/feedback", icon: MessageCircleQuestion },
    { label: "My Profile & QR", href: "/profile", icon: User },
    ...(currentUser.role === "admin"
      ? [{ label: "Admin Portal", href: "/admin", icon: Shield, badge: "Staff" }]
      : []),
    { label: "Settings", href: "/settings", icon: Settings }
  ];

  const NavContent = (
    <div className="flex flex-col h-full bg-cyber-dark/95 border-r border-violet-500/20 backdrop-blur-2xl w-64">
      {/* Brand Header */}
      <div className="p-5 border-b border-violet-500/15 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-glow-violet">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-wider text-white">
              MIND<span className="text-cyan-400">MELD</span>
            </span>
            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Connection Engine
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Quick Info */}
      <div className="p-4 mx-3 my-2 rounded-xl glass-card flex items-center gap-3 border border-violet-500/20">
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.fullName}
          className="h-10 w-10 rounded-full object-cover border border-violet-400/40"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {currentUser.fullName}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Lvl {currentUser.level} • {currentUser.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-violet-600/30 to-cyan-600/20 text-white border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-violet-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge
                  variant={item.badge === "Staff" ? "magenta" : item.badge === "AI" ? "cyan" : "violet"}
                  className="text-[10px] py-0 px-1.5"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-violet-500/15 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit to Landing</span>
        </Link>
        {unreadNotifsCount > 0 && (
          <Link href="/dashboard" className="flex items-center gap-1 text-xs text-violet-400">
            <Bell className="h-3.5 w-3.5" />
            <span>{unreadNotifsCount} new</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navbar with hamburger */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-cyber-dark/90 border-b border-violet-500/20 backdrop-blur-lg">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-violet-400" />
          <span className="font-heading font-bold text-white tracking-wider">MINDMELD</span>
        </Link>
        <Link href="/profile" className="flex items-center">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.fullName}
            className="h-8 w-8 rounded-full border border-violet-400/40 object-cover"
          />
        </Link>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {NavContent}
      </aside>

      {/* Mobile Drawer Backdrop & Modal */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 animate-slide-right h-full">
            {NavContent}
          </div>
        </div>
      )}
    </>
  );
}

