"use client";

import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col lg:flex-row relative">
      <AppSidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

