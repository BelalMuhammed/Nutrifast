import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "node:path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  base: process.env.VITE_BASE_PATH || "/Nutrifast",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
