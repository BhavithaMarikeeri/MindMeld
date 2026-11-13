import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "cyber" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-violet focus:ring-offset-2 focus:ring-offset-cyber-dark disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base font-semibold gap-2.5",
      icon: "h-10 w-10 p-0"
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-glow-violet border border-violet-400/30",
      secondary:
        "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-glow-cyan border border-cyan-400/30",
      outline:
        "border border-violet-500/30 hover:border-violet-400/70 bg-violet-950/20 hover:bg-violet-900/30 text-violet-200",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/50",
      destructive:
        "bg-red-600/90 hover:bg-red-500 text-white shadow-sm border border-red-500/30",
      cyber:
        "bg-cyber-navy/80 hover:bg-cyber-navy text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      glow:
        "bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)]"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

