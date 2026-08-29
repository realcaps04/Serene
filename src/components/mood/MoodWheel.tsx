import { useCallback, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import type { MoodId } from "../../lib/types";
import { MOODS } from "../../data/content";
import { MoodWheelGlyph } from "./MoodSelector";

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

function moodFromPointer(svg: SVGSVGElement, clientX: number, clientY: number): MoodId | null {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const local = pt.matrixTransform(ctm.inverse());

  const cx = 140;
  const cy = 132;
  const dx = local.x - cx;
  const dy = cy - local.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 18 || dist > 118) return null;

  let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angleDeg < 0) angleDeg += 360;
  if (angleDeg > 180) return null;

  const segmentAngle = 180 / MOODS.length;
  const index = Math.min(MOODS.length - 1, Math.max(0, Math.floor((180 - angleDeg) / segmentAngle)));
  return MOODS[index].id;
}

export function MoodWheel({
  selected,
  onSelect,
}: {
  selected: MoodId | null;
  onSelect?: (mood: MoodId) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const cx = 140;
  const cy = 132;
  const radius = 108;
  const segmentAngle = 180 / MOODS.length;

  const selectedIndex = selected ? MOODS.findIndex((m) => m.id === selected) : -1;
  const knobAngle = selectedIndex >= 0 ? 180 - (selectedIndex + 0.5) * segmentAngle : 90;
  const knobTip = polarToCartesian(cx, cy, 52, knobAngle);

  const pickMood = useCallback(
    (clientX: number, clientY: number) => {
      if (!onSelect || !svgRef.current) return;
      const mood = moodFromPointer(svgRef.current, clientX, clientY);
      if (mood) onSelect(mood);
    },
    [onSelect],
  );

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!onSelect) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    pickMood(e.clientX, e.clientY);
  };

  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current || !onSelect) return;
    pickMood(e.clientX, e.clientY);
  };

  const onPointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative mx-auto w-full max-w-[18rem] select-none" role="group" aria-label="Mood wheel">
      <svg
        ref={svgRef}
        viewBox="0 0 280 150"
        className={`h-auto w-full overflow-visible touch-none ${onSelect ? "cursor-pointer" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <filter id="mood-wheel-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#A78BFA" floodOpacity="0.16" />
          </filter>
          <radialGradient id="mood-wheel-pivot" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F472B6" />
          </radialGradient>
        </defs>

        <g filter="url(#mood-wheel-shadow)">
          {MOODS.map((mood, index) => {
            const startAngle = 180 - index * segmentAngle;
            const endAngle = startAngle - segmentAngle;
            const active = selected === mood.id;
            const midAngle = startAngle - segmentAngle / 2;
            const iconPos = polarToCartesian(cx, cy, radius * 0.62, midAngle);

            return (
              <g
                key={mood.id}
                role="button"
                tabIndex={onSelect ? 0 : undefined}
                aria-label={`${mood.label}. ${mood.caption}`}
                aria-pressed={active}
                className={onSelect ? "cursor-pointer outline-none focus-visible:opacity-100" : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(mood.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect?.(mood.id);
                  }
                }}
              >
                <path
                  d={describeArc(cx, cy, radius, startAngle, endAngle)}
                  fill={mood.wheelColor}
                  stroke={active ? "#FFFFFF" : "rgba(255,255,255,0.75)"}
                  strokeWidth={active ? 3 : 1.5}
                  style={{
                    filter: active ? `drop-shadow(0 0 16px ${mood.glow})` : undefined,
                    opacity: selected && !active ? 0.72 : 1,
                    transition: "opacity 0.2s ease, stroke-width 0.2s ease",
                  }}
                />
                <g transform={`translate(${iconPos.x - 11}, ${iconPos.y - 11})`} pointerEvents="none">
                  <MoodWheelGlyph id={mood.id} />
                </g>
              </g>
            );
          })}
        </g>

        {/* Inner arc highlight */}
        <path
          d={`M ${cx - radius + 8} ${cy} A ${radius - 8} ${radius - 8} 0 0 1 ${cx + radius - 8} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          pointerEvents="none"
        />

        {/* Selector arm — rotates toward active mood */}
        {selected && onSelect ? (
          <motion.line
            x1={cx}
            y1={cy}
            initial={false}
            animate={{ x2: knobTip.x, y2: knobTip.y }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pointerEvents="none"
          />
        ) : null}

        {/* Pivot knob */}
        <g pointerEvents="none">
          <circle cx={cx} cy={cy} r="18" fill="#FFFFFF" stroke="rgba(255,255,255,0.95)" strokeWidth="2" />
          <motion.circle
            cx={knobTip.x}
            cy={knobTip.y}
            r="7"
            fill="url(#mood-wheel-pivot)"
            stroke="rgba(244,114,182,0.45)"
            strokeWidth="1.5"
            initial={false}
            animate={{ cx: knobTip.x, cy: knobTip.y }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />
          <circle cx={cx} cy={cy} r="5" fill="#F472B6" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
