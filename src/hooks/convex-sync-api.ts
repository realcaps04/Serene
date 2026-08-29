import type { AppSettings, ChatMessage, GoogleProfile, JournalEntry } from "../lib/types";

export interface ConvexSyncApi {
  scheduleSync: () => void;
  upsertGoogleAndSync: (profile: GoogleProfile) => Promise<void>;
  completeOnboarding: (displayName: string) => void | Promise<unknown>;
  addJournalEntry: (entry: JournalEntry) => void | Promise<unknown>;
  addChatMessages: (messages: ChatMessage[]) => void | Promise<unknown>;
  recordWellnessSession: (
    durationMinutes: number,
    breathingPace?: "slow" | "normal" | "gentle",
  ) => void | Promise<unknown>;
  updateSettings: (settings: AppSettings) => void | Promise<unknown>;
  updateProfileDetails: (details: import("../lib/types").ProfileDetails) => Promise<void>;
}

/** Safe fallback when Convex is not configured — local-only mode. */
export const noopConvexSync: ConvexSyncApi = {
  scheduleSync: () => {},
  upsertGoogleAndSync: async () => {},
  completeOnboarding: () => {},
  addJournalEntry: () => {},
  addChatMessages: () => {},
  recordWellnessSession: () => {},
  updateSettings: () => {},
  updateProfileDetails: async () => {},
};
