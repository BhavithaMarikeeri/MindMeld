"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { Sparkles, Users, RefreshCw, ChevronDown, Check } from "lucide-react";

export function DemoBanner() {
  const { currentUser, allStudents, switchUser, resetAllDemoData, isDemoMode } = useDemoStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isDemoMode) return null;

  return (
    <div className="bg-gradient-to-r from-violet-950/90 via-slate-900/95 to-cyan-950/90 border-b border-violet-500/20 px-4 py-2 text-xs text-slate-300 relative z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-cyan-300 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> DEMO MODE ACTIVE:
          </span>
          <span className="hidden sm:inline text-slate-400">
            Persistent local storage active. Experience all features without configuring external APIs.
          </span>
        </div>

        {/* Right: Quick Switcher */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-medium transition-colors"
            >
              <Users className="h-3.5 w-3.5 text-violet-400" />
              <span>Persona: <strong className="text-violet-300">{currentUser.fullName}</strong> ({currentUser.role})</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl glass-panel p-2 shadow-2xl border border-violet-500/30 text-white z-50">
                <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                <div className="space-y-1">
                  {allStudents.map((student) => {
                    const isSelected = student.id === currentUser.id;
                    return (
                      <button
                        key={student.id}
                        onClick={() => {
                          switchUser(student.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? "bg-violet-600/30 text-violet-200 border border-violet-500/30"
                            : "hover:bg-slate-800/60 text-slate-300"
                        }`}
                      >
                        <div>
                          <div className="font-medium text-white">{student.fullName}</div>
                          <div className="text-[10px] text-slate-400">{student.preferredRole} • {student.college.split(" ")[0]}</div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-violet-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (confirm("Reset all local demo state to default test data?")) {
                resetAllDemoData();
              }
            }}
            title="Reset demo data"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

