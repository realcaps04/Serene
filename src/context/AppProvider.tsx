import { useCallback, useMemo, useState, type ReactNode } from "react";
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
import { clearGoogleAuth, loadGoogleAuth, saveGoogleAuth } from "../lib/google-auth";

const ONBOARDING_KEY = "serene-onboarding-complete";

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

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "ai",
    text: "Hi Partner, I'm Serene.\nHow are you feeling right now?",
  },
];

const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: "j1",
    title: "Feeling grateful today",
    body: "A slow morning and a walk that actually felt like a walk.",
    mood: "good",
    createdAt: new Date().toISOString(),
  },
  {
    id: "j2",
    title: "A bit overwhelmed",
    body: "Too many tabs open in my head. Naming it helped a little.",
    mood: "low",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "j3",
    title: "Peaceful morning",
    body: "Coffee, quiet, and five minutes of breathing before the day started.",
    mood: "great",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const savedGoogle = loadGoogleAuth();
  const [name, setName] = useState(savedGoogle?.name ?? "Partner");
  const [googleUser, setGoogleUser] = useState<GoogleProfile | null>(savedGoogle);
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [mood, setMoodState] = useState<MoodId | null>(null);
  const [homeMood, setHomeMood] = useState<MoodId | null>(null);
  const [journalMood, setJournalMood] = useState<MoodId | null>(null);
  const [journalDraft, setJournalDraft] = useState("");
  const [journalEntries, setJournalEntries] = useState(INITIAL_ENTRIES);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [toast, setToast] = useState<string | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(
    () => localStorage.getItem(ONBOARDING_KEY) === "1",
  );
  const [mindfulnessMinutes, setMindfulnessMinutes] = useState(24);
  const [sessions, setSessions] = useState(24);
  const [dayStreak] = useState(12);

  const go = useCallback(
    (screen: ScreenId, opts?: { replace?: boolean }) => {
      const path = ROUTES[screen];
      if (opts?.replace) navigate(path, { replace: true });
      else navigate(path);
    },
    [navigate],
  );

  const toggleGoal = useCallback((id: GoalId) => {
    setGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  }, []);

  const setMood = useCallback((next: MoodId) => {
    setMoodState(next);
    setHomeMood(next);
  }, []);

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
    showToast("Saved privately.");
    go("journal");
  }, [go, homeMood, journalDraft, journalMood, showToast]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setTyping(true);
      window.setTimeout(() => {
        const reply: ChatMessage = {
          id: crypto.randomUUID(),
          role: "ai",
          text: replyTo(trimmed, name, settings.aiPersonality),
        };
        setMessages((prev) => [...prev, reply]);
        setTyping(false);
      }, 900);
    },
    [name, settings.aiPersonality],
  );

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      document.documentElement.classList.toggle("dark", next.darkMode);
      return next;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
    localStorage.setItem(ONBOARDING_KEY, "1");
    setMessages((prev) => {
      if (!prev.length || prev[0].role !== "ai") return prev;
      return [
        {
          ...prev[0],
          text: `Hi ${name}, I'm Serene.\nHow are you feeling right now?`,
        },
        ...prev.slice(1),
      ];
    });
    go("home", { replace: true });
  }, [go, name]);

  const signInWithGoogle = useCallback((profile: GoogleProfile) => {
    setGoogleUser(profile);
    setName(profile.name);
    saveGoogleAuth(profile);
    showToast(`Welcome, ${profile.name.split(" ")[0]}.`);
  }, [showToast]);

  const signOutGoogle = useCallback(() => {
    setGoogleUser(null);
    clearGoogleAuth();
    localStorage.removeItem(ONBOARDING_KEY);
    setOnboardingComplete(false);
    setName("Partner");
    showToast("Signed out.");
    go("welcome", { replace: true });
  }, [go, showToast]);

  const markBreathingComplete = useCallback(() => {
    setSessions((n) => n + 1);
    setMindfulnessMinutes((n) => n + settings.meditationDuration);
    showToast("Nice pause. Your reflections stay yours.");
  }, [settings.meditationDuration, showToast]);

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
      setHomeMood,
      setJournalMood,
      setJournalDraft,
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
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
