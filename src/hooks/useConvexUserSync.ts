import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { GoogleProfile, ProfileDetails } from "../lib/types";
import {
  defaultOnboardingMessage,
  defaultWelcomeMessage,
  settingsFromConvex,
  statsFromConvex,
  toClientChatMessage,
  toClientJournalEntry,
  toConvexChatMessage,
  toConvexJournalEntry,
  statsToConvex,
} from "../lib/convex-mappers";
import { getOrCreateAnonymousId } from "../lib/anonymous-id";
import { splitDisplayName } from "../lib/profile";

export interface ConvexHydration {
  name: string;
  goals: import("../lib/types").GoalId[];
  mood: import("../lib/types").MoodId | null;
  homeMood: import("../lib/types").MoodId | null;
  journalDraft: string;
  journalEntries: import("../lib/types").JournalEntry[];
  messages: import("../lib/types").ChatMessage[];
  settings: import("../lib/types").AppSettings;
  onboardingComplete: boolean;
  mindfulnessMinutes: number;
  sessions: number;
  dayStreak: number;
  userCreatedAt: number | null;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  profileQuote: string;
}

interface SyncSnapshot {
  displayName: string;
  email?: string;
  googleName?: string;
  pictureUrl?: string;
  onboardingComplete: boolean;
  goals: import("../lib/types").GoalId[];
  settings: import("../lib/types").AppSettings;
  currentMood?: import("../lib/types").MoodId;
  homeMood?: import("../lib/types").MoodId;
  journalDraft: string;
  stats: {
    dayStreak: number;
    totalSessions: number;
    totalMindfulnessMinutes: number;
    journalEntryCount: number;
  };
  journalEntries: ReturnType<typeof toConvexJournalEntry>[];
  chatMessages: ReturnType<typeof toConvexChatMessage>[];
  firstName: string;
  lastName: string;
  contactNumber: string;
  profileQuote: string;
}

interface UseConvexUserSyncArgs {
  googleUser: GoogleProfile | null;
  onHydrate: (data: ConvexHydration) => void;
  getSnapshot: () => SyncSnapshot;
}

export function useConvexUserSync({ googleUser, onHydrate, getSnapshot }: UseConvexUserSyncArgs) {
  const anonymousId = getOrCreateAnonymousId();
  const googleSub = googleUser?.sub;
  const hydratedRef = useRef(false);
  const syncTimerRef = useRef<number | null>(null);

  const userData = useQuery(api.users.getUserData, { googleSub, anonymousId });
  const upsertAnonymous = useMutation(api.users.upsertAnonymousUser);
  const upsertGoogle = useMutation(api.users.upsertGoogleUser);
  const syncUserData = useMutation(api.users.syncUserData);
  const completeOnboardingMutation = useMutation(api.users.completeOnboarding);
  const addJournalEntryMutation = useMutation(api.users.addJournalEntry);
  const addChatMessagesMutation = useMutation(api.users.addChatMessages);
  const recordWellnessSessionMutation = useMutation(api.users.recordWellnessSession);
  const updateSettingsMutation = useMutation(api.users.updateSettings);
  const updateProfileDetailsMutation = useMutation(api.users.updateProfileDetails);

  useEffect(() => {
    if (userData === undefined) return;

    if (userData === null) {
      // Skip anonymous creation while Google sign-in is in flight — upsertGoogleUser handles it.
      if (!googleSub) {
        void upsertAnonymous({ anonymousId, displayName: "Partner" });
      }
      return;
    }

    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const { user, journalEntries, chatMessages } = userData;
    const stats = statsFromConvex(user.stats);

    const split = splitDisplayName(user.displayName);

    onHydrate({
      name: user.displayName,
      goals: user.goals,
      mood: user.currentMood ?? null,
      homeMood: user.homeMood ?? null,
      journalDraft: user.journalDraft ?? "",
      journalEntries: journalEntries.map((e) =>
        toClientJournalEntry({
          clientId: e.clientId,
          title: e.title,
          body: e.body,
          mood: e.mood,
          createdAt: e.createdAt,
        }),
      ),
      messages:
        chatMessages.length > 0
          ? chatMessages.map((m) =>
              toClientChatMessage({
                clientId: m.clientId,
                role: m.role,
                text: m.text,
                accentColor: m.accentColor,
                createdAt: m.createdAt,
              }),
            )
          : user.onboardingComplete
            ? [defaultWelcomeMessage(user.displayName)]
            : [defaultOnboardingMessage()],
      settings: settingsFromConvex(user.settings),
      onboardingComplete: user.onboardingComplete,
      mindfulnessMinutes: stats.mindfulnessMinutes,
      sessions: stats.sessions,
      dayStreak: stats.dayStreak,
      userCreatedAt: user.createdAt,
      firstName: user.firstName ?? split.firstName,
      lastName: user.lastName ?? split.lastName,
      email: user.email ?? "",
      contactNumber: user.contactNumber ?? "",
      profileQuote: user.profileQuote ?? "Small steps every day create big changes.",
    });

    if (user.settings.darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, [userData, anonymousId, googleSub, upsertAnonymous, onHydrate]);

  useEffect(() => {
    hydratedRef.current = false;
  }, [googleSub]);

  const scheduleSync = () => {
    if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);
    syncTimerRef.current = window.setTimeout(() => {
      const snapshot = getSnapshot();
      void syncUserData({
        googleSub,
        anonymousId,
        ...snapshot,
      });
    }, 800);
  };

  const identity = { googleSub, anonymousId };

  return {
    isLoading: userData === undefined,
    scheduleSync,
    identity,
    upsertGoogle: (profile: import("../lib/types").GoogleProfile) =>
      upsertGoogle({
        googleSub: profile.sub,
        email: profile.email,
        googleName: profile.name,
        pictureUrl: profile.picture,
        anonymousId,
        displayName: profile.name,
      }),
    upsertGoogleAndSync: async (profile: import("../lib/types").GoogleProfile) => {
      const snapshot = getSnapshot();
      await upsertGoogle({
        googleSub: profile.sub,
        email: profile.email,
        googleName: profile.name,
        pictureUrl: profile.picture,
        anonymousId,
        displayName: profile.name,
        onboardingComplete: snapshot.onboardingComplete,
        goals: snapshot.goals,
        settings: snapshot.settings,
        stats: snapshot.stats,
        currentMood: snapshot.currentMood,
        homeMood: snapshot.homeMood,
        journalDraft: snapshot.journalDraft,
      });
      await syncUserData({
        googleSub: profile.sub,
        anonymousId,
        ...snapshot,
        email: profile.email,
        googleName: profile.name,
        pictureUrl: profile.picture,
        displayName: profile.name,
      });
    },
    completeOnboarding: (displayName: string) =>
      completeOnboardingMutation({ ...identity, displayName }),
    addJournalEntry: (entry: import("../lib/types").JournalEntry) =>
      addJournalEntryMutation({
        ...identity,
        clientId: entry.id,
        title: entry.title,
        body: entry.body,
        mood: entry.mood,
        createdAt: new Date(entry.createdAt).getTime(),
      }),
    addChatMessages: (messages: import("../lib/types").ChatMessage[]) =>
      addChatMessagesMutation({
        ...identity,
        messages: messages.map(toConvexChatMessage),
      }),
    recordWellnessSession: (durationMinutes: number, breathingPace?: "slow" | "normal" | "gentle") =>
      recordWellnessSessionMutation({
        ...identity,
        type: "breathing",
        durationMinutes,
        breathingPace,
      }),
    updateSettings: (settings: import("../lib/types").AppSettings) =>
      updateSettingsMutation({ ...identity, settings }),
    updateProfileDetails: async (details: ProfileDetails) => {
      const displayName = [details.firstName.trim(), details.lastName.trim()].filter(Boolean).join(" ") || "Partner";
      await updateProfileDetailsMutation({
        ...identity,
        firstName: details.firstName.trim(),
        lastName: details.lastName.trim() || undefined,
        contactNumber: details.contactNumber.trim() || undefined,
        displayName,
      });
    },
    syncNow: () => {
      const snapshot = getSnapshot();
      return syncUserData({ googleSub, anonymousId, ...snapshot });
    },
    statsToConvex,
  };
}
