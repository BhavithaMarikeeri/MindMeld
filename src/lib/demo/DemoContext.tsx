"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import {
  StudentProfile,
  Team,
  Mission,
  Task,
  Connection,
  ConnectionRequest,
  ActivityNotification,
  ChatMessage,
  AnonymousFeedback,
  GeneratedProjectIdea
} from "@/types";
import { DemoStore } from "./store";
import { DEMO_STUDENTS } from "./demoData";

interface DemoContextType {
  currentUser: StudentProfile;
  allStudents: StudentProfile[];
  teams: Team[];
  tasks: Task[];
  missions: Mission[];
  connections: Connection[];
  connectionRequests: ConnectionRequest[];
  notifications: ActivityNotification[];
  messages: ChatMessage[];
  feedback: AnonymousFeedback[];
  savedIdeas: GeneratedProjectIdea[];
  unreadNotifsCount: number;
  isDemoMode: boolean;
  switchUser: (userId: string) => void;
  updateProfile: (data: Partial<StudentProfile>) => void;
  createTeam: (team: Team) => void;
  createTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  createMission: (mission: Mission) => void;
  sendConnectionRequest: (receiverId: string, message?: string) => void;
  acceptConnectionRequest: (requestId: string) => void;
  rejectConnectionRequest: (requestId: string) => void;
  removeConnection: (connectionId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  sendMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  submitFeedback: (fb: Omit<AnonymousFeedback, "id" | "submittedAt" | "isModerated">) => void;
  saveProjectIdea: (idea: GeneratedProjectIdea) => void;
  resetAllDemoData: () => void;
  refreshState: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<StudentProfile>(DEMO_STUDENTS[0]);
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(DEMO_STUDENTS);
  const [teams, setTeams] = useState<Team[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [notifications, setNotifications] = useState<ActivityNotification[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [feedback, setFeedback] = useState<AnonymousFeedback[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<GeneratedProjectIdea[]>([]);
  const [isDemoMode] = useState<boolean>(true); // Fallback active when Supabase env variables are unconfigured

  const refreshState = useCallback(() => {
    if (typeof window === "undefined") return;
    setCurrentUser(DemoStore.getCurrentUser());
    setAllStudents(DemoStore.getStudents());
    setTeams(DemoStore.getTeams());
    setTasks(DemoStore.getTasks());
    setMissions(DemoStore.getMissions());
    setConnections(DemoStore.getConnections());
    setConnectionRequests(DemoStore.getConnectionRequests());
    setNotifications(DemoStore.getNotifications());
    setMessages(DemoStore.getMessages());
    setFeedback(DemoStore.getFeedback());
    setSavedIdeas(DemoStore.getSavedIdeas());
  }, []);

  useEffect(() => {
    setMounted(true);
    refreshState();

    const handleStorage = () => refreshState();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refreshState]);

  const switchUser = (userId: string) => {
    DemoStore.setCurrentUser(userId);
    refreshState();
  };

  const updateProfile = (data: Partial<StudentProfile>) => {
    DemoStore.updateProfile(data);
    refreshState();
  };

  const createTeam = (team: Team) => {
    DemoStore.addTeam(team);
    refreshState();
  };

  const createTask = (task: Task) => {
    DemoStore.addTask(task);
    refreshState();
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    DemoStore.updateTask(taskId, updates);
    refreshState();
  };

  const deleteTask = (taskId: string) => {
    DemoStore.deleteTask(taskId);
    refreshState();
  };

  const createMission = (mission: Mission) => {
    DemoStore.addMission(mission);
    refreshState();
  };

  const sendConnectionRequest = (receiverId: string, message?: string) => {
    DemoStore.sendConnectionRequest(receiverId, message);
    refreshState();
  };

  const acceptConnectionRequest = (requestId: string) => {
    DemoStore.acceptConnectionRequest(requestId);
    refreshState();
  };

  const rejectConnectionRequest = (requestId: string) => {
    DemoStore.rejectConnectionRequest(requestId);
    refreshState();
  };

  const removeConnection = (connectionId: string) => {
    DemoStore.removeConnection(connectionId);
    refreshState();
  };

  const markNotificationRead = (id: string) => {
    DemoStore.markNotificationAsRead(id);
    refreshState();
  };

  const markAllNotificationsRead = () => {
    DemoStore.markAllNotificationsRead();
    refreshState();
  };

  const sendMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    DemoStore.sendMessage(msg);
    refreshState();
  };

  const submitFeedback = (fb: Omit<AnonymousFeedback, "id" | "submittedAt" | "isModerated">) => {
    DemoStore.submitFeedback(fb);
    refreshState();
  };

  const saveProjectIdea = (idea: GeneratedProjectIdea) => {
    DemoStore.saveProjectIdea(idea);
    refreshState();
  };

  const resetAllDemoData = () => {
    DemoStore.resetDemoData();
    refreshState();
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        allStudents,
        teams,
        tasks,
        missions,
        connections,
        connectionRequests,
        notifications,
        messages,
        feedback,
        savedIdeas,
        unreadNotifsCount,
        isDemoMode,
        switchUser,
        updateProfile,
        createTeam,
        createTask,
        updateTask,
        deleteTask,
        createMission,
        sendConnectionRequest,
        acceptConnectionRequest,
        rejectConnectionRequest,
        removeConnection,
        markNotificationRead,
        markAllNotificationsRead,
        sendMessage,
        submitFeedback,
        saveProjectIdea,
        resetAllDemoData,
        refreshState
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoStore() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoStore must be used within a DemoProvider");
  }
  return context;
}

