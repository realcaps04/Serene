import verifiedBadge from "../../assets/verified-badge.png";

type VerifiedBadgeProps = {
  size?: number;
  className?: string;
};

export function VerifiedBadge({ size = 36, className = "" }: VerifiedBadgeProps) {
  return (
    <img
      src={verifiedBadge}
      alt=""
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      className={`inline-block shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(124,105,239,0.5)] ${className}`}
      style={{ width: size, height: size }}
      aria-label="Verified account"
      title="Verified Serene member"
    />
  );
}
