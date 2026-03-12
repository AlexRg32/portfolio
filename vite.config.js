import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/drei') || id.includes('@react-three/fiber') || id.includes('/three/')) {
            return 'three-stack'
          }

          if (id.includes('framer-motion') || id.includes('lenis') || id.includes('gsap')) {
            return 'motion-stack'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
