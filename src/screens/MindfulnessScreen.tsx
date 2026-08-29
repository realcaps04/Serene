import {
  ArrowRight,
  BarChart3,
  Brain,
  ChevronRight,
  Clock3,
  Focus,
  Heart,
  Moon,
  Play,
  Sparkles,
  Star,
  Sun,
  Wind,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CloudMascot } from "../components/brand/CloudMascot";
import { MindfulnessPlayer } from "../components/mindfulness/MindfulnessPlayer";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";
import {
  CATEGORY_META,
  MINDFULNESS_CATEGORIES,
  PRACTICES,
  type MindfulnessCategory,
  type MindfulnessPractice,
} from "../data/content";

const CAT_ICONS = {
  Breathing: Wind,
  Meditation: Sparkles,
  Sleep: Moon,
  Stress: Brain,
  Focus: Focus,
  Relaxation: Sun,
} as const;

const CAT_STYLES: Record<string, { bg: string; icon: string }> = {
  Breathing: { bg: "bg-[#EDE9FE]", icon: "text-[#7C69EF]" },
  Meditation: { bg: "bg-[#FCE7F3]", icon: "text-[#EC4899]" },
  Sleep: { bg: "bg-[#E0E7FF]", icon: "text-[#6366F1]" },
  Stress: { bg: "bg-[#F3E8FF]", icon: "text-[#A855F7]" },
  Focus: { bg: "bg-[#CCFBF1]", icon: "text-[#14B8A6]" },
  Relaxation: { bg: "bg-[#FEF3C7]", icon: "text-[#D97706]" },
};

function FeaturedLandscape() {
  return (
    <svg viewBox="0 0 360 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="55%" stopColor="#EDE9FE" />
          <stop offset="100%" stopColor="#E0E7FF" />
        </linearGradient>
      </defs>
      <rect width="360" height="160" fill="url(#sky)" />
      <circle cx="290" cy="42" r="28" fill="#FFF7ED" opacity="0.95" />
      <path d="M0 118 C60 92, 120 108, 180 96 C240 84, 300 104, 360 88 L360 160 L0 160 Z" fill="#DDD6FE" opacity="0.55" />
      <path d="M0 128 C70 112, 140 122, 210 110 C280 98, 320 118, 360 108 L360 160 L0 160 Z" fill="#C4B5FD" opacity="0.45" />
      <path d="M0 138 C80 128, 160 136, 240 124 C300 116, 330 132, 360 126 L360 160 L0 160 Z" fill="#A78BFA" opacity="0.28" />
    </svg>
  );
}

export function MindfulnessScreen() {
  const { completeMindfulnessPractice, showToast } = useApp();
  const [category, setCategory] = useState<MindfulnessCategory>("All");
  const [activePractice, setActivePractice] = useState<MindfulnessPractice | null>(null);
  const [favorited, setFavorited] = useState(false);

  const featured = PRACTICES.find((p) => p.featured)!;
  const list = useMemo(
    () => PRACTICES.filter((p) => category === "All" || p.category === category),
    [category],
  );

  const startPractice = (practice: MindfulnessPractice) => {
    setActivePractice(practice);
  };

  return (
    <>
      <Screen className="overflow-y-auto !bg-[#F6F4FB] !px-4 !pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
        <header className="mb-4 flex items-start justify-between gap-3 pt-1">
          <div>
            <h1 className="bg-gradient-to-r from-[#7C69EF] via-[#A855F7] to-[#EC4899] bg-clip-text font-display text-[2rem] font-bold tracking-[-0.03em] text-transparent">
              Mindfulness
            </h1>
            <p className="mt-0.5 text-[13px] text-[#9499A8]">Take a moment for yourself.</p>
          </div>
          <button
            type="button"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            onClick={() => {
              setFavorited((f) => !f);
              showToast(favorited ? "Removed from favorites." : "Saved to favorites.");
            }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
          >
            <Heart
              size={20}
              className={favorited ? "fill-[#EC4899] text-[#EC4899]" : "text-[#EC4899]"}
              strokeWidth={2}
            />
          </button>
        </header>

        <div className="scrollbar-none -mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1">
          {MINDFULNESS_CATEGORIES.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] text-white shadow-[0_6px_18px_rgba(139,92,246,0.28)]"
                    : "bg-white text-[#1A203E] shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {(category === "All" || featured.category === category) && (
          <section className="relative mb-6 overflow-hidden rounded-[24px] shadow-[0_10px_32px_rgba(15,23,42,0.08)]">
            <FeaturedLandscape />
            <div className="relative flex min-h-[168px] items-end gap-3 p-4">
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-[1.2rem] font-bold text-[#312E81]">{featured.title}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FCE7F3] px-2 py-0.5 text-[10px] font-bold text-[#EC4899]">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[#5B5675]">{featured.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-[#6366F1] backdrop-blur-sm">
                    <Clock3 size={11} />
                    {featured.duration} Duration
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-[#6366F1] backdrop-blur-sm">
                    <BarChart3 size={11} />
                    Beginner Level
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Play ${featured.title}`}
                onClick={() => startPractice(featured)}
                className="pressable mb-1 grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(124,105,239,0.22)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </span>
              </button>
            </div>
          </section>
        )}

        <h3 className="mb-3 font-display text-[1.05rem] font-bold text-[#1A203E]">Explore by category</h3>
        <div className="space-y-2.5">
          {Object.entries(CATEGORY_META).map(([name, meta]) => {
            const Icon = CAT_ICONS[name as keyof typeof CAT_ICONS];
            const styles = CAT_STYLES[name] ?? CAT_STYLES.Breathing;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name as MindfulnessCategory)}
                className="pressable flex w-full items-center gap-3 rounded-[20px] bg-white px-4 py-3.5 text-left shadow-[0_6px_22px_rgba(15,23,42,0.05)]"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${styles.bg}`}>
                  <Icon size={20} className={styles.icon} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-[#1A203E]">{name}</span>
                  <span className="block text-[11px] text-[#9499A8]">
                    {meta.count} · {meta.tagline}
                  </span>
                </span>
                <ChevronRight size={18} className="shrink-0 text-[#C4C9D6]" />
              </button>
            );
          })}
        </div>

        {category !== "All" ? (
          <div className="mt-5 space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#9499A8]">{category} sessions</p>
            {list.map((practice) => (
              <button
                key={practice.id}
                type="button"
                onClick={() => startPractice(practice)}
                className="pressable flex w-full items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 text-left shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-[#1A203E]">{practice.title}</span>
                  <span className="block text-[11px] text-[#9499A8]">
                    {practice.duration} · {practice.subtitle}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : null}

        <section className="mt-6 flex items-center gap-3 rounded-[22px] bg-gradient-to-r from-[#EDE9FE] via-[#F5F3FF] to-[#FCE7F3] p-4 shadow-[0_6px_22px_rgba(124,105,239,0.12)]">
          <CloudMascot size={56} animated className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-[14px] font-bold text-[#1A203E]">Small moments, big changes</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#9499A8]">
              Consistency is the key to a calmer, happier you.
            </p>
          </div>
          <button
            type="button"
            aria-label="Start featured practice"
            onClick={() => startPractice(featured)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white shadow-[0_6px_18px_rgba(139,92,246,0.35)]"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </section>
      </Screen>

      {activePractice ? (
        <MindfulnessPlayer
          practice={activePractice}
          open={Boolean(activePractice)}
          onClose={() => setActivePractice(null)}
          onComplete={completeMindfulnessPractice}
        />
      ) : null}
    </>
  );
}
