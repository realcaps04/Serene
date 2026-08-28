import { Home, Leaf, MessageCircle, User, Users } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/companion", label: "Companion", icon: MessageCircle },
  { to: "/app/mindfulness", label: "Mindfulness", icon: Leaf },
  { to: "/app/journal", label: "Friends", icon: Users },
  { to: "/app/profile", label: "Profile", icon: User },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-[max(12px,env(safe-area-inset-bottom))]"
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-nav border border-white/60 bg-[var(--nav-bg)] px-2 py-2 shadow-nav backdrop-blur-xl dark:border-line">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex min-w-[58px] flex-col items-center gap-0.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-indigo-brand/15 to-lavender/20 text-indigo-brand"
                  : "text-ink-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.15 : 1.7} aria-hidden />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function Header({
  title,
  subtitle,
  left,
  right,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  align?: "left" | "center";
}) {
  const hasBar = Boolean(left || right || align === "center");

  return (
    <header className="mb-5 pt-1">
      {hasBar ? (
        <div className="mb-3 grid grid-cols-[44px_1fr_44px] items-center">
          <div className="flex justify-start">{left}</div>
          {align === "center" ? (
            <div className="text-center">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
              {subtitle ? <p className="mt-0.5 text-body text-ink-secondary">{subtitle}</p> : null}
            </div>
          ) : (
            <div />
          )}
          <div className="flex justify-end">{right}</div>
        </div>
      ) : null}
      {align !== "center" ? (
        <>
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle ? <p className="mt-1 text-body text-ink-secondary">{subtitle}</p> : null}
        </>
      ) : null}
    </header>
  );
}
