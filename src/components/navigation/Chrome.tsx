import { Home, Orbit, Theater, User } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/mindfulness", label: "Mindfulness", icon: Orbit },
  { to: "/app/journal", label: "Friends", icon: Theater },
  { to: "/app/profile", label: "Profile", icon: User },
];

const NAV_SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.75 };

function NavIcon({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <span className="relative grid h-[3.25rem] w-[3.25rem] place-items-center">
      <span className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(15,23,42,0.07)]" />
      {active ? (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-premium via-[#f43f7e] to-coral shadow-[0_8px_28px_rgba(244,114,182,0.45)]"
          transition={NAV_SPRING}
        />
      ) : null}
      <span
        className={`relative z-10 transition-colors duration-300 ${active ? "text-white" : "text-[#5A6070]"}`}
      >
        {children}
      </span>
    </span>
  );
}

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none absolute inset-x-0 bottom-6 z-30 px-5 pb-[max(12px,env(safe-area-inset-bottom))]"
    >
      <LayoutGroup id="bottom-nav">
        <div className="glass-nav pointer-events-auto mx-auto flex max-w-[340px] items-center justify-between rounded-[999px] px-5 py-2.5">
          {ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} aria-label={label} title={label} className="grid place-items-center">
              {({ isActive }) => (
                <NavIcon active={isActive}>
                  <Icon size={22} strokeWidth={isActive ? 2.35 : 1.9} aria-hidden />
                </NavIcon>
              )}
            </NavLink>
          ))}
        </div>
      </LayoutGroup>
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
