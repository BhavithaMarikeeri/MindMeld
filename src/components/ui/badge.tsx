import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "violet" | "cyan" | "magenta" | "emerald" | "amber" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    violet: "bg-violet-950/60 text-violet-300 border-violet-500/30",
    cyan: "bg-cyan-950/60 text-cyan-300 border-cyan-500/30",
    magenta: "bg-pink-950/60 text-pink-300 border-pink-500/30",
    emerald: "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-950/60 text-amber-300 border-amber-500/30",
    outline: "bg-transparent text-slate-300 border-slate-600"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

