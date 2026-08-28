import { useMemo, useState } from "react";
import { Brain, Focus, Moon, Sparkles, Sun, Wind } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { Card } from "../components/ui/Card";
import { MeditationCard } from "../components/wellness/Wellness";
import { useApp } from "../context/app-context";
import { CATEGORY_META, MINDFULNESS_CATEGORIES, PRACTICES } from "../data/content";

const CAT_ICONS = {
  Breathing: Wind,
  Meditation: Sparkles,
  Sleep: Moon,
  Stress: Brain,
  Focus: Focus,
  Relaxation: Sun,
};

export function MindfulnessScreen() {
  const { go } = useApp();
  const [category, setCategory] = useState<(typeof MINDFULNESS_CATEGORIES)[number]>("All");

  const featured = PRACTICES.find((p) => p.featured)!;
  const list = useMemo(
    () => PRACTICES.filter((p) => category === "All" || p.category === category),
    [category],
  );

  return (
    <Screen className="overflow-y-auto">
      <Header title="Mindfulness" subtitle="Take a moment for yourself." />

      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {MINDFULNESS_CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                active ? "bg-indigo-brand text-white shadow-soft" : "bg-lavender-surface text-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mb-3 mt-6 text-sm font-semibold text-ink">Featured</p>
      <MeditationCard
        featured
        title={featured.title}
        subtitle={featured.subtitle}
        duration={featured.duration}
        onPlay={() => go("breathing")}
      />

      <p className="mb-3 mt-7 text-sm font-semibold text-ink">Explore by category</p>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(CATEGORY_META).map(([name, meta]) => {
          const Icon = CAT_ICONS[name as keyof typeof CAT_ICONS];
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name as (typeof MINDFULNESS_CATEGORIES)[number])}
              className="pressable rounded-card border border-line bg-surface-card p-4 text-left shadow-soft"
            >
              <Icon size={18} className="text-indigo-brand" strokeWidth={1.75} />
              <p className="mt-2 font-semibold text-ink">{name}</p>
              <p className="text-meta text-ink-muted">{meta.count}</p>
            </button>
          );
        })}
      </div>

      {category !== "All" ? (
        <div className="mt-6 space-y-3">
          {list.map((practice) => (
            <Card key={practice.id} className="p-4">
              <p className="font-semibold text-ink">{practice.title}</p>
              <p className="text-body text-ink-secondary">{practice.subtitle}</p>
            </Card>
          ))}
        </div>
      ) : null}
    </Screen>
  );
}
