import { ArrowLeft, Heart, Info, Phone, Users } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { IconButton } from "../components/ui/Button";
import { useApp } from "../context/app-context";

export function SafetyScreen() {
  const { go } = useApp();

  return (
    <Screen className="overflow-y-auto">
      <Header
        align="center"
        title="Get Support"
        subtitle="You're not alone."
        left={
          <IconButton label="Back" onClick={() => go("profile")}>
            <ArrowLeft size={20} />
          </IconButton>
        }
      />

      <div className="mb-6 flex flex-col items-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-pink-faint text-pink-premium shadow-soft">
          <Heart size={40} fill="currentColor" />
        </div>
        <p className="mt-4 max-w-sm text-center text-body text-ink-secondary">
          If you're in crisis or need immediate support, real-world help is always available.
        </p>
      </div>

      <a
        href="tel:112"
        className="pressable mb-3 flex items-center justify-between rounded-card-lg bg-gradient-to-r from-pink-premium to-coral px-4 py-4 text-white shadow-soft"
      >
        <span>
          <span className="flex items-center gap-2 font-semibold">
            <Phone size={16} /> Contact Emergency Services
          </span>
          <span className="mt-1 block text-sm text-white/90">Call your local emergency number</span>
        </span>
        <span aria-hidden>›</span>
      </a>

      <a
        href="https://www.iasp.info/suicidalthoughts/"
        target="_blank"
        rel="noreferrer"
        className="pressable mb-3 flex items-center justify-between rounded-card-lg bg-gradient-to-r from-lavender to-lavender-light px-4 py-4 text-white shadow-soft"
      >
        <span>
          <span className="block font-semibold">Crisis Support Services</span>
          <span className="mt-1 block text-sm text-white/90">Find a helpline near you</span>
        </span>
        <span aria-hidden>›</span>
      </a>

      <button
        type="button"
        className="pressable flex w-full items-center justify-between rounded-card-lg bg-gradient-to-r from-lavender-light to-sky px-4 py-4 text-left text-indigo-deep shadow-soft"
      >
        <span>
          <span className="flex items-center gap-2 font-semibold">
            <Users size={16} /> Talk to Someone You Trust
          </span>
          <span className="mt-1 block text-sm opacity-80">Reach out to a friend or family</span>
        </span>
        <span aria-hidden>›</span>
      </button>

      <p className="mt-8 flex items-start gap-2 text-meta text-ink-muted">
        <Info size={14} className="mt-0.5 shrink-0" />
        Serene is a wellness companion and not a replacement for professional mental-health care.
      </p>
    </Screen>
  );
}

export function PrivacyScreen() {
  const { go } = useApp();
  return (
    <Screen>
      <Header
        title="Privacy"
        subtitle="Private by design."
        left={
          <IconButton label="Back" onClick={() => go("profile")}>
            <ArrowLeft size={20} />
          </IconButton>
        }
      />
      <div className="space-y-3 text-body text-ink-secondary">
        <p>Your reflections stay yours. This preview keeps notes on this device only.</p>
        <p>Your data belongs to you. You can stop using Serene at any time.</p>
        <p>We avoid claims like “100% secure” — privacy is a practice, not a slogan.</p>
      </div>
    </Screen>
  );
}
