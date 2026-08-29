import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Screen, ScreenActions } from "../components/navigation/AppShell";
import { IconButton } from "../components/ui/Button";
import { MoodCard } from "../components/mood/MoodSelector";
import { MoodWheel } from "../components/mood/MoodWheel";
import { CloudMascot } from "../components/brand/CloudMascot";
import { useApp } from "../context/app-context";
import { MOODS } from "../data/content";

function MoodHeroHeart() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="inline-block" aria-hidden>
      <path
        d="M9 14.5S1.5 9.5 1.5 5.5C1.5 3.5 3 2 4.8 2c1.1 0 2.1.5 2.7 1.3.6-.8 1.6-1.3 2.7-1.3 1.8 0 3.3 1.5 3.3 3.5 0 4-7.5 9-7.5 9z"
        fill="#F472B6"
        stroke="#EC4899"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function MoodScreen() {
  const { go, mood, setMood } = useApp();

  return (
    <Screen className="relative overflow-x-hidden bg-gradient-to-b from-[#FFFBFE] via-[#FAF7FF] to-[#F3EEFF]">
      <div className="pointer-events-none absolute right-[-8%] top-[28%] h-48 w-48 rounded-full bg-[#DDD6FE]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-[-12%] top-[52%] h-40 w-40 rounded-full bg-[#FBCFE8]/35 blur-3xl" />

      {/* Top bar */}
      <div className="relative mb-4 flex items-center justify-between">
        <IconButton
          label="Back"
          onClick={() => go("goals")}
          className="h-11 w-11 rounded-full border border-[#EEF0F5] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
        >
          <ArrowLeft size={20} className="text-[#5B5675]" />
        </IconButton>
        <button
          type="button"
          className="pressable rounded-full px-3 py-2 text-[14px] font-semibold text-[#8B5CF6] transition hover:text-[#7C3AED]"
          onClick={() => go("companion-intro")}
        >
          Skip
        </button>
      </div>

      {/* Hero */}
      <div className="relative mb-6 flex items-start gap-2">
        <div className="min-w-0 flex-1 pt-1">
          <p className="font-display text-[15px] font-semibold text-[#5B5675]">How are you</p>
          <h1 className="mt-0.5 font-display text-[2rem] font-bold leading-[1.15] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
              feeling today?
            </span>
            <span className="ml-1.5 inline-flex translate-y-[-2px]">
              <MoodHeroHeart />
            </span>
          </h1>
          <p className="mt-3 max-w-[15rem] text-[13px] leading-relaxed text-[#9499A8]">
            There are no right or wrong answers. Your check-in helps personalize your experience.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative shrink-0"
        >
          <div className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 rounded-full bg-[#DDD6FE]/40 blur-xl" />
          <CloudMascot size={88} animated className="relative drop-shadow-[0_10px_24px_rgba(167,139,250,0.28)]" />
        </motion.div>
      </div>

      {/* Mood cards — 3 + 2 grid */}
      <div className="relative grid grid-cols-3 gap-2.5">
        {MOODS.slice(0, 3).map((item) => (
          <MoodCard key={item.id} mood={item} selected={mood === item.id} onSelect={() => setMood(item.id)} />
        ))}
      </div>
      <div className="relative mx-auto mt-2.5 grid w-[68%] grid-cols-2 gap-2.5">
        {MOODS.slice(3).map((item) => (
          <MoodCard key={item.id} mood={item} selected={mood === item.id} onSelect={() => setMood(item.id)} />
        ))}
      </div>

      {/* Mood wheel */}
      <div className="relative mt-7">
        <MoodWheel selected={mood} onSelect={setMood} />
        <p className="mt-1 text-center text-[12px] text-[#9499A8]">Or select a mood from the wheel</p>
      </div>

      <ScreenActions className="pb-4">
        <motion.button
          type="button"
          disabled={!mood}
          whileTap={{ scale: mood ? 0.98 : 1 }}
          onClick={() => go("companion-intro")}
          className="pressable flex w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] py-4 text-[15px] font-semibold text-white shadow-[0_8px_28px_rgba(139,92,246,0.35)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Continue
          <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
        </motion.button>
      </ScreenActions>
    </Screen>
  );
}
