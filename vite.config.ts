import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.png", "apple-touch-icon.png", "logo.png", "cloud-mascot.png"],
      manifest: {
        name: "Serene — Be kind to your mind.",
        short_name: "Serene",
        description:
          "Serene is your AI-powered companion for mindfulness, reflection, and everyday wellbeing.",
        theme_color: "#FAF9FF",
        background_color: "#FAF9FF",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,jpg,webp}"],
        navigateFallback: "/index.html",
        // Dev/prod SPA routes (/welcome, /app/*, etc.) — default allowlist is only `/`.
        navigateFallbackAllowlist: [/^\/(?!api).*/],
        navigateFallbackDenylist: [/^\/home\//, /^\/assets\//, /\.[^/]+$/],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    headers: {
      "Cache-Control": "no-store",
    },
  },
});
