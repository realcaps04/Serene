import { createContext, useContext } from "react";
import type {
  AppSettings,
  ChatMessage,
  GoalId,
  GoogleProfile,
  JournalEntry,
  MoodId,
  ScreenId,
} from "../lib/types";

export interface AppState {
  name: string;
  googleUser: GoogleProfile | null;
  goals: GoalId[];
  mood: MoodId | null;
  homeMood: MoodId | null;
  journalMood: MoodId | null;
  journalDraft: string;
  journalEntries: JournalEntry[];
  messages: ChatMessage[];
  typing: boolean;
  settings: AppSettings;
  toast: string | null;
  onboardingComplete: boolean;
  mindfulnessMinutes: number;
  sessions: number;
  dayStreak: number;
}

export interface AppContextValue extends AppState {
  go: (screen: ScreenId, opts?: { replace?: boolean }) => void;
  setName: (name: string) => void;
  toggleGoal: (id: GoalId) => void;
  setMood: (mood: MoodId) => void;
  setHomeMood: (mood: MoodId) => void;
  setJournalMood: (mood: MoodId) => void;
  setJournalDraft: (value: string) => void;
  saveJournal: () => void;
  sendMessage: (text: string) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  showToast: (message: string) => void;
  completeOnboarding: () => void;
  markBreathingComplete: () => void;
  signInWithGoogle: (profile: GoogleProfile) => void;
  signOutGoogle: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
