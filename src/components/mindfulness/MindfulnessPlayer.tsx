import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MindfulnessPractice } from "../../data/content";
import { MindfulnessPracticeAnimation } from "./MindfulnessAnimations";

type MindfulnessPlayerProps = {
  practice: MindfulnessPractice;
  open: boolean;
  onClose: () => void;
  onComplete: (minutes: number) => void;
};

export function MindfulnessPlayer({ practice, open, onClose, onComplete }: MindfulnessPlayerProps) {
  const totalSeconds = practice.minutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [paused, setPaused] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (!open) return;
    setRemaining(practice.minutes * 60);
    setPaused(false);
    finished.current = false;
  }, [open, practice]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || paused || remaining <= 0) return;
    const tick = window.setInterval(() => {
      setRemaining((n) => Math.max(0, n - 1));
    }, 1000);
    return () => window.clearInterval(tick);
  }, [open, paused, remaining]);

  useEffect(() => {
    if (!open || remaining > 0 || finished.current) return;
    finished.current = true;
    onComplete(practice.minutes);
    onClose();
  }, [open, remaining, onComplete, onClose, practice.minutes]);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    const elapsedMinutes = Math.max(1, Math.ceil((totalSeconds - remaining) / 60));
    onComplete(elapsedMinutes);
    onClose();
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const progress = 1 - remaining / totalSeconds;

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col bg-gradient-to-b from-[#FAF7FF] via-[#FFFBFE] to-[#F5F3FF]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
        >
          <div className="mx-auto flex w-full max-w-shell flex-1 flex-col px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                aria-label="Close session"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1A203E] shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="text-center">
                <p className="font-display text-[17px] font-semibold text-[#1A203E]">{practice.title}</p>
                <p className="text-[12px] text-[#9499A8]">{practice.category}</p>
              </div>
              <div className="w-10" aria-hidden />
            </div>

            <div className="relative mb-8 h-1.5 overflow-hidden rounded-full bg-[#EDE9FE]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                animate={{ width: `${Math.max(2, progress * 100)}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <MindfulnessPracticeAnimation practice={practice} paused={paused} />
              <p className="mt-16 font-display text-[2.75rem] font-semibold tabular-nums tracking-tight text-[#1A203E]">
                {mm}:{ss}
              </p>
              <p className="mt-1 text-[12px] text-[#9499A8]">{paused ? "Paused" : "remaining"}</p>
              <p className="mt-4 max-w-[260px] text-center text-[13px] leading-relaxed text-[#9499A8]">
                {practice.subtitle}
              </p>
            </div>

            <div className="flex justify-center gap-6 pb-2">
              <button
                type="button"
                aria-label={paused ? "Resume" : "Pause"}
                onClick={() => setPaused((p) => !p)}
                className="pressable grid h-16 w-16 place-items-center rounded-full bg-white text-[#7C69EF] shadow-[0_8px_24px_rgba(124,105,239,0.18)]"
              >
                {paused ? <Play size={22} fill="currentColor" className="ml-0.5" /> : <Pause size={22} />}
              </button>
              <button
                type="button"
                aria-label="Complete session"
                onClick={finish}
                className="pressable grid h-16 w-16 place-items-center rounded-full bg-white text-[#7C69EF] shadow-[0_8px_24px_rgba(124,105,239,0.18)]"
              >
                <Square size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
