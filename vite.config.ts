import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2,ttf,webmanifest}"],
      },
      manifest: {
        name: "LGR e projeto de controladores",
        short_name: "Controle",
        description:
          "LGR e projeto de PD, PI e PID para as duas unidades de DCA-3701 UFRN",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        icons: [{ src: "favicon.svg", sizes: "any", type: "image/svg+xml" }],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules/katex")) return "katex";
          if (id.includes("plotly.js-basic-dist-min")) return "plotly-basic";
          return undefined;
        },
      },
    },
  },
  server: { host: true, port: 5173 },
  test: { environment: "node" },
});
