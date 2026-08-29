import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  breathingPace,
  goalId,
  moodId,
  userSettings,
  userStats,
} from "./validators";

/**
 * Serene wellness app — user data lives here (Google or anonymous Partner accounts).
 */
export default defineSchema({
  users: defineTable({
    /** Google OAuth subject — primary identity when signed in. */
    googleSub: v.optional(v.string()),
    /** Stable anonymous id before Google sign-in (localStorage). */
    anonymousId: v.optional(v.string()),
    email: v.optional(v.string()),
    googleName: v.optional(v.string()),
    displayName: v.string(),
    pictureUrl: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    contactNumber: v.optional(v.string()),
    profileQuote: v.optional(v.string()),
    onboardingComplete: v.boolean(),
    memberSince: v.number(),
    goals: v.array(goalId),
    settings: userSettings,
    stats: userStats,
    /** Latest moods for quick restore. */
    currentMood: v.optional(moodId),
    homeMood: v.optional(moodId),
    journalDraft: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    lastSeenAt: v.number(),
  })
    .index("by_google_sub", ["googleSub"])
    .index("by_anonymous_id", ["anonymousId"])
    .index("by_email", ["email"]),

  journalEntries: defineTable({
    userId: v.id("users"),
    clientId: v.string(),
    title: v.string(),
    body: v.string(),
    mood: moodId,
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_client", ["userId", "clientId"])
    .index("by_user_and_time", ["userId", "createdAt"]),

  chatMessages: defineTable({
    userId: v.id("users"),
    clientId: v.string(),
    role: v.union(v.literal("ai"), v.literal("user")),
    text: v.string(),
    accentColor: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_client", ["userId", "clientId"])
    .index("by_user_and_time", ["userId", "createdAt"]),

  moodCheckIns: defineTable({
    userId: v.id("users"),
    mood: moodId,
    source: v.union(
      v.literal("onboarding"),
      v.literal("home"),
      v.literal("journal"),
      v.literal("notification"),
    ),
    createdAt: v.number(),
  }).index("by_user_and_time", ["userId", "createdAt"]),

  wellnessSessions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("breathing"), v.literal("meditation"), v.literal("grounding")),
    durationMinutes: v.number(),
    breathingPace: v.optional(breathingPace),
    completedAt: v.number(),
  }).index("by_user_and_time", ["userId", "completedAt"]),

  notifications: defineTable({
    userId: v.id("users"),
    clientId: v.string(),
    filter: v.union(v.literal("wellbeing"), v.literal("reminders"), v.literal("updates")),
    title: v.string(),
    body: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
    actionRoute: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_client", ["userId", "clientId"])
    .index("by_user_and_time", ["userId", "createdAt"]),
});
