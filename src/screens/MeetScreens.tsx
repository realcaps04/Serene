import { ArrowLeft } from "lucide-react";
import { GoogleSignInButton } from "../components/auth/GoogleSignInButton";
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
  const { go, completeOnboarding, setName } = useApp();

  return (
    <Screen>
      <h1 className="font-display text-section font-semibold text-ink">Welcome back</h1>
      <p className="mt-1 text-body text-ink-secondary">Your reflections stay yours.</p>
      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-ink">Name</span>
        <input
          defaultValue="Alex"
          onChange={(e) => setName(e.target.value || "Alex")}
          className="w-full rounded-input border border-line bg-white px-4 py-3.5 text-body text-ink shadow-soft outline-none dark:bg-surface-card"
        />
      </label>
      <p className="mt-4 text-body text-ink-secondary">
        This preview keeps you signed in locally. No password is stored.
      </p>
      <ScreenActions className="space-y-3">
        <GoogleSignInButton returningUser />
        <PrimaryButton full onClick={completeOnboarding}>
          Continue
        </PrimaryButton>
        <button type="button" className="w-full text-sm font-medium text-indigo-brand" onClick={() => go("welcome")}>
          Back
        </button>
      </ScreenActions>
    </Screen>
  );
}
