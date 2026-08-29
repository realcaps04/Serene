import { motion } from "framer-motion";
import { Logo } from "../components/brand/Logo";
import { GoogleSignInButton } from "../components/auth/GoogleSignInButton";
import { PrimaryButton } from "../components/ui/Button";
import { Screen, ScreenActions } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";

function WelcomeLandscape() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="welcome-sky" x1="195" y1="0" x2="195" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF5FA" />
          <stop offset="45%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#EDE9FE" />
        </linearGradient>
        <linearGradient id="welcome-water" x1="195" y1="560" x2="195" y2="844" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <rect width="390" height="844" fill="url(#welcome-sky)" />

      <ellipse cx="196" cy="318" rx="34" ry="34" fill="white" fillOpacity="0.88" />

      <path
        d="M0 360c52-28 98-42 156-34 58 8 104 4 156-18 52-22 78-10 78-10V520H0V360Z"
        fill="#DDD6FE"
        fillOpacity="0.95"
      />
      <path
        d="M0 410c68-24 128-34 188-12 60 22 110 10 202-6v132H0V410Z"
        fill="#C4B5FD"
        fillOpacity="0.72"
      />
      <path
        d="M0 470c74-18 142-10 204 10 62 20 118-6 186 4v360H0V470Z"
        fill="#FBCFE8"
        fillOpacity="0.82"
      />
      <path
        d="M0 540c82-14 150-6 214 12 64 18 118-8 176 2v290H0V540Z"
        fill="#A78BFA"
        fillOpacity="0.28"
      />

      <rect x="0" y="560" width="390" height="284" fill="url(#welcome-water)" />
      <path
        d="M0 598c48 8 96 6 148-2 52-8 96-4 148 8 52 12 94 8 94 8v230H0V598Z"
        fill="#FFFFFF"
        fillOpacity="0.12"
      />
    </svg>
  );
}

export function OnboardingScreen() {
  const { go, setName } = useApp();

  return (
    <Screen className="relative overflow-hidden !px-0">
      <WelcomeLandscape />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5">
        <motion.div
          className="flex flex-1 flex-col items-center justify-center pt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size={80} />
          <h1 className="mt-5 font-display text-[2.2875rem] font-semibold tracking-[-0.03em] text-[#1A203E]">
            Serene
          </h1>
          <p className="mt-3 text-[0.9175rem] font-medium text-[#1A203E]">Mindfulness • AI Companion</p>
          <p className="mt-1 text-[0.8575rem] font-normal text-ink-secondary">Wellbeing for everyone</p>
        </motion.div>

        <ScreenActions className="relative z-10 space-y-3">
          <PrimaryButton
            full
            onClick={() => {
              setName("Partner");
              go("goals");
            }}
          >
            Get Started
          </PrimaryButton>
          <GoogleSignInButton />
          <button
            type="button"
            className="w-full text-sm font-medium text-[#1A203E]"
            onClick={() => {
              setName("Alex");
              go("sign-in");
            }}
          >
            I already have an account
          </button>
        </ScreenActions>
      </div>
    </Screen>
  );
}
