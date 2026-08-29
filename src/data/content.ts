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
  wheelColor: string;
}[] = [
  {
    id: "great",
    label: "Great",
    caption: "I'm feeling amazing!",
    color: "#60A5FA",
    glow: "rgba(96, 165, 250, 0.45)",
    wheelColor: "#93C5FD",
  },
  {
    id: "good",
    label: "Good",
    caption: "I'm feeling good",
    color: "#34D399",
    glow: "rgba(52, 211, 153, 0.4)",
    wheelColor: "#A7E3D0",
  },
  {
    id: "okay",
    label: "Okay",
    caption: "I'm doing okay.",
    color: "#FBBF24",
    glow: "rgba(251, 191, 36, 0.35)",
    wheelColor: "#FCD34D",
  },
  {
    id: "low",
    label: "Low",
    caption: "I'm feeling low",
    color: "#FB7185",
    glow: "rgba(251, 113, 133, 0.4)",
    wheelColor: "#FDA4AF",
  },
  {
    id: "difficult",
    label: "Difficult",
    caption: "I'm having a tough time.",
    color: "#A78BFA",
    glow: "rgba(167, 139, 250, 0.45)",
    wheelColor: "#C4B5FD",
  },
];

export const QUICK_PROMPTS = [
  "I'm feeling overwhelmed",
  "Help me relax",
  "I can't stop overthinking",
  "I need motivation",
  "Let's meditate",
];

export type WorryStarter = {
  id: string;
  title: string;
  subtitle: string;
  prompt: string;
  color: string;
  icon: "leaf" | "cloud" | "help" | "heart" | "pen" | "wind" | "list" | "moon";
};

export const WORRY_STARTERS: WorryStarter[] = [
  {
    id: "act",
    title: "Act on it",
    subtitle: "Actionable Things List",
    prompt: "I want to act on a worry",
    color: "#60A5FA",
    icon: "leaf",
  },
  {
    id: "release",
    title: "Let it go",
    subtitle: "Things to Release",
    prompt: "Help me let something go",
    color: "#FB923C",
    icon: "cloud",
  },
  {
    id: "unsure",
    title: "Not sure",
    subtitle: "Help me sort it out",
    prompt: "I'm not sure how to handle this worry",
    color: "#A78BFA",
    icon: "help",
  },
  {
    id: "sit",
    title: "Sit with it",
    subtitle: "Pause & Reflect",
    prompt: "I want to sit with this feeling for a moment",
    color: "#34D399",
    icon: "heart",
  },
  {
    id: "journal",
    title: "Write it down",
    subtitle: "Journal Entry",
    prompt: "Help me write this worry down",
    color: "#818CF8",
    icon: "pen",
  },
  {
    id: "breathe",
    title: "Breathe first",
    subtitle: "Calm Before Sorting",
    prompt: "I need to calm down before sorting this worry",
    color: "#38BDF8",
    icon: "wind",
  },
  {
    id: "plan",
    title: "Make a plan",
    subtitle: "Small Next Steps",
    prompt: "Help me make a small plan for this worry",
    color: "#F472B6",
    icon: "list",
  },
  {
    id: "rest",
    title: "Sleep on it",
    subtitle: "Rest Before Deciding",
    prompt: "I think I should rest before deciding on this",
    color: "#C084FC",
    icon: "moon",
  },
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
