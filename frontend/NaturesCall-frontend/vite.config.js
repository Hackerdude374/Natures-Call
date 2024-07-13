import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.js",
    },
  };

  if (command !== 'build') {
    config.server = {
      port: 5173,
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    };
  }

  return config;
});