import type { MoodId } from "../../lib/types";
import { MOODS } from "../../data/content";

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy - radius * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArc = startAngle - endAngle > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

export function MoodWheel({ selected }: { selected: MoodId | null }) {
  const cx = 140;
  const cy = 132;
  const radius = 108;
  const segmentAngle = 180 / MOODS.length;

  return (
    <div className="relative mx-auto w-full max-w-[17.5rem]" aria-hidden>
      <svg viewBox="0 0 280 150" className="h-auto w-full overflow-visible">
        <defs>
          <filter id="mood-wheel-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#A78BFA" floodOpacity="0.18" />
          </filter>
          <radialGradient id="mood-wheel-pivot" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F472B6" />
          </radialGradient>
          {MOODS.map((mood) => (
            <linearGradient
              key={mood.id}
              id={`mood-wheel-${mood.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={mood.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={mood.color} stopOpacity="0.72" />
            </linearGradient>
          ))}
        </defs>

        <g filter="url(#mood-wheel-shadow)">
          {MOODS.map((mood, index) => {
            const startAngle = 180 - index * segmentAngle;
            const endAngle = startAngle - segmentAngle;
            const active = selected === mood.id;

            return (
              <path
                key={mood.id}
                d={describeArc(cx, cy, radius, startAngle, endAngle)}
                fill={`url(#mood-wheel-${mood.id})`}
                stroke="rgba(255,255,255,0.65)"
                strokeWidth={active ? 2.5 : 1.5}
                style={{
                  filter: active ? `drop-shadow(0 0 14px ${mood.glow})` : undefined,
                  opacity: selected && !active ? 0.72 : 1,
                }}
              />
            );
          })}
        </g>

        <path
          d={`M ${cx - radius + 8} ${cy} A ${radius - 8} ${radius - 8} 0 0 1 ${cx + radius - 8} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />

        <circle cx={cx} cy={cy} r="16" fill="#FFFFFF" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
        <circle
          cx={cx}
          cy={cy}
          r="5.5"
          fill="url(#mood-wheel-pivot)"
          stroke="rgba(244,114,182,0.35)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
