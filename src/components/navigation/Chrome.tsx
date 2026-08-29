import { Home, Orbit, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const ITEMS: { to: string; label: string; icon: LucideIcon; badge?: string }[] = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/mindfulness", label: "Mindfulness", icon: Orbit },
  { to: "/app/friends", label: "Friends", icon: Users, badge: "New" },
  { to: "/app/profile", label: "Profile", icon: User },
];

export function BottomNavigation() {
  return (
    <nav aria-label="Primary" className="shell-nav pointer-events-none fixed inset-x-0 z-30 md:absolute">
      <div className="mx-auto w-full max-w-shell px-4">
        <div className="pointer-events-auto mx-auto flex max-w-[390px] items-stretch justify-between rounded-[22px] bg-white px-2 py-2 shadow-[0_8px_28px_rgba(15,23,42,0.1)]">
          {ITEMS.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              title={label}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-1"
            >
              {({ isActive }) => (
                <>
                  {badge ? (
                    <span
                      className={`absolute -top-0.5 rounded-full px-1.5 py-px text-[8px] font-bold uppercase leading-none transition-opacity ${
                        isActive ? "bg-[#FCE7F3] text-[#EC4899] opacity-100" : "opacity-0"
                      }`}
                    >
                      {badge}
                    </span>
                  ) : null}
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.35 : 1.85}
                    className={`transition-colors ${isActive ? "text-indigo-brand" : "text-[#9499A8]"}`}
                    aria-hidden
                  />
                  <span
                    className={`max-w-full truncate text-[10px] font-semibold transition-colors ${
                      isActive ? "text-indigo-brand" : "text-[#9499A8]"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive ? (
                    <span className="absolute -bottom-0.5 h-0.5 w-5 rounded-full bg-indigo-brand" aria-hidden />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </div>
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
  left?: React.ReactNode;
  right?: React.ReactNode;
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
              <h1 className="font-display text-[21px] font-semibold tracking-tight text-ink">{title}</h1>
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
          <h1 className="font-display text-[21px] font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle ? <p className="mt-1 text-body text-ink-secondary">{subtitle}</p> : null}
        </>
      ) : null}
    </header>
  );
}
