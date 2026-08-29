import {
  ArrowUp,
  CheckCheck,
  Cloud,
  Heart,
  HelpCircle,
  Leaf,
  ListTodo,
  Mic,
  Moon,
  Paperclip,
  PenLine,
  Volume2,
  Wind,
} from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "../brand/Logo";
import { CloudMascotAvatar } from "../brand/CloudMascot";
import type { WorryStarter } from "../../data/content";

function formatChatTime(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  return d
    .toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/\s/g, "");
}

export function ChatTimestamp({ time }: { time?: string }) {
  return (
    <p className="py-2 text-center text-[11px] font-medium text-[#A8ADB8]">{formatChatTime(time)}</p>
  );
}

export function AIMessage({
  text,
  onSpeak,
  accentColor = "#60A5FA",
}: {
  text: string;
  onSpeak?: () => void;
  accentColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex items-end gap-2.5"
    >
      <CloudMascotAvatar size={44} accentColor={accentColor} />
      <div
        className="relative max-w-[82%] overflow-hidden rounded-[20px] px-4 py-3.5 pr-10 pl-4 text-[14px] leading-relaxed text-ink"
        style={{
          background: `linear-gradient(145deg, #ffffff 0%, ${accentColor}12 42%, ${accentColor}08 100%)`,
          boxShadow: `0 6px 22px ${accentColor}18, 0 2px 8px rgba(15,23,42,0.06)`,
        }}
      >
        <span
          className="pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-full"
          style={{ background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}88 100%)` }}
          aria-hidden
        />
        {text.split("\n").map((line, i) => (
          <p key={i} className={i ? "mt-2.5" : ""}>
            {line}
          </p>
        ))}
        <button
          type="button"
          aria-label="Listen to message"
          onClick={onSpeak}
          className="absolute bottom-2.5 right-2.5 grid h-6 w-6 place-items-center rounded-full text-[#34D399] transition hover:bg-[#34D399]/10"
        >
          <Volume2 size={14} strokeWidth={2.25} />
        </button>
      </div>
    </motion.div>
  );
}

export function UserMessage({
  text,
  time,
  name,
  picture,
}: {
  text: string;
  time?: string;
  name?: string;
  picture?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-end gap-1.5"
    >
      <Avatar name={name} picture={picture} size={28} />
      <div className="max-w-[78%] rounded-[20px] bg-[#ECECF0] px-4 py-3 text-[14px] leading-relaxed text-ink">
        {text}
      </div>
      <span className="flex items-center gap-1 pr-1 text-[11px] font-medium text-[#A8ADB8]">
        {formatChatTime(time)}
        <CheckCheck size={14} className="text-[#F43F5E]" strokeWidth={2.25} aria-label="Read" />
      </span>
    </motion.div>
  );
}

export function TypingDots({ accentColor = "#60A5FA" }: { accentColor?: string }) {
  return (
    <div className="flex items-end gap-2.5" aria-label="Serene is thinking">
      <CloudMascotAvatar size={44} accentColor={accentColor} />
      <div
        className="flex gap-1.5 rounded-[20px] px-4 py-3.5"
        style={{
          background: `linear-gradient(145deg, #ffffff 0%, ${accentColor}12 100%)`,
          boxShadow: `0 6px 22px ${accentColor}18`,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4C9D4] animate-pulse-dot" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#A8ADB8] animate-pulse-dot [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#8B919C] animate-pulse-dot [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function StarterIcon({ icon }: { icon: WorryStarter["icon"] }) {
  const props = { size: 20, strokeWidth: 2.2, className: "text-white" };
  if (icon === "leaf") return <Leaf {...props} />;
  if (icon === "cloud") return <Cloud {...props} />;
  if (icon === "heart") return <Heart {...props} />;
  if (icon === "pen") return <PenLine {...props} />;
  if (icon === "wind") return <Wind {...props} />;
  if (icon === "list") return <ListTodo {...props} />;
  if (icon === "moon") return <Moon {...props} />;
  return <HelpCircle {...props} />;
}

export function WorryStarterCard({
  starter,
  onSelect,
}: {
  starter: WorryStarter;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="pressable w-[108px] shrink-0 snap-start select-none rounded-[18px] bg-white px-3 py-3.5 text-left shadow-[0_6px_20px_rgba(15,23,42,0.07)] touch-manipulation"
    >
      <span
        className="mb-2.5 grid h-10 w-10 place-items-center rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${starter.color}ee 0%, ${starter.color} 55%, ${starter.color}cc 100%)`,
          boxShadow: `0 6px 14px ${starter.color}44`,
        }}
      >
        <StarterIcon icon={starter.icon} />
      </span>
      <span className="block text-[13px] font-semibold leading-tight text-ink">{starter.title}</span>
      <span className="mt-1 block text-[10px] leading-snug text-ink-muted">{starter.subtitle}</span>
    </button>
  );
}

export function WorryStarterStrip({
  starters,
  onSelect,
}: {
  starters: WorryStarter[];
  onSelect: (starter: WorryStarter) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });

  const endDrag = (pointerId: number) => {
    scrollerRef.current?.releasePointerCapture(pointerId);
    dragRef.current.active = false;
  };

  return (
    <div className="-mx-4 mb-4 min-w-0 overflow-hidden">
      <div
        ref={scrollerRef}
        className="scrollbar-none cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
        aria-label="Conversation starters"
        onPointerDown={(e) => {
          const el = scrollerRef.current;
          if (!el) return;
          dragRef.current = {
            active: true,
            moved: false,
            startX: e.clientX,
            scrollLeft: el.scrollLeft,
          };
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const el = scrollerRef.current;
          if (!el || !dragRef.current.active) return;
          const dx = e.clientX - dragRef.current.startX;
          if (Math.abs(dx) > 6) dragRef.current.moved = true;
          el.scrollLeft = dragRef.current.scrollLeft - dx;
        }}
        onPointerUp={(e) => endDrag(e.pointerId)}
        onPointerCancel={(e) => endDrag(e.pointerId)}
      >
        <div className="flex w-max snap-x snap-mandatory gap-2.5 px-4 pb-1">
          {starters.map((starter) => (
            <WorryStarterCard
              key={starter.id}
              starter={starter}
              onSelect={() => {
                if (dragRef.current.moved) {
                  dragRef.current.moved = false;
                  return;
                }
                onSelect(starter);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChatInput({
  onSend,
  onVoice,
  onAttach,
}: {
  onSend: (text: string) => void;
  onVoice?: () => void;
  onAttach?: () => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form
      className="flex items-center gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label className="sr-only" htmlFor="chat-input">
        Type your message
      </label>
      <div className="flex min-w-0 flex-1 items-center rounded-full bg-white px-4 py-1 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
        <input
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message..."
          className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-ink outline-none placeholder:text-[#B0B5C0]"
        />
        <button
          type="button"
          aria-label="Attach file"
          onClick={onAttach}
          className="grid h-8 w-8 place-items-center rounded-full text-[#8B919C] transition hover:bg-[#F4F4F6]"
        >
          <Paperclip size={17} strokeWidth={1.85} />
        </button>
        <button
          type="button"
          aria-label="Voice message"
          onClick={onVoice}
          className="grid h-8 w-8 place-items-center rounded-full text-[#8B919C] transition hover:bg-[#F4F4F6]"
        >
          <Mic size={17} strokeWidth={1.85} />
        </button>
      </div>
      <button
        type="submit"
        aria-label="Send message"
        disabled={!value.trim()}
        className="pressable grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pink-premium via-[#f43f7e] to-coral text-white shadow-[0_8px_22px_rgba(244,114,182,0.4)] disabled:opacity-45"
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </button>
    </form>
  );
}
