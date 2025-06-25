import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "") || 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "") || 5173,
    allowedHosts: ["newsportal-4r2d.onrender.com"], // ✅ Fixed
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
