import { useGoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { fetchGoogleProfile, getGoogleClientId } from "../../lib/google-auth";
import { useApp } from "../../context/app-context";
import { GoogleIcon } from "./GoogleIcon";

type GoogleSignInButtonProps = {
  full?: boolean;
  label?: string;
  /** Returning users skip onboarding and go straight home. */
  returningUser?: boolean;
};

export function GoogleSignInButton({
  full = true,
  label = "Continue with Google",
  returningUser = false,
}: GoogleSignInButtonProps) {
  const { signInWithGoogle, showToast, go, completeOnboarding, onboardingComplete } = useApp();
  const [busy, setBusy] = useState(false);
  const configured = Boolean(getGoogleClientId());

  const login = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (response) => {
      setBusy(true);
      try {
        const profile = await fetchGoogleProfile(response.access_token);
        signInWithGoogle(profile);

        if (returningUser || onboardingComplete) {
          completeOnboarding();
        } else {
          go("goals");
        }
      } catch {
        showToast("Google sign-in failed. Please try again.");
      } finally {
        setBusy(false);
      }
    },
    onError: () => {
      showToast(`Google origin not allowed. Add ${window.location.origin} in Cloud Console.`);
    },
  });

  return (
    <button
      type="button"
      disabled={!configured || busy}
      onClick={() => login()}
      className={`pressable inline-flex items-center justify-center gap-3 rounded-btn border border-[#DADCE0] bg-white px-5 py-3.5 text-[14px] font-semibold text-[#3C4043] shadow-[0_1px_2px_rgba(60,64,67,0.12)] transition hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:opacity-60 dark:border-line dark:bg-surface-card dark:text-ink ${full ? "w-full" : ""}`}
    >
      {busy ? <Loader2 className="h-5 w-5 animate-spin text-ink-muted" aria-hidden /> : <GoogleIcon size={20} />}
      {label}
    </button>
  );
}
