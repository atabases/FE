import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '../node_modules/fmin/index.js': 'fmin'
    }
  },
  server: {
    host: true, // Needed for Docker to expose the port
    port: 5173,
    watch: {
      usePolling: true, // Often needed for HMR in Docker on some OSes
    },
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
