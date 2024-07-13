import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
      //  target: "http://localhost:4000",
        target: "http://ec2-3-19-215-1.us-east-2.compute.amazonaws.com",
        changeOrigin: true,
      },
    },
  },
});