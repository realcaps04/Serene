import {
  Bell,
  ChevronRight,
  CircleHelp,
  Cloud,
  Flame,
  Flower2,
  Globe,
  Lock,
  LogOut,
  NotebookPen,
  Pencil,
  PieChart,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GoogleSignInButton } from "../components/auth/GoogleSignInButton";
import { Avatar } from "../components/brand/Logo";
import { CloudMascot } from "../components/brand/CloudMascot";
import { VerifiedBadge } from "../components/brand/VerifiedBadge";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";
import type { ScreenId } from "../lib/types";

const PERSONALIZATION: MenuItem[] = [
  {
    icon: SlidersHorizontal,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C69EF]",
    title: "Preferences",
    subtitle: "Customize your experience",
    screen: "settings",
  },
  {
    icon: Sparkles,
    iconBg: "bg-[#FCE7F3]",
    iconColor: "text-[#EC4899]",
    title: "AI Companion",
    subtitle: "Personality, tone & more",
    screen: "settings",
  },
  {
    icon: Bell,
    iconBg: "bg-[#FEE2E2]",
    iconColor: "text-[#F472B6]",
    title: "Notifications",
    subtitle: "Manage reminders & alerts",
    screen: "notifications",
  },
  {
    icon: Target,
    iconBg: "bg-[#D1FAE5]",
    iconColor: "text-[#34D399]",
    title: "Mindfulness Goals",
    subtitle: "Track and update your goals",
    screen: "goals",
  },
];

const ACCOUNT: MenuItem[] = [
  {
    icon: Shield,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#8B5CF6]",
    title: "Privacy",
    subtitle: "Your data & privacy controls",
    screen: "privacy",
  },
  {
    icon: Globe,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#60A5FA]",
    title: "Language",
    subtitle: "Choose your preferred language",
    screen: "settings",
  },
  {
    icon: PieChart,
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#FB923C]",
    title: "Data & Insights",
    subtitle: "View your progress and insights",
    screen: "insights",
  },
  {
    icon: CircleHelp,
    iconBg: "bg-[#CCFBF1]",
    iconColor: "text-[#2DD4BF]",
    title: "Help & Support",
    subtitle: "Get help whenever you need",
    screen: "safety",
  },
];

type MenuItem = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  screen: ScreenId;
};

export function ProfileScreen() {
  const { name, googleUser, dayStreak, sessions, journalEntries, userCreatedAt, go, signOutGoogle, showToast } = useApp();
  const isLoggedIn = Boolean(googleUser);
  const displayName = isLoggedIn ? formatFirstName(googleUser?.name ?? name) : "Partner";
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    setLoginOpen(!googleUser);
  }, [googleUser]);

  return (
    <Screen className="pb-2">
      <ProfileLoginModal open={loginOpen && !isLoggedIn} onClose={() => setLoginOpen(false)} />
      <header className="relative z-0 mb-5 min-h-[5.25rem] pt-1">
        <div
          className="pointer-events-none absolute right-0 top-0 z-0 h-[6.75rem] w-[6.75rem] overflow-hidden rounded-full opacity-95"
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-br from-[#C4B5FD] via-[#F9A8D4] to-[#FBCFE8]" />
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-[#5B21B6]/30">
            <path
              fill="currentColor"
              d="M92 28c-8 4-14 12-16 22-6-2-12 0-16 4-4 8-2 18 4 24-10 2-18 8-22 18-8-14-4-32 10-42 8-6 18-8 28-6 4-8 8-14 12-20z"
            />
            <circle cx="88" cy="32" r="10" fill="#FDE68A" opacity="0.85" />
          </svg>
        </div>

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-1.5 font-display text-[26px] font-semibold tracking-tight text-[#1A203E]">
              Profile
              <span className="mt-1 h-2 w-2 rounded-full bg-pink-premium" aria-hidden />
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#9499A8]">Your wellness journey 💗</p>
          </div>
          <button
            type="button"
            onClick={() => go("settings")}
            aria-label="Open settings"
            className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#EDE9FE] shadow-[0_4px_14px_rgba(124,105,239,0.15)]"
          >
            <Settings size={18} className="text-[#7C69EF]" strokeWidth={1.85} />
          </button>
        </div>
      </header>

      <section className="relative z-[1] mb-6 rounded-[24px] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.07)]">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <Avatar name={displayName} picture={isLoggedIn ? googleUser?.picture : undefined} size={72} />
            <button
              type="button"
              onClick={() => go("profile-details")}
              aria-label="Edit profile"
              className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-[#7C69EF] text-white shadow-[0_2px_8px_rgba(124,105,239,0.45)]"
            >
              <Pencil size={12} strokeWidth={2.25} />
            </button>
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-[20px] font-semibold text-[#1A203E]">{displayName}</p>
              {isLoggedIn ? <VerifiedBadge size={36} /> : null}
            </div>
            {userCreatedAt ? (
              <p className="mt-0.5 text-[12px] text-[#9499A8]">{formatMindfulSince(userCreatedAt)}</p>
            ) : null}
          </div>
        </div>

        <blockquote className="mt-5 overflow-x-auto text-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="whitespace-nowrap text-[11px] italic text-[#9499A8] sm:text-[12px]">
            <span className="font-display text-[#DDD6FE]" aria-hidden>
              &ldquo;
            </span>
            Small steps every day create big changes.
            <span className="font-display text-[#DDD6FE]" aria-hidden>
              &rdquo;
            </span>
          </p>
        </blockquote>

        <div className="mt-6 grid grid-cols-3 divide-x divide-[#EEF0F6]">
          <ProfileStat icon={Flame} iconClass="text-[#7C69EF]" value={String(dayStreak)} label="Day streak" />
          <ProfileStat icon={Flower2} iconClass="text-pink-premium" value={String(sessions)} label="Sessions" />
          <ProfileStat
            icon={NotebookPen}
            iconClass="text-sky"
            value={String(journalEntries.length)}
            label="Journal entries"
          />
        </div>
      </section>

      <MenuSection title="Personalization" items={PERSONALIZATION} onNavigate={go} />

      <MenuSection title="Account & Privacy" items={ACCOUNT} onNavigate={go} onLanguage={() => showToast("English is available in this preview.")} />

      {isLoggedIn ? (
        <button
          type="button"
          onClick={signOutGoogle}
          className="mb-4 flex w-full items-center gap-3 rounded-[20px] border border-[#FECDD3] bg-[#FFF1F2] px-4 py-3.5 text-left transition-colors hover:bg-[#FFE4E6]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-crisis shadow-sm">
            <LogOut size={18} strokeWidth={1.85} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-crisis">Log out</span>
            <span className="block text-[11px] text-[#F87171]">Sign out of your Serene account</span>
          </span>
        </button>
      ) : null}

      <section className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#EDE9FE] via-[#F3E8FF] to-[#DBEAFE] p-4 shadow-[0_6px_20px_rgba(124,105,239,0.12)]">
        <div className="flex items-center gap-3">
          <CloudMascot size={52} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#1A203E]">
              You&apos;re doing great, {displayName}! 💜
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B7280]">
              Keep going — every mindful moment brings you closer to a calmer mind.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go("companion")}
            aria-label="Open companion"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#7C69EF] shadow-sm"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </section>
    </Screen>
  );
}

function ProfileLoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A203E]/45 backdrop-blur-[6px]"
        aria-label="Close login prompt"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="profile-login-title"
        className="relative max-h-[min(92dvh,720px)] w-full max-w-[360px] overflow-y-auto rounded-[28px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-[#F4F4F6] text-[#9499A8] transition hover:bg-[#EDE9FE] hover:text-[#7C69EF]"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <ProfileLoginHero />

        <div className="px-6 pb-6 pt-2 text-center">
          <h2 id="profile-login-title" className="font-display text-[22px] font-semibold leading-tight text-[#1A203E]">
            Sign in to your profile
          </h2>
          <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-relaxed text-[#9499A8]">
            Connect with Google to save your name, photo, and unlock your verified badge across all your devices.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <LoginFeature
              icon={ShieldCheck}
              iconBg="bg-[#EDE9FE]"
              iconColor="text-[#7C69EF]"
              title="Secure & Private"
              subtitle="Your data is safe with us"
            />
            <LoginFeature
              icon={Cloud}
              iconBg="bg-[#EDE9FE]"
              iconColor="text-[#8B5CF6]"
              title="Sync Everywhere"
              subtitle="Access your journey on any device"
            />
            <LoginFeature
              icon={Sparkles}
              iconBg="bg-[#FCE7F3]"
              iconColor="text-[#EC4899]"
              title="Verified You"
              subtitle="Get your verified badge"
            />
          </div>

          <div className="mt-6 space-y-3">
            <GoogleSignInButton
              label="Sign in with Google"
              showChevron
              onSignedIn={onClose}
              className="rounded-[18px] border-[#E8EAF2] py-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)]"
            />

            <div className="flex items-center gap-3 py-0.5">
              <span className="h-px flex-1 bg-[#EEF0F5]" />
              <span className="text-[12px] font-medium text-[#9499A8]">or</span>
              <span className="h-px flex-1 bg-[#EEF0F5]" />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="pressable flex w-full items-center justify-between rounded-[18px] bg-[#EDE9FE] px-5 py-4 text-left shadow-[0_4px_14px_rgba(124,105,239,0.12)] transition hover:bg-[#DDD6FE]"
            >
              <span className="inline-flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-[#7C69EF]">
                  <Users size={18} strokeWidth={2} aria-hidden />
                </span>
                <span className="text-[14px] font-semibold text-[#1A203E]">Continue as Partner</span>
              </span>
              <ChevronRight size={18} className="text-[#9499A8]" aria-hidden />
            </button>
          </div>

          <p className="mx-auto mt-5 flex max-w-[280px] items-start justify-center gap-1.5 text-[10px] leading-relaxed text-[#9499A8]">
            <Lock size={12} className="mt-0.5 shrink-0 text-[#7C69EF]" strokeWidth={2} aria-hidden />
            <span>We never post without your permission. You&apos;re always in control.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileLoginHero() {
  return (
    <div className="relative overflow-hidden px-6 pb-2 pt-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5F3FF] via-[#FAFAFE] to-white" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-8 h-36 w-36 -translate-x-1/2 rounded-full bg-[#EDE9FE]/80 blur-2xl" aria-hidden />
      <Sparkles size={14} className="pointer-events-none absolute left-8 top-12 text-[#C4B5FD]/70" aria-hidden />
      <Sparkles size={11} className="pointer-events-none absolute right-10 top-16 text-[#F9A8D4]/80" aria-hidden />

      <div className="relative mx-auto flex h-[120px] max-w-[260px] items-end justify-center gap-3">
        <svg viewBox="0 0 40 56" className="absolute bottom-2 left-6 h-14 w-10 text-[#C4B5FD]/45" aria-hidden>
          <path fill="currentColor" d="M20 4c-6 8-10 16-10 24 0 6 4 12 10 16 6-4 10-10 10-16 0-8-4-16-10-24Z" />
        </svg>
        <svg viewBox="0 0 40 56" className="absolute bottom-0 right-8 h-16 w-10 text-[#F9A8D4]/40" aria-hidden>
          <path fill="currentColor" d="M20 4c-6 8-10 16-10 24 0 6 4 12 10 16 6-4 10-10 10-16 0-8-4-16-10-24Z" />
        </svg>

        <CloudMascot size={88} animated className="relative z-10 -mr-2 drop-shadow-[0_10px_24px_rgba(147,197,253,0.35)]" />
        <VerifiedBadge size={56} className="relative z-10 mb-3" />
      </div>
    </div>
  );
}

function LoginFeature({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center px-1 text-center">
      <span className={`grid h-10 w-10 place-items-center rounded-full ${iconBg}`}>
        <Icon size={18} className={iconColor} strokeWidth={2} aria-hidden />
      </span>
      <p className="mt-2 text-[10px] font-semibold leading-tight text-[#1A203E]">{title}</p>
      <p className="mt-1 text-[9px] leading-snug text-[#9499A8]">{subtitle}</p>
    </div>
  );
}

function formatFirstName(fullName: string) {
  const first = fullName.trim().split(" ")[0] || "Partner";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function formatMindfulSince(createdAt: number) {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();
  return `Mindful since ${month} ${year}`;
}

function ProfileStat({
  icon: Icon,
  iconClass,
  value,
  label,
}: {
  icon: LucideIcon;
  iconClass: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <Icon size={18} className={iconClass} strokeWidth={1.85} aria-hidden />
      <p className="mt-1.5 font-display text-[22px] font-semibold leading-none text-[#1A203E]">{value}</p>
      <p className="mt-1 text-[10px] font-medium text-[#9499A8]">{label}</p>
    </div>
  );
}

function MenuSection({
  title,
  items,
  onNavigate,
  onLanguage,
}: {
  title: string;
  items: MenuItem[];
  onNavigate: (screen: ScreenId) => void;
  onLanguage?: () => void;
}) {
  return (
    <section className="mb-5">
      <h2 className="mb-2.5 px-0.5 text-[14px] font-semibold text-[#1A203E]">{title}</h2>
      <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)]">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              if (item.title === "Language" && onLanguage) {
                onLanguage();
                return;
              }
              onNavigate(item.screen);
            }}
            className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#FAFAFC] ${
              index < items.length - 1 ? "border-b border-[#F0F1F5]" : ""
            }`}
          >
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${item.iconBg}`}>
              <item.icon size={18} className={item.iconColor} strokeWidth={1.85} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold text-[#1A203E]">{item.title}</span>
              <span className="block text-[11px] text-[#9499A8]">{item.subtitle}</span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-[#C4C9D6]" aria-hidden />
          </button>
        ))}
      </div>
    </section>
  );
}
