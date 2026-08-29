import { ChevronDown, ChevronRight, Phone } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WhatsAppIcon } from "../brand/WhatsAppIcon";
import {
  PHONE_COUNTRIES,
  formatPhoneDisplay,
  formatStoredPhone,
  getCountryByCode,
  parseStoredPhone,
  validatePhoneNumber,
} from "../../lib/phone-countries";

type PhoneNumberInputProps = {
  value: string;
  onChange: (value: string) => void;
  expanded: boolean;
  onExpand: () => void;
  error?: string | null;
};

export function PhoneNumberInput({
  value,
  onChange,
  expanded,
  onExpand,
  error,
}: PhoneNumberInputProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const parsed = parseStoredPhone(value);
  const [countryCode, setCountryCode] = useState(parsed.countryCode);
  const [nationalNumber, setNationalNumber] = useState(parsed.nationalNumber);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  const country = getCountryByCode(countryCode);
  const localError = error ?? validatePhoneNumber(countryCode, nationalNumber);

  useEffect(() => {
    const next = parseStoredPhone(value);
    setCountryCode(next.countryCode);
    setNationalNumber(next.nationalNumber);
  }, [value]);

  useLayoutEffect(() => {
    if (!pickerOpen || !triggerRef.current) {
      setMenuStyle(null);
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: Math.max(rect.width, 224),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [pickerOpen]);

  useEffect(() => {
    if (!pickerOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setPickerOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pickerOpen]);

  useEffect(() => {
    if (!expanded) setPickerOpen(false);
  }, [expanded]);

  const commit = (nextCountry: string, nextNational: string) => {
    onChange(formatStoredPhone(nextCountry, nextNational));
  };

  const handleNationalChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, getCountryByCode(countryCode).maxLength);
    setNationalNumber(digits);
    commit(countryCode, digits);
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setPickerOpen(false);
    commit(code, nationalNumber);
  };

  const countryMenu =
    pickerOpen && menuStyle && typeof document !== "undefined"
      ? createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            aria-label="Country code"
            style={{ top: menuStyle.top, left: menuStyle.left, width: menuStyle.width }}
            className="fixed z-[120] max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-[#E8EAF2] bg-white py-1 shadow-[0_12px_32px_rgba(15,23,42,0.18)]"
          >
            {PHONE_COUNTRIES.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={item.code === countryCode}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCountrySelect(item.code)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13px] transition hover:bg-[#FAF7FF] ${
                    item.code === countryCode ? "bg-[#F5F3FF] font-semibold text-[#7C69EF]" : "text-[#1A203E]"
                  }`}
                >
                  <span className="text-[18px] leading-none">{item.flag}</span>
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <span className="shrink-0 text-[#9499A8]">+{item.dial}</span>
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )
      : null;

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={onExpand}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#FAFAFC]"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EDE9FE] text-[#7C69EF]">
          <Phone size={18} strokeWidth={1.85} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-medium text-[#9499A8]">Contact Number</span>
          <span className="block truncate text-[14px] font-semibold text-[#1A203E]">
            {value ? formatPhoneDisplay(value) : "—"}
          </span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-[#C4C9D6]" aria-hidden />
      </button>
    );
  }

  return (
    <div ref={rootRef} className="px-4 py-3.5">
      <div className="mb-3 flex items-start gap-3 rounded-[16px] border border-[#DCFCE7] bg-[#F0FDF4] px-3.5 py-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-sm">
          <WhatsAppIcon size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-[#166534]">WhatsApp OTP verification</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-[#4B5563]">
            Use a number active on WhatsApp — we&apos;ll send your verification code there.
          </p>
        </div>
      </div>

      <label className="mb-1.5 block text-[11px] font-medium text-[#9499A8]" htmlFor={`${listId}-national`}>
        Phone number
      </label>
      <div className="flex gap-2">
        <div className="relative shrink-0">
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={pickerOpen}
            aria-haspopup="listbox"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setPickerOpen((open) => !open)}
            className={`flex h-[46px] items-center gap-1.5 rounded-xl border bg-white px-2.5 text-[13px] font-semibold text-[#1A203E] transition ${
              pickerOpen ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20" : "border-[#E8EAF2]"
            }`}
          >
            <span className="text-[20px] leading-none" aria-hidden>
              {country.flag}
            </span>
            <span>+{country.dial}</span>
            <ChevronDown
              size={14}
              className={`text-[#9499A8] transition ${pickerOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>

        <input
          id={`${listId}-national`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          autoFocus
          value={nationalNumber}
          placeholder={country.code === "IN" ? "98765 43210" : "Phone number"}
          onChange={(e) => handleNationalChange(e.target.value)}
          className={`min-w-0 flex-1 rounded-xl border bg-[#FAFAFC] px-3 py-2.5 text-[14px] font-medium text-[#1A203E] outline-none ${
            localError
              ? "border-[#FCA5A5] ring-2 ring-[#FCA5A5]/30"
              : "border-[#E8EAF2] ring-[#8B5CF6] focus:border-[#8B5CF6] focus:ring-2"
          }`}
        />
      </div>

      {countryMenu}

      {localError ? (
        <p className="mt-2 text-[11px] font-medium text-[#DC2626]" role="alert">
          {localError}
        </p>
      ) : nationalNumber ? (
        <p className="mt-2 text-[11px] text-[#16A34A]">Valid {country.name} mobile format</p>
      ) : (
        <p className="mt-2 text-[11px] text-[#9499A8]">
          {country.minLength}–{country.maxLength} digits for {country.name}
        </p>
      )}
    </div>
  );
}
