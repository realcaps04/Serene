import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BrandLockup } from "../components/brand/Logo";
import { useApp } from "../context/app-context";
import { hasActiveSession } from "../lib/session";

export function SplashScreen() {
  const { go } = useApp();
  const advanced = useRef(false);

  const continueFromSplash = () => {
    if (advanced.current) return;
    advanced.current = true;
    if (hasActiveSession()) {
      go("home", { replace: true });
      return;
    }
    go("welcome", { replace: true });
  };

  useEffect(() => {
    if (hasActiveSession()) {
      continueFromSplash();
      return;
    }
    const id = window.setTimeout(continueFromSplash, 2400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F8FC]">
      <button
        type="button"
        onClick={continueFromSplash}
        className="flex h-full w-full items-center justify-center focus-visible:outline-none"
        aria-label="Serene. Mindfulness, AI Companion, Wellbeing. Continue."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLockup markSize={148} />
        </motion.div>
      </button>
    </div>
  );
}
