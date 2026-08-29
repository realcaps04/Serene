import { ArrowLeft, ChevronRight, Heart, ShieldCheck, UserRound, X } from "lucide-react";
import { useState } from "react";
import { GoogleSignInButton } from "../components/auth/GoogleSignInButton";
import { Logo } from "../components/brand/Logo";
import { Screen, ScreenActions } from "../components/navigation/AppShell";
import { IconButton, PrimaryButton } from "../components/ui/Button";
import { CloudMascot } from "../components/brand/CloudMascot";
import { useApp } from "../context/app-context";
export function CompanionIntroScreen() {
  const { go, completeOnboarding } = useApp();

  return (
    <Screen className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 rounded-full bg-lavender/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-40 w-40 -translate-x-1/2 rounded-full bg-pink-blush/30 blur-3xl" />

      <IconButton label="Back" onClick={() => go("mood")} className="-ml-2">
        <ArrowLeft size={20} />
      </IconButton>

      <div className="relative z-10 mt-2 max-w-sm">
        <h1 className="font-display text-[1.6875rem] font-semibold leading-tight tracking-tight text-[#1A203E]">
          Meet your companion.
        </h1>
        <p className="mt-3 text-body leading-relaxed text-ink-secondary">
          Serene listens without judgment, helps you reflect, and guides you toward healthier mindfulness
          practices.
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-6">
        <CloudMascot size={200} animated />
      </div>

      <ScreenActions className="relative z-10">
        <PrimaryButton full onClick={completeOnboarding}>
          Meet Serene
        </PrimaryButton>
      </ScreenActions>
    </Screen>
  );
}

export function SignInScreen() {
  const { go, completeOnboarding, setName, name } = useApp();
  const [localName, setLocalName] = useState(name === "Partner" ? "Alex" : name);

  const handleNameChange = (value: string) => {
    const next = value.trim() ? value : "Partner";
    setLocalName(value);
    setName(next);
  };

  return (
    <Screen className="relative overflow-y-auto !bg-[#F8F7FC] !px-5 !pb-8">
      <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-[#DDD6FE]/50 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-10 top-40 h-40 w-40 rounded-full bg-[#FBCFE8]/45 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-56 w-56 -translate-x-1/2 rounded-full bg-[#EDE9FE]/35 blur-3xl" aria-hidden />

      <div className="relative z-10 flex flex-col items-center pt-2">
        <Logo size={36} withWordmark className="mb-5" />

        <h1 className="flex items-center gap-2 font-display text-[28px] font-semibold tracking-tight text-[#1A203E]">
          Welcome back
          <Heart size={18} className="fill-pink-premium/20 text-pink-premium" strokeWidth={2} aria-hidden />
        </h1>
        <p className="mt-1.5 text-[14px] font-medium text-[#7C69EF]">Your reflections stay yours.</p>
        <div className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#7C69EF] to-[#F472B6]" aria-hidden />

        <div className="relative my-6 w-full max-w-[280px]">
          <SignInLotusArt />
        </div>

        <section className="w-full rounded-[28px] bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[14px] font-semibold text-[#1A203E]">Name</span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#9499A8]">
              <UserRound size={13} className="text-[#7C69EF]" strokeWidth={2} />
              How should we call you?
            </span>
          </div>

          <div className="relative">
            <UserRound
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7C69EF]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              value={localName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Alex"
              className="w-full rounded-[18px] border border-[#E8E4F8] bg-[#FAFAFE] py-3.5 pl-11 pr-11 text-[15px] font-medium text-[#1A203E] outline-none transition focus:border-[#C4B5FD] focus:bg-white focus:ring-2 focus:ring-[#EDE9FE]"
            />
            {localName ? (
              <button
                type="button"
                onClick={() => handleNameChange("")}
                aria-label="Clear name"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-[#EDE9FE] text-[#7C69EF] transition hover:bg-[#DDD6FE]"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            ) : null}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-[18px] bg-[#F5F3FF] px-4 py-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EDE9FE] text-[#7C69EF]">
              <ShieldCheck size={18} strokeWidth={2} aria-hidden />
            </span>
            <p className="text-[12px] leading-relaxed text-[#6B7280]">
              This preview keeps you signed in locally. No password is stored.
            </p>
          </div>
        </section>

        <div className="mt-5 w-full space-y-3">
          <GoogleSignInButton returningUser showChevron className="rounded-[18px] py-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)]" />
          <PrimaryButton
            full
            onClick={completeOnboarding}
            className="rounded-[18px] bg-gradient-to-r from-[#7C69EF] via-[#8B5CF6] to-[#F472B6] py-4 text-[15px] shadow-[0_10px_24px_rgba(124,105,239,0.35)]"
          >
            Continue
            <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
          </PrimaryButton>
          <button
            type="button"
            className="w-full py-2 text-[14px] font-semibold text-[#7C69EF] transition hover:text-[#6D28D9]"
            onClick={() => go("welcome")}
          >
            Back
          </button>
        </div>
      </div>
    </Screen>
  );
}

function SignInLotusArt() {
  return (
    <svg viewBox="0 0 280 200" className="mx-auto h-auto w-full max-w-[260px]" fill="none" aria-hidden>
      <defs>
        <linearGradient id="lotus-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#F9A8D4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="lotus-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="140" cy="108" r="72" fill="url(#lotus-glow)" />
      <ellipse cx="140" cy="158" rx="88" ry="14" fill="#DDD6FE" fillOpacity="0.35" />
      <ellipse cx="140" cy="164" rx="68" ry="10" fill="#C4B5FD" fillOpacity="0.25" />
      <ellipse cx="140" cy="170" rx="48" ry="7" fill="#A78BFA" fillOpacity="0.2" />

      <path d="M140 58 C118 78 108 98 112 118 C128 108 140 102 140 102 C140 102 152 108 168 118 C172 98 162 78 140 58Z" fill="url(#lotus-petal)" fillOpacity="0.75" />
      <path d="M140 68 C124 82 118 96 120 110 C132 102 140 98 140 98 C140 98 148 102 160 110 C162 96 156 82 140 68Z" fill="url(#lotus-petal)" />
      <path d="M108 96 C98 108 94 122 98 134 C112 124 124 118 140 118 C156 118 168 124 182 134 C186 122 182 108 172 96 C160 104 150 108 140 108 C130 108 120 104 108 96Z" fill="url(#lotus-petal)" fillOpacity="0.88" />
      <path d="M92 112 C88 124 90 136 98 144 C108 132 122 126 140 126 C158 126 172 132 182 144 C190 136 192 124 188 112 C176 120 158 124 140 124 C122 124 104 120 92 112Z" fill="url(#lotus-petal)" fillOpacity="0.7" />
      <ellipse cx="140" cy="128" rx="16" ry="22" fill="#FDF4FF" fillOpacity="0.9" />
      <ellipse cx="140" cy="128" rx="8" ry="14" fill="#F472B6" fillOpacity="0.35" />

      <circle cx="98" cy="82" r="3" fill="#C4B5FD" fillOpacity="0.7" />
      <circle cx="182" cy="78" r="2.5" fill="#F9A8D4" fillOpacity="0.75" />
      <circle cx="72" cy="118" r="2" fill="#DDD6FE" fillOpacity="0.8" />
      <circle cx="208" cy="122" r="2.5" fill="#E9D5FF" fillOpacity="0.75" />
    </svg>
  );
}
