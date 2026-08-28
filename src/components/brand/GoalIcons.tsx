import type { ReactElement, ReactNode } from "react";
import type { GoalId } from "../../lib/types";

type IconProps = { className?: string };

function Glow({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="relative grid h-[52px] w-[52px] place-items-center">
      <span
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function StressIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M9.5 24.5c1.2-4.4 3.6-7 6.5-7s5.3 2.6 6.5 7"
        stroke="#F472B6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M11 16.5c.4-3.2 2.4-5.4 5-5.4s4.6 2.2 5 5.4"
        stroke="#F472B6"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M16 6.5v2.6M12.2 8.2l1.4 2.1M19.8 8.2l-1.4 2.1M10.4 11.4l2.2 1.1M21.6 11.4l-2.2 1.1" stroke="#F472B6" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SleepIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M19.5 8.5c-1.2 3.8-4.8 6.6-9 6.6-1.2 0-2.3-.2-3.3-.6 1.5 3.9 5.3 6.7 9.8 6.7 5.7 0 10.3-4.5 10.3-10.1 0-2.4-.8-4.6-2.2-6.3 1 3.2-.6 5.7-5.6 3.7Z"
        stroke="#7C6CF0"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M22.2 7.2l.7 1.6 1.6.5-1.4 1 .3 1.7-1.5-.9-1.5.9.3-1.7-1.4-1 1.6-.5.7-1.6Z" fill="#7C6CF0" />
    </svg>
  );
}

function FocusIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16.2" r="8.2" stroke="#A78BFA" strokeWidth="1.7" />
      <circle cx="16" cy="16.2" r="4.2" stroke="#A78BFA" strokeWidth="1.7" />
      <circle cx="16" cy="16.2" r="1.35" fill="#A78BFA" />
      <path d="M16 5.2v2.4M16 24.8v2.4M5.2 16.2h2.4M24.4 16.2h2.4" stroke="#A78BFA" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function EmotionsIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="8.4" stroke="#FB7185" strokeWidth="1.7" />
      <path
        d="M16 19.6c2.4-2.1 4-3.6 4-5.1 0-1.1-.9-2-2-2-0.7 0-1.3.3-1.7.9-.4-.6-1-.9-1.7-.9-1.1 0-2 .9-2 2 0 1.5 1.6 3 4 5.1Z"
        fill="#FB7185"
      />
    </svg>
  );
}

function MindfulnessIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 24.5c-3.2 0-6-1.6-7.2-3.8 1.8.4 3.6.2 5.2-.7-1.6-1.2-2.6-3.1-2.6-5.2 0-.4 0-.8.1-1.2 1.3 1.4 3.1 2.3 5.1 2.3 2.1 0 4-.9 5.3-2.4.1.4.1.8.1 1.3 0 2.1-1 4-2.6 5.2 1.6.9 3.4 1.1 5.2.7-1.2 2.2-4 3.8-7.2 3.8Z"
        stroke="#34D399"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="8.2" r="1.35" fill="#34D399" />
    </svg>
  );
}

function HabitsIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M25.2 16.2A9.2 9.2 0 1 1 16 7"
        stroke="#FB923C"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M16 16.2l5.2-4.4" stroke="#FB923C" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16" cy="16.2" r="1.3" fill="#FB923C" />
      <path d="M22.8 5.8v4.2h-4.2" stroke="#FB923C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TalkIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M8 9.2h16a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-5.2L12.2 25v-3.8H8A2.4 2.4 0 0 1 5.6 18.8v-7.2A2.4 2.4 0 0 1 8 9.2Z"
        stroke="#F472B6"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12.4" cy="14.8" r="1.15" fill="#F472B6" />
      <circle cx="19.6" cy="14.8" r="1.15" fill="#F472B6" />
    </svg>
  );
}

function GrowthIcon({ className }: IconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16.2 24.8c4.8-3.6 7.6-6.4 7.6-9.6 0-2.2-1.7-4-3.8-4-1.3 0-2.5.6-3.2 1.6-.7-1-1.9-1.6-3.2-1.6-2.1 0-3.8 1.8-3.8 4 0 3.2 2.8 6 6.4 9.6Z"
        stroke="#8B5CF6"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18.6 8.2c.2 1.6 1.1 2.6 2.8 3.1-1.7.4-2.8 1.4-3.1 3"
        stroke="#8B5CF6"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<
  GoalId,
  { glow: string; Icon: (props: IconProps) => ReactElement }
> = {
  stress: { glow: "rgba(244, 114, 182, 0.42)", Icon: StressIcon },
  sleep: { glow: "rgba(124, 108, 240, 0.4)", Icon: SleepIcon },
  focus: { glow: "rgba(167, 139, 250, 0.42)", Icon: FocusIcon },
  emotions: { glow: "rgba(251, 113, 133, 0.4)", Icon: EmotionsIcon },
  mindfulness: { glow: "rgba(52, 211, 153, 0.38)", Icon: MindfulnessIcon },
  habits: { glow: "rgba(251, 146, 60, 0.4)", Icon: HabitsIcon },
  talk: { glow: "rgba(244, 114, 182, 0.4)", Icon: TalkIcon },
  growth: { glow: "rgba(139, 92, 246, 0.4)", Icon: GrowthIcon },
};

export function GoalGlyph({ id }: { id: GoalId }) {
  const { glow, Icon } = ICONS[id];
  return (
    <Glow color={glow}>
      <Icon />
    </Glow>
  );
}
