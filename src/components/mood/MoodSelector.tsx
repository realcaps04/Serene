import { motion } from "framer-motion";
import type { MoodId } from "../../lib/types";
import { MOODS } from "../../data/content";

function MoodGlyph({ id, size = 28 }: { id: MoodId; size?: number }) {
  const paths: Record<MoodId, string> = {
    great: "M8 14.5c1.6 2.2 3.7 3.5 8 3.5s6.4-1.3 8-3.5 M10 10.5h.01 M22 10.5h.01",
    good: "M9 15c1.4 1.8 3.4 2.8 7 2.8s5.6-1 7-2.8 M10 10.5h.01 M22 10.5h.01",
    okay: "M10 15.5h12 M10 10.5h.01 M22 10.5h.01",
    low: "M10 16.5c1.6-1.4 3.6-2 6-2s4.4.6 6 2 M10 10.5h.01 M22 10.5h.01",
    difficult: "M11 16.5c.8-1.8 2.6-2.6 5-2.6s4.2.8 5 2.6 M10 10.5h.01 M22 10.5h.01",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
      <path d={paths[id]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
            <span
              className="grid h-12 w-12 place-items-center rounded-full"
              style={{
                color: mood.color,
                background: selected
                  ? `linear-gradient(180deg, ${mood.glow}, transparent)`
                  : "transparent",
                boxShadow: selected ? `0 0 18px ${mood.glow}` : "none",
              }}
            >
              <MoodGlyph id={mood.id} />
            </span>
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
      className={`flex flex-col items-center gap-2 rounded-card border px-3 py-4 shadow-soft transition ${
        selected ? "border-indigo-brand bg-lavender-surface" : "border-line bg-surface-card"
      }`}
      style={{ boxShadow: selected ? `0 0 22px ${mood.glow}` : undefined }}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full" style={{ color: mood.color }}>
        <MoodGlyph id={mood.id} size={32} />
      </span>
      <span className="text-sm font-medium text-ink">{mood.label}</span>
    </motion.button>
  );
}
