import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary:
    "text-white shadow-soft bg-gradient-to-r from-lavender to-pink-premium hover:brightness-[1.03]",
  secondary:
    "bg-white/80 dark:bg-surface-card text-ink border border-line shadow-soft hover:bg-lavender-surface",
  ghost: "bg-transparent text-ink-secondary hover:text-ink hover:bg-lavender-surface/70",
  danger: "text-white shadow-soft bg-gradient-to-r from-pink-premium to-coral",
};

export function Button({
  variant = "primary",
  full,
  loading,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`pressable inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3.5 text-[15px] font-semibold transition disabled:opacity-50 ${full ? "w-full" : ""} ${styles[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}

export function IconButton({
  label,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`pressable grid h-11 w-11 place-items-center rounded-2xl text-ink-secondary transition hover:bg-lavender-surface hover:text-ink ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
