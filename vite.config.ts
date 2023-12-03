import { defineConfig } from "vite";
import { join } from "path";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: "./docs",
  },
  base: "./",
  resolve: {
    alias: {
      '@': join(__dirname, "./src"),
    }
  }
});
