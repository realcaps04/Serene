import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { IconButton } from "../components/ui/Button";
import { BreathingOrb } from "../components/wellness/Wellness";
import { useApp } from "../context/app-context";

type Phase = "in" | "hold" | "out";

export function BreathingScreen() {
  const { go, settings, markBreathingComplete } = useApp();
  const total = settings.meditationDuration * 60;
  const [remaining, setRemaining] = useState(total);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<Phase>("in");
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    markBreathingComplete();
    go("mindfulness");
  };

  useEffect(() => {
    if (paused) return;
    const tick = window.setInterval(() => {
      setRemaining((n) => Math.max(0, n - 1));
    }, 1000);
    return () => window.clearInterval(tick);
  }, [paused]);

  useEffect(() => {
    if (remaining > 0) return;
    finish();
  }, [remaining]);

  useEffect(() => {
    const inMs = settings.breathingPace === "slow" ? 5000 : settings.breathingPace === "gentle" ? 4500 : 4000;
    const holdMs = 2000;
    const outMs = settings.breathingPace === "slow" ? 6000 : 5000;
    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        setPhase("in");
        await wait(inMs);
        if (cancelled) break;
        setPhase("hold");
        await wait(holdMs);
        if (cancelled) break;
        setPhase("out");
        await wait(outMs);
      }
    };
    if (!paused) void loop();
    return () => {
      cancelled = true;
    };
  }, [paused, settings.breathingPace]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <Screen className="overflow-hidden">
      <div className="w-full">
        <Header
          align="center"
          title="Breathing"
          subtitle="Relax & Reset"
          left={
            <IconButton label="Back" onClick={() => go("mindfulness")}>
              <ArrowLeft size={20} />
            </IconButton>
          }
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <BreathingOrb phase={phase} pace={settings.breathingPace} />
        <p className="mt-10 font-display text-4xl font-semibold tabular-nums text-ink">
          {mm}:{ss}
        </p>
        <p className="mt-1 text-meta text-ink-muted">remaining</p>
      </div>

      <div className="flex justify-center gap-6 pb-4">
        <button
          type="button"
          aria-label={paused ? "Resume" : "Pause"}
          onClick={() => setPaused((p) => !p)}
          className="pressable grid h-16 w-16 place-items-center rounded-full bg-white text-indigo-brand shadow-soft dark:bg-surface-card"
        >
          {paused ? <Play size={22} fill="currentColor" /> : <Pause size={22} />}
        </button>
        <button
          type="button"
          aria-label="Stop"
          onClick={finish}
          className="pressable grid h-16 w-16 place-items-center rounded-full bg-white text-indigo-brand shadow-soft dark:bg-surface-card"
        >
          <Square size={18} fill="currentColor" />
        </button>
      </div>
    </Screen>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
