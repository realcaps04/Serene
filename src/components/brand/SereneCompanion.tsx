import { motion } from "framer-motion";

function Sparkle({
  className,
  color,
  delay = 0,
}: {
  className?: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      animate={{
        opacity: [0.45, 1, 0.45],
        scale: [0.85, 1.15, 0.85],
        rotate: [0, 12, 0],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path d="M10 1l1.2 4.6 4.6 1.2-4.6 1.2L10 12.4 8.8 7.8 4.2 6.6l4.6-1.2L10 1Z" fill={color} />
    </motion.svg>
  );
}

export function SereneCompanion({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto ${className}`}
      style={{ width: 230, height: 230 }}
    >
      <Sparkle className="absolute left-1 top-[42%]" color="#F472B6" delay={0} />
      <Sparkle className="absolute right-1 top-[30%]" color="#A78BFA" delay={0.6} />

      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.svg
          viewBox="0 0 230 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          role="img"
          aria-label="Serene companion"
        >
          <defs>
            <linearGradient id="serene-blob" x1="55" y1="45" x2="175" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B8A8F8" />
              <stop offset="55%" stopColor="#D4B4FE" />
              <stop offset="100%" stopColor="#F8A8C8" />
            </linearGradient>
            <radialGradient id="serene-highlight" cx="0.35" cy="0.28" r="0.55">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <filter id="serene-shadow" x="-30%" y="-10%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          <motion.ellipse
            cx="115"
            cy="205"
            rx="68"
            ry="11"
            fill="#A78BFA"
            opacity="0.18"
            filter="url(#serene-shadow)"
            animate={{
              rx: [68, 62, 68],
              opacity: [0.18, 0.12, 0.18],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.g
            animate={{ scaleY: [1, 1.04, 1], scaleX: [1, 0.98, 1] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "115px 130px" }}
          >
            <path
              d="M115 42c-44 0-72 34-72 74 0 18 8 32 22 40 6 3 14 5 22 5h56c8 0 16-2 22-5 14-8 22-22 22-40 0-40-28-74-72-74Z"
              fill="url(#serene-blob)"
            />
            <ellipse cx="78" cy="178" rx="22" ry="16" fill="url(#serene-blob)" />
            <ellipse cx="152" cy="178" rx="22" ry="16" fill="url(#serene-blob)" />

            <ellipse cx="115" cy="108" rx="78" ry="74" fill="url(#serene-blob)" />
            <motion.ellipse
              cx="115"
              cy="95"
              rx="78"
              ry="74"
              fill="url(#serene-highlight)"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          <motion.g
            animate={{ y: [0, -1, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.circle
              cx="92"
              cy="112"
              r="6"
              fill="#1A203E"
              animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.88, 0.92, 0.96, 1],
              }}
              style={{ transformOrigin: "92px 112px" }}
            />
            <motion.circle
              cx="138"
              cy="112"
              r="6"
              fill="#1A203E"
              animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.88, 0.92, 0.96, 1],
              }}
              style={{ transformOrigin: "138px 112px" }}
            />

            <motion.ellipse
              cx="76"
              cy="124"
              rx="11"
              ry="7"
              fill="#F472B6"
              animate={{ opacity: [0.28, 0.38, 0.28] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.ellipse
              cx="154"
              cy="124"
              rx="11"
              ry="7"
              fill="#F472B6"
              animate={{ opacity: [0.28, 0.38, 0.28] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.path
              d="M102 132c5 6 12 9 13 9s8-3 13-9"
              stroke="#1A203E"
              strokeWidth="2.6"
              strokeLinecap="round"
              animate={{
                d: [
                  "M102 132c5 6 12 9 13 9s8-3 13-9",
                  "M102 133c5 5 12 8 13 8s8-2 13-8",
                  "M102 132c5 6 12 9 13 9s8-3 13-9",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
