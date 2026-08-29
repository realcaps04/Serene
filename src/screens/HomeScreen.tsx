import { Bell } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Avatar } from "../components/brand/Logo";
import { QuickActionGlyph, type QuickActionId } from "../components/brand/QuickActionIcons";
import { CloudMascot } from "../components/brand/CloudMascot";
import { useApp } from "../context/app-context";
import type { ScreenId } from "../lib/types";

const QUICK_ACTIONS: {
  id: QuickActionId;
  title: string;
  subtitle: string;
  screen: ScreenId;
}[] = [
  { id: "grounding", title: "Grounding", subtitle: "Calm your mind", screen: "mindfulness" },
  { id: "breathing", title: "Breathing", subtitle: "Reset & relax", screen: "breathing" },
  { id: "journal", title: "Journal", subtitle: "Write it out", screen: "journal" },
  { id: "affirmations", title: "Affirmations", subtitle: "Build positivity", screen: "companion" },
];

const FEATURED: {
  title: string;
  description: string;
  duration: string;
  recommended?: boolean;
  image: string;
  screen: ScreenId;
}[] = [
  {
    title: "Manage Worries",
    description: "Learn which worries you can act on and which ones to let go",
    duration: "10 mins",
    recommended: true,
    image: "/home/worries.jpg",
    screen: "companion",
  },
  {
    title: "Reflect On Your Day",
    description: "Take a moment to pause, reflect and relax",
    duration: "10 mins",
    image: "/home/reflect.jpg",
    screen: "journal",
  },
  {
    title: "Sleep Better Tonight",
    description: "Gentle guidance to unwind before bed",
    duration: "12 mins",
    image: "/home/sleep.jpg",
    screen: "mindfulness",
  },
  {
    title: "Calm Breathing",
    description: "Slow your breath and settle your nervous system",
    duration: "5 mins",
    recommended: true,
    image: "/home/breathing.jpg",
    screen: "breathing",
  },
  {
    title: "Build Confidence",
    description: "Practice self-belief with kind, steady steps",
    duration: "8 mins",
    image: "/home/confidence.jpg",
    screen: "mindfulness",
  },
  {
    title: "Morning Gratitude",
    description: "Start the day with a softer, clearer mind",
    duration: "7 mins",
    image: "/home/gratitude.jpg",
    screen: "journal",
  },
];

function FeaturedCard({
  title,
  description,
  duration,
  recommended,
  image,
  onStart,
}: {
  title: string;
  description: string;
  duration: string;
  recommended?: boolean;
  image: string;
  onStart: () => void;
}) {
  return (
    <article className="relative min-h-[210px] overflow-hidden rounded-[28px] shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />

      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink">
        {duration}
      </span>
      {recommended ? (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#FBBF24]">
          ★ Recommended
        </span>
      ) : null}

      <div className="relative flex min-h-[210px] flex-col justify-end p-5">
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
    <Screen className="relative overflow-y-auto !pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
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
        {QUICK_ACTIONS.map(({ id, title, subtitle, screen }) => (
          <button
            key={title}
            type="button"
            onClick={() => go(screen)}
            className="pressable flex items-center gap-3 rounded-[22px] bg-white p-3.5 text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:bg-surface-card"
          >
            <QuickActionGlyph id={id} />
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

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(12rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-shell">
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
