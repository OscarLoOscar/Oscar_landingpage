import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Oscar_landingpage/",
  // GitHub Pages branch deploy only allows / or /docs (not /dist)
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
