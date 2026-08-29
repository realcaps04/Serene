import {
  Bell,
  Heart,
  Sprout,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";

function FriendsHeroArt() {
  return (
    <div className="relative mx-auto mb-2 flex h-[148px] w-full max-w-[280px] items-end justify-center" aria-hidden>
      <div className="absolute inset-x-6 bottom-6 top-2 rounded-[999px] bg-gradient-to-b from-[#EDE9FE]/90 via-[#F5F3FF] to-transparent blur-[1px]" />
      <div className="absolute bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#DDD6FE]/50 blur-xl" />
      <svg viewBox="0 0 220 140" className="relative h-[132px] w-[220px]">
        <ellipse cx="110" cy="118" rx="72" ry="10" fill="#C4B5FD" opacity="0.25" />
        <circle cx="110" cy="72" r="46" fill="#EDE9FE" opacity="0.85" />
        <circle cx="110" cy="72" r="34" fill="#F5F3FF" />
        <path
          d="M78 58c-8 6-12 16-10 26 2 10 10 18 20 20 8 2 16-1 22-7 6-6 9-14 8-22-2-14-14-24-28-24-6 0-12 2-16 5z"
          fill="#93C5FD"
        />
        <path
          d="M142 58c8 6 12 16 10 26-2 10-10 18-20 20-8 2-16-1-22-7-6-6-9-14-8-22 2-14 14-24 28-24 6 0 12 2 16 5z"
          fill="#F9A8D4"
        />
        <circle cx="92" cy="66" r="4" fill="#1A203E" />
        <circle cx="128" cy="66" r="4" fill="#1A203E" />
        <path d="M98 78c6 5 18 5 24 0" stroke="#1A203E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M62 42c4-8 10-12 18-10M158 42c-4-8-10-12-18-10" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="34" r="4" fill="#F472B6" opacity="0.55" />
        <circle cx="166" cy="30" r="3" fill="#A78BFA" opacity="0.55" />
      </svg>
    </div>
  );
}

const FEATURES = [
  {
    title: "Connect",
    subtitle: "Add and connect with your friends",
    icon: UserPlus,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C69EF]",
    trailing: UserPlus,
    trailingColor: "text-[#C4B5FD]",
  },
  {
    title: "Support",
    subtitle: "Cheer each other on your journey",
    icon: Heart,
    iconBg: "bg-[#FCE7F3]",
    iconColor: "text-[#EC4899]",
    trailing: Heart,
    trailingColor: "text-[#FBCFE8]",
  },
  {
    title: "Grow Together",
    subtitle: "Share progress and stay motivated",
    icon: Sprout,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#34D399]",
    trailing: TrendingUp,
    trailingColor: "text-[#A7F3D0]",
  },
] as const;

export function FriendsScreen() {
  const { showToast } = useApp();

  return (
    <Screen className="overflow-y-auto !bg-[#F6F4FB] !px-4 !pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
      <header className="mb-4 flex items-start justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[2rem] font-bold tracking-[-0.03em] text-[#1A203E]">Friends</h1>
            <span className="rounded-full bg-[#FCE7F3] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#EC4899]">
              New
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-[#9499A8]">Stronger together, always.</p>
        </div>
        <button
          type="button"
          aria-label="Add friend"
          onClick={() => showToast("Friends invites are coming soon.")}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#7C69EF] shadow-[0_4px_16px_rgba(124,105,239,0.14)] transition hover:bg-[#FAF7FF]"
        >
          <UserPlus size={20} strokeWidth={2} />
        </button>
      </header>

      <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
        <div className="bg-gradient-to-b from-[#F5F3FF] via-[#FAFAFE] to-white px-5 pb-2 pt-5">
          <FriendsHeroArt />
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-white shadow-[0_6px_20px_rgba(124,105,239,0.16)]">
            <Users size={24} className="text-[#7C69EF]" strokeWidth={2} />
          </div>
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#FCE7F3] px-3 py-1 text-[11px] font-semibold text-[#EC4899]">
              Coming Soon
            </span>
            <h2 className="mt-3 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-[#1A203E]">
              Friends is on the way!
            </h2>
            <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-relaxed text-[#9499A8]">
              Soon you&apos;ll be able to connect with friends, share your wellness journey, and support each
              other every step of the way.
            </p>
          </div>
        </div>

        <div className="space-y-0 px-3 pb-3 pt-1">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const Trailing = feature.trailing;
            return (
              <div
                key={feature.title}
                className={`flex items-center gap-3 rounded-[18px] px-3 py-3.5 ${
                  index < FEATURES.length - 1 ? "border-b border-[#F3F4F8]" : ""
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${feature.iconBg}`}>
                  <Icon size={18} className={feature.iconColor} strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-[#1A203E]">{feature.title}</p>
                  <p className="text-[11px] text-[#9499A8]">{feature.subtitle}</p>
                </div>
                <Trailing size={18} className={`shrink-0 ${feature.trailingColor}`} strokeWidth={2} aria-hidden />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-4 flex items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EDE9FE] text-[#7C69EF]">
          <Bell size={20} strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-[#1A203E]">Be the first to know</p>
          <p className="text-[11px] text-[#9499A8]">Get notified when Friends launches</p>
        </div>
        <button
          type="button"
          onClick={() => showToast("You're on the list! We'll notify you when Friends is ready.")}
          className="shrink-0 rounded-full border border-[#C4B5FD] px-4 py-2 text-[12px] font-semibold text-[#7C69EF] transition hover:bg-[#FAF7FF]"
        >
          Notify Me
        </button>
      </section>
    </Screen>
  );
}
