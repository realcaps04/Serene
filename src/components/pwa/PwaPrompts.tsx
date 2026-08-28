import { Download, RefreshCw, Share, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import { Modal } from "../ui/Overlay";
import {
  INSTALL_DISMISS_KEY,
  isIosSafari,
  isMobileDevice,
  isStandaloneApp,
} from "../../lib/pwa";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaPrompts() {
  const [installOpen, setInstallOpen] = useState(false);
  const [iosGuide, setIosGuide] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const iosTimerRef = useRef<number | null>(null);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      registration.update();
      window.setInterval(() => registration.update(), 60 * 60 * 1000);
    },
  });

  useEffect(() => {
    if (isStandaloneApp() || !isMobileDevice()) return;
    if (localStorage.getItem(INSTALL_DISMISS_KEY)) return;

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (iosTimerRef.current !== null) {
        window.clearTimeout(iosTimerRef.current);
        iosTimerRef.current = null;
      }
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setInstallOpen(true);
      setIosGuide(false);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);

    iosTimerRef.current = window.setTimeout(() => {
      if (isIosSafari() && !isStandaloneApp() && !localStorage.getItem(INSTALL_DISMISS_KEY)) {
        setIosGuide(true);
        setInstallOpen(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      if (iosTimerRef.current !== null) {
        window.clearTimeout(iosTimerRef.current);
      }
    };
  }, []);

  const dismissInstall = () => {
    setInstallOpen(false);
    localStorage.setItem(INSTALL_DISMISS_KEY, "1");
  };

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    dismissInstall();
  };

  return (
    <>
      <Modal open={needRefresh} title="Update available" centered onClose={() => setNeedRefresh(false)}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-lavender-surface text-indigo-brand">
            <RefreshCw size={18} />
          </span>
          <p>
            A newer version of Serene is ready. Refresh to get the latest improvements.
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <PrimaryButton className="!px-4 !py-2.5" onClick={() => void updateServiceWorker(true)}>
            Update now
          </PrimaryButton>
          <SecondaryButton className="!px-4 !py-2.5" onClick={() => setNeedRefresh(false)}>
            Later
          </SecondaryButton>
        </div>
      </Modal>

      {installOpen && !isStandaloneApp() ? (
        <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <div
            role="dialog"
            aria-labelledby="install-title"
            className="relative mx-auto max-w-shell rounded-card-lg border border-line bg-white p-4 shadow-lift dark:bg-surface-card"
          >
            <button
              type="button"
              aria-label="Dismiss install prompt"
              onClick={dismissInstall}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-lavender-surface"
            >
              <X size={16} />
            </button>
            <div className="flex items-start gap-3 pr-8">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-lavender-surface text-indigo-brand">
                {iosGuide ? <Share size={18} /> : <Download size={18} />}
              </span>
              <div className="min-w-0 flex-1">
                <p id="install-title" className="font-semibold text-ink">
                  Install Serene
                </p>
                <p className="mt-1 text-body text-ink-secondary">
                  {iosGuide
                    ? "Add Serene to your Home Screen: tap Share, then Add to Home Screen."
                    : "Install Serene on your device for a calmer, app-like experience."}
                </p>
                {!iosGuide ? (
                  <PrimaryButton className="mt-3 !px-4 !py-2.5" onClick={() => void installApp()}>
                    Install app
                  </PrimaryButton>
                ) : (
                  <SecondaryButton className="mt-3 !px-4 !py-2.5" onClick={dismissInstall}>
                    Got it
                  </SecondaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
