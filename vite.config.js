import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "https://nlstar.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/ru/api/catalog3/v1"),
        secure: true,
      },
    },
  },
});
