"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(({ title, description, type = "info" }: { title: string; description?: string; type?: ToastType }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-slide-up",
                t.type === "success" && "bg-slate-900/90 border-emerald-500/40 text-emerald-100",
                t.type === "error" && "bg-slate-900/90 border-red-500/40 text-red-100",
                t.type === "info" && "bg-slate-900/90 border-violet-500/40 text-violet-100"
              )}
            >
              <div className="mr-3 mt-0.5">
                {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                {t.type === "error" && <AlertCircle className="h-5 w-5 text-red-400" />}
                {t.type === "info" && <Info className="h-5 w-5 text-violet-400" />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{t.title}</h4>
                {t.description && <p className="text-xs mt-0.5 opacity-80 leading-relaxed">{t.description}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-2 text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

