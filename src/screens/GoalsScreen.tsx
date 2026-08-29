import { ArrowLeft } from "lucide-react";
import { Header } from "../components/navigation/Chrome";
import { Screen, ScreenActions } from "../components/navigation/AppShell";
import { IconButton, PrimaryButton } from "../components/ui/Button";
import { GoalGlyph } from "../components/brand/GoalIcons";
import { useApp } from "../context/app-context";
import { GOALS } from "../data/content";

export function GoalsScreen() {
  const { go, goals, toggleGoal } = useApp();

  return (
    <Screen>
      <Header
        title="What brings you here?"
        subtitle="Select all that apply"
        left={
          <IconButton label="Back" onClick={() => go("welcome")}>
            <ArrowLeft size={20} />
          </IconButton>
        }
        right={
          <button type="button" className="text-sm font-medium text-indigo-brand" onClick={() => go("mood")}>
            Skip
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((goal) => {
          const selected = goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              aria-pressed={selected}
              className={`pressable flex min-h-[132px] flex-col items-center justify-center gap-2.5 rounded-card px-3 py-4 text-center transition ${
                selected
                  ? "border border-indigo-brand bg-lavender-surface shadow-soft"
                  : "border border-transparent bg-white shadow-soft dark:border-line dark:bg-surface-card"
              }`}
            >
              <GoalGlyph id={goal.id} />
              <span className={`text-sm font-semibold leading-snug ${selected ? "text-indigo-brand" : "text-ink"}`}>
                {goal.label}
              </span>
            </button>
          );
        })}
      </div>

      <ScreenActions>
        <PrimaryButton full onClick={() => go("mood")} disabled={goals.length === 0}>
          Continue
        </PrimaryButton>
      </ScreenActions>
    </Screen>
  );
}
