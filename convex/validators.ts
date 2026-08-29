import { v } from "convex/values";

export const moodId = v.union(
  v.literal("great"),
  v.literal("good"),
  v.literal("okay"),
  v.literal("low"),
  v.literal("difficult"),
);

export const goalId = v.union(
  v.literal("stress"),
  v.literal("sleep"),
  v.literal("focus"),
  v.literal("emotions"),
  v.literal("mindfulness"),
  v.literal("habits"),
  v.literal("growth"),
  v.literal("talk"),
);

export const aiPersonality = v.union(
  v.literal("empathetic"),
  v.literal("calm"),
  v.literal("encouraging"),
);

export const chatReminders = v.union(v.literal("off"), v.literal("daily"), v.literal("evening"));

export const meditationDuration = v.union(v.literal(5), v.literal(10), v.literal(15));

export const breathingPace = v.union(v.literal("slow"), v.literal("normal"), v.literal("gentle"));

export const soundChoice = v.union(
  v.literal("chimes"),
  v.literal("soft-piano"),
  v.literal("nature"),
  v.literal("off"),
);

export const userSettings = v.object({
  darkMode: v.boolean(),
  aiPersonality,
  chatReminders,
  meditationDuration,
  breathingPace,
  reminderTime: v.string(),
  sound: soundChoice,
  language: v.string(),
});

export const userStats = v.object({
  dayStreak: v.number(),
  totalSessions: v.number(),
  totalMindfulnessMinutes: v.number(),
  journalEntryCount: v.number(),
  lastActivityDate: v.optional(v.string()),
});

export const journalEntry = v.object({
  clientId: v.string(),
  title: v.string(),
  body: v.string(),
  mood: moodId,
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
});

export const chatMessage = v.object({
  clientId: v.string(),
  role: v.union(v.literal("ai"), v.literal("user")),
  text: v.string(),
  accentColor: v.optional(v.string()),
  createdAt: v.number(),
});

export const moodCheckIn = v.object({
  mood: moodId,
  source: v.union(
    v.literal("onboarding"),
    v.literal("home"),
    v.literal("journal"),
    v.literal("notification"),
  ),
  createdAt: v.number(),
});

export const wellnessSession = v.object({
  type: v.union(v.literal("breathing"), v.literal("meditation"), v.literal("grounding")),
  durationMinutes: v.number(),
  breathingPace: v.optional(breathingPace),
  completedAt: v.number(),
});

export const notificationItem = v.object({
  clientId: v.string(),
  filter: v.union(v.literal("wellbeing"), v.literal("reminders"), v.literal("updates")),
  title: v.string(),
  body: v.string(),
  read: v.boolean(),
  createdAt: v.number(),
  actionRoute: v.optional(v.string()),
});
