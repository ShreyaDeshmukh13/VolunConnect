import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] } },
    },
  },
  test: { environment: "jsdom", globals: true, setupFiles: "./src/test/setup.js" },
});
