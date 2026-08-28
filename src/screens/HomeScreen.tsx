import { Bell, BookOpen, Check, Play, Smile, Wind } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { IconButton, PrimaryButton } from "../components/ui/Button";
import { Card, GradientCard } from "../components/ui/Card";
import { MoodSelector } from "../components/mood/MoodSelector";
import { ProgressCard } from "../components/wellness/Wellness";
import { useApp } from "../context/app-context";
import { greetingForHour } from "../data/content";

export function HomeScreen() {
  const { name, homeMood, setHomeMood, go, dayStreak } = useApp();
  const greeting = greetingForHour(new Date().getHours());

  return (
    <Screen className="overflow-y-auto">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="font-display text-section font-semibold text-ink">
            {greeting}, {name}
          </h1>
          <p className="mt-1 text-body text-ink-secondary">How are you feeling today?</p>
        </div>
        <IconButton label="Notifications" onClick={() => go("notifications")}>
          <Bell size={20} />
        </IconButton>
      </div>

      <Card className="p-4">
        <p className="mb-2 text-sm font-semibold text-ink">How are you feeling right now?</p>
        <MoodSelector value={homeMood} onChange={setHomeMood} compact />
      </Card>

      <GradientCard className="mt-5">
        <svg className="pointer-events-none absolute right-2 top-4 h-28 w-28 opacity-40" viewBox="0 0 80 80" aria-hidden>
          <path
            d="M40 72c-8-18 6-22 4-36 10 4 16 14 22 10-6 16-10 22-26 26Z"
            fill="white"
          />
          <path d="M28 30c8-16 22-10 20 4-10 2-14 8-20-4Z" fill="white" fillOpacity="0.7" />
        </svg>
        <p className="font-display text-xl font-semibold">Talk to Serene</p>
        <p className="mt-1 max-w-[16rem] text-sm text-white/90">
          I'm here to listen, help you reflect, or simply slow things down.
        </p>
        <button
          type="button"
          onClick={() => go("companion")}
          className="pressable mt-4 rounded-btn bg-white px-4 py-2.5 text-sm font-semibold text-indigo-brand shadow-soft"
        >
          Start a chat
        </button>
      </GradientCard>

      <div className="mt-7 flex items-end justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Today's wellness</h2>
        <button type="button" className="text-sm font-medium text-indigo-brand" onClick={() => go("insights")}>
          See all
        </button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <ProgressCard label="Mindfulness" value="5 min" icon={<Wind size={18} />} />
        <ProgressCard label="Mood" value={homeMood === "low" || homeMood === "difficult" ? "Tender" : "Calm"} icon={<Smile size={18} />} />
        <ProgressCard label="Journal" value={`${Math.min(dayStreak, 2)} day streak`} icon={<BookOpen size={18} />} />
        <ProgressCard label="Breathing" value="Completed" icon={<Check size={18} />} />
      </div>

      <h2 className="mt-7 font-display text-lg font-semibold text-ink">Today's practice</h2>
      <Card className="mt-3 flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">5-Minute Reset</p>
          <p className="mt-1 text-body text-ink-secondary">
            A short breathing exercise to help you slow down and refocus.
          </p>
          <PrimaryButton className="mt-3 !px-5 !py-2.5" onClick={() => go("breathing")}>
            Start
          </PrimaryButton>
        </div>
        <button
          type="button"
          aria-label="Start 5-Minute Reset"
          onClick={() => go("breathing")}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-indigo-brand text-white shadow-soft"
        >
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </button>
      </Card>
    </Screen>
  );
}
