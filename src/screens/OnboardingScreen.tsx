import { ArrowRight, Flower2, Heart, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SereneMark } from "../components/brand/Logo";
import { Screen } from "../components/navigation/AppShell";
import { useApp } from "../context/app-context";

function WelcomeLandscape() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 390 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="w-sky" x1="195" y1="0" x2="195" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF8FC" />
          <stop offset="55%" stopColor="#F3EEFF" />
          <stop offset="100%" stopColor="#E9DEFF" />
        </linearGradient>
        <linearGradient id="w-water" x1="195" y1="340" x2="195" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.65" />
        </linearGradient>
        <radialGradient id="w-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="390" height="520" fill="url(#w-sky)" />

      {/* distant birds */}
      <path d="M88 118c6-4 12-4 18 0M268 102c5-3 10-3 15 0M312 128c4-3 8-3 12 0" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />

      {/* back mountains */}
      <path
        d="M0 280 L65 210 L130 250 L195 175 L260 235 L325 195 L390 255 L390 520 L0 520 Z"
        fill="#DDD6FE"
        fillOpacity="0.55"
      />
      {/* mid mountains */}
      <path
        d="M0 320 L55 265 L120 300 L195 230 L270 290 L340 255 L390 300 L390 520 L0 520 Z"
        fill="#C4B5FD"
        fillOpacity="0.65"
      />
      {/* front hills */}
      <path
        d="M0 370 L80 330 L160 355 L195 310 L230 350 L310 325 L390 360 L390 520 L0 520 Z"
        fill="#A78BFA"
        fillOpacity="0.45"
      />
      <path
        d="M0 400 L90 375 L195 345 L300 378 L390 395 L390 520 L0 520 Z"
        fill="#F9A8D4"
        fillOpacity="0.35"
      />

      {/* sun */}
      <circle cx="195" cy="248" r="42" fill="url(#w-sun)" />
      <circle cx="195" cy="248" r="28" fill="white" fillOpacity="0.88" />

      {/* water */}
      <rect x="0" y="380" width="390" height="140" fill="url(#w-water)" />
      <ellipse cx="195" cy="395" rx="120" ry="18" fill="white" fillOpacity="0.25" />

      {/* foliage left */}
      <path
        d="M0 420 C20 390 35 400 50 430 C30 450 10 445 0 460 Z"
        fill="#A78BFA"
        fillOpacity="0.35"
      />
      <path d="M8 440c8-18 22-28 38-22" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* foliage right */}
      <path
        d="M390 415 C370 385 355 395 340 425 C360 445 380 440 390 455 Z"
        fill="#F472B6"
        fillOpacity="0.28"
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: Leaf,
    title: "Mindfulness",
    subtitle: "Daily practices",
    bg: "bg-lavender-surface",
    color: "text-indigo-brand",
  },
  {
    icon: Heart,
    title: "AI Companion",
    subtitle: "Always here to listen",
    bg: "bg-pink-faint",
    color: "text-pink-premium",
  },
  {
    icon: Flower2,
    title: "Emotional Wellbeing",
    subtitle: "Understand & grow",
    bg: "bg-lavender-surface",
    color: "text-lavender",
  },
] as const;

export function OnboardingScreen() {
  const { go, setName } = useApp();

  return (
    <Screen className="relative overflow-hidden !bg-[#F8F7FC] !px-0 !pb-0">
      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Hero */}
        <div className="relative min-h-[40%] max-h-[46vh] shrink-0">
          <WelcomeLandscape />

          <div className="absolute right-4 top-2 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lavender/40 bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-indigo-brand shadow-[0_4px_12px_rgba(88,101,242,0.08)] backdrop-blur-sm">
              <ShieldCheck size={14} strokeWidth={2.1} />
              Your safe space
            </span>
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center px-5 pt-6 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SereneMark
              size={72}
              className="drop-shadow-[0_10px_28px_rgba(122,90,248,0.28)]"
            />
            <h1 className="mt-4 font-display text-[2rem] font-semibold tracking-[-0.03em] text-[#1A2B4C]">
              Serene
            </h1>
            <p className="mt-2 text-[13px] font-medium text-[#7C69EF]">Mindfulness • AI Companion</p>
            <p className="mt-1 text-[12px] text-[#9499A8]">Wellbeing for everyone</p>
          </motion.div>
        </div>

        {/* Bottom card */}
        <motion.div
          className="relative z-20 -mt-6 shrink-0 rounded-t-[32px] bg-white px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-7 shadow-[0_-8px_32px_rgba(88,101,242,0.08)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
        >
          <div className="text-center">
            <Heart size={18} className="mx-auto text-pink-premium" fill="currentColor" strokeWidth={0} />
            <h2 className="mt-2 font-display text-[1.35rem] font-semibold text-[#1A2B4C]">Be kind to your mind.</h2>
            <p className="mx-auto mt-2 max-w-[18rem] text-[12px] leading-relaxed text-[#7A7F8E]">
              Serene is your AI-powered companion for a calmer mind and a better you.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {FEATURES.map(({ icon: Icon, title, subtitle, bg, color }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className={`grid h-11 w-11 place-items-center rounded-full ${bg} ${color} shadow-[0_4px_12px_rgba(88,101,242,0.06)]`}>
                  <Icon size={20} strokeWidth={2} />
                </span>
                <p className="mt-2 text-[11px] font-semibold leading-tight text-[#1A2B4C]">{title}</p>
                <p className="mt-0.5 text-[9px] leading-snug text-[#9499A8]">{subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => {
                setName("Partner");
                go("goals");
              }}
              className="pressable flex w-full items-center justify-center gap-2 rounded-[999px] bg-gradient-to-r from-[#7A5AF8] via-indigo-brand to-pink-premium px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(122,90,248,0.35)]"
            >
              Get Started
              <ArrowRight size={18} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => {
                setName("Alex");
                go("sign-in");
              }}
              className="pressable w-full rounded-[999px] border border-[#E4E4EA] bg-white px-5 py-3.5 text-[14px] font-semibold text-[#1A2B4C] shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            >
              I already have an account
            </button>
          </div>
        </motion.div>
      </div>
    </Screen>
  );
}
