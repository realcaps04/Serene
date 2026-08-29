import { motion } from "framer-motion";
import { Brain, Focus, Moon, Sparkles, Sun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import type { MindfulnessPractice } from "../../data/content";

type Phase = "in" | "hold" | "out";

const CUE_LINES: Record<string, string[]> = {
  Meditation: ["Let thoughts pass like clouds.", "Return gently to the breath.", "Nothing to fix right now."],
  Sleep: ["Soften your shoulders.", "Let the day drift away.", "You are safe to rest."],
  Stress: ["Release your jaw.", "Unclench your hands.", "Exhale the weight you carry."],
  Focus: ["One thing at a time.", "Notice, then choose.", "Clarity comes in small steps."],
  Relaxation: ["Arrive here, kindly.", "No rush. Just now.", "Ease into the present."],
};

function BreathingAnimation({ paused, label }: { paused: boolean; label: string }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.82, 1.14, 1.14, 0.82] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#DDD6FE]/40 blur-2xl"
      />
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.88, 1.08, 1.08, 0.88] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        className="absolute inset-8 rounded-full bg-[#FBCFE8]/55"
      />
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.9, 1.05, 1.05, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute inset-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] shadow-[0_0_40px_rgba(139,92,246,0.45)]"
      />
      <Wind size={28} className="relative z-10 text-white" strokeWidth={2} />
      <p className="absolute -bottom-10 text-[15px] font-semibold text-[#7C69EF]">{label}</p>
    </div>
  );
}

function MeditationAnimation({ paused, cue }: { paused: boolean; cue: string }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <motion.div
        animate={paused ? {} : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-dashed border-[#C4B5FD]/70"
      />
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-10 rounded-full bg-gradient-to-br from-[#EDE9FE] to-[#FCE7F3] shadow-[0_0_32px_rgba(167,139,250,0.35)]"
      />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={paused ? { opacity: 0.4 } : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
          className="absolute text-[#EC4899]"
          style={{ top: `${18 + i * 22}%`, left: `${20 + i * 24}%` }}
        >
          <Sparkles size={16} />
        </motion.span>
      ))}
      <Sparkles size={30} className="relative z-10 text-[#7C69EF]" strokeWidth={2} />
      <p className="absolute -bottom-10 max-w-[220px] text-center text-[14px] font-medium text-[#9499A8]">{cue}</p>
    </div>
  );
}

function SleepAnimation({ paused }: { paused: boolean }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1E1B4B]/10 to-[#312E81]/5" />
      {["✦", "·", "✦", "·"].map((star, i) => (
        <motion.span
          key={i}
          animate={paused ? { opacity: 0.3 } : { opacity: [0.15, 0.9, 0.15], y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.7 }}
          className="absolute text-[#A78BFA]"
          style={{ top: `${12 + i * 12}%`, left: `${15 + i * 18}%`, fontSize: i % 2 ? 10 : 14 }}
        >
          {star}
        </motion.span>
      ))}
      <motion.div
        animate={paused ? { y: 0 } : { y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] shadow-[0_0_36px_rgba(99,102,241,0.4)]"
      >
        <Moon size={34} className="text-white" fill="white" strokeWidth={1.5} />
      </motion.div>
      <motion.p
        animate={paused ? { opacity: 0.5 } : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-10 text-[15px] font-semibold text-[#6366F1]"
      >
        Drifting into rest…
      </motion.p>
    </div>
  );
}

function StressAnimation({ paused }: { paused: boolean }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          animate={paused ? { scale: 1, opacity: 0.2 } : { scale: [0.55, 1.45], opacity: [0.45, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: ring * 1.05, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-[#C4B5FD]"
        />
      ))}
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#EDE9FE] to-[#F5F3FF] shadow-[0_8px_28px_rgba(124,105,239,0.2)]"
      >
        <Brain size={32} className="text-[#7C69EF]" strokeWidth={1.85} />
      </motion.div>
      <p className="absolute -bottom-10 text-[15px] font-semibold text-[#7C69EF]">Let tension melt away</p>
    </div>
  );
}

function FocusAnimation({ paused }: { paused: boolean }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <motion.div
        animate={paused ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6 rounded-full border-2 border-[#99F6E4]/80"
      />
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [1, 0.82, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-14 rounded-full border-2 border-[#5EEAD4]"
      />
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#14B8A6] to-[#2DD4BF] shadow-[0_0_28px_rgba(45,212,191,0.4)]"
      >
        <Focus size={28} className="text-white" strokeWidth={2.25} />
      </motion.div>
      <p className="absolute -bottom-10 text-[15px] font-semibold text-[#14B8A6]">Sharpen your attention</p>
    </div>
  );
}

function RelaxationAnimation({ paused }: { paused: boolean }) {
  return (
    <div className="relative grid h-64 w-64 place-items-center">
      <motion.div
        animate={paused ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-10 w-1 -translate-x-1/2 origin-bottom rounded-full bg-[#FDE68A]/80"
            style={{ transform: `rotate(${i * 45}deg) translateY(-72px)` }}
          />
        ))}
      </motion.div>
      <motion.div
        animate={paused ? { scale: 1 } : { scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] shadow-[0_0_32px_rgba(251,191,36,0.45)]"
      >
        <Sun size={32} className="text-white" strokeWidth={2} />
      </motion.div>
      <p className="absolute -bottom-10 text-[15px] font-semibold text-[#D97706]">Warm, gentle ease</p>
    </div>
  );
}

export function MindfulnessPracticeAnimation({
  practice,
  paused,
}: {
  practice: MindfulnessPractice;
  paused: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("in");
  const [cueIndex, setCueIndex] = useState(0);
  const category = practice.category;
  const cues = CUE_LINES[category] ?? CUE_LINES.Relaxation;

  useEffect(() => {
    if (paused || category !== "Breathing") return;
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        setPhase("in");
        await wait(4000);
        if (cancelled) break;
        setPhase("hold");
        await wait(2000);
        if (cancelled) break;
        setPhase("out");
        await wait(5000);
      }
    };
    void loop();
    return () => {
      cancelled = true;
    };
  }, [paused, category]);

  useEffect(() => {
    if (paused || category === "Breathing") return;
    const id = window.setInterval(() => setCueIndex((i) => (i + 1) % cues.length), 8000);
    return () => window.clearInterval(id);
  }, [paused, category, cues.length]);

  const breathLabel = phase === "in" ? "Breathe in" : phase === "hold" ? "Hold gently" : "Breathe out";

  if (category === "Breathing") {
    return <BreathingAnimation paused={paused} label={breathLabel} />;
  }
  if (category === "Meditation") {
    return <MeditationAnimation paused={paused} cue={cues[cueIndex]!} />;
  }
  if (category === "Sleep") {
    return <SleepAnimation paused={paused} />;
  }
  if (category === "Stress") {
    return <StressAnimation paused={paused} />;
  }
  if (category === "Focus") {
    return <FocusAnimation paused={paused} />;
  }
  return <RelaxationAnimation paused={paused} />;
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
