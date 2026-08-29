import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./app-context";
import type {
  AppSettings,
  ChatMessage,
  GoalId,
  GoogleProfile,
  JournalEntry,
  MoodId,
  ScreenId,
} from "../lib/types";
import { replyTo } from "../lib/companion";
import {
  clearSession,
  hasActiveSession,
  loadGoogleAuth,
  loadStoredName,
  markOnboardingComplete,
  persistGoogleSession,
  saveStoredName,
} from "../lib/session";
import { WORRY_STARTERS } from "../data/content";
import { useConvexUserSync } from "../hooks/useConvexUserSync";
import { defaultOnboardingMessage, defaultWelcomeMessage } from "../lib/convex-mappers";

const ROUTES: Record<ScreenId, string> = {
  splash: "/",
  welcome: "/welcome",
  goals: "/goals",
  mood: "/mood",
  "companion-intro": "/meet",
  "sign-in": "/sign-in",
  home: "/app/home",
  companion: "/app/companion",
  mindfulness: "/app/mindfulness",
  breathing: "/app/breathing",
  journal: "/app/journal",
  "journal-new": "/app/journal/new",
  insights: "/app/insights",
  profile: "/app/profile",
  settings: "/app/settings",
  safety: "/app/support",
  notifications: "/app/notifications",
  "profile-details": "/app/profile/details",
  privacy: "/app/privacy",
};

const INITIAL_SETTINGS: AppSettings = {
  darkMode: false,
  aiPersonality: "empathetic",
  chatReminders: "daily",
  meditationDuration: 5,
  breathingPace: "normal",
  reminderTime: "09:00",
  sound: "chimes",
  language: "English",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const savedGoogle = loadGoogleAuth();
  const [name, setNameState] = useState(() => loadStoredName(savedGoogle?.name ?? "Partner"));
  const [googleUser, setGoogleUser] = useState<GoogleProfile | null>(savedGoogle);
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [mood, setMoodState] = useState<MoodId | null>(null);
  const [homeMood, setHomeMood] = useState<MoodId | null>(null);
  const [journalMood, setJournalMood] = useState<MoodId | null>(null);
  const [journalDraft, setJournalDraft] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultOnboardingMessage()]);
  const [typing, setTyping] = useState(false);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [toast, setToast] = useState<string | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(() => hasActiveSession());
  const [mindfulnessMinutes, setMindfulnessMinutes] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [dayStreak, setDayStreak] = useState(0);

  const syncSnapshotRef = useRef({
    displayName: name,
    email: googleUser?.email,
    googleName: googleUser?.name,
    pictureUrl: googleUser?.picture,
    onboardingComplete,
    goals,
    settings,
    currentMood: mood ?? undefined,
    homeMood: homeMood ?? undefined,
    journalDraft,
    stats: {
      dayStreak: 0,
      totalSessions: 0,
      totalMindfulnessMinutes: 0,
      journalEntryCount: 0,
    },
    journalEntries: [] as ReturnType<typeof import("../lib/convex-mappers").toConvexJournalEntry>[],
    chatMessages: [] as ReturnType<typeof import("../lib/convex-mappers").toConvexChatMessage>[],
  });

  syncSnapshotRef.current = {
    displayName: name,
    email: googleUser?.email,
    googleName: googleUser?.name,
    pictureUrl: googleUser?.picture,
    onboardingComplete,
    goals,
    settings,
    currentMood: mood ?? undefined,
    homeMood: homeMood ?? undefined,
    journalDraft,
    stats: {
      dayStreak,
      totalSessions: sessions,
      totalMindfulnessMinutes: mindfulnessMinutes,
      journalEntryCount: journalEntries.length,
    },
    journalEntries: journalEntries.map((e) => ({
      clientId: e.id,
      title: e.title,
      body: e.body,
      mood: e.mood,
      createdAt: new Date(e.createdAt).getTime(),
    })),
    chatMessages: messages.map((m) => ({
      clientId: m.id,
      role: m.role,
      text: m.text,
      accentColor: m.accentColor,
      createdAt: m.createdAt ? new Date(m.createdAt).getTime() : Date.now(),
    })),
  };

  const handleHydrate = useCallback(
    (data: {
      name: string;
      goals: GoalId[];
      mood: MoodId | null;
      homeMood: MoodId | null;
      journalDraft: string;
      journalEntries: JournalEntry[];
      messages: ChatMessage[];
      settings: AppSettings;
      onboardingComplete: boolean;
      mindfulnessMinutes: number;
      sessions: number;
      dayStreak: number;
    }) => {
      setNameState(data.name);
      setGoals(data.goals);
      setMoodState(data.mood);
      setHomeMood(data.homeMood);
      setJournalDraft(data.journalDraft);
      setJournalEntries(data.journalEntries);
      setMessages(data.messages);
      setSettings(data.settings);
      setOnboardingComplete(data.onboardingComplete);
      setMindfulnessMinutes(data.mindfulnessMinutes);
      setSessions(data.sessions);
      setDayStreak(data.dayStreak);
      if (data.onboardingComplete) markOnboardingComplete();
      saveStoredName(data.name);
    },
    [],
  );

  const convex = useConvexUserSync({
    googleUser,
    onHydrate: handleHydrate,
    getSnapshot: () => syncSnapshotRef.current,
  });

  const setName = useCallback(
    (next: string) => {
      const trimmed = next.trim() || "Partner";
      setNameState(trimmed);
      saveStoredName(trimmed);
      convex.scheduleSync();
    },
    [convex],
  );

  const go = useCallback(
    (screen: ScreenId, opts?: { replace?: boolean }) => {
      const path = ROUTES[screen];
      if (opts?.replace) navigate(path, { replace: true });
      else navigate(path);
    },
    [navigate],
  );

  const toggleGoal = useCallback(
    (id: GoalId) => {
      setGoals((prev) => {
        const next = prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id];
        return next;
      });
      convex.scheduleSync();
    },
    [convex],
  );

  const setMood = useCallback(
    (next: MoodId) => {
      setMoodState(next);
      setHomeMood(next);
      convex.scheduleSync();
    },
    [convex],
  );

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const saveJournal = useCallback(() => {
    const body = journalDraft.trim();
    if (!body) {
      showToast("Write a little first — even a sentence is enough.");
      return;
    }
    const title = body.split("\n")[0].slice(0, 42);
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      title,
      body,
      mood: journalMood ?? homeMood ?? "okay",
      createdAt: new Date().toISOString(),
    };
    setJournalEntries((prev) => [entry, ...prev]);
    setJournalDraft("");
    void convex.addJournalEntry(entry);
    showToast("Saved privately.");
    go("journal");
  }, [convex, go, homeMood, journalDraft, journalMood, showToast]);

  const sendMessage = useCallback(
    (text: string, accentColor?: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const now = new Date().toISOString();
      const replyAccent =
        accentColor ?? WORRY_STARTERS.find((s) => s.prompt === trimmed)?.color ?? "#60A5FA";
      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed, createdAt: now };
      setMessages((prev) => [...prev, userMsg]);
      setTyping(true);
      window.setTimeout(() => {
        const reply: ChatMessage = {
          id: crypto.randomUUID(),
          role: "ai",
          text: replyTo(trimmed, name, settings.aiPersonality),
          createdAt: new Date().toISOString(),
          accentColor: replyAccent,
        };
        setMessages((prev) => {
          const next = [...prev, reply];
          void convex.addChatMessages([userMsg, reply]);
          return next;
        });
        setTyping(false);
      }, 900);
    },
    [convex, name, settings.aiPersonality],
  );

  const updateSettings = useCallback(
    (patch: Partial<AppSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        document.documentElement.classList.toggle("dark", next.darkMode);
        void convex.updateSettings(next);
        return next;
      });
    },
    [convex],
  );

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
    markOnboardingComplete();
    saveStoredName(name);
    setMessages([defaultWelcomeMessage(name)]);
    void convex.completeOnboarding(name);
    go("home", { replace: true });
  }, [convex, go, name]);

  const signInWithGoogle = useCallback(
    async (profile: GoogleProfile) => {
      setGoogleUser(profile);
      setNameState(profile.name);
      persistGoogleSession(profile);
      try {
        await convex.upsertGoogleAndSync(profile);
        showToast(`Welcome, ${profile.name.split(" ")[0]}.`);
      } catch {
        showToast("Google sign-in saved locally but could not sync. Please try again.");
      }
    },
    [convex, showToast],
  );

  const signOutGoogle = useCallback(() => {
    setGoogleUser(null);
    clearSession();
    setOnboardingComplete(false);
    setNameState("Partner");
    showToast("Signed out.");
    go("welcome", { replace: true });
  }, [go, showToast]);

  const markBreathingComplete = useCallback(() => {
    setSessions((n) => n + 1);
    setMindfulnessMinutes((n) => n + settings.meditationDuration);
    void convex.recordWellnessSession(settings.meditationDuration, settings.breathingPace);
    showToast("Nice pause. Your reflections stay yours.");
  }, [convex, settings.breathingPace, settings.meditationDuration, showToast]);

  const value = useMemo(
    () => ({
      name,
      googleUser,
      goals,
      mood,
      homeMood,
      journalMood,
      journalDraft,
      journalEntries,
      messages,
      typing,
      settings,
      toast,
      onboardingComplete,
      mindfulnessMinutes,
      sessions,
      dayStreak,
      go,
      setName,
      toggleGoal,
      setMood,
      setHomeMood: (next: MoodId) => {
        setHomeMood(next);
        convex.scheduleSync();
      },
      setJournalMood,
      setJournalDraft: (value: string) => {
        setJournalDraft(value);
        convex.scheduleSync();
      },
      saveJournal,
      sendMessage,
      updateSettings,
      showToast,
      completeOnboarding,
      markBreathingComplete,
      signInWithGoogle,
      signOutGoogle,
    }),
    [
      name,
      googleUser,
      goals,
      mood,
      homeMood,
      journalMood,
      journalDraft,
      journalEntries,
      messages,
      typing,
      settings,
      toast,
      onboardingComplete,
      mindfulnessMinutes,
      sessions,
      dayStreak,
      go,
      setName,
      toggleGoal,
      setMood,
      saveJournal,
      sendMessage,
      updateSettings,
      showToast,
      completeOnboarding,
      markBreathingComplete,
      signInWithGoogle,
      signOutGoogle,
      convex,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
