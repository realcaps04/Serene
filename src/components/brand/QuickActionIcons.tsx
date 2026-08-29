import { Heart, Leaf, NotebookPen, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QuickActionId = "grounding" | "breathing" | "journal" | "affirmations";

type QuickActionStyle = {
  icon: LucideIcon;
  bg: string;
  iconColor: string;
  ring: string;
};

const STYLES: Record<QuickActionId, QuickActionStyle> = {
  grounding: {
    icon: Leaf,
    bg: "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]",
    iconColor: "text-[#059669]",
    ring: "ring-[#6EE7B7]/40",
  },
  breathing: {
    icon: Wind,
    bg: "bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE]",
    iconColor: "text-[#2563EB]",
    ring: "ring-[#93C5FD]/45",
  },
  journal: {
    icon: NotebookPen,
    bg: "bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE]",
    iconColor: "text-[#7C3AED]",
    ring: "ring-[#C4B5FD]/45",
  },
  affirmations: {
    icon: Heart,
    bg: "bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8]",
    iconColor: "text-[#DB2777]",
    ring: "ring-[#F9A8D4]/45",
  },
};

export function QuickActionGlyph({ id }: { id: QuickActionId }) {
  const { icon: Icon, bg, iconColor, ring } = STYLES[id];

  return (
    <span
      className={`relative grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[18px] ring-1 ${bg} ${ring} shadow-[0_6px_16px_rgba(15,23,42,0.08)]`}
    >
      <span className="absolute inset-[1px] rounded-[17px] bg-white/25" aria-hidden />
      <Icon size={24} strokeWidth={1.85} className={`relative ${iconColor}`} aria-hidden />
    </span>
  );
}
