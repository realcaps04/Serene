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
  {
    title: "Grounding",
    subtitle: "Calm your mind",
    color: "#5B9BD5",
    icon: Leaf,
    screen: "mindfulness",
  },
  {
    title: "Breathing",
    subtitle: "Reset & relax",
    color: "#F59E0B",
    icon: Wind,
    screen: "breathing",
  },
  {
    title: "Journal",
    subtitle: "Write it out",
    color: "#A78BFA",
    icon: Pencil,
    screen: "journal",
  },
  {
    title: "Affirmations",
    subtitle: "Build positivity",
    color: "#FBBF24",
    icon: Heart,
    screen: "companion",
  },
];

const FEATURED: {
  title: string;
  description: string;
  duration: string;
  recommended: boolean;
  image: string;
  screen: ScreenId;
}[] = [
  {
    title: "Manage Worries",
    description: "Learn which worries you can act on and which ones to let go",
    duration: "10 mins",
    recommended: true,
    image:
      "https://images.unsplash.com/photo-1499002238440-d26445359607?auto=format&fit=crop&w=900&q=80",
    screen: "companion",
  },
  {
    title: "Reflect On Your Day",
    description: "Take a moment to pause, reflect and relax",
    duration: "10 mins",
    recommended: false,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    screen: "journal",
  },
];

export function HomeScreen() {
  const { name, go } = useApp();

  return (
    <Screen className="relative overflow-y-auto bg-[#F4F4F6] pb-32 dark:bg-surface-secondary">
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={() => go("profile")} aria-label="Open profile">
          <Avatar name={name} size={44} />
        </button>
        <button
          type="button"
          onClick={() => go("notifications")}
          aria-label="Notifications"
          className="relative grid h-11 w-11 place-items-center rounded-full bg-[#E8E8ED] text-ink-secondary"
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
        {FEATURED.map((item, index) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-[28px] shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
          >
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/5" />
            <div className="relative flex min-h-[210px] flex-col justify-end p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink">
                  {item.duration}
                </span>
                {item.recommended ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FBBF24] px-3 py-1 text-[11px] font-semibold text-white">
                    ★ Recommended
                  </span>
                ) : null}
              </div>
              <h2 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{item.title}</h2>
              <p className="mt-1 max-w-[18rem] text-sm leading-relaxed text-white/90">{item.description}</p>
              <button
                type="button"
                onClick={() => go(item.screen)}
                className="pressable mt-4 w-fit rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                Start
              </button>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={() => go("companion")}
          aria-label="Talk to Serene"
          className="absolute -bottom-4 right-0 z-20"
        >
          <CloudMascot size={112} animated />
        </button>
      </div>
    </Screen>
  );
}
