import { Home, Orbit, Theater, User } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/mindfulness", label: "Mindfulness", icon: Orbit },
  { to: "/app/journal", label: "Friends", icon: Theater },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-[max(14px,env(safe-area-inset-bottom))]"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[320px] items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-line dark:bg-[var(--nav-bg)]">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            title={label}
            className="grid place-items-center"
          >
            {({ isActive }) =>
              to === "/app/home" && isActive ? (
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#F43F5E] text-white shadow-[0_8px_20px_rgba(244,63,94,0.35)]">
                  <Icon size={20} strokeWidth={2.2} aria-hidden />
                </span>
              ) : (
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full transition ${
                    isActive ? "bg-[#ECECF0] text-ink" : "text-[#9CA3AF]"
                  }`}
                >
                  <Icon size={21} strokeWidth={isActive ? 2.1 : 1.8} aria-hidden />
                </span>
              )
            }
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
