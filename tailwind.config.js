/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        indigo: {
          brand: "#5865F2",
          deep: "#172554",
        },
        lavender: {
          DEFAULT: "#A78BFA",
          light: "#DDD6FE",
          surface: "#F7F3FF",
        },
        pink: {
          premium: "#F472B6",
          blush: "#FBCFE8",
          faint: "#FCE7F3",
          surface: "#FFF5FA",
        },
        coral: "#FDA4AF",
        sky: "#93C5FD",
        mint: "#A7E3D0",
        success: "#34D399",
        warning: "#FBBF24",
        crisis: "#F43F5E",
        surface: {
          DEFAULT: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        line: "var(--border-subtle)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.6875rem", { lineHeight: "1rem" }],
        sm: ["0.8125rem", { lineHeight: "1.25rem" }],
        base: ["0.9375rem", { lineHeight: "1.5rem" }],
        lg: ["1.0625rem", { lineHeight: "1.625rem" }],
        xl: ["1.1875rem", { lineHeight: "1.6875rem" }],
        "2xl": ["1.4375rem", { lineHeight: "2rem" }],
        "3xl": ["1.8125rem", { lineHeight: "2.125rem" }],
        hero: ["2.1875rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        section: ["1.4375rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        card: ["1rem", { lineHeight: "1.4" }],
        body: ["0.875rem", { lineHeight: "1.65" }],
        meta: ["0.6875rem", { lineHeight: "1.45" }],
      },
      borderRadius: {
        card: "20px",
        "card-lg": "24px",
        btn: "16px",
        input: "16px",
        nav: "28px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(88, 101, 242, 0.08)",
        lift: "0 12px 40px rgba(88, 101, 242, 0.12)",
        glow: "0 0 28px rgba(167, 139, 250, 0.35)",
        nav: "0 10px 40px rgba(23, 37, 84, 0.08)",
      },
      maxWidth: {
        shell: "430px",
      },
      transitionDuration: {
        calm: "500ms",
        slow: "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(0.82)" },
          "50%": { transform: "scale(1.12)" },
        },
        pulseDot: {
          "0%, 80%, 100%": { opacity: "0.25", transform: "scale(0.85)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ripple: {
          "0%": { transform: "scale(0.65)", opacity: "0.55" },
          "100%": { transform: "scale(1.35)", opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        breathe: "breathe 8s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.2s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        ripple: "ripple 3.5s ease-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
