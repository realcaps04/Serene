import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Settings as SettingsIcon,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Avatar } from "../components/brand/Logo";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { Card } from "../components/ui/Card";
import { SettingsRow } from "../components/ui/Overlay";
import { useApp } from "../context/app-context";

export function ProfileScreen() {
  const { name, googleUser, dayStreak, sessions, journalEntries, go } = useApp();

  return (
    <Screen className="overflow-y-auto">
      <Header align="center" title="Profile" />

      <div className="mb-5 flex items-center gap-3">
        <Avatar name={name} picture={googleUser?.picture} size={56} />
        <div>
          <p className="font-display text-xl font-semibold text-ink">{name}</p>
          <p className="text-body text-ink-secondary">
            {googleUser?.email ?? "Your wellness journey"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat value={String(dayStreak)} label="Day streak" />
        <Stat value={String(sessions)} label="Sessions" />
        <Stat value={String(journalEntries.length)} label="Journal entries" />
      </div>

      <Card className="mt-6 divide-y divide-line overflow-hidden p-0">
        <SettingsRow icon={SettingsIcon} title="Preferences" onClick={() => go("settings")} />
        <SettingsRow icon={Bell} title="Notifications" onClick={() => go("notifications")} />
        <SettingsRow icon={Sparkles} title="AI Personality" value="Empathetic" onClick={() => go("settings")} />
        <SettingsRow icon={Lock} title="Privacy" onClick={() => go("privacy")} />
        <SettingsRow icon={Globe} title="Language" value="English" onClick={() => go("settings")} />
      </Card>

      <p className="mb-2 mt-6 text-sm font-semibold text-ink">Account</p>
      <Card className="divide-y divide-line overflow-hidden p-0">
        <SettingsRow icon={UserRound} title="Profile Details" onClick={() => go("profile-details")} />
        <SettingsRow icon={Shield} title="Security" onClick={() => go("privacy")} />
        <SettingsRow icon={Lock} title="Data & Privacy" onClick={() => go("privacy")} />
      </Card>

      <button
        type="button"
        onClick={() => go("safety")}
        className="mt-6 flex w-full items-center justify-between rounded-card border border-line bg-surface-card px-4 py-3.5 text-left shadow-soft"
      >
        <span>
          <span className="block text-sm font-semibold text-ink">Get Support</span>
          <span className="text-meta text-ink-muted">If you need real-world help</span>
        </span>
        <ChevronRight size={18} className="text-ink-muted" />
      </button>
    </Screen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="p-3 text-center">
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="text-meta text-ink-muted">{label}</p>
    </Card>
  );
}
