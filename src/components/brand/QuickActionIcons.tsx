import type { ReactElement, ReactNode } from "react";

export type QuickActionId = "grounding" | "breathing" | "journal" | "affirmations";

type IconProps = { className?: string };

function IconGlow({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="relative grid h-[52px] w-[52px] shrink-0 place-items-center">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${color}ee 0%, ${color} 52%, ${color}cc 100%)`,
          boxShadow: `0 10px 22px ${color}55, inset 0 1px 0 rgba(255,255,255,0.35)`,
        }}
      />
      <span
        className="absolute inset-[2px] rounded-full"
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 100%)`,
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function GroundingIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M13 4.5c-2.8 4.2-4.5 7.4-4.5 10.2 0 2.4 1.8 4.3 4.5 4.3s4.5-1.9 4.5-4.3c0-2.8-1.7-6-4.5-10.2Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M13 8.2v8.8M10.2 11.8h5.6M11 15h4"
        stroke="#4A90C4"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BreathingIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M6 13c2.2-3.6 4.4-5.4 7-5.4s4.8 1.8 7 5.4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 16.2c2.2 3.6 4.4 5.4 7 5.4s4.8-1.8 7-5.4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="13" cy="13" r="1.6" fill="white" />
    </svg>
  );
}

function JournalIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="6.5" y="5.5" width="13" height="15" rx="2.2" fill="white" fillOpacity="0.95" />
      <path d="M9.5 9.5h7M9.5 12.5h7M9.5 15.5h4.5" stroke="#9F7AEA" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M16.5 16.8l3.2 3.2-1.2 1.2-3.2-3.2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.8 17.5l1.7 1.7" stroke="#C4B5FD" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AffirmationsIcon({ className }: IconProps) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M13 19.2c-4.8-3.2-7-5.9-7-8.4 0-2.2 1.8-4 4-4 1.3 0 2.5.6 3 1.6.5-1 1.7-1.6 3-1.6 2.2 0 4 1.8 4 4 0 2.5-2.2 5.2-7 8.4Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M8.5 7.8l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8Z"
        fill="#FDE68A"
      />
    </svg>
  );
}

const ICONS: Record<QuickActionId, (props: IconProps) => ReactElement> = {
  grounding: GroundingIcon,
  breathing: BreathingIcon,
  journal: JournalIcon,
  affirmations: AffirmationsIcon,
};

const GLOW_COLORS: Record<QuickActionId, string> = {
  grounding: "#5B9BD5",
  breathing: "#F59E0B",
  journal: "#A78BFA",
  affirmations: "#FBBF24",
};

export function QuickActionGlyph({ id }: { id: QuickActionId }) {
  const Icon = ICONS[id];
  return (
    <IconGlow color={GLOW_COLORS[id]}>
      <Icon />
    </IconGlow>
  );
}
