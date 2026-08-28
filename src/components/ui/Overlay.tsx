import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Toggle } from "./Card";

export function SettingsRow({
  icon: Icon,
  title,
  value,
  onClick,
  toggle,
}: {
  icon: LucideIcon;
  title: string;
  value?: string;
  onClick?: () => void;
  toggle?: { checked: boolean; onChange: (next: boolean) => void };
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lavender-surface text-indigo-brand">
        <Icon size={18} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {value ? <span className="block text-meta text-ink-secondary">{value}</span> : null}
      </span>
      {toggle ? (
        <Toggle checked={toggle.checked} onChange={toggle.onChange} label={title} />
      ) : (
        <ChevronRight size={18} className="text-ink-muted" aria-hidden />
      )}
    </>
  );

  if (toggle) {
    return <div className="flex items-center gap-3 px-4 py-3">{inner}</div>;
  }

  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-lavender-surface/50">
      {inner}
    </button>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center p-4">
      <button className="absolute inset-0 bg-indigo-deep/30 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-card-lg bg-surface-card p-5 shadow-lift"
      >
        <h2 id="modal-title" className="font-display text-lg font-semibold text-ink">
          {title}
        </h2>
        <div className="mt-3 text-body text-ink-secondary">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="pointer-events-none absolute left-1/2 top-6 z-50 w-[min(90%,340px)] -translate-x-1/2 rounded-2xl bg-indigo-deep/90 px-4 py-3 text-center text-sm text-white shadow-lift backdrop-blur"
    >
      {message}
    </div>
  );
}
