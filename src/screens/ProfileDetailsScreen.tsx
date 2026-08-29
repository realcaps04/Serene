import {
  ArrowRight,
  ChevronRight,
  Lock,
  Mail,
  Pencil,
  Shield,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Avatar } from "../components/brand/Logo";
import { VerifiedBadge } from "../components/brand/VerifiedBadge";
import { PhoneNumberInput } from "../components/profile/PhoneNumberInput";
import { useApp } from "../context/app-context";
import type { ProfileDetails } from "../lib/types";
import { buildDisplayName } from "../lib/profile";
import { parseStoredPhone, validatePhoneNumber } from "../lib/phone-countries";

type FieldKey = "firstName" | "lastName";

const NAME_FIELDS: {
  key: FieldKey;
  label: string;
  icon: typeof User;
  placeholder: string;
}[] = [
  { key: "firstName", label: "First Name", icon: User, placeholder: "First name" },
  { key: "lastName", label: "Last Name", icon: User, placeholder: "Last name" },
];

function ProfileDetailsHeroArt() {
  return (
    <svg width="72" height="72" viewBox="0 0 88 88" fill="none" className="shrink-0" aria-hidden>
      <circle cx="44" cy="44" r="36" fill="#EDE9FE" />
      <circle cx="44" cy="44" r="28" fill="#DDD6FE" opacity="0.8" />
      <circle cx="44" cy="36" r="10" fill="#C4B5FD" />
      <path d="M24 62c4-10 12-14 20-14s16 4 20 14" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 52c6-8 12-10 18-8M80 48c-5-7-11-9-17-7" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="24" r="3" fill="#F472B6" opacity="0.7" />
      <circle cx="72" cy="20" r="2.5" fill="#A78BFA" opacity="0.6" />
    </svg>
  );
}

export function ProfileDetailsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { googleUser, firstName, lastName, email, contactNumber, saveProfileDetails, showToast } = useApp();

  const [draft, setDraft] = useState<ProfileDetails>({
    firstName,
    lastName,
    contactNumber,
  });
  const [activeField, setActiveField] = useState<FieldKey | "contactNumber" | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const sheetShellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      sheetShellRef.current?.style.removeProperty("transform");
      return;
    }
    setDraft({ firstName, lastName, contactNumber });
    setActiveField(null);
    setPhoneError(null);
  }, [open, firstName, lastName, contactNumber]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const displayName = buildDisplayName(draft.firstName, draft.lastName);
  const isLoggedIn = Boolean(googleUser);
  const primaryEmail = googleUser?.email ?? email;

  const handleSave = async () => {
    if (!draft.firstName.trim()) {
      showToast("Please add a first name.");
      setActiveField("firstName");
      return;
    }

    if (draft.contactNumber.trim()) {
      const parsed = parseStoredPhone(draft.contactNumber);
      const error = validatePhoneNumber(parsed.countryCode, parsed.nationalNumber);
      if (error) {
        setPhoneError(error);
        setActiveField("contactNumber");
        showToast(error);
        return;
      }
    }

    setSaving(true);
    try {
      await saveProfileDetails({
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
        contactNumber: draft.contactNumber.trim(),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close profile editor"
            className="absolute inset-0 bg-[#1A203E]/45 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            ref={sheetShellRef}
            className="fixed inset-x-0 bottom-0 z-[101] mx-auto w-full max-w-shell"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            onAnimationComplete={() => {
              if (!open) return;
              sheetShellRef.current?.style.setProperty("transform", "none");
            }}
          >
            <div
              role="dialog"
              aria-modal
              aria-labelledby="profile-details-title"
              className="flex h-[min(88dvh,720px)] flex-col overflow-hidden rounded-t-[28px] bg-gradient-to-b from-[#FFFBFE] via-[#FAF7FF] to-white shadow-[0_-12px_48px_rgba(15,23,42,0.18)]"
            >
              <div className="shrink-0 px-5 pb-2 pt-3">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#E4E4EA]" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 id="profile-details-title" className="font-display text-[1.5rem] font-bold tracking-[-0.03em] text-[#1A203E]">
                      Profile Details
                    </h2>
                    <p className="mt-0.5 text-[12px] text-[#9499A8]">
                      This is how you&apos;ll appear across Serene. <span aria-hidden>❤️</span>
                    </p>
                  </div>
                  <ProfileDetailsHeroArt />
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#9499A8] shadow-sm transition hover:bg-[#EDE9FE] hover:text-[#7C69EF]"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 [-webkit-overflow-scrolling:touch]">
                <div className="mb-4 flex items-start gap-4">
                  <div className="relative shrink-0">
                    <Avatar name={displayName} picture={googleUser?.picture} size={64} />
                    <span className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(124,105,239,0.35)]">
                      <Pencil size={12} className="text-[#7C69EF]" strokeWidth={2.25} aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-[17px] font-semibold text-[#1A203E]">{displayName}</p>
                      {isLoggedIn ? <VerifiedBadge size={26} /> : null}
                    </div>
                    {isLoggedIn ? (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-semibold text-[#7C69EF]">
                        Serene Member
                      </span>
                    ) : null}
                    <p className="mt-2 text-[11px] leading-relaxed text-[#9499A8]">
                      Keep your details up to date to personalize your experience.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
                  {NAME_FIELDS.map((field) => {
                    const Icon = field.icon;
                    const isActive = activeField === field.key;
                    const value = draft[field.key];

                    return (
                      <div key={field.key} className="border-b border-[#F0F1F5]">
                        <button
                          type="button"
                          onClick={() => setActiveField(field.key)}
                          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#FAFAFC]"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EDE9FE] text-[#7C69EF]">
                            <Icon size={18} strokeWidth={1.85} aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[11px] font-medium text-[#9499A8]">{field.label}</span>
                            {!isActive ? (
                              <span className="block truncate text-[14px] font-semibold text-[#1A203E]">
                                {value || "—"}
                              </span>
                            ) : null}
                          </span>
                          {!isActive ? <ChevronRight size={18} className="shrink-0 text-[#C4C9D6]" aria-hidden /> : null}
                        </button>
                        {isActive ? (
                          <div className="px-4 pb-3.5 pl-[4.25rem]">
                            <input
                              autoFocus
                              value={value}
                              placeholder={field.placeholder}
                              onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                              onBlur={() => setActiveField(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") setActiveField(null);
                              }}
                              className="w-full rounded-xl border border-[#E8EAF2] bg-[#FAFAFC] px-3 py-2.5 text-[14px] font-medium text-[#1A203E] outline-none ring-[#8B5CF6] focus:border-[#8B5CF6] focus:ring-2"
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  <div className="border-b border-[#F0F1F5]">
                    <div className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EDE9FE] text-[#7C69EF]">
                        <Mail size={18} strokeWidth={1.85} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-medium text-[#9499A8]">Email Address</span>
                        <span className="block truncate text-[14px] font-semibold text-[#1A203E]">
                          {primaryEmail || "Not linked"}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-[#9499A8]">
                          Primary account · cannot be changed
                        </span>
                      </span>
                      <Lock size={16} className="shrink-0 text-[#C4C9D6]" aria-hidden />
                    </div>
                  </div>

                  <PhoneNumberInput
                    value={draft.contactNumber}
                    onChange={(next) => {
                      setDraft((prev) => ({ ...prev, contactNumber: next }));
                      setPhoneError(null);
                    }}
                    expanded={activeField === "contactNumber"}
                    onExpand={() => setActiveField("contactNumber")}
                    onCollapse={() => setActiveField(null)}
                    error={phoneError}
                  />

                  <div className="mx-3 mb-3 mt-2 flex items-start gap-3 rounded-[18px] bg-[#F5F3FF] px-4 py-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#8B5CF6] shadow-sm">
                      <Shield size={18} strokeWidth={1.85} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-[#1A203E]">Your privacy matters</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-[#9499A8]">
                        We keep your information safe and never share it without your permission.
                      </p>
                    </div>
                    <Lock size={28} className="shrink-0 text-[#DDD6FE]" strokeWidth={1.5} aria-hidden />
                  </div>
                </div>

                <div className="h-4" aria-hidden />
              </div>

              <div className="shrink-0 border-t border-[#F0F1F5] bg-white/95 px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))] backdrop-blur-sm">
                <motion.button
                  type="button"
                  disabled={saving}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  onClick={() => void handleSave()}
                  className="pressable flex w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] py-4 text-[15px] font-semibold text-white shadow-[0_8px_28px_rgba(139,92,246,0.35)] transition hover:brightness-[1.03] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Changes"}
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
                </motion.button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#9499A8]">
                  <Lock size={12} className="text-[#A78BFA]" aria-hidden />
                  Your data is encrypted and secure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/** @deprecated Route removed — use ProfileDetailsSheet from ProfileScreen. */
export function ProfileDetailsScreen() {
  return null;
}
