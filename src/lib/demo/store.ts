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
  GeneratedProjectIdea,
  Achievement
} from "@/types";
import {
  DEMO_STUDENTS,
  DEMO_TEAMS,
  DEMO_MISSIONS,
  DEMO_TASKS,
  DEMO_CONNECTIONS,
  DEMO_CONNECTION_REQUESTS,
  DEMO_NOTIFICATIONS,
  DEMO_CHAT_MESSAGES,
  DEMO_FEEDBACK
} from "./demoData";
import { SYSTEM_ACHIEVEMENTS, XP_RULES, checkEligibleAchievements } from "../algorithms/gamification";

const STORAGE_KEY_PREFIX = "mindmeld_v1_";

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
}

export class DemoStore {
  static getStudents(): StudentProfile[] {
    return getStorageItem<StudentProfile[]>("students", DEMO_STUDENTS);
  }

  static setStudents(students: StudentProfile[]): void {
    setStorageItem("students", students);
  }

  static getCurrentUser(): StudentProfile {
    const students = this.getStudents();
    const currentUserId = getStorageItem<string>("current_user_id", "student-1");
    const user = students.find((s) => s.id === currentUserId);
    return user || students[0] || DEMO_STUDENTS[0];
  }

  static setCurrentUser(userId: string): void {
    setStorageItem("current_user_id", userId);
  }

  static updateProfile(updated: Partial<StudentProfile>): StudentProfile {
    const students = this.getStudents();
    const current = this.getCurrentUser();
    const newProfile: StudentProfile = {
      ...current,
      ...updated,
      updatedAt: new Date().toISOString()
    };
    const updatedStudents = students.map((s) => (s.id === current.id ? newProfile : s));
    this.setStudents(updatedStudents);
    return newProfile;
  }

  static addStudent(profile: StudentProfile): void {
    const students = this.getStudents();
    this.setStudents([profile, ...students]);
  }

  // TEAMS
  static getTeams(): Team[] {
    return getStorageItem<Team[]>("teams", DEMO_TEAMS);
  }

  static setTeams(teams: Team[]): void {
    setStorageItem("teams", teams);
  }

  static getTeamById(id: string): Team | undefined {
    return this.getTeams().find((t) => t.id === id);
  }

  static addTeam(team: Team): void {
    const teams = this.getTeams();
    this.setTeams([team, ...teams]);
    this.awardXP(team.leaderId, XP_RULES.CREATE_TEAM, "Created new squad");
  }

  // TASKS
  static getTasks(): Task[] {
    return getStorageItem<Task[]>("tasks", DEMO_TASKS);
  }

  static setTasks(tasks: Task[]): void {
    setStorageItem("tasks", tasks);
  }

  static addTask(task: Task): void {
    const tasks = this.getTasks();
    this.setTasks([task, ...tasks]);
  }

  static updateTask(taskId: string, updates: Partial<Task>): Task | undefined {
    const tasks = this.getTasks();
    let updatedTask: Task | undefined;
    const newTasks = tasks.map((t) => {
      if (t.id === taskId) {
        updatedTask = { ...t, ...updates, updatedAt: new Date().toISOString() };
        if (updates.status === "Completed" && t.status !== "Completed" && t.assignedToId) {
          DemoStore.awardXP(t.assignedToId, XP_RULES.COMPLETE_TASK, `Completed task: ${t.title}`);
        }
        return updatedTask;
      }
      return t;
    });
    this.setTasks(newTasks);
    return updatedTask;
  }

  static deleteTask(taskId: string): void {
    const tasks = this.getTasks();
    this.setTasks(tasks.filter((t) => t.id !== taskId));
  }

  // MISSIONS
  static getMissions(): Mission[] {
    return getStorageItem<Mission[]>("missions", DEMO_MISSIONS);
  }

  static setMissions(missions: Mission[]): void {
    setStorageItem("missions", missions);
  }

  static addMission(mission: Mission): void {
    const missions = this.getMissions();
    this.setMissions([mission, ...missions]);
    const current = this.getCurrentUser();
    this.awardXP(current.id, 15, "Generated new challenge mission");
  }

  // CONNECTIONS & REQUESTS
  static getConnections(): Connection[] {
    return getStorageItem<Connection[]>("connections", DEMO_CONNECTIONS);
  }

  static setConnections(connections: Connection[]): void {
    setStorageItem("connections", connections);
  }

  static getConnectionRequests(): ConnectionRequest[] {
    return getStorageItem<ConnectionRequest[]>("connection_requests", DEMO_CONNECTION_REQUESTS);
  }

  static setConnectionRequests(requests: ConnectionRequest[]): void {
    setStorageItem("connection_requests", requests);
  }

  static sendConnectionRequest(receiverId: string, message?: string): ConnectionRequest {
    const current = this.getCurrentUser();
    if (receiverId === current.id) throw new Error("Cannot connect to yourself.");
    
    // Check if already connected or pending
    const existing = this.getConnectionRequests().find(
      (r) =>
        (r.senderId === current.id && r.receiverId === receiverId) ||
        (r.senderId === receiverId && r.receiverId === current.id)
    );
    if (existing) {
      throw new Error("A connection request between these students already exists.");
    }

    const newRequest: ConnectionRequest = {
      id: `cr-${Date.now()}`,
      senderId: current.id,
      receiverId,
      sender: current,
      receiver: this.getStudents().find((s) => s.id === receiverId),
      status: "pending",
      message,
      createdAt: new Date().toISOString()
    };

    const requests = this.getConnectionRequests();
    this.setConnectionRequests([newRequest, ...requests]);

    // Add notification to receiver
    this.addNotification({
      id: `notif-${Date.now()}`,
      userId: receiverId,
      title: "New Connection Request",
      message: `${current.fullName} would like to collaborate with you.`,
      type: "connection",
      link: "/discover",
      isRead: false,
      createdAt: new Date().toISOString()
    });

    return newRequest;
  }

  static acceptConnectionRequest(requestId: string): void {
    const requests = this.getConnectionRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    // Remove or update request
    this.setConnectionRequests(requests.filter((r) => r.id !== requestId));

    // Create Connection
    const connections = this.getConnections();
    const newConn: Connection = {
      id: `conn-${Date.now()}`,
      userId1: req.senderId,
      userId2: req.receiverId,
      student1: this.getStudents().find((s) => s.id === req.senderId),
      student2: this.getStudents().find((s) => s.id === req.receiverId),
      createdAt: new Date().toISOString()
    };
    this.setConnections([newConn, ...connections]);

    // Award XP to both
    this.awardXP(req.senderId, XP_RULES.CONNECT_STUDENT, "New student connection established");
    this.awardXP(req.receiverId, XP_RULES.CONNECT_STUDENT, "New student connection established");

    this.addNotification({
      id: `notif-${Date.now()}`,
      userId: req.senderId,
      title: "Connection Accepted!",
      message: `${newConn.student2?.fullName || "A student"} accepted your connection request.`,
      type: "connection",
      link: "/universe",
      isRead: false,
      createdAt: new Date().toISOString()
    });
  }

  static rejectConnectionRequest(requestId: string): void {
    const requests = this.getConnectionRequests();
    this.setConnectionRequests(requests.filter((r) => r.id !== requestId));
  }

  static removeConnection(connectionId: string): void {
    const connections = this.getConnections();
    this.setConnections(connections.filter((c) => c.id !== connectionId));
  }

  // NOTIFICATIONS
  static getNotifications(): ActivityNotification[] {
    const user = this.getCurrentUser();
    const all = getStorageItem<ActivityNotification[]>("notifications", DEMO_NOTIFICATIONS);
    return all.filter((n) => n.userId === user.id);
  }

  static addNotification(notif: ActivityNotification): void {
    const all = getStorageItem<ActivityNotification[]>("notifications", DEMO_NOTIFICATIONS);
    setStorageItem("notifications", [notif, ...all]);
  }

  static markNotificationAsRead(id: string): void {
    const all = getStorageItem<ActivityNotification[]>("notifications", DEMO_NOTIFICATIONS);
    const updated = all.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setStorageItem("notifications", updated);
  }

  static markAllNotificationsRead(): void {
    const user = this.getCurrentUser();
    const all = getStorageItem<ActivityNotification[]>("notifications", DEMO_NOTIFICATIONS);
    const updated = all.map((n) => (n.userId === user.id ? { ...n, isRead: true } : n));
    setStorageItem("notifications", updated);
  }

  // MESSAGES
  static getMessages(): ChatMessage[] {
    return getStorageItem<ChatMessage[]>("messages", DEMO_CHAT_MESSAGES);
  }

  static sendMessage(msg: Omit<ChatMessage, "id" | "timestamp">): ChatMessage {
    const all = this.getMessages();
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setStorageItem("messages", [...all, newMsg]);
    return newMsg;
  }

  // FEEDBACK
  static getFeedback(): AnonymousFeedback[] {
    return getStorageItem<AnonymousFeedback[]>("feedback", DEMO_FEEDBACK);
  }

  static submitFeedback(fb: Omit<AnonymousFeedback, "id" | "submittedAt" | "isModerated">): AnonymousFeedback {
    const all = this.getFeedback();
    const newFb: AnonymousFeedback = {
      ...fb,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      isModerated: true
    };
    setStorageItem("feedback", [newFb, ...all]);
    const current = this.getCurrentUser();
    this.awardXP(current.id, XP_RULES.SUBMIT_FEEDBACK, "Submitted constructive teammate feedback");
    return newFb;
  }

  // SAVED IDEAS
  static getSavedIdeas(): GeneratedProjectIdea[] {
    return getStorageItem<GeneratedProjectIdea[]>("saved_ideas", []);
  }

  static saveProjectIdea(idea: GeneratedProjectIdea): void {
    const all = this.getSavedIdeas();
    if (!all.some((i) => i.id === idea.id)) {
      setStorageItem("saved_ideas", [idea, ...all]);
    }
  }

  // XP & GAMIFICATION
  static awardXP(studentId: string, amount: number, reason: string): void {
    const students = this.getStudents();
    const updated = students.map((s) => {
      if (s.id === studentId) {
        const newXp = s.xp + amount;
        const newLevel = Math.floor(newXp / 250) + 1;
        return {
          ...s,
          xp: newXp,
          level: newLevel,
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    });
    this.setStudents(updated);
  }

  // RESET TO DEFAULT DEMO STATE
  static resetDemoData(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "students");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "teams");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "tasks");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "missions");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "connections");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "connection_requests");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "notifications");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "messages");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "feedback");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "saved_ideas");
    window.localStorage.removeItem(STORAGE_KEY_PREFIX + "current_user_id");
  }
}

