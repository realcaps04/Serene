import logoMark from "../../assets/logo-mark.png";

type LogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function SereneMark({ size = 40, className = "", title = "Serene" }: LogoProps) {
  return (
    <img
      src={logoMark}
      alt={title}
      width={size}
      height={size}
      decoding="async"
      fetchPriority={size >= 72 ? "high" : "auto"}
      draggable={false}
      className={`select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({
  size = 48,
  withWordmark = false,
  className = "",
}: LogoProps & { withWordmark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <SereneMark size={size} />
      {withWordmark ? (
        <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">Serene</span>
      ) : null}
    </div>
  );
}

export function BrandLockup({
  markSize = 120,
  className = "",
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <SereneMark size={markSize} title="Serene" />
      <h1 className="mt-5 font-display text-[2.15rem] font-semibold tracking-[-0.03em] text-[#1A203E]">
        Serene
      </h1>
      <p className="mt-2 text-[0.92rem] font-medium tracking-[0.01em] text-[#1A203E]">
        Mindfulness • AI Companion • Wellbeing
      </p>
    </div>
  );
}

export function Avatar({
  size = 44,
  name = "Alex",
}: {
  size?: number;
  name?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "A";
  return (
    <div
      className="grid place-items-center rounded-full bg-gradient-to-br from-indigo-brand to-lavender text-white font-semibold shadow-soft"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initial}
    </div>
  );
}
