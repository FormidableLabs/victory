import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // A local gallery of every story in one bundle; its size doesn't matter.
  build: { chunkSizeWarningLimit: 2000 },
});
