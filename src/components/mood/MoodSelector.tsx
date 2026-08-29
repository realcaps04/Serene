import { motion } from "framer-motion";
import type { MoodId } from "../../lib/types";
import { MOODS } from "../../data/content";

/** Colored 3D-style mood emoji for cards. */
export function MoodEmoji({ id, size = 52 }: { id: MoodId; size?: number }) {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 56 56", fill: "none", "aria-hidden": true as const };

  if (id === "great") {
    return (
      <svg {...common}>
        <circle cx="28" cy="30" r="22" fill="#BFDBFE" />
        <circle cx="28" cy="30" r="18" fill="#93C5FD" />
        <path d="M18 28c1.5 2.5 4 4 10 4s8.5-1.5 10-4" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 24.5h.01M35 24.5h.01" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M21 24c2-2 4-2 6 0M29 24c2-2 4-2 6 0" stroke="#1E40AF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 16l1.5 3 3-1.5-1.5-3z" fill="#FBBF24" />
        <path d="M42 14l1.2 2.4 2.4-1.2-1.2-2.4z" fill="#FBBF24" />
      </svg>
    );
  }

  if (id === "good") {
    return (
      <svg {...common}>
        <circle cx="28" cy="30" r="22" fill="#A7F3D0" />
        <circle cx="28" cy="30" r="18" fill="#6EE7B7" />
        <path d="M19 29c1.5 2.2 3.8 3.5 9 3.5s7.5-1.3 9-3.5" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="25" r="2" fill="#047857" />
        <circle cx="35" cy="25" r="2" fill="#047857" />
      </svg>
    );
  }

  if (id === "okay") {
    return (
      <svg {...common}>
        <circle cx="28" cy="30" r="22" fill="#FDE68A" />
        <circle cx="28" cy="30" r="18" fill="#FBBF24" />
        <path d="M20 31h16" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="25" r="2" fill="#92400E" />
        <circle cx="35" cy="25" r="2" fill="#92400E" />
        <path d="M38 14l1 2 2-1-1-2z" fill="#F59E0B" opacity="0.8" />
      </svg>
    );
  }

  if (id === "low") {
    return (
      <svg {...common}>
        <ellipse cx="28" cy="12" rx="8" ry="5" fill="#FECDD3" />
        <circle cx="28" cy="32" r="22" fill="#FECDD3" />
        <circle cx="28" cy="32" r="18" fill="#FDA4AF" />
        <path d="M20 34c1.5-1.5 3.5-2 8-2s6.5.5 8 2" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="27" r="2" fill="#BE123C" />
        <circle cx="35" cy="27" r="2" fill="#BE123C" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <ellipse cx="28" cy="11" rx="10" ry="6" fill="#DDD6FE" />
      <path d="M22 11h2M26 9h2M30 11h2" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="28" cy="32" r="22" fill="#DDD6FE" />
      <circle cx="28" cy="32" r="18" fill="#C4B5FD" />
      <path d="M20 35c1.2-2 3.2-2.8 8-2.8s6.8.8 8 2.8" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 27c1-1.5 2.5-2 4-2M32 25c1.5 0 3 .5 4 2" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoodWheelGlyph({ id }: { id: MoodId }) {
  const paths: Record<MoodId, string> = {
    great: "M8 14.5c1.6 2.2 3.7 3.5 8 3.5s6.4-1.3 8-3.5 M10 10.5h.01 M22 10.5h.01",
    good: "M9 15c1.4 1.8 3.4 2.8 7 2.8s5.6-1 7-2.8 M10 10.5h.01 M22 10.5h.01",
    okay: "M10 15.5h12 M10 10.5h.01 M22 10.5h.01",
    low: "M10 16.5c1.6-1.4 3.6-2 6-2s4.4.6 6 2 M10 10.5h.01 M22 10.5h.01",
    difficult: "M11 16.5c.8-1.8 2.6-2.6 5-2.6s4.2.8 5 2.6 M10 10.5h.01 M22 10.5h.01",
  };
  return (
    <svg width={22} height={22} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="1.4" opacity="0.9" />
      <path d={paths[id]} stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.95" />
    </svg>
  );
}

export function MoodSelector({
  value,
  onChange,
  compact = false,
}: {
  value: MoodId | null;
  onChange: (mood: MoodId) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={compact ? "flex justify-between gap-1" : "grid grid-cols-5 gap-2"}
      role="radiogroup"
      aria-label="How are you feeling"
    >
      {MOODS.map((mood) => {
        const selected = value === mood.id;
        return (
          <motion.button
            key={mood.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${mood.label}. ${mood.caption}`}
            onClick={() => onChange(mood.id)}
            whileTap={{ scale: 0.94 }}
            animate={selected ? { scale: 1.04 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className={`flex flex-col items-center gap-1.5 rounded-card px-1 py-3 ${
              compact ? "flex-1" : ""
            } ${selected ? "bg-lavender-surface" : "bg-transparent"}`}
          >
            <MoodEmoji id={mood.id} size={44} />
            <span className={`text-meta font-medium ${selected ? "text-ink" : "text-ink-secondary"}`}>
              {mood.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function MoodCard({
  selected,
  mood,
  onSelect,
}: {
  selected: boolean;
  mood: (typeof MOODS)[number];
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${mood.label}. ${mood.caption}`}
      whileTap={{ scale: 0.97 }}
      className={`flex flex-col items-center gap-2 rounded-[20px] border bg-white px-2 py-4 text-center transition ${
        selected
          ? "border-[#8B5CF6] shadow-[0_4px_24px_rgba(139,92,246,0.22)] ring-2 ring-[#8B5CF6]/30"
          : "border-[#EEF0F5] shadow-[0_4px_18px_rgba(15,23,42,0.05)] hover:border-[#DDD6FE]"
      }`}
    >
      <MoodEmoji id={mood.id} size={48} />
      <span className="text-[13px] font-semibold text-[#1E1B4B]">{mood.label}</span>
      <span className="text-[10px] leading-snug text-[#9499A8]">{mood.caption}</span>
    </motion.button>
  );
}

export { MoodWheelGlyph };
