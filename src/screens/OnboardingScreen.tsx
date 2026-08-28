import { motion } from "framer-motion";
import { Logo } from "../components/brand/Logo";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";

export function OnboardingScreen() {
  const { go, setName } = useApp();

  return (
    <Screen className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-lavender/30 via-pink-surface to-transparent" />
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] w-full text-lavender"
        viewBox="0 0 390 280"
        fill="none"
        aria-hidden
      >
        <ellipse cx="196" cy="70" rx="46" ry="46" fill="white" fillOpacity="0.7" />
        <path d="M0 168c48-36 96-54 148-42 52 12 86 18 140-8 42-20 72-8 102 18v144H0V168Z" fill="#DDD6FE" />
        <path d="M0 196c62-28 118-38 168-14 58 28 96 8 148-10 36-12 52 8 74 22v86H0V196Z" fill="#FBCFE8" fillOpacity="0.85" />
        <path d="M0 228c70-18 130-8 188 8 50 14 90-10 202-4v48H0v-52Z" fill="#A78BFA" fillOpacity="0.35" />
      </svg>

      <div className="relative z-10 flex flex-1 flex-col">
        <motion.div
          className="mt-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size={72} />
          <h1 className="mt-5 font-display text-hero font-semibold text-[#1A203E]">Serene</h1>
          <p className="mt-2 text-body font-medium text-[#1A203E]">
            Mindfulness • AI Companion • Wellbeing
          </p>
        </motion.div>

        <div className="relative z-10 mt-auto space-y-3 pb-4 pt-8">
          <h2 className="text-center font-display text-[1.65rem] font-semibold leading-snug text-ink">
            Your mind deserves a calmer space.
          </h2>
          <p className="mx-auto max-w-sm text-center text-body text-ink-secondary">
            Serene is your AI-powered companion for mindfulness, reflection, and everyday wellbeing.
          </p>
          <PrimaryButton
            full
            onClick={() => {
              setName("Partner");
              go("goals");
            }}
          >
            Get Started
          </PrimaryButton>
          <SecondaryButton
            full
            onClick={() => {
              setName("Alex");
              go("sign-in");
            }}
          >
            I already have an account
          </SecondaryButton>
          <p className="pt-1 text-center text-meta text-ink-muted">Private by design. Your data belongs to you.</p>
        </div>
      </div>
    </Screen>
  );
}
