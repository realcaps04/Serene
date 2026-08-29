import { Home, Orbit, Theater, User } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/app/mindfulness", label: "Mindfulness", icon: Orbit },
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/journal", label: "Friends", icon: Theater },
];

function NavIcon({
  active,
  home,
  children,
}: {
  active: boolean;
  home?: boolean;
  children: ReactNode;
}) {
  if (active && home) {
    return (
      <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-white text-pink-premium shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-white/80">
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-pink-premium/12 text-pink-premium shadow-[0_6px_18px_rgba(244,114,182,0.22)]">
        {children}
      </span>
    );
  }

  return (
    <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full text-[#A8ADB8] transition-colors hover:text-[#8B919C]">
      {children}
    </span>
  );
}

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-[max(16px,env(safe-area-inset-bottom))]"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[340px] items-center justify-between rounded-[999px] border border-white/80 bg-white/55 px-5 py-2.5 shadow-[0_16px_48px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(28,28,32,0.72)]">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} aria-label={label} title={label} className="grid place-items-center">
            {({ isActive }) => (
              <NavIcon active={isActive} home={to === "/app/home"}>
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.85} aria-hidden />
              </NavIcon>
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
