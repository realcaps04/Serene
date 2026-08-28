import { Play } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "../ui/Card";

export function MeditationCard({
  title,
  subtitle,
  duration,
  onPlay,
  featured,
}: {
  title: string;
  subtitle: string;
  duration: string;
  onPlay: () => void;
  featured?: boolean;
}) {
  return (
    <Card className={`p-5 ${featured ? "bg-gradient-to-br from-lavender-surface to-pink-surface" : ""}`}>
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
          <p className="mt-1 text-body text-ink-secondary">{subtitle}</p>
          <span className="mt-3 inline-flex rounded-full bg-white/80 px-2.5 py-1 text-meta font-medium text-indigo-brand">
            {duration}
          </span>
        </div>
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Start ${title}`}
          className="pressable grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-indigo-brand shadow-soft"
        >
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </button>
      </div>
    </Card>
  );
}

export function ProgressCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lavender-surface text-indigo-brand">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="text-meta text-ink-secondary">{value}</span>
      </span>
    </Card>
  );
}

export function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-pink-faint to-pink-surface p-5 shadow-soft">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-secondary">{body}</p>
      <div className="pointer-events-none absolute -bottom-6 -right-4 text-6xl text-pink-premium/30">♡</div>
    </div>
  );
}

export function JournalCard({
  title,
  when,
  moodLabel,
  onOpen,
}: {
  title: string;
  when: string;
  moodLabel: string;
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="pressable flex w-full items-center gap-3 rounded-card border border-line bg-surface-card px-4 py-3.5 text-left shadow-soft"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-meta text-ink-muted">{when}</span>
        <span className="mt-0.5 block font-medium text-ink">{title}</span>
      </span>
      <span className="text-meta text-ink-secondary">{moodLabel}</span>
    </button>
  );
}

export function JournalEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="block">
      <span className="sr-only">Write freely</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write freely..."
        rows={8}
        className="w-full resize-none rounded-card-lg border border-line bg-white/90 p-4 text-body text-ink shadow-soft outline-none placeholder:text-ink-muted focus:border-lavender dark:bg-surface-card"
      />
    </label>
  );
}

export function BreathingOrb({
  phase,
  pace,
}: {
  phase: "in" | "hold" | "out";
  pace: "slow" | "normal" | "gentle";
}) {
  const duration = pace === "slow" ? "10s" : pace === "gentle" ? "9s" : "8s";
  const label = phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out";

  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <div
        className="absolute inset-0 rounded-full bg-lavender/25 blur-2xl"
        style={{ animation: `breathe ${duration} ease-in-out infinite` }}
      />
      <div
        className="absolute inset-6 rounded-full bg-pink-blush/50"
        style={{ animation: `breathe ${duration} ease-in-out infinite`, animationDelay: "0.4s" }}
      />
      <div
        className="absolute inset-12 rounded-full bg-gradient-to-br from-indigo-brand/80 to-lavender shadow-glow"
        style={{ animation: `breathe ${duration} ease-in-out infinite`, animationDelay: "0.15s" }}
      />
      <p className="relative z-10 font-display text-xl font-semibold text-white drop-shadow">{label}</p>
    </div>
  );
}
