import { motion } from "framer-motion";
import cloudMascot from "../../assets/cloud-mascot.png";

type CloudMascotProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  title?: string;
};

export function CloudMascot({
  size = 48,
  animated = false,
  className = "",
  title = "Serene",
}: CloudMascotProps) {
  const image = (
    <img
      src={cloudMascot}
      alt={title}
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      className={`select-none object-contain drop-shadow-[0_8px_18px_rgba(147,197,253,0.35)] ${className}`}
      style={{ width: size, height: size }}
    />
  );

  if (!animated) return image;

  return (
    <motion.div
      animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {image}
    </motion.div>
  );
}

export function CloudMascotAvatar({
  size = 36,
  accentColor = "#60A5FA",
}: {
  size?: number;
  accentColor?: string;
}) {
  const shell = Math.round(size * 1.15);
  return (
    <div className="mb-1 shrink-0" style={{ width: shell, height: shell }}>
      <span
        className="relative grid h-full w-full place-items-center rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${accentColor}ee 0%, ${accentColor} 55%, ${accentColor}cc 100%)`,
          boxShadow: `0 8px 18px ${accentColor}44`,
        }}
      >
        <span
          className="absolute inset-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 100%)",
          }}
        />
        <CloudMascot
          size={Math.round(size * 0.88)}
          title="Serene companion"
          className="relative drop-shadow-[0_4px_10px_rgba(15,23,42,0.12)]"
        />
      </span>
    </div>
  );
}
