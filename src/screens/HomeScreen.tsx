import { Bell, Heart, Leaf, Pencil, Wind } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Avatar } from "../components/brand/Logo";
import { CloudMascot } from "../components/brand/CloudMascot";
import { useApp } from "../context/app-context";
import type { ScreenId } from "../lib/types";

const QUICK_ACTIONS: {
  title: string;
  subtitle: string;
  color: string;
  icon: typeof Leaf;
  screen: ScreenId;
}[] = [
  { title: "Grounding", subtitle: "Calm your mind", color: "#5B9BD5", icon: Leaf, screen: "mindfulness" },
  { title: "Breathing", subtitle: "Reset & relax", color: "#F59E0B", icon: Wind, screen: "breathing" },
  { title: "Journal", subtitle: "Write it out", color: "#A78BFA", icon: Pencil, screen: "journal" },
  { title: "Affirmations", subtitle: "Build positivity", color: "#FBBF24", icon: Heart, screen: "companion" },
];

const FEATURED: {
  title: string;
  description: string;
  duration: string;
  recommended?: boolean;
  image: string;
  tint: string;
  screen: ScreenId;
}[] = [
  {
    title: "Manage Worries",
    description: "Learn which worries you can act on and which ones to let go",
    duration: "10 mins",
    recommended: true,
    image: "/home/worries.jpg",
    tint: "#6BA4D8",
    screen: "companion",
  },
  {
    title: "Reflect On Your Day",
    description: "Take a moment to pause, reflect and relax",
    duration: "10 mins",
    image: "/home/reflect.jpg",
    tint: "#7BC4A0",
    screen: "journal",
  },
  {
    title: "Sleep Better Tonight",
    description: "Gentle guidance to unwind before bed",
    duration: "12 mins",
    image: "/home/sleep.jpg",
    tint: "#6B7FD7",
    screen: "mindfulness",
  },
  {
    title: "Calm Breathing",
    description: "Slow your breath and settle your nervous system",
    duration: "5 mins",
    recommended: true,
    image: "/home/breathing.jpg",
    tint: "#E8A87C",
    screen: "breathing",
  },
  {
    title: "Build Confidence",
    description: "Practice self-belief with kind, steady steps",
    duration: "8 mins",
    image: "/home/confidence.jpg",
    tint: "#B89AE8",
    screen: "mindfulness",
  },
  {
    title: "Morning Gratitude",
    description: "Start the day with a softer, clearer mind",
    duration: "7 mins",
    image: "/home/gratitude.jpg",
    tint: "#F5B896",
    screen: "journal",
  },
];

function FeaturedCard({
  title,
  description,
  duration,
  recommended,
  image,
  tint,
  onStart,
}: {
  title: string;
  description: string;
  duration: string;
  recommended?: boolean;
  image: string;
  tint: string;
  onStart: () => void;
}) {
  return (
    <article className="relative min-h-[210px] overflow-hidden rounded-[28px] shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-0 flex">
        <div className="w-[44%]" style={{ backgroundColor: tint }} />
        <img src={image} alt="" className="h-full w-[56%] object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative flex min-h-[210px] flex-col justify-end p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink">{duration}</span>
          {recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FBBF24] px-3 py-1 text-[11px] font-semibold text-white">
              ★ Recommended
            </span>
          ) : null}
        </div>
        <h2 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{title}</h2>
        <p className="mt-1 max-w-[18rem] text-sm leading-relaxed text-white/90">{description}</p>
        <button
          type="button"
          onClick={onStart}
          className="pressable mt-4 w-fit rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink shadow-soft"
        >
          Start
        </button>
      </div>
    </article>
  );
}

export function HomeScreen() {
  const { name, googleUser, go } = useApp();

  return (
    <Screen className="relative overflow-y-auto bg-[#F4F4F6] pb-40 dark:bg-surface-secondary">
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={() => go("profile")} aria-label="Open profile">
          <Avatar name={name} picture={googleUser?.picture} size={44} />
        </button>
        <button
          type="button"
          onClick={() => go("notifications")}
          aria-label="Notifications"
          className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[#E8E8ED] text-ink-secondary"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F43F5E]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {QUICK_ACTIONS.map(({ title, subtitle, color, icon: Icon, screen }) => (
          <button
            key={title}
            type="button"
            onClick={() => go(screen)}
            className="pressable flex items-center gap-3 rounded-[22px] bg-white p-3.5 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:bg-surface-card"
          >
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              <Icon size={20} strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold text-ink">{title}</span>
              <span className="block text-[12px] text-ink-muted">{subtitle}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="relative mt-5 space-y-4">
        {FEATURED.map((item) => (
          <FeaturedCard key={item.title} {...item} onStart={() => go(item.screen)} />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-shell">
        <button
          type="button"
          onClick={() => go("companion")}
          aria-label="Talk to Serene"
          className="pointer-events-auto absolute right-4 drop-shadow-[0_12px_28px_rgba(244,114,182,0.35)]"
        >
          <CloudMascot size={104} animated />
        </button>
      </div>
    </Screen>
  );
}
