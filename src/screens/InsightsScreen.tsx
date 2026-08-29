import { useState } from "react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { Card } from "../components/ui/Card";
import { InsightCard } from "../components/wellness/Wellness";
import { useApp } from "../context/app-context";
import { INSIGHT_COPY } from "../data/content";

const TABS = ["Week", "Month", "3 Months"] as const;
const POINTS = [0.35, 0.45, 0.4, 0.55, 0.62, 0.78, 0.84];

export function InsightsScreen() {
  const { mindfulnessMinutes, journalEntries } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Week");
  const key = tab === "Week" ? "week" : tab === "Month" ? "month" : "3m";

  return (
    <Screen className="overflow-y-auto">
      <Header title="Your reflections" subtitle="Small patterns can reveal meaningful progress." />

      <div className="mb-5 flex rounded-full bg-lavender-surface p-1">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
              tab === item ? "bg-lavender text-white shadow-soft" : "text-ink-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <Card className="p-4">
        <p className="mb-3 text-sm font-semibold text-ink">Mood this week</p>
        <svg viewBox="0 0 320 140" className="w-full" role="img" aria-label="Mood trend over the week, generally rising">
          <text x="8" y="18" fontSize="13">🙂</text>
          <text x="8" y="58" fontSize="13">😐</text>
          <text x="8" y="98" fontSize="13">🙁</text>
          <path
            d={linePath(POINTS)}
            fill="none"
            stroke="#A78BFA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {POINTS.map((p, i) => (
            <circle key={i} cx={48 + i * 38} cy={120 - p * 100} r="4" fill="#5865F2" />
          ))}
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <text key={d} x={40 + i * 38} y="136" fontSize="9" fill="#94A3B8">
              {d}
            </text>
          ))}
        </svg>
      </Card>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-meta text-ink-muted">Mindfulness minutes</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{mindfulnessMinutes}</p>
          <p className="text-meta text-success">+20% from last week</p>
        </Card>
        <Card className="p-4">
          <p className="text-meta text-ink-muted">Journal entries</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{journalEntries.length}</p>
          <p className="text-meta text-success">+1 from last week</p>
        </Card>
      </div>

      <div className="mt-4">
        <InsightCard title="A gentle pattern" body={INSIGHT_COPY[key]} />
      </div>
      <p className="mt-4 text-meta text-ink-muted">
        These notes describe your habits, not a diagnosis. Serene cannot assess mental-health conditions.
      </p>
    </Screen>
  );
}

function linePath(points: number[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${48 + i * 38} ${120 - p * 100}`)
    .join(" ");
}
