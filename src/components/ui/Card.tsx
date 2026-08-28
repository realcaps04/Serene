import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-card-lg border border-line bg-surface-card shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function GradientCard({
  className = "",
  children,
  from = "from-lavender",
  to = "to-pink-premium",
}: {
  className?: string;
  children: ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-card-lg bg-gradient-to-br ${from} ${to} p-5 text-white shadow-lift ${className}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 right-6 h-32 w-32 rounded-full bg-indigo-brand/20 blur-2xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-lavender-surface px-2.5 py-1 text-meta font-medium text-indigo-brand">
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <p className="mt-2 text-body text-ink-secondary">{body}</p>
    </div>
  );
}

export function LoadingState({ label = "A quiet moment..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-live="polite">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-lavender animate-pulse-dot" />
        <span className="h-2 w-2 rounded-full bg-indigo-brand animate-pulse-dot [animation-delay:160ms]" />
        <span className="h-2 w-2 rounded-full bg-pink-premium animate-pulse-dot [animation-delay:320ms]" />
      </div>
      <p className="text-meta text-ink-muted">{label}</p>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-indigo-brand" : "bg-lavender-light"}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-soft transition ${checked ? "left-5" : "left-0.5"}`}
      />
    </button>
  );
}
