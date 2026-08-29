import { ArrowLeft } from "lucide-react";
import { Header } from "../components/navigation/Chrome";
import { Screen, ScreenActions } from "../components/navigation/AppShell";
import { IconButton, PrimaryButton } from "../components/ui/Button";
import { MoodCard } from "../components/mood/MoodSelector";
import { MoodWheel } from "../components/mood/MoodWheel";
import { useApp } from "../context/app-context";
import { MOODS } from "../data/content";

export function MoodScreen() {
  const { go, mood, setMood } = useApp();

  return (
    <Screen className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-20%] top-32 h-64 w-64 rounded-full bg-lavender/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-48 h-56 w-56 rounded-full bg-pink-blush/40 blur-3xl" />

      <Header
        title="How are you feeling today?"
        subtitle="There are no right or wrong answers."
        left={
          <IconButton label="Back" onClick={() => go("goals")}>
            <ArrowLeft size={20} />
          </IconButton>
        }
        right={
          <button type="button" className="text-sm font-medium text-indigo-brand" onClick={() => go("companion-intro")}>
            Skip
          </button>
        }
      />

      <div className="relative grid grid-cols-3 gap-3">
        {MOODS.slice(0, 3).map((item) => (
          <MoodCard key={item.id} mood={item} selected={mood === item.id} onSelect={() => setMood(item.id)} />
        ))}
      </div>
      <div className="relative mx-auto mt-3 grid w-[70%] grid-cols-2 gap-3">
        {MOODS.slice(3).map((item) => (
          <MoodCard key={item.id} mood={item} selected={mood === item.id} onSelect={() => setMood(item.id)} />
        ))}
      </div>

      <div className="relative mt-6 flex justify-center">
        <MoodWheel selected={mood} />
      </div>

      <ScreenActions>
        <PrimaryButton full onClick={() => go("companion-intro")} disabled={!mood}>
          Continue
        </PrimaryButton>
      </ScreenActions>
    </Screen>
  );
}
