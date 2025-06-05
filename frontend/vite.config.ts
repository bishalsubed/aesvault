const { fileURLToPath } = require('url')
const path = require('path')
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

// Needed to define __dirname in ESM context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: "dist"
  },
  base: "/"
})
