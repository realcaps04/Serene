export type MoodId = "great" | "good" | "okay" | "low" | "difficult";

export type GoalId =
  | "stress"
  | "sleep"
  | "focus"
  | "emotions"
  | "mindfulness"
  | "habits"
  | "growth"
  | "talk";

export type ScreenId =
  | "splash"
  | "welcome"
  | "goals"
  | "mood"
  | "companion-intro"
  | "sign-in"
  | "home"
  | "companion"
  | "mindfulness"
  | "breathing"
  | "journal"
  | "journal-new"
  | "insights"
  | "profile"
  | "settings"
  | "safety"
  | "notifications"
  | "profile-details"
  | "privacy";

export type ChatRole = "ai" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  mood: MoodId;
  createdAt: string;
}

export type AiPersonality = "empathetic" | "calm" | "encouraging";
export type BreathingPace = "slow" | "normal" | "gentle";
export type SoundChoice = "chimes" | "soft-piano" | "nature" | "off";

export interface AppSettings {
  darkMode: boolean;
  aiPersonality: AiPersonality;
  chatReminders: "off" | "daily" | "evening";
  meditationDuration: 5 | 10 | 15;
  breathingPace: BreathingPace;
  reminderTime: string;
  sound: SoundChoice;
  language: string;
}
