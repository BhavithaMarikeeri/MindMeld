"use client";

import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { ChatMessage, StudentProfile, Team } from "@/types";
import { formatTimeAgo } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  Users2,
  Search,
  Sparkles,
  User,
  Shield,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  const { currentUser, allStudents, teams, messages, sendMessage } = useDemoStore();
  const { toast } = useToast();

  const [activeChatTarget, setActiveChatTarget] = useState<{
    type: "direct" | "team";
    id: string;
    name: string;
    avatar: string;
  }>({
    type: "team",
    id: teams[0]?.id || "team-1",
    name: teams[0]?.name || "Nexus AI Lab",
    avatar: teams[0]?.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
  });

  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter messages for currently selected target
  const activeConversationMessages = useMemo(() => {
    return messages.filter((m) => {
      if (activeChatTarget.type === "team") {
        return m.teamId === activeChatTarget.id;
      } else {
        // Direct message between currentUser and target student
        return (
          (m.senderId === currentUser.id && m.recipientId === activeChatTarget.id) ||
          (m.senderId === activeChatTarget.id && m.recipientId === currentUser.id)
        );
      }
    });
  }, [messages, activeChatTarget, currentUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    if (activeChatTarget.type === "team") {
      sendMessage({
        senderId: currentUser.id,
        senderName: currentUser.fullName,
        senderAvatar: currentUser.avatarUrl,
        teamId: activeChatTarget.id,
        content: messageText.trim()
      });
    } else {
      sendMessage({
        senderId: currentUser.id,
        senderName: currentUser.fullName,
        senderAvatar: currentUser.avatarUrl,
        recipientId: activeChatTarget.id,
        content: messageText.trim()
      });
    }

    setMessageText("");
  };

  const otherStudents = allStudents.filter((s) => s.id !== currentUser.id);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <MessageSquare className="h-7 w-7 text-cyan-400" />
          Messages & Direct Sync
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-speed encrypted conversations across team channels and one-to-one mentorship syncs.
        </p>
      </div>

      {/* Split Window Layout */}
      <div className="glass-panel rounded-3xl border-violet-500/30 overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[640px]">
        {/* Left: Channels & Contacts Sidebar */}
        <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/60 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-10 rounded-xl border border-slate-800 bg-slate-900 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Squad Channels */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Team Workspaces
              </div>
              {teams.map((t) => {
                const isSelected = activeChatTarget.type === "team" && activeChatTarget.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() =>
                      setActiveChatTarget({
                        type: "team",
                        id: t.id,
                        name: t.name,
                        avatar: t.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
                      })
                    }
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                      isSelected
                        ? "bg-violet-950/70 border border-violet-500/40 text-white"
                        : "hover:bg-slate-900/60 text-slate-300"
                    }`}
                  >
                    <div className="h-8 w-8 rounded-lg bg-violet-600/30 flex items-center justify-center text-violet-300 shrink-0 font-bold text-xs">
                      #
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.domain}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Messages */}
            <div className="space-y-1 pt-2">
              <div className="px-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Direct Messages
              </div>
              {otherStudents.map((s) => {
                const isSelected = activeChatTarget.type === "direct" && activeChatTarget.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() =>
                      setActiveChatTarget({
                        type: "direct",
                        id: s.id,
                        name: s.fullName,
                        avatar: s.avatarUrl
                      })
                    }
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 transition-colors ${
                      isSelected
                        ? "bg-cyan-950/70 border border-cyan-500/40 text-white"
                        : "hover:bg-slate-900/60 text-slate-300"
                    }`}
                  >
                    <img
                      src={s.avatarUrl}
                      alt={s.fullName}
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{s.fullName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{s.preferredRole}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Chat Conversation Viewport */}
        <div className="md:col-span-8 flex flex-col bg-cyber-dark">
          {/* Conversation Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/40">
            <img
              src={activeChatTarget.avatar}
              alt={activeChatTarget.name}
              className="h-9 w-9 rounded-xl object-cover border border-violet-400/40"
            />
            <div>
              <h3 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                <span>{activeChatTarget.name}</span>
                <Badge variant={activeChatTarget.type === "team" ? "violet" : "cyan"} className="text-[9px]">
                  {activeChatTarget.type === "team" ? "Squad Channel" : "Direct Message"}
                </Badge>
              </h3>
              <p className="text-[10px] text-slate-400">Connected & Synced</p>
            </div>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {activeConversationMessages.length > 0 ? (
              activeConversationMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                    />
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? "bg-violet-600 text-white rounded-tr-none shadow-glow-violet"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      <div className="text-[10px] opacity-75 font-semibold mb-1 flex items-center justify-between gap-3">
                        <span>{msg.senderName}</span>
                        <span>{formatTimeAgo(msg.timestamp)}</span>
                      </div>
                      <div>{msg.content}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-24 text-xs text-slate-400">
                Start this thread with {activeChatTarget.name}. Messages are saved locally and synced.
              </div>
            )}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Message ${activeChatTarget.name}...`}
              className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <Button type="submit" variant="primary" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

