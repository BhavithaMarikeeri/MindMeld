import React from "react";
import Link from "next/link";
import { Brain, Heart, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-violet-500/20 bg-cyber-dark/80 relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                MIND<span className="text-cyan-400">MELD</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The intelligent student collaboration platform connecting college innovators based on skills, personality, and startup vision.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              "Your next great idea starts with the right people."
            </div>
          </div>

          {/* Platform Columns */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/discover" className="hover:text-cyan-400 transition-colors">
                  Discover Students
                </Link>
              </li>
              <li>
                <Link href="/matching" className="hover:text-cyan-400 transition-colors">
                  AI Compatibility Engine
                </Link>
              </li>
              <li>
                <Link href="/roulette" className="hover:text-cyan-400 transition-colors">
                  Team Roulette
                </Link>
              </li>
              <li>
                <Link href="/missions" className="hover:text-cyan-400 transition-colors">
                  Mission Generator
                </Link>
              </li>
              <li>
                <Link href="/universe" className="hover:text-cyan-400 transition-colors">
                  Connection Universe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/personality" className="hover:text-violet-400 transition-colors">
                  Personality Archetypes
                </Link>
              </li>
              <li>
                <Link href="/skill-gap" className="hover:text-violet-400 transition-colors">
                  Skill Gap Analyzer
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="hover:text-violet-400 transition-colors">
                  AI Project Ideas
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-violet-400 transition-colors">
                  Leaderboard & XP
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-violet-400 transition-colors">
                  Anonymous Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              Community & Safety
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/settings" className="hover:text-white transition-colors">
                  Privacy & Data Settings
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Faculty & Admin Portal
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Collegiate Trust & Safety</span>
              </li>
              <li>
                <span className="text-slate-500">Student Code of Conduct</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MINDMELD Technologies. Built with pride for college innovators.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="h-3.5 w-3.5 text-pink-500" /> for hackathon builders
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

