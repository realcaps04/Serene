import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNavigation } from "./Chrome";
import { Toast } from "../ui/Overlay";
import { useApp } from "../../context/app-context";

export function AppShell({ withNav = false }: { withNav?: boolean }) {
  const { toast } = useApp();
  const location = useLocation();

  return (
    <div className="min-h-dvh bg-[#F4F4F6] md:py-6 md:wellness-bg">
      <div className="relative mx-auto flex h-dvh w-full max-w-shell flex-col overflow-hidden bg-[#F4F4F6] md:h-[min(100dvh-48px,920px)] md:rounded-[32px] md:border md:border-white/70 md:shadow-lift dark:bg-surface-secondary">
        <Toast message={toast} />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#F4F4F6] dark:bg-surface-secondary"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        {withNav ? <BottomNavigation /> : null}
      </div>
    </div>
  );
}

export function Screen({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-[var(--nav-content-clearance)] pt-[max(16px,env(safe-area-inset-top))] ${className}`}
    >
      {children}
    </div>
  );
}

export function ScreenActions({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mt-auto pt-8 pb-2 mb-10 ${className}`}>{children}</div>;
}
