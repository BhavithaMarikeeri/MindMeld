"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/demo/DemoContext";
import { useToast } from "@/components/ui/toast";
import { Task, TaskPriority, TaskStatus, TeamRole } from "@/types";
import {
  Users2,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  MessageSquare,
  Sparkles,
  Crown,
  ChevronRight,
  Trash2,
  Layers,
  Cpu,
  ArrowLeft,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";

export default function TeamWorkspaceDetailPage() {
  const params = useParams();
  const teamId = params.id as string;
  const router = useRouter();

  const {
    teams,
    tasks,
    currentUser,
    allStudents,
    createTask,
    updateTask,
    deleteTask,
    messages,
    sendMessage
  } = useDemoStore();
  const { toast } = useToast();

  const team = teams.find((t) => t.id === teamId);

  // Active tab in workspace
  const [activeTab, setActiveTab] = useState<"kanban" | "members" | "chat">("kanban");

  // New task modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("Medium");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("To Do");
  const [taskAssigneeId, setTaskAssigneeId] = useState<string>("");
  const [taskDueDate, setTaskDueDate] = useState<string>("2026-11-28");

  // Team chat input state
  const [chatInput, setChatInput] = useState("");

  if (!team) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl border-slate-800 space-y-4">
        <Users2 className="h-12 w-12 text-slate-500 mx-auto" />
        <h2 className="font-heading text-xl font-bold text-white">Team Workspace Not Found</h2>
        <p className="text-xs text-slate-400">The requested team may have been archived or removed.</p>
        <Link href="/teams">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Teams
          </Button>
        </Link>
      </div>
    );
  }

  // Tasks belonging to this team
  const teamTasks = tasks.filter((t) => t.teamId === team.id);

  // Filter tasks by status column
  const kanbanColumns: { status: TaskStatus; title: string; color: string }[] = [
    { status: "To Do", title: "To Do", color: "border-slate-700" },
    { status: "In Progress", title: "In Progress", color: "border-cyan-500/40" },
    { status: "In Review", title: "In Review", color: "border-violet-500/40" },
    { status: "Completed", title: "Completed", color: "border-emerald-500/40" }
  ];

  // Team messages
  const teamMessages = messages.filter((m) => m.teamId === team.id);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) {
      toast({
        title: "Title Required",
        description: "Please specify a task title.",
        type: "error"
      });
      return;
    }

    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      teamId: team.id,
      title: taskTitle,
      description: taskDesc,
      status: taskStatus,
      priority: taskPriority,
      assignedToId: taskAssigneeId || currentUser.id,
      assignedTo: allStudents.find((s) => s.id === (taskAssigneeId || currentUser.id)),
      dueDate: taskDueDate,
      createdById: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createTask(newTask);
    toast({
      title: "Task Added to Sprint",
      description: `Task "${taskTitle}" assigned.`,
      type: "success"
    });

    setIsTaskModalOpen(false);
    setTaskTitle("");
    setTaskDesc("");
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
    if (newStatus === "Completed") {
      toast({
        title: "Deliverable Completed!",
        description: "+40 XP awarded for resolving task.",
        type: "success"
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Delete this task from sprint board?")) {
      deleteTask(taskId);
      toast({
        title: "Task Removed",
        type: "info"
      });
    }
  };

  const handleSendTeamMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderAvatar: currentUser.avatarUrl,
      teamId: team.id,
      content: chatInput.trim()
    });

    setChatInput("");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Workspace Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-violet-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/teams"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mr-2"
              >
                <ArrowLeft className="h-3 w-3" /> All Teams
              </Link>
              <Badge variant="cyan">{team.domain}</Badge>
              <Badge variant="violet">{team.status}</Badge>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {team.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {team.tagline || team.description}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/skill-gap">
              <Button variant="cyber" size="sm">
                <Cpu className="h-4 w-4 mr-1.5" />
                Audit Skill Gaps
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsTaskModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Sprint Task
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "kanban"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Kanban Board ({teamTasks.length} Tasks)
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "members"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Squad Roster ({team.members.length} Members)
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "chat"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Squad Chat</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Synergy Rating: <strong className="text-cyan-400">{team.compatibilityScore}%</strong>
          </div>
        </div>
      </div>

      {/* TAB 1: KANBAN SPRINT BOARD */}
      {activeTab === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const columnTasks = teamTasks.filter((t) => t.status === col.status);

            return (
              <div
                key={col.status}
                className="glass-panel p-4 rounded-2xl border-slate-800 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xs font-bold text-white">
                      {col.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono text-slate-400">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setTaskStatus(col.status);
                      setIsTaskModalOpen(true);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white"
                    title={`Add task in ${col.title}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Task Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {columnTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-all space-y-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-white leading-snug">
                          {t.title}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(t.id)}
                          className="text-slate-500 hover:text-red-400 p-0.5"
                          title="Delete task"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {t.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <Badge
                          variant={
                            t.priority === "Urgent"
                              ? "magenta"
                              : t.priority === "High"
                              ? "amber"
                              : "default"
                          }
                          className="text-[9px] px-1.5 py-0"
                        >
                          {t.priority}
                        </Badge>

                        {t.dueDate && (
                          <span className="text-slate-400 flex items-center gap-1 font-mono">
                            <Calendar className="h-3 w-3 text-slate-500" />
                            {t.dueDate}
                          </span>
                        )}
                      </div>

                      {/* Assignee & Status Quick Mover */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {t.assignedTo ? (
                            <>
                              <img
                                src={t.assignedTo.avatarUrl}
                                alt={t.assignedTo.fullName}
                                className="h-5 w-5 rounded-full object-cover"
                              />
                              <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                                {t.assignedTo.fullName.split(" ")[0]}
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] text-slate-500">Unassigned</span>
                          )}
                        </div>

                        {/* Status Change Selector */}
                        <select
                          className="bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-[9px] text-slate-300 focus:outline-none"
                          value={t.status}
                          onChange={(e) => handleStatusChange(t.id, e.target.value as TaskStatus)}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="h-28 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-[11px] text-slate-500">
                      No tasks in this lane
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: SQUAD ROSTER */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.members.map((member) => (
              <Card key={member.id} className="glass-card border-violet-500/20">
                <CardContent className="p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.student?.avatarUrl}
                        alt={member.student?.fullName || "Member"}
                        className="h-12 w-12 rounded-2xl object-cover border-2 border-violet-400"
                      />
                      {member.isLeader && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-sm">
                          <Crown className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white">{member.student?.fullName}</h4>
                        {member.isLeader && (
                          <Badge variant="amber" className="text-[9px]">Leader</Badge>
                        )}
                      </div>
                      <p className="text-xs text-cyan-300">{member.role}</p>
                      <p className="text-[10px] text-slate-400">{member.student?.college}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Goals & Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Card className="glass-panel border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Team Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {team.techStack.map((tech) => (
                    <Badge key={tech} variant="cyan" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Milestone Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {team.projectGoals.map((goal, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: SQUAD REALTIME CHAT */}
      {activeTab === "chat" && (
        <div className="glass-panel rounded-3xl border-violet-500/30 overflow-hidden flex flex-col h-[520px]">
          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {teamMessages.length > 0 ? (
              teamMessages.map((msg) => {
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
                          ? "bg-violet-600 text-white rounded-tr-none"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      <div className="text-[10px] opacity-75 font-semibold mb-1">
                        {msg.senderName}
                      </div>
                      {msg.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 text-xs text-slate-400">
                Welcome to your squad discussion channel! Drop a message to kick off your sprint.
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendTeamMessage}
            className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Message ${team.name}...`}
              className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <Button type="submit" variant="primary" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Add Task Modal */}
      <Dialog
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Add Sprint Deliverable"
        description={`Creating task in ${team.name}`}
      >
        <form onSubmit={handleCreateTask} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Task Title *</label>
            <Input
              required
              placeholder="e.g. Implement Fast TCN inference layer"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Priority</label>
              <select
                className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Initial Lane</label>
              <select
                className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value as any)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Assign To</label>
              <select
                className="w-full h-10 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white"
                value={taskAssigneeId}
                onChange={(e) => setTaskAssigneeId(e.target.value)}
              >
                <option value="">Select teammate...</option>
                {team.members.map((m) => (
                  <option key={m.studentId} value={m.studentId}>
                    {m.student?.fullName} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Due Date</label>
              <Input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Description</label>
            <textarea
              className="w-full min-h-[80px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white"
              placeholder="Technical specs, acceptance criteria, or links..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Deliverable
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

