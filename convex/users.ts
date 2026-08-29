import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import {
  chatMessage,
  goalId,
  journalEntry,
  moodCheckIn,
  moodId,
  notificationItem,
  userSettings,
  userStats,
  wellnessSession,
} from "./validators";

const DEFAULT_SETTINGS = {
  darkMode: false,
  aiPersonality: "empathetic" as const,
  chatReminders: "daily" as const,
  meditationDuration: 5 as const,
  breathingPace: "normal" as const,
  reminderTime: "09:00",
  sound: "chimes" as const,
  language: "English",
};

const DEFAULT_STATS = {
  dayStreak: 0,
  totalSessions: 0,
  totalMindfulnessMinutes: 0,
  journalEntryCount: 0,
  lastActivityDate: undefined,
};

async function findUser(
  ctx: QueryCtx | MutationCtx,
  googleSub?: string,
  anonymousId?: string,
): Promise<Doc<"users"> | null> {
  if (googleSub) {
    const byGoogle = await ctx.db
      .query("users")
      .withIndex("by_google_sub", (q) => q.eq("googleSub", googleSub))
      .unique();
    if (byGoogle) return byGoogle;
  }
  if (anonymousId) {
    return await ctx.db
      .query("users")
      .withIndex("by_anonymous_id", (q) => q.eq("anonymousId", anonymousId))
      .unique();
  }
  return null;
}

/** Load full user document graph for hydration. */
export const getUserData = query({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) return null;

    const [journalEntries, chatMessages, moodCheckIns, wellnessSessions, notifications] =
      await Promise.all([
        ctx.db
          .query("journalEntries")
          .withIndex("by_user_and_time", (q) => q.eq("userId", user._id))
          .order("desc")
          .collect(),
        ctx.db
          .query("chatMessages")
          .withIndex("by_user_and_time", (q) => q.eq("userId", user._id))
          .order("asc")
          .collect(),
        ctx.db
          .query("moodCheckIns")
          .withIndex("by_user_and_time", (q) => q.eq("userId", user._id))
          .order("desc")
          .collect(),
        ctx.db
          .query("wellnessSessions")
          .withIndex("by_user_and_time", (q) => q.eq("userId", user._id))
          .order("desc")
          .collect(),
        ctx.db
          .query("notifications")
          .withIndex("by_user_and_time", (q) => q.eq("userId", user._id))
          .order("desc")
          .collect(),
      ]);

    return { user, journalEntries, chatMessages, moodCheckIns, wellnessSessions, notifications };
  },
});

/** Create or update user after Google sign-in; links anonymous account if present. */
export const upsertGoogleUser = mutation({
  args: {
    googleSub: v.string(),
    email: v.string(),
    googleName: v.string(),
    pictureUrl: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    displayName: v.optional(v.string()),
    onboardingComplete: v.optional(v.boolean()),
    goals: v.optional(v.array(goalId)),
    settings: v.optional(userSettings),
    stats: v.optional(userStats),
    currentMood: v.optional(moodId),
    homeMood: v.optional(moodId),
    journalDraft: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const googleFields = {
      googleSub: args.googleSub,
      email: args.email,
      googleName: args.googleName,
      displayName: args.displayName ?? args.googleName,
      pictureUrl: args.pictureUrl,
      ...(args.onboardingComplete !== undefined ? { onboardingComplete: args.onboardingComplete } : {}),
      ...(args.goals !== undefined ? { goals: args.goals } : {}),
      ...(args.settings !== undefined ? { settings: args.settings } : {}),
      ...(args.stats !== undefined ? { stats: args.stats } : {}),
      ...(args.currentMood !== undefined ? { currentMood: args.currentMood } : {}),
      ...(args.homeMood !== undefined ? { homeMood: args.homeMood } : {}),
      ...(args.journalDraft !== undefined ? { journalDraft: args.journalDraft } : {}),
      lastSeenAt: now,
      updatedAt: now,
    };

    const user = await findUser(ctx, args.googleSub, args.anonymousId);

    if (user) {
      await ctx.db.patch(user._id, {
        ...googleFields,
        anonymousId: args.anonymousId ?? user.anonymousId,
      });
      return user._id;
    }

    const anonymousUser = args.anonymousId
      ? await findUser(ctx, undefined, args.anonymousId)
      : null;

    if (anonymousUser) {
      await ctx.db.patch(anonymousUser._id, {
        ...googleFields,
        anonymousId: args.anonymousId,
      });
      return anonymousUser._id;
    }

    return await ctx.db.insert("users", {
      googleSub: args.googleSub,
      anonymousId: args.anonymousId,
      email: args.email,
      googleName: args.googleName,
      displayName: args.displayName ?? args.googleName,
      pictureUrl: args.pictureUrl,
      profileQuote: "Small steps every day create big changes.",
      onboardingComplete: args.onboardingComplete ?? false,
      memberSince: now,
      goals: args.goals ?? [],
      settings: args.settings ?? DEFAULT_SETTINGS,
      stats: args.stats ?? DEFAULT_STATS,
      currentMood: args.currentMood,
      homeMood: args.homeMood,
      journalDraft: args.journalDraft,
      createdAt: now,
      updatedAt: now,
      lastSeenAt: now,
    });
  },
});

/** Create or fetch anonymous Partner user. */
export const upsertAnonymousUser = mutation({
  args: {
    anonymousId: v.string(),
    displayName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await findUser(ctx, undefined, args.anonymousId);
    if (existing) {
      await ctx.db.patch(existing._id, {
        displayName: args.displayName ?? existing.displayName,
        lastSeenAt: now,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      anonymousId: args.anonymousId,
      displayName: args.displayName ?? "Partner",
      profileQuote: "Small steps every day create big changes.",
      onboardingComplete: false,
      memberSince: now,
      goals: [],
      settings: DEFAULT_SETTINGS,
      stats: DEFAULT_STATS,
      createdAt: now,
      updatedAt: now,
      lastSeenAt: now,
    });
  },
});

/** Full sync — profile, settings, goals, stats, and child collections. */
export const syncUserData = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    displayName: v.optional(v.string()),
    email: v.optional(v.string()),
    googleName: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    profileQuote: v.optional(v.string()),
    onboardingComplete: v.optional(v.boolean()),
    goals: v.optional(v.array(goalId)),
    settings: v.optional(userSettings),
    stats: v.optional(userStats),
    currentMood: v.optional(moodId),
    homeMood: v.optional(moodId),
    journalDraft: v.optional(v.string()),
    journalEntries: v.optional(v.array(journalEntry)),
    chatMessages: v.optional(v.array(chatMessage)),
    moodCheckIns: v.optional(v.array(moodCheckIn)),
    wellnessSessions: v.optional(v.array(wellnessSession)),
    notifications: v.optional(v.array(notificationItem)),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let user = await findUser(ctx, args.googleSub, args.anonymousId);

    if (!user) {
      const userId = await ctx.db.insert("users", {
        googleSub: args.googleSub,
        anonymousId: args.anonymousId,
        email: args.email,
        googleName: args.googleName,
        displayName: args.displayName ?? args.googleName ?? "Partner",
        pictureUrl: args.pictureUrl,
        profileQuote: args.profileQuote ?? "Small steps every day create big changes.",
        onboardingComplete: args.onboardingComplete ?? false,
        memberSince: now,
        goals: args.goals ?? [],
        settings: args.settings ?? DEFAULT_SETTINGS,
        stats: args.stats ?? DEFAULT_STATS,
        currentMood: args.currentMood,
        homeMood: args.homeMood,
        journalDraft: args.journalDraft,
        createdAt: now,
        updatedAt: now,
        lastSeenAt: now,
      });
      user = (await ctx.db.get(userId))!;
    } else {
      await ctx.db.patch(user._id, {
        ...(args.displayName !== undefined ? { displayName: args.displayName } : {}),
        ...(args.email !== undefined ? { email: args.email } : {}),
        ...(args.googleName !== undefined ? { googleName: args.googleName } : {}),
        ...(args.pictureUrl !== undefined ? { pictureUrl: args.pictureUrl } : {}),
        ...(args.profileQuote !== undefined ? { profileQuote: args.profileQuote } : {}),
        ...(args.onboardingComplete !== undefined ? { onboardingComplete: args.onboardingComplete } : {}),
        ...(args.goals !== undefined ? { goals: args.goals } : {}),
        ...(args.settings !== undefined ? { settings: args.settings } : {}),
        ...(args.stats !== undefined ? { stats: args.stats } : {}),
        ...(args.currentMood !== undefined ? { currentMood: args.currentMood } : {}),
        ...(args.homeMood !== undefined ? { homeMood: args.homeMood } : {}),
        ...(args.journalDraft !== undefined ? { journalDraft: args.journalDraft } : {}),
        ...(args.googleSub && !user.googleSub ? { googleSub: args.googleSub } : {}),
        lastSeenAt: now,
        updatedAt: now,
      });
    }

    const userId = user._id;

    if (args.journalEntries) {
      for (const entry of args.journalEntries) {
        const existing = await ctx.db
          .query("journalEntries")
          .withIndex("by_user_and_client", (q) => q.eq("userId", userId).eq("clientId", entry.clientId))
          .unique();
        if (existing) {
          await ctx.db.patch(existing._id, {
            title: entry.title,
            body: entry.body,
            mood: entry.mood,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt ?? now,
          });
        } else {
          await ctx.db.insert("journalEntries", { userId, ...entry });
        }
      }
    }

    if (args.chatMessages) {
      for (const message of args.chatMessages) {
        const existing = await ctx.db
          .query("chatMessages")
          .withIndex("by_user_and_client", (q) => q.eq("userId", userId).eq("clientId", message.clientId))
          .unique();
        if (!existing) {
          await ctx.db.insert("chatMessages", { userId, ...message });
        }
      }
    }

    if (args.moodCheckIns) {
      for (const checkIn of args.moodCheckIns) {
        await ctx.db.insert("moodCheckIns", { userId, ...checkIn });
      }
    }

    if (args.wellnessSessions) {
      for (const session of args.wellnessSessions) {
        await ctx.db.insert("wellnessSessions", { userId, ...session });
      }
    }

    if (args.notifications) {
      for (const note of args.notifications) {
        const existing = await ctx.db
          .query("notifications")
          .withIndex("by_user_and_client", (q) => q.eq("userId", userId).eq("clientId", note.clientId))
          .unique();
        if (existing) {
          await ctx.db.patch(existing._id, {
            title: note.title,
            body: note.body,
            read: note.read,
            filter: note.filter,
            actionRoute: note.actionRoute,
          });
        } else {
          await ctx.db.insert("notifications", { userId, ...note });
        }
      }
    }

    return userId;
  },
});

/** Mark onboarding complete and update display name. */
export const completeOnboarding = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    displayName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) throw new Error("User not found");
    const now = Date.now();
    await ctx.db.patch(user._id, {
      onboardingComplete: true,
      displayName: args.displayName,
      updatedAt: now,
      lastSeenAt: now,
    });
    return user._id;
  },
});

/** Update settings only. */
export const updateSettings = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    settings: userSettings,
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) throw new Error("User not found");
    const now = Date.now();
    await ctx.db.patch(user._id, { settings: args.settings, updatedAt: now, lastSeenAt: now });
    return user._id;
  },
});

/** Append journal entry. */
export const addJournalEntry = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    clientId: v.string(),
    title: v.string(),
    body: v.string(),
    mood: moodId,
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) throw new Error("User not found");
    const now = Date.now();
    await ctx.db.insert("journalEntries", {
      userId: user._id,
      clientId: args.clientId,
      title: args.title,
      body: args.body,
      mood: args.mood,
      createdAt: args.createdAt,
      updatedAt: now,
    });
    await ctx.db.patch(user._id, {
      stats: {
        ...user.stats,
        journalEntryCount: user.stats.journalEntryCount + 1,
      },
      updatedAt: now,
      lastSeenAt: now,
    });
    return user._id;
  },
});

/** Append chat messages. */
export const addChatMessages = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    messages: v.array(chatMessage),
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) throw new Error("User not found");
    const now = Date.now();
    for (const message of args.messages) {
      const existing = await ctx.db
        .query("chatMessages")
        .withIndex("by_user_and_client", (q) => q.eq("userId", user._id).eq("clientId", message.clientId))
        .unique();
      if (!existing) {
        await ctx.db.insert("chatMessages", { userId: user._id, ...message });
      }
    }
    await ctx.db.patch(user._id, { updatedAt: now, lastSeenAt: now });
    return user._id;
  },
});

/** Record breathing / mindfulness session completion. */
export const recordWellnessSession = mutation({
  args: {
    googleSub: v.optional(v.string()),
    anonymousId: v.optional(v.string()),
    type: v.union(v.literal("breathing"), v.literal("meditation"), v.literal("grounding")),
    durationMinutes: v.number(),
    breathingPace: v.optional(v.union(v.literal("slow"), v.literal("normal"), v.literal("gentle"))),
  },
  handler: async (ctx, args) => {
    const user = await findUser(ctx, args.googleSub, args.anonymousId);
    if (!user) throw new Error("User not found");
    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = user.stats.lastActivityDate;
    const dayStreak =
      lastDate === today ? user.stats.dayStreak : lastDate ? user.stats.dayStreak + 1 : 1;

    await ctx.db.insert("wellnessSessions", {
      userId: user._id,
      type: args.type,
      durationMinutes: args.durationMinutes,
      breathingPace: args.breathingPace,
      completedAt: now,
    });

    await ctx.db.patch(user._id, {
      stats: {
        dayStreak,
        totalSessions: user.stats.totalSessions + 1,
        totalMindfulnessMinutes: user.stats.totalMindfulnessMinutes + args.durationMinutes,
        journalEntryCount: user.stats.journalEntryCount,
        lastActivityDate: today,
      },
      updatedAt: now,
      lastSeenAt: now,
    });
    return user._id;
  },
});
