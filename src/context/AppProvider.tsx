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
import { isConvexEnabled } from "../lib/convex-config";
import type { ConvexSyncApi } from "../hooks/convex-sync-api";
import { noopConvexSync } from "../hooks/convex-sync-api";

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
  if (isConvexEnabled) {
    return <ConvexAppProvider>{children}</ConvexAppProvider>;
  }
  return <LocalAppProvider>{children}</LocalAppProvider>;
}

/** App state without Convex — used when VITE_CONVEX_URL is missing. */
function LocalAppProvider({ children }: { children: ReactNode }) {
  return <AppProviderInner convex={noopConvexSync}>{children}</AppProviderInner>;
}

/** App state with Convex sync — must render under ConvexProvider. */
function ConvexAppProvider({ children }: { children: ReactNode }) {
  const savedGoogle = loadGoogleAuth();
  const [googleUser, setGoogleUser] = useState<GoogleProfile | null>(savedGoogle);

  const syncBridgeRef = useRef<{
    getSnapshot: () => ReturnType<typeof buildSyncSnapshot>;
    onHydrate: (data: HydrationPayload) => void;
  } | null>(null);

  const convex = useConvexUserSync({
    googleUser,
    onHydrate: (data) => syncBridgeRef.current?.onHydrate(data),
    getSnapshot: () =>
      syncBridgeRef.current?.getSnapshot() ?? {
        displayName: "Partner",
        onboardingComplete: false,
        goals: [],
        settings: INITIAL_SETTINGS,
        journalDraft: "",
        stats: { dayStreak: 0, totalSessions: 0, totalMindfulnessMinutes: 0, journalEntryCount: 0 },
        journalEntries: [],
        chatMessages: [],
      },
  });

  return (
    <AppProviderInner
      convex={convex as ConvexSyncApi}
      googleUser={googleUser}
      setGoogleUser={setGoogleUser}
      syncBridgeRef={syncBridgeRef}
    >
      {children}
    </AppProviderInner>
  );
}

type HydrationPayload = {
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
};

function buildSyncSnapshot(args: {
  name: string;
  googleUser: GoogleProfile | null;
  onboardingComplete: boolean;
  goals: GoalId[];
  settings: AppSettings;
  mood: MoodId | null;
  homeMood: MoodId | null;
  journalDraft: string;
  dayStreak: number;
  sessions: number;
  mindfulnessMinutes: number;
  journalEntries: JournalEntry[];
  messages: ChatMessage[];
}) {
  return {
    displayName: args.name,
    email: args.googleUser?.email,
    googleName: args.googleUser?.name,
    pictureUrl: args.googleUser?.picture,
    onboardingComplete: args.onboardingComplete,
    goals: args.goals,
    settings: args.settings,
    currentMood: args.mood ?? undefined,
    homeMood: args.homeMood ?? undefined,
    journalDraft: args.journalDraft,
    stats: {
      dayStreak: args.dayStreak,
      totalSessions: args.sessions,
      totalMindfulnessMinutes: args.mindfulnessMinutes,
      journalEntryCount: args.journalEntries.length,
    },
    journalEntries: args.journalEntries.map((e) => ({
      clientId: e.id,
      title: e.title,
      body: e.body,
      mood: e.mood,
      createdAt: new Date(e.createdAt).getTime(),
    })),
    chatMessages: args.messages.map((m) => ({
      clientId: m.id,
      role: m.role,
      text: m.text,
      accentColor: m.accentColor,
      createdAt: m.createdAt ? new Date(m.createdAt).getTime() : Date.now(),
    })),
  };
}

function AppProviderInner({
  children,
  convex,
  googleUser: googleUserProp,
  setGoogleUser: setGoogleUserProp,
  syncBridgeRef,
}: {
  children: ReactNode;
  convex: ConvexSyncApi;
  googleUser?: GoogleProfile | null;
  setGoogleUser?: (user: GoogleProfile | null) => void;
  syncBridgeRef?: React.MutableRefObject<{
    getSnapshot: () => ReturnType<typeof buildSyncSnapshot>;
    onHydrate: (data: HydrationPayload) => void;
  } | null>;
}) {
  const navigate = useNavigate();
  const savedGoogle = loadGoogleAuth();
  const [internalGoogleUser, setInternalGoogleUser] = useState<GoogleProfile | null>(savedGoogle);
  const googleUser = googleUserProp ?? internalGoogleUser;
  const setGoogleUser = setGoogleUserProp ?? setInternalGoogleUser;

  const [name, setNameState] = useState(() => loadStoredName(savedGoogle?.name ?? "Partner"));
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

  const onHydrate = useCallback((data: HydrationPayload) => {
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
  }, []);

  const getSnapshot = useCallback(
    () =>
      buildSyncSnapshot({
        name,
        googleUser,
        onboardingComplete,
        goals,
        settings,
        mood,
        homeMood,
        journalDraft,
        dayStreak,
        sessions,
        mindfulnessMinutes,
        journalEntries,
        messages,
      }),
    [
      name,
      googleUser,
      onboardingComplete,
      goals,
      settings,
      mood,
      homeMood,
      journalDraft,
      dayStreak,
      sessions,
      mindfulnessMinutes,
      journalEntries,
      messages,
    ],
  );

  if (syncBridgeRef) {
    syncBridgeRef.current = { getSnapshot, onHydrate };
  }

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
      setGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
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
      if (isConvexEnabled) {
        try {
          await convex.upsertGoogleAndSync(profile);
          showToast(`Welcome, ${profile.name.split(" ")[0]}.`);
        } catch {
          showToast("Google sign-in saved locally but could not sync. Please try again.");
        }
      } else {
        showToast(`Welcome, ${profile.name.split(" ")[0]}.`);
      }
    },
    [convex, setGoogleUser, showToast],
  );

  const signOutGoogle = useCallback(() => {
    setGoogleUser(null);
    clearSession();
    setOnboardingComplete(false);
    setNameState("Partner");
    showToast("Signed out.");
    go("welcome", { replace: true });
  }, [go, setGoogleUser, showToast]);

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
