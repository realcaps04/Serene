export const motion = {
  duration: {
    page: 0.35,
    card: 0.22,
    mood: 0.45,
  },
  easing: [0.22, 1, 0.36, 1] as const,
};

export const tokens = {
  color: {
    indigo: "#5865F2",
    lavender: "#A78BFA",
    lavenderLight: "#DDD6FE",
    pink: "#F472B6",
    blush: "#FBCFE8",
    pinkFaint: "#FCE7F3",
    coral: "#FDA4AF",
    sky: "#93C5FD",
    mint: "#A7E3D0",
    bg: "#FAF9FF",
    bgSecondary: "#F5F3FF",
    card: "#FFFFFF",
    pinkSurface: "#FFF5FA",
    lavenderSurface: "#F7F3FF",
    text: "#172554",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
    success: "#34D399",
    warning: "#FBBF24",
    crisis: "#F43F5E",
    border: "#EDE9FE",
  },
  radius: {
    cardLg: 24,
    card: 20,
    button: 16,
    input: 16,
  },
  shadow: "0 8px 30px rgba(88, 101, 242, 0.08)",
};
