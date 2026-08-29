import {
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  Heart,
  NotebookPen,
  Settings,
  Smile,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";

type FilterId = "all" | "wellbeing" | "reminders" | "updates";

type NotificationItem = {
  id: string;
  filter: Exclude<FilterId, "all">;
  section: "today" | "earlier";
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  color: string;
};

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wellbeing", label: "Wellbeing" },
  { id: "reminders", label: "Reminders" },
  { id: "updates", label: "Updates" },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    filter: "reminders",
    section: "today",
    title: "Mindfulness Reminder",
    body: "Take a 5-minute break to breathe and reset. 🌿",
    time: "9:30 AM",
    read: false,
    icon: Smile,
    color: "#A78BFA",
  },
  {
    id: "n2",
    filter: "wellbeing",
    section: "today",
    title: "Daily Check-in",
    body: "How are you feeling today? Share your mood with us. 💜",
    time: "8:15 AM",
    read: false,
    icon: Heart,
    color: "#F472B6",
  },
  {
    id: "n3",
    filter: "reminders",
    section: "today",
    title: "Journal Prompt",
    body: "What's one thing you're grateful for today? ✨",
    time: "Yesterday",
    read: true,
    icon: NotebookPen,
    color: "#FB923C",
  },
  {
    id: "n4",
    filter: "updates",
    section: "earlier",
    title: "Goal Achievement",
    body: "You've completed 7 days of mindfulness practice! 🎉",
    time: "2 days ago",
    read: true,
    icon: Trophy,
    color: "#34D399",
  },
];

function BellArt() {
  return (
    <div className="relative shrink-0" aria-hidden>
      <div className="absolute -inset-3 rounded-full bg-pink-premium/15 blur-xl" />
      <Sparkles size={14} className="absolute -right-1 top-0 text-pink-premium/70" />
      <Sparkles size={10} className="absolute bottom-2 -left-2 text-lavender/80" />
      <div className="relative grid h-[72px] w-[72px] place-items-center rounded-full bg-gradient-to-br from-pink-premium/25 via-lavender/20 to-sky/30">
        <Bell size={36} className="text-pink-premium drop-shadow-[0_4px_12px_rgba(244,114,182,0.35)]" strokeWidth={1.75} />
      </div>
    </div>
  );
}

function NotificationRow({
  item,
  onToggleRead,
}: {
  item: NotificationItem;
  onToggleRead: (id: string) => void;
}) {
  const Icon = item.icon;

  return (
    <div className="relative flex gap-2">
      {!item.read ? (
        <span className="absolute -left-2 top-5 h-2 w-2 rounded-full bg-pink-premium" aria-hidden />
      ) : null}
      <article className="flex min-w-0 flex-1 gap-3 rounded-[20px] bg-white px-3.5 py-3.5 shadow-[0_4px_18px_rgba(88,101,242,0.07)]">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${item.color}ee 0%, ${item.color} 55%, ${item.color}cc 100%)`,
          }}
        >
          <Icon size={20} className="text-white" strokeWidth={2.1} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-semibold leading-snug text-[#2E2E5D]">{item.title}</p>
            <span className="shrink-0 text-[10px] font-medium text-[#9499A8]">{item.time}</span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-[#7A7F8E]">{item.body}</p>
        </div>
        <button
          type="button"
          aria-label={item.read ? "Read" : "Mark as read"}
          onClick={() => onToggleRead(item.id)}
          className="mt-0.5 shrink-0 self-start"
        >
          {item.read ? (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ECECF0] text-[#9499A8]">
              <Check size={12} strokeWidth={2.5} />
            </span>
          ) : (
            <span className="block h-2.5 w-2.5 rounded-full bg-indigo-brand" />
          )}
        </button>
      </article>
    </div>
  );
}

export function NotificationsScreen() {
  const { go } = useApp();
  const [filter, setFilter] = useState<FilterId>("all");
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((n) => n.filter === filter)),
    [filter, items],
  );

  const today = filtered.filter((n) => n.section === "today");
  const earlier = filtered.filter((n) => n.section === "earlier");

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  return (
    <Screen className="overflow-y-auto !bg-[#F6F4FB] !px-4">
      <header className="mb-4 grid grid-cols-[44px_1fr_44px] items-center">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => go("home")}
          className="pressable grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink-secondary shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
        >
          <ArrowLeft size={20} strokeWidth={1.85} />
        </button>
        <div />
        <button
          type="button"
          aria-label="Notification settings"
          onClick={() => go("settings")}
          className="pressable grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink-secondary shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
        >
          <Settings size={19} strokeWidth={1.85} />
        </button>
      </header>

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-[#2E2E5D]">
            Notifications
          </h1>
          <p className="mt-1.5 max-w-[14rem] text-[12px] leading-relaxed text-[#7A7F8E]">
            Stay updated with what matters to your wellbeing. 💗
          </p>
        </div>
        <BellArt />
      </div>

      <div className="mb-5 rounded-[999px] bg-white/80 p-1 shadow-[0_4px_16px_rgba(88,101,242,0.06)]">
        <div className="grid grid-cols-4 gap-1">
          {FILTERS.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`pressable rounded-[999px] px-2 py-2 text-[11px] font-semibold transition ${
                  active
                    ? "bg-indigo-brand text-white shadow-[0_4px_12px_rgba(88,101,242,0.28)]"
                    : "text-[#9499A8]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 pb-4">
        {today.length ? (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold text-[#2E2E5D]">Today</h2>
              <button
                type="button"
                onClick={markAllRead}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-brand"
              >
                <CheckCheck size={14} strokeWidth={2.25} />
                Mark all as read
              </button>
            </div>
            <div className="space-y-3 pl-2">
              {today.map((item) => (
                <NotificationRow key={item.id} item={item} onToggleRead={toggleRead} />
              ))}
            </div>
          </section>
        ) : null}

        {earlier.length ? (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold text-[#2E2E5D]">Earlier</h2>
            <div className="space-y-3 pl-2">
              {earlier.map((item) => (
                <NotificationRow key={item.id} item={item} onToggleRead={toggleRead} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="relative mb-2 overflow-hidden rounded-[22px] bg-gradient-to-r from-lavender/35 via-pink-blush/50 to-lavender-light/40 p-4 shadow-[0_6px_20px_rgba(88,101,242,0.08)]">
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/70 text-indigo-brand shadow-soft">
            <Sparkles size={20} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#2E2E5D]">Stay in tune with yourself</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#7A7F8E]">
              Customize which reminders reach you and when.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go("settings")}
            className="pressable shrink-0 rounded-[999px] bg-indigo-brand px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(88,101,242,0.3)]"
          >
            Manage Settings
          </button>
        </div>
      </div>
    </Screen>
  );
}
