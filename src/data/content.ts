import type { GoalId, MoodId } from "../lib/types";

export const GOALS: { id: GoalId; label: string; description: string }[] = [
  { id: "stress", label: "Reduce stress", description: "Ease tension and find quieter moments" },
  { id: "sleep", label: "Sleep better", description: "Wind down with gentler evenings" },
  { id: "focus", label: "Improve focus", description: "Return to what matters, one breath at a time" },
  { id: "emotions", label: "Understand my emotions", description: "Name what you feel without judgment" },
  { id: "mindfulness", label: "Practice mindfulness", description: "Build a small daily pause" },
  { id: "habits", label: "Build better habits", description: "Grow through small, kind routines" },
  { id: "growth", label: "Personal growth", description: "Reflect, learn, and move forward gently" },
  { id: "talk", label: "Someone to talk to", description: "A private space to be heard" },
];

export const MOODS: {
  id: MoodId;
  label: string;
  caption: string;
  color: string;
  glow: string;
}[] = [
  { id: "great", label: "Great", caption: "Light and open", color: "#93C5FD", glow: "rgba(147, 197, 253, 0.45)" },
  { id: "good", label: "Good", caption: "Steady and well", color: "#A7E3D0", glow: "rgba(167, 227, 208, 0.45)" },
  { id: "okay", label: "Okay", caption: "Somewhere in the middle", color: "#FBBF24", glow: "rgba(251, 191, 36, 0.35)" },
  { id: "low", label: "Low", caption: "A little heavier today", color: "#FDA4AF", glow: "rgba(253, 164, 175, 0.4)" },
  { id: "difficult", label: "Difficult", caption: "It's been a lot", color: "#A78BFA", glow: "rgba(167, 139, 250, 0.45)" },
];

export const QUICK_PROMPTS = [
  "I'm feeling overwhelmed",
  "Help me relax",
  "I can't stop overthinking",
  "I need motivation",
  "Let's meditate",
];

export const JOURNAL_PROMPTS = [
  "What's on your mind today?",
  "What felt heavy, and what felt light?",
  "What would kindness look like for you tonight?",
];

export const MINDFULNESS_CATEGORIES = [
  "All",
  "Breathing",
  "Meditation",
  "Sleep",
  "Stress",
  "Focus",
  "Relaxation",
] as const;

export const PRACTICES = [
  {
    id: "calm-5",
    title: "5-Minute Calm",
    subtitle: "Slow down. Breathe. Reset.",
    duration: "5:00",
    minutes: 5,
    category: "Breathing",
    featured: true,
  },
  {
    id: "reset-5",
    title: "5-Minute Reset",
    subtitle: "A short breathing exercise to help you slow down and refocus.",
    duration: "5:00",
    minutes: 5,
    category: "Breathing",
    featured: false,
  },
  {
    id: "sleep-wind",
    title: "Evening Unwind",
    subtitle: "A gentle close to the day.",
    duration: "10:00",
    minutes: 10,
    category: "Sleep",
    featured: false,
  },
  {
    id: "focus-body",
    title: "Body Scan",
    subtitle: "Notice, without needing to change.",
    duration: "8:00",
    minutes: 8,
    category: "Meditation",
    featured: false,
  },
  {
    id: "stress-release",
    title: "Release Tension",
    subtitle: "Let the shoulders drop. Let the jaw soften.",
    duration: "6:00",
    minutes: 6,
    category: "Stress",
    featured: false,
  },
  {
    id: "focus-clear",
    title: "Clear the Noise",
    subtitle: "A short practice for crowded thoughts.",
    duration: "7:00",
    minutes: 7,
    category: "Focus",
    featured: false,
  },
  {
    id: "relax-soft",
    title: "Soft Landing",
    subtitle: "Arrive in the present, kindly.",
    duration: "4:00",
    minutes: 4,
    category: "Relaxation",
    featured: false,
  },
];

export const CATEGORY_META: Record<string, { count: string; tone: string }> = {
  Breathing: { count: "8 exercises", tone: "lavender" },
  Meditation: { count: "12 sessions", tone: "indigo" },
  Sleep: { count: "6 practices", tone: "pink" },
  Stress: { count: "9 sessions", tone: "coral" },
  Focus: { count: "7 practices", tone: "sky" },
  Relaxation: { count: "10 sessions", tone: "mint" },
};

export const INSIGHT_COPY = {
  week: "You tend to feel better on days when you practice mindfulness.",
  month: "Your journal entries often become gentler after a short breathing practice.",
  "3m": "Small, repeated pauses have been the most consistent part of your week.",
};

export const PRIVACY_LINES = [
  "Your reflections stay yours.",
  "Private by design.",
  "Your data belongs to you.",
];

export function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
