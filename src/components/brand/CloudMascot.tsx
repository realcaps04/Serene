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

export function CloudMascotAvatar({ size = 36 }: { size?: number }) {
  return (
    <div className="mb-1 shrink-0" style={{ width: size, height: size }}>
      <CloudMascot size={size} title="Serene companion" />
    </div>
  );
}
