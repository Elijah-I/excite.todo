import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/excite.todo",
  plugins: [react(), tsconfigPaths(), eslint()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/assets")
    }
  }
});
