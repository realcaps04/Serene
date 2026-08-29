import type { AppSettings, ChatMessage, JournalEntry, MoodId } from "./types";

export function toClientJournalEntry(entry: {
  clientId: string;
  title: string;
  body: string;
  mood: MoodId;
  createdAt: number;
}): JournalEntry {
  return {
    id: entry.clientId,
    title: entry.title,
    body: entry.body,
    mood: entry.mood,
    createdAt: new Date(entry.createdAt).toISOString(),
  };
}

export function toConvexJournalEntry(entry: JournalEntry) {
  return {
    clientId: entry.id,
    title: entry.title,
    body: entry.body,
    mood: entry.mood,
    createdAt: new Date(entry.createdAt).getTime(),
  };
}

export function toClientChatMessage(message: {
  clientId: string;
  role: "ai" | "user";
  text: string;
  accentColor?: string;
  createdAt: number;
}): ChatMessage {
  return {
    id: message.clientId,
    role: message.role,
    text: message.text,
    accentColor: message.accentColor,
    createdAt: new Date(message.createdAt).toISOString(),
  };
}

export function toConvexChatMessage(message: ChatMessage) {
  return {
    clientId: message.id,
    role: message.role,
    text: message.text,
    accentColor: message.accentColor,
    createdAt: message.createdAt ? new Date(message.createdAt).getTime() : Date.now(),
  };
}

export function defaultWelcomeMessage(name: string): ChatMessage {
  return {
    id: "welcome-ai",
    role: "ai",
    text: `Hi ${name}, I'm Serene.\nHow are you feeling right now?`,
    createdAt: new Date().toISOString(),
    accentColor: "#60A5FA",
  };
}

export function defaultOnboardingMessage(): ChatMessage {
  return {
    id: "welcome-ai",
    role: "ai",
    text: "Hi Partner, I'm Serene. I'm here to help you sort through worries using the Worry Tree.\n\nWe can decide what needs action, what to release, and what to sit with for now.\n\nHow are you feeling right now?",
    createdAt: new Date().toISOString(),
    accentColor: "#60A5FA",
  };
}

export type ConvexUserStats = {
  dayStreak: number;
  totalSessions: number;
  totalMindfulnessMinutes: number;
  journalEntryCount: number;
  lastActivityDate?: string;
};

export function statsFromConvex(stats: ConvexUserStats) {
  return {
    dayStreak: stats.dayStreak,
    sessions: stats.totalSessions,
    mindfulnessMinutes: stats.totalMindfulnessMinutes,
  };
}

export function statsToConvex(
  dayStreak: number,
  sessions: number,
  mindfulnessMinutes: number,
  journalEntryCount: number,
  lastActivityDate?: string,
): ConvexUserStats {
  return {
    dayStreak,
    totalSessions: sessions,
    totalMindfulnessMinutes: mindfulnessMinutes,
    journalEntryCount,
    lastActivityDate,
  };
}

export function settingsFromConvex(settings: AppSettings): AppSettings {
  return { ...settings };
}
