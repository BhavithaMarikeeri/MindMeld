"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Brain, Menu, X, Sparkles, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-violet-500/15 bg-cyber-dark/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 shadow-glow-violet group-hover:scale-105 transition-transform duration-300">
              <Brain className="h-6 w-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-heading text-2xl font-black tracking-wider text-white">
                MIND<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">MELD</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                The Human Connection Engine
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="#how-it-works"
              className="text-slate-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#ai-matching"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              AI Matching
            </Link>
            <Link
              href="/discover"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Compass className="h-4 w-4 text-cyan-400" />
              Explore Network
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="group">
                <span>Launch Engine</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-violet-500/20 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            How It Works
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            Features
          </Link>
          <Link
            href="#ai-matching"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            AI Matching
          </Link>
          <Link
            href="/discover"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-cyan-300 hover:bg-slate-800"
          >
            Explore Network
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Launch Engine
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

