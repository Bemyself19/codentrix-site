import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev port can be overridden with VITE_DEV_PORT environment variable.
// Default is 5174 to avoid the common 5173 conflict.
const devPort = process.env.VITE_DEV_PORT ? parseInt(process.env.VITE_DEV_PORT, 10) : 5174

export default defineConfig({
  plugins: [react()],
  server: {
    port: devPort,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
