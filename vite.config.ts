import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "serve" ? "/" : "/ultimate-hitboxes/",
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
  },
}));
